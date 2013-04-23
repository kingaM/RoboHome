import time
import socket
import threading
import requests
import json
import platform
import wemo
import urllib2
from flask import Blueprint
from flask import *
import databaseTables as db


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
        return self.state


class MockLayer(MiddleLayer):

    def __init__(self, ip, item):
        super(MockLayer, self).__init__(ip, item)

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


class ArduinoLayer(MiddleLayer):
    def __init__(self, ip, item):
        super(ArduinoLayer, self).__init__(ip, item)

    def checkState(self):
        try:
            response = requests.get('http://'+self.ip+'/state')
            return json.loads(response.content)['state']
        except Exception:
            return self.mockState

    def send(self, command, *args):
        return getattr(self, command)(*args)

    def open(self):
        requests.get('http://'+self.ip+'/open')

    def close(self):
        requests.get('http://'+self.ip+'/close')

    def on(self):
        requests.get('http://'+self.ip+'/on')

    def off(self):
        requests.get('http://'+self.ip+'/off')


class WemoLayer(MiddleLayer):

    def __init__(self, ip, item):
        self.ready = False
        super(WemoLayer, self).__init__(ip, item)
        if platform.system() == 'Linux' or platform.system() == 'Darwin':
            self.wemoHelper = wemo.WemoHelper(ip)
            self.ready = True

    def send(self, command, *args):
        return getattr(self, command)(*args)

    def checkState(self):
        if (platform.system() == 'Linux' or platform.system() == 'Darwin') and self.ready:
            return self.wemoHelper.getState()
        return self.mockState

    def on(self):
        if platform.system() == 'Linux' or platform.system() == 'Darwin':
            self.wemoHelper.on()
        self.mockState = 1

    def off(self):
        if platform.system() == 'Linux' or platform.system() == 'Darwin':
            return self.wemoHelper.off()
        self.mockState = 0


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


class LightwaveRFLayer(MiddleLayer):
    def __init__(self, ip, item):
        self.ready = False
        super(LightwaveRFLayer, self).__init__(ip, item)

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
            self.contState = 0
            self.db = db.Database()
            self.sock.bind(("0.0.0.0", 9761))
            t1 = threading.Thread(target=self.pollEnergy)
            t1.daemon = True
            t1.start()

            t2 = threading.Thread(target=self.listenForEnergy)
            t2.daemon = True
            t2.start()

            t3 = threading.Thread(target=self.storeEnergy)
            t3.daemon = True
            t3.start()

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
                s = int(s.split(",")[0])
                self.contState = s
                if s > 300:
                    self.state = 1
                else:
                    self.state = 0

    def storeEnergy(self):
        while True:
            self.db.energy.addEntry(self.contState)
            time.sleep(30)

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



brands = {'mock': MockLayer, 'arduino': ArduinoLayer, 'gadgeteer': GadgeteerLayer, 'wemo': WemoLayer, 'lightwaveRF': LightwaveRFLayer, 'RF': ArduinoLayer, 'rf': ArduinoLayer}