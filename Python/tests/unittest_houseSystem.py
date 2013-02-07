import unittest
from houseSystem_new import Room, House

class MockItem:

    def __init__(self, _id, name, brand, _type, ip):
        self._id = _id
        self.name = name
        self.brand = brand
        self._type = _type
        self.ip = ip

class MockRoom:
    def __init__(self, id, name):
        self.id = id
        self.name = name

class MockRoomTable:

    i = -1

    def __init__(self):
        self.entries = []
        self.i = -1
        pass

    def addEntry(self, name):
        self.i +=1
        self.entries.append(MockRoom(self.i, name))
        return self.i

    def retrieveAllData(self):
        return ((1, "lounge"), )


class MockTypesTable:

    def __init__(self):
        self.entries = []
        pass

    def getIdForName(self, type):
        return 1

    def getNameForId(self, id):
        return "motionSensor"

class MockItemsTable:

    i = -1

    def __init__(self):
        self.entries = []
        pass  

    def addEntry(self, name, brand, ip, roomId, typeId):
        MockItemsTable.i +=1
        self.entries.append(MockItem(MockItemsTable.i, name, brand, typeId, ip))
        return MockItemsTable.i

    def retrieveForRoomId(self, id):
        return ((1, "sensor", "rf", "0.0.0.0", id, 1),)


class MockDatabase:

    def __init__(self):
        self.room = MockRoomTable()
        self.types = MockTypesTable()
        self.items = MockItemsTable()



class TestHouse(unittest.TestCase):

    def test_init(self):
        db = MockDatabase()
        h = House(db)
        self.assertEqual({}, h.rooms)
        self.assertEqual(db, h.database)

    def test_addRoom(self):
        db = MockDatabase()
        h = House(db)
        h.addRoom("lounge")
        self.assertEqual(h.rooms[db.room.i].id, db.room.entries[db.room.i].id)
        self.assertEqual(h.rooms[db.room.i].name, db.room.entries[db.room.i].name)

    def test_addItem(self):
        db = MockDatabase()
        h = House(db)
        h.addRoom("lounge")
        h.addItem(0, "sensor", "rf", "motionSensor", "0.0.0.0")
        self.assertEqual(h.rooms[db.room.i].items[MockItemsTable.i]._id, db.items.entries[MockItemsTable.i]._id)
        self.assertEqual(h.rooms[db.room.i].items[MockItemsTable.i].name, db.items.entries[MockItemsTable.i].name)
        self.assertEqual(h.rooms[db.room.i].items[MockItemsTable.i]._type, "motionSensor")
        self.assertEqual(h.rooms[db.room.i].items[MockItemsTable.i].brand, db.items.entries[MockItemsTable.i].brand)
        self.assertEqual(h.rooms[db.room.i].items[MockItemsTable.i].ip, db.items.entries[MockItemsTable.i].ip)

    def test_initFromDatabase(self):
        db = MockDatabase()
        h = House(db)
        h.initFromDatabase()
        print "ROOM", h.rooms
        self.assertEqual(h.rooms[1].name, "lounge")
        self.assertEqual(h.rooms[1].id, 1)

class TestRoom(unittest.TestCase):

    def test_init(self):
        _id = 1
        name = "test"
        r = Room(_id, name)
        self.assertEqual(_id, r.id)
        self.assertEqual(name, r.name)
        self.assertEqual({}, r.items)

    def test_addItem(self):
        item = MockItem(1, 'a', 'a', 'a', '1')
        _id = 1
        name = "test"
        r = Room(_id, name)
        r.addItem(1, item)
        self.assertEqual(item, r.items[1])
        self.assertEqual(len(r.items), 1)

    def test_getStrucutre(self):
        item = MockItem(1, 'a', 'a', 'a', '1')
        _id = 1
        name = "test"
        r = Room(_id, name)
        r.addItem(1, item)
        self.assertEqual(r.getStructure(), {'id' : 1, 'name' : "test", 'items': [{'id' : 1, 'name' : 'a', 'type' : 'a', 'brand' : 'a', 'ip' : '1'}]}) 

    def test_getStrucutre_noItems(self):
        _id = 1
        name = "test"
        r = Room(_id, name)
        self.assertEqual(r.getStructure(), {'id' : 1, 'name' : "test", 'items': []}) 

if __name__ == '__main__':
    unittest.main()