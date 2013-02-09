import unittest
from robohome.houseSystem import Room, House

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
        self.items = {}

class MockEvent:
    def __init__(self, id, type, item, room, trigger, enabled):
        self.id = id
        self.item = item
        self.type = type
        self.trigger = trigger
        self.enabled = enabled
        self.room = room
        self.conditions = []
        self.actions = []

class MockRoomTable:

    def __init__(self):
        self.entries = []
        self.i = -1
        pass

    def addEntry(self, name):
        self.i +=1
        self.entries.append(MockRoom(self.i, name))
        return self.i

    def retrieveAllData(self):
        return ((1, "lounge"),)

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

class MockEventsTable:
    def getEvents(self):
        return ((1, "mockType", 1, 1, "mockTrigger", 1),)

class MockConditionsTable:
    def getConditionsForEvent(self, event):
        return ((1, 1, "mockSignature", "=", 1),)

class MockActionsTable:
    def getActionsForEvent(self, event):
        return ((1, 1, None, "mockSignature", "mockType"),)

class MockDatabase:

    def __init__(self):
        self.room = MockRoomTable()
        self.types = MockTypesTable()
        self.items = MockItemsTable()
        self.events = MockEventsTable()
        self.conditions = MockConditionsTable()
        self.actions = MockActionsTable()

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
        self.assertEqual(h.rooms[1].name, "lounge")
        self.assertEqual(h.rooms[1].id, 1)

    def test_getRoomByItemId(self):
        db = MockDatabase()
        h = House(db)
        roomId = h.addRoom("lounge")
        id = 0
        itemId = h.addItem(id, "sensor", "rf", "motionSensor", "0.0.0.0")
        room = h.getRoomByItemId(itemId)
        self.assertEqual(room.name, "lounge")
        self.assertEqual(room.id, roomId)

    def test_getItemById(self):
        db = MockDatabase()
        h = House(db)
        h.addRoom("lounge")
        id = 0
        itemId = h.addItem(id, "sensor", "rf", "motionSensor", "0.0.0.0")
        item = h.getItemById(itemId)
        self.assertEqual(item.name, "sensor")
        self.assertEqual(item._type, "motionSensor")
        self.assertEqual(item._id, itemId)
        self.assertEqual(item.ip, "0.0.0.0")
        self.assertEqual(item.brand, "rf")

    def test_getItemByIP(self):
        db = MockDatabase()
        h = House(db)
        item = MockItem(1, "mockName", "mockBrand", "mockType", "192.168.0.100")
        room = MockRoom(1, "lounge")
        room.items = {1: item}
        h.rooms = {1: room}
        self.assertEqual(h.getItemByIP("192.168.0.100"), item)

    def test_getItemByIP_error(self):
        db = MockDatabase()
        h = House(db)
        self.assertRaises(Exception, h.getItemByIP, "192.168.0.100")

    def test_getEventsForTrigger(self):
        db = MockDatabase()
        h = House(db)
        item1 = MockItem(1, "mockName", "mockBrand", "mockType", "mockIP")
        item2 = MockItem(2, "mockName", "mockBrand", "mockType", "mockIP2")
        room = MockRoom(1, "lounge")
        room.items = {1: item1, 2: item2}

        event1 = MockEvent(1, "mockType", item1, None, "mockTrigger", 1)
        event2 = MockEvent(2, "mockType", item2, None, "mockTrigger", 1)
        event3 = MockEvent(3, "mockType", item2, None, "mockTrigger2", 1)

        h.events = [event1, event2, event3]
        h.rooms = {1: room}

        self.assertEqual(h.getEventsForTrigger(item2, "mockTrigger"), [event2])


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