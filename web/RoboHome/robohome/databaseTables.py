from databaseHelper import DatabaseHelper

class RoomsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "rooms"
        DatabaseHelper.__init__(self)

    def addTable(self):
        super(RoomsTable, self).addTable(self.tablename, "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL")

    def addEntry(self, name):
        return super(RoomsTable, self).addEntry(self.tablename, "name", "'" + name + "'")

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

    def addTable(self):
        super(TypesTable, self).addTable(self.tablename, "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL")

    def addEntry(self, name):
        return super(TypesTable, self).addEntry(self.tablename, "name", "'" + name + "'")

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

    def addTable(self):
        super(ItemsTable, self).addTable(self.tablename, "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, brand VARCHAR(45) NOT NULL, ip VARCHAR(45) NOT NULL, roomId INT NOT NULL, typeId INT NOT NULL, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE")

    def addEntry(self, name, brand, ip, roomId, typeId):
        return super(ItemsTable, self).addEntry(self.tablename, "name, brand, ip, roomId, typeId", "'" + name + "'," + "'" + brand + "'," +"'" + ip + "'," + str(roomId) + "," + str(typeId))

    def retrieveAllData(self):
        return super(ItemsTable, self).retriveData("SELECT * FROM " + self.tablename)

    def retrieveForRoomId(self, roomId):
        return super(ItemsTable, self).retriveData("SELECT * FROM " + self.tablename + " WHERE roomId=" + str(roomId))

    def deleteEntry(self, id):
        super(ItemsTable, self).removeEntry(self.tablename, "id=" + str(id))

    def updateEntry(self, id, name, brand, ip, roomId, typeId):
        return super(RoomsTable, self).updateEntry(self.tablename, "id = '" + str(id) + "'", "name = '" + name + "', brand = '" + brand +"', ip = '" + ip +"', roomId = " + str(roomId) + ", typeId = " + str(typeId))

class MethodsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "methods"
        super(MethodsTable, self).__init__()

    def addTable(self):
        super(MethodsTable, self).addTable(self.tablename, "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, signiture VARCHAR(45) NOT NULL, type VARCHAR(45) NOT NULL, typeId INT, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE")

    def addEntry(self, name, signiture, type, typeId):
        return  super(ItemsTable, self).addEntry(self.tablename, "name, signiture, type, typeId", "'" + name + "'," + "'" + signiture + "'," +"'" + type + "'," +"'" + str(typeId) + "'")

class EventsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "events"
        super(EventsTable, self).__init__()

    def addTable(self):
        super(EventsTable, self).addTable(self.tablename, "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, typeId INT NOT NULL, itemId INT, roomId INT, `trigger` VARCHAR(45) NOT NULL, enabled INT NOT NULL, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE")

    def addEntry(self, name, typeId, itemId, roomId, trigger, enabled):
        return super(EventsTable, self).addEntry(self.tablename, "name, typeId, itemId, roomId, `trigger`, enabled", "'" + str(name) + "'," + "'" + str(typeId) + "'," + "'" + str(itemId) + "'," +"'" + str(roomId) + "'," +"'" + trigger + "'," +"'" + enabled + "'")

    def getEvents(self):
        return super(EventsTable, self).retriveData("SELECT events.id, events.name, types.name, itemId, roomId, `trigger`, enabled FROM events, types WHERE events.typeId = types.id")

class ConditionsTable(DatabaseHelper):

    def __init__(self):
        self.tablename = "conditions"
        DatabaseHelper.__init__(self)

    def addTable(self):
        super(ConditionsTable, self).addTable(self.tablename, "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, itemId INT NOT NULL, methodId INT NOT NULL, equivalence VARCHAR(45) NOT NULL, value VARCHAR(45) NOT NULL, eventId INT NOT NULL, typeId INT, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (methodId) REFERENCES methods(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE")

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

    def addTable(self):
        super(ActionsTable, self).addTable(self.tablename, "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, itemId INT, roomId INT, eventId INT NOT NULL, methodId INT NOT NULL, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (methodId) REFERENCES methods(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE")

    def addEntry(self, itemId, roomId, eventId, methodId):
        return super(ActionsTable, self).addEntry(self.tablename, "itemId, roomId, eventId, methodId, eventId, typeId", "'" + str(itemId) + "'," + "'" + str(roomId) + "'," +"'" + str(eventId) + "'," +"'" + str(methodId) + "'")

    def getActionsForEvent(self, event):
        return super(ActionsTable, self).retriveData("SELECT actions.id, itemId, roomId, signature, types.name FROM actions, methods, types WHERE actions.methodId = methods.id AND methods.typeId = types.Id AND eventId=" + str(event.id))

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

class Database(DatabaseHelper):

    def __init__(self):
        self.room = RoomsTable()
        self.types = TypesTable()
        self.items = ItemsTable()
        self.methods = MethodsTable()
        self.events = EventsTable()
        self.conditions = ConditionsTable()
        self.actions = ActionsTable()
        self.users = UsersTable()
        self.whitelist = WhitelistTable()
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