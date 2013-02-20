import middleLayers as Layers
from subscriptions import SubscriptionManager

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
        self.middleLayer = Layers.brands[brand](self.ip, self)
        self.subscriptionManager = SubscriptionManager()

    def getState(self):
        return self.middleLayer.send('getState')

    def stateChanged(self, newState):
        states = staticData.states[self._type]
        for state in states:
            if state["id"] == newState:
                self.subscriptionManager.notify(self.ip, state["name"])


"""
A class for all openable objects in the house, extends Item
e.g. doors and windows
"""
class Openable(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(Openable, self).__init__(_id, name, brand, _type, ip)

    def open(self):
        return self.middleLayer.send('open')

    def close(self):
        return self.middleLayer.send('close')

    def setOpen(self, percentage):
        return self.middleLayer.send('setOpen', percentage)

"""
A class for any items that can be switched on and off, extends Item
e.g. plugs
"""
class OnOff(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(OnOff, self).__init__(_id, name, brand, _type, ip)

    def on(self):
        return self.middleLayer.send('on')

    def off(self):
       return self.middleLayer.send('off')

"""
A class for any lighting components in the house, extends OnOff
"""
class Lights(OnOff):

    def __init__(self, _id, name, brand, _type, ip):
        super(Lights, self).__init__(_id, name, brand, _type, ip)

    def setBrightness(self, brightness):
        return self.middleLayer.send('setBrightness', brightness)
"""
A class for radiator valves in the house, extends Item
"""
class RadiatorValve(Item):

    def __init__(self, _id, name, brand, _type, ip):
        super(RadiatorValve, self).__init__(_id, name, brand, _type, ip)

    def setTemperature(self, degrees):
        return self.middleLayer.send('setTemperature', degrees)

#This import needs to be at the bottom
import staticData
