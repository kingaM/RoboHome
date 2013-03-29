import MySQLdb as mdb

class DatabaseHelper(object):
    
    try:
        con = mdb.connect(host = '127.0.0.1', user = 'root', passwd = '', db = 'robohome')
    except Exception, e:
        print e

    def __init__(self, host='localhost', username='root', password='', database='robohome'):
        self.database = database

    def executeQuery(self, query):
        cursor = DatabaseHelper.con.cursor()
        cursor.execute(query)
        id = cursor.lastrowid
        cursor.close()
        DatabaseHelper.con.commit()
        return id

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
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        return rows

if __name__=='__main__':
    database = DatabaseHelper('localhost', 'root', 'root', 'robohome')
