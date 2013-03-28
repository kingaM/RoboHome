import os
parentdir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.sys.path.insert(0, parentdir)
from pluginManager import Plugin


class myTest(Plugin):
    def setup(self, rooms, events, queue):
        pass

    def getName(self):
        return "testPlugin"

    def getPage(self, path):
        return("This is a test")

    def teardown(self):
        pass
