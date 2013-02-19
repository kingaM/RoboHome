import time
import threading

# These classes mock how the middle layers interact with items until hardware is available


class MiddleLayer(object):

    def __init__(self, ip, item):
        self.state = 0
        self.item = item
        self.ip = ip

        if self.ip not in mockStates:
            mockStates[self.ip] = 1

        if self.ip not in cachedStates:
            cachedStates[self.ip] = 1

        t = threading.Thread(target=self.checkForStateChange)
        t.daemon = True
        t.start()

    def checkForStateChange(self):
        while True:
            realState = self.checkState()

            if realState != cachedStates[self.ip]:
                cachedStates[self.ip] = realState
                t = threading.Thread(target=self.item.stateChanged, args=[realState])
                t.daemon = True
                t.start()

            time.sleep(1)

    def getState(self):
        return cachedStates[self.ip]


class ArduinoLayer(MiddleLayer):

    def __init__(self, ip, item):
        super(ArduinoLayer, self).__init__(ip, item)

    def checkState(self):
        return mockStates[self.ip]

    def send(self, command, *args):
        return getattr(self, command)(*args)

    def open(self):
        mockStates[self.ip] = 1

    def close(self):
        mockStates[self.ip] = 0

    def setOpen(self, percent):
        mockStates[self.ip] = percent

    def on(self):
        mockStates[self.ip] = 1

    def off(self):
        mockStates[self.ip] = 0

    def setBrightness(self, brightness):
        mockStates[self.ip] = brightness

    def setTemperature(self, temperature):
        mockStates[self.ip] = temperature


class WemoLayer():
    def send(self, command):
        pass


class LightwaveRFLayer():
    def send(self, command):
        pass


# Mock Data
cachedStates = {}
mockStates = {}

brands = {'arduino': ArduinoLayer, 'wemo': WemoLayer, 'lightwaveRF': LightwaveRFLayer, 'RF': ArduinoLayer, 'rf': ArduinoLayer}
