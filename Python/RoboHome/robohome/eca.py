class Event():
    """
    Represents an event that can br triggered by items in the house
    """
    def __init__(self, id, type, item, room, trigger, enabled):
        self.id = id
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
    def __init__(self, id, item, method, equivalence, value):
        self.id = id
        self.item = item
        self.method = method
        self.equivalence = equivalence
        self.value = value

    def check(self):

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
    def __init__(self, id, item, room, method, type):
        self.id = id
        self.item = item
        self.room = room
        self.method = method
        self.type = type

    def doAction(self):
        if self.item != None and self.room != None:
            raise Exception("Invalid action at Id " + str(self.id))

        elif self.item != None:
            getattr(self.item, self.method)()

        elif self.room != None:
            items = self.room.items
            for key in items:
                if items[key]._type is self.type:
                    getattr(items[key], self.method)()

        # Next feature: All of item type in house
