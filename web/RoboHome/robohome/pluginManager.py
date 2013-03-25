import os
from flask import Blueprint
from flask import *

pluginBlueprint = Blueprint('pluginManager', __name__, url_prefix='/plugins')


@pluginBlueprint.route('/<string:pluginName>/<path:path>/', methods=['GET'])
def pluginPage(pluginName, path):
    if request.method == 'GET':
        if pluginName not in plugins:
            abort(404)
        else:
            return (plugins[pluginName].getPage(path))


@pluginBlueprint.route('/<string:pluginName>/', methods=['GET'])
def pluginHome(pluginName):
    if request.method == 'GET':
        if pluginName not in plugins:
            abort(404)
        else:
            return (plugins[pluginName].getPage(None))

plugins = {}


class PluginManager():

    def __init__(self, rooms, events, queue):
        self.rooms = rooms
        self.events = events
        self.queue = queue
        subclasses = self.find_subclasses("./plugins/", Plugin)
        for s in subclasses:
            try:
                s = s()
                name = s.getName()
                s.setup(rooms, events, queue)
                if(name in plugins):
                    raise Exception("Plugin name '" + name + "'' already in use")
                plugins[name] = s
            except Exception, e:
                print "Error loading plugin: " + str(e)

    def find_subclasses(self, path, cls):
        """
        SOURCE: http://www.executionunit.com/blog/2008/01/28/python-style-plugins-made-easy/

        Find all subclass of cls in py files located below path
        (does look in sub directories)

        @param path: the path to the top level folder to walk
        @type path: str
        @param cls: the base class that all subclasses should inherit from
        @type cls: class
        @rtype: list
        @return: a list if classes that are subclasses of cls
        """

        plugins = []

        def look_for_subclass(modulename):
            #print ("Searching %s" % (modulename))
            module = __import__(modulename)

            #walk the dictionaries to get to the last one
            d = module.__dict__
            for m in modulename.split('.')[1:]:
                d = d[m].__dict__

            #look through this dictionary for things
            #that are subclass of Job
            #but are not Job itself
            for key, entry in d.items():
                if key == cls.__name__:
                    continue

                try:
                    if issubclass(entry, cls):
                        #print ("Found subclass: " + key)
                        plugins.append(entry)
                except TypeError:
                    continue

        for root, dirs, files in os.walk(path):
            for name in files:
                if name.endswith(".py") and not name.startswith("__"):
                    path = os.path.join(root, name)
                    modulename = path.replace("./", "").rsplit('.', 1)[0].replace('/', '.').replace('\\', '.')
                    look_for_subclass(modulename)

        return plugins


class Plugin(object):
    def setup(self, rooms, events, queue):
        """
        Called before the plugin is asked to do anything

        Arguments:
        rooms -- rooms in the house
        events -- events in the house
        queue -- the queue to add commands to
        """
        raise NotImplementedError("setup method missing")

    def teardown(self):
        """Called to allow the plugin to free anything"""
        raise NotImplementedError("teardown method missing")

    def getPage(self, path):
        """
        Gets a web page to display from the plugin

        Arguments:
        path -- the path of the page to display
        """
        raise NotImplementedError("getPage method missing")

    def getName(self):
        """Returns the unique name of the plugin to claim a url prefix"""
        raise NotImplementedError("getName method missing")
