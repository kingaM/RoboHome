import time
import threading
import urllib2
from flask import Blueprint
from flask import *

items = {}

gadgeteerBlueprint = Blueprint('item', __name__, url_prefix='/gadgeteer')


@gadgeteerBlueprint.route('/state/<int:status>/', methods=['PUT'])
def gadgeteerStatusUpdate(status):
    if request.method == 'PUT':
        if not request.headers.getlist("X-Forwarded-For"):
            ip = request.remote_addr
        else:
            ip = request.headers.getlist("X-Forwarded-For")[0]
        items[ip].updateState(status)
        return ("success")



# Some of these classes mock how the middle layers interact with items until hardware is available


class MiddleLayer(object):

    def __init__(self, ip, item):
        self.state = 1
        self.mockState = 1
        self.item = item
        self.ip = ip

        t = threading.Thread(target=self.checkForStateChange)
        t.daemon = True
        t.start()

    def checkForStateChange(self):
        while True:
            realState = self.checkState()

            if realState != self.state:
                self.state = realState
                t = threading.Thread(target=self.item.stateChanged, args=[realState])
                t.daemon = True
                t.start()

            time.sleep(1)

    def getState(self):
        return self.state


class ArduinoLayer(MiddleLayer):

    def __init__(self, ip, item):
        super(ArduinoLayer, self).__init__(ip, item)

    def checkState(self):
        return self.mockState

    def send(self, command, *args):
        return getattr(self, command)(*args)

    def open(self):
        self.mockState = 1

    def close(self):
        self.mockState = 0

    def setOpen(self, percent):
        self.mockState = percent

    def on(self):
        self.mockState = 1

    def off(self):
        self.mockState = 0

    def setBrightness(self, brightness):
        self.mockState = brightness

    def setTemperature(self, temperature):
        self.mockState = temperature


class GadgeteerLayer(MiddleLayer):
    def __init__(self, ip, item):
        #super(GadgeteerLayer, self).__init__(ip, item) -- No need to poll the state now since Gadgeteer can send PUT requests
        self.state = 1
        self.item = item
        self.ip = ip
        items[ip] = self

    def checkState(self):
        return int(urllib2.urlopen("http://" + self.ip + "/state").read())

    def updateState(self, state):
        self.state = state
        self.item.stateChanged(state)

    def send(self, command, *args):
        return getattr(self, command)(*args)


class WemoLayer():
    def send(self, command):
        pass


class LightwaveRFLayer():
    def send(self, command):
        pass


brands = {'arduino': ArduinoLayer, 'gadgeteer': GadgeteerLayer, 'wemo': WemoLayer, 'lightwaveRF': LightwaveRFLayer, 'RF': ArduinoLayer, 'rf': ArduinoLayer}
