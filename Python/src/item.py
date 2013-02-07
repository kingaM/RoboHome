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

    def getState(self):
        return 1
        
"""
A class for all openable objects in the house, extends Item
e.g. doors and windows
"""
class Openable(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(Openable, self).__init__(_id, name, brand, _type, ip)

    def open(self):
        print "Open openable object"
        pass

    def close(self):
        print "Close openable object"
        pass

    def setOpen(percentage):
        pass

"""
A class for any items that can be switched on and off, extends Item
e.g. plugs
"""
class OnOff(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(OnOff, self).__init__(_id, name, brand, _type, ip)

    def on(self):
        pass

    def off(self):
        pass

"""
A class for any lighting components in the house, extends OnOff
"""
class Lights(OnOff):

    def __init__(self, _id, name, brand, _type, ip):
        super(OnOff, self).__init__(_id, name, brand, _type, ip)

    def setBrightness(self, brightness):
        pass
"""
A class for radiator valves in the house, extends Item
"""
class RadiatorValve(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(RadiatorValve, self).__init__(_id, name, brand, _type, ip)

    def setTemperature(self, degrees):
        pass



