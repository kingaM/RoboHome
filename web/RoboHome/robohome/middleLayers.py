import time
import socket
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

            time.sleep(2)

    def getState(self):
        print self.state
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


class LightwaveRFLayer(MiddleLayer):
    def __init__(self, ip, item):
        self.ready = False
        #super(LightwaveRFLayer, self).__init__(ip, item)

        self.state = 1    # Remove when constructor is back
        self.mockState = 1    # Remove when constructor is back
        self.item = item    # Remove when constructor is back
        self.ip = ip    # Remove when constructor is back

        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.state = 0

        if(item._type != "energyMonitor"):
            #Needs improved error handling
            self.ip = ip.split(":")[0]
            self.room = ip.split("R")[1]
            self.room = self.room.split(":")[0]
            self.device = ip.split("D")[1]
        else:
            self.sock.bind(("0.0.0.0", 9761))
            #t1 = threading.Thread(target=self.pollEnergy)
            #t1.daemon = True
            #t1.start()

            t2 = threading.Thread(target=self.listenForEnergy)
            t2.daemon = True
            t2.start()

            self.sock.sendto(",@?\0", (self.ip, 9760))

        self.ready = True

    def checkState(self):
        # Force state stored in memory so the system knows the true state
        #if self.item._type != "energyMonitor" and self.ready:
        #    if self.state == 1:
        #        self.on()
        #    else:
        #        self.off()
        return self.state

    def send(self, command, *args):
        return getattr(self, command)(*args)

    def sendToWiFiLink(self, roomId, deviceId, commandId, messageTop, messageBottom):
        self.sock.sendto("!R%sD%sF%s|||" % (roomId, deviceId, commandId), (self.ip, 9760))

    def pollEnergy(self):
        while True:
            self.sock.sendto(",@?\0", (self.ip, 9760))
            time.sleep(5)

    def listenForEnergy(self):
        while True:
            data, addr = self.sock.recvfrom(1024)
            if(len(data) > 8):
                s = data.split("=")[1]
                self.state = int(s.split(",")[0])
                print self.state
                return

    def on(self):
        if self.item._type != "energyMonitor":
            self.state = 1
        self.sendToWiFiLink(self.room, self.device, 1, self.item._type, "On")

    def off(self):
        if self.item._type != "energyMonitor":
            self.state = 0
        self.sendToWiFiLink(self.room, self.device, 0, self.item._type, "Off")

    def setBrightness(self, brightness):
        self.mockState = brightness


brands = {'arduino': ArduinoLayer, 'gadgeteer': GadgeteerLayer, 'wemo': WemoLayer, 'lightwaveRF': LightwaveRFLayer, 'RF': ArduinoLayer, 'rf': ArduinoLayer}
