import os
import threading
import urllib2 
import webbrowser

class UpdateCloud:

    def __init__(self):
        t = threading.Thread(target=self.updateCloud)
        t.daemon = True
        t.start()

    def updateCloud():
        my_ip = urllib2.urlopen('http://ip.42.pl/raw').read()
        get_ID = urllib2.urlopen('http://robohome.co.uk/ip/rpi_id.php?ip=' + my_ip).read()
        get_ID2 = urllib2.urlopen('http://robohome.co.uk/ip/rpi_id.php?ip=1.2.3.4').read()
        my_id = get_ID.strip()

        #Writing the id of the RPi into a txt file
        f = open('id_RPi.txt', 'w')
        f.write(my_id)
        f.close()
    
        #If the txt file is not empty, get the id and open the url with the id given
        while((os.stat('id_RPi.txt').st_size) == 0):
            #print "This file has no id!"
            updateCloud()
        
        webbrowser.open('http://robohome.co.uk/ip/ip_update.php?id=' + my_id + '&ip=' + my_ip)
        #urllib2.urlopen('http://robohome.co.uk/ip/ip_update.php?id=' + my_id + '&ip=' + my_ip)

