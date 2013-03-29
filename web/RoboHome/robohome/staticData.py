import item
"""
A file with all data that does not change within version

This file has to be updated with a version update
"""

version = 0.1

types = {'motionSensor' : item.Item , 'lightSensor' : item.Item, 'temperatureSensor' : item.Item , 'energyMonitor' : item.Item , 'button' : item.Item , 'door' : item.Openable, 'window' : item.Openable, 'curtain' : item.Openable, 'plug' : item.OnOff, 'light' : item.Lights, 'radiator' : item.RadiatorValve}

typesNice = {'motionSensor' : 'Motion Sensor' , 'lightSensor' : 'Light Sensor', 'temperatureSensor' : 'Temperature Sensor' , 'energyMonitor' : 'Energy Monitor' , 'button' : 'Button' , 'door' : 'Door', 'window' : 'Window', 'curtain' : 'Curtain', 'plug' : 'Plug', 'light' : 'Light', 'radiator' : 'Radiator Valve'}

states = {'motionSensor' : [{'id' : 1, 'name' : 'motion detected'}, {'id' : 0, 'name' : 'no motion'}], 'lightSensor' : [{'id' : 1, 'name' : 'light'}, {'id' : 0, 'name' : 'dark'}], 'temperatureSensor' : [{'id' : 1, 'name' : 'hot'}, {'id' : 0, 'name' : 'cold'}], 'energyMonitor' : [{'id' : 1, 'name' : 'high'}, {'id' : 0, 'name' : 'low'}], 'button' : [{'id' : 1, 'name' : 'on'}, {'id' : 0, 'name' : 'off'}], 'door' : [{'id' : 1, 'name' : 'opened', 'method' : 'open'}, {'id' : 0, 'name' : 'closed', 'method' : 'close'}], 'window' : [{'id' : 1, 'name' : 'opened', 'method' : 'open'}, {'id' : 0, 'name' : 'closed', 'method' : 'close'}], 'curtain' : [{'id' : 1, 'name' : 'opened', 'method' : 'open'}, {'id' : 0, 'name' : 'closed', 'method' : 'close'}], 'plug' : [{'id' : 1, 'name' : 'on', 'method' : 'on'}, {'id' : 0, 'name' : 'off', 'method' : 'off'}], 'light' :[{'id' : 1, 'name' : 'on', 'method' : 'on'}, {'id' : 0, 'name' : 'off', 'method' : 'off'}], 'radiator' : [{'id' : 0, 'temperature' : 'setTemperature'}]}

supportedBrands = {'motionSensor' : ['mock', 'arduino'] , 'lightSensor' : ['mock', 'gadgeteer'], 'temperatureSensor' : ['mock', 'arduino'] , 'energyMonitor' : ['mock', 'arduino'] , 'button' : ['mock', 'arduino', 'gadgeteer'] , 'door' : ['mock', 'arduino'], 'window' : ['mock', 'arduino'], 'curtain' : ['mock', 'arduino'], 'plug' : ['mock', 'wemo'], 'light' : ['mock', 'lightwaveRF'], 'radiator' : ['mock']}

passive = {item.Item : True, item.Openable : False, item.OnOff : False, item.Lights : False, item.RadiatorValve : False}