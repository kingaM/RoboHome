import unittest
from robohome.listeners import ListenerManager


class MethCallLogger(object):
    def __init__(self):
        self.was_called = False

    def __call__(self, *args):
        self.was_called = True


class TestListenerManager(unittest.TestCase):

    def test_addListener(self):
        lm = ListenerManager()
        mcl = MethCallLogger()
        lm.addListener(mcl)
        self.assertEqual([mcl], lm.listeners)

    def test_removeListener(self):
        lm = ListenerManager()
        mcl = MethCallLogger()
        lm.addListener(mcl)
        lm.removeListener(mcl)
        self.assertEqual([], lm.listeners)

    def test_notify(self):
        lm = ListenerManager()
        mcl1 = MethCallLogger()
        mcl2 = MethCallLogger()
        lm.addListener(mcl1)
        lm.addListener(mcl2)
        lm.notify("mockIP", "mockEvent")
        self.assertTrue(mcl1.was_called)
        self.assertTrue(mcl2.was_called)
