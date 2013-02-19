import unittest
import time
from robohome.houseSystem import House
from robohome.item import Openable


class MethCallLogger(object):
    def __init__(self, meth):
        self.meth = meth
        self.was_called = False

    def __call__(self, *args):
        self.meth(*args)
        self.was_called = True


class MockRoom:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.items = {}


class MockDB:
    def __init__(self):
        pass


class TestMiddleLayer(unittest.TestCase):

    def test_stateChangesTriggered(self):
        db = MockDB()
        house = House(db)
        item = Openable(1, "item1", "arduino", "door", "192.168.0.100", house.reactToEvent)
        item.stateChanged = MethCallLogger(item.stateChanged)
        room = MockRoom(1, "lounge")
        room.items = {1: item}
        house.rooms = {1: room}

        item.close()

        # Sleep for 2 seconds to give the thread a chance to call checkForStateChange()
        time.sleep(2)

        self.assertTrue(item.stateChanged.was_called)

    def test_reactToEventTriggeredByStateChange(self):
        db = MockDB()
        house = House(db)
        house.reactToEvent = MethCallLogger(house.reactToEvent)
        item = Openable(1, "item1", "arduino", "door", "192.168.0.101", house.reactToEvent)
        room = MockRoom(1, "lounge")
        room.items = {1: item}
        house.rooms = {1: room}

        item.close()

        # Sleep for 2 seconds to give the thread a chance to call checkForStateChange()
        time.sleep(2)

        self.assertTrue(house.reactToEvent.was_called)


if __name__ == '__main__':
    unittest.main()
