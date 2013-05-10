RoboHome
========
RoboHome is a home automation system developed as part of the UCL COMP2014 project. It allows control of various devices throughout a house through a web interface and supports interaction through an API.

Installation
------------
### Easy install on a Raspberry Pi
- Download and install Arch Linux onto a Raspberry Pi
- Download the Git repository and run Scripts/rpi.sh
- Place Scripts/flask.service in /etc/systemd/system
- Reboot

### Other Systems (For test use)
- Install Python and the dependencies listed in web/requirements.txt
- Install MySQLdb for Python
- Download the Git repository and run web/RoboHome/robohome/flaskServer.py

More Information
----------------
[**API**] (https://github.com/michboon/comp2014/wiki)
[**Jenkins Build Status**] (http://robohome.cloudapp.net/)