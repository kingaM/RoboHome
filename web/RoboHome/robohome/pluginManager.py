import os

class PluginManager():

    def __init__(self, rooms, events, queue):
        self.rooms = rooms
        self.events = events
        self.queue = queue
        self.plugins = self.find_subclasses("./plugins/", Plugin)

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
            print ("Searching %s" % (modulename))
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
                        print ("Found subclass: " + key)
                        plugins.append(entry)
                except TypeError:
                    continue

        for root, dirs, files in os.walk(path):
            for name in files:
                if name.endswith(".py") and not name.startswith("__"):
                    path = os.path.join(root, name)
                    modulename = path.replace("./", "").rsplit('.', 1)[0].replace('/', '.')
                    look_for_subclass(modulename)

        return plugins

class Plugin(object):
    def setup(self):
        """Called before the plugin is asked to do anything"""
        raise NotImplementedError

    def teardown(self):
        """Called to allow the plugin to free anything"""
        raise NotImplementedError

    def getPage(self, url):
        """
        Gets a web page to display from the plugin

        Arguments:
        url -- the url of the page to display
        """
        raise NotImplementedError
