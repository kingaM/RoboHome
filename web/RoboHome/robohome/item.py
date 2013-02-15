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
        self.state = 1

    def getState(self):
        return self.state
        
"""
A class for all openable objects in the house, extends Item
e.g. doors and windows
"""
class Openable(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(Openable, self).__init__(_id, name, brand, _type, ip)

    def open(self):
        print "Open openable object"
        self.state = 1
        pass

    def close(self):
        print "Close openable object"
        self.state = 0
        pass

    def setOpen(self, percentage):
        self.state = percentage
        pass

"""
A class for any items that can be switched on and off, extends Item
e.g. plugs
"""
class OnOff(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(OnOff, self).__init__(_id, name, brand, _type, ip)

    def on(self):
        print "OnOff object on"
        self.state = 1
        pass

    def off(self):
        print "OnOff object off"
        self.state = 0
        pass

"""
A class for any lighting components in the house, extends OnOff
"""
class Lights(OnOff):

    def __init__(self, _id, name, brand, _type, ip):
        super(Lights, self).__init__(_id, name, brand, _type, ip)

    def setBrightness(self, brightness):
        print "Set brightness of lights to ", brightness
        self.state = brightness
        pass
"""
A class for radiator valves in the house, extends Item
"""
class RadiatorValve(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(RadiatorValve, self).__init__(_id, name, brand, _type, ip)

    def setTemperature(self, degrees):
        print "Set temperature of radiator valve to ", degrees
        self.state = degrees
        pass



