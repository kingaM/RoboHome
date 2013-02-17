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

# Mock content ------------------------------------------------------------
MOCK_CONTENT = {
    'GET_VERSION': pack({
        'supportedTypes': {
            'door': {
                'name': 'Doors',
                'supportedBrands': [],
                'methods': ['close', 'open'],
                'states': [
                    { 'id': 0, 'name': 'Closed', 'method': 'close'},
                    { 'id': 1, 'name': 'Open', 'method': 'open'}
                ]
            },
            'curtain': {
                'name': 'Curtains',
                'supportedBrands': [],
                'methods': ['close', 'open'],
                'states': [
                    { 'id': 0, 'name': 'Closed', 'method': 'close'},
                    { 'id': 1, 'name': 'Open', 'method': 'open'}
                ]
            },
            'window': {
                'name': 'Windows',
                'supportedBrands': [],
                'methods': ['close', 'open'],
                'states': [
                    { 'id': 0, 'name': 'Closed', 'method': 'close'},
                    { 'id': 1, 'name': 'Open', 'method': 'open'}
                ]
            },
            'motionSensor': {
                'name': 'Motion sensors',
                'supportedBrands': [],
                'methods': ['off', 'on'],
                'states': [
                    { 'id': 0, 'name': 'Off', 'method': 'off' },
                    { 'id': 1, 'name': 'On', 'method': 'on' }
                ]
            },
            'plug': {
                'name': 'Plugs',
                'supportedBrands': [],
                'methods': ['off', 'on'],
                'states': [
                    { 'id': 0, 'name': 'Off', 'method': 'off' },
                    { 'id': 1, 'name': 'On', 'method': 'on' }
                ]
            },
            'light': {
                'name': 'Lights',
                'supportedBrands': [],
                'methods': ['off', 'on'],
                'states': [
                    { 'id': 0, 'name': 'Off', 'method': 'off' },
                    { 'id': 1, 'name': 'On', 'method': 'on' }
                ]
            }
        }
    }),
    'GET_STATE': pack({
        'states': [
            { 'id': 0, 'state': 0 },
            { 'id': 1, 'state': 1 },
            { 'id': 2, 'state': 0 },
            { 'id': 3, 'state': 1 },
            { 'id': 4, 'state': 0 },
            { 'id': 5, 'state': 1 },
            { 'id': 6, 'state': 0 },
            { 'id': 7, 'state': 1 },
            { 'id': 8, 'state': 0 },
            { 'id': 9, 'state': 1 },
            { 'id': 10, 'state': 0 },
            { 'id': 11, 'state': 1 },
            { 'id': 12, 'state': 0 },
            { 'id': 13, 'state': 1 },
            { 'id': 14, 'state': 0 },
            { 'id': 15, 'state': 1 }
        ]
    })
}

# App config ---------------------------------------------------------------
app = Flask(__name__)
app.debug = True

db = Database()
house = House(db)
house.initFromDatabase()

# Routing ------------------------------------------------------------------
# Remember to set paths with the trailing slash


@app.route('/', methods=['GET'])
def home():
    if request.method == 'GET':
        # Fetch the base HTML page and scripts
        return render_template('html/home.html')


@app.route('/version/', methods=['GET'])
def rooms_version():
    if request.method == 'GET':
        # Return initial info when connecting to server for the first time
        # return jsonify(pack(house.getVersion()))
        return jsonify(pack(house.getVersion()))


@app.route('/version/<string:version>/structure/', methods=['GET'])
def structure(version):
    if request.method == 'GET':
        # Return structure of house. This is used for passing hierarchial info
        return jsonify(pack(house.getStructure()))


@app.route('/version/<string:version>/state/', methods=['GET'])
def state(version):
    if request.method == 'GET':
        # Return flat list of each component's id and its associated state
        # return jsonify(pack(house.getState()))
        return jsonify(pack(house.getState()))


@app.route('/version/<string:version>/rooms/', methods=['POST'])
def rooms(version):
    if request.method == 'POST':
        # Create new room
        pass


@app.route('/version/<string:version>/rooms/<int:roomId>/', methods=['GET', 'PUT', 'DELETE'])
def rooms_roomId(version, roomId):
    if request.method == 'GET':
        # Return state of room
        return jsonify(pack(house.rooms[int(roomId)].getState()))
        pass

    if request.method == 'PUT':
        # Update room
        pass

    if request.method == 'DELETE':
        # Delete room
        pass



@app.route('/version/<string:version>/rooms/<int:roomId>/items/', methods=['POST'])
def rooms_roomId_items(version, roomId):
    if request.method == 'POST':
        # Create new item for specified room
        pass


@app.route('/version/<string:version>/rooms/<int:roomId>/items/<int:itemId>/', methods=['GET', 'PUT', 'DELETE'])
def rooms_roomId_items_itemId(version, roomId, itemId):
    if request.method == 'GET':
        # Return state of item
        return jsonify(pack(house.rooms[int(roomId)].items[itemId].getState()))
        pass

    if request.method == 'PUT':
        # Request update of state of item
        pass

    if request.method == 'DELETE':
        # Remove specified item
        pass


@app.route('/version/<string:version>/rooms/<int:roomId>/items/<int:itemId>/<string:cmd>/', methods=['PUT'])
def rooms_roomId_items_itemId_cmd(version, roomId, itemId, cmd):
    if request.method == 'PUT':
        # Command item
        house.addToQueue(int(roomId), int(itemId), cmd)
        return jsonify(pack({}))


@app.route('/version/<string:version>/events/', methods=['GET', 'POST'])
def events(version):
    if request.method == 'GET':
        # Return a list of all events
        pass

    if request.method == 'POST':
        # Create a new event
        pass


@app.route('/version/<string:version>/events/<int:eventId>/', methods=['GET', 'PUT', 'DELETE'])
def events_eventId(version, eventId):
    if request.method == 'GET':
        # Return event
        pass

    if request.method == 'PUT':
        # Update event
        pass

    if request.method == 'DELETE':
        # Remove event
        pass


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
