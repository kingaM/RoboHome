/**
 * Data / DOM-independent QUnit tests for master.js
 * These tests can be run independently of the server by opening qunit.html offline, locally
 *
 * JavaScript for Robohome
 * Author: Li Quan Khoo
 */

(function() {
    
    function checkProperties(parent, obj, property, propertyList) {
        for(var i = 0; i < propertyList.length; i++) {
            if(property === propertyList[i].name) {
                ok(true, parent + ' has property "' + propertyList[i].name + '"');
                equal(typeof(obj[property]), propertyList[i].type, 'property "' + property + '" type matches expected ("' + propertyList[i].type + '")');
                return;
            }
        }
        ok(false, 'property "' + property + '" not expected');
    }
    
    function validateMessageObj(obj) {
        equal(typeof(obj), 'object', 'Returned JSON can be parsed to JavaScript object');
        for(var property in obj) {
            if(obj.hasOwnProperty(property)) {
                checkProperties('JSON string', obj, property, [
                    { name: APP.API.WRAPPER.CONTENT, type: 'object' },
                    { name: APP.API.WRAPPER.STATUS_CODE, type: 'number' }
                ]);
            }
        }
    }
    
    /* GET /version */
    (function() {
        module('/version');
        asyncTest('GET ' + APP.URL.VERSION, function() {
            APP.ajax.get_version(
                function(json) {
                    var obj = APP.unpack(json),
                        content,
                        supportedTypes,
                        types = {
                            button: {
                                states: [
                                    {
                                        id: 1,
                                        name: 'on'
                                    },
                                    {
                                        id: 0,
                                        name: 'off'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'arduino',
                                    'gadgeteer'
                                ],
                                name: 'Button',
                                isPassive: true,
                                methods: [
                                    'Button Pressed'
                                ]
                            },
                            curtain:  {
                                states: [
                                    {
                                        method: 'open',
                                        id: 1,
                                        name: 'opened'
                                    },
                                    {
                                        method: 'close',
                                        id: 0,
                                        name: 'closed'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'arduino'
                                ],
                                name: 'Curtain',
                                isPassive: false,
                                methods: [
                                    'Opened',
                                    'Open',
                                    'Close',
                                    'Open By'
                                ]
                            },
                            door: {
                                states: [
                                    {
                                        method: 'open',
                                        id: 1,
                                        name: 'opened'
                                    },
                                    {
                                        method: 'close',
                                        id: 0,
                                        name: 'closed'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'arduino'
                                ],
                                name: 'Door',
                                isPassive: false,
                                methods: [
                                    'Opened',
                                    'Open',
                                    'Close',
                                    'Open By'
                                ]
                            },
                            energyMonitor: {
                                states: [
                                    {
                                        id: 1,
                                        name: 'high'
                                    },
                                    {
                                        id: 0,
                                        name: 'low'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'arduino'
                                ],
                                name: 'Energy Monitor',
                                isPassive: true,
                                methods: [
                                    'Energy Level'
                                ]
                            },
                            light: {
                                states: [
                                    {
                                        method: 'on',
                                        id: 1,
                                        name: 'on'
                                    },
                                    {
                                        method: 'off',
                                        id: 0,
                                        name: 'off'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'lightwaveRF'
                                ],
                                name: 'Light',
                                isPassive: false,
                                methods: [
                                    'Lights on',
                                    'Turn On',
                                    'Turn Off'
                                ]
                            },
                            lightSensor: {
                                states: [
                                    {
                                        id: 1,
                                        name: 'light'
                                    },
                                    {
                                        id: 0,
                                        name: 'dark'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'gadgeteer'
                                ],
                                name: 'Light Sensor',
                                isPassive: true,
                                methods: [
                                    'Light Intensity'
                                ]
                            },
                            motionSensor: {
                                states: [
                                    {
                                        id: 1,
                                        name: 'motion detected'
                                    },
                                    {
                                        id: 0,
                                        name: 'no motion'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'arduino'
                                ],
                                name: 'Motion Sensor',
                                isPassive: true,
                                methods: [
                                    'Motion Detected'
                                ]
                            },
                            plug: {
                                states: [
                                    {
                                        method: 'on',
                                        id: 1,
                                        name: 'on'
                                    },
                                    {
                                        method: 'off',
                                        id: 0,
                                        name: 'off'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'wemo'
                                ],
                                name: 'Plug',
                                isPassive: false,
                                methods: [
                                    'On',
                                    'Turn On',
                                    'Turn Off'
                                ]
                            },
                            radiator: {
                                states: [
                                    {
                                        'id': 0,
                                        'temperature': 'setTemperature'
                                    }
                                ],
                                supportedBrands: [
                                    'mock'
                                ],
                                name: 'Radiator Valve',
                                isPassive: false,
                                methods: [
                                    'Temperature in Degrees',
                                    'Set Temperature'
                                ]
                            },
                            temperatureSensor: {
                                states: [
                                    {
                                        id: 1,
                                        name: 'hot'
                                    },
                                    {
                                        id: 0,
                                        name: 'cold'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'arduino'
                                ],
                                name: 'Temperature Sensor',
                                isPassive: true,
                                methods: [
                                    'Temperature in Degrees'
                                ]
                            },
                            window: {
                                states: [
                                    {
                                        method: 'open',
                                        id: 1,
                                        name: 'opened'
                                    },
                                    {
                                        method: 'close',
                                        id: 0,
                                        name: 'closed'
                                    }
                                ],
                                supportedBrands: [
                                    'mock',
                                    'arduino'
                                ],
                                name: 'Window',
                                isPassive: false,
                                methods: [
                                    'Opened',
                                    'Open',
                                    'Close',
                                    'Open By'
                                ]
                            }
                        };
                    
                    validateMessageObj(obj);
                    
                    for(var property in content) {
                        if(obj.hasOwnProperty(property)) {
                            checkProperties('content', property, [
                                { name: APP.API.VERSION.SUPPORTED_TYPES, type: 'object' }
                            ]);
                        }
                    }
                    
                    content = obj[APP.API.WRAPPER.CONTENT];
                    supportedTypes = content[APP.API.VERSION.SUPPORTED_TYPES];
                    equal(typeof(supportedTypes), 'object', '"supportedTypes" is valid JavaScript object');
                    for(var property in supportedTypes) {
                        if(supportedTypes.hasOwnProperty(property)) {
                            ok(types.hasOwnProperty(property), 'property ' + property + ' is tested');
                            deepEqual(supportedTypes[property], types[property], 'property ' + property + ' fields all match');
                        }
                    }
                    
                    start();
                },
                function() {}
            );
        });
    })();
    
    /* GET /state */
    (function() {
        module('/state');
        asyncTest('GET' + APP.URL.STATE, function() {
            
            function validateRooms(rooms) {
                
                function validateItems(items) {
                    
                    ok(items instanceof Array, '"items" is instanceof Array');
                    for(var i = 0; i < items.length; i++) {
                        var itemObj = items[i];
                        
                        for(var property in itemObj) {
                            if(itemObj.hasOwnProperty(property)) {
                                checkProperties('item object ' + itemObj[APP.API.STATE.ROOM.ITEM.NAME], itemObj, property, [
                                    { name: APP.API.STATE.ROOM.ITEM.ITEM_TYPE, type: 'string' },
                                    { name: APP.API.STATE.ROOM.ITEM.ID, type: 'number' },
                                    { name: APP.API.STATE.ROOM.ITEM.BRAND, type: 'string' },
                                    { name: APP.API.STATE.ROOM.ITEM.IP, type: 'string' },
                                    { name: APP.API.STATE.ROOM.ITEM.NAME, type: 'string' },
                                    { name: APP.API.STATE.STATE, type: 'number' }
                                ]);
                            }
                        }
                    }
                }
                
                ok(rooms instanceof Array, '"rooms" is instanceof Array');
                for(var i = 0; i < rooms.length; i++) {
                    var roomObj = rooms[i];
                    
                    for(var property in roomObj) {
                        if(roomObj.hasOwnProperty(property)) {
                            checkProperties('room object ' + roomObj[APP.API.STATE.ROOM.NAME], roomObj, property, [
                                { name: APP.API.STATE.ROOM.ID, type: 'number' },
                                { name: APP.API.STATE.ROOM.NAME, type: 'string' },
                                { name: APP.API.STATE.ROOM.ITEMS, type: 'object' }
                            ]);
                        }
                    }
                    validateItems(roomObj[APP.API.STATE.ROOM.ITEMS]);
                }
            }
            
            APP.ajax.get_state(
                function(json) {
                    var obj = APP.unpack(json),
                        content = obj[APP.API.WRAPPER.CONTENT],
                        rooms = content[APP.API.STATE.ROOMS];
                    
                    validateMessageObj(obj);
                    validateRooms(rooms);
                    start();
                },
                function() {}
            );
        });
    })();
    
    /* GET /events */
    (function() {
        module('/events');
        asyncTest('GET' + APP.URL.EVENTS, function() {
            
            function validateRules(rules) {
                
                function validateEvent(eventObj) {
                    for(var property in eventObj) {
                        if(eventObj.hasOwnProperty(property)) {
                            checkProperties('event object ' + eventObj[APP.API.EVENTS.RULE.EVENT.ID], eventObj, property, [
                                { name: APP.API.EVENTS.RULE.EVENT.ID, type: 'number' },
                                { name: APP.API.EVENTS.RULE.EVENT.ITEM_TYPE, type: 'string' },
                                { name: APP.API.EVENTS.RULE.EVENT.SCOPE, type: 'string' },
                                { name: APP.API.EVENTS.RULE.EVENT.VALUE, type: 'number' }
                            ]);
                        }
                    }
                }
                
                function validateConditions(conditions) {
                    
                    ok(conditions instanceof Array, '"conditions" property is instanceof Array');
                    for(var i = 0; i < conditions.length; i++) {
                        var conditionObj = conditions[i];
                        
                        for(var property in conditionObj) {
                            if(conditionObj.hasOwnProperty(property)) {
                                checkProperties('condition object ' + conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_ID], conditionObj, property, [
                                    { name: APP.API.EVENTS.RULE.CONDITION.ITEM_ID, type: 'number' },
                                    { name: APP.API.EVENTS.RULE.CONDITION.CONDITION_ID, type: 'number' },
                                    { name: APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE, type: 'string' },
                                    { name: APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE, type: 'string' },
                                    { name: APP.API.EVENTS.RULE.CONDITION.VALUE, type: 'number' },
                                    { name: APP.API.EVENTS.RULE.CONDITION.METHOD, type: 'string' }
                                ]);
                            }
                        }
                    }
                }
                
                function validateActions(actions) {
                    
                    ok(actions instanceof Array, '"actions" property is instanceof Array');
                    for(var i = 0; i < actions.length; i++) {
                        var actionObj = actions[i];
                        
                        for(var property in actionObj) {
                            if(actionObj.hasOwnProperty(property)) {
                                checkProperties('action object ' + actionObj[APP.API.EVENTS.RULE.ACTION.ID], actionObj, property, [
                                    { name: APP.API.EVENTS.RULE.ACTION.ID, type: 'number' },
                                    { name: APP.API.EVENTS.RULE.ACTION.SCOPE, type: 'string' },
                                    { name: APP.API.EVENTS.RULE.ACTION.ITEM_TYPE, type: 'string' },
                                    { name: APP.API.EVENTS.RULE.ACTION.ACTION_ID, type: 'number' },
                                    { name: APP.API.EVENTS.RULE.ACTION.METHOD, type: 'string' }
                                ]);
                            }
                        }
                    }
                }
                
                ok(rules instanceof Array, '"rules" is instanceof Array');
                for(var i = 0; i < rules.length; i++) {
                    var ruleObj = rules[i];
                    
                    for(var property in ruleObj) {
                        if(ruleObj.hasOwnProperty(property)) {
                            checkProperties('rule object ' + ruleObj[APP.API.EVENTS.RULE.RULE_NAME], ruleObj, property, [
                                { name: APP.API.EVENTS.RULE.RULE_ID, type: 'number' },
                                { name: APP.API.EVENTS.RULE.RULE_NAME, type: 'string' },
                                { name: APP.API.EVENTS.RULE.ENABLED, type: 'boolean' },
                                { name: APP.API.EVENTS.RULE.EVENT.EVENT, type: 'object' },
                                { name: APP.API.EVENTS.RULE.CONDITIONS, type: 'object' },
                                { name: APP.API.EVENTS.RULE.ACTIONS, type: 'object' }
                            ]);
                        }
                        validateEvent(ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT]);
                        validateConditions(ruleObj[APP.API.EVENTS.RULE.CONDITIONS]);
                        validateActions(ruleObj[APP.API.EVENTS.RULE.ACTIONS]);
                    }
                }
            }
            
            APP.ajax.get_events(
                function(json) {
                    var obj = APP.unpack(json),
                        content = obj[APP.API.WRAPPER.CONTENT],
                        rules = content[APP.API.EVENTS.RULES];
                    
                    validateMessageObj(obj);
                    validateRules(rules);
                    start();
                },
                function() {}
            );
        });
    })();
    
})();