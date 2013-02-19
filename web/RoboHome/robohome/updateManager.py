import urllib
import urllib2

def getPage():
    currentVersion = [1,0,1] #get the current version 
    response = urllib2.urlopen('http://robohome.azurewebsites.net/version.php')
    version = list(response.read().split('.'))
    versionList = [int(x) for x in version] 
    value = cmp(versionList,currentVersion)  
    # value will be -1 if current version is older, 0 if its the same and 1 if its a newer version
    if (value == 0):
        print "This version is the same as before."
    if (value == 1): # if the version is newer then download the zip file
        print "New version."
        urllib.urlretrieve('https://github.com/michboon/comp2014/archive/master.zip', 'github.zip')

getPage();

