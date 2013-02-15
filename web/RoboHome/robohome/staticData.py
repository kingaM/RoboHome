from item import *
"""
A file with all data that does not change within version

This file has to be updated with a version update
"""

version = 0.1

types = {'motionSensor' : Item , 'lightSensor' : Item, 'temperatureSensor' : Item , 'energyMonitor' : Item , 'button' : Item , 'door' : Openable, 'window' : Openable, 'curtain' : Openable, 'plug' : OnOff, 'light' : Lights, 'radiator' : RadiatorValve}

typesNice = {'motionSensor' : 'Motion Sensor' , 'lightSensor' : 'Light Sensor', 'temperatureSensor' : 'Temperature Sensor' , 'energyMonitor' : 'Energy Monitor' , 'button' : 'Button' , 'door' : 'Door', 'window' : 'Window', 'curtain' : 'Curtain', 'plug' : 'Plug', 'light' : 'Light', 'radiator' : 'Radiator Valve'}

states = {'motionSensor' : [{'id' : 1, 'name' : 'motion detected'}, {'id' : 0, 'name' : 'no motion'}], 'lightSensor' : [{'id' : 1, 'name' : 'light'}, {'id' : 0, 'name' : 'dark'}], 'temperatureSensor' : [{'id' : 1, 'name' : 'hot'}, {'id' : 0, 'name' : 'cold'}], 'energyMonitor' : [{'id' : 1, 'name' : 'high'}, {'id' : 0, 'name' : 'low'}], 'button' : [{'id' : 1, 'name' : 'on'}, {'id' : 0, 'name' : 'off'}], 'door' : [{'id' : 1, 'name' : 'opened', 'method' : 'open'}, {'id' : 0, 'name' : 'closed', 'method' : 'close'}], 'window' : [{'id' : 1, 'name' : 'opened', 'method' : 'open'}, {'id' : 0, 'name' : 'closed', 'method' : 'close'}], 'curtain' : [{'id' : 1, 'name' : 'opened', 'method' : 'open'}, {'id' : 0, 'name' : 'closed', 'method' : 'close'}], 'plug' : [{'id' : 1, 'name' : 'on', 'method' : 'on'}, {'id' : 0, 'name' : 'off', 'method' : 'off'}], 'light' :[{'id' : 1, 'name' : 'on', 'method' : 'on'}, {'id' : 0, 'name' : 'off', 'method' : 'off'}], 'radiator' : [{'id' : 0, 'temperature' : 'setTemperature'}]}

passive = {Item : True, Openable : False, OnOff : False, Lights : False, RadiatorValve : False}