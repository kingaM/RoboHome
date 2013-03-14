# ----------------------------------------------------------------------
# Flask framework for home automation
#
# Requires      : Flask         http://flask.pocoo.org/docs/
#                               http://pypi.python.org/pypi/Flask
#
# Dependencies  : Jinja2        http://jinja.pocoo.org/docs/
#                               http://pypi.python.org/pypi/Jinja2
#                 Werkzeug      http://werkzeug.pocoo.org/
#                               http://pypi.python.org/pypi/Werkzeug
#
# Author        : Li Quan Khoo
# Date          : 2013
# ----------------------------------------------------------------------

from flask import *
from houseSystem import House
from databaseTables import Database
from flask_openid import OpenID
from IPy import IP
import updateManager
import threading

SETTINGS = {
    'LANGUAGE': 'en',
    'VERSION_NUMBER': '0.1',
    'SERVER': {
        'HOST': '0.0.0.0',
        'PORT': 9090
    },
    'API': {
        'STATUS_CODE': 'statusCode',
        'CONTENT': 'content'
    }
}

# Common methods ----------------------------------------------------------

# Pack content object into communications wrapper API format and return it as a dictionary
def pack(content={}, statusCode=200):
    return {
        SETTINGS['API']['STATUS_CODE']: statusCode,
        SETTINGS['API']['CONTENT']: content
    }

# App config ---------------------------------------------------------------
app = Flask(__name__)
app.config.update(
    SECRET_KEY = 'development key',
    DEBUG = True
)

db = Database()
house = House(db)
house.initFromDatabase()
oid = OpenID(app)

# Routing ------------------------------------------------------------------
# Remember to set paths with the trailing slash


@app.route('/', methods=['GET'])
def home():
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Fetch the base HTML page and scripts
        return render_template('html/home.html')


@app.route('/update/', methods=['POST'])
def update():
    if request.method == 'POST':
        t = threading.Thread(target=updateManager.checkForUpdate())
        t.daemon = True
        t.start()
        return jsonify(pack(house.getVersion()))


@app.route('/version/', methods=['GET'])
def rooms_version():
    if g.user is None and not isIpOnLocalNetwork():
       return redirect(url_for('login'))
    if request.method == 'GET':
        # Return initial info when connecting to server for the first time
        return jsonify(pack(house.getVersion()))


@app.route('/version/<string:version>/state/', methods=['GET'])
def structure(version):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Return structure of house. This is used for passing hierarchial info
        return jsonify(pack(house.getStructure()))


@app.route('/version/<string:version>/rooms/', methods=['POST'])
def rooms(version):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'POST':
        # Create new room
        args = request.args.to_dict()
        roomId = house.addRoom(args['name'])
        return jsonify(pack({'id': roomId}))


@app.route('/version/<string:version>/rooms/<int:roomId>/', methods=['GET', 'PUT', 'DELETE'])
def rooms_roomId(version, roomId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Return state of room
        return jsonify(pack(house.rooms[int(roomId)].getState()))

    if request.method == 'PUT':
        # Update room
        args = request.args.to_dict()
        house.updateRoom(roomId, args['name'])
        return jsonify(pack('success'))

    if request.method == 'DELETE':
        # Delete room
        house.deleteRoom(int(roomId))
        return jsonify(pack('success'))

@app.route('/version/<string:version>/rooms/<int:roomId>/items/', methods=['POST'])
def rooms_roomId_items(version, roomId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'POST':
        # Create new item for specified room
        args = request.args.to_dict()
        itemId = house.addItem(roomId, args['name'], args['brand'], args['itemType'], args['ip'])
        return jsonify(pack({'itemId': itemId}))


@app.route('/version/<string:version>/rooms/<int:roomId>/items/<int:itemId>/', methods=['GET', 'PUT', 'DELETE'])
def rooms_roomId_items_itemId(version, roomId, itemId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Return state of item
        return jsonify(pack(house.rooms[int(roomId)].items[itemId].getState()))

    if request.method == 'PUT':
        # Request update of state of item
        args = request.args.to_dict()
        house.updateItem(roomId, itemId, args['name'], args['brand'], args['type'], args['ip'])
        return jsonify(pack('success'))

    if request.method == 'DELETE':
        # Remove specified item
        house.deleteItem(int(roomId), int(itemId))
        return jsonify(pack('success'))


@app.route('/version/<string:version>/rooms/<int:roomId>/items/<int:itemId>/<string:cmd>/', methods=['PUT'])
def rooms_roomId_items_itemId_cmd(version, roomId, itemId, cmd):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'PUT':
        # Command item
        house.addToQueue(int(roomId), int(itemId), cmd)
        return jsonify(pack('success'))


@app.route('/version/<string:version>/events/', methods=['GET', 'POST'])
def events(version):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'GET':
        return jsonify(pack(house.getRules()))

    if request.method == 'POST':
        args = request.args.to_dict()
        if args["id"] == "null":
            reqId = None
        else:
            reqId = int(args["id"])
        if args["enabled"] == "true":
            enabled = 1
        else:
            enabled = 0
        _id = house.addEvent(args["ruleName"], args["itemType"], reqId, args["scope"], int(args["value"]), enabled)
        return jsonify(pack({"ruleId": _id}))


@app.route('/version/<string:version>/events/<int:eventId>/', methods=['PUT', 'DELETE'])
def events_eventId(version, eventId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))

    if request.method == 'PUT':
        # Update event
        args = request.args.to_dict()
        if args["id"] == "null":
            reqId = None
        else:
            reqId = int(args["id"])
        if args["enabled"] == "true":
            enabled = 1
        else:
            enabled = 0
        house.updateEvent(args["ruleName"], args["itemType"], reqId, args["scope"], int(args["value"]), enabled, int(eventId))
        return jsonify(pack('success'))

    if request.method == 'DELETE':
        # Delete event
        house.deleteEvent(int(eventId))
        return jsonify(pack('success'))


@app.route('/version/<string:version>/events/<int:eventId>/conditions/', methods=['POST'])
def events_eventId_conditions(version, eventId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))

    if request.method == 'POST':
        args = request.args.to_dict()
        _id = house.addCondition(int(args["itemId"]), args["equivalence"], int(args["value"]), int(eventId))
        return jsonify(pack({"conditionId": _id}))


@app.route('/version/<string:version>/events/<int:eventId>/conditions/<int:conditionId>/', methods=['GET', 'PUT', 'DELETE'])
def events_eventId_conditions_conditionId(version, eventId, conditionId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))

    if request.method == 'PUT':
        args = request.args.to_dict()
        house.updateCondition(int(args["itemId"]), args["equivalence"], int(args["value"]), int(eventId), int(conditionId))
        return(jsonify(pack('success')))

    if request.method == 'DELETE':
        house.deleteCondition(int(eventId), int(conditionId))
        return(jsonify(pack('success')))


@app.route('/version/<string:version>/events/<int:eventId>/actions/', methods=['POST'])
def events_eventId_actions(version, eventId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))

    if request.method == 'POST':
        args = request.args.to_dict()
        if args["id"] == "null":
            reqId = None
        else:
            reqId = int(args["id"])
        _id = house.addAction(reqId, args["itemType"], args["scope"], args["method"], int(eventId))
        return jsonify(pack({"actionId": _id}))


@app.route('/version/<string:version>/events/<int:eventId>/actions/<int:actionId>/', methods=['PUT', 'DELETE'])
def events_eventId_actions_actionId(version, eventId, actionId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))

    if request.method == 'PUT':
        args = request.args.to_dict()
        if args["id"] == "null":
            reqId = None
        else:
            reqId = int(args["id"])
        house.updateAction(reqId, args["itemType"], args["scope"], args["method"], int(eventId), int(actionId))
        return(jsonify(pack('success')))

    if request.method == 'DELETE':
        house.deleteAction(eventId, actionId)
        return(jsonify(pack('success')))


@app.route('/version/<string:version>/whitelist/', methods=['GET', 'POST', 'DELETE'])
def whitelist(version):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
        
    if request.method == 'GET':
        return jsonify(pack({'emails' : [emails[0] for emails in db.whitelist.getEmails()]}))
    
    if request.method == 'POST':
        args = request.args.to_dict()
        db.whitelist.addEntry(args['email'])
        return jsonify(pack('success'))
    
    if request.method == 'DELETE':
        args = request.args.to_dict()
        db.whitelist.deleteEmail(args['email'])
        return jsonify(pack('success'))
        

# OPENID ----------------------------------------------------------------
# Based upon: https://github.com/mitsuhiko/flask-openid
# License: https://github.com/mitsuhiko/flask-openid/blob/master/LICENSE

@app.before_request
def before_request():  
    g.user = None
    if 'openid' in session:
        g.user = db.users.getUserByOpenid(session['openid'])

def getIp():
    if not request.headers.getlist("X-Forwarded-For"):
        return request.remote_addr
    else:
        return request.headers.getlist("X-Forwarded-For")[0]

def isIpOnLocalNetwork():
    network10 = IP("10.0.0.0/24")
    network192 = IP("192.168.0.0/24")
    network127 = IP("127.0.0.0/24")
    return getIp() in network10 or getIp() in network192 or getIp() in network127

@app.route('/login/', methods=['GET', 'POST'])
@oid.loginhandler
def login():
    # Does the login via OpenID.
    if g.user is not None or isIpOnLocalNetwork():
        app.logger.info('logged-in: '+oid.get_next_url())
        return redirect(oid.get_next_url())
    if request.method == 'POST':
        openid = request.form.get('openid_identifier')
        if openid:
            app.logger.info('logging-in: '+oid.get_next_url())
            return oid.try_login(openid, ask_for=['email', 'fullname'])
    app.logger.info('not-logged-in: '+oid.get_next_url())
    return render_template('html/login.html', next=oid.get_next_url(),
                           error=oid.fetch_error())                                  
    
@oid.after_login
def create_or_login(resp):
    # Called when the login was successful
    session['openid'] = resp.identity_url
    user = db.users.getUserByOpenid(resp.identity_url)
    if user is not None:
        g.user = user
        return redirect(oid.get_next_url())
    name=resp.fullname
    email=resp.email
    if db.users.numOfRows() == 0:
        db.users.addEntry(name, email, session['openid'])
        db.whitelist.addEntry(email)
        return redirect(oid.get_next_url())
    elif db.whitelist.isInWhitelist(email):
        db.users.addEntry(name, email, session['openid'])
        return redirect(oid.get_next_url())
    else:
        return render_template('html/loginerror.html')


# Pages handling server-dependent JS unit tests
@app.route('/test/', methods=['GET'])
def test():
    if request.method == 'GET':
        return render_template('html/tests/home-test.html');


@app.route('/test/parrot/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def test_parrot():
        
    dict = {
        'method': request.method,
        'payload': request.data,
        'args': request.args.to_dict()
    }
    
    return jsonify(dict)

# Run ---------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host=SETTINGS['SERVER']['HOST'], port=SETTINGS['SERVER']['PORT'])
