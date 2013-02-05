# ----------------------------------------------------------------------
# Flask framework for home automation
# 
#               : Flask         http://flask.pocoo.org/docs/
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

# Convenience method for constructing the RESTful API URLs
def apiURL(str):
    return '/version/' + SETTINGS['VERSION_NUMBER'] + str
    
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
    'GET_HOUSE_STRUCTURE': pack({
        'rooms': [
            {
                'id': 1,
                'name': 'mock-room-1',
                'items': [
                    {
                        'id': 1,
                        'name': 'mock-item-name-1',
                        'type': 'mock-item-type-1',
                        'brand': 'mock-item-brand-1',
                        'ip': 'mock-item-ip-1'
                    },
                    {
                        'id': 2,
                        'name': 'mock-item-name-2',
                        'type': 'mock-item-type-2',
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
                        'type': 'mock-item-type-3',
                        'brand': 'mock-item-brand-3',
                        'ip': 'mock-item-ip-3'
                    },
                    {
                        'id': 4,
                        'name': 'mock-item-name-4',
                        'type': 'mock-item-type-4',
                        'brand': 'mock-item-brand-4',
                        'ip': 'mock-item-ip-4'
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


@app.route(apiURL('/houseStructure/'), methods = ['GET', 'POST'])
def houseStructure():
    if request.method == 'GET':
        # Return most recent data about the house's hierarchial structure
        return jsonify(MOCK_OBJECTS['GET_HOUSE_STRUCTURE'])
        
    elif request.method == 'POST':
        # Update the house's hierarchial structure
        pass


@app.route(apiURL('/houseState/'), methods = ['GET'])
def houseState():
    if request.method == 'GET':
        #
        pass


@app.route(apiURL('/rules/'), methods = ['GET', 'POST'])
def rules():
    if request.method == 'GET':
        #
        pass
        
    elif request.method == 'POST':
        #
        pass


@app.route(apiURL('/allMethods/'), methods = ['GET'])
def allMethods():
    if request.method == 'GET':
        #
        pass


@app.route(apiURL('/rooms/<int:roomId>/<string:itemType>/<int:itemId>/<string:action>/'), methods = ['GET', 'POST'])
def command(roomId, itemType, itemId, action):
    if request.method == 'POST':
        #
        pass
        
    elif request.method == 'GET':
        # Test method. To be removed along with method in @app.route
        strBuffer = str(roomId) + ' ' + itemType + ' ' + str(itemId) + ' ' + action + ' ' + str(request.args.to_dict())
        return strBuffer
        
# Run ---------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host = SETTINGS['SERVER']['HOST'], port = SETTINGS['SERVER']['PORT'])