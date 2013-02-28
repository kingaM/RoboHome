from item import *
import eca
from priorityQueue import MyPriorityQueue
from threading import Thread
import staticData as data
from listeners import ListenerManager

class House(object):
    """
    Main class to represent the house
    """

    def __init__(self, database):
        self.database = database
        self.rooms = {}
        self.events = []
        self.queue = MyPriorityQueue()
        self.listenerManager = ListenerManager()
        self.listenerManager.addListener(self.reactToEvent)
        self.methodThread = Thread(name="Method Thread", target=self.executeFromQueue)
        self.methodThread.daemon = True
        self.methodThread.start()

    def initFromDatabase(self):
        """Initialises the house from the database"""

        rooms = self.database.room.retrieveAllData()
        for room in rooms:
            self.rooms[room[0]] = Room(room[0], room[1])
            items = self.database.items.retrieveForRoomId(room[0])
            if len(items) > 0:
                for item in items:
                    type = self.database.types.getNameForId(item[5])
                    self.rooms[room[0]].items[item[0]] = (data.types[type](item[0], item[1], item[2],  type, item[3], self.listenerManager))

        events = self.database.events.getEvents()

        for e in events:
            if e[4] is not None:
                tempRoom = self.rooms[e[4]]
            else:
                tempRoom = None
            self.events.append(eca.Event(e[0], e[1], e[2], self.getItemById(e[3]), tempRoom, e[5], e[6]))

        for e in self.events:
            conditions = self.database.conditions.getConditionsForEvent(e)
            for c in conditions:
                e.conditions.append(eca.Condition(c[0], self.getItemById(c[1]), c[2], c[3], c[4], c[5]))

            actions = self.database.actions.getActionsForEvent(e)
            for a in actions:
                if a[2] is not None:
                    tempRoom = self.rooms[a[2]]
                else:
                    tempRoom = None
                e.actions.append(eca.Action(a[0], self.getItemById(a[1]), tempRoom, a[3], a[4], a[5]))

    def addRoom(self, name):
        """
        Adds a room to the house system and the database

        Arguments:
        name -- the name of the room
        """

        id = self.database.room.addEntry(name)
        self.rooms[id] = Room(id, name)

        return id

    def updateRoom(self, roomId, name):
        """
        Updates a specific room

        Arguments:
        roomId -- the id of the room
        name -- new name for the given room
        """
        if roomId in self.rooms:
            self.database.room.updateEntry(roomId, name)
            self.rooms[roomId] = Room(roomId, name)
        else:
            raise KeyError("Invalid roomId")

    def deleteRoom(self, roomId):
        """
        Deletes a specific roomId

        Arguments:
        roomId -- the id of the room to delete
        """
        if roomId in self.rooms:
            self.database.room.deleteEntryByID(roomId)
            del self.rooms[roomId]
        else:
            raise KeyError("Invalid roomId")


    def addItem(self, roomId, name, brand, type, ip):
        """
        Adds an item to the house system and the database

        Arguments:
        roomId  -- the id of the room to which the item is added
        name -- name of the item
        brand -- the brand of the item (e.g. arduino)
        type -- the type of the item (e.g. motionSensor)
        ip -- the ip of the item
        """
        if roomId in self.rooms:
            typeId = self.database.types.getIdForName(type)
            itemId = self.database.items.addEntry(name, brand, ip, roomId, typeId)
            item = data.types[type](itemId, name, brand, type, ip, self.listenerManager)
            self.rooms[roomId].addItem(itemId, item)
        else:
            raise KeyError("Invalid roomId")
        return itemId

    def updateItem(self, roomId, itemId, name, brand, type, ip):
        """
        Updates an item to the house system and the database

        Arguments:
        roomId  -- the id of the room in which the item is
        itemId -- the id of the room to update
        name -- new/current if unchanged name of the item
        brand -- new/current if unchanged brand of the item (e.g. arduino)
        type -- new/current if unchanged type of the item (e.g. motionSensor)
        ip -- tnew/current if unchangedhe ip of the item
        """
        if roomId in self.rooms and itemId in self.rooms[roomId].items:
            typeId = self.database.types.getIdForName(type)
            self.rooms[roomId].items[itemId].name = name
            self.rooms[roomId].items[itemId].brand = brand
            self.rooms[roomId].items[itemId].ip = ip
            self.rooms[roomId].items[itemId]._type = type
            self.rooms[roomId].items[itemId].roomId = roomId
            self.database.items.updateEntry(itemId, name, brand, ip, roomId, typeId)
        else:
            raise KeyError("Invalid roomId or itemId")

        return itemId

    def deleteItem(self, roomId, itemId):
        """
        Deletes an item 

        Arguments:
        roomId -- the id of the room in which the item is
        itemid -- the id of the item to be deleted
        """
        if roomId in self.rooms and itemId in self.rooms[roomId].items:
            self.database.items.deleteEntry(itemId)
            del self.rooms[roomId].items[itemId]
        else:
            raise KeyError("Invalid roomId or itemId")

    def getItemById(self, itemId):
        """
        Returns the item with the specified id

        Arguments:
        itemId -- the id of the item
        """
        for room in self.rooms:
            if itemId in self.rooms[room].items:
                return self.rooms[room].items[itemId]

    def getItemByIP(self, ip):
        """
        Returns the item with the specified IP address

        Arguments:
        ip -- the IP address of the item
        """
        for room in self.rooms:
            for item in self.rooms[room].items:
                if self.rooms[room].items[item].ip == ip:
                    return self.rooms[room].items[item]
        raise Exception("No sensor found for IP: " + ip)

    def getItemsByType(self, _type):
        """
        Returns all items in the house of a particular type

        Arguments:
        type -- the type of the item
        """
        items = []
        for room in self.rooms:
            for item in self.rooms[room].items:
                if self.rooms[room].items[item]._type == _type:
                    items.append(self.rooms[room].items[item])
        return items

    def getRoomByItemId(self, itemId):
        """
        Returns the room which has the item with the specified id

        Arguments:
        itemId -- the id of the item
        """
        for room in self.rooms:
            if itemId in self.rooms[room].items:
                return self.rooms[room]

    def getStructure(self):
        """Returns the overall structure of the house"""
        return {'rooms' : [self.rooms[r].getStructure() for r in self.rooms]}

    def getState(self):
        """
        Returns the state of the house
        """
        states = []
        for r in self.rooms:
            states = states + self.rooms[r].getState()
        return {'states' : states}

    def getVersion(self):
        """
        Returns the API version that this house is compatible with
        """
        methods = self.database.getMethodsWithTypes()
        methodList = [[]]
        namesList = []
        j = 0
        for i in range(0, len(methods)):
            temp = i+1
            if temp > len(methods) - 1:
                temp = 0
            if methods[i][0] == methods[temp][0]:
                methodList[j].append(methods[i][1])
            else:
                namesList.append(methods[i][0])
                methodList.append([])
                methodList[j].append(methods[i][1])
                j +=1
        methodsJSON = zip(namesList, methodList)
        dictVersion = {}
        for m in methodsJSON:
            dictVersion[m[0]] = {'name' : data.typesNice[m[0]], 'isPassive' : data.passive[data.types[m[0]]], 'methods': m[1], 'supportedBrands' : ['arduino'], 'states' : data.states[m[0]]}
        finalDict = {}
        finalDict['supportedTypes'] = dictVersion
        return finalDict

    def getRules(self):
        """
        Returns ECA Rules in the correct API format
        """

        rules = []

        for event in self.events:
            ruleJSON = {"ruleId": event.id, "ruleName": event.name, "enabled": bool(event.enabled)}

            eventJSON = {"itemType": event.type, "itemState": event.trigger}

            if not event.item is None:
                eventJSON["id"] = event.item._id
                eventJSON["scope"] = "item"
            elif not event.room is None:
                eventJSON["id"] = event.room.id
                eventJSON["scope"] = "room"
            else:
                eventJSON["id"] = None
                eventJSON["scope"] = "house"

            ruleJSON["event"] = eventJSON

            conditionsJSON = []
            ruleJSON["conditions"] = conditionsJSON

            for c in event.conditions:
                conditionsJSON.append({"conditionId": c.id, "itemId": c.item._id, "itemType": c.item._type, "method": c.methodName, "equivalence": c.equivalence, "value": c.value})

            actionsJSON = []
            ruleJSON["actions"] = actionsJSON

            for a in event.actions:
                actionJSON = {"actionId": a.id, "method": a.methodName, "itemType": a.type}

                if not a.item is None:
                    actionJSON["id"] = a.item._id
                    actionJSON["scope"] = "item"
                elif not a.room is None:
                    actionJSON["id"] = a.room.id
                    actionJSON["scope"] = "room"
                else:
                    actionJSON["id"] = None
                    actionJSON["scope"] = "house"

                actionsJSON.append(actionJSON)

            rules.append(ruleJSON)

        return {"rules": rules}

    def addEvent(self, name, _type, _id, scope, trigger, enabled):
        """
        Adds an event to the house and database

        Arguments:
        name -- the name of the rule
        _type -- the type of the item the event concerns
        _id -- the id of the item/room which depends on scope
        scope -- the scope of the event ("item"/"room"/"house")
        trigger -- the triggering state of the item
        enabled -- whether the rule is enabled (1/0)
        """
        if scope == "item":
            item = self.getItemById(_id)
            room = None
        elif scope == "room":
            item = None
            room = self.rooms[_id]
        elif scope == "house":
            item = None
            room = None
        else:
            raise Exception("Invalid scope parameter")
        event = eca.Event(name, _type, item, room, trigger, enabled)
        self.events.append(event)
        self.database.events.addEntry(event)

    def updateEvent(self, self, name, _type, _id, scope, trigger, enabled, eventId):
        """
        Updates an event to the house and database

        Arguments:
        name -- the name of the rule
        _type -- the type of the item the event concerns
        _id -- the id of the item/room which depends on scope
        scope -- the scope of the event ("item"/"room"/"house")
        trigger -- the triggering state of the item
        enabled -- whether the rule is enabled (1/0)
        """
        if scope == "item":
            item = self.getItemById(_id)
            room = None
        elif scope == "room":
            item = None
            room = self.rooms[_id]
        elif scope == "house":
            item = None
            room = None
        else:
            raise Exception("Invalid scope parameter")
        e = None
        for event in self.events:
            if event.id == eventId:
                event.name = name
                event.type = _type
                event.item = item
                event.room = room
                event.trigger = trigger
                event.enabled = enabled
                e = event
                break
        if e is None:
            raise Exception("Invalid event ID")
        self.database.events.updateEvent(e)

    def deleteEvent(self, eventId):
        """
        Deletes an event from the house and database

        Arguments:
        eventId -- the id of the event to be deleted
        """
        e = None
        for event in self.events:
            if event.id == eventId:
                e = event
                self.events.remove(e)
                break
        if e is None:
            raise Exception("Invalid event ID")
        self.database.events.removeEntry(e)
        # Conditions and Actions for this event will also be deleted by the database

    def getEventsForTrigger(self, item, trigger):
        """
        Returns the possible events relating to an item trigger

        Arguments:
        item -- the item that triggered the event
        trigger -- the name of the trigger
        """
        possibleEvents = []

        for event in self.events:
            if event.enabled and event.trigger == trigger and (item == event.item or (self.getRoomByItemId(item._id) == event.room and item._type == event.type)):
                possibleEvents.append(event)

        return possibleEvents

    def reactToEvent(self, ip, trigger):
        """
        Process a trigger event from a particular IP

        Arguments:
        ip -- the IP address of the item that sent the trigger
        trigger -- the name of the trigger
        """

        item = self.getItemByIP(ip)

        possibleEvents = self.getEventsForTrigger(item, trigger)

        itemsActedOn = []
        events = []

        for event in possibleEvents:
            eventItemsActedOn = []
            eventMatch = True
            for action in event.actions:
                if action.isConflictWithOtherActions(itemsActedOn + eventItemsActedOn):
                    eventMatch = False
                    break
                else:
                    eventItemsActedOn.append(action.getItemsActedOn)
            if eventMatch == True:
                itemsActedOn.extend(eventItemsActedOn)
                events.append(event)

        for event in events:
            conditionsMatched = True
            for condition in event.conditions:
                if not condition.check():
                    conditionsMatched = False
                    break

            if not conditionsMatched:
                continue

            for action in event.actions:
                if action.isAllItemsInHouse():
                    action.doAction(self.getItemsByType(action._type))
                else:
                    action.doAction()

    def executeFromQueue(self):
        """Executes method from the queue, run in a seperate thread"""
        while True:
            if not self.queue.empty():
                self.executeMethod(*self.queue.get())

    def addToQueue(self, roomId, itemId, method, args=[]):
        """
        Adds a method to the queue

        Arguments:
        roomId -- id of the room
        itemId -- id of the item
        method -- method to be called
        args -- arguments od the method, empty list by detault 
        """
        self.queue.put(roomId, itemId, method, args)

    def executeMethod(self, roomId, itemId, method, args=[]):
        """
        Executes a method on a given item

        Arguments:
        roomId -- the id of the room the item is in
        itemId -- the id of the item
        method -- the method to be called as a string
        args -- the arguments for the method to be called, empty list by default
        """
        return getattr(self.rooms[roomId].items[itemId], method)(*args)

class Room:
    """
    A class to represent a room inside the house
    """
    def __init__(self, _id, name):
        self.id = _id
        self.name = name
        self.items = {}

    def addItem(self, _id, item):
        """
        Adds an item to the room

        Arguments:
        _id -- the id of the item
        name -- the name of the item
        """
        self.items[_id] = item

    def getStructure(self):
        """Returns a structure of the room as a dict"""
        return {'id' : self.id, 'name' : self.name, 'items': [ {'id' : self.items[i]._id, 'name' : self.items[i].name, 'itemType' : self.items[i]._type, 'brand' : self.items[i].brand, 'ip' : self.items[i].ip, 'state' : self.items[i].getState()} for i in self.items]}

    def getState(self):
        """Returns a list of states of all the items in the room as a dict"""
        return [ {'id' : self.items[i]._id, 'state' : self.items[i].getState()} for i in self.items]
