import unittest
from robohome.subscriptions import SubscriptionManager


class MethCallLogger(object):
    def __init__(self):
        self.was_called = False

    def __call__(self, *args):
        self.was_called = True


class TestSubscriptionManager(unittest.TestCase):

    def test_addListener(self):
        sm = SubscriptionManager()
        mcl = MethCallLogger()
        sm.addListener(mcl)
        self.assertEqual([mcl], sm.listeners)

    def test_removeListener(self):
        sm = SubscriptionManager()
        mcl = MethCallLogger()
        sm.addListener(mcl)
        sm.removeListener(mcl)
        self.assertEqual([], sm.listeners)

    def test_notify(self):
        sm = SubscriptionManager()
        mcl1 = MethCallLogger()
        mcl2 = MethCallLogger()
        sm.addListener(mcl1)
        sm.addListener(mcl2)
        sm.notify()
        self.assertTrue(mcl1.was_called)
        self.assertTrue(mcl2.was_called)
