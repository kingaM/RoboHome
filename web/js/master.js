/**
 *  JavaScript for home automation system prototype
 *  Author: Li Quan Khoo
 */

var APP = APP || {};
"use strict";

/****************************************************************************************************************
 *  data structures
 ****************************************************************************************************************
 */

/**
 *  Standard classical inheritance function
 *  The child inherits members of the parent's prototype only.
 */
APP.inherit = function(C, P) {
    var F = function() {};          // create intermediate
    F.prototype = P.prototype;      // intermediate's prototype borrows from parent's
    C.prototype = new F();          // child inherits from new instance of intermediate. Breaks prototype reference to parent
    C.uber = P.prototype;           // set child's superclass as parent's prototype
    C.prototype.constructor = C;    // reset child's constructor pointer
}

/**
 *  HashMap implementation
 */
APP.Map = function() {
    this.__items = {};
    this.size = 0;
}
/**
 *  Hash function from
 *  http://stackoverflow.com/questions/368280/javascript-hashmap-equivalent
 *    Maybe change it to a simpler one which handles only strings for higher performance
 */
APP.Map.prototype.hash = function(value) {
    return (typeof value) + ' ' + (value instanceof Object ?
        (value.__hash || (value.__hash = ++arguments.callee.current)) :
        value.toString());
}
APP.Map.prototype.clear = function() {
    this.__items = {};
    this.size = 0;
}
APP.Map.prototype.put = function(key, value) {
    var hash;
    hash = this.hash(key);
    if(this.__items[hash] === undefined) {
        this.__items[hash] = { key: key, value: value };
        this.size++;
    }
    else this.__items[hash].value = value;
}
APP.Map.prototype.remove = function(key) {
    var hash,
        item;
    hash = this.hash(key);
    item = this.__items[hash];
    if(item !== undefined) {
        this.size--;
        delete this.__items[hash];
    }
}
APP.Map.prototype.get = function(key) {
    var hash,
        item;
    hash = this.hash(key);
    item = this.__items[hash];
    if (item === undefined) { return undefined; } 
    return item.value;
}
/* Return a list of all hashed values */
APP.Map.prototype.getAll = function() {
    var valueList = [];
    for (var item in this.__items) {
        valueList.push(this.__items[item].value);
    }
    return valueList;
}
/* This returns a list of keys that the values in the map are hashed with */
APP.Map.prototype.getKeys = function() {
    var hash,
        itemList = [];
    for(var item in this.items) {
        itemList.push(item);
    }
    return itemList;
}

/**
 *  Hashed objects containing hierachial relations and DOM UI element ids
 */
APP.EntityTreeMap = function() {
    this.__items = {};
    this.size = 0;
}
APP.inherit(APP.EntityTreeMap, APP.Map);
APP.EntityTreeMap.prototype.put = function(id, name, type, state, generation, parentInfo, ancestorInfo, siblingInfo, siblingOfTypeInfo, childrenInfo, descendantInfo) {
    var hash,
        value;
    hash = this.hash(id);
    value = {
        id: id,
        name: name,
        type: type,
        state: state,
        generation: generation,
        relativeId: {
            parent: parentInfo.id,
            ancestor: ancestorInfo.id,
            sibling: siblingInfo.id,
            siblingOfType: siblingOfTypeInfo.id,
            children: childrenInfo.id,
            descendant: descendantInfo.id
        },
        panelId: {
            self: type + '-' + id,
            parent: parentInfo.panelId,
            ancestor: ancestorInfo.panelId,
            sibling: siblingInfo.panelId,
            siblingOfType: siblingOfTypeInfo.panelId,
            children: childrenInfo.panelId,
            descendant: descendantInfo.panelId
        }
    }
    if(this.__items[hash] === undefined) {
        this.__items[hash] = {
            key: id,
            value: value
        };
        this.size++;
    } else {
        this.__items[hash].value = value;
    }
}
APP.EntityTreeMap.prototype.updateState = function(id, newState) {
    var hash;
    hash = this.hash(id);
    if(hash !== undefined) {
        this.__items[hash].value.state = newState
    }
}
APP.EntityTreeMap.prototype.updateOwnState = function(id, ownState) {
    var hash;
    hash = this.hash(id);
    if(hash !== undefined && ownState !== null) { // ignore null newState from Python dict dumps()
        this.__items[hash].value.state.self = ownState;
    }
}
APP.EntityTreeMap.prototype.getAllIds = function(id) {
    var valueList,
        idList = [];
    valueList = this.getAll();
    for(var i = 0; i < valueList.length; i++) {
        idList.push(valueList[i].id);
    }
    return idList;
}
APP.EntityTreeMap.prototype.getName                    = function(id) { return this.get(id).name; }
APP.EntityTreeMap.prototype.getState                   = function(id) { return this.get(id).state; }
APP.EntityTreeMap.prototype.getType                    = function(id) { return this.get(id).type; }
APP.EntityTreeMap.prototype.getParentId                = function(id) { return this.get(id) === undefined ? undefined : this.get(id).relativeId.parent; }
APP.EntityTreeMap.prototype.getAncestorId              = function(id) { return this.get(id) === undefined ? undefined : this.get(id).relativeId.ancestor; }
APP.EntityTreeMap.prototype.getSiblingId               = function(id) { return this.get(id) === undefined ? undefined : this.get(id).relativeId.sibling; }
APP.EntityTreeMap.prototype.getSiblingOfTypeId         = function(id) { return this.get(id) === undefined ? undefined : this.get(id).relativeId.siblingOfType; }
APP.EntityTreeMap.prototype.getChildrenId              = function(id) { return this.get(id) === undefined ? undefined : this.get(id).relativeId.children; }
APP.EntityTreeMap.prototype.getDescendantId            = function(id) { return this.get(id) === undefined ? undefined : this.get(id).relativeId.descendant; }
APP.EntityTreeMap.prototype.getOwnPanelId              = function(id) { return this.get(id) === undefined ? undefined : this.get(id).panelId.self; }
APP.EntityTreeMap.prototype.getParentPanelId           = function(id) { return this.get(id) === undefined ? undefined : this.get(id).panelId.parent; }
APP.EntityTreeMap.prototype.getSiblingPanelId          = function(id) { return this.get(id) === undefined ? undefined : this.get(id).panelId.ancestor; }
APP.EntityTreeMap.prototype.getSiblingOfTypePanelId    = function(id) { return this.get(id) === undefined ? undefined : this.get(id).panelId.siblingOfType; }
APP.EntityTreeMap.prototype.getChildrenPanelId         = function(id) { return this.get(id) === undefined ? undefined : this.get(id).panelId.children; }
APP.EntityTreeMap.prototype.getDescendantPanelId       = function(id) { return this.get(id) === undefined ? undefined : this.get(id).panelId.descendant; }

/****************************************************************************************************************
 *  data
 ****************************************************************************************************************
 */

APP.ID = {
    // primary menu buttons
    button_home:        '#button-home',
    button_test:        '#button-test',
    button_areas:       '#button-areas',
    button_monitor:     '#button-monitor',
    button_security:    '#button-security',
    button_config:      '#button-config',
    button_quit:        '#button-quit',
    
    // secondary menus
    menu_test:      '#menu-test',
    menu_areas:     '#menu-areas',
    menu_monitor:   '#menu-monitor',
    menu_security:  '#menu-security',
    menu_config:    '#menu-config',
    menu_quit:      '#menu-quit',
    
    // secondary menu buttons
    button_monitor_cameras:      '#monitor-cameras',
    button_monitor_movement:     '#monitor-movement',
    button_monitor_doors:        '#monitor-doors',
    button_monitor_windows:      '#monitor-windows',
    button_monitor_lighting:     '#monitor-lighting',
    button_monitor_temperature:  '#monitor-temperature',
    button_monitor_cameras:      '#monitor-cameras',
    
    button_security_state:              '#security-state',
    button_security_events:             '#security-events',
    button_security_triggers:           '#security-triggers',
    button_security_emergencyservices:  '#security-emergency-services',
    
    // stages
    stage_monitor_cameras:      '#stage-monitor-cameras',
    stage_monitor_movement:     '#stage-monitor-movement',
    stage_monitor_doors:        '#stage-monitor-doors',
    stage_monitor_windows:      '#stage-monitor-windows',
    stage_monitor_lighting:     '#stage-monitor-lighting',
    stage_monitor_temperature:  '#stage-monitor-temperature',
    stage_monitor_cameras:      '#stage-monitor-cameras',
    
    stage_security_state:               '#stage-security-state',
    stage_security_events:              '#stage-security-events',
    stage_security_triggers:            '#stage-security-triggers',
    stage_security_emergencyservices:   '#stage-security-emergency-services'
}

APP.Data = {
    // static properties
    specialStates: {
        undefined: 'undefined',
        null: 'null',
        partial: -1,
    },
    types: {
        self: 'self',
        area: 'area',
        door: 'door',
        lock: 'lock',
        window: 'window',
        curtain: 'curtain',
        light: 'light'
    },
    normalStates: {
        area: undefined,
        door: 2,
        lock: 2,
        window: 2,
        curtain: 2,
        light: 2
    },
    // dynamic properties
    activeStageId: undefined,           // current stage shown by UI. UI updating should only update its children DOM elements for performance reasons
    primaryMenuMap: new APP.Map(),
    secondaryMenuMap: new APP.Map(),
    areaMenuBindings: undefined,        // binds area id code to name e.g. "area1" to "living room"
    clientIP: "unidentified",
    initData: undefined,                // this should be refactored out at some point. It's here for debugging purposes
    EntityMap: new APP.EntityTreeMap()
}

/**
 *  Container object for methods initializing listeners handling menus and functionality
 *    which do not involve the server.
 *  Events triggering POST or GET requests should be scripted under APP.SubmissionHandler
 */
APP.Listen = {
    all: function() {
        APP.Listen.windowResize();
        APP.Listen.primaryMenu();
        APP.Listen.stage();
    },
    windowResize: function() {
        $(window).resize(function() {
            APP.Resizer.resizeAll();
        });
    },
    primaryMenu: function() {
        var map,
            menuItems,
            secondaryMenus,
            target,
            mapping;
            
        map = APP.Data.primaryMenuMap;
        //map.put(APP.Button.home,    '');
        map.put(APP.ID.button_test,     APP.ID.menu_test);
        map.put(APP.ID.button_areas,    APP.ID.menu_areas);
        map.put(APP.ID.button_monitor,  APP.ID.menu_monitor);
        map.put(APP.ID.button_security, APP.ID.menu_security);
        map.put(APP.ID.button_config,   APP.ID.menu_config);
        map.put(APP.ID.button_quit,     APP.ID.menu_quit);
        
        menuItems = $('#menu-primary').children().children();
        secondaryMenus = $('#wrapper-secondary').children();
        menuItems.each(function() {
            $(this).click(function() {
                target = $(this);
                if(! target.hasClass('no-menu')) {
                    target.toggleClass('selected');
                }
                menuItems.not(target).each(function() {
                    $(this).removeClass('selected');
                });
                mapping = map.get('#' + $(this).attr('id'));
                $(mapping).toggleClass('active');
                secondaryMenus.not(mapping).removeClass('active');
                $('.menu.secondary').children().children().removeClass('selected');
                $('.stage').removeClass('active');
                APP.Resizer.resizeStageWrapper();
            });
        });
    },
    stage: function() {
        var map,
            menuItems,
            stages,
            target,
            mapping;
        
        map = APP.Data.secondaryMenuMap;
        
        map.put(APP.ID.button_monitor_cameras,     APP.ID.stage_monitor_cameras);
        map.put(APP.ID.button_monitor_movement,    APP.ID.stage_monitor_movement);
        map.put(APP.ID.button_monitor_doors,       APP.ID.stage_monitor_doors);
        map.put(APP.ID.button_monitor_windows,     APP.ID.stage_monitor_windows);
        map.put(APP.ID.button_monitor_lighting,    APP.ID.stage_monitor_lighting);
        map.put(APP.ID.button_monitor_temperature, APP.ID.stage_monitor_temperature);
        map.put(APP.ID.button_monitor_cameras,     APP.ID.stage_monitor_cameras);
        
        map.put(APP.ID.button_security_state,             APP.ID.stage_security_state);
        map.put(APP.ID.button_security_events,            APP.ID.stage_security_events);
        map.put(APP.ID.button_security_triggers,          APP.ID.stage_security_triggers);
        map.put(APP.ID.button_security_emergencyservices, APP.ID.stage_security_emergencyservices);
        
        menuItems = $('.menu.secondary').children().children();
        stages = $('.stage');
        menuItems.each(function() {
            $(this).click(function() {
                target = $(this);
                if(! target.hasClass('no-menu')) {
                    APP.Data.activeStageId = 'stage-' + target.attr('id');
                    target.toggleClass('selected');
                }
                menuItems.not(target).each(function() {
                    $(this).removeClass('selected');
                });
                mapping = map.get('#' + $(this).attr('id'));
                $(mapping).toggleClass('active');
                stages.not(mapping).removeClass('active');
                APP.UIConstructor.updateUIValues(APP.Data.EntityMap);
            });
        });
    }
}

/**
 *  Polls sensors at a specified frequency
 */
APP.Poller = {
    __intervalId: undefined,
    __frequency: undefined,
    /* Frequency in milliseconds */
    setFrequency: function(frequency) {
        APP.Poller.__frequency = frequency;
    },
    startPolling: function() {
        APP.Poller.__intervalId = window.setInterval(APP.Poller.poll, APP.Poller.__frequency);
    },
    stopPolling: function() {
        window.clearInterval(APP.Poller.__intervalId);
    },
    poll: function() {
        APP.ajaxPost('ENTITY_UPDATE', '', '/updateinfo', 'normal', function(json) {
            var contentObj = APP.unpackToContent(json);
            APP.DataHandler.updateEntityMap(contentObj);
            APP.UIConstructor.updateUIValues(APP.Data.EntityMap);
        });
    }
}

/**
 *  This object handles time and the clock
 */
APP.Clock = {
    getTimestamp: function() {
        var date = new Date();
        function pad(num) {
            return (num < 10) ? "0" + num : num;
        }
        function padK(num) {
            if(num < 10) { return "00" + num; }
            if(num < 100) { return "0" + num; }
            return num;
        }
        return (pad(date.getHours()) + '' + pad(date.getMinutes()) + ' ' + pad(date.getSeconds()) + '.' + padK(date.getMilliseconds()));
    },
    getCurrentTime: function() {
        var date = new Date(),
            currentYear = date.getFullYear(),
            currentMonth = date.getMonth(),
            currentDate = date.getDate(),
            currentHours = date.getHours(),
            currentMinutes = date.getMinutes(),
            currentDay = date.getDay(),
            timeOfDay;
            
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        
        if (currentHours > 12) {
            currentHours -= 12;
            timeOfDay = "PM";
        } else {
            timeOfDay = "AM";
            if (currentHours === 0) {
                currentHours = 12;
            }
        }

        switch(currentDay) {
        case 0: currentDay = "Sunday"; break;
        case 1: currentDay = "Monday"; break;
        case 2: currentDay = "Tuesday"; break;
        case 3: currentDay = "Wednesday"; break;
        case 4: currentDay = "Thursday"; break;
        case 5: currentDay = "Friday"; break;
        case 6: currentDay = "Saturday"; break;
        }
        
        switch(currentMonth) {
        case 0: currentMonth = "January"; break;
        case 1: currentMonth = "February"; break;
        case 2: currentMonth = "March"; break;
        case 3: currentMonth = "April"; break;
        case 4: currentMonth = "May"; break;
        case 5: currentMonth = "June"; break;
        case 6: currentMonth = "July"; break;
        case 7: currentMonth = "August"; break;
        case 8: currentMonth = "September"; break;
        case 9: currentMonth = "October"; break;
        case 10: currentMonth = "November"; break;
        case 11: currentMonth = "December"; break;
        }
        
        $('#hours-minutes').html(currentHours + ":" + currentMinutes);
        $('#am-pm').html(timeOfDay);
        $('#day').html(currentDay);
        $('#date').html(currentDate + " " + currentMonth + " " + currentYear);
         
    },
    startClock: function() {
        APP.Clock.getCurrentTime();
        setInterval(APP.Clock.getCurrentTime, 1000);
    }
}

/**
 *  This object handles dynamic resizing of elements and font size based on window size
 */
APP.Resizer = {
    resizeAll: function() {
        for(var method in APP.Resizer) {
            if(method === 'resizeAll') { continue; }
            APP.Resizer[method]();
        }
    },
    resizeText: function() {
        var masterFontSize;
        masterFontSize = (window.innerWidth / 100) + 'px';
        $('body').css('font-size', masterFontSize);
    },
    resizeStageWrapper: function() {
        var stageHeight;
        stageHeight = (window.innerHeight - $('#wrapper-primary').height() - $('#wrapper-secondary').height()) + 'px';
        $('#wrapper-stage').css('height', stageHeight);
    },
    resizeLeftPanel: function() {
        var panelHeight;
        panelHeight = (window.innerHeight - $('#chronograph').height()) + 'px';
        $('#left-panel').css('height', panelHeight);
    }
}

/**
 *  Message packing and unpacking methods
 */
APP.pack = function(op, sync, payload) {
    return {
        OP: op,
        SYNC_CODE: sync,
        IP: APP.Data.clientIP,
        CONTENT: payload
    };
}
APP.unpackToObject = function(payload) { return JSON.parse(payload); }
APP.unpackToContent = function(payload) { return JSON.parse(payload).CONTENT; }
APP.unpackToString = function(payload) { return JSON.stringify(JSON.parse(payload).CONTENT); }

/**
 * Call by:
    APP.ajaxPost(payload, function(json) {
        var obj = JSON.parse(json);
        // do stuff with obj
    });
 */
APP.ajaxPost = function(op, payload, url, logClasses, callback) {
    var messageObj,
        internalCallback;
    messageObj = APP.pack(op, "", payload);
    internalCallback = function(args) {
        APP.Console.log(JSON.parse(args), 'incoming');
        callback(args);
    };
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(messageObj),
        processData: false,
        cache:  false,
        contentType: "application/json",
        dataType: "text",
        success: internalCallback
    });
    APP.Console.log(messageObj, 'outgoing ' + logClasses, url);
}

$(document).ready(function() {
    
    // perform static tasks
    // set up clock and resize UI
    APP.Clock.startClock();
    APP.Resizer.resizeAll();
    
    APP.Listen.all();
    
    /*
    // get client IP
    APP.ajaxPost('GET_IP', '', '/returnclientip', 'normal', function(json) {
        APP.Data.clientIP = APP.unpackToObject(json).CONTENT;
        
        // initialize data
        APP.ajaxPost('ENTITY_CONSTRUCT', '', '/initinfo', 'normal', function(json) {
            var obj;
            obj = APP.unpackToObject(json);
            
            // set up data
            APP.Data.areaMenuBindings = obj.CONTENT.bindings;
            APP.Data.initData = obj.CONTENT.tree;
            APP.DataHandler.internalize();
            
            // set up interactive elements
            APP.UIConstructor.constructAll(APP.Data.EntityMap);
            
            // set listeners - make sure UI construction has finished before initializing these
            APP.Listen.all();
            
            // remove UI mask
            // start polling
            APP.Poller.setFrequency(1000);
            APP.Poller.startPolling();
        });
    });
    */
});