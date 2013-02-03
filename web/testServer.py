import os
import cherrypy # http://www.cherrypy.org/
import simplejson # http://pypi.python.org/pypi/simplejson/



SERVER_SOCKET_HOST = '0.0.0.0'
SERVER_SOCKET_PORT = 80

APP_CONSTANTS = {
    'VERSION': "v0.1"
}

API_CONSTANTS = {
    'STATUS_CODE': "statusCode",
    'CONTENT': "content"
}



# Common methods -----------------------------------------------------

# Get JSON string from request body
def getJSON():
    contentlength = cherrypy.request.headers['Content-Length']
    payload = cherrypy.request.body.read(int(contentlength))
    return simplejson.loads(payload)

# Set server response header to application/json
def setJSONHeader():
    cherrypy.response.headers['Content-Type'] = 'application/json'

# Pack content object into communications wrapper API format and return it as an object
def pack(statusCode, content = {}):
    return {
        API_CONSTANTS['STATUS_CODE']: statusCode,
        API_CONSTANTS['CONTENT']: content
    }    

def invalidRequest():
    cherrypy.response.status = 404
    return simplejson.dumps(pack('404', 'invalid request'))
    

# Pages --------------------------------------------------------------

# Home page
class URL_Index:

    @cherrypy.expose
    def index(self):
        return invalidRequest()
        # return open('html/home.html')

# Login page
class URL_Login(object):
    exposed = True
    
    #
    def GET(self):
        pass
    
    #
    def PUT(self):
        pass
        
    def POST(self):
        return invalidRequest()
    
    def DELETE(self):
        return invalidRequest()

# API page      
class URL_HouseStructure(object):
    exposed = True
    
    #
    def GET(self):
        pass
    
    #
    def PUT(self):
        pass
        
    def POST(self):
        return invalidRequest()
    
    def DELETE(self):
        return invalidRequest()

# API page
class URL_HouseState(object):
    exposed = True
    
    #
    def GET(self):
        pass
    
    def PUT(self):
        return invalidRequest()
    
    def POST(self):
        return invalidRequest()
    
    def DELETE(self):
        return invalidRequest()

# API page
class URL_Rules(object):
    exposed = True
    
    def GET(self):
        pass
    
    def PUT(self):
        pass
    
    def POST(self):
        return invalidRequest()
    
    def DELETE(self):
        return invalidRequest()

# API page
class URL_AllMethods(object):
    exposed = True
    
    #
    def GET(self):
        pass
    
    def PUT(self):
        return invalidRequest()
    
    def POST(self):
        return invalidRequest()
    
    def DELETE(self):
        return invalidRequest()



# Global config --------------------------------------------------------

cherrypy.config.update({
    'tools.encode.on': True, 'tools.encode.encoding': 'utf-8',
    'tools.decode.on': True,
    'tools.trailing_slash.on': True,
    'server.socket_host': SERVER_SOCKET_HOST,
    'server.socket_port': SERVER_SOCKET_PORT,
    'tools.gzip.on': True,
    'tools.gzip.mime_types': ['text/html', 'text/plain', 'text/javascript', 'text/css']
})



# Bind Python objects to URLs ------------------------------------------

# Index page
rootPath = os.path.abspath(os.path.dirname(__file__))
index = cherrypy.tree.mount(URL_Index(), '/')
index.config.update({
    '/' : {
        'tools.staticdir.root': rootPath
    },
    '/css' : {
        'tools.staticdir.on' : True,
        'tools.staticdir.dir' : 'css'
    },
    '/js' : {
        'tools.staticdir.on' : True,
        'tools.staticdir.dir' : 'js'
    },
    '/img' : {
        'tools.staticdir.on' : True,
        'tools.staticdir.dir' : 'img'
    },
    '/fonts' : {
        'tools.staticdir.on' : True,
        'tools.staticdir.dir' : 'fonts'
    }
})

#Login page
loginConfig = {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher() } }
cherrypy.tree.mount(URL_Login(), '/login', loginConfig)

# API pages
apiConfig = {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher() } }
cherrypy.tree.mount(URL_HouseStructure(), '/' + APP_CONSTANTS['VERSION'] + '/houseStructure', apiConfig)
cherrypy.tree.mount(URL_HouseState(), '/' + APP_CONSTANTS['VERSION'] + '/houseState', apiConfig)
cherrypy.tree.mount(URL_Rules(), '/' + APP_CONSTANTS['VERSION'] + '/rules', apiConfig)
cherrypy.tree.mount(URL_AllMethods(), '/' + APP_CONSTANTS['VERSION'] + '/allMethods', apiConfig)



# Start server ---------------------------------------------------------
cherrypy.engine.start()
cherrypy.engine.block()