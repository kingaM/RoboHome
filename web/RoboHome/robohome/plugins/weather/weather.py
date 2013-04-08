import os
parentdir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.sys.path.insert(0, parentdir)
from pluginManager import Plugin


class Weather(Plugin):
    def setup(self, rooms, events, queue):
        pass

    def getName(self):
        return "weather"

    def getPage(self, path):
        with open('./plugins/weather/page.html', 'r') as content_file:
            return content_file.read()

    def teardown(self):
        pass

    def notify(self, ip, trigger):
        pass
