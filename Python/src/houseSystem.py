from item import *

types = {'motionSensor' : Item , 'lightSensor' : Item, 'temperatureSensor' : Item , 'energyMonitor' : Item , 'button' : Item , 'door' : Openable, 'window' : Openable, 'curtain' : Openable, 'plug' : OnOff, 'light' : Lights, 'radiator' : RadiatorValve}

class House:
    """
    Main class to represent the house
    """

    def __init__(self, database):
        self.database = database
        self.rooms = {}

    def initFromDatabase(self):
        """Initialises the house from the database"""

        rooms = self.database.room.retrieveAllData()
        for room in rooms:
            self.rooms[room[0]] = Room(room[0], room[1])
            items = self.database.items.retrieveForRoomId(room[0])
            if len(items) > 0:
                for item in items:
                    type = self.database.types.getNameForId(item[5])
                    self.rooms[room[0]].items[item[0]]=(types[type](item[0], item[1], item[2], item[3], type))

    def addRoom(self, name):
        """
        Adds a room to the house system and the database

        Arguments:
        name -- the name of the room
        """

        id = self.database.room.addEntry(name)
        self.rooms[id] = Room(id, name)

    def addItem(self, roomId, name, brand, type, ip):
        """
        Adds an item to the house system and the database

        Arguments:
        roomId  -- the id of the room to which the item is added
        name -- name of the item
        brand -- the brand of the item (e.g. arduino)
        type -- the type of the item (e.g. motionSensor)
        ip -- the ip of the item
        """

        typeId = self.database.types.getIdForName(type)
        itemId = self.database.items.addEntry(name, brand, ip, roomId, typeId)
        item = types[type](itemId, name, brand, ip, type)
        self.rooms[roomId].addItem(itemId, item)

class Room:
    """
    A class to represent a room inside the house
    """
    def __init__(self, _id, name):
        self.id = _id
        self.name = name
        self.items = {}

    def addItem(self, _id, item):
        """
        Adds an item to the room

        Arguments:
        _id -- the id of the item
        name -- the name of the item
        """
        self.items[_id] = item

    def getStructure(self):
        """Returns a structure of the room as a dict"""
        return {'id' : self.id, 'name' : self.name, 'items': [ {'id' : self.items[i]._id, 'name' : self.items[i].name, 'type' : self.items[i]._type, 'brand' : self.items[i].brand, 'ip' : self.items[i].ip} for i in self.items]}