class Event():
    """
    Represents an event that can br triggered by items in the house
    """
    def __init__(self, id, name, type, item, room, trigger, enabled):
        self.id = id
        self.name = name
        self.type = type
        self.item = item
        self.room = room
        self.trigger = trigger
        self.enabled = enabled
        self.conditions = []
        self.actions = []


class Condition():
    """
    Represents a condition that is checked upon an event being triggered
    """
    def __init__(self, id, item, method, methodName, equivalence, value):
        self.id = id
        self.item = item
        self.method = method
        self.methodName = methodName
        self.equivalence = equivalence
        self.value = value

    def check(self):
        """
        Checks if a condition is true with the current house state
        """
        switch = {"=": (lambda x, y: x == y), "<": (lambda x, y: x < y), ">": (lambda x, y: x > y)}

        try:
            state = getattr(self.item, self.method)()
        except Exception:
            raise Exception("Invalid method \"" + self.method + "\" for item " + self.item.name)

        if state is None or self.value is None:
            return False

        try:
            return switch[self.equivalence](state, self.value)
        except Exception:
            raise Exception("Invalid condition equivalence: " + self.equivalence)


class Action():
    """
    Represents an action that is performed as a result of an event's conditions being satisfied
    """
    def __init__(self, id, item, room, method, methodName, _type):
        self.id = id
        self.item = item
        self.room = room
        self.method = method
        self.methodName = methodName
        self.type = _type

    def isAllItemsInHouse(self):
        if self.room == None and self.item == None:
            return True
        else:
            return False

    def doAction(self, itemsForType=[]):
        """
        Performs the action on the correct items

        Arguments:
        itemsForType -- all items in the house of the correct type (needed if there is nether a room or item)
        """
        if self.item != None and self.room != None:
            raise Exception("Invalid action at Id " + str(self.id))

        elif self.item != None:
            getattr(self.item, self.method)()

        elif self.room != None:
            items = self.room.items
            for key in items:
                if items[key]._type is self._type:
                    getattr(items[key], self.method)()

        else:
            for item in itemsForType:
                getattr(item, self.method)()

    def getItemsActedOn(self):
        """
        Gets the items that this action affects
        """
        return (self.item, self.room, self._type)

    def isConflictWithOtherActions(self, otherItemsActedOn):
        """
        Determines if the results of this action will conflict with other actions

        Arguments:
        otherItemsActedOn -- a list of the other results to compare with (taken from getItemsActedOn)
        """
        for x in otherItemsActedOn:
            if x[0] == self.item:
                return True
            if x[1] == self.room and x[2] == self._type:
                return True
            if x[0] == None and x[1] == None and x[2] == self._type:
                return True
        return False
