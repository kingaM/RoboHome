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


/****************************************************************************************************************
 *  data
 ****************************************************************************************************************
 */

// API property definitions
APP.API_CONSTANTS = {
    STATUS_CODE: 'statusCode',
    CONTENT: 'content'
}

APP.ID = {
    // primary menu buttons
    button_home:        '#button-home',
    button_test:        '#button-test',
    button_areas:       '#button-areas',
    button_monitor:     '#button-monitor',
    button_rules:       '#button-rules',
    button_config:      '#button-config',
    button_quit:        '#button-quit',
    
    // secondary menus
    menu_test:      '#menu-test',
    menu_areas:     '#menu-areas',
    menu_monitor:   '#menu-monitor',
    menu_rules:     '#menu-rules',
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
    
    button_rules_eca:            '#rules-eca',
    
    // stages
    stage_monitor_cameras:      '#stage-monitor-cameras',
    stage_monitor_movement:     '#stage-monitor-movement',
    stage_monitor_doors:        '#stage-monitor-doors',
    stage_monitor_windows:      '#stage-monitor-windows',
    stage_monitor_lighting:     '#stage-monitor-lighting',
    stage_monitor_temperature:  '#stage-monitor-temperature',
    stage_monitor_cameras:      '#stage-monitor-cameras',
    
    stage_rules_eca:            '#stage-rules-eca'
}

APP.Data = {

    // current stage shown by UI. UI updating should only update its children DOM elements for performance reasons
    activeStageId: undefined,
    
    // menu maps
    PrimaryMenuMap: new APP.Map(),
    SecondaryMenuMap: new APP.Map(),
    
    // cached server data
    Cache: {
        methodList: new APP.Map()
    }
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
            
        map = APP.Data.PrimaryMenuMap;
        // map.put(APP.Button.home,    '');
        map.put(APP.ID.button_test,     APP.ID.menu_test);
        map.put(APP.ID.button_areas,    APP.ID.menu_areas);
        map.put(APP.ID.button_monitor,  APP.ID.menu_monitor);
        map.put(APP.ID.button_rules,    APP.ID.menu_rules);
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
        
        map = APP.Data.SecondaryMenuMap;
        
        map.put(APP.ID.button_monitor_cameras,     APP.ID.stage_monitor_cameras);
        map.put(APP.ID.button_monitor_movement,    APP.ID.stage_monitor_movement);
        map.put(APP.ID.button_monitor_doors,       APP.ID.stage_monitor_doors);
        map.put(APP.ID.button_monitor_windows,     APP.ID.stage_monitor_windows);
        map.put(APP.ID.button_monitor_lighting,    APP.ID.stage_monitor_lighting);
        map.put(APP.ID.button_monitor_temperature, APP.ID.stage_monitor_temperature);
        map.put(APP.ID.button_monitor_cameras,     APP.ID.stage_monitor_cameras);
        
        map.put(APP.ID.button_rules_eca,           APP.ID.stage_rules_eca);
        
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
                // APP.UIConstructor.updateUIValues(APP.Data.EntityMap);
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
        if(APP.Poller.__frequency !== undefined) {
            APP.Poller.__intervalId = window.setInterval(APP.Poller.poll, APP.Poller.__frequency);
        }
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



/****************************************************************************************************************
 *  Messaging and AJAX
 ****************************************************************************************************************
 */

/* pack payload into JS object in API message format */
APP.pack = function(payload) {
    var obj = {};
    obj[APP.API_CONSTANTS['CONTENT']] = payload;
    return obj;
}

/* pack payload into JSON string in API message format */
APP.packToJSON = function(payload) { return JSON.stringify(APP.pack(payload)) }

/* unpack message JSON to complete object */
APP.unpack = function(payload) { return JSON.parse(payload); }

/* unpack message JSON to just the payload object */
APP.unpackToPayload = function(payload) { return JSON.parse(payload)[APP.API_CONSTANTS['CONTENT']]; }

APP.ajaxPost = function(payload, url, callback) {
    var messageObj,
        internalCallback;
    message = APP.packToJSON(payload);
    internalCallback = function(args) {
        // log into console
        callback(args);
    };
    $.ajax({
        type: "POST",
        url: url,
        data: message,
        processData: false,
        cache: false,
        contentType: "application/json",
        dataType: "text",
        success: internalCallback
    });
    // log into console
}

APP.ajaxGet = function(payload, url, callback) {
    var messageObj,
        internalCallback;
    message = APP.packToJSON(payload);
    internalCallback = function(args) {
        // log into console
        callback(args);
    };
    $.ajax({
        type: "GET",
        url: url,
        data: message,
        processData: false,
        cache: false,
        contentType: "application/json",
        dataType: "text",
        success: internalCallback
    });
    // log into console
}

$(document).ready(function() {
    
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