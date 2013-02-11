from Queue import PriorityQueue

priorities = {'open' : 1, 'close' : 0, 'getState' : 2, 'on' : 1, 'off' : 1, 'setBrightness' : 2, 'setTemperature' : 2}

class MyPriorityQueue(PriorityQueue):
    """
    A class that defines a priority queue for method calls
    The highest priority is 0, lowest is 2
    """
    def __init__(self):
        PriorityQueue.__init__(self)

    def put(self, roomId, itemId, method, args=[]):
        """
        Adds an item to the queue

        Arguments:
        roomId -- id of the room
        itemId -- id of the item
        method -- method to be called
        args -- arguments of the method, empty list by default
        """
        PriorityQueue.put(self, (priorities[method], roomId, itemId, method, args))

    def get(self, *args, **kwargs):
        """
        Gets the item with highest priority from the queue
        """
        _, roomId, itemId, method, args = PriorityQueue.get(self, *args, **kwargs)
        return (roomId, itemId, method, args)