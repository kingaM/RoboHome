import middleLayers as Layers

"""
A defualt class for any item in the house
e.g. sensor, button
"""
class Item(object):

    def __init__(self, _id, name, brand, _type, ip):
        self._id = _id
        self.name = name
        self.brand = brand
        self.ip = ip
        self._type = _type
        self.middleLayer = Layers.brands[brand]()

    def getState(self):
        return self.middleLayer.send(self.ip, 'getState')

"""
A class for all openable objects in the house, extends Item
e.g. doors and windows
"""
class Openable(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(Openable, self).__init__(_id, name, brand, _type, ip)

    def open(self):
        return self.middleLayer.send(self.ip, 'open')

    def close(self):
        return self.middleLayer.send(self.ip, 'close')

    def setOpen(self, percentage):
        return self.middleLayer.send(self.ip, 'setOpen', percentage)

"""
A class for any items that can be switched on and off, extends Item
e.g. plugs
"""
class OnOff(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(OnOff, self).__init__(_id, name, brand, _type, ip)

    def on(self):
        return self.middleLayer.send(self.ip, 'on')

    def off(self):
       return self.middleLayer.send(self.ip, 'off')

"""
A class for any lighting components in the house, extends OnOff
"""
class Lights(OnOff):

    def __init__(self, _id, name, brand, _type, ip):
        super(Lights, self).__init__(_id, name, brand, _type, ip)

    def setBrightness(self, brightness):
        return self.middleLayer.send(self.ip, 'setBrightness', brightness)
"""
A class for radiator valves in the house, extends Item
"""
class RadiatorValve(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(RadiatorValve, self).__init__(_id, name, brand, _type, ip)

    def setTemperature(self, degrees):
        return self.middleLayer.send(self.ip, 'setTemperature', degrees)
