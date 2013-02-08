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
/** Return a list of all hashed values */
APP.Map.prototype.getAll = function() {
    var valueList = [];
    for (var item in this.__items) {
        valueList.push(this.__items[item].value);
    }
    return valueList;
}
/** This returns a list of keys that the values in the map are hashed with */
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
 *  Construction and updating behavior are configured via modifying construct() and update()
 */
APP.Stage = function(menuId, buttonId, buttonText, stageId) {
    this.menuId = menuId;
    this.buttonId = buttonId;
    this.buttonText = buttonText;
    this.stageId = stageId;
    this.data = {};
    this.construct = function() {};
    this.update = function() {};
}
/**
 *  @param func - function to be passed in
 *  Give function to execute when construct() is called
 */
APP.Stage.prototype.setConstruct = function(func) {
    this.construct = func;
}
/**
 *  @param func - function to be passed in
 *  Give function to execute when update() is called
 */
APP.Stage.prototype.setUpdate = function(func) {
    this.update = func;
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
        
        /**
         *  @param stageManager : APP.StageManager - stageManager object responsible for hiding the stages
         */
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
                            stageManager.hideAllStages();
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
    
    this.update = update;
}

/**
 *  This object handles Stage objects
 */
APP.StageManager = function() {
    var primaryMenuId = 'menu-primary',
        primaryButtonSelector = '#menu-prmary > li > a',
        secondaryMenuId = 'wrapper-secondary',
        secondaryButtonSelector = '#wrapper-secondary > ul > li > a',
        stageSelector = '#stages > .stage',
        stageContainerSelector = '#stages',
        
        activeStageId = undefined,
        stages = new APP.Map(),
        
        /**
         *  @param stageId : string - id of stage to be set as active
         *  The active stage is the only one that's updated when update() is called
         */
        setActiveStage = function(stageId) {
            activeStageId = stageId;
        },
        
        /**
         *  @param stage : APP.Stage - Stage object to be managed by this manager
         *  @return APP.Stage - the input Stage object, for convenience
         *  If the new stage shares an existing stageId, it will replace the old stage
         */
        addStage = function(stage) {
            // construct menu buttons
            if(document.getElementById(stage.buttonId) === null) {
                button = $('<li></li>').append($('<a>' + stage.buttonText + '</a>').attr({id: stage.buttonId, href: '#'}));
                $('#' + stage.menuId).append(button);
            }
            
            // construct stage template
            if(document.getElementById(stage.stageId) === null) {
                var stageElement = $('<div></div>').attr({id: stage.stageId, class: 'stage'});
                stageElement.append($('<div>' + 'test' + '</div>').addClass('stage-content'));
                $(stageContainerSelector).append(stageElement);
            }
            
            // link
            $('#' + stage.buttonId).click(function() {
                var targetButton,
                    targetStage;
                targetButton = $(this);
                targetButton.toggleClass('selected');
                if(targetButton.parent().parent().parent().id === primaryMenuId) {
                    $(primaryButtonSelector).not(targetButton).removeClass('selected');
                } else if(targetButton.parent().parent().id === secondaryMenuId) {
                    $(secondaryButtonSelector).not(targetButton).removeClass('selected');
                }
                
                targetStage = $('#' + stage.stageId);
                targetStage.toggleClass('active');
                $(stageSelector).not(targetStage).removeClass('active');
            });
            
            // register stage
            stages.put(stage.stageId, stage);
            return stage;
        },
        
        /**
         *  @param stage : string id of Stage object to be removed
         */
        removeStage = function(stageId) {
            // delete button
            $('#' + stages.get(stageId).buttonId).parent().remove();
            // delete stage
            $('#' + stageId).remove();
            // unregister stage
            stages.remove(stageId);
        },
        
        /**
         *  @param stageId : string - id of Stage object to construct
         *  Calls the construct() method of the specified Stage object
         */
        construct = function(stageId) {
            stages.get(stageId).construct();
        },
        
        /**
         *  Constructs all stages registered with this StageManager
         */
        constructAll = function() {
            var ls = stages.getAll();
            for(var i = 0; i < ls.length; i++) {
                ls[i].construct();
            }
        },
        
        /**
         *  Calls the update() method of the active Stage object
         */
        update = function() {
            if(activeStageId !== undefined) {
                stages.get(activeStageId).update();
            }
        },
        
        /**
         *  Hides all stages
         */
        hideAllStages = function() {
            $(secondaryButtonSelector).removeClass('selected');
            $(stageSelector).removeClass('active');
        }
    
    this.setActiveStage = setActiveStage;
    this.addStage = addStage;
    this.removeStage = removeStage;
    this.construct = construct;
    this.update = update;
    this.hideAllStages = hideAllStages;
    
    this.initialize = function() {
        var stage;
        
        // home stage
        stage = addStage(new APP.Stage('menu-home', 'button-home', '', 'stage-home'));
        stage.setConstruct(function() {
            
        });
        stage.setUpdate(function() {
            
        });
        
        // areas stage
        stage = addStage(new APP.Stage('menu-areas', 'button-areas-all', 'All', 'stage-areas-all'));
        stage.setConstruct(function() {
            
        });
        stage.setUpdate(function() {
            
        });
        
        // eca stage
        stage = addStage(new APP.Stage('menu-rules', 'button-rules-eca', 'ECA', 'stage-rules-eca'));
        stage.setConstruct(function() {
            
        });
        stage.setUpdate(function() {
            
        });
        
        constructAll();
        
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
    stageManager.initialize();
    
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