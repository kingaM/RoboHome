from databaseHelper import DatabaseHelper
from houseSystem import Room
from item import *
import staticData as data

class RoomsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "rooms"
        DatabaseHelper.__init__(self)

    def addEntry(self, name):
        return super(RoomsTable, self).addEntry(self.tablename, "name", "'" + name + "'")

    def deleteEntryByName(self, name):
        super(RoomsTable, self).removeEntry(self.tablename, "name='" + name +"'")

    def deleteEntryByID(self, id):
        super(RoomsTable, self).removeEntry(self.tablename, "id='" + str(id) +"'")

    def retrieveAllData(self):
        roomList = []
        roomTuple = super(RoomsTable, self).retriveData("SELECT * FROM " + self.tablename)
        for room in roomTuple:
            roomList.append(Room(room[0], room[1]))
        return roomList

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

    def __init__(self, types):
        self.tablename = "items"
        self.types = types
        super(ItemsTable, self).__init__()

    def addEntry(self, name, brand, ip, roomId, typeId):
        return super(ItemsTable, self).addEntry(self.tablename, "name, brand, ip, roomId, typeId", "'" + name + "'," + "'" + brand + "'," +"'" + ip + "'," + str(roomId) + "," + str(typeId))

    def retrieveAllData(self):
        return super(ItemsTable, self).retriveData("SELECT * FROM " + self.tablename)

    def retrieveForRoomId(self, roomId):
        itemsList = []
        itemsTuple =  super(ItemsTable, self).retriveData("SELECT * FROM " + self.tablename + " WHERE roomId=" + str(roomId))
        for item in itemsTuple:
            type = self.types.getNameForId(item[5])
            itemsList.append(data.types[type](item[0], item[1], item[2],  type, item[3], None))
        return itemsList

    def deleteEntry(self, id):
        super(ItemsTable, self).removeEntry(self.tablename, "id=" + str(id))

    def updateEntry(self, id, name, brand, ip, roomId, typeId):
        return super(RoomsTable, self).updateEntry(self.tablename, "id = '" + str(id) + "'", "name = '" + name + "', brand = '" + brand +"', ip = '" + ip +"', roomId = " + str(roomId) + ", typeId = " + str(typeId))

class MethodsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "methods"
        super(MethodsTable, self).__init__()

    def getNiceStateName(self, itemId):
        return self.retriveData("SELECT methods.name FROM methods, `types`, items WHERE `types`.id=methods.typeId AND `types`.id=items.typeId AND items.id=" + str(itemId) + " AND methods.signature='getState'")[0][0]

    def getSignature(self, name, _type):
        return self.retriveData("SELECT signature FROM methods, `types` WHERE `types`.id=methods.typeId AND methods.name=\'" + str(name) + "' AND `types`.name='" + str(_type) + "'")[0][0]


class EventsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "events"
        super(EventsTable, self).__init__()

    def addEntry(self, event):
        typeId = self.retriveData("SELECT id FROM types WHERE name=\'" + event.type + "';")[0][0]
        if event.item is None:
            itemId = "null"
        else:
            itemId = event.item._id
        if event.room is None:
            roomId = "null"
        else:
            roomId = event.room.id
        event.id = super(EventsTable, self).addEntry(self.tablename, "name, typeId, itemId, roomId, `trigger`, enabled", "'%s', '%s', %s, %s, '%s', '%s'" % (event.name, typeId, itemId, roomId, event.trigger, event.enabled))

    def removeEntry(self, event):
        self.executeQuery("DELETE FROM events WHERE id=" + str(event.id) + ";")

    def updateEntry(self, event):
        typeId = self.retriveData("SELECT id FROM types WHERE name=\'" + event.type + "';")[0][0]
        if event.item is None:
            itemId = "null"
        else:
            itemId = event.item._id
        if event.room is None:
            roomId = "null"
        else:
            roomId = event.room.id
        super(EventsTable, self).updateEntry(self.tablename, "id='" + str(event.id) + "'", "name='%s', typeId='%s', itemId=%s, roomId=%s, `trigger`='%s', enabled='%s'" % (event.name, typeId, itemId, roomId, event.trigger, event.enabled))

    def getEvents(self):
        return super(EventsTable, self).retriveData("SELECT events.id, events.name, types.name, itemId, roomId, `trigger`, enabled FROM events, types WHERE events.typeId = types.id")


class ConditionsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "conditions"
        DatabaseHelper.__init__(self)

    def addEntry(self, condition, eventId):
        typeId = self.retriveData("SELECT id FROM types WHERE name=\'" + str(condition.item._type) + "';")[0][0]
        methodId = self.retriveData("SELECT id FROM methods WHERE signature=\'" + str(condition.method) + "' AND typeId =" + str(typeId))[0][0]
        condition.id = super(ConditionsTable, self).addEntry(self.tablename, "itemId, methodId, equivalence, value, eventId", "'%s', '%s', '%s', '%s', '%s'" % (condition.item._id, methodId, condition.equivalence, condition.value, eventId))

    def removeEntry(self, condition):
        self.executeQuery("DELETE FROM conditions WHERE id=" + str(condition.id) + ";")

    def updateEntry(self, condition, eventId):
        typeId = self.retriveData("SELECT id FROM types WHERE name=\'" + str(condition.item._type) + "';")[0][0]
        methodId = self.retriveData("SELECT id FROM methods WHERE signature=\'" + str(condition.method) + "' AND typeId =" + str(typeId))[0][0]
        super(ConditionsTable, self).updateEntry(self.tablename, "id='" + str(condition.id) + "'", "itemId=%s, methodId=%s, equivalence='%s', value='%s', eventId=%s" % (condition.item._id, methodId, condition.equivalence, condition.value, eventId))

    def getConditionsForEvent(self, event):
        return super(ConditionsTable, self).retriveData("SELECT conditions.id, itemId, signature, methods.name, equivalence, value FROM conditions, methods WHERE conditions.methodId = methods.Id AND eventId=" + str(event.id))


class ActionsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "actions"
        super(ActionsTable, self).__init__()

    def addEntry(self, action, eventId):
        typeId = self.retriveData("SELECT id FROM types WHERE name=\'" + str(action.type) + "';")[0][0]
        methodId = self.retriveData("SELECT id FROM methods WHERE signature=\'" + str(action.method) + "' AND typeId =" + str(typeId))[0][0]
        if action.item is None:
            itemId = "null"
        else:
            itemId = action.item._id
        if action.room is None:
            roomId = "null"
        else:
            roomId = action.room.id
        action.id = super(ActionsTable, self).addEntry(self.tablename, "itemId, roomId, methodId, eventId", "%s, %s, %s, %s" % (itemId, roomId, methodId, eventId))

    def removeEntry(self, action):
        self.executeQuery("DELETE FROM actions WHERE id=" + str(action.id) + ";")

    def updateEntry(self, action, eventId):
        typeId = self.retriveData("SELECT id FROM types WHERE name=\'" + str(action.type) + "';")[0][0]
        methodId = self.retriveData("SELECT id FROM methods WHERE signature=\'" + str(action.method) + "' AND typeId =" + str(typeId))[0][0]
        if action.item is None:
            itemId = "null"
        else:
            itemId = action.item._id
        if action.room is None:
            roomId = "null"
        else:
            roomId = action.room.id
        super(ActionsTable, self).updateEntry(self.tablename, "id='" + str(action.id) + "'", "itemId=%s, roomId=%s, methodId=%s, eventId=%s" % (itemId, roomId, methodId, eventId))

    def getActionsForEvent(self, event):
        return super(ActionsTable, self).retriveData("SELECT actions.id, itemId, roomId, signature, methods.name, types.name FROM actions, methods, types WHERE actions.methodId = methods.id AND methods.typeId = types.Id AND eventId=" + str(event.id))


class UsersTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "users"
        super(UsersTable, self).__init__()

    def addEntry(self, name, email, openid):
       return super(UsersTable, self).addEntry(self.tablename, "name, email, openid", "'" + name + "'," + "'" + email + "'," + "'" + openid + "'")

    def getUserByOpenid(self, openid):
        user =  super(UsersTable, self).retriveData("SELECT name, email, openid FROM users WHERE openid=\'" + openid + "'")
        if user:
            return {'name' : user[0][0], 'email' : user[0][1], 'opnenid' : user[0][2]}
        else:
            return None

    def numOfRows(self):
        return super(UsersTable, self).retriveData("SELECT COUNT(*) FROM " + self.tablename)[0][0]

class WhitelistTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "whitelist"
        super(WhitelistTable, self).__init__()

    def addEntry(self, email):
        return super(WhitelistTable, self).addEntry(self.tablename, "email", "'" + email + "'")

    def getEmails(self):
        return super(WhitelistTable, self).retriveData("SELECT email FROM " + self.tablename )

    def isInWhitelist(self, email):
        emails = super(WhitelistTable, self).retriveData("SELECT email FROM " + self.tablename + " WHERE email='" + email + "'" )
        if len(emails) == 0:
            return False
        else:
            return True

    def deleteEmail(self, email):
        super(WhitelistTable, self).removeEntry(self.tablename, "email='" + email + "'")


class EnergyTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "energy"
        super(EnergyTable, self).__init__()

    def addEntry(self, watts):
        return super(EnergyTable, self).addEntry(self.tablename, "watts", "'" + str(watts) + "'")

    def getEnergyBetDates(self, startDate, endDate):
        return super(EnergyTable, self).retriveData("SELECT * FROM " + self.tablename + " WHERE time BETWEEN FROM_UNIXTIME(" + str(startDate) + ") AND FROM_UNIXTIME(" + str(endDate) + ")") 

class Database(DatabaseHelper):

    def __init__(self):
        self.room = RoomsTable()
        self.types = TypesTable()
        self.items = ItemsTable(self.types)
        self.methods = MethodsTable()
        self.events = EventsTable()
        self.conditions = ConditionsTable()
        self.actions = ActionsTable()
        self.users = UsersTable()
        self.whitelist = WhitelistTable()
        self.energy = EnergyTable()
        super(Database, self).__init__()

    def addTables(self):
        self.room.addTable()
        self.types.addTable()
        self.items.addTable()
        self.methods.addTable()
        self.events.addTable()
        self.conditions.addTable()

    def getMethodsWithTypes(self):
        query = "SELECT " + "`" + self.types.tablename + "`" + ".`name`, `" + self.methods.tablename + "`" + ".`name` FROM " + "robohome" + ".`" + self.methods.tablename + "`," + "robohome" + ".`" + self.types.tablename + "` WHERE `" + self.types.tablename + "`.id = `" + self.methods.tablename + "`.typeId"
        print query
        return super(Database, self).retriveData(query)

if __name__=='__main__':
    database = Database()