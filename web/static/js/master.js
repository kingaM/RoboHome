/**
 * JavaScript for home automation system prototype
 * Author: Li Quan Khoo
 * Documentation in YUIDoc format
 *   http://yui.github.com/yuidoc/syntax/index.html
 */

var APP = APP || {};
"use strict";

// ---------------------------------------------------------------------
// Data structures
// ---------------------------------------------------------------------

/**
 * @method APP.inherit
 * @param {Constructor} C Child class to inherit to
 * @param {Constructor} P Parent class to inherit from
 * @static
 * Standard inheritance function
 * The child inherits members of the parent's prototype only.
 */
APP.inherit = function(C, P) {
    var F = function() {};          // create intermediate
    F.prototype = P.prototype;      // intermediate's prototype borrows from parent's
    C.prototype = new F();          // child inherits from new instance of intermediate. Breaks prototype reference to parent
    C.uber = P.prototype;           // set child's superclass as parent's prototype
    C.prototype.constructor = C;    // reset child's constructor pointer
}

/**
 * @class APP.Map
 * @constructor
 * HashMap implementation
 */
APP.Map = function() {
    this.__items = {};
    this.size = 0;
}

/**
 * @for APP.Map
 * @method hash
 * @param {any} value Any object or primitive to be hashed
 * @return {String} hash of given value
 * Hash function from
 * http://stackoverflow.com/questions/368280/javascript-hashmap-equivalent
 *   Maybe change it to a simpler one which handles only strings for higher performance
 */
APP.Map.prototype.hash = function(value) {
    return (typeof value) + ' ' + (value instanceof Object ?
        (value.__hash || (value.__hash = ++arguments.callee.current)) :
        value.toString());
}

/**
 * @for APP.Map
 * @method clear
 * Delete all entries in the hashmap
 */
APP.Map.prototype.clear = function() {
    this.__items = {};
    this.size = 0;
}

/**
 * @for APP.Map
 * @method put
 * @param {any} key Key
 * @param {any} value Value
 * Adds a key-value pair to the hashmap
 */
APP.Map.prototype.put = function(key, value) {
    var hash;
    hash = this.hash(key);
    if(this.__items[hash] === undefined) {
        this.__items[hash] = { key: key, value: value };
        this.size++;
    }
    else this.__items[hash].value = value;
}

/**
 * @for APP.Map
 * @method remove
 * @param {any} key Key of entry to remove
 * Remove an entry from the hashmap
 */
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

/**
 * @for APP.Map
 * @method get
 * @param {any} key Key of entry to retrieve
 * @return {any} Value of key
 * Retrieve the value of the specified key in the hashmap
 */
APP.Map.prototype.get = function(key) {
    var hash,
        item;
    hash = this.hash(key);
    item = this.__items[hash];
    if (item === undefined) { return undefined; } 
    return item.value;
}

/**
 * @for APP.Map
 * @method getAll
 * @return {Array} Array of values
 * Returns array of all values in hashmap
 */
APP.Map.prototype.getAll = function() {
    var valueList = [];
    for (var item in this.__items) {
        valueList.push(this.__items[item].value);
    }
    return valueList;
}

/**
 * @for APP.Map
 * @method getKeys
 * @return {Array} Array of keys
 * Returns array containing the hashes of all keys in the hashmap
 */
APP.Map.prototype.getKeys = function() {
    var hash,
        itemList = [];
    for(var item in this.items) {
        itemList.push(item);
    }
    return itemList;
}

/**
 * @class APP.Stage
 * @constructor
 * @param {String} menuId       Element id of menu containing button
 * @param {String} buttonId     Element id of button
 * @param {String} buttonText   Text of button to show/hide the stage and fire onClick() when stage becomes active
 * @param {String} stageId      Id of DOM element which represents the stage
 * Class responsible for running a stage in the UI.
 * Construction and updating behavior are configured via modifying construct() and update()
 */
APP.Stage = function(menuId, buttonId, buttonText, stageId) {
    var __menuId = menuId,
        __buttonId = buttonId,
        __buttonText = buttonText,
        __stageId = stageId;
    
    this.data = {};
    this.menuId = __menuId;
    this.buttonId = __buttonId;
    this.buttonText = __buttonText;
    this.stageId = __stageId;
    
    /**
     * @for APP.Stage
     * @property data
     * @type {Object}
     * @default {}
     * Data specific to this stage
     */
    this.data = {};
    
    /**
     * @for APP.Stage
     * @method onShow
     * Execute function given to setOnShow()
     */
    this.onShow = function() {};
    
    /**
     * @for APP.Stage
     * @method onShow
     * Execute function given to setOnHide()
     */
     this.onHide = function() {};
    
    /**
     * @for APP.Stage
     * @method construct
     * Execute function given to setConstruct()
     */
    this.construct = function() {};
    
    /**
     * @for APP.Stage
     * @method update
     * Execute function given to setUpdate()
     */
    this.update = function() {};
}

/**
 * @for APP.Stage
 * @method setOnShow
 * @param {Function} func Function to be passed in
 * Give function to execute when stage is shown
 */
APP.Stage.prototype.setOnShow = function(func) {
    var self = this;
    this.onShow = function() {
        console.log(self.stageId + ' onShow() called');
        func();
    }
}

/**
 * @for APP.Stage
 * @method setOnHide
 * @param {Function} func Function to be passed in
 * Give function to execute when stage is hidden
 */
APP.Stage.prototype.setOnHide = function(func) {
    var self = this;
    this.onHide = function() {
        console.log(self.stageId + ' onHide() called');
        func();
    }
}

/**
 * @for APP.Stage
 * @method setConstruct
 * @param {Function} func Function to be passed in
 * Give function to execute when construct() is called
 */
APP.Stage.prototype.setConstruct = function(func) {
    var self = this;
    this.construct = function() {
        console.log(self.stageId + ' construct() called');
        func();
    }
}

/**
 * @for APP.Stage
 * @method setUpdate
 * @param {Function} func Function to be passed in
 * Give function to execute when update() is called
 */
APP.Stage.prototype.setUpdate = function(func) {
    var self = this;
    this.update = function() {
        console.log(self.stageId + ' update() called');
        func();
    }
}

// ---------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------

// API property definitions
APP.CONSTANTS = {
    VERSION: '0.1',
    STATUS_CODE: 'statusCode',
    CONTENT: 'content'
}

// RESTful API URL specification
APP.URL = {
    STRUCTURE: function() {
        return '/version/' + APP.CONSTANTS.VERSION + '/structure';
    },
    STATE: function() {
        return '/version/' + APP.CONSTANTS.VERSION + '/state';
    },
    ROOMS: function() {
        return '/version/' + APP.CONSTANTS.VERSION + '/rooms';
    },
    ROOMS_ROOMID: function(roomId) {
        return '/version/' + APP.CONSTANTS.VERSION + '/rooms/' + roomId;
    },
    ROOMS_ROOMID_ITEMS: function(roomId) {
        return '/version/' + APP.CONSTANTS.VERSION + '/rooms/' + roomId + '/items';
    },
    ROOMS_ROOMID_ITEMS_ITEMID: function(roomId, itemId) {
        return '/version/' + APP.CONSTANTS.VERSION + '/rooms/' + roomId + '/items/' + itemId;
    },
    EVENTS: function() {
        return '/version/' + APP.CONSTANTS.VERSION + '/events';
    },
    EVENTS_EVENTID: function(eventId) {
        return '/version/' + APP.CONSTANTS.VERSION + '/events/' + eventId;
    },
    METHODS: function() {
        return '/version/' + APP.CONSTANTS.VERSION + '/methods';
    }
}

// Active shared or cached data
APP.data = {    
    houseStructure: undefined,
    cache: {
        methodList: new APP.Map()
    }
}

// ---------------------------------------------------------------------
// Messaging and AJAX
// ---------------------------------------------------------------------

/**
 * @method APP.pack
 * @param {Object} payload  Object to pack
 * @return {Object}         Object in API message format
 * Packs given object into API message format
 */
APP.pack = function(payload) {
    var obj = {};
    obj[APP.CONSTANTS['CONTENT']] = payload;
    return obj;
}

/**
 * @method APP.packToJSON
 * @param {Object} payload  Object to pack
 * @return {String}         JSON string in API message format
 * Packs given object into JSON string in API message format
 */
APP.packToJSON = function(payload) { return JSON.stringify(APP.pack(payload)) }

/**
 * @method APP.unpack
 * @param {String} json JSON string
 * @return {Object}     Object
 * Currently equivalent of JSON.parse(obj)
 */
APP.unpack = function(json) { return JSON.parse(json); }

/**
 * @method APP.unpackToPayload
 * @param {String} json JSON string in API message format
 * @return {Object}     Payload object
 * Unpacks API JSON string and returns the payload object
 */
APP.unpackToPayload = function(json) { return JSON.parse(json)[APP.CONSTANTS['CONTENT']]; }

/**
 * @method APP.ajax
 * @param {String} requestType  HTTP request type e.g. 'GET', 'POST', etc.
 * @param {String} url          URL string to send request to
 * @param {Object} payload      Object to pack
 * @param {Function} callback   Callback function
 */
APP.ajax = function(requestType, url, payload, callback) {
    var messageObj,
        internalCallback;
    
    message = APP.packToJSON(payload);
    
    /* this is so that side effects such as logging
     * can be specified here
     */
    internalCallback = function(args) {
        // side effects go here
        console.log('AJAX callback called ' + url);
        // --
        callback(args);
    };
    $.ajax({
        type: requestType,
        url: url,
        data: message,
        processData: false,
        cache: false,
        contentType: 'application/json',
        dataType: 'text',
        success: internalCallback
    });
}

/**
 * @method APP.ajax_get_structure
 * Retrieves the latest house structure from the server
 */
APP.ajax_get_structure = function() {
    APP.ajax('GET', APP.URL.STRUCTURE(), '',
        function(json) {
            var obj = APP.unpackToPayload(json);
            APP.data.houseStructure = obj;
        });
}

// ---------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------

/**
 * @class APP.MenuManager
 * @constructor
 * This class handles the top menus. Linking of buttons in the secondary menu
 *   and the stages are configured under APP.StageManager instead.
 */
APP.MenuManager = function() {
    var linked = false,
        // map specifying the menus to generate at the start
        map = {
            'button-home' :  {
                menuId: null,
                buttonText: 'Home',
                class: 'blue'
            },
            'button-areas' : {
                menuId: 'menu-areas',
                buttonText: 'Areas',
                class: 'blue'
            },
            'button-monitor': {
                menuId: 'menu-monitor',
                buttonText: 'Monitor',
                class: 'green'
            },
            'button-rules' : {
                menuId: 'menu-rules',
                buttonText: 'Rules',
                class: 'yellow'
            },
            'button-config' : {
                menuId: 'menu-config',
                buttonText: 'Config',
                class: 'yellow'
            }
        },
        primaryMenu = $('#menu-primary'),
        secondaryMenuWrapper = $('#wrapper-secondary'),
        
        init = function(stageManager) {
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
                        // If this button has an associated menu --> not being used as Stage button
                        if(mapping !== null) {
                            stageManager.toggleStage(null);
                        }
                        APP.resizer.resizeStageWrapper();
                    });
                });
            }
            
            for(var buttonId in map) {
                var obj = map[buttonId];
                constructButton(buttonId, obj.buttonText, obj.class, obj.menuId);
                constructSecondaryMenu(obj.menuId, obj.buttons, obj.class);
            }
            if(!linked) {
                linked = true;
                link();
            }
        }
    
    /**
     * @for APP.MenuManager
     * @method init
     * @param {APP.StageManager} stageManager StageManager object responsible for hiding the stages
     * This constructs the top menus according to what's specified in this class.
     */
    this.init = init;
}

/**
 * @class APP.StageManager
 * @constructor
 * This class handles Stage objects
 */
APP.StageManager = function() {
    var primaryMenuId = 'menu-primary',
        primaryButtonSelector = '#menu-prmary > li > a',
        secondaryMenuId = 'wrapper-secondary',
        secondaryButtonSelector = '#wrapper-secondary > ul > li > a',
        stageSelector = '#stages > .stage',
        activeStageSelector = '#stages > .stage.active',
        stageContainerSelector = '#stages',
        
        activeStageId = null,
        stages = new APP.Map(),
        
        // private methods
        setActiveStage = function(stageId) {
            activeStageId = stageId;
        },
        
        // public methods
        addStage = function(stage) {
            // construct menu buttons
            if(document.getElementById(stage.buttonId) === null) {
                button = $('<li></li>').append($('<a>' + stage.buttonText + '</a>').attr({id: stage.buttonId, href: '#'}));
                $('#' + stage.menuId).append(button);
            }
            
            // construct stage template
            if(document.getElementById(stage.stageId) === null) {
                var stageElement = $('<div></div>').attr({id: stage.stageId, class: 'stage'});
                stageElement.append($('<div></div>').addClass('stage-content'));
                $(stageContainerSelector).append(stageElement);
            }
            
            // link
            $('#' + stage.buttonId).click(function() {
                var targetButton = $(this);
                // toggle clicked button
                targetButton.toggleClass('selected');
                // toggle sibling buttons
                $(primaryButtonSelector).not(targetButton).removeClass('selected');
                $(secondaryButtonSelector).not(targetButton).removeClass('selected');
                
                // toggle stages
                toggleStage(stage.stageId);
                
            });
            
            // register stage
            stages.put(stage.stageId, stage);
            return stage.stageId;
        },
        
        toggleStage = function(stageId) {
            
            var targetStage,
                activeStage;
            
            function hideActiveStage() {
                var activeStage = stages.get(activeStageId);
                activeStageId = null;
                $('#' + activeStage.stageId).removeClass('active');
                activeStage.onHide();
            }
            
            function showNewStage(stageId) {
                var newStage = stages.get(stageId);
                activeStageId = newStage.stageId;
                $('#' + newStage.stageId).addClass('active');
                newStage.onShow();
            }
            
            if(stageId === null) {
                if(activeStageId !== null) {
                    hideActiveStage();
                }
            } else {
                if(activeStageId === null) { // no active stage
                    showNewStage(stageId);
                } else { // has active stage
                    if(activeStageId === stageId) {
                        hideActiveStage();
                    } else {
                        hideActiveStage();
                        showNewStage(stageId);
                    }
                }
            }
            
        },
        
        removeStage = function(stageId) {
            // delete button
            $('#' + stages.get(stageId).buttonId).parent().remove();
            // delete stage
            $('#' + stageId).remove();
            // unregister stage
            stages.remove(stageId);
        },
        
        construct = function(stageId) {
            stages.get(stageId).construct();
        },
        
        update = function() {
            if(activeStageId !== undefined) {
                stages.get(activeStageId).update();
            }
        };
    
    /**
     * @for APP.StageManager
     * @method addStage
     * @param {APP.Stage} stage Stage object to be managed by this manager
     * @return {String}         Input stage element id, for convenience
     * If the new stage shares an existing stageId, it will replace the old stage
     */
    this.addStage = addStage;
    
    /**
     * @for APP.StageManager
     * @method toggleStage
     * @param {String | null} stageId Element id of stage to toggle on/off, or null
     *                                to toggle off regardless of current active stage
     */
    this.toggleStage = toggleStage;
    
    /**
     * @for APP.StageManager
     * @method removeStage
     * @param {String} stageId String id of Stage object to be removed
     */
    this.removeStage = removeStage;
    
    /**
     * @for APP.StageManager
     * @method construct
     * @param {String} stageId Id of Stage object to construct
     * Calls the construct() method of the specified Stage object
     */
    this.construct = construct;
    
    /**
     * @for APP.StageManager
     * @method update
     * Calls the update() method of the specified stage
     */
    this.update = update;
    
    /**
     * @for APP.StageManager
     * @method init
     */
    this.init = function() {
        var stageId,
            stage_home,
            stage_areas,
            stage_eca;
        
        // home stage
        stageId = addStage(new APP.Stage('menu-home', 'button-home', '', 'stage-home'));
        stage_home = stages.get(stageId);
        stage_home.setOnShow(function() {
            
        });
        stage_home.setOnHide(function() {
            
        });
        stage_home.setConstruct(function() {
            
        });
        stage_home.setUpdate(function() {
            
        });
        
        // areas stage
        stageId = addStage(new APP.Stage('menu-areas', 'button-areas-all', 'All', 'stage-areas-all'));
        stage_areas = stages.get(stageId);
        stage_areas.setOnShow(function() {
            APP.ajax_get_structure();
            stage_areas.construct();
        });
        stage_areas.setOnHide(function() {
            
        });
        stage_areas.setConstruct(function() {
            
            stage_areas.update();
        });
        stage_areas.setUpdate(function() {
            
        });
        
        // eca stage
        stageId = addStage(new APP.Stage('menu-rules', 'button-rules-eca', 'ECA', 'stage-rules-eca'));
        stage_eca = stages.get(stageId);
        stage_eca.setOnShow(function() {
            
        });
        stage_eca.setOnHide(function() {
            
        });
        stage_eca.setConstruct(function() {
            
        });
        stage_eca.setUpdate(function() {
            
        });
        
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
 * @static
 * This object handles time and the clock
 */
APP.clock = {

    /**
     * @for APP.clock
     * @method getTimestamp
     * @return {String} String formatted to represent current time, from hours to milliseconds
     */
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
    
    /**
     * @for APP.clock
     * @method getCurrentTime
     * Updates the clock defined on the DOM with the current system time
     */
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
    
    /**
     * @for APP.clock
     * @method startClock
     * Starts the scripts that runs the clock on the DOM
     */
    startClock: function() {
        APP.clock.getCurrentTime();
        setInterval(APP.clock.getCurrentTime, 1000);
    }
}

/**
 * @static
 * This object handles window resizing
 */
APP.windowResizeListener = {
    /**
     * @for APP.windowResizeListener
     * @method listen
     */
    listen: function() {
        $(window).resize(function() {
            APP.resizer.resizeAll();
        });
    }
}

/**
 * @static
 * This object handles dynamic resizing of elements and font size
 */
APP.resizer = {
    /**
     * @for APP.resizer
     * @method resizeAll
     */
    resizeAll: function() {
        for(var method in APP.resizer) {
            if(method === 'resizeAll') { continue; }
            APP.resizer[method]();
        }
    },
    /**
     * @for APP.resizer
     * @method resizeText
     */
    resizeText: function() {
        var masterFontSize;
        masterFontSize = (window.innerWidth / 100) + 'px';
        $('body').css('font-size', masterFontSize);
    },
    /**
     * @for APP.resizer
     * @method resizeStageWrapper
     */
    resizeStageWrapper: function() {
        var stageHeight;
        stageHeight = (window.innerHeight - $('#wrapper-primary').height() - $('#wrapper-secondary').height()) + 'px';
        $('#wrapper-stage').css('height', stageHeight);
    },
    /**
     * @for APP.resizer
     * @method resizeLeftPanel
     */
    resizeLeftPanel: function() {
        var panelHeight;
        panelHeight = (window.innerHeight - $('#chronograph').height()) + 'px';
        $('#left-panel').css('height', panelHeight);
    }
}

$(document).ready(function() {
    
    // Instantiate manager objects
    var menuManager = new APP.MenuManager(),
        stageManager = new APP.StageManager();
    
    // Construct menus
    menuManager.init(stageManager);
    stageManager.init();
    
    // Start clock
    APP.clock.startClock();
    
    // Listen to size changes
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