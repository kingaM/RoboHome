/**
 *  JavaScript for home automation system prototype
 *  Author: Li Quan Khoo
 */

var APP = APP || {};
"use strict";

/****************************************************************************************************************
 *  Data structures
 ****************************************************************************************************************
 */

/**
 *  Standard inheritance function
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
 *  Object responsible for running a stage in the UI
 *  Define __construct and __update to govern construction and updating behavior respectively,
 *    but call via construct() and update()
 */
APP.Stage = function(buttonId, stageId) {
    this.buttonId = buttonId;
    this.stageId = stageId;
    this.data = {};
    this.__construct = function() {};
    this.__update = function() {};
}
APP.Stage.prototype.construct = function() {
    if(document.getElementById(stageId) === null) {
        var stage = $('<div></div>').attr({id: stageId, class: 'stage'});
        stage.append($('<div></div>').class('stage-content'));
        $('#stages > li').append(stage);
    }
    this.__construct();
}
APP.Stage.prototype.update = function() {
    this.__update();
}
APP.Stage.prototype.show = function() {
    $(this.stageId).addClass('active');
}
APP.Stage.prototype.hide = function() {
    $(this.stageId).removeClass('active');
}

/****************************************************************************************************************
 *  Data
 ****************************************************************************************************************
 */

// API property definitions
APP.API_CONSTANTS = {
    STATUS_CODE: 'statusCode',
    CONTENT: 'content'
}

APP.data = {    
    cache: {
        methodList: new APP.Map()
    }
}

/**
 *  This object handles the top menus. Linking of buttons in the secondary menu
 *  and the stages are configured under APP.StageManager instead.
 */
APP.MenuManager = function() {
    var linked = false,
        map = {
            'button-home' :  {
                menuId: null,
                buttonText: 'Home',
                class: 'blue',
                buttons: []
            },
            'button-areas' : {
                menuId: 'menu-areas',
                buttonText: 'Areas',
                class: 'blue',
                buttons: [
                    { id: 'areas-all', text: 'All' }
                ]
            },
            'button-monitor': {
                menuId: 'menu-monitor',
                buttonText: 'Monitor',
                class: 'green',
                buttons: [
                    { id: 'monitor-placeholder', text: 'Placeholder' }
                ]
            },
            'button-rules' : {
                menuId: 'menu-rules',
                buttonText: 'Rules',
                class: 'yellow',
                buttons: [
                    { id: 'rules-eca', text: 'ECA' }
                ]
            },
            'button-config' : {
                menuId: 'menu-config',
                buttonText: 'Config',
                class: 'yellow',
                buttons: [
                    { id: 'config-placeholder', text: 'Placeholder' }
                ]
            }
        },
        primaryMenu = $('#menu-primary');
        secondaryMenuWrapper = $('#wrapper-secondary');     
        update = function(stageManager) {
            var target,
                mapping;
            
            function constructButton(buttonId, buttonText, cls, menuId) {
                var button;
                if (document.getElementById(buttonId) === null) { 
                    button = $('<a>' + buttonText + '</a>').attr({id: buttonId, class: cls, href: '#'});
                    if(menuId === null) { button.addClass('no-menu'); }
                    button = $('<li></li>').append(button);
                    $('#menu-primary').append(button);
                }
            }
            
            function constructSecondaryMenu(menuId, buttons, cls) {
                // construct menu
                var menu;
                if(menuId !== null) {
                    if(document.getElementById(menuId) === null) {
                        menu = $('<ul></ul>').attr({id: menuId, class: 'menu horizontal secondary ' + cls});
                        secondaryMenuWrapper.append(menu);
                    } else {
                        menu = $('#' + menuId);
                    }
                    // construct menu buttons
                    for(var i = 0; i < buttons.length; i++) {
                        console.log(JSON.stringify(buttons));
                        var button;
                        if(document.getElementById(buttons[i].id) === null) {
                            console.log('foo');
                            button = $('<li></li>').append($('<a>' + buttons[i].text + '</a>').attr({id: buttons[i].id, href: '#'}));
                            menu.append(button);
                        }
                    }
                }
            }
            
            // This links the buttons with the menus
            function link() {
                var primaryButtons = primaryMenu.children().children(),
                    menus = secondaryMenuWrapper.children();
                primaryButtons.each(function() {
                    $(this).click(function() {
                        target = $(this);
                        if(map[$(this).attr('id')].menuId !== null) {
                            target.toggleClass('selected');
                        }
                        primaryButtons.not(target).each(function() {
                            $(this).removeClass('selected');
                        });
                        mapping = map[$(this).attr('id')].menuId;
                        $('#' + mapping).toggleClass('active');
                        menus.not('#' + mapping).removeClass('active');
                        menus.children().removeClass('selected');
                        stageManager.hideAllStages();
                        APP.resizer.resizeStageWrapper();
                    });
                });
            }
            
            for(buttonId in map) {
                var obj = map[buttonId];
                constructButton(buttonId, obj.buttonText, obj.class, obj.menuId);
                constructSecondaryMenu(obj.menuId, obj.buttons, obj.class);
            }
            if(!linked) {
                linked = true;
                link();
            }
        }
    
    // Construct updated menu. Elements already constructed are unchanged
    this.update = update;
}

/**
 *  This object handles Stage objects
 */
APP.StageManager = function() {
    var activeStageId = undefined,
        stages = {},
        setActiveStage = function(id) {
            activeStageId = id;
        },
        register = function(stage) {
            var stageId = stage.stageId
            stages.stageId = stage;
        },
        remove = function(stageId) {
            stages.stageId.delete();
        },
        construct = function(stageId) {
            stages.stageId.construct();
        },
        update = function() {
            stages.activeStageId.update();
        },
        hideAllStages = function() {
            $('.stage').removeClass('active');
        }
    
    // sets a stage as the active stage. The active stage is the only stage that is updated
    this.setActiveStage = setActiveStage;
    
    // registers a new stage so it is managed by this object
    this.register = register;
    
    // remove a stage from the list of managed stages
    this.remove = remove;
    
    // constructs the specified stage
    this.construct = construct;
    
    // updates the active stage
    this.update = update;
    
    // hide all stages
    this.hideAllStages = hideAllStages;
    
    // definition of stages
    this.initialize = function() {
        /*
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
        */
    }
}

/**
 *  Polls sensors at a specified frequency
 */
/*
APP.poller = {
    __intervalId: undefined,
    __frequency: undefined,
    // frequency in ms
    setFrequency: function(frequency) {
        APP.poller.__frequency = frequency;
    },
    startPolling: function() {
        if(APP.poller.__frequency !== undefined) {
            APP.poller.__intervalId = window.setInterval(APP.poller.poll, APP.poller.__frequency);
        }
    },
    stopPolling: function() {
        window.clearInterval(APP.poller.__intervalId);
    },
    poll: function() {
        APP.ajaxPost('ENTITY_UPDATE', '', '/updateinfo', 'normal', function(json) {
            var contentObj = APP.unpackToContent(json);
            APP.DataHandler.updateEntityMap(contentObj);
            APP.UIConstructor.updateUIValues(APP.Data.EntityMap);
        });
    }
}
*/

/**
 *  This object handles time and the clock
 */
APP.clock = {
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
        APP.clock.getCurrentTime();
        setInterval(APP.clock.getCurrentTime, 1000);
    }
}

/**
 *  This object handles window resizing
 */
APP.windowResizeListener = {
    listen: function() {
        $(window).resize(function() {
            APP.resizer.resizeAll();
        });
    }
}

/**
 *  This object handles dynamic resizing of elements and font size
 */
APP.resizer = {
    resizeAll: function() {
        for(var method in APP.resizer) {
            if(method === 'resizeAll') { continue; }
            APP.resizer[method]();
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
    
    // Instantiate manager objects
    var menuManager = new APP.MenuManager(),
        stageManager = new APP.StageManager();
    
    // Construct menus
    menuManager.update(stageManager);
    
    APP.clock.startClock();
    APP.windowResizeListener.listen();
    APP.resizer.resizeAll();
    
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
            APP.poller.setFrequency(1000);
            APP.poller.startPolling();
        });
    });
    */
});