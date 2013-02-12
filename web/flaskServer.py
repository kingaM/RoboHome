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

SETTINGS = {
    'VERSION_NUMBER': '0.1',
    'SERVER': {
        'HOST': '127.0.0.1',
        'PORT': 80
    },
    'API': {
        'STATUS_CODE': 'statusCode',
        'CONTENT': 'content'
    }
}

# Common methods ----------------------------------------------------------
    
# Get JSON string from request body
def getJSON():
    pass

# Pack content object into communications wrapper API format and return it as a dictionary
def pack(content = {}, statusCode = 200):
    return {
        SETTINGS['API']['STATUS_CODE']: statusCode,
        SETTINGS['API']['CONTENT']: content
    }

# Mock objects -------------------------------------------------------------
MOCK_OBJECTS = {
    'GET_VERSION': pack({
        'supportedTypes': {
            'mock-item-type-1': {
                'supportedBrands': [
                    'mock-item-brand-1',
                    'mock-item-brand-2',
                    'mock-item-brand-3',
                    'mock-item-brand-4'
                ],
                'discrete': {
                    'methods': ['equals'],
                    'states': [
                        { 'state': 0, 'name': 'closed' },
                        { 'state': 1, 'name': 'open' }
                    ]
                }
            },
            'mock-item-type-2': {
                'supportedBrands': [
                    'mock-item-brand-1',
                    'mock-item-brand-2'
                ],
                'discrete': {
                    'methods': ['equals'],
                    'states': [
                        { 'state': 0, 'name': 'closed' },
                        { 'state': 1, 'name': 'open' }
                    ]
                }
            },
            'mock-item-type-3': {
                'supportedBrands': [
                    'mock-item-brand-5',
                    'mock-item-brand-6'
                ],
                'discrete': {
                    'methods': ['equals'],
                    'states': [
                        { 'state': 0, 'name': 'off' },
                        { 'state': 1, 'name': 'on' }
                    ]
                }
            },
            'mock-item-type-4': {
                'supportedBrands': [
                    'mock-item-brand-1',
                    'mock-item-brand-3'
                ],
                'discrete': {
                    'methods': ['equals'],
                    'states': [
                        { 'state': 0, 'name': 'foo' },
                        { 'state': 1, 'name': 'bar' }
                    ]
                }
            }
        }
    }),
    'GET_STRUCTURE': pack({
        'rooms': [
            {
                'id': 1,
                'name': 'mock-room-1',
                'items': [
                    {
                        'id': 1,
                        'name': 'mock-item-name-1',
                        'itemType': 'mock-item-type-1',
                        'brand': 'mock-item-brand-1',
                        'ip': 'mock-item-ip-1'
                    },
                    {
                        'id': 2,
                        'name': 'mock-item-name-2',
                        'itemType': 'mock-item-type-2',
                        'brand': 'mock-item-brand-2',
                        'ip': 'mock-item-ip-2'
                    }
                ]
            },
            {
                'id': 2,
                'name': 'mock-room-2',
                'items': [
                    {
                        'id': 3,
                        'name': 'mock-item-name-3',
                        'itemType': 'mock-item-type-3',
                        'brand': 'mock-item-brand-3',
                        'ip': 'mock-item-ip-3'
                    },
                    {
                        'id': 4,
                        'name': 'mock-item-name-4',
                        'itemType': 'mock-item-type-4',
                        'brand': 'mock-item-brand-4',
                        'ip': 'mock-item-ip-4'
                    }
                ]
            },
            {
                'id': 3,
                'name': 'mock-room-3',
                'items': [
                    {
                        'id': 5,
                        'name': 'mock-item-name-5',
                        'itemType': 'mock-item-type-5',
                        'brand': 'mock-item-brand-5',
                        'ip': 'mock-item-ip-5'
                    },
                    {
                        'id': 6,
                        'name': 'mock-item-name-6',
                        'itemType': 'mock-item-type-6',
                        'brand': 'mock-item-brand-6',
                        'ip': 'mock-item-ip-6'
                    }
                ]
            },
            {
                'id': 4,
                'name': 'mock-room-4',
                'items': [
                    {
                        'id': 7,
                        'name': 'mock-item-name-7',
                        'itemType': 'mock-item-type-7',
                        'brand': 'mock-item-brand-7',
                        'ip': 'mock-item-ip-7'
                    },
                    {
                        'id': 8,
                        'name': 'mock-item-name-8',
                        'itemType': 'mock-item-type-8',
                        'brand': 'mock-item-brand-8',
                        'ip': 'mock-item-ip-8'
                    }
                ]
            }
        ]
    })
}


# App config ---------------------------------------------------------------
app = Flask(__name__)
app.debug = True


# Routing ------------------------------------------------------------------
# Remember to set paths with the trailing slash

@app.route('/', methods = ['GET'])
def home():
    if request.method == 'GET':
        # Fetch the base HTML page and scripts
        return render_template('html/home.html')



@app.route('/version/', methods = ['GET'])
def rooms_version():
    if request.method == 'GET':
        # Return initial info when connecting to server for the first time
        return jsonify(MOCK_OBJECTS['GET_VERSION'])



@app.route('/version/<string:version>/structure/', methods = ['GET'])
def structure(version):
    if request.method == 'GET':
        # Return structure of house. This is used for passing hierarchial info
        return jsonify(MOCK_OBJECTS['GET_STRUCTURE'])
    


@app.route('/version/<string:version>/state/', methods = ['GET'])
def state(version):
    if request.method == 'GET':
        # Return flat list of each component's id and its associated state
        pass



@app.route('/version/<string:version>/rooms/', methods = ['POST'])
def rooms(version):
    if request.method == 'POST':
        # Create new room
        pass



@app.route('/version/<string:version>/rooms/<int:roomId>/', methods = ['GET', 'PUT', 'DELETE'])
def rooms_roomId(version, roomId):
    if request.method == 'GET':
        # Return state of room
        pass
    
    if request.method == 'PUT':
        # Update room
        pass
    
    if request.method == 'DELETE':
        # Delete room
        pass



@app.route('/version/<string:version>/rooms/<int:roomId>/items/', methods = ['POST'])
def rooms_roomId_items(version, roomId):
    if request.method == 'POST':
        # Create new item for specified room
        pass



@app.route('/version/<string:version>/rooms/<int:roomId>/items/<int:itemId>/', methods = ['GET', 'PUT', 'DELETE'])
def rooms_roomId_items_itemId(version, roomId, itemId):
    if request.method == 'GET':
        # Return state of item
        pass
    
    if request.method == 'PUT':
        # Request update of state of item
        pass
    
    if request.method == 'DELETE':
        # Remove specified item
        pass



@app.route('/version/<string:version>/events/', methods = ['GET', 'POST'])
def events(version):
    if request.method == 'GET':
        # Return a list of all events
        pass
        
    if request.method == 'POST':
        # Create a new event
        pass


@app.route('/version/<string:version>/events/<int:eventId>/', methods = ['GET', 'PUT', 'DELETE'])
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
@app.route('/test/version/<string:version>/rooms/<int:roomId>/<string:itemType>/<int:itemId>/<string:action>/', methods = ['GET', 'POST'])
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
    app.run(host = SETTINGS['SERVER']['HOST'], port = SETTINGS['SERVER']['PORT'])