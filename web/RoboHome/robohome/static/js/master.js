/**
 * JavaScript for home automation system prototype
 * Author: Li Quan Khoo
 * Documentation in YUIDoc format
 *   http://yui.github.com/yuidoc/syntax/index.html
 */

var APP = APP || {};
"use strict";

// ---------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------

/* Declarations are structured this way for easy text-replace in case of API changes
 * It can be restructured at some point from e.g.:
    APP.CONSTANTS = {};
    APP.CONSTANTS.VERSION = '0.1';
 * to
    APP.CONSTANTS = {
        VERSION: '0.1'
    };
 */

// Application constants
APP.CONSTANTS = {};
APP.CONSTANTS.VERSION = '0.1';

// DOM classes and ids
APP.DOM_HOOK = {};
APP.DOM_HOOK.COLLAPSED = 'collapsed';
APP.DOM_HOOK.ENABLED = 'enabled';
APP.DOM_HOOK.STAGE_CONTENT = 'stage-content';
APP.DOM_HOOK.ENTITY = {};
APP.DOM_HOOK.ENTITY.ITEM_TYPE = 'item-type';
APP.DOM_HOOK.ENTITY.ROOM = 'room';
APP.DOM_HOOK.ENTITY.ITEM = 'item';
APP.DOM_HOOK.NO_ROOM = 'no-room';
APP.DOM_HOOK.ECA = {};
APP.DOM_HOOK.ECA.RULE = 'eca-rule';
APP.DOM_HOOK.ECA.NEW_RULE = 'eca-new-rule';
APP.DOM_HOOK.ECA.RULE_TITLE = 'eca-rule-title';
APP.DOM_HOOK.ECA.EVENT = 'eca-event';
APP.DOM_HOOK.ECA.EVENT_DISPLAY = 'eca-event-display';
APP.DOM_HOOK.ECA.CONDITION = 'eca-condition';
APP.DOM_HOOK.ECA.CONDITION_DISPLAY = 'eca-condition-display';
APP.DOM_HOOK.ECA.ACTION = 'eca-action';
APP.DOM_HOOK.ECA.ACTION_DISPLAY = 'eca-action-display';
APP.DOM_HOOK.ECA.FIELD_DIV = 'eca-field-div';
APP.DOM_HOOK.ECA.SHOW_HIDE = 'eca-show-hide';
APP.DOM_HOOK.ECA.ENABLE_DISABLE = 'eca-enable-disable';
APP.DOM_HOOK.ECA.DELETE = 'eca-delete';
APP.DOM_HOOK.ECA.EVENT_FIELDSET = 'eca-event-fieldset';
APP.DOM_HOOK.ECA.CAPITALIZE = 'eca-capitalize';
APP.DOM_HOOK.UPDATING = 'updating';
APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY = 'error-message-display';
APP.DOM_HOOK.CONNECTION_ERROR = 'connection-error';

// These are property name bindings as specified by the API
APP.API = {};
APP.API.WRAPPER = {};
APP.API.WRAPPER.STATUS_CODE = 'statusCode';
APP.API.WRAPPER.CONTENT = 'content';

// /version
APP.API.VERSION = {};
APP.API.VERSION.SUPPORTED_TYPES = 'supportedTypes';
APP.API.VERSION.SUPPORTED_TYPE = {};
APP.API.VERSION.SUPPORTED_TYPE.NAME = 'name';
APP.API.VERSION.SUPPORTED_TYPE.SUPPORTED_BRANDS = 'supportedBrands';
APP.API.VERSION.SUPPORTED_TYPE.METHODS = 'methods';
APP.API.VERSION.SUPPORTED_TYPE.STATES = 'states';
APP.API.VERSION.SUPPORTED_TYPE.STATE = {};
APP.API.VERSION.SUPPORTED_TYPE.STATE.ID = 'id';
APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME = 'name';
APP.API.VERSION.SUPPORTED_TYPE.STATE.METHOD = 'method';

// /state
APP.API.STATE = {};
APP.API.STATE.ROOMS = 'rooms';
APP.API.STATE.ROOM = {};
APP.API.STATE.ROOM.ID = 'id';
APP.API.STATE.ROOM.NAME = 'name';
APP.API.STATE.ROOM.ITEMS = 'items';
APP.API.STATE.ROOM.ITEM = {};
APP.API.STATE.ROOM.ITEM.ITEM_TYPE = 'itemType';
APP.API.STATE.ROOM.ITEM.ID = 'id';
APP.API.STATE.ROOM.ITEM.BRAND = 'brand';
APP.API.STATE.ROOM.ITEM.IP = 'ip';
APP.API.STATE.ROOM.ITEM.NAME = 'name';
APP.API.STATE.STATES = 'states';
APP.API.STATE.STATE = 'state';
APP.API.STATE.ID = 'id';

// /rooms
APP.API.ROOMS = {};
APP.API.ROOMS.NAME = 'name';
APP.API.ROOMS.ID = 'id';

// /rooms/roomId
APP.API.ROOMID = {};
APP.API.ROOMID.ID = 'id';

// /rooms/roomId/itemId
APP.API.ITEMS = {};
APP.API.ITEMS.BRAND = 'brand';
APP.API.ITEMS.IP = 'ip';
APP.API.ITEMS.NAME = 'name';
APP.API.ITEMS.ITEM_TYPE = 'itemType';
APP.API.ITEMS.ITEM_ID = 'itemId';

// /events
APP.API.EVENTS = {};
APP.API.EVENTS.RULES = 'rules';
APP.API.EVENTS.RULE = {};
APP.API.EVENTS.RULE.RULE_ID = 'ruleId';
APP.API.EVENTS.RULE.RULE_NAME = 'ruleName';
APP.API.EVENTS.RULE.ENABLED = 'enabled';
APP.API.EVENTS.RULE.EVENT = {};
APP.API.EVENTS.RULE.EVENT.EVENT = 'event';
APP.API.EVENTS.RULE.EVENT.ID = 'id';
APP.API.EVENTS.RULE.EVENT.ITEM_TYPE = 'itemType';
APP.API.EVENTS.RULE.EVENT.ITEM_STATE = 'itemState';
APP.API.EVENTS.RULE.CONDITIONS = 'conditions';
APP.API.EVENTS.RULE.CONDITION = {};
APP.API.EVENTS.RULE.CONDITION.ITEM_ID = 'itemId';
APP.API.EVENTS.RULE.CONDITION.CONDITION_ID = 'conditionId';
APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE = 'itemType';
APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE = 'equivalence';
APP.API.EVENTS.RULE.CONDITION.VALUE = 'value';
APP.API.EVENTS.RULE.CONDITION.METHOD = 'method';
APP.API.EVENTS.RULE.ACTIONS = 'actions';
APP.API.EVENTS.RULE.ACTION = {};
APP.API.EVENTS.RULE.ACTION.ID = 'id';
APP.API.EVENTS.RULE.ACTION.SCOPE = 'scope';
APP.API.EVENTS.RULE.ACTION.ITEM_TYPE = 'itemType';
APP.API.EVENTS.RULE.ACTION.ACTION_ID = 'actionId';
APP.API.EVENTS.RULE.ACTION.METHOD = 'method';

// /whitelist
APP.API.WHITELIST = {};
APP.API.WHITELIST.EMAIL = 'email';
APP.API.WHITELIST.EMAILS = 'emails';

// RESTful API URL specification
// Remember to specify the trailing slash so Flask does not have to redirect
APP.URL = {};
APP.URL.VERSION = '/version/';
APP.URL.STATE = '/version/' + APP.CONSTANTS.VERSION + '/state/';
APP.URL.ROOMS = '/version/' + APP.CONSTANTS.VERSION + '/rooms/';
APP.URL.ROOMS_ROOMID = function(roomId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/rooms/' + roomId + '/';
};
APP.URL.ROOMS_ROOMID_ITEMS = function(roomId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/rooms/' + roomId + '/items/';
};
APP.URL.ROOMS_ROOMID_ITEMS_ITEMID = function(roomId, itemId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/rooms/' + roomId + '/items/' + itemId + '/';
};
APP.URL.ROOMS_ROOMID_ITEMS_ITEMID_CMD = function(roomId, itemId, cmd) {
    return '/version/' + APP.CONSTANTS.VERSION + '/rooms/' + roomId + '/items/' + itemId + '/' + cmd + '/';
}
APP.URL.EVENTS = '/version/' + APP.CONSTANTS.VERSION + '/events/';
APP.URL.EVENTS_EVENTID = function(eventId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/events/' + eventId + '/';
};
APP.URL.WHITELIST = '/version/' + APP.CONSTANTS.VERSION + '/whitelist/';

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
};

/**
 * @class APP.Map
 * @constructor
 * HashMap implementation
 */
APP.Map = function() {
    this.__items = {};
    this.size = 0;
};

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
};

/**
 * @for APP.Map
 * @method clear
 * Delete all entries in the hashmap
 */
APP.Map.prototype.clear = function() {
    this.__items = {};
    this.size = 0;
};

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
};

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
};

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
};

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
};

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
};

// ---------------------------------------------------------------------
// Active data
// ---------------------------------------------------------------------

APP.data = {
    cache: undefined, // data which does not change unless the version changes
    connection: { // stores Date objects corresponding to last attempt, successful, or unsuccessful connection
        lastAttempt: undefined,
        lastSuccess: undefined,
        lastNoSuccess: undefined
    },
    retrieved: { // stores Date objects marking the age of AJAX-retrieved data
        houseStructure: undefined,
        events: undefined
    },
    houseStructure: undefined,
    events: undefined,
    stageManager: undefined
};

// ---------------------------------------------------------------------
// Message packing / unpacking
// ---------------------------------------------------------------------

/**
 * @method APP.pack
 * @param {Object} payload  Object to pack
 * @return {Object}         Object in API message format
 * @static
 * Packs given object into API message format
 */
APP.pack = function(payload) {
    var obj = {};
    obj[APP.API.WRAPPER.CONTENT] = payload;
    return obj;
};

/**
 * @method APP.packToJSON
 * @param {Object} payload  Object to pack
 * @return {String}         JSON string in API message format
 * @static
 * Packs given object into JSON string in API message format
 */
APP.packToJSON = function(payload) {
    return JSON.stringify(APP.pack(payload))
};

/**
 * @method APP.unpack
 * @param {String} json JSON string
 * @return {Object}     Object
 * @static
 * Currently equivalent of JSON.parse(obj)
 */
APP.unpack = function(json) {
    return JSON.parse(json);
};

/**
 * @method APP.unpackToPayload
 * @param {String} json JSON string in API message format
 * @return {Object}     Payload object
 * @static
 * Unpacks API JSON string and returns the payload object
 */
APP.unpackToPayload = function(json) {
    return JSON.parse(json)[APP.API.WRAPPER.CONTENT];
};

// ---------------------------------------------------------------------
// AJAX calls
// ---------------------------------------------------------------------

/**
 * @method APP.ajax
 * @param {String} requestType  HTTP request type e.g. 'GET', 'POST', etc.
 * @param {String} url          URL string to send request to
 * @param {any} payload         Data to feed into the data property
 * @param {Function} callback   Callback function
 * @param {Function} error      Function to execute if AJAX request fails
 */
APP.ajax = function(requestType, url, payload, callback, error) {
    var messageObj,
        internalCallback,
        internalError;
    
    internalCallback = function(args) {
        APP.data.connection.lastSuccess = new Date();
        APP.data.connection.lastSuccess.setTime(APP.data.connection.lastAttempt);
        console.log('AJAX callback called ' + url + ' ' + APP.clock.getTimestamp(APP.data.connection.lastSuccess));
        if(callback) {
            callback(args);
        }
    };
    internalError = function(args) {
        APP.data.connection.lastNoSuccess = new Date();
        APP.data.connection.lastNoSuccess.setTime(APP.data.connection.lastAttempt);
        console.log('AJAX error ' + url + ' ' + APP.clock.getTimestamp(APP.data.connection.lastNoSuccess));
        if(error) {
            error(args);
        }
    };
    APP.data.connection.lastAttempt = APP.clock.getCurrentDate();
    $.ajax({
        type: requestType,
        url: url,
        data: payload,
        processData: false,
        cache: false,
        contentType: 'application/json',
        dataType: 'text',
        success: internalCallback,
        error: internalError
    });
};

/**
 * @method APP.ajax_get_structure
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 * Retrieves the latest house structure from the server
 */
APP.ajax_get_state = function(callback, error) {
    APP.ajax('GET', APP.URL.STATE, '',
        function(json) {
            var obj = APP.unpackToPayload(json);
            APP.data.houseStructure = obj;
            APP.data.retrieved.houseStructure = new Date(APP.data.connection.lastSuccess);
            callback();
        },
        error
    );
};

/**
 * @method APP.ajax_get_version
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 * Retrieves version information and all information that's supposed to be cached
 */
APP.ajax_get_version = function(callback, error) {
    APP.ajax('GET', APP.URL.VERSION, '',
        function(json) {
            var obj = APP.unpackToPayload(json);
            APP.data.cache = obj;
            APP.data.retrieved.events = new Date(APP.data.connection.lastSuccess);
            callback();
        },
        error
    );
}

/**
 * @method APP.ajax_post_rooms
 * @param {String} roomName     Name of room
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 * Adds a new room
 */
APP.ajax_post_rooms = function(roomName, callback, error) {
    APP.ajax('POST', APP.URL.ROOMS + '?' + 
    APP.API.ROOMS.NAME + '=' + roomName,
    '',
    callback,
    error
    );
};

/**
 * @method APP.ajax_delete_rooms_roomId
 * @param {int} roomId          RoomId
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 */
APP.ajax_delete_rooms_roomId = function(roomId, callback, error) {
    APP.ajax('DELETE', APP.URL.ROOMS_ROOMID(roomId),
    '',
    callback,
    error
    );
};

/**
 * @method APP.ajax_delete_rooms_roomId_items
 * @param {int} roomId          Room ID
 * @param {String} targetBrand  Brand of item
 * @param {String} Static       IPv4 address of item
 * @param {String} targetName   Name of item
 * @param {String} targetType   Type of item
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 * Add new item to room
 */
APP.ajax_post_rooms_roomId_items = function(roomId, itemBrand, itemIP, itemName, itemType, callback, error) {
    APP.ajax('POST', APP.URL.ROOMS_ROOMID_ITEMS(roomId) + '?' + 
        APP.API.ITEMS.BRAND + '=' + itemBrand + '&' + 
        APP.API.ITEMS.IP + '=' + itemIP + '&' + 
        APP.API.ITEMS.NAME + '=' + itemName + '&' + 
        APP.API.ITEMS.ITEM_TYPE + '=' + itemType,
        '',
        callback,
        error
    );
}

/**
 * @method APP.ajax_delete_rooms_roomId_items_itemId
 * @param {int} roomId          Room ID
 * @param {int} itemId          Item ID
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 * Deletes specified item in room
 */
APP.ajax_delete_rooms_roomId_items_itemId = function(roomId, itemId, callback, error) {
    APP.ajax('DELETE', APP.URL.ROOMS_ROOMID_ITEMS_ITEMID(roomId, itemId), '',
        callback,
        error
    );
}

/**
 * @method APP.ajax_put_rooms_roomId_items_itemId_cmd
 * @param {int} roomId        ID of room
 * @param {int} itemId        ID of item
 * @param {String} cmd        Command to send to the item
 * @param {Function} callback Callback function to execute after response is received
 * @param {Function} error    Function to execute if AJAX request fails
 * Updates the specified item in the room with the new state
 */
APP.ajax_put_rooms_roomId_items_itemId_cmd = function(roomId, itemId, cmd, callback, error) {
    APP.ajax('PUT', APP.URL.ROOMS_ROOMID_ITEMS_ITEMID_CMD(roomId, itemId, cmd), '',
        callback,
        error
    );
}

/**
 *
 */
APP.ajax_get_events = function(callback, error) {
    APP.ajax('GET', APP.URL.EVENTS, '',
        function(json) {
            var obj = APP.unpackToPayload(json);
            APP.data.events = obj[APP.API.EVENTS.RULES];
            callback();
        },
        error
    );
};

/**
 * @method APP.ajax_get_whitelist
 * @param {Function} callback Callback function to execute after response is received
 * @param {Function} error    Function to execute if AJAX request fails
 * Fetches the list of whitelisted email addresses
 */
APP.ajax_get_whitelist = function(callback, error) {
    APP.ajax('GET', APP.URL.WHITELIST, '',
    callback,
    error
    );
};

/**
 * @method APP.ajax_post_whitelist
 * @param {String} email        Email address string to add
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 * Adds an email address to the whitelist
 */
APP.ajax_post_whitelist = function(email, callback, error) {
    APP.ajax('POST', APP.URL.WHITELIST + '?' + 
    APP.API.WHITELIST.EMAIL + '=' + email,
    '',
    callback,
    error
    );
};

/**
 * @method APP.ajax_delete_whitelist
 * @param {String} email        Email address string to delete
 * @param {Function} callback   Callback function to execute after response is received
 * @param {Function} error      Function to execute if AJAX request fails
 * Deletes an email address from the whitelist
 */
APP.ajax_delete_whitelist = function(email, callback, error) {
    APP.ajax('DELETE', APP.URL.WHITELIST + '?' + 
    APP.API.WHITELIST.EMAIL + '=' + email,
    '',
    callback,
    error
    );
};

// ---------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------

/**
 * @class APP.ContextMenu
 * @constructor
 * This class handles the context menu for each Stage
 * The context menu is associated with each Stage. Each Stage's construct() and tearDown() will call the 
 * equivalent of the instance of this class associated with the Stage.
 */
APP.ContextMenu = function() {
    var selector = '#context-menu';
    
    /**
     * @for APP.ContextMenu
     * @method getContext
     * Returns the jQuery object of the ContextMenu
     */
    this.getContext = function() {
        return $(selector);
    }
    
    /**
     * @for APP.ContextMenu
     * @method construct
     * This executes the function given in setConstruct().
     * This method is automatically called by the associated Stage's construct() method
     */
    this.construct = function() {};
    
    /**
     * @for APP.ContextMenu
     * @method setConstruct
     * Give the function to execute when the ContextMenu's construct() is called
     */
    this.setConstruct = function(func) {
        this.construct = func;
    }
    
    /**
     * @for APP.ContextMenu
     * @method tearDown
     * This clears the ContextMenu area by calling jQuery's .html('')
     * This is called automatically by the associated Stage's onTearDown() method
     */
    this.tearDown = function() {
        $(selector).html('');
    }
}



/**
 * @class APP.Poller
 * @constructor
 * This class handles periodic function calls via window.setInterval
 */
APP.Poller = function() {
    this.intervalId;
    this.frequency;
    this.poll = function() {};
}

/**
 * @for APP.Poller
 * @method startPolling
 */
APP.Poller.prototype.startPolling = function() {
    if(this.frequency) {
        this.intervalId = window.setInterval(this.poll, this.frequency);
    }
}

/**
 * @for APP.Poller
 * @method stopPolling
 */
APP.Poller.prototype.stopPolling = function() {
    window.clearInterval(this.intervalId);
}

/**
 * @for APP.Poller
 * @method setPoll
 * @param {int} frequency Frequency to call the function
 * @param {Function} func Function to execute repeatedly when startPolling() is called
 */
APP.Poller.prototype.setPoll = function(frequency, func) {
    this.frequency = frequency;
    this.poll = func;
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
 * NOTE: setOnShow(), setOnHide(), setTearDown(), onShow(), onHide(), and tearDown() have hardcoded default behavior
 */
APP.Stage = function(menuId, buttonId, buttonText, stageId) {
    var __menuId = menuId,
        __buttonId = buttonId,
        __buttonText = buttonText,
        __stageId = stageId,
        __contextMenu = new APP.ContextMenu(),
        __poller = new APP.Poller(),
        __colorClass;
    
    if(this.menuId === null) {
        __colorClass = $('#' + __buttonId).attr('data-color-class');
    } else {
        __colorClass = $('#' + __menuId).attr('data-color-class');
    }
    
    this.data = {};
    this.menuId = __menuId;
    this.buttonId = __buttonId;
    this.buttonText = __buttonText;
    this.stageId = __stageId;
    this.contextMenu = __contextMenu;
    this.poller = __poller;
    this.colorClass = __colorClass;
    
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
     * This function is executed when the stage is shown
     * Set this via setOnShow()
     * onShow() and onHide() are called by APP.MenuManager automatically when buttons are clicked on
     * NOTE: This method has default behavior. (calls construct())
     */
    this.onShow = function() {
        this.construct();
    };
    
    /**
     * @for APP.Stage
     * @method onHide
     * This function is executed when the stage is hidden.
     * Set this via setOnHide()
     * onShow() and onHide() are called by APP.MenuManager automatically when buttons are clicked on
     * NOTE: This method has default behavior (calls tearDown())
     */
    this.onHide = function() {
        this.tearDown();
    };
    
    /**
     * @for APP.Stage
     * @method construct
     * This function should specify the behavior for constructing the UI within the stage area.
     * This function calls the construct() method of this stage's ContextMenu every time it is run.
     * It should only need to construct the DOM structure for update() to run on. It should call update()
     *   to update what the UI with the latest data if it needs to do so. You could call tearDown() at the
     *   beginning to make sure the stage has been cleared for construction.
     * Set this via setConstruct()
     */
    this.construct = function() {
        self.contextMenu.construct();
    };
    
    /**
     * @for APP.Stage
     * @method tearDown
     * This function should specify the behavior for deconstructing the UI within the stage area.
     * This should be the opposite of what construct() does
     * Set this via setTeardown()
     * NOTE: This method has default behavior (see source for details)
     */
    this.tearDown = function() {
        this.getContext().html('');     // clear stage area
        this.data = {};                 // clear data
        this.contextMenu.tearDown();    // clear context menu
        this.poller.stopPolling();      // stop any polling
    };
    
    /**
     * @for APP.Stage
     * @method update
     * This function should specify the behavior for updating an existing UI within the stage area, without
     * having to repeatedly construct() and tearDown()
     * Set this via setUpdate()
     */
    this.update = function() {};
    
    /**
     * @for APP.Stage
     * @method updateError
     * This function should specify the behavior of the UI if the update AJAX request fails
     * Set this via setUpdateError()
     */
    this.updateError = function() {};
};

/**
 * @for APP.Stage
 * @method getContext
 * Gets the content area of the stage
 */
APP.Stage.prototype.getContext = function() {
    return $('#' + this.stageId + ' > .' + APP.DOM_HOOK.STAGE_CONTENT);
};

/**
 * @for APP.Stage
 * @method setOnShow
 * @param {Function} func Function to be passed in
 * Give function to run when onShow() is called
 * This function will execute after any hardcoded behavior in onShow()
 * Default behavior: construct()
 */
APP.Stage.prototype.setOnShow = function(func) {
    var self = this;
    this.onShow = function() {
        console.log(self.stageId + ' onShow() called');
        // console.trace(this);
        self.construct(); // default behavior
        func();
    }
};

/**
 * @for APP.Stage
 * @method setOnHide
 * @param {Function} func Function to be passed in
 * Give function to execute when onHide() is called
 * This function will execute after any hardcoded behavior in onHide()
 * Default behavior: tearDown()
 */
APP.Stage.prototype.setOnHide = function(func) {
    var self = this;
    this.onHide = function() {
        console.log(self.stageId + ' onHide() called');
        // console.trace(this);
        self.tearDown(); // default behavior
        func();
    }
};

/**
 * @for APP.Stage
 * @method setConstruct
 * @param {Function} func Function to be passed in
 * Give function to execute when construct() is called.
 * This function will execute after any hardcoded behavior in construct()
 * Default behavior: contextMenu.construct() after func()
 */
APP.Stage.prototype.setConstruct = function(func) {
    var self = this;
    this.construct = function() {
        console.log(self.stageId + ' construct() called');
        // console.trace(this);
        func();
        self.contextMenu.construct();
    }
};

/**
 * @for APP.Stage
 * @method setTearDown
 * @param {Function} func Function to be passed in
 * Give function to execute when tearDown() is called. 
 * tearDown() should be the behavior to clear the stage area of contents
 * Default behavior: getcontext().html(''); contextMenu.tearDown(); poller.stopPolling();
 */
APP.Stage.prototype.setTearDown = function(func) {
    var self = this;
    this.tearDown = function() {
        console.log(self.stageId + ' tearDown() called');
        // console.trace(this);
        self.getContext().html('');
        self.contextMenu.tearDown();
        self.poller.stopPolling();
        func();
    }
};

/**
 * @for APP.Stage
 * @method setUpdate
 * @param {Function} func Function to be passed in
 * Give function to execute when update() is called.
 * update() should be the function that's repeatedly called to update the UI constructed by construct()
 * Default behavior: none
 */
APP.Stage.prototype.setUpdate = function(func) {
    var self = this;
    this.update = function() {
        console.log(self.stageId + ' update() called');
        // console.trace(this);
        func();
    }
};

/**
 * @for APP.Stage
 * @method setUpdate
 * @param {Function} func Function to be passed in
 * Give function to execute when updateError() is called.
 * updateError() should be the function that's called if the updating AJAX request fails
 * Default behavior: none
 */
APP.Stage.prototype.setUpdateError = function(func) {
    var self = this;
    this.updateError = function() {
        console.log(self.stageId + ' updateError() called');
        // console.trace(this);
        func();
    }
}

/**
 * @for APP.Stage
 * @method setUpdate
 * @param {Function} func Function to be passed in
 * Give function to construct the Stage's ContextMenu
 * The given function is called automatically when the Stage's construct() function is called
 */
APP.Stage.prototype.setMenuConstruct = function(func) {
    this.contextMenu.setConstruct(func);
}

/**
 * @for APP.Stage
 * @method setPollFunction
 * @param {int} frequency Frequency to execute the given function, in milliseconds
 * @param {Function} func Function to execute repeatedly
 */
APP.Stage.prototype.setPollFunction = function(frequency, func) {
    this.poller.setPoll(frequency, func);
}



/**
 * @class APP.ItemTypeDisplay
 * @constructor
 * @param {Stage} stage Stage object hosting this ItemTypeDisplay
 * @param {Object} roomData Object with room data specified according to API
 * This class handles the controlling of all items contained within one room
 */
APP.ItemTypeDisplay = function(stage, itemType, room) {
    this.stage = stage;
    this.itemType = itemType;
    this.room = room;
};

/**
 * @for APP.ItemTypeDisplay
 * @method construct
 * Constructs the representation of this object on the stage
 */
APP.ItemTypeDisplay.prototype.construct = function() {
    var self = this;

    function constructItemPanels(items) {
        
        var itemPanel,
            infoBar,
            attachmentsSelf,
            itemPanels = [];
        
        for(var i = 0; i < items.length; i++) {
            if(items[i][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] === self.itemType) {
                itemPanel = $('<div></div>').attr({
                    class: 'entity-display ' + APP.DOM_HOOK.ENTITY.ITEM,
                    'data-id': items[i][APP.API.STATE.ROOM.ITEM.ID], // currently used
                    'data-ip': items[i][APP.API.STATE.ROOM.ITEM.IP],
                    'data-name': items[i][APP.API.STATE.ROOM.ITEM.NAME],
                    'data-brand': items[i][APP.API.STATE.ROOM.ITEM.BRAND],
                    'data-itemtype': items[i][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] // currently used
                });
                
                itemPanel.click(function() {
                    if(items[0].state !== undefined) { // if state information has been retrieved
                        var itemId = $(this).attr('data-id'),
                            itemType = $(this).attr('data-itemtype'),
                            states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES];
                            
                        $(this).addClass(APP.DOM_HOOK.UPDATING);
                        function getNextState(itemId) {
                            for(var j = 0; j < self.room.items.length; j++) {
                                if(self.room.items[j][APP.API.STATE.ROOM.ITEM.ID] === parseInt(itemId)) {
                                    for(var k = 0; k < states.length; k++) {
                                        if(self.room.items[j][APP.API.STATE.STATE] === states[k][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID]) {
                                            return APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES][(k + 1) % states.length][APP.API.VERSION.SUPPORTED_TYPE.STATE.METHOD];
                                        }
                                    }
                                }
                            }
                        }
                        
                        APP.ajax_put_rooms_roomId_items_itemId_cmd(
                            self.stage.data.roomId,
                            itemId,
                            getNextState(itemId),
                            function() {
                                self.update();
                            }
                        )
                    }
                });
                
                infoBar = $('<div></div>').addClass('info-bar');
                infoBar.append($('<h1>' + items[i][APP.API.STATE.ROOM.ITEM.NAME] + '</h1>').addClass('entity-name'));
                infoBar.append($('<span>' + items[i][APP.API.STATE.ROOM.ITEM.IP] + '</span>').addClass('entity-ip'));
                itemPanel.append(infoBar);
                
                attachmentsSelf = $('<div></div>').addClass('attachments self');
                attachmentsSelf.append($('<div><img src="../static/img/ajax-loader.gif"></img></div>').addClass('status'));
                itemPanel.append(attachmentsSelf);
                
                itemPanels.push(itemPanel);
            }
        }
        return itemPanels;
    }
    
    var itemTypePanel,
        infoBar,
        itemPanels,
        displayedName;
    
    itemPanels = constructItemPanels(this.room.items);
    itemTypePanel = $('<div></div>').attr({
        class: 'entity-display ' + APP.DOM_HOOK.ENTITY.ITEM_TYPE,
        'data-name': this.itemType
    });
    
    infoBar = $('<div></div>').addClass('info-bar');
    displayedName = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemType][APP.API.VERSION.SUPPORTED_TYPE.NAME];
    if(displayedName === undefined) {
        displayedName === this.itemType;
    }
    infoBar.append($('<h1>' + displayedName + '</h1>').addClass('entity-name'));
    itemTypePanel.append(infoBar);
    
    for(var j = 0; j < itemPanels.length; j++) {
        itemTypePanel.append(itemPanels[j]);
    }
    
    this.stage.getContext().append(itemTypePanel);
            
};

/**
 * @for APP.ItemTypeDisplay
 * @method update
 * Updates the representation of this object on the stage
 */
APP.ItemTypeDisplay.prototype.update = function(room) {
    var roomId = this.room[APP.API.STATE.ROOM.ID],
        stateList = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES],
        itemPanel,
        statePanel;
    
    for (var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
        if(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ID] === this.room[APP.API.STATE.ROOM.ID]) {
            this.room = APP.data.houseStructure[APP.API.STATE.ROOMS][i];
        }
    }
    
    // for every item of type
    for(var i = 0; i < this.room.items.length; i++) {
        if(this.room.items[i][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] === this.itemType) {
            // update UI
            for(var k = 0; k < stateList.length; k++) {
                if(stateList[k][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID] === this.room.items[i].state) {
                    itemPanel = $('.entity-display.item[data-id = ' + this.room.items[i][APP.API.STATE.ROOM.ITEM.ID] + ']');
                    statePanel = $('.entity-display.item[data-id = ' + this.room.items[i][APP.API.STATE.ROOM.ITEM.ID] + '] .status');
                    itemPanel.removeClass(APP.DOM_HOOK.CONNECTION_ERROR + ' ' + APP.DOM_HOOK.UPDATING + ' ' + APP.DOM_HOOK.UPDATING);
                    statePanel.html(stateList[k][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME]);
                    break;
                }
            }
        }
    }
};

/**
 * @for APP.ItemTypeDisplay
 * @method updateError
 * Updates the representation to show that an error has occured in fetching the latest state data
 */
APP.ItemTypeDisplay.prototype.updateError = function() {
    var roomId = this.room[APP.API.STATE.ROOM.ID],
        stateList = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES],
        itemPanel,
        statePanel;
    
    for(var i = 0; i < this.room.items.length; i++) {
        if(this.room.items[i][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] === this.itemType) {
            if(APP.data.houseStructure) { // if client has old state data
                for(var k = 0; k < stateList.length; k++) {
                    if(stateList[k][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID] === this.room.items[i].state) {
                        itemPanel = $('.entity-display.item[data-id = ' + this.room.items[i][APP.API.STATE.ROOM.ITEM.ID] + ']');
                        statePanel = $('.entity-display.item[data-id = ' + this.room.items[i][APP.API.STATE.ROOM.ITEM.ID] + '] .status');
                        itemPanel.addClass(APP.DOM_HOOK.CONNECTION_ERROR);
                        statePanel.html(stateList[k][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME]);
                        break;
                    }
                }
            }
        }
    }
};



/**
 *
 */
APP.ECARuleManager = function(stage) {
    this.stage = stage;
    this.ruleDisplays = [];
    
    for(var i = 0; i < APP.data.events.length; i++) {
        this.ruleDisplays.push(new APP.ECARuleDisplay(APP.data.events[i]));
    }
};

/**
 *
 */
APP.ECARuleManager.prototype.construct = function() {
    for(var i = 0; i < this.ruleDisplays.length; i++) {
        this.stage.getContext().append(this.ruleDisplays[i].construct());
    }
    this.stage.getContext().append((new APP.ECANewRuleDisplay()).construct());
};

/**
 *
 */
APP.ECARuleManager.prototype.update = function() {

};

/**
 *
 */
APP.ECARuleDisplay = function(ruleObj) {
    this.ruleObj = ruleObj;
    this.eventDisplay = new APP.ECAEventDisplay(this.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT]);
    this.conditionManager = new APP.ECAConditionManager(this.ruleObj[APP.API.EVENTS.RULE.CONDITIONS]);
    this.actionManager = new APP.ECAActionManager(this.ruleObj[APP.API.EVENTS.RULE.ACTIONS]);
};

/**
 *
 */
APP.ECARuleDisplay.prototype.construct = function() {
    var self = this,
        boundingBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE),
        titleBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE_TITLE),
        contentBox = $('<div></div>'),
        eventFieldset = $('<fieldset></fieldset>').addClass(APP.DOM_HOOK.ECA.EVENT_FIELDSET),
        eventBox = $('<div></div>'),
        conditionsFieldset = $('<fieldset></fieldset>'),
        conditionsBox= $('<div></div>'),
        actionsFieldset = $('<fieldset></fieldset>'),
        actionsBox = $('<div></div>'),
        showHide = $('<button></button>').addClass(APP.DOM_HOOK.ECA.SHOW_HIDE + ' ' + APP.DOM_HOOK.COLLAPSED),
        ruleName = $('<div>' + this.ruleObj[APP.API.EVENTS.RULE.RULE_NAME] + '</div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        enableDisable = $('<button></button>').addClass(APP.DOM_HOOK.ECA.ENABLE_DISABLE),
        editName = $('<button>Edit</button>'),
        deleteEventInput = $('<input></input>').attr({class: APP.DOM_HOOK.ECA.DELETE, placeholder: 'Confirm event name'}),
        deleteEventButton = $('<button>Delete</button>').addClass(APP.DOM_HOOK.ECA.DELETE);
    
    showHide.click(function() {
        $(this).toggleClass(APP.DOM_HOOK.COLLAPSED);
        contentBox.toggle(100);
    });
    
    enableDisable.click(function() {
        // ajax call
            $(this).toggleClass(APP.DOM_HOOK.ENABLED);
    });
    
    ruleName.click(function() {
        // TODO
    });
    
    deleteEventButton.click(function() {
        // TODO
    });
    
    // title box
    if(self.ruleObj[APP.API.EVENTS.RULE.ENABLED] === true) {
        enableDisable.addClass(APP.DOM_HOOK.ENABLED);
    }
    titleBox.append(showHide);
    titleBox.append(ruleName);
    titleBox.append(editName);
    titleBox.append(enableDisable);
    titleBox.append(deleteEventButton);
    titleBox.append(deleteEventInput);
    boundingBox.append(titleBox);
    
    // event box
    eventFieldset.append($('<legend></legend>').html('Event'));
    eventFieldset.append(eventBox);
    eventBox.append(this.eventDisplay.construct());
    contentBox.append(eventFieldset);
    
    // conditions box
    conditionsFieldset.append($('<legend></legend>').html('Conditions'));
    conditionsFieldset.append(conditionsBox);
    conditionsBox.append(this.conditionManager.construct());
    contentBox.append(conditionsFieldset);
    
    // actions box
    actionsFieldset.append($('<legend></legend>').html('Actions'));
    actionsFieldset.append(actionsBox);
    actionsBox.append(this.actionManager.construct());
    contentBox.append(actionsFieldset);
    
    contentBox.hide();
    boundingBox.append(contentBox);
    return boundingBox;
};

/**
 *
 */
APP.ECARuleDisplay.prototype.update = function() {

};

/**
 *
 */
APP.ECANewRuleDisplay = function() {
    
};

/**
 *
 */
APP.ECANewRuleDisplay.prototype.construct = function() {
    var self = this,
        boundingBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE + ' ' + APP.DOM_HOOK.ECA.NEW_RULE),
        titleBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE_TITLE),
        input = $('<input></input>').attr({type: 'text', placeholder: 'New event name', id: 'eca-add-new-rule-input'}),
        button = $('<button></button>').html('Add');
    
    button.click(function() {
        // TODO
    });
    
    titleBox.append(input);
    titleBox.append(button);
    boundingBox.append(titleBox);
    return boundingBox
};

/**
 * @class APP.ECAEventDisplay
 * @constructor
 */
APP.ECAEventDisplay = function(eventObj) {
    this.eventObj = eventObj;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.EVENT);
};

/**
 *
 */
APP.ECAEventDisplay.prototype.construct = function() {
    var self = this,
        bridge1 = $('<div>When</div>'),
        bridge2 = $('<div></div>'),
        itemType = this.eventObj[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE],
        itemTypeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        bridge3 = $('<div></div>'),
        scope,
        scopeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        bridge4 = $('<div>is</div>'),
        itemState = this.eventObj[APP.API.EVENTS.RULE.EVENT.ITEM_STATE],
        itemStateField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        editButton = $('<button>Edit</button>');
    
    function setElements() {
        switch (self.eventObj[APP.API.EVENTS.RULE.ACTION.SCOPE]) {
        case 'item':
            bridge2.html('');
            bridge3.html('');
            for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS].length; j++) {
                    if(self.eventObj[APP.API.EVENTS.RULE.EVENT.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.ID]) {
                        scopeField.html(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.NAME]);
                        break;
                    }
                }
            }
            break;
        case 'room':
            bridge2.html('any');
            bridge3.html('in');
            for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                if(self.eventObj[APP.API.EVENTS.RULE.EVENT.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ID]) {
                    scope = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.NAME];
                    break;
                }
            }
            break;
        case 'house':
            bridge2.html('any');
            bridge3.html('in');
            scopeField = 'the house';
            break;
        }
        itemTypeField.html(itemType);
        scopeField.html(scope);
        itemStateField.html(itemState);
        
    }
    
    setElements();
    this.context.append(bridge1);
    this.context.append(bridge2);
    this.context.append(itemTypeField);
    this.context.append(bridge3);
    this.context.append(scopeField);
    this.context.append(bridge4);
    this.context.append(itemStateField);
    this.context.append(editButton);
    return this.context;
};

/**
 *
 */
APP.ECAEventDisplay.prototype.update = function() {

};



/**
 *
 */
APP.ECAConditionManager = function(conditionArray) {
    this.conditionArray = conditionArray;
    this.conditionDisplays = [];
    for(var i = 0; i < this.conditionArray.length; i++) {
        this.conditionDisplays.push(new APP.ECAConditionDisplay(conditionArray[i]));
    }
    this.newConditionDisplay = new APP.ECANewConditionDisplay();
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.CONDITION);
};

/**
 *
 */
APP.ECAConditionManager.prototype.construct = function() {
    for(var i = 0; i < this.conditionArray.length; i++) {
        this.conditionDisplays.push(new APP.ECAConditionDisplay(this.conditionArray[i]));
        this.context.append(this.conditionDisplays[i].construct());
    }
    this.context.append(this.newConditionDisplay.construct());
    return this.context;
};

/**
 *
 */
APP.ECAConditionManager.prototype.update = function() {

};

/**
 * @class APP.ECAConditionNode
 * @constructor
 */
APP.ECAConditionDisplay = function(conditionObj) {

    var self = this;
    
    this.conditionObj = conditionObj;
    this.bridge1;
    this.itemFieldset;
    this.itemWrapper;
    this.itemField;
    this.equivalenceFieldset;
    this.equivalenceWrapper;
    this.equivalenceField;
    this.stateFieldset;
    this.stateWrapper;
    this.statefield;
    this.editButton;
    this.deleteButton;
    this.saveButton;
    this.cancelButton;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.CONDITION_DISPLAY);
    
    this.construct = function() {
        var itemName,
            equivalence,
            state;
        
        equivalence = 'is', // change when we implement equivalences
        this.bridge1 = $('<div>If</div>'),
        this.itemNameField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        this.equivalenceField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        this.stateField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        this.editButton = $('<button>Edit</button>'),
        this.deleteButton = $('<button>Delete</button>').addClass(APP.DOM_HOOK.ECA.DELETE);
            
        // state display
        for(var i = 0; i < APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE]][APP.API.VERSION.SUPPORTED_TYPE.STATES].length; i++) {
            if(this.conditionObj[APP.API.EVENTS.RULE.CONDITION.VALUE] === APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE]][APP.API.VERSION.SUPPORTED_TYPE.STATES][i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID]) {
                state = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE]][APP.API.VERSION.SUPPORTED_TYPE.STATES][i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME];
                break;
            }
        }
        
        // itemName display
        for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
            for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS].length; j++) {
                if(this.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.ID]) {
                    itemName = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.NAME];
                    break;
                }
            }
        }
        
        this.editButton.click(function() {
            // TODO
        });
        
        this.deleteButton.click(function() {
            // TODO
        });
        
        this.context.append(this.bridge1);
        this.context.append(this.itemNameField.append(itemName));
        this.context.append(this.equivalenceField.append(equivalence));
        this.context.append(this.stateField.append(state));
        this.context.append(this.editButton);
        this.context.append(this.deleteButton);
        
        return this.context;
    };
    
    this.update = function() {
    
    };
    
    this.delete = function() {
    
    };
    
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.getAllItems = function() {
    var itemList = [],
        itemId,
        itemIP,
        itemName,
        itemType;
    
    itemList.push($('<option>(Not set)</option>').attr({value: 'undefined', 'data-itemType': 'undefined'}));
    for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
        for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS].length; j++) {
            itemId = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.ID];
            itemIP = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.IP];
            itemName = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.NAME];
            itemType = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.ITEM_TYPE]
            itemList.push($('<option>' + itemName + ' (' + itemIP + ')' + '</option>').attr({value: itemId, 'data-itemtype': itemType}));
        }
    }
    return itemList;
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.getItemEquiv = function() {
    var itemId = this.itemField.children('option:selected').val(),
        equivList = [],
        equiv;
    
    equivList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
    if(itemId !== 'undefined') {
        equiv = 'is';
        // redo when we implement equivalences
        equivList.push($('<option>' + equiv + '</option>').attr({value: equiv}));
    }
    return equivList;
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.getItemState = function() {
    var itemId = this.itemField.children('option:selected').val(),
        itemType = this.itemField.find('option[value=' + itemId + ']').attr('data-itemtype'),
        stateName,
        stateId,
        stateList = [];
    
    stateList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
    if(itemType !== 'undefined') {
        for(var i = 0; i < APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES].length; i++) {
            stateName = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES][i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME];
            stateId = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES][i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID];
            stateList.push($('<option>' + stateName + '</option>').attr({value: stateId}));
        }
    }
    return stateList;
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.populateItemField = function() {
    var options = this.getAllItems();
    this.itemField.html('');
    for(var i = 0; i < options.length; i++) {
        this.itemField.append(options[i]);
    }
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.populateEquivalenceField = function() {
    var options = this.getItemEquiv();
    this.equivalenceField.html('');
    for(var i= 0; i < options.length; i++) {
        this.equivalenceField.append(options[i]);
    }
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.populateStateField = function() {
    var options = this.getItemState();
    this.stateField.html('');
    for(var i = 0; i < options.length; i++) {
        this.stateField.append(options[i]);
    }
};

/**
 *
 */
APP.ECANewConditionDisplay = function() {

    var self = this;
    
    this.bridge1;
    this.itemFieldset;
    this.itemWrapper;
    this.itemField;
    this.equivalenceFieldset;
    this.equivalenceWrapper;
    this.equivalenceField;
    this.stateFieldset;
    this.stateWrapper;
    this.statefield;
    this.editButton;
    this.deleteButton;
    this.saveButton;
    this.cancelButton;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.CONDITION_DISPLAY);
    
    this.construct = function() {
        function setElements() {
            self.bridge1 = $('<div>If</div>'),
            self.itemFieldset = $('<fieldset><legend>Step 1 - Set item</legend></fieldset>'),
            self.itemWrapper = $('<div></div>').addClass('select-wrapper'),
            self.itemField = $('<select></select>'),
            self.equivalenceFieldset = $('<fieldset><legend>Step 2 - Set equiv</legend></fieldset>'),
            self.equivalenceWrapper = $('<div></div>').addClass('select-wrapper'),
            self.equivalenceField = $('<select></select>'),
            self.stateFieldset = $('<fieldset><legend>Step 3 - Set state</legend></fieldset>'),
            self.stateWrapper = $('<div></div>').addClass('select-wrapper')
            self.stateField = $('<select></select>'),
            self.addButton = $('<button>Add new condition</button>'),
            self.cancelButton = $('<button>Cancel</button>'),
            self.saveButton = $('<button>Save</button>');
            
            self.itemField.click(function() {
                self.populateEquivalenceField();
                self.populateStateField();
            });
            
            self.addButton.click(function() {
                setElements();
                self.context.html('');
                self.context.append(self.bridge1);
                self.populateItemField();
                self.context.append(self.itemFieldset.append(self.itemWrapper.append(self.itemField)));
                self.context.append(self.equivalenceFieldset.append(self.equivalenceWrapper.append(self.equivalenceField)));
                self.context.append(self.stateFieldset.append(self.stateWrapper.append(self.stateField)));
                self.context.append(self.cancelButton);
                self.context.append(self.saveButton);
            });
            
            self.cancelButton.click(function() {
                setElements();
                self.context.html('');
                self.context.append(self.addButton);
            });
            
            self.saveButton.click(function() {
                // TODO
            });
            
        }
        
        setElements();
        this.context.append(this.addButton);
        return this.context;
    };
        
    this.delete = function() {
    
    };
    
};
APP.inherit(APP.ECANewConditionDisplay, APP.ECAConditionDisplay);


/**
 *
 */
APP.ECAActionManager = function(actionArray) {
    this.actionArray = actionArray;
    this.actionDisplays = [];
    this.newActionDisplay = new APP.ECANewActionDisplay();
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.ACTION);
};

/**
 *
 */
APP.ECAActionManager.prototype.construct = function() {
    for(var i = 0; i < this.actionArray.length; i++) {
        this.actionDisplays.push(new APP.ECAActionDisplay(this.actionArray[i]));
        this.context.append(this.actionDisplays[i].construct());
    }
    this.context.append(this.newActionDisplay.construct());
    return this.context;
};

/**
 *
 */
APP.ECAActionManager.prototype.update = function() {
    
};

/**
 * @class APP.ECAActionNode
 * @constructor
 */
APP.ECAActionDisplay = function(actionObj) {
    
    var self = this;
    
    this.actionObj = actionObj;
    this.methodFieldset;
    this.methodWrapper;
    this.methodField;
    this.bridge1;
    this.itemTypeFieldset;
    this.itemTypeWrapper;
    this.itemTypeField;
    this.bridge2;
    this.scopeFieldset;
    this.scopeWrapper;
    this.scopeField;
    this.editButton;
    this.deleteButton;
    this.addButton;
    this.cancelButton;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.ACTION_DISPLAY);
    
    this.construct = function() {
        var self = this,
            methodName,
            itemType,
            scopeName;
        
        this.methodField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        this.bridge1 = $('<div>all</div>');
        this.itemTypeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        this.bridge2 = $('<div>s&nbsp;&nbsp;in</div>');
        this.scopeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        this.deleteButton = $('<button>Delete</button>').addClass(APP.DOM_HOOK.ECA.DELETE);
        
        // methodField
        this.methodField.html(this.actionObj[APP.API.EVENTS.RULE.ACTION.METHOD]);
        
        // itemTypeField
        itemType = this.actionObj[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE];
        this.itemTypeField.html(itemType);
        
        // scopeField, bridges
        switch (this.actionObj[APP.API.EVENTS.RULE.ACTION.SCOPE]) {
        case 'item':
            for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS].length; j++) {
                    if(this.actionObj[APP.API.EVENTS.RULE.ACTION.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.ID]) {
                        this.scopeField.html(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.NAME]);
                        break;
                    }
                }
            }
            this.bridge1.html('the');
            this.bridge2.html('');
            break;
        case 'room':
            for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                if(this.actionObj[APP.API.EVENTS.RULE.ACTION.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ID]) {
                    this.scopeField.html(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.NAME]);
                    break;
                }
            }
            break;
        case 'house':
            this.scopeField.html('the house');
            break;
        }
        
        this.context.append(this.methodField);
        this.context.append(this.bridge1);
        this.context.append(this.itemTypeField);
        this.context.append(this.bridge2);
        this.context.append(this.scopeField);
        this.context.append(this.editButton);
        this.context.append(this.deleteButton);
        
        return this.context;
    };
    
    this.update = function() {
    
    };
    
    this.delete = function() {
    
    };
    
};

/**
 *
 */
APP.ECAActionDisplay.prototype.getAllTypes = function() {
    var itemTypeList = [],
        itemType,
        itemTypeName;
        
    itemTypeList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
    for(var type in APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES]) {
        if(APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES].hasOwnProperty(type)) {
            itemType = type;
            itemTypeName = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][type][APP.API.VERSION.SUPPORTED_TYPE.NAME];
            itemTypeList.push($('<option>' + itemTypeName + '</option>').attr({value: itemType}));
        }
    }
    return itemTypeList;
};

/**
 *
 */
APP.ECAActionDisplay.prototype.getScopes = function(itemType) {
    var itemType = this.itemTypeField.children('option:selected').val(),
        scopeList = [],
        roomList = [],
        itemList = [],
        isInRoom = false,
        item,
        itemName,
        itemId,
        room;
    
    scopeList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
    if(itemType !== 'undefined') {
        for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
            room = APP.data.houseStructure[APP.API.STATE.ROOMS][i];
            for(var j = 0; j < room[APP.API.STATE.ROOM.ITEMS].length; j++) {
                item = room[APP.API.STATE.ROOM.ITEMS][j];
                if(itemType === item[APP.API.STATE.ROOM.ITEM.ITEM_TYPE]) {
                    isInRoom = true;
                    itemId = item[APP.API.STATE.ROOM.ITEM.ID];
                    itemName = item[APP.API.STATE.ROOM.ITEM.NAME];
                    itemIP = item[APP.API.STATE.ROOM.ITEM.IP];
                    itemList.push($('<option>' + itemName + ' (' + itemIP + ')' + '</option>').attr({value: 'item', 'data-id': itemId}));
                }
            }
            if(isInRoom === true) {
                roomName = room[APP.API.STATE.ROOM.NAME];
                roomId = room[APP.API.STATE.ROOM.ID];
                roomList.push($('<option>' + roomName + '</option>').attr({value: 'room', 'data-id': roomId})); 
            }
            isInRoom = false;
        }
        
        if(itemList.length !== 0) {
            var items = $('<optgroup></optgroup>').attr({label: 'Items'});
            console.log(itemList);
            for(var i = 0; i < itemList.length; i++) {
                items.append(itemList[i]);
            }
            scopeList.push(items);
        }
        console.log(scopeList);
        
        if(roomList.length !== 0) {
            var rooms = $('<optgroup></optgroup>').attr({label: 'Rooms'});
            for(var i = 0; i < roomList.length; i++) {
                rooms.append(roomList[i]);
            }
            scopeList.push(rooms);
        }
        
        (function() {
            var house = $('<optgroup></optgroup>').attr({label: 'House'});
            house.append($('<option>the house</option>').attr({value: 'house', 'data-id': 'undefined'}));
            scopeList.push(house);
        })();
        
    }
    console.log(scopeList);
    return scopeList;
};

/**
 *
 */
APP.ECAActionDisplay.prototype.getMethods = function(itemType) {
    var itemType = this.itemTypeField.children('option:selected').val(),
        methodList = [],
        method;
    this.methodField.html('');
    methodList.push($('<option>(Not set)</option>').attr({val: 'undefined'}));
    if(itemType !== 'undefined') {
        for(var type in APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES]) {
            if(APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES].hasOwnProperty(type) && type === itemType) {
                for(var i = 0; i < APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][type][APP.API.VERSION.SUPPORTED_TYPE.METHODS].length; i++) {
                    method = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][type][APP.API.VERSION.SUPPORTED_TYPE.METHODS][i];
                    methodList.push($('<option>' + method + '</option>').attr({value: method}));
                }
                break;
            }
        }
    }
    return methodList;
};

/**
 *
 */
APP.ECAActionDisplay.prototype.populateItemTypeField = function() {
    var options = this.getAllTypes();
    this.itemTypeField.html('');
    for(var i = 0; i < options.length; i++) {
        this.itemTypeField.append(options[i]);
    }
};

/**
 *
 */
APP.ECAActionDisplay.prototype.populateScopeField = function() {
    var itemType = this.itemTypeField.children('option:selected').val(),
        options = this.getScopes(itemType);
    this.scopeField.html('');
    for(var i = 0; i < options.length; i++) {
        this.scopeField.append(options[i]);
    }
};

/**
 *
 */
APP.ECAActionDisplay.prototype.populateMethodField = function() {
    var itemType = this.itemTypeField.children('option:selected').val(),
        options = this.getMethods(itemType);
    this.methodField.html('');
    for(var i = 0; i < options.length; i++) {
        this.methodField.append(options[i]);
    }
};

/**
 *
 */
APP.ECANewActionDisplay = function() {
    
    var self = this;
    
    this.methodFieldset;
    this.methodWrapper;
    this.methodField;
    this.bridge1;
    this.itemTypeFieldset;
    this.itemTypeWrapper;
    this.itemTypeField;
    this.bridge2;
    this.scopeFieldset;
    this.scopeWrapper;
    this.scopeField;
    this.editButton;
    this.deleteButton;
    this.addButton;
    this.cancelButton;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.ACTION_DISPLAY);
    
    this.construct = function() {
        var self = this;
        function setElements() {
            self.methodFieldset = $('<fieldset><legend>Step 3 - Set method</legend></fieldset>'),
            self.methodWrapper = $('<div></div>').addClass('select-wrapper'),
            self.methodField = $('<select></select>'),
            self.bridge1 = $('<div></div>'),
            self.itemTypeFieldset = $('<fieldset><legend>Step 1 - Set type</legend></fieldset>'),
            self.itemTypeWrapper = $('<div></div>').addClass('select-wrapper'),
            self.itemTypeField = $('<select></select>'),
            self.bridge2 = $('<div></div>'),
            self.scopeFieldset = $('<fieldset><legend>Step 2 - Set scope</legend></fieldset>'),
            self.scopeWrapper = $('<div></div>').addClass('select-wrapper')
            self.scopeField = $('<select></select>'),
            self.addButton = $('<button>Add new action</button>'),
            self.cancelButton = $('<button>Cancel</button>'),
            self.saveButton = $('<button>Save</button>');
            
            self.populateItemTypeField();
            
            self.itemTypeField.click(function() {
                self.bridge1.html('');
                self.bridge2.html('');
                self.populateScopeField();
                self.populateMethodField();
            });
            
            self.scopeField.click(function() {
                var scope = $(this).find('option:selected').val();
                if(scope === 'room' || scope === 'house') {
                    self.bridge1.html('all');
                    self.bridge2.html('s&nbsp;&nbsp;in');
                } else if(scope === 'item') {
                    self.bridge1.html('the');
                    self.bridge2.html('');
                }
            });
            
            self.addButton.click(function() {
                setElements();
                self.context.html('');
                self.context.append(self.methodFieldset.append(self.methodWrapper.append(self.methodField)));
                self.context.append(self.bridge1);
                self.context.append(self.itemTypeFieldset.append(self.itemTypeWrapper.append(self.itemTypeField)));
                self.context.append(self.bridge2);
                self.context.append(self.scopeFieldset.append(self.scopeWrapper.append(self.scopeField)));
                self.context.append(self.cancelButton);
                self.context.append(self.saveButton);
            });
            
            self.cancelButton.click(function() {
                setElements();
                self.context.html('');
                self.context.append(self.addButton);
            });
            
            self.saveButton.click(function() {
                // TODO
            });
            
        }
        
        setElements();
        this.context.append(this.addButton);
        return this.context;
    };
    
    this.update = function() {
    
    };
    
    this.delete = function() {
    
    };
    
};
APP.inherit(APP.ECANewActionDisplay, APP.ECAActionDisplay);



/**
 *
 */
APP.MenuManager = function(stageManager) {
    var primaryButtonSelector = '#menu-prmary > li > a',
        secondaryButtonSelector = '#wrapper-secondary > ul > li > a';

    this.stageManager = stageManager;
    this.buttons = {};
    
    /**
     * Creates a button and binds it to a stage. Clicking on it shows/hides the stage, and other stages.
     */
    this.addButton = function(stage) {
        var button,
            buttonWrapper;
        if(document.getElementById(stage.buttonId) === null) {
            button = $('<a>' + stage.buttonText + '</a>').attr({id: stage.buttonId, href: '#'}),
            buttonWrapper = $('<li></li>').append(button);
            
            $('#' + stage.menuId).append(buttonWrapper);
            if(this.buttons[stage.menuId] === undefined) {
                this.buttons[stage.menuId] = [];
            }
            this.buttons[stage.menuId].push({buttonId: stage.buttonId, stageId: stage.stageId, data: stage.data});
        } else {
            console.warn('WARNING: ' + stage.buttonId + ' already exists! Button remapped.');
            // console.trace(this);
            button = $('#' + stage.buttonId);
            for(var prop in this.buttons) {
                if(this.buttons.hasOwnProperty(prop)) {
                    if(this.buttons[prop].buttonId = stage.buttonId) {
                        button.unbind('click');
                    }
                }
            }
        }
        button.click(function() {
            var primaryButtonSelector = '#menu-prmary > li > a',
                secondaryButtonSelector = '#wrapper-secondary > ul > li > a';
            
            // toggle clicked button
            $(this).toggleClass('selected');
            // toggle sibling buttons
            $(primaryButtonSelector).not($(this)).removeClass('selected');
            $(secondaryButtonSelector).not($(this)).removeClass('selected');
            // toggle stages
            stageManager.toggleStage(stage.stageId);
        });
    };
    
    /**
     * Removes the button with given Id. This does not remove the associated stage.
     */
    this.removeButton = function(stage) {
        if(document.getElementById(stage.buttonId) !== null) {
            for(var i = 0; i < this.buttons[stage.menuId].length; i++) {
                if(this.buttons[stage.menuId][i].buttonId === stage.buttonId) {
                    $('#' + stage.buttonId).remove();
                    this.buttons[stage.menuId].splice(i, 1);
                    break;
                }
            }
        }
    };
    
}

/**
 * @class APP.StageManager
 * @constructor
 * This class handles Stage objects
 */
APP.StageManager = function() {
    var self = this,
        primaryMenuId = 'menu-primary',
        secondaryMenuId = 'wrapper-secondary',
        stageSelector = '#stages > .stage',
        activeStageSelector = '#stages > .stage.active',
        stageContainerSelector = '#stages',
        
        activeStageId = null,
        stages = new APP.Map(),
        menuManager = new APP.MenuManager(this),
        primaryMenuMap = {
            'button-home': {
                menuId: null,
                buttonText: 'Home',
                class: 'blue',
                buttons: {}
            },
            'button-control': {
                menuId: 'menu-control',
                buttonText: 'Control',
                class: 'blue',
                buttons: {}
            },
            'button-rules': {
                menuId: 'menu-rules',
                buttonText: 'Rules',
                class: 'green',
                buttons: {}
            },
            'button-config': {
                menuId: 'menu-config',
                buttonText: 'Config',
                class: 'yellow',
                buttons: {}
            }
        };
        
    // private methods
     function setActiveStage(stageId) {
        activeStageId = stageId;
    };
    
    // menu manager
    this.menuManager = new APP.MenuManager(this);
    
    // public methods
    /**
     * @for APP.StageManager
     * @method addStage
     * @param {APP.Stage} stage Stage object to be managed by this manager
     * @return {String}         Input stage element id, for convenience
     * If the new stage shares an existing stageId, it will replace the old stage
     */
    this.addStage = function(stage) {
        if(document.getElementById(stage.stageId) === null) {
            var stageElement = $('<div></div>').attr({id: stage.stageId, class: 'stage'});
            stageElement.append($('<div></div>').addClass('stage-content ' + stage.colorClass));
            $(stageContainerSelector).append(stageElement);
        }
        
        this.menuManager.addButton(stage);
        stages.put(stage.stageId, stage);
        return stage.stageId;
    };
    
    /**
     *
     */
    this.removeStage = function(stage) {
        this.toggleStage(null);
        stages.remove(stage.stageId);
        $('#' + stage.stageId).remove();
        this.menuManager.removeButton(stage);
    };
    
    /**
     * @for APP.StageManager
     * @method toggleStage
     * @param {String | null} stageId Element id of stage to toggle on/off, or null to toggle off regardless of current active stage
     */
    this.toggleStage = function(stageId) {
        
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
        
    };
    
    /**
     *
     */
    this.setStage_Home = function() {
        var stageId = this.addStage(new APP.Stage(null, 'button-home', '', 'stage-home')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            // default
        });
        stage.setConstruct(function() {
            // default
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            // default
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(undefined, function() {
            
        });
    };
    
    /**
     *
     */
    this.setStage_NoRoom = function() {
        var stageId = this.addStage(new APP.Stage('menu-control', 'button-control-no-room', 'Add new room', 'stage-no-room')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            // default
        });
        stage.setConstruct(function() {
            var box = $('<div></div>').addClass(APP.DOM_HOOK.NO_ROOM),
                warning = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY),
                input = $('<input></input>').attr({type: 'text', id: 'no-room-input', placeholder: 'Room name'}),
                button = $('<button>Add</button>');
            button.click(function() {
                var dis = $(this),
                    roomName = input.val();
                if(roomName === '' || /\s+/.test(roomName) === true) {
                    warning.html('Name cannot be undefined or entirely whitespace.');
                } else {
                    dis.parent().addClass(APP.DOM_HOOK.UPDATING);
                    APP.ajax_post_rooms(roomName,
                        function(json) {
                            APP.ajax_get_state(
                                function() {
                                    var obj = APP.unpackToPayload(json),
                                        roomId = obj[APP.API.ROOMID.ID];
                                    dis.parent().removeClass(APP.DOM_HOOK.UPDATING);
                                    self.setStage_Room(roomId, roomName);
                                    self.removeStage(stage);
                                },
                                function() {
                                    // do nothing
                                }
                            );
                        },
                        function() {
                            // do nothing
                        }
                    );
                }
            });
            box.append(warning);
            box.append(input);
            box.append(button);
            stage.getContext().append(box);
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            // default
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(undefined, function() {
            
        });
    };
    
    /**
     *
     */
    this.setStage_Room = function(roomId, roomName) {
        var safeRoomName = roomName.replace(/\s/, '-'),
            stageObj = new APP.Stage('menu-control',
                'button-control-' + safeRoomName + '-id-' + roomId, roomName, 'stage-control-' + safeRoomName + '-id-' + roomId),
            stageId,
            stage;
        
        stageId = stageObj.stageId;
        stage = stageObj;
        stage.data.roomId = roomId;
        stage.data.roomName = roomName;
        this.addStage(stageObj);
        
        // this function fetches the latest data of the given room
        function getRoom(roomId) {
            for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS].length; j++) {
                if(APP.data.houseStructure[APP.API.STATE.ROOMS][j][[APP.API.STATE.ROOM.ID]] === roomId) {
                    return APP.data.houseStructure[APP.API.STATE.ROOMS][j];
                }
            }
        }
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            var wrapper = $('<div></div>').addClass('context-menu-inner-wrapper'),
                content = $('<div></div>').addClass('context-menu-content');
            
            function constructRoomsPanel() {
                var roomsPanel = $('<div></div>'),
                    addPanel,
                    addInputSelector = 'context-add-room-name-input',
                    addButton,
                    addWarning,
                    removePanel,
                    removeInputSelector = 'context-remove-room-name-input',
                    removeButtonElement,
                    removeWarning,
                    container;
                
                // add
                addPanel = $('<fieldset></fieldset');
                addPanel.append($('<legend></legend>').html('Add new room'));
                container = $('<div></div>');
                addWarning = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
                container.append(addWarning);
                container.append($('<input></input>').attr({
                    id: addInputSelector,
                    type: 'text',
                    placeholder: 'Room name'})
                );
                addButton = $('<a href="#">Add</a>').attr({id: 'context-add-room-button', class: 'button'});
                addButton.click(function() {
                    var dis = $(this),
                        addRoomName = $('#' + addInputSelector).val();
                    if(addRoomName === '' || /\s+/.test(addRoomName) === true) {
                        addWarning.html('Name cannot be undefined or entirely whitespace.');
                    } else {
                        $(this).parent().addClass(APP.DOM_HOOK.UPDATING);
                        APP.ajax_post_rooms(addRoomName,
                            function(json) {
                                APP.ajax_get_state(
                                    function() {
                                        var obj = APP.unpackToPayload(json),
                                            roomId = obj[APP.API.ROOMID.ID];
                                        dis.parent().removeClass(APP.DOM_HOOK.UPDATING);
                                        self.setStage_Room(roomId, addRoomName);
                                    },
                                    function() {
                                        // do nothing
                                    }
                                );
                            },
                            function() {
                                // do nothing
                            }
                        );
                    }
                });
                container.append(addButton);
                addPanel.append(container);
                roomsPanel.append(addPanel);
                
                // remove
                removePanel = $('<fieldset></fieldset>');
                removePanel.append($('<legend></legend>').html('Remove this room ('+ roomName + ')'));
                container = $('<div></div>');
                removeWarning = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
                container.append(removeWarning);
                container.append($('<input></input>').attr({
                    id: removeInputSelector,
                    type: 'text',
                    placeholder: 'Confirm this room\'s name'})
                );
                removeButtonElement = $('<a href="#">Remove</a>').attr({id: 'context-remove-room-button', class: 'button'});
                removeButtonElement.click(function() {
                    var dis = $(this),
                        removeRoomName = $('#' + removeInputSelector).val();
                    if(removeRoomName === stage.data.roomName) {
                        dis.parent().addClass(APP.DOM_HOOK.UPDATING);
                        APP.ajax_delete_rooms_roomId(
                            stage.data.roomId,
                            function(json) {
                                APP.ajax_get_state(
                                    function() {
                                        if(APP.data.houseStructure[APP.API.STATE.ROOMS].length === 0) {
                                            self.setStage_NoRoom();
                                        }
                                        dis.parent().removeClass(APP.DOM_HOOK.UPDATING);
                                        self.removeStage(stage);
                                    },
                                    function() {
                                        // do nothing
                                    }
                                );
                            },
                            function() {
                                // do nothing
                            }
                        );
                    } else {
                        removeWarning.html('Names do not match. Please reconfirm.');
                    }
                });
                container.append(removeButtonElement);
                removePanel.append(container);
                roomsPanel.append(removePanel);
                return roomsPanel;
            }
            
            function constructItemsPanel(roomItems) {
                var supportedTypes = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES],
                    supportedBrands,
                    itemsPanel = $('<div></div>'),
                    addPanel,
                    addInputNameSelector = 'context-add-item-name-input',
                    addInputIPSelector = 'context-add-item-ip-input',
                    addSelectSelector = 'context-add-item-select',
                    addSelect,
                    addButton,
                    addWarningName,
                    addWarningIP,
                    internalAddItemId, // value used to locate type + brand
                    removePanel,
                    removeSelectSelector = 'context-remove-item-select',
                    removeSelect,
                    removeInputSelector = 'context-remove-item-name-input',
                    removeButtonElement,
                    removeWarning,
                    itemTypes,
                    optgroup,
                    container;
                    
                itemsPanel.append($('<h2></h2>').html('Items'));
                
                // add
                addPanel = $('<fieldset></fieldset>');
                addPanel.append($('<legend></legend>').html('Add'));
                container = $('<div></div>');
                addWarningName = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
                container.append(addWarningName);
                addWarningIP = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
                container.append(addWarningIP);
                container.append($('<input></input>').attr({
                    id: addInputNameSelector,
                    type: 'text',
                    placeholder: 'Item\'s name'})
                );
                container.append($('<input></input>').attr({
                    id: addInputIPSelector,
                    type: 'text',
                    placeholder: 'Item\'s static IPv4 address'})
                );
                addSelect = $('<select></select>').attr({id: addSelectSelector});
                internalAddItemId = 0;
                for(var type in supportedTypes) {
                    if(supportedTypes.hasOwnProperty(type)) {
                        optgroup = $('<optgroup></optgroup>').attr({label: supportedTypes[type][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME]});
                        supportedBrands = supportedTypes[type][APP.API.VERSION.SUPPORTED_TYPE.SUPPORTED_BRANDS];
                        for(var i = 0; i < supportedBrands.length; i++) {
                            optgroup.append($('<option>' + supportedBrands[i] + '</option>').attr({
                                'data-type': type,
                                'data-brand': supportedBrands[i],
                                value: internalAddItemId})
                            );
                            internalAddItemId++;
                        }
                        addSelect.append(optgroup);
                    }
                }
                container.append($('<div class="select-wrapper"></div>').append(addSelect));
                addButton = $('<a href="#">Add</a>').attr({id: 'context-add-item-button', class: 'button'});
                addButton.click(function() {
                    var self = $(this),
                        roomIndex,
                        itemIndex,
                        targetBrand,
                        targetIP,
                        targetOption,
                        targetName,
                        targetType,
                        newItem = {},
                        validIP = true,
                        duplicateIP = false;
                    
                    targetName = $('#' + addInputNameSelector).val();
                    if(targetName === '' || /\s+/.test(addRoomName) === true) {
                        addWarningName.html('Name cannot be undefined or entirely whitespace.');
                    } else {
                        addWarningName.html('');
                    }
                    
                    // perform IP check
                    targetIP = $('#' + addInputIPSelector).val();
                    // regex from http://stackoverflow.com/questions/10006459/regular-expression-for-ip-address-validation
                    if(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/.test(targetIP) === true) {
                        for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS].length; j++) {
                            for(var k = 0; k < APP.data.houseStructure[APP.API.STATE.ROOMS][j][APP.API.STATE.ROOM.ITEMS].length; k++) {
                                if(targetIP === APP.data.houseStructure[APP.API.STATE.ROOMS][j][APP.API.STATE.ROOM.ITEMS][k][APP.API.STATE.ROOM.ITEM.IP]) {
                                    duplicateIP = true;
                                    roomIndex = j;
                                    itemIndex = k;
                                    break;
                                }
                            }
                        }
                        if(! duplicateIP) {
                            addWarningName.html('');
                            addWarningIP.html('');
                            targetItemId = $('#' + addSelectSelector).val();
                            targetOption = $('#' + addSelectSelector).find('option[value=' + targetItemId + ']');
                            targetBrand = targetOption.attr('data-brand');
                            targetType = targetOption.attr('data-type');
                            newItem[APP.API.ITEMS.BRAND] = targetBrand;
                            newItem[APP.API.ITEMS.IP] = targetIP;
                            newItem[APP.API.ITEMS.NAME] = targetName;
                            newItem[APP.API.ITEMS.ITEM_TYPE] = targetType;
                            
                            self.parent().addClass(APP.DOM_HOOK.UPDATING);
                            
                            // AJAX call
                            APP.ajax_post_rooms_roomId_items(roomId, targetBrand, targetIP, targetName, targetType,
                                function(json) {
                                    var obj = APP.unpackToPayload(json),
                                        newItemId = obj[APP.API.ITEMS.ITEM_ID],
                                        hasSameType = false;
                                    
                                    // AJAX call
                                    APP.ajax_get_state(
                                        function() {
                                            self.parent().removeClass(APP.DOM_HOOK.UPDATING);                                                        
                                            stage.tearDown();
                                            stage.construct();
                                        },
                                        function() {
                                            // do nothing
                                        }
                                    );
                                },
                                function() {
                                    // do nothing
                                }
                            );
                        } else {
                            console.log(rooms[roomIndex][APP.API.STATE.ROOM.ITEMS][itemIndex][APP.API.STATE.ROOM.ITEM.NAME]);
                            console.log(rooms[roomIndex][APP.API.STATE.ROOM.NAME]);
                            addWarningIP.html('IP specified is already in use by existing item (' + rooms[roomIndex][APP.API.STATE.ROOM.ITEMS][itemIndex][APP.API.STATE.ROOM.ITEM.NAME] + ') in the room ' + rooms[roomIndex][APP.API.STATE.ROOM.NAME] + '.');
                        }
                    } else {
                        addWarningIP.html('Invalid IPv4 address.');
                    }

                });
                container.append(addButton);
                addPanel.append(container);
                itemsPanel.append(addPanel);
                
                // remove
                removePanel = $('<fieldset></fieldset>');
                removePanel.append($('<legend></legend>').html('Remove'));
                container = $('<div></div>');
                removeWarning = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
                container.append(removeWarning);
                removeSelect = $('<select></select>').attr({id: removeSelectSelector});
                itemTypes = stage.data.itemTypes;
                for(var itemType in itemTypes) {
                    if(itemTypes.hasOwnProperty(itemType)) {
                        optgroup = $('<optgroup></optgroup>').attr({label: supportedTypes[itemType][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME]});
                        for(var j = 0; j < roomItems.length; j++) {
                            if(roomItems[j][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] === itemType) {
                                optgroup.append($('<option>' + roomItems[j][APP.API.STATE.ROOM.ITEM.NAME] + ' (' + roomItems[j][APP.API.STATE.ROOM.ITEM.IP] + ')' + '</option>').attr({
                                    value: roomItems[j][APP.API.STATE.ROOM.ITEM.ID],
                                    'data-id': roomItems[j][APP.API.STATE.ROOM.ITEM.ID],
                                    'data-type': roomItems[j][APP.API.STATE.ROOM.ITEM.ITEM_TYPE],
                                    'data-name': roomItems[j][APP.API.STATE.ROOM.ITEM.NAME]
                                    })
                                );
                            }
                        }
                        removeSelect.append(optgroup);
                    }
                }
                container.append($('<div class="select-wrapper"></div>').append(removeSelect));
                container.append($('<input></input>').attr({
                    id: removeInputSelector,
                    type: 'text',
                    placeholder: 'Confirm this item\'s name'})
                );
                
                removeButtonElement = $('<a href="#">Remove</a>').attr({id: 'context-remove-item-button', class: 'button'});
                removeButtonElement.click(function() {
                    var self = $(this),
                        targetItemId = parseInt($('#' + removeSelectSelector).val()),
                        targetOption = $('#' + removeSelectSelector).find('option[value="' + targetItemId + '"]'),
                        targetType = targetOption.attr('data-type'),
                        targetName = targetOption.attr('data-name'),
                        types = stage.data.itemTypes,
                        displays = stage.data.itemTypeDisplays;
                    
                    if($('#' + removeInputSelector).val() === targetName) {
                        removeWarning.html('');
                        self.parent().addClass(APP.DOM_HOOK.UPDATING);
                        // AJAX call
                        APP.ajax_delete_rooms_roomId_items_itemId(roomId, targetItemId,
                            function() {
                                // AJAX call
                                APP.ajax_get_state(
                                    function() {
                                        stage.tearDown();
                                        stage.construct();
                                    },
                                    function() {
                                        // do nothing
                                    }
                                );
                            },
                            function() {
                                // Do nothing
                            }
                        );
                    } else {
                        removeWarning.html('Names do not match. Please reconfirm.');
                    }
                });
                container.append(removeButtonElement);
                removePanel.append(container);
                itemsPanel.append(removePanel);
                return itemsPanel;
            }
            
            wrapper.append(content);
            content.append($('<h1></h1>').html('Room manager'));
            content.append(constructRoomsPanel());
            content.append(constructItemsPanel(getRoom(roomId)[APP.API.STATE.ROOM.ITEMS]));
            stage.contextMenu.getContext().append(wrapper);
        });
        stage.setConstruct(function() {
            var itemTypes,
                items = getRoom(roomId)[APP.API.STATE.ROOM.ITEMS],
                item,
                itemType;
            stage.getContext().append($('<div></div>').attr({id: 'context-bar'}));

            stage.data.itemTypes = {};
            itemTypes = stage.data.itemTypes;
            for(var j = 0; j < items.length; j++) {
                item = items[j];
                itemType = item[APP.API.STATE.ROOM.ITEM.ITEM_TYPE];
                if(itemTypes[itemType] === undefined) {
                    itemTypes[itemType] = [];
                }
                itemTypes[itemType].push(item);
            }
            stage.data.itemTypeDisplays = {};
            
            for(var type in itemTypes) {
                if(itemTypes.hasOwnProperty(type)) {
                    stage.data.itemTypeDisplays[type] = new APP.ItemTypeDisplay(stage, type, getRoom(roomId));
                    stage.data.itemTypeDisplays[type].construct();
                }
            }
            stage.poller.startPolling();
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
        
            function updateMenu() {
                var rooms = APP.data.houseStructure[APP.API.STATE.ROOMS],
                    roomsCopy = rooms.slice(0),
                    roomsCopyLength = roomsCopy.length,
                    buttons = self.menuManager.buttons[stage.menuId],
                    buttonsCopy = buttons.slice(0),
                    buttonsCopyLength = buttonsCopy.length;
                
                for(var i = 0; i < buttonsCopyLength; i++) {
                    for(var j = 0; i < roomsCopyLength; j++) {
                        if(buttonsCopy[i].data.roomId === roomsCopy[j][APP.API.STATE.ROOM.ID]) {
                            buttonsCopy.splice(i, 1);
                            roomsCopy.splice(j, 1);
                            buttonsCopyLength = buttonsCopy.length;
                            roomsCopyLength = roomsCopy.length;
                            i--;
                            j--;
                            break;
                        }
                    }
                }
                
                // If there are any unmatched buttons, it means they need to be removed (with its associated stage);
                for(var i = 0; i < buttonsCopy.length; i++) {
                    if(buttonsCopy[i].stageId !== 'stage-no-room') {
                        self.removeStage(stages.get(buttonsCopy[i].stageId));
                    }
                }
                
                // If there are any unmatched rooms, it means they need to be added
                for(var j = 0; j < roomsCopy.length; j++) {
                    self.setStage_Room(roomsCopy[i][APP.API.STATE.ROOM.ID], roomsCopy[i][APP.API.STATE.ROOM.NAME]);
                }
                
            }
        
            updateMenu();
            
            $('#context-bar').html('');
            $('#context-menu div.' + APP.DOM_HOOK.UPDATING).removeClass(APP.DOM_HOOK.UPDATING);
            for(var display in stage.data.itemTypeDisplays) {
                if(stage.data.itemTypeDisplays.hasOwnProperty(display)) {
                    stage.data.itemTypeDisplays[display].update();
                }
            }
        });
        stage.setUpdateError(function() {
            $('#context-bar').html('Caution: Connection to server lost. Displaying last available state info retrieved at ' + APP.data.retrieved.houseStructure);
            for(var display in stage.data.itemTypeDisplays) {
                if(stage.data.itemTypeDisplays.hasOwnProperty(display)) {
                    stage.data.itemTypeDisplays[display].updateError();
                }
            }
        });
        stage.setPollFunction(1000, function() {
            APP.ajax_get_state(stage.update, stage.updateError);
        });
        
    };
    
    /**
     *
     */
    this.setStage_ECA = function() {
        var stageId = this.addStage(new APP.Stage('menu-rules', 'button-rules-eca', 'ECA', 'stage-rules-eca')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            // default
        });
        stage.setConstruct(function() {
            var stageMessage = $('<div></div>').addClass('stage-message');
            
            function construct() {
                stage.data.ruleManager = new APP.ECARuleManager(stage);
                stage.data.ruleManager.construct();
            }
            
            function constructWithError() {
                stageMessage.html('Caution: Connection to server cannot be established. New commands will not be sent to the server. Data being shown is retrieved at ' + APP.data.retrieved.events + '.');
                stageMessage.addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
                construct();
            }
            
            function constructWithoutError() {
                stageMessage.html('');
                construct();
            }
            
            function connectionError() {
                if(APP.data.retrieved.houseStructure !== undefined && APP.data.retrieved.events !== undefined) {
                    constructWithError();
                } else {
                    stage.getContext().html($('<div>Caution: Connection to server cannot be established.</div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY));
                }
            }
            
            stage.data.ruleManager = undefined;
            
            stageMessage.append($('<span></span>').html('Loading'));
            stageMessage.append($('<img></img>').attr({src: '../../static/img/ajax-loader.gif'}));
            stage.getContext().append(stageMessage);
            APP.ajax_get_events(
                function() {
                    APP.ajax_get_state(
                        constructWithoutError,
                        connectionError
                    );
                },
                connectionError
            );
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            // default
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(1000, function() {
            
        });
    };
    
    /**
     *
     */
    this.setStage_Settings = function() {
        var stageId = this.addStage(new APP.Stage('menu-config', 'button-settings', 'Settings', 'stage-settings')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            // default
        });
        stage.setConstruct(function() {
            // default
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            // default
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(undefined, function() {
            
        });
    };
    
    /**
     *
     */
    this.setStage_Whitelist = function() {
        var stageId = this.addStage(new APP.Stage('menu-config', 'button-config-whitelist', 'Whitelist', 'stage-whitelist')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            // default
        });
        stage.setConstruct(function() {
            APP.ajax_get_whitelist(
                function(json) {
                    var obj = APP.unpackToPayload(json),
                        emails = obj[APP.API.WHITELIST.EMAILS],
                        container = $('<div></div>').addClass('whitelist-display'),
                        warning = $('<div></div').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
                    
                    function constructRemoveForm(email) {
                        var panel = $('<div></div>'),
                            field = $('<span></span>').html(email),
                            removeButton = $('<button>Remove</button>').attr({id: 'whitelist-remove-button-' + email});
                            
                        removeButton.click(function() {
                            var parent = $(this).parent();
                            parent.addClass(APP.DOM_HOOK.UPDATING);
                            APP.ajax_delete_whitelist(email,
                                function() {
                                    console.log('foo');
                                    parent.remove();
                                },
                                function() {
                                    parent.removeClass(APP.DOM_HOOK.UPDATING);
                                    // do nothing
                                }
                            );
                        });
                        panel.append(field);
                        panel.append(removeButton);
                        container.append(panel);
                    }
                    
                    function constructAddForm() {
                        var panel = $('<div></div>'),
                            form = $('<input></input>').attr({type: 'text', id: 'whitelist-add-form'}),
                            addButton = $('<button>Add</button>').attr({id: 'whitelist-add-button'});
                        
                        addButton.click(function() {
                            var parent = $(this).parent(),
                                email = $('#' + 'whitelist-add-form').val();
                                
                            // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                            if(/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email) === true) {
                                parent.addClass(APP.DOM_HOOK.UPDATING);
                                APP.ajax_post_whitelist(email,
                                    function() {
                                        parent.remove();
                                        constructRemoveForm(email);
                                        constructAddForm();
                                    },
                                    function() {
                                        parent.removeClass(APP.DOM_HOOK.UPDATING);
                                        // do nothing
                                    }
                                );
                            } else {
                                warning.html('Invalid email address.');
                            }
                        });
                        panel.append(form);
                        panel.append(addButton);
                        container.append(panel);
                    }
                    
                    stage.getContext().append(container);
                    container.append(warning);
                    for(var i = 0; i < emails.length; i++) {
                        constructRemoveForm(emails[i]);
                    }
                    constructAddForm();
                    
                },
                function() {
                    // do nothing
                }
            );
            
            /*
            var box = $('<div></div>').addClass('whitelist-display'),
                text = $('<div></div>').html('Caution: This page does not update itself. Information retrieved ' + APP.data.connection.lastSuccess),
                textarea = $('<textarea></textarea>').attr({id: 'whitelist-textarea'});
                button = $('<button>Submit</button>');
            
            button.click(function() {
                APP.ajax_put_whitelist(
                    textarea.val(),
                    function() {
                        text.html('Caution: This page does not update itself. Information retrieved ' + APP.data.connection.lastSuccess);
                    },
                    function() {
                        // do nothing
                    }
                );
            });
            
            APP.ajax_get_whitelist(
                function(json) {
                    var obj = APP.unpackToPayload(json);
                    textarea.html(obj);
                },
                function() {
                    // do nothing
                }
            );
            box.append(text);
            box.append(textarea);
            box.append(button);
            stage.getContext().append(box);
            */
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            // default
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(undefined, function() {
            
        });
    };
    
    /**
     *
     */
    this.setStage_Logs = function() {
        var stageId = this.addStage(new APP.Stage('menu-config', 'button-logs', 'Logs', 'stage-logs')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            // default
        });
        stage.setConstruct(function() {
            // default
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            // default
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(undefined, function() {
            
        });
    };
    
    /**
     *
     */
    this.setStage_About = function() {
        var stageId = this.addStage(new APP.Stage('menu-config', 'button-about', 'About', 'stage-about')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            // default
        });
        stage.setConstruct(function() {
            // default
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            // default
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(undefined, function() {
            
        });
    };
        
    /**
     * @for APP.StageManager
     * @method init
     */
    this.init = function() {
        var self = this;
        
        // initialize menus
        (function () {
            var primaryMenu = $('#menu-primary'),
                secondaryMenuWrapper = $('#wrapper-secondary'),
                target,
                primaryMenuMapping;
            
            function constructButton(buttonId, buttonText, cls, menuId) {
                var button;
                if (document.getElementById(buttonId) === null) { 
                    button = $('<a>' + buttonText + '</a>').attr({id: buttonId, class: cls, 'data-color-class': cls, href: '#'});
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
                        menu = $('<ul></ul>').attr({id: menuId, class: 'menu horizontal secondary ' + cls, 'data-color-class': cls});
                        secondaryMenuWrapper.append(menu);
                    } else {
                        menu = $('#' + menuId);
                    }
                }
            }
            
            // This links the primary buttons with the menus
            function link() {
                var primaryButtons = primaryMenu.children().children(),
                    menus = secondaryMenuWrapper.children();
                primaryButtons.each(function() {
                    $(this).click(function() {
                        target = $(this);
                        if(primaryMenuMap[$(this).attr('id')].menuId !== null) {
                            target.toggleClass('selected');
                        }
                        primaryButtons.not(target).each(function() {
                            $(this).removeClass('selected');
                        });
                        primaryMenuMapping = primaryMenuMap[$(this).attr('id')].menuId;
                        $('#' + primaryMenuMapping).toggleClass('active');
                        menus.not('#' + primaryMenuMapping).removeClass('active');
                        menus.children().removeClass('selected');
                        // If this button has an associated menu --> not being used as Stage button
                        if(primaryMenuMapping !== null) {
                            var primaryButtonSelector = '#menu-prmary > li > a',
                                secondaryButtonSelector = '#wrapper-secondary > ul > li > a';
                            $(primaryButtonSelector).not(target).removeClass('selected');
                            $(secondaryButtonSelector).not(target).removeClass('selected');
                            self.toggleStage(null);
                        }
                        APP.resizer.resizeStageWrapper();
                    });
                });
            }
            
            for(var buttonId in primaryMenuMap) {
                var obj = primaryMenuMap[buttonId];
                constructButton(buttonId, obj.buttonText, obj.class, obj.menuId);
                constructSecondaryMenu(obj.menuId, obj.buttons, obj.class);
            }
            link();            
        })();
        
        // home stage
        this.setStage_Home();
        
        // control stages
        APP.ajax_get_state(function() {
            
            // fetch the latest list of rooms
            var rooms = APP.data.houseStructure[APP.API.STATE.ROOMS],
                roomNames = [],
                roomIds = [];
            
            if(rooms.length === 0) {
                self.setStage_NoRoom();
            } else {
                // save a static copy of ids and names from that list
                for(var i = 0; i < rooms.length; i++) {
                    roomIds.push(rooms[i][APP.API.STATE.ROOM.ID]);
                    roomNames.push(rooms[i][APP.API.STATE.ROOM.NAME]);
                    room = rooms[i];
                }
                
                // for each room, use static data to initialize
                for(var i = 0; i < roomIds.length; i++) {
                    self.setStage_Room(roomIds[i], roomNames[i]);
                }
            }
        });
                
        // eca stage
        this.setStage_ECA();
        
        // settings stage
        this.setStage_Settings();
        
        // whitelist stage
        this.setStage_Whitelist();
        
        // logs stage
        this.setStage_Logs();
        
        // about stage
        this.setStage_About();
        
    };
    
};



/**
 * @static
 * This object handles time and the clock
 */
APP.clock = {
    
    /**
     * @for APP.clock
     * @method getCurrentDate
     * returns the current date object
     */
    getCurrentDate: function() {
        return new Date();
    },
    
    /**
     * @for APP.clock
     * @method getTimestamp
     * @param {Date} dateInput Input Date object. If not defined, this method uses the current date
     * @return {String} String formatted to represent current time, from hours to milliseconds
     */
    getTimestamp: function(dateInput) {
        var date;
        if(dateInput) { date = dateInput; }
        else { date = new Date(); }
        function pad(num) {
            return (num < 10) ? "0" + num : num;
        }
        function padK(num) {
            if(num < 10) { return "00" + num; }
            if(num < 100) { return "0" + num; }
            return num;
        }
        return (pad(date.getFullYear()) + ' ' + pad(parseInt(date.getMonth()) + 1) + ' ' + pad(date.getDate()) + ' ' + pad(date.getHours()) + '' + pad(date.getMinutes()) + ' ' + pad(date.getSeconds()) + ' ' + padK(date.getMilliseconds()));
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
            
        if(currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if(currentHours >= 12) {
            if (currentHours === 12) { currentHours = 12; }
            else { currentHours -= 12; }
            timeOfDay = 'PM';
        } else {
            if(currentHours === 0) { currentHours = 12; }
            timeOfDay = "AM";
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
};

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
};

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
    /*
     * @for APP.resizer
     * @method resizeLeftPanel
     */
    /*
    resizeLeftPanel: function() {
        var panelHeight;
        panelHeight = (window.innerHeight - $('#chronograph').height()) + 'px';
        $('#left-panel').css('height', panelHeight);
    }
    */
};

$(document).ready(function() {
    
    APP.ajax_get_version(function() {
        // Instantiate manager objects
        APP.data.stageManager = new APP.StageManager();
        
        // Initialize UI menus and stages
        APP.data.stageManager.init();
        
        // Start clock
        APP.clock.startClock();
        
        // Listen to size changes
        APP.windowResizeListener.listen();
        APP.resizer.resizeAll();
        
    });
        
});
