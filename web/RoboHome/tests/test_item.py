import unittest
from robohome.item import Item, Openable

class MethCallLogger(object):
   def __init__(self, meth, args=[]):
     self.meth = meth
     self.was_called = False
     self.args = args

   def __call__(self, code=None):
     self.meth(*self.args)
     self.was_called = True

class TestItem(unittest.TestCase):

    def test_Item_init_ordered(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Item(_id, name, brand, _type, ip)
        self.assertEqual(_id, i._id)
        self.assertEqual(name, i.name)
        self.assertEqual(brand, i.brand)
        self.assertEqual(_type, i._type)
        self.assertEqual(ip, i.ip)

    def test_Item_init_unordered(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Item(_id=_id, brand=brand, _type=_type, ip=ip, name=name)
        self.assertEqual(_id, i._id)
        self.assertEqual(name, i.name)
        self.assertEqual(brand, i.brand)
        self.assertEqual(_type, i._type)
        self.assertEqual(ip, i.ip)

    def test_Item_init_invalid(self):
        _id = 1
        name = "test"
        brand = "RF"
        ip = "0.0.0.0"
        self.assertRaises(TypeError, Item, _id, name, brand, ip)

    def test_getState(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Item(_id, name, brand, _type, ip)
        i.getState = MethCallLogger(i.getState)
        i.getState()
        assert(i.getState.was_called)

class TestOpenable(unittest.TestCase):

    def test_Openable_init_ordered(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Openable(_id, name, brand, _type, ip)
        self.assertEqual(_id, i._id)
        self.assertEqual(name, i.name)
        self.assertEqual(brand, i.brand)
        self.assertEqual(_type, i._type)
        self.assertEqual(ip, i.ip)

    def test_Openable_init_unordered(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Openable(_id=_id, brand=brand, _type=_type, ip=ip, name=name)
        self.assertEqual(_id, i._id)
        self.assertEqual(name, i.name)
        self.assertEqual(brand, i.brand)
        self.assertEqual(_type, i._type)
        self.assertEqual(ip, i.ip)

    def test_Openable_init_invalid(self):
        _id = 1
        name = "test"
        brand = "RF"
        ip = "0.0.0.0"
        self.assertRaises(TypeError, Openable, _id, name, brand, ip)

    def test_getState(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Openable(_id, name, brand, _type, ip)
        i.getState = MethCallLogger(i.getState)
        i.getState()
        assert(i.getState.was_called)

    def test_open(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Openable(_id, name, brand, _type, ip)
        i.open = MethCallLogger(i.open)
        i.open()
        assert(i.open.was_called)

    def test_close(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Openable(_id, name, brand, _type, ip)
        i.close = MethCallLogger(i.close)
        i.close()
        assert(i.close.was_called)

    def test_setOpen(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        percentage = 10
        i = Openable(_id, name, brand, _type, ip)
        i.setOpen = MethCallLogger(i.setOpen, [percentage])
        i.setOpen(percentage)
        assert(i.setOpen.was_called)

    def test_setOpen_noarg(self):
        _id = 1
        name = "test"
        brand = "RF"
        _type = "door"
        ip = "0.0.0.0"
        i = Openable(_id, name, brand, _type, ip)
        self.assertRaises(TypeError, i.setOpen)

if __name__ == '__main__':
    unittest.main()