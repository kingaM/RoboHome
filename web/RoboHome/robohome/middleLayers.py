import time
import threading
import requests
import json
import platform
from wemo import WemoHelper

# These classes mock how the middle layers interact with items until hardware is available


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
            response = requests.get('http://'+self.ip+'/status')
            return json.loads(response.content)['status']
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
        super(WemoLayer, self).__init__(ip, item)
        if platform.system() == 'Linux' or platform.system() == 'Darwin':   
            self.wemoHelper = WemoHelper(ip)

    def send(self, command, *args):
        return getattr(self, command)(*args)

    def checkState(self):
        if platform.system() == 'Linux' or platform.system() == 'Darwin':    
            return self.wemoHelper.getState()
        return self.mockState

    def on(self):
        if platform.system == 'Linux' or platform.system == 'Darwin':    
            self.wemoHelper.on()
        self.mockState = 1

    def off(self):
        if platform.system == 'Linux' or platform.system == 'Darwin':    
            return self.wemoHelper.off()
        self.mockState = 0


class LightwaveRFLayer():
    def send(self, command):
        pass


brands = {'mock': MockLayer, 'arduino': ArduinoLayer, 'wemo': WemoLayer, 'lightwaveRF': LightwaveRFLayer}
