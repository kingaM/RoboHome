import os
import zipfile
import shutil
from werkzeug import secure_filename


class PluginManager():

    def __init__(self, rooms, events, queue):
        self.pluginsDir = "./plugins/"
        self.plugins = {}
        self.rooms = rooms
        self.events = events
        self.queue = queue
        self.loadPlugins()

    def loadPlugins(self):
        """
        Loads plugins into the manager for later use
        """

        # Incase of reloading plugins - Teardown and empty
        for plugin in self.plugins:
            self.plugins[plugin].teardown()
        self.plugins = {}

        subclasses = self.find_subclasses("./plugins/", Plugin)
        for s in subclasses:
            try:
                s = s()
                name = s.getName()
                s.setup(self.rooms, self.events, self.queue)
                if(name in self.plugins):
                    raise Exception("Plugin name '" + name + "'' already in use")
                self.plugins[name] = s
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

    def getPlugins(self):
        """
        Returns a list of loaded plugins in the correct format for the API
        """
        pluginNames = []
        for p in self.plugins:
            pluginNames.append(p)
        return {"plugins": pluginNames}

    def uploadPlugin(self, file):
        """
        Saves and unzips a file uploaded through Flask

        SOURCE: http://flask.pocoo.org/docs/patterns/fileuploads/
        SOURCE: http://stackoverflow.com/questions/7806563/how-to-unzip-a-zip-file-with-python-2-4

        Arguments:
        file -- the file being uploaded
        """

        if file and file.filename.rsplit('.', 1)[1] == 'zip':
            zipName = file.filename.rsplit('.', 1)[0]
            filename = secure_filename(file.filename)
            path = os.path.join("./plugins", filename)
            file.save(path)

            zfile = zipfile.ZipFile(path)

            if not os.path.exists(self.pluginsDir + zipName):
                os.mkdir(self.pluginsDir + zipName)

            for name in zfile.namelist():
                (dirname, filename) = os.path.split(name)
                dirname = self.pluginsDir + zipName + "/" + dirname
                if not os.path.exists(dirname):
                    os.mkdir(dirname)
                fd = open(self.pluginsDir + zipName + "/" + name, "w")
                fd.write(zfile.read(name))
                fd.close()

            self.loadPlugins()
            return "Plugin Installed"
        return "File must be a .zip file"

    def deletePlugin(self, pluginName):
        """
        Deletes a plugin

        Arguments:
        pluginName -- the name (Plugin.getName()) of the plugin to be deleted
        """
        self.plugins[pluginName].teardown()
        shutil.rmtree(self.pluginsDir + pluginName)
        self.loadPlugins()
        return "Plugin Deleted"

    def notify(self, ip, trigger):
        """
        Informs all plugins of an event

        Arguments:
        ip -- the IP address of the item that sent the trigger
        trigger -- the name of the trigger
        """
        for p in self.plugins:
            try:
                self.plugins[p].notify(ip, trigger)
            except Exception, e:
                print e


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

    def notify(self, ip, trigger):
        """
        Reacts to an event

        Arguments:
        ip -- the IP address of the item that sent the trigger
        trigger -- the name of the trigger
        """
        raise NotImplementedError("notify method missing")

    def getName(self):
        """Returns the unique name of the plugin to claim a url prefix"""
        raise NotImplementedError("getName method missing")
