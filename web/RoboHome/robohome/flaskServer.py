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
db.users.addTable()
oid = OpenID(app)

# Routing ------------------------------------------------------------------
# Remember to set paths with the trailing slash


@app.route('/', methods=['GET'])
def home():
    if g.user is None or 'openid' not in session:
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Fetch the base HTML page and scripts
        return render_template('html/home.html')


@app.route('/version/', methods=['GET'])
def rooms_version():
    if g.user is None or 'openid' not in session:
       return redirect(url_for('login'))
    if request.method == 'GET':
        # Return initial info when connecting to server for the first time
        # return jsonify(pack(house.getVersion()))
        return jsonify(pack(house.getVersion()))


@app.route('/version/<string:version>/structure/', methods=['GET'])
def structure(version):
    if g.user is None or 'openid' not in session:
       return redirect(url_for('login'))
    if request.method == 'GET':
        # Return structure of house. This is used for passing hierarchial info
        return jsonify(pack(house.getStructure()))


@app.route('/version/<string:version>/state/', methods=['GET'])
def state(version):
    if g.user is None or 'openid' not in session:
       return redirect(url_for('login'))
    if request.method == 'GET':
        # Return flat list of each component's id and its associated state
        # return jsonify(pack(house.getState()))
        return jsonify(pack(house.getState()))


@app.route('/version/<string:version>/rooms/', methods=['POST'])
def rooms(version):
    if g.user is None or 'openid' not in session:
       return redirect(url_for('login'))
    if request.method == 'POST':
        # Create new room
        pass


@app.route('/version/<string:version>/rooms/<int:roomId>/', methods=['GET', 'PUT', 'DELETE'])
def rooms_roomId(version, roomId):
    if g.user is None or 'openid' not in session:
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Return state of room
        return jsonify(pack(house.rooms[int(roomId)].getState()))
        pass

    if request.method == 'PUT':
        # Update room
        pass

    if request.method == 'DELETE':
        # Delete room
        house.deleteRoom(int(roomId))
        pass


@app.route('/version/<string:version>/rooms/<int:roomId>/items/', methods=['POST'])
def rooms_roomId_items(version, roomId):
    if g.user is None or 'openid' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        # Create new item for specified room
        pass


@app.route('/version/<string:version>/rooms/<int:roomId>/items/<int:itemId>/', methods=['GET', 'PUT', 'DELETE'])
def rooms_roomId_items_itemId(version, roomId, itemId):
    if g.user is None or 'openid' not in session:
        print "REDIRECT"
        return redirect(url_for('login'))
    if request.method == 'GET':
        # Return state of item
        return jsonify(pack(house.rooms[int(roomId)].items[itemId].getState()))
        pass

    if request.method == 'PUT':
        # Request update of state of item
        pass

    if request.method == 'DELETE':
        # Remove specified item
        house.deleteItem(int(roomId), int(itemId))
        pass


        
@app.route('/version/<string:version>/rooms/<int:roomId>/items/<int:itemId>/<string:cmd>/', methods=['PUT'])
def rooms_roomId_items_itemId_cmd(version, roomId, itemId, cmd):
    if g.user is None or 'openid' not in session:
        print "REDIRECT"
        return redirect(url_for('login'))
    if request.method == 'PUT':
        # Command item
        strBuffer = str(roomId) + ' ' + str(itemId) + ' ' + cmd # TODO remove
        house.addToQueue(int(roomId), int(itemId), cmd)
        return strBuffer # TODO remove


@app.route('/version/<string:version>/events/', methods=['GET', 'POST'])
def events(version):
    if g.user is None or 'openid' not in session:
      return redirect(url_for('login'))
    if request.method == 'GET':
        # Return a list of all events
        pass

    if request.method == 'POST':
        # Create a new event
        pass


@app.route('/version/<string:version>/events/<int:eventId>/', methods=['GET', 'PUT', 'DELETE'])
def events_eventId(version, eventId):
    if g.user is None or 'openid' not in session:
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

@app.before_request
def before_request():
    
    g.user = None
    if 'openid' in session:
        g.user = db.users.getUserByOpenid(session['openid'])


@app.route('/login', methods=['GET', 'POST'])
@oid.loginhandler
def login():
    """Does the login via OpenID.  Has to call into `oid.try_login`
    to start the OpenID machinery.
    """
    # if we are already logged in, go back to were we came from
    if g.user is not None:
        app.logger.info('logged-in: '+oid.get_next_url())
        return redirect(oid.get_next_url())
    if request.method == 'POST':
        openid = request.form.get('openid_identifier')
        if openid:
            app.logger.info(request.form)
            app.logger.info('logging-in: '+oid.get_next_url())
            return oid.try_login(openid, ask_for=['email', 'fullname'])
    app.logger.info('not-logged-in: '+oid.get_next_url())                                        
    return render_template('html/login.html', next=oid.get_next_url(),
                           error=oid.fetch_error())

@oid.after_login
def create_or_login(resp):
    """This is called when login with OpenID succeeded and it's not
    necessary to figure out if this is the users's first login or not.
    This function has to redirect otherwise the user will be presented
    with a terrible URL which we certainly don't want.
    """
    session['openid'] = resp.identity_url
    user = db.users.getUserByOpenid(resp.identity_url)
    if user is not None:
        flash(u'Successfully signed in')
        g.user = user
        app.logger.info('Log in successfully: ')
        return redirect(oid.get_next_url())
    elif db.users.numOfRows() == 0:
        name=resp.fullname
        email=resp.email
        db.users.addEntry(name, email, session['openid'])
        return redirect(oid.get_next_url())
    else:
        print "TOO MANY USERS"
        return redirect(oid.get_next_url())

@app.route('/logout')
def logout():
    session.pop('openid', None)
    flash(u'You have been signed out')
    return redirect(oid.get_next_url())

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
