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
        'PORT': 9090
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
            'motionSensor': {
                'name': 'Motion sensors',
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
            'lightSensor': {
                'name': 'Light sensors',
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
            'temperatureSensor': {
                'name': 'Temperature sensors',
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
            'energyMonitor': {
                'name': 'Energy monitors',
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
            },
            'button': {
                'name': 'Buttons',
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
            },
            'door': {
                'name': 'Doors',
                'supportedBrands': [
                    'mock-item-brand-1',
                    'mock-item-brand-2',
                    'mock-item-brand-3'
                ],
                'discrete': {
                    'methods': ['equals'],
                    'states': [
                        { 'state': 0, 'name': 'foo' },
                        { 'state': 1, 'name': 'bar' }
                    ]
                }
            },
            'window': {
                'name': 'Windows',
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
            },
            'curtain': {
                'name': 'Curtains',
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
            },
            'plug': {
                'name': 'Plugs',
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
            },
            'light': {
                'name': 'Lights',
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
            },
            'radiator': {
                'name': 'Radiators',
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
            },
        }
    }),
    'GET_STRUCTURE': pack({
        'rooms': [
            {
                'id': 1,
                'name': 'mock-room-1',
                'itemTypes': {
                    'lightSensor': [
                        {
                            'id': 1,
                            'name': 'mock-light-sensor-1',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-1'
                        },
                        {
                            'id': 2,
                            'name': 'mock-light-sensor-2',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-2'
                        }
                    ],
                    'door': [
                        {
                            'id': 3,
                            'name': 'mock-door-3',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-3'
                        },
                        {
                            'id': 4,
                            'name': 'mock-door-4',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-4'
                        }
                    ]
                }
            },
            {
                'id': 2,
                'name': 'mock-room-2',
                'itemTypes': {
                    'lightSensor': [
                        {
                            'id': 5,
                            'name': 'mock-light-sensor-1',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-5'
                        },
                        {
                            'id': 6,
                            'name': 'mock-light-sensor-2',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-6'
                        }
                    ],
                    'door': [
                        {
                            'id': 7,
                            'name': 'mock-door-3',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-7'
                        },
                        {
                            'id': 8,
                            'name': 'mock-door-4',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-8'
                        }
                    ]
                }
            },
            {
                'id': 3,
                'name': 'mock-room-3',
                'itemTypes': {
                    'lightSensor': [
                        {
                            'id': 9,
                            'name': 'mock-light-sensor-1',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-9'
                        },
                        {
                            'id': 10,
                            'name': 'mock-light-sensor-2',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-10'
                        }
                    ],
                    'door': [
                        {
                            'id': 11,
                            'name': 'mock-door-3',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-11'
                        },
                        {
                            'id': 12,
                            'name': 'mock-door-4',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-12'
                        }
                    ]
                }
            },
            {
                'id': 4,
                'name': 'mock-room-4',
                'itemTypes': {
                    'lightSensor': [
                        {
                            'id': 13,
                            'name': 'mock-light-sensor-1',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-13'
                        },
                        {
                            'id': 14,
                            'name': 'mock-light-sensor-2',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-14'
                        }
                    ],
                    'door': [
                        {
                            'id': 15,
                            'name': 'mock-door-3',
                            'brand': 'mock-item-brand-1',
                            'ip': 'mock-item-ip-15'
                        },
                        {
                            'id': 16,
                            'name': 'mock-door-4',
                            'brand': 'mock-item-brand-2',
                            'ip': 'mock-item-ip-16'
                        }
                    ]
                }
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