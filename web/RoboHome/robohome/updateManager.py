import urllib
import urllib2
import subprocess 
import os

def checkForUpdates():
    try:
        currentVersion = [0,1] #get the current version 
        response = urllib2.urlopen('http://robohome.azurewebsites.net/version.php')
        version = list(response.read().split('.'))
        versionList = [int(x) for x in version] 
        value = cmp(versionList,currentVersion)  
        # value will be -1 if current version is older, 0 if its the same and 1 if its a newer version
        if (value == 0):
            return
        if (value == 1): # if the version is newer then download the zip file
            #print "New version."
            getUpdate
    except Exception:
        #print "Couldn't check version"
        return


def callScript():
    subprocess.call("sh ../../../Scripts/runUpdate.sh", shell=True)

def getUpdate():
    try:
        urllib.urlretrieve('https://github.com/michboon/comp2014/archive/master.zip', 'github.zip')
    except Exception:
        #print "Couldn't download update file"
        return

    processID = os.getpid()

    with open('robohome.pid', 'w') as f:
        f.write(str(processID))

    run = callScript()

