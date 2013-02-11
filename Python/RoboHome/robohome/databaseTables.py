from databaseHelper import DatabaseHelper
from houseSystem import Room


class RoomsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "rooms"
        DatabaseHelper.__init__(self)

    def addEntry(self, room):
        return super(RoomsTable, self).addEntry(self.tablename, "name", "'" + room.name + "'")

    def deleteEntryByName(self, name):
        super(RoomsTable, self).removeEntry(self.tablename, "name='" + name +"'")

    def deleteEntryByID(self, id):
        super(RoomsTable, self).removeEntry(self.tablename, "id='" + str(id) +"'")

    def retrieveAllData(self):
        return super(RoomsTable, self).retriveData("SELECT * FROM " + self.tablename)

    def updateEntry(self, id, name):
        return super(RoomsTable, self).updateEntry(self.tablename, "id = '" + str(id) + "'", "name = '" + name + "'")

class TypesTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "types"
        super(TypesTable, self).__init__()

    def getIdForName(self, name):
        query = "SELECT * FROM " + self.database + ".`" + self.tablename + "` WHERE name='" + name + "'"
        return super(TypesTable, self).retriveData(query)[0][0]

    def getNameForId(self, id):
        query = "SELECT * FROM " + self.database + ".`" + self.tablename + "` WHERE id=" + str(id)
        return super(TypesTable, self).retriveData(query)[0][1]


class ItemsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "items"
        super(ItemsTable, self).__init__()

    def addEntry(self, name, brand, ip, roomId, typeId):
        return super(ItemsTable, self).addEntry(self.tablename, "name, brand, ip, roomId, typeId", "'" + name + "'," + "'" + brand + "'," +"'" + ip + "'," +"'" + str(roomId) + "'," +"'" + str(typeId) + "'")

    def retrieveAllData(self):
        return super(ItemsTable, self).retriveData("SELECT * FROM " + self.tablename)

    def retrieveForRoomId(self, roomId):
        return super(ItemsTable, self).retriveData("SELECT * FROM " + self.tablename + " WHERE roomId=" + str(roomId))

    def deleteEntry(self, id):
        super(ItemsTable, self).removeEntry(self.tablename, "id=" + str(id))

class MethodsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "methods"
        super(MethodsTable, self).__init__()

class EventsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "events"
        super(EventsTable, self).__init__()

    def addEntry(self, typeId, itemId, roomId, trigger, enabled):
        return super(EventsTable, self).addEntry(self.tablename, "typeId, itemId, roomId, `trigger`, enabled", "'" + str(typeId) + "'," + "'" + str(itemId) + "'," +"'" + str(roomId) + "'," +"'" + trigger + "'," +"'" + enabled + "'")

    def getEvents(self):
        return super(EventsTable, self).retriveData("SELECT events.id, name, itemId, roomId, `trigger`, enabled FROM events, types WHERE events.typeId = types.id")

class ConditionsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "conditions"
        DatabaseHelper.__init__(self)

    def addEntry(self, itemId, methodId, equivalence, value, eventId, typeId):
        return super(ConditionsTable, self).addEntry(self.tablename, "itemId, methodId, equivalence, value, eventId, typeId", "'" + str(itemId) + "'," + "'" + str(methodId) + "'," +"'" + equivalence + "'," +"'" + value + "'," +"'" + str(eventId) + "'," +"'" + str(typeId) + "'")

    def getConditionsForEvent(self, event):
        return super(ConditionsTable, self).retriveData("SELECT conditions.id, itemId, signature, equivalence, value FROM conditions, methods WHERE conditions.methodId = methods.Id AND eventId=" + str(event.id))

    #def retrieveForRoomId(self, roomId):
    #    return super(ItemsTable, self).retriveData("SELECT * FROM " + self.tablename + " WHERE roomId=" + str(roomId))

class ActionsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "actions"
        super(ActionsTable, self)

    def addEntry(self, itemId, roomId, eventId, methodId):
        return super(ActionsTable, self).addEntry(self.tablename, "itemId, roomId, eventId, methodId, eventId, typeId", "'" + str(itemId) + "'," + "'" + str(roomId) + "'," +"'" + str(eventId) + "'," +"'" + str(methodId) + "'")

    def getActionsForEvent(self, event):
        return super(ActionsTable, self).retriveData("SELECT actions.id, itemId, roomId, signature, types.name FROM actions, methods, types WHERE actions.methodId = methods.id AND methods.typeId = types.Id AND eventId=" + str(event.id))

class Database(DatabaseHelper):

    def __init__(self):
        self.room = RoomsTable()
        self.types = TypesTable()
        self.items = ItemsTable()
        self.methods = MethodsTable()
        self.events = EventsTable()
        self.conditions = ConditionsTable()
        self.actions = ActionsTable()
        self.tables = {'Room' : self.room, 'Item' : self.items, 'Event' : self.events}
        super(Database, self).__init__()

    def getMethodsWithTypes(self):
        query = "SELECT " + "`" + self.types.tablename + "`" + ".`name`, `" + self.methods.tablename + "`" + ".`name` FROM " + "robohome" + ".`" + self.methods.tablename + "`," + "robohome" + ".`" + self.types.tablename + "` WHERE `" + self.types.tablename + "`.id = `" + self.methods.tablename + "`.typeId"
        return super(Database, self).retriveData(query)

    def addEntry(self, object):
        id = self.tables[object.__class__.__name__].addEntry(object)
        object.id = id
        return object

if __name__=='__main__':
    database = Database()
    id = database.addEntry(Room(None, "new room"))
    print id.id, id.name