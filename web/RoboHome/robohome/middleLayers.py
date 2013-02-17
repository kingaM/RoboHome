# These classes mock how the middle layers interact with items until hardware is available


class ArduinoLayer():

    def send(self, ip, command, *args):

        if ip not in mockStates:
            mockStates[ip] = 1

        return getattr(self, command)(ip, *args)

    def getState(self, ip):
        return mockStates[ip]

    def open(self, ip):
        mockStates[ip] = 1

    def close(self, ip):
        mockStates[ip] = 0

    def setOpen(self, ip, percent):
        mockStates[ip] = percent

    def on(self, ip):
        mockStates[ip] = 1

    def off(self, ip):
        mockStates[ip] = 0

    def setBrightness(self, ip, brightness):
        mockStates[ip] = brightness

    def setTemperature(self, ip, temperature):
        mockStates[ip] = temperature


class WemoLayer():
    def send(self, ip, command):
        pass


class LightwaveRFLayer():
    def send(self, ip, command):
        pass


# Mock Data
mockStates = {}

brands = {'arduino': ArduinoLayer, 'wemo': WemoLayer, 'lightwaveRF': LightwaveRFLayer, 'RF': ArduinoLayer, 'rf': ArduinoLayer}
