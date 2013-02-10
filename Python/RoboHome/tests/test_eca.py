import unittest
import robohome.eca as eca


class TestECA(unittest.TestCase):

    def setUp(self):
        pass

    def test_check_equals(self):
        condition = eca.Condition(1, MockItem(1), "getState", "=", 1)
        self.assertTrue(condition.check())

        condition = eca.Condition(1, MockItem(0), "getState", "=", 1)
        self.assertFalse(condition.check())

    def test_check_inequality(self):
        condition = eca.Condition(1, MockItem(100), "getState", ">", 1)
        self.assertTrue(condition.check())

        condition = eca.Condition(1, MockItem(100), "getState", "<", 1)
        self.assertFalse(condition.check())

        condition = eca.Condition(1, MockItem(1), "getState", ">", 100)
        self.assertFalse(condition.check())

        condition = eca.Condition(1, MockItem(1), "getState", "<", 100)
        self.assertTrue(condition.check())

    def test_check_nulls(self):
        condition = eca.Condition(None, MockItem(1), "getState", ">", 1)
        self.assertFalse(condition.check())

        condition = eca.Condition(1, MockItem(1), "getState", ">", None)
        self.assertFalse(condition.check())

    def test_check_invalidEquivalence(self):
        condition = eca.Condition(1, MockItem(1), "getState", "test", 1)
        self.assertRaises(Exception, condition.check)

    def test_check_methodCalled(self):
        mockItem = MockItem(1)
        mockItem.getState = MethCallLogger(mockItem.getState)
        condition = eca.Condition(1, mockItem, "getState", "=", 1)
        condition.check()
        self.assertTrue(mockItem.getState.was_called)

    def test_check_invalidMethod(self):
        condition = eca.Condition(1, MockItem(1), "badMethod", "=", 1)
        self.assertRaises(Exception, condition.check)

    def test_doAction_invalidRoomItemCombo(self):
        action = eca.Action(1, MockItem(1), MockRoom(), "mockMethod", "mockType")
        self.assertRaises(Exception, action.doAction)

    def test_doAction_methodCalled(self):
        mockItem = MockItem(1)
        mockItem.mockMethod = MethCallLogger(mockItem.mockMethod)
        action = eca.Action(1, mockItem, None, "mockMethod", "mockType")
        action.doAction()
        self.assertTrue(mockItem.mockMethod.was_called)


class MockItem():
    def __init__(self, state):
        self.state = state
        self.name = "mockName"
        self.type = "mockType"

    def getState(self):
        return self.state

    def mockMethod(self):
        pass


class MockRoom():
    def __init__(self):
        self.items = {1: MockItem(1), 1: MockItem(1), 1: MockItem(1), 1: MockItem(1)}


class MockHouse():
    def __init__(self):
        self.rooms = {}


class MethCallLogger(object):
    def __init__(self, meth):
        self.meth = meth
        self.was_called = False

    def __call__(self, code=None):
        self.meth()
        self.was_called = True


if __name__ == '__main__':

    unittest.main()
