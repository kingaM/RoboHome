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
import socket, struct


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
        # Return a list of all events
        pass

    if request.method == 'POST':
        # Create a new event
        pass


@app.route('/version/<string:version>/events/<int:eventId>/', methods=['GET', 'PUT', 'DELETE'])
def events_eventId(version, eventId):
    if g.user is None and not isIpOnLocalNetwork():
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Return event
        pass

    if request.method == 'PUT':
        # Update event
        pass

    if request.method == 'DELETE':
        # Remove event
        pass

# OPENID ----------------------------------------------------------------
# Based upon: https://github.com/mitsuhiko/flask-openid
# License: https://github.com/mitsuhiko/flask-openid/blob/master/LICENSE

def dottedQuadToNum(ip):
    return struct.unpack('L',socket.inet_aton(ip))[0]

def networkMask(ip,bits):
    return dottedQuadToNum(ip) & ((2L<<bits-1) - 1)

def addressInNetwork(ip,net):
   return dottedQuadToNum(ip) & net == net

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
    network10 = networkMask("10.0.0.0",24)
    network192 = networkMask("192.168.0.0",255)
    return addressInNetwork(getIp(), network10) or addressInNetwork(getIp(), network192) or getIp() == '127.0.0.1'


@app.route('/login', methods=['GET', 'POST'])
@oid.loginhandler
def login():
    """Does the login via OpenID."""
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
    """Called when the login was successful"""
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


##################################
# For illustration purposes only #
##################################
@app.route('/test/version/<string:version>/rooms/<int:roomId>/<string:itemType>/<int:itemId>/<string:action>/', methods=['GET', 'POST'])
def command(version, roomId, itemType, itemId, action):
    if request.method == 'POST':
        #
        pass

    elif request.method == 'GET':
        # Test method. To be removed along with method in @app.route
        strBuffer = str(roomId) + ' ' + itemType + ' ' + str(itemId) + ' ' + action + ' ' + str(request.args.to_dict())
        print strBuffer
        return strBuffer

# Run ---------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host=SETTINGS['SERVER']['HOST'], port=SETTINGS['SERVER']['PORT'])
