import os
parentdir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.sys.path.insert(0, parentdir)
from pluginManager import Plugin


class Wall(Plugin):
    def setup(self, rooms, events, queue):
        pass

    def getName(self):
        return "wall"

    def getPage(self, path):
        if(path is None):
            with open('./plugins/wall/page.html', 'r') as content_file:
                return content_file.read()
        else:
            """
            html = "<html><body><iframe width=\"100%\" height=\"100%\"  frameBorder=\"0\" src=\"http://www.twiddla.com/" + path + "\"></iframe></body></html>"
            with open('./plugins/wall/page.html', 'w') as content_file:
                content_file.write(html)
            return "Wall Saved"
            """
            return ''

    def teardown(self):
        pass
