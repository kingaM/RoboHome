import MySQLdb as mdb

class DatabaseHelper(object):
    
    try:
        con = mdb.connect(host = '127.0.0.1', user = 'root', passwd = '', db = 'robohome')
    except Exception, e:
        print e.message

    def __init__(self, host='127.0.0.1', username='root', password='', database='robohome'):
        self.host = host
        self.username = username
        self.password = password
        self.database = database

    def connect(self):
        con = mdb.connect(self.host, self.username, self.password, self.database)
        return con

    def executeQuery(self, query):
        cursor = DatabaseHelper.con.cursor()
        #print query
        cursor.execute(query)
        id = cursor.lastrowid
        cursor.close()
        DatabaseHelper.con.commit()
        return id
            
    def addTable(self, tablename, createDefinition):
        query = "CREATE TABLE IF NOT EXISTS " + self.database + "." + tablename + "(" + createDefinition + ")"
        return self.executeQuery(query)

    def addEntry(self, tablename, columns, values):
        query = "INSERT INTO " + self.database + ".`" + tablename  + "`(" + columns + ") VALUES (" + values + ")" 
        return self.executeQuery(query)

    def removeEntry(self, tablename, condition):
        query = "DELETE FROM " + self.database + ".`" + tablename  + "` WHERE " + condition
        return self.executeQuery(query)

    def updateEntry(self, tablename, condition, entry):
        query = "UPDATE "  + self.database + ".`" + tablename  + "` SET " + entry + " WHERE " + condition
        self.executeQuery(query)

    def retriveData(self, query):
        cursor = DatabaseHelper.con.cursor()
        #print query
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        return rows

    @classmethod
    def close():
        DatabaseHelper.con.close()


if __name__=='__main__':
    database = DatabaseHelper('localhost', 'root', 'root', 'robohome')
