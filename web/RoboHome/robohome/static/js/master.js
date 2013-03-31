/**
 * master.js
 *
 * JavaScript for Robohome
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
APP.DOM_HOOK.ENABLED = 'enabled';
APP.DOM_HOOK.COLLAPSED = 'collapsed';
APP.DOM_HOOK.STAGE_CONTENT = 'stage-content';
APP.DOM_HOOK.ENTITY = {};
APP.DOM_HOOK.ENTITY.ITEM_TYPE = 'item-type';
APP.DOM_HOOK.ENTITY.ROOM = 'room';
APP.DOM_HOOK.ENTITY.ITEM = 'item';
APP.DOM_HOOK.NO_ROOM = 'no-room';
APP.DOM_HOOK.PASSIVE = 'passive';
APP.DOM_HOOK.ECA = {};
APP.DOM_HOOK.ECA.RULE = 'eca-rule';
APP.DOM_HOOK.ECA.NEW_RULE = 'eca-new-rule';
APP.DOM_HOOK.ECA.RULE_TITLE = 'eca-rule-title';
APP.DOM_HOOK.ECA.FORM_BOX = 'eca-form-box';
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
APP.DOM_HOOK.ECA.CONDITION_FIELDSET = 'eca-condition-fieldset';
APP.DOM_HOOK.ECA.ACTION_FIELDSET = 'eca-action-fieldset';
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
APP.API.VERSION.SUPPORTED_TYPE.IS_PASSIVE = 'isPassive';
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
APP.API.EVENTS.RULE.EVENT.SCOPE = 'scope';
APP.API.EVENTS.RULE.EVENT.EQUIVALENCE = 'equivalence';
APP.API.EVENTS.RULE.EVENT.VALUE = 'value';
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

// /energy
APP.API.ENERGY = {};
APP.API.ENERGY.START_TIME = 'startTime';
APP.API.ENERGY.END_TIME = 'endTime';
APP.API.ENERGY.VALUE = {};
APP.API.ENERGY.VALUE.VALUES = 'values';
APP.API.ENERGY.VALUE.WATTS = 'watts';
APP.API.ENERGY.VALUE.TIME = 'time';

// /plugins
APP.API.PLUGINS = 'plugins';

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
APP.URL.EVENTS_EVENTID_CONDITIONS = function(eventId, conditionId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/events/' + eventId + '/conditions/';
};
APP.URL.EVENTS_EVENTID_CONDITIONS_CONDITIONID = function(eventId, conditionId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/events/' + eventId + '/conditions/' + conditionId + '/';
};
APP.URL.EVENTS_EVENTID_ACTIONS = function(eventId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/events/' + eventId + '/actions/';
};
APP.URL.EVENTS_EVENTID_ACTIONS_ACTIONID = function(eventId, actionId) {
    return '/version/' + APP.CONSTANTS.VERSION + '/events/' + eventId + '/actions/' + actionId + '/';
};
APP.URL.ENERGY = '/version/' + APP.CONSTANTS.VERSION + '/energy/';
APP.URL.PLUGINS = '/plugins/';
APP.URL.PLUGINS_PLUGIN_NAME = function(pluginName) {
    return '/plugins/' + pluginName + '/';
};
APP.URL.WHITELIST = '/version/' + APP.CONSTANTS.VERSION + '/whitelist/';

APP.url_args = function(obj) {
    var i = 0,
        str = '',
        arg;
    for(var property in obj) {
        if(obj.hasOwnProperty(property)) {
            if(i === 0) { str += '?' } else { str += '&' }
            arg = property + '=' + encodeURIComponent(obj[property]);
            str += arg;
            i++;
        }
    }
    return str
};

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
 * @param {Object | Function | string | number} value Any object or primitive to be hashed. In particular, anything that has a valid .toString() call
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
 * @param {Object | Function | string | number} key Any object or primitive to be hashed. In particular, anything that has a valid .toString() call
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
 * @param {Object | Function | string | number} key Key of value to be removed
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
 * @param {Object | Function | string | number} key Key to be retrieved
 * @return {any} Value of specified key
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
    for(var item in this.__items) {
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
        version: undefined,
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
    return JSON.stringify(APP.pack(payload));
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
 *
 */
APP.AjaxObj = function(obj) {
    this.method = obj.method;
    this.url = obj.url;
    this.args = obj.args;
    this.callback = obj.callback;
    this.error = obj.error;
};

/**
 *
 */
APP.ajax = {

    /**
     * @for APP.ajax
     * @method _ajax
     * @param obj
     */
    _ajax: function(ajaxObj) {
        var messageObj,
            internalCallback,
            internalError,
            url = ajaxObj.url + APP.url_args(ajaxObj.args);
        
        internalCallback = function(args) {
            APP.data.connection.lastSuccess = new Date();
            APP.data.connection.lastSuccess.setTime(APP.data.connection.lastAttempt);
            console.log('AJAX callback called ' + ajaxObj.method + ' ' + url + ' ' + APP.clock.getTimestamp(APP.data.connection.lastSuccess));
            if(ajaxObj.callback) {
                ajaxObj.callback(args);
            }
        };
        internalError = function(args) {
            APP.data.connection.lastNoSuccess = new Date();
            APP.data.connection.lastNoSuccess.setTime(APP.data.connection.lastAttempt);
            console.log('AJAX error ' + url + ' ' + APP.clock.getTimestamp(APP.data.connection.lastNoSuccess));
            if(ajaxObj.error) {
                ajaxObj.error(args);
            }
        };
        APP.data.connection.lastAttempt = APP.clock.getCurrentDate();
        $.ajax({
            type: ajaxObj.method,
            url: url,
            processData: false,
            cache: false,
            contentType: 'application/json',
            dataType: 'text',
            success: internalCallback,
            error: internalError
        });
        return ajaxObj;
    },
    
    /**
     * @for APP.ajax
     * @method get_structure
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Retrieves the latest house structure from the server
     */
    get_state: function(callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        this.ajaxObj = new APP.AjaxObj({
            method: 'GET',
            url: APP.URL.STATE,
            args: args,
            callback: function(json) {
                var obj = APP.unpackToPayload(json);
                APP.data.houseStructure = obj;
                APP.data.retrieved.houseStructure = new Date(APP.data.connection.lastSuccess);
                callback(json);
            },
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method get_version
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Retrieves version information and all information that's supposed to be cached
     */
    get_version: function(callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'GET',
            url: APP.URL.VERSION,
            args: args,
            callback: function(json) {
                var obj = APP.unpackToPayload(json);
                APP.data.cache = obj;
                APP.data.retrieved.version = new Date(APP.data.connection.lastSuccess);
                callback(json);
            },
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method post_rooms
     * @param {String} roomName     Name of room
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Adds a new room
     */
    post_rooms: function(roomName, callback, error, test) {
        var args = {};
        args[APP.API.ROOMS.NAME] = roomName;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'POST',
            url: APP.URL.ROOMS,
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method delete_rooms_roomId
     * @param {int} roomId          RoomId
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Deletes a room
     */
    delete_rooms_roomId: function(roomId, callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'DELETE',
            url: APP.URL.ROOMS_ROOMID(roomId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method delete_rooms_roomId_items
     * @param {int} roomId          Room ID
     * @param {String} targetBrand  Brand of item
     * @param {String} Static       IPv4 address of item
     * @param {String} targetName   Name of item
     * @param {String} targetType   Type of item
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Add new item to room
     */
    post_rooms_roomId_items: function(roomId, itemBrand, itemIP, itemName, itemType, callback, error, test) {
        var args = {};
        args[APP.API.ITEMS.BRAND] = itemBrand;
        args[APP.API.ITEMS.IP] = itemIP;
        args[APP.API.ITEMS.NAME] = itemName;
        args[APP.API.ITEMS.ITEM_TYPE] = itemType;
        if(test) { args['test'] = 1 };
        console.log(args);
        this.ajaxObj = new APP.AjaxObj({
            method: 'POST',
            url: APP.URL.ROOMS_ROOMID_ITEMS(roomId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method delete_rooms_roomId_items_itemId
     * @param {int} roomId          Room ID
     * @param {int} itemId          Item ID
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Deletes specified item in room
     */
    delete_rooms_roomId_items_itemId: function(roomId, itemId, callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'DELETE',
            url: APP.URL.ROOMS_ROOMID_ITEMS_ITEMID(roomId, itemId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method put_rooms_roomId_items_itemId_cmd
     * @param {int} roomId          ID of room
     * @param {int} itemId          ID of item
     * @param {String} cmd          Command to send to the item
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Updates the specified item in the room with the new state
     */
    put_rooms_roomId_items_itemId_cmd: function(roomId, itemId, cmd, callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'PUT',
            url: APP.URL.ROOMS_ROOMID_ITEMS_ITEMID_CMD(roomId, itemId, cmd),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method get_events
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Gets list of events
     */
    get_events: function(callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'GET',
            url: APP.URL.EVENTS,
            args: args,
            callback: function(json) {
                var obj = APP.unpackToPayload(json);
                APP.data.events = obj === undefined ? undefined : obj[APP.API.EVENTS.RULES];
                APP.data.retrieved.events = new Date(APP.data.connection.lastSuccess);
                console.log(APP.data.retrieved.events);
                callback(json);
            },
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method post_events
     * @param {string} ruleName     Name of rule
     * @param {string} enabled      'true' or 'false', whether the rule is enabled or not
     * @param {int} id              Id of scope, either itemId or roomId or 'null', depending on scope
     * @param {string} itemType     Type of item
     * @param {string} scope        Scope code, either 'item', 'room', or 'house'
     * @param {string} equivalence  Equivalence
     * @param {int} value           Triggering state for given itemType
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Adds a new event, with no conditions or actions
     */
    post_events: function(ruleName, enabled, id, itemType, scope, equivalence, value, callback, error, test) {
        
        var args = {};    
        args[APP.API.EVENTS.RULE.RULE_NAME] = ruleName;
        args[APP.API.EVENTS.RULE.ENABLED] = enabled;
        args[APP.API.EVENTS.RULE.EVENT.ID] = id;
        args[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE] = itemType;
        args[APP.API.EVENTS.RULE.EVENT.SCOPE] = scope;
        args[APP.API.EVENTS.RULE.EVENT.EQUIVALENCE] = equivalence;
        args[APP.API.EVENTS.RULE.EVENT.VALUE] = value;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'POST',
            url: APP.URL.EVENTS,
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method put_events_eventId
     * @param {int} eventId         Id of event
     * @param {string} ruleName     Name of rule
     * @param {string} enabled      'true' or 'false', whether the rule is enabled or not
     * @param {int} id              Id of scope, either itemId or roomId or 'null', depending on scope
     * @param {string} itemType     Type of item
     * @param {string} scope        Scope code, either 'item', 'room', or 'house'
     * @param {string} equivalence  Equivalence
     * @param {int} value           Triggering state for given itemType
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Updates a given event. This leaves its events and actions unchanged
     */
    put_events_eventId: function(eventId, ruleName, enabled, id, itemType, scope, equivalence, value, callback, error, test) {

        var args = {};
        args[APP.API.EVENTS.RULE.RULE_NAME] = ruleName;
        args[APP.API.EVENTS.RULE.ENABLED] = enabled;
        args[APP.API.EVENTS.RULE.EVENT.ID] = id;
        args[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE] = itemType;
        args[APP.API.EVENTS.RULE.EVENT.SCOPE] = scope;
        args[APP.API.EVENTS.RULE.EVENT.EQUIVALENCE] = equivalence;
        args[APP.API.EVENTS.RULE.EVENT.VALUE] = value;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'PUT',
            url: APP.URL.EVENTS_EVENTID(eventId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method delete_events_eventId
     * @param {int} eventId         Id of event  
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Deletes the given event
     */
    delete_events_eventId: function(eventId, callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'DELETE',
            url: APP.URL.EVENTS_EVENTID(eventId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method post_events_eventId_conditions
     * @param {int} eventId         Id of event
     * @param {int} itemId          Id of item
     * @param {string} equivalence  Equivalence
     * @param {int} value           Triggering state for given itemType
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Adds a new condition to a given event
     */
    post_events_eventId_conditions: function(eventId, itemId, equivalence, value, callback, error, test) {
        
        var args = {};
        args[APP.API.EVENTS.RULE.CONDITION.ITEM_ID] = itemId;
        args[APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE] = equivalence;
        args[APP.API.EVENTS.RULE.CONDITION.VALUE] = value;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'POST',
            url: APP.URL.EVENTS_EVENTID_CONDITIONS(eventId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method put_events_eventId_conditions_conditionId
     * @param {int} eventId         Id of event
     * @param {int} conditionId     Id of condition
     * @param {int} itemId          Id of item
     * @param {string} equivalence  Equivalence
     * @param {int} value           Triggering state for given item
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Updates a condition in the given event
     */
    put_events_eventId_conditions_conditionId: function(eventId, conditionId, itemId, equivalence, value, callback, error, test) {
        
        var args = {};
        args[APP.API.EVENTS.RULE.CONDITION.ITEM_ID] = itemId;
        args[APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE] = equivalence;
        args[APP.API.EVENTS.RULE.CONDITION.VALUE] = value;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'PUT',
            url: APP.URL.EVENTS_EVENTID_CONDITIONS_CONDITIONID(eventId, conditionId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method delete_events_eventId_conditions_conditionId
     * @param {int} eventId         Id of event
     * @param {int} conditionId     Id of condition
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Deletes a condition in the given event
     */
    delete_events_eventId_conditions_conditionId: function(eventId, conditionId, callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'DELETE',
            url: APP.URL.EVENTS_EVENTID_CONDITIONS_CONDITIONID(eventId, conditionId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method post_events_eventId_actions
     * @param {int} eventId         Id of event
     * @param {int} id              Id of scope, either itemId or roomId or 'null', depending on scope
     * @param {string} scope        Scope code, either 'item', 'room', or 'house'       
     * @param {string} itemType     itemType
     * @param {string} method       Method to execute for the given itemType
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Adds a condition to a given event
     */
    post_events_eventId_actions: function(eventId, id, scope, itemType, method, callback, error, test) {
        
        var args = {};
        args[APP.API.EVENTS.RULE.ACTION.ID] = id;
        args[APP.API.EVENTS.RULE.ACTION.SCOPE] = scope;
        args[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE] = itemType;
        args[APP.API.EVENTS.RULE.ACTION.METHOD] = method;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'POST',
            url: APP.URL.EVENTS_EVENTID_ACTIONS(eventId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method put_events_eventId_actions_actionId
     * @param {int} eventId         Id of event
     * @param {int} actionId        Id of action
     * @param {int} id              Id of scope, either itemId or roomId or 'null', depending on scope           
     * @param {string} scope        Scope code, either 'item', 'room', or 'house'
     * @param {string} itemType     itemType
     * @param {string} method       Method to execute for the given itemType
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Updates an action in a given event
     */
    put_events_eventId_actions_actionId: function(eventId, actionId, id, scope, itemType, method, callback, error, test) {

        var args = {};
        args[APP.API.EVENTS.RULE.ACTION.ID] = id;
        args[APP.API.EVENTS.RULE.ACTION.SCOPE] = scope;
        args[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE] = itemType;
        args[APP.API.EVENTS.RULE.ACTION.METHOD] = method;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'PUT',
            url: APP.URL.EVENTS_EVENTID_ACTIONS_ACTIONID(eventId, actionId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method delete_events_eventId_actions_actionId
     * @param {int} eventId         Id of event
     * @param {int} actionId        Id of action
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Deletes an action in a given event
     */
    delete_events_eventId_actions_actionId: function(eventId, actionId, callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'DELETE',
            url: APP.URL.EVENTS_EVENTID_ACTIONS_ACTIONID(eventId, actionId),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     *
     */
    get_energy: function(startTime, endTime, callback, error, test) {
        var args = {};
        args[APP.API.ENERGY.START_TIME] = startTime;
        args[APP.API.ENERGY.END_TIME] = endTime;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'GET',
            url: APP.URL.ENERGY,
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     *
     */
    get_plugins: function(callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'GET',
            url: APP.URL.PLUGINS,
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     *
     */
    delete_plugins: function(pluginName, callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'DELETE',
            url: APP.URL.PLUGINS_PLUGIN_NAME(pluginName),
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method get_whitelist
     * @param {Function} callback Callback function to execute after response is received
     * @param {Function} error    Function to execute if AJAX request fails
     * Fetches the list of whitelisted email addresses
     */
    get_whitelist: function(callback, error, test) {
        var args = {};
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'GET',
            url: APP.URL.WHITELIST,
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method post_whitelist
     * @param {String} email        Email address string to add
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Adds an email address to the whitelist
     */
    post_whitelist: function(email, callback, error, test) {

        var args = {};
        args[APP.API.WHITELIST.EMAIL] = email;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'POST',
            url: APP.URL.WHITELIST,
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    },
    
    /**
     * @for APP.ajax
     * @method delete_whitelist
     * @param {String} email        Email address string to delete
     * @param {Function} callback   Callback function to execute after response is received
     * @param {Function} error      Function to execute if AJAX request fails
     * Deletes an email address from the whitelist
     */
    delete_whitelist: function(email, callback, error, test) {
        
        var args = {};
        args[APP.API.WHITELIST.EMAIL] = email;
        if(test) { args['test'] = 1 };
        
        this.ajaxObj = new APP.AjaxObj({
            method: 'DELETE',
            url: APP.URL.WHITELIST,
            args: args,
            callback: callback,
            error: error
        });
        
        return APP.ajax._ajax(this.ajaxObj);
    }
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
    this.construct = function() {
        $(selector).html('');
    };
        
    /**
     * @for APP.ContextMenu
     * @method setConstruct
     * Give the function to execute when the ContextMenu's construct() is called
     */
    this.setConstruct = function(func) {
        this.construct = function() {
            $(selector).html('');
            func();
        }
    }
    
    /**
     *
     */
    this.update = function() {};
    
    /**
     *
     */
    this.setUpdate = function(func){
        this.update = func;
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
    this.menuId = menuId;
    this.buttonId = buttonId;
    this.buttonText = buttonText;
    this.stageId = stageId;
    this.contextMenu = new APP.ContextMenu();
    this.poller = new APP.Poller();
    this.colorClass;
    
    if(this.menuId === null) {
        this.colorClass = $('#' + this.buttonId).attr('data-color-class');
    } else {
        this.colorClass = $('#' + this.menuId).attr('data-color-class');
    }
    
    this.data = {};
    this.isReady = false;
    this.constructing = false;
    
    /**
     * @for APP.Stage
     * @property data
     * @type {Object}
     * @default {}
     * Data specific to this stage
     */
    this.data = {};
    
    /**
     *
     */
    this.ready = function() {
        this.isReady = true;
        this.constructing = false;
    };
    
    /**
     *
     */
    this.notReady = function() {
        this.isReady = false;
    };
    
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
        self.constructing = true;
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
        self.constructing = true;
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
        var interval;
        function tear() {
            self.isReady = false;
            if(interval !== undefined) { window.clearInterval(interval); }
            self.getContext().html('');
            self.contextMenu.tearDown();
            self.poller.stopPolling();
            func();
        }
        
        console.log(self.stageId + ' tearDown() called');
        // console.trace(this);
        if(self.isReady !== true) {
            console.warn('But stage has not yet finished being constructed! Delaying tearDown() call');
            interval = window.setInterval(tear, 1000);
        } else {
            tear();
        }
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
 *
 */
APP.Stage.prototype.setMenuUpdate = function(func) {
    this.contextMenu.setUpdate(func);
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
APP.ItemTypeDisplay = function(stage, itemType, roomObj) {
    this.stage = stage;
    this.itemType = itemType;
    this.roomObj = roomObj;
    
    this.itemDisplays = [];
    
    this.panel;
    this.infoBar;
};

/**
 *
 */
APP.ItemTypeDisplay.prototype.addItemDisplay = function(itemObj) {
    var itemDisplay = new APP.ItemDisplay(this.stage, this.itemType, this.roomObj[APP.API.STATE.ROOM.ID], itemObj);
    this.itemDisplays.push(itemDisplay);
    this.panel.append(itemDisplay.construct());
};

/**
 *
 */
APP.ItemTypeDisplay.prototype.removeItemDisplay = function(itemId) {
    console.log('removing' + itemId);
    for(var i = 0; i < this.itemDisplays.length; i++) {
        if(this.itemDisplays[i].itemObj[APP.API.STATE.ROOM.ITEM.ID] === itemId) {
            this.itemDisplays[i].panel.remove();
            this.itemDisplays.splice(i, 1);
        }
    }
};

/**
 * @for APP.ItemTypeDisplay
 * @method construct
 * Constructs the representation of this object on the stage
 */
APP.ItemTypeDisplay.prototype.construct = function() {
    var self = this,
        itemObjs,
        displayedName;
    
    this.panel = $('<div></div>').attr({
        class: 'entity-display ' + APP.DOM_HOOK.ENTITY.ITEM_TYPE,
        'data-name': this.itemType
    });
    
    this.infoBar = $('<div></div>').addClass('info-bar');
    displayedName = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemType][APP.API.VERSION.SUPPORTED_TYPE.NAME];
    if(displayedName === undefined) { displayedName = this.itemType; }
    this.infoBar.append($('<h1>' + displayedName + '</h1>').addClass('entity-name'));
    this.panel.append(this.infoBar);
    
    itemObjs = this.roomObj[APP.API.STATE.ROOM.ITEMS];
    for(var i = 0; i < itemObjs.length; i++) {
        if(itemObjs[i][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] === this.itemType) {
            this.addItemDisplay(itemObjs[i]);
        }
    }
    
    this.stage.getContext().append(this.panel);
            
};

/**
 *
 */
APP.ItemTypeDisplay.prototype.remove = function() {
    this.panel.remove();
}

/**
 * @for APP.ItemTypeDisplay
 * @method update
 * Updates the representation of this object on the stage
 */
APP.ItemTypeDisplay.prototype.update = function() {
    var self = this,
        roomId = this.roomObj[APP.API.STATE.ROOM.ID],
        stateList = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES];
    
    function updateRoomObj() {
        for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
            if(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ID] === self.roomObj[APP.API.STATE.ROOM.ID]) {
                self.roomObj = APP.data.houseStructure[APP.API.STATE.ROOMS][i];
            }
        }
    }
    
    function updateItemDisplays() {
        var items = self.roomObj[APP.API.STATE.ROOM.ITEMS],
            itemsCopy = items.slice(0),
            itemsCopyLength = itemsCopy.length,
            itemDisplays = self.itemDisplays,
            itemDisplaysCopy = itemDisplays.slice(0),
            itemDisplaysCopyLength = itemDisplaysCopy.length;
        
        for(var i = 0; i < itemDisplaysCopyLength; i++) {
            inner:
            for(var j = 0; j < itemsCopyLength; j++) {
                if(itemDisplaysCopy[i].itemObj[APP.API.STATE.ROOM.ITEM.ID] === itemsCopy[j][APP.API.STATE.ROOM.ITEM.ID]) {
                    itemDisplaysCopy[i].update(itemsCopy[j]);
                    itemDisplaysCopy.splice(i, 1);
                    itemsCopy.splice(j, 1);
                    itemDisplaysCopyLength = itemDisplaysCopy.length;
                    itemsCopyLength = itemsCopy.length;
                    i--;
                    j--;
                    break inner;
                }
            }
        }
        
        // If there are any unmatched itemDisplays, it means they need to be removed
        for(var i = 0; i < itemDisplaysCopy.length; i++) {
            self.removeItemDisplay(itemDisplaysCopy[i].itemObj[APP.API.STATE.ROOM.ITEM.ID]);
        }
        
        // If there are any unmatched items, it means they need to be added, as long as they are the correct type
        for(var i = 0; i < itemsCopy.length; i++) {
            if(itemsCopy[i][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] === self.itemType) {
                self.addItemDisplay(itemsCopy[i]);
            }
        }
        
    }
    
    updateRoomObj();
    updateItemDisplays();
};

/**
 * @for APP.ItemTypeDisplay
 * @method updateError
 * Updates the representation to show that an error has occured in fetching the latest state data
 */
APP.ItemTypeDisplay.prototype.updateError = function() {
    var self = this,
        roomId = this.roomObj[APP.API.STATE.ROOM.ID],
        stateList = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES],
        itemObjs,
        itemPanel,
        statePanel;
    
    function updateRoomObj() {
        for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
            if(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ID] === self.roomObj[APP.API.STATE.ROOM.ID]) {
                self.roomObj = APP.data.houseStructure[APP.API.STATE.ROOMS][i];
            }
        }
    }
    
    function updateItemDisplays() {
        var items = self.roomObj[APP.API.STATE.ROOM.ITEMS],
            itemsCopy = items.slice(0),
            itemsCopyLength = itemsCopy.length,
            itemDisplays = self.itemDisplays,
            itemDisplaysCopy = itemDisplays.slice(0),
            itemDisplaysCopyLength = itemDisplaysCopy.length;
        
        for(var i = 0; i < itemDisplaysCopyLength; i++) {
            for(var j = 0; j < itemsCopyLength; j++) {
                if(itemDisplaysCopy[i].itemObj[APP.API.STATE.ROOM.ITEM.ID] === itemsCopy[j][APP.API.STATE.ROOM.ITEM.ID]) {
                    itemDisplaysCopy[i].updateError(itemsCopy[j]);
                    itemsCopy.splice(j, 1);
                    itemDisplaysCopy.splice(i, 1);
                    itemsCopyLength = itemsCopy.length;
                    itemDisplaysCopyLength = itemDisplaysCopy.length;
                    i--;
                    j--;
                    break;
                }
            }
        }
        
        // If there are any unmatched itemDisplays, it means they need to be removed
        for(var i = 0; i < itemDisplaysCopy.length; i++) {
            self.removeItemDisplay(itemDisplaysCopy[i].itemObj[APP.API.STATE.ROOM.ITEM.ID]);
        }
        
        // If there are any unmatched items, it means they need to be added, as long as they are the correct type
        for(var i = 0; i < itemsCopy.length; i++) {
            if(itemsCopy[i][APP.API.STATE.ROOM.ITEM.ITEM_TYPE] === this.itemType) {
                self.addItemDisplay(itemsCopy[i]);
            }
        }
        
    }
    
    updateRoomObj();
    updateItemDisplays();
};

/**
 *
 */
APP.ItemDisplay = function(stage, itemType, roomId, itemObj) {
    this.stage = stage;
    this.itemType = itemType;
    this.roomId = roomId;
    this.itemObj = itemObj;
    this.isPassive = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemType][APP.API.VERSION.SUPPORTED_TYPE.IS_PASSIVE];
    
    this.panel;
    this.innerPanel;
    this.infoBar;
    this.attachmentsSelf;
    this.statusPane;
};

/**
 *
 */
APP.ItemDisplay.prototype.construct = function() {
    var self = this;
        
    this.panel = $('<div></div>').attr({
        class: 'entity-display ' + APP.DOM_HOOK.ENTITY.ITEM,
        'data-id': this.itemObj[APP.API.STATE.ROOM.ITEM.ID], // currently used
        'data-ip': this.itemObj[APP.API.STATE.ROOM.ITEM.IP],
        'data-name': this.itemObj[APP.API.STATE.ROOM.ITEM.NAME],
        'data-brand': this.itemObj[APP.API.STATE.ROOM.ITEM.BRAND],
        'data-itemtype': this.itemObj[APP.API.STATE.ROOM.ITEM.ITEM_TYPE] // currently used
    });
    
    if(this.isPassive === false) {
        this.panel.click(function() {
            var dis = $(this),
                itemId,
                itemType,
                nextState,
                method,
                state,
                states;
            
            itemId = self.itemObj[APP.API.STATE.ROOM.ITEM.ID];
            itemType = self.itemObj[APP.API.ITEMS.ITEM_TYPE];
            state = self.itemObj[APP.API.STATE.STATE];
            states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES];
            
            for(var i = 0; i < states.length; i++) {
                if(state === states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID]) {
                    nextState = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES][(i + 1) % states.length];
                    method = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES][(i + 1) % states.length][APP.API.VERSION.SUPPORTED_TYPE.STATE.METHOD];
                    break;
                }
            }
            
            dis.addClass(APP.DOM_HOOK.UPDATING);
            APP.ajax.put_rooms_roomId_items_itemId_cmd(self.roomId, itemId, method,
                function() {
                    self.stage.update();
                },
                function() {
                    // do nothing
                }
            );
        });
    } else {
        this.panel.addClass(APP.DOM_HOOK.PASSIVE);
    }
    
    this.innerPanel = $('<div></div>');
    
    this.infoBar = $('<div></div>').addClass('info-bar');
    this.infoBar.append($('<h1>' + this.itemObj[APP.API.STATE.ROOM.ITEM.NAME] + '</h1>').addClass('entity-name'));
    this.infoBar.append($('<span>' + this.itemObj[APP.API.STATE.ROOM.ITEM.IP] + '</span>').addClass('entity-ip'));
    this.innerPanel.append(this.infoBar);
    
    this.attachmentsSelf = $('<div></div>').addClass('attachments self');
    this.statusPane = $('<div><img src="../static/img/ajax-loader.gif"></img></div>').addClass('status');
    this.attachmentsSelf.append(this.statusPane);
    this.innerPanel.append(this.attachmentsSelf);
    
    this.panel.append(this.innerPanel);
    
    return this.panel;
};

/**
 *
 */
APP.ItemDisplay.prototype.update = function(itemObj) {
    var state,
        states;
    
    this.itemObj = itemObj;
    states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemObj[APP.API.ITEMS.ITEM_TYPE]][APP.API.VERSION.SUPPORTED_TYPE.STATES];
    state = this.itemObj[APP.API.STATE.STATE];
    this.panel.removeClass(APP.DOM_HOOK.CONNECTION_ERROR + ' ' + APP.DOM_HOOK.UPDATING);
    for(var i = 0; i < states.length; i++) {
        if(state === states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID]) {
            this.statusPane.html(states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME]);
            break;
        }
    }
};

/**
 *
 */
APP.ItemDisplay.prototype.updateError = function(itemObj) {
    var state,
        states;
    
    this.itemObj = itemObj;
    states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][this.itemObj[APP.API.ITEMS.ITEM_TYPE]][APP.API.VERSION.SUPPORTED_TYPE.STATES];
    state = this.itemObj[APP.API.STATE.STATE];
    this.panel.addClass(APP.DOM_HOOK.CONNECTION_ERROR);
    for(var i = 0; i < states.length; i++) {
        if(state === states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID]) {
            this.statusPane.html(states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME]);
            break;
        }
    }
};



/**
 *
 */
APP.ECARuleManager = function(stage) {
    var self = this;
    
    this.stage = stage;
    this.ruleDisplays = [];
    this.newRuleDisplay = new APP.ECANewRuleDisplay(this);
    
    for(var i = 0; i < APP.data.events.length; i++) {
        this.ruleDisplays.push(new APP.ECARuleDisplay(APP.data.events[i], self));
    }
    
    this.addECARuleDisplays = function(ruleObjArray) {
        var ruleDisplay;
        for(var i = 0; i < ruleObjArray.length; i++) {
            ruleDisplay = new APP.ECARuleDisplay(ruleObjArray[i], self);
            self.ruleDisplays.push(ruleDisplay);
            self.stage.getContext().append(ruleDisplay.construct());
        }
        // move the newRuleDisplay to the bottom
        if(ruleObjArray.length !== 0) {
            self.stage.getContext().append(self.newRuleDisplay.boundingBox);
        }
        
    };
    
    this.removeECARuleDisplay = function(ruleId) {
        for(var i = 0; i < self.ruleDisplays.length; i++) {
            if(self.ruleDisplays[i].ruleObj[APP.API.EVENTS.RULE.RULE_ID] === ruleId) {
                self.ruleDisplays[i].delete();
                self.ruleDisplays.splice(i, 1);
                break;
            }
        }
    };
    
    this.construct = function() {
        for(var i = 0; i < self.ruleDisplays.length; i++) {
            self.stage.getContext().append(self.ruleDisplays[i].construct());
        }
        self.stage.getContext().append(self.newRuleDisplay.construct());
    };
    
    this.update = function(func) {
        var baz = this;
        APP.ajax.get_events(
            function() {
                var rules = APP.data.events,
                    rulesCopy = rules.slice(0),
                    rulesCopyLength = rulesCopy.length,
                    ruleDisplays = self.ruleDisplays,
                    ruleDisplaysCopy = ruleDisplays.slice(0),
                    ruleDisplaysCopyLength = ruleDisplaysCopy.length;
                
                for(var i = 0; i < ruleDisplaysCopyLength; i++) {
                    inner:
                    for(var j = 0; j < rulesCopyLength; j++) {
                        if(ruleDisplaysCopy[i].ruleObj[APP.API.EVENTS.RULE.RULE_ID] === rulesCopy[j][APP.API.EVENTS.RULE.RULE_ID]) {
                            ruleDisplaysCopy[i].update(rulesCopy[j]);
                            ruleDisplaysCopy.splice(i, 1);
                            rulesCopy.splice(j, 1);
                            ruleDisplaysCopyLength = ruleDisplaysCopy.length;
                            rulesCopyLength = rulesCopy.length;
                            i--;
                            j--;
                            break inner;
                        }
                    }
                }
                
                // If there are any unmatched ruleDisplays, it means they need to be removed
                for(var i = 0; i < ruleDisplaysCopy.length; i++) {
                    self.removeECARuleDisplay(ruleDisplaysCopy[i].ruleObj[APP.API.EVENTS.RULE.RULE_ID]);
                }
                
                // If there are any unmatched rules, it means they need to be added
                self.addECARuleDisplays(rulesCopy);
                
                if(func) {
                    func();
                }
                
            },
            function() {
                if(func) {
                    func();
                }
            }
        );
    };
    
};

/**
 *
 */
APP.ECARuleDisplay = function(ruleObj, ruleManager) {        
    var self = this,
        ruleId = ruleObj[APP.API.EVENTS.RULE.RULE_ID],
        eventObj = ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT],
        conditionArray = ruleObj[APP.API.EVENTS.RULE.CONDITIONS],
        actionArray = ruleObj[APP.API.EVENTS.RULE.ACTIONS];
    
    this.isInFormMode;
    
    this.ruleObj = ruleObj;
    this.ruleManager = ruleManager;
    
    this.eventDisplay = new APP.ECAEventDisplay(ruleId, this, this.ruleManager);
    this.conditionManager = new APP.ECAConditionManager(ruleId, conditionArray, this.ruleManager);
    this.actionManager = new APP.ECAActionManager(ruleId, actionArray, this.ruleManager);
    
    this.boundingBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE);
    this.titleBox;
    this.formBox;
    this.errorMessage;
    this.contentBox;
    this.eventFieldset;
    this.eventBox;
    this.conditionsFieldset;
    this.conditionsBox;
    this.actionsFieldset;
    this.actionsBox;
    this.showHide;
    this.ruleName;
    this.ruleInput;
    this.enableDisable;
    this.editButton;
    this.cancelButton;
    this.saveButton;
    this.floatBox;
    this.deleteInput;
    this.deleteButton;
    
    this.setToDisplayMode = function() {
        self.isInFormMode = false;
        
        self.ruleName = $('<div>' + self.ruleObj[APP.API.EVENTS.RULE.RULE_NAME] + '</div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV),
        self.editButton = $('<button>Edit</button>');
        
        self.editButton.click(function() {
            self.setToFormMode();
        });
        
        self.formBox.html('');
        self.formBox.append(self.ruleName);
        self.formBox.append(self.editButton);
        return self.formBox;
    };
    
    this.setToFormMode = function() {
        self.isInFormMode = true;
        
        self.ruleInput = $('<input></input>').attr({placeholder: 'Event name', value: self.ruleObj[APP.API.EVENTS.RULE.RULE_NAME]}),
        self.cancelButton = $('<button>Cancel</button>'),
        self.saveButton = $('<button>Save</button>');
        
        self.cancelButton.click(function() {
            self.setToDisplayMode();
        });
        
        self.saveButton.click(function() {
            var eventId     = self.ruleObj[APP.API.EVENTS.RULE.RULE_ID],
                ruleName    = self.ruleInput.val(),
                enabled     = self.ruleObj[APP.API.EVENTS.RULE.ENABLED],
                id          = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.ID],
                itemType    = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.ITEM_TYPE],
                scope       = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.SCOPE],
                equivalence = '=', // TODO change to self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.SCOPE]
                value       = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.VALUE];
            
            if(ruleName === '' || /^[\s\t\n\u00A0;]+$/.test(ruleName) === true || /[^]*[;][^]*/.test(ruleName) === true) {
                self.errorMessage.html('Name cannot be empty, all whitespace, start with whitespace, or contain the semicolon (;).');
            } else {
                self.errorMessage.html('');
                self.titleBox.addClass(APP.DOM_HOOK.UPDATING);
                APP.ajax.put_events_eventId(eventId, ruleName, enabled, id, itemType, scope, equivalence, value,
                    function() {
                        self.ruleManager.update(function() {
                            self.titleBox.removeClass(APP.DOM_HOOK.UPDATING);
                            self.setToDisplayMode();
                        });
                    },
                    function() {
                        // do nothing
                    }
                );
            }
        });
        
        self.formBox.html('');
        self.formBox.append(self.ruleInput);
        self.formBox.append(self.cancelButton);
        self.formBox.append(self.saveButton);
        return self.formBox;
    };
    
    this.construct = function() {
        self.titleBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE_TITLE),
        self.contentBox = $('<div></div>'),
        self.formBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FORM_BOX),
        self.errorMessage = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY),
        self.eventFieldset = $('<fieldset></fieldset>').addClass(APP.DOM_HOOK.ECA.EVENT_FIELDSET),
        self.eventBox = $('<div></div>'),
        self.conditionsFieldset = $('<fieldset></fieldset>').addClass(APP.DOM_HOOK.ECA.CONDITION_FIELDSET),
        self.conditionsBox= $('<div></div>'),
        self.actionsFieldset = $('<fieldset></fieldset>').addClass(APP.DOM_HOOK.ECA.ACTION_FIELDSET),
        self.actionsBox = $('<div></div>'),
        self.showHide = $('<button></button>').addClass(APP.DOM_HOOK.ECA.SHOW_HIDE + ' ' + APP.DOM_HOOK.COLLAPSED),
        self.enableDisable = $('<button></button>').addClass(APP.DOM_HOOK.ECA.ENABLE_DISABLE),
        self.floatBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.DELETE)
        self.deleteInput = $('<input></input>').attr({placeholder: 'Confirm event name'}),
        self.deleteButton = $('<button>Delete</button>');
        
        self.showHide.click(function() {
            self.contentBox.toggle(100);
            $(this).toggleClass(APP.DOM_HOOK.COLLAPSED);
        });
        
        self.enableDisable.click(function() {
            var dis = $(this),
                eventId     = self.ruleObj[APP.API.EVENTS.RULE.RULE_ID],
                ruleName    = self.ruleObj[APP.API.EVENTS.RULE.RULE_NAME],
                enabled     = self.ruleObj[APP.API.EVENTS.RULE.ENABLED],
                id          = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.ID],
                itemType    = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.ITEM_TYPE],
                scope       = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.SCOPE],
                equivalence = 'is', // TODO change to self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.SCOPE]
                value       = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT][APP.API.EVENTS.RULE.EVENT.VALUE];
            
            enabled = !enabled;
            self.titleBox.addClass(APP.DOM_HOOK.UPDATING);
            APP.ajax.put_events_eventId(eventId, ruleName, enabled, id, itemType, scope, equivalence, value,
                function() {
                    self.ruleManager.update(function() {
                        self.titleBox.removeClass(APP.DOM_HOOK.UPDATING);
                    });
                },
                function() {
                    // do nothing
                }
            );
        });
        
        self.deleteButton.click(function() {
            var eventId     = self.ruleObj[APP.API.EVENTS.RULE.RULE_ID],
                ruleName    = self.ruleObj[APP.API.EVENTS.RULE.RULE_NAME],
                deleteRoomName = self.deleteInput.val();
            if(ruleName !== deleteRoomName) {
                self.errorMessage.html('Names do not match. Please reconfirm.');
            } else {
                self.errorMessage.html('');
                self.titleBox.addClass(APP.DOM_HOOK.UPDATING);
                APP.ajax.delete_events_eventId(eventId,
                    function() {
                        self.titleBox.removeClass(APP.DOM_HOOK.UPDATING);
                        self.ruleManager.update();
                    },
                    function() {
                        // do nothing
                    }
                );
            }
        });
        
        // title box
        if(self.ruleObj[APP.API.EVENTS.RULE.ENABLED] === true) {
            self.enableDisable.addClass(APP.DOM_HOOK.ENABLED);
        }
        self.titleBox.append(self.errorMessage);
        self.titleBox.append(self.showHide);
        self.titleBox.append(self.setToDisplayMode());
        self.titleBox.append(self.enableDisable);
        self.floatBox.append(self.deleteInput);
        self.floatBox.append(self.deleteButton);
        self.titleBox.append(self.floatBox);
        self.boundingBox.append(self.titleBox);
        
        // event box
        self.eventFieldset.append($('<legend></legend>').html('Event'));
        self.eventFieldset.append(self.eventBox);
        self.eventBox.append(self.eventDisplay.construct());
        self.contentBox.append(self.eventFieldset);
        
        // conditions box
        self.conditionsFieldset.append($('<legend></legend>').html('Conditions'));
        self.conditionsFieldset.append(self.conditionsBox);
        self.conditionsBox.append(self.conditionManager.construct());
        self.contentBox.append(self.conditionsFieldset);
        
        // actions box
        self.actionsFieldset.append($('<legend></legend>').html('Actions'));
        self.actionsFieldset.append(self.actionsBox);
        self.actionsBox.append(self.actionManager.construct());
        self.contentBox.append(self.actionsFieldset);
        
        self.contentBox.hide();
        self.boundingBox.append(self.contentBox);
        return self.boundingBox;
    };
    
    this.update = function(ruleObj) {
    
        var oldRuleObj = self.ruleObj;
    
        var oldEnabled = self.ruleObj[APP.API.EVENTS.RULE.ENABLED],
            enabled = ruleObj[APP.API.EVENTS.RULE.ENABLED],
            oldEventObj = self.ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT],
            eventObj = ruleObj[APP.API.EVENTS.RULE.EVENT.EVENT],
            conditionArray = ruleObj[APP.API.EVENTS.RULE.CONDITIONS],
            actionArray = ruleObj[APP.API.EVENTS.RULE.ACTIONS];
        
        this.ruleObj = ruleObj;
        function eventIsChanged() {
            var isChanged = false;
            if(oldEnabled !== enabled) {
                isChanged = true;
            }
            for(var property in oldEventObj) {
                if(oldEventObj.hasOwnProperty(property)) {
                    if(oldEventObj[property] !== eventObj[property]) {
                        isChanged = true;
                    }
                }
            }
            return isChanged;
        }
        self.ruleObj = ruleObj;
        // only update the box and form if data has changed, to minimize disruption to user's editing
        if(eventIsChanged() === true) {
            if(self.isInFormMode === true) {
                self.setToDisplayMode();
                self.ruleName.html(ruleObj[APP.API.EVENTS.RULE.RULE_NAME]);
            }
            enabled === true ? self.enableDisable.addClass(APP.DOM_HOOK.ENABLED) : self.enableDisable.removeClass(APP.DOM_HOOK.ENABLED);
            self.eventDisplay.update();
        }
        var isChanged = false;
        for(var i = 0; i < conditionArray.length; i++) {
            for(var property in oldRuleObj.conditions[i]) {
                if(oldRuleObj.conditions[i].hasOwnProperty(property)) {
                    if(oldRuleObj.conditions[i][property] !== conditionArray[i][property]) {
                        isChanged = true;
                    }
                }
            }
        }
        self.conditionManager.update(conditionArray);
        self.actionManager.update(actionArray);
    };
    
    this.delete = function() {
        self.boundingBox.remove();
    };
    
};

/**
 *
 */
APP.ECANewRuleDisplay = function(ruleManager) {
    var self = this;
    
    this.ruleManager = ruleManager;
    this.boundingBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE + ' ' + APP.DOM_HOOK.ECA.NEW_RULE);
    
    // title box
    this.titleBox;
    this.errorMessage;
    this.input;
    this.addButton;
    
    // content box
    this.contentBox;
    this.eventFieldset;
    this.eventBox;
    this.formBox;
    this.errorMessage;
    this.contentBox;
    this.eventFieldset;
    this.eventBox;
    this.conditionsFieldset;
    this.conditionsBox;
    this.actionsFieldset;
    this.actionsBox;
    this.showHide;
    this.ruleName;
    this.ruleInput;
    this.enableDisable;
    this.editButton;
    this.cancelButton;
    this.saveButton;
    this.deleteInput;
    this.deleteButton;
    
    this.construct = function() {
        
        function setToDisplayMode() {
            self.titleBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE_TITLE);
            self.button = $('<button></button>').html('Add new rule');
            
            self.button.click(function() {
                setToFormMode();
            });
            
            self.titleBox.html('');
            self.boundingBox.html('');
            self.titleBox.append(self.button);
            self.boundingBox.append(self.titleBox);
        }
        
        function setToFormMode() {
        
            function setBridges() {
                var scope = self.scopeField.find('option:selected').val();
                if(scope === 'room' || scope === 'house') {
                    self.bridge2.html('any');
                    self.bridge3.html('in');
                } else if(scope === 'item') {
                    self.bridge2.html('the');
                    self.bridge3.html('');
                }
            }
        
            // title box
            self.titleBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.RULE_TITLE);
            self.errorMessage = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
            self.input = $('<input></input>').attr({type: 'text', placeholder: 'New event name', id: 'eca-add-new-rule-input'});
            self.cancelButton = $('<button>Cancel</button>');
            self.saveButton = $('<button>Save</button>');
            
            // content box
            self.contentBox = $('<div></div>');
            self.eventFieldset = $('<fieldset></fieldset').addClass(APP.DOM_HOOK.ECA.EVENT_FIELDSET);
            self.eventBox = $('<div></div>');
            self.formBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.EVENT);
            
            self.bridge1 = $('<div>When</div>');
            self.bridge2 = $('<div></div>');
            self.itemTypeFieldset = $('<fieldset><legend>Step 1 - Set type</legend></fieldset>');
            self.itemTypeWrapper = $('<div></div>').addClass('select-wrapper');
            self.itemTypeField = $('<select></select>');
            self.bridge3 = $('<div></div>');
            self.scopeFieldset = $('<fieldset><legend>Step 2 - Set scope</legend></fieldset>');
            self.scopeWrapper = $('<div></div>').addClass('select-wrapper');
            self.scopeField = $('<select></select>');
            self.equivalenceFieldset = $('<fieldset><legend>Step 3 - Set equiv</legend></fieldset>');
            self.equivalenceWrapper = $('<div></div>').addClass('select-wrapper');
            self.equivalenceField = $('<select></select>');
            self.stateFieldset = $('<fieldset><legend>Step 4 - Set state</legend></fieldset>');
            self.stateWrapper = $('<div></div>').addClass('select-wrapper');
            self.stateField = $('<select></select>');
            self.editButton = $('<button>Add new condition</button>');
            
            self.cancelButton.click(function() {
                setToDisplayMode();
            });
            
            self.saveButton.click(function() {
                var ruleName    = self.input.val(),
                    enabled     = true,
                    itemType    = self.itemTypeField.find('option:selected').val(),
                    scope       = self.scopeField.find('option:selected').val(),
                    id          = self.scopeField.find('option[value="' + scope + '"]').attr('data-id'),
                    equivalence = self.equivalenceField.find('option:selected').val(),
                    value       = self.stateField.find('option:selected').val();
                
                if(ruleName === '' || /^[\s\t\n\u00A0;]+$/.test(ruleName) === true || /[^]*[;][^]*/.test(ruleName) === true) {
                    self.errorMessage.html('Name cannot be empty, all whitespace, start with whitespace, or contain the semicolon (;).');
                } else {
                    if(itemType === 'undefined' || scope === 'undefined' || equivalence === 'undefined' || value === 'undefined') {
                        self.errorMessage.html('One or more fields are not set.');
                    } else {
                        self.errorMessage.html('');
                        self.formBox.addClass(APP.DOM_HOOK.UPDATING);
                        APP.ajax.post_events(ruleName, enabled, id, itemType, scope, equivalence, value,
                            function() {
                                self.ruleManager.update(function() {
                                    self.formBox.removeClass(APP.DOM_HOOK.UPDATING);
                                    setToDisplayMode();
                                });
                            },
                            function() {
                                // do nothing
                            }
                        );
                    }
                }
            });
            
            self.itemTypeField.click(function() {
                self.populateScopeField();
                self.populateStateField();
            });
            
            self.scopeField.click(function() {
                setBridges();
            });
            
            self.populateItemTypeField();
            self.populateScopeField();
            self.populateEquivalenceField();
            self.populateStateField();
            
            self.titleBox.html('');
            self.boundingBox.html('');
            self.titleBox.append(self.errorMessage);
            self.titleBox.append(self.input);
            self.boundingBox.append(self.titleBox);
            
            self.formBox.append(self.bridge1);
            self.formBox.append(self.bridge2);
            self.formBox.append(self.itemTypeFieldset.append(self.itemTypeWrapper.append(self.itemTypeField)));
            self.formBox.append(self.bridge3);
            self.formBox.append(self.scopeFieldset.append(self.scopeWrapper.append(self.scopeField)));
            self.formBox.append(self.equivalenceFieldset.append(self.equivalenceWrapper.append(self.equivalenceField)));
            self.formBox.append(self.stateFieldset.append(self.stateWrapper.append(self.stateField)));
            self.formBox.append(self.cancelButton);
            self.formBox.append(self.saveButton);
            self.eventBox.append(self.formBox);
            self.eventFieldset.append('<legend>Event</legend>');
            self.eventFieldset.append(self.eventBox);
            self.contentBox.append(self.eventFieldset);
            self.boundingBox.append(self.contentBox);
        }
        
        setToDisplayMode();
        return self.boundingBox;
    };
        
};

/**
 *
 */
APP.ECANewRuleDisplay.prototype.populateItemTypeField = function(selectedItemType) {
    var options;
    
    function getAllTypes(selectedItemType) {
        var itemTypeList = [],
            itemType,
            itemTypeName;
            
        itemTypeList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
        for(var type in APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES]) {
            if(APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES].hasOwnProperty(type)) {
                itemType = type;
                itemTypeName = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][type][APP.API.VERSION.SUPPORTED_TYPE.NAME];
                if(itemType === selectedItemType) {
                    itemTypeList.push($('<option>' + itemTypeName + '</option>').attr({value: itemType, selected: 'selected'}));
                } else {
                    itemTypeList.push($('<option>' + itemTypeName + '</option>').attr({value: itemType}));
                }
            }
        }
        return itemTypeList;
    }

    options = getAllTypes(selectedItemType);
    this.itemTypeField.html('');
    for(var i = 0; i < options.length; i++) {
        this.itemTypeField.append(options[i]);
    }
};

/**
 *
 */
APP.ECANewRuleDisplay.prototype.populateEquivalenceField = function(selectedItemType, selectedEquiv) {
    var self = this,
        options;

    function getItemEquiv(selectedItemType, selectedEquiv) {
        var equivList = [],
            equiv;
        
        equivList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
        equiv = 'is';
        // redo when we implement equivalences
        
        if(equiv === selectedEquiv) {
            equivList.push($('<option>' + equiv + '</option>').attr({value: equiv, selected: 'selected'}));
        } else {
            equivList.push($('<option>' + equiv + '</option>').attr({value: equiv}));
        }
        return equivList;
    }
        
    options = getItemEquiv(selectedItemType, selectedEquiv);
    this.equivalenceField.html('');
    for(var i= 0; i < options.length; i++) {
        this.equivalenceField.append(options[i]);
    }
};

/**
 *
 */
APP.ECANewRuleDisplay.prototype.populateScopeField = function(selectedId, selectedScope) {
    var self = this,
        options;
    
    function getScopes(selectedId, selectedScope) {
        var itemType = self.itemTypeField.children('option:selected').val(),
            scopeList = [],
            roomList = [],
            itemList = [],
            isInRoom = false,
            item,
            itemName,
            itemId,
            room,
            house;
        
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
                        if(selectedId === itemId && selectedScope === 'item') {
                            itemList.push($('<option>' + itemName + ' (' + itemIP + ')' + '</option>').attr({value: 'item', 'data-id': itemId, selected: 'selected'}));
                        } else {
                            itemList.push($('<option>' + itemName + ' (' + itemIP + ')' + '</option>').attr({value: 'item', 'data-id': itemId}));
                        }
                    }
                }
                if(isInRoom === true) {
                    roomName = room[APP.API.STATE.ROOM.NAME];
                    roomId = room[APP.API.STATE.ROOM.ID];
                    if(selectedId === roomId && selectedScope === 'room') {
                        roomList.push($('<option>' + roomName + '</option>').attr({value: 'room', 'data-id': roomId, selected: 'selected'}));
                    } else {
                        roomList.push($('<option>' + roomName + '</option>').attr({value: 'room', 'data-id': roomId}));
                    }
                }
                isInRoom = false;
            }
            
            if(itemList.length !== 0) {
                var items = $('<optgroup></optgroup>').attr({label: 'Items'});
                for(var i = 0; i < itemList.length; i++) {
                    items.append(itemList[i]);
                }
                scopeList.push(items);
            }
            
            if(roomList.length !== 0) {
                var rooms = $('<optgroup></optgroup>').attr({label: 'Rooms'});
                for(var i = 0; i < roomList.length; i++) {
                    rooms.append(roomList[i]);
                }
                scopeList.push(rooms);
            }
            
            house = $('<optgroup></optgroup>').attr({label: 'House'});
            if(selectedScope === 'house') {
                house.append($('<option>the house</option>').attr({value: 'house', 'data-id': 'null', selected: 'selected'}));
            } else {
                house.append($('<option>the house</option>').attr({value: 'house', 'data-id': 'null'}));
            }
            scopeList.push(house);
            
        }
        return scopeList;
    }
    
    options = getScopes(selectedId, selectedScope);
    this.scopeField.html('');
    for(var i = 0; i < options.length; i++) {
        this.scopeField.append(options[i]);
    }
};

/**
 *
 */
APP.ECANewRuleDisplay.prototype.populateStateField = function(selectedStateId) {
    var self = this,
        options;
    
    function getStates(selectedStateId) {
        var itemType = self.itemTypeField.children('option:selected').val(),
            states,
            stateId,
            stateName
            stateList = [];
        
        if(itemType !== 'undefined') {
            states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES];
        } else {
            states = [];
        }
        stateList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
        for(var i = 0; i < states.length; i++) {
            stateId = states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID];
            stateName = states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME];
            if(selectedStateId === stateId) {
                stateList.push($('<option>' + stateName + '</option>').attr({value: stateId, selected: 'selected'}));
            } else {
                stateList.push($('<option>' + stateName + '</option>').attr({value: stateId}));
            }
        }
        return stateList;
    }
    
    options = getStates(selectedStateId);
    this.stateField.html('');
    for(var i = 0; i < options.length; i++) {
        this.stateField.append(options[i]);
    }
    
};

/**
 * @class APP.ECAEventDisplay
 * @constructor
 */
APP.ECAEventDisplay = function(ruleId, ruleDisplay, ruleManager) {
    var self = this,
        itemState,
        scopeName,
        equivalence;
    
    this.isInFormMode;
    
    this.ruleId = ruleId;
    this.ruleDisplay = ruleDisplay;
    this.ruleManager = ruleManager;
    
    this.errorMessage;
    this.bridge1;
    this.bridge2;
    this.itemTypeFieldset;
    this.itemTypeWrapper;
    this.itemTypeField;
    this.bridge3;
    this.scopeFieldset;
    this.scopeWrapper;
    this.scopeField;
    this.equivalenceFieldset;
    this.equivalenceWrapper;
    this.equivalenceField;
    this.stateFieldset;
    this.stateWrapper;
    this.stateField;
    this.editButton;
    this.cancelButton;
    this.saveButton;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.EVENT);
    
    this.setToDisplayMode = function() {
        
        function getEquivalence() {
            equivalence = 'is'; // REDO when implemented equivalences
        }
        
        function getItemState() {
            var states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE]][APP.API.VERSION.SUPPORTED_TYPE.STATES];
            for(var i = 0; i < states.length; i++) {
                if(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.VALUE] === states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID]) {
                    itemState = states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME];
                    break;
                }
            }
        }
        
        function getScopeAndBridges() {
            switch (self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.ACTION.SCOPE]) {
            case 'item':
                self.bridge2.html('');
                self.bridge3.html('');
                for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                    for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS].length; j++) {
                        if(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.ID]) {
                            scopeName = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.NAME];
                            break;
                        }
                    }
                }
                break;
            case 'room':
                self.bridge2.html('any');
                self.bridge3.html('in');
                for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                    if(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ID]) {
                        scopeName = APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.NAME];
                        break;
                    }
                }
                break;
            case 'house':
                self.bridge2.html('any');
                self.bridge3.html('in');
                scopeName = 'the house';
                break;
            }
        }
        
        self.bridge1 = $('<div>When</div>');
        self.bridge2 = $('<div></div>');
        self.itemTypeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.bridge3 = $('<div></div>');
        self.scopeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.equivalenceField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.stateField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.editButton = $('<button>Edit</button>');
        
        self.context.html('');        
        getScopeAndBridges();
        getItemState();
        getEquivalence();
        self.itemTypeField.html(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE]);
        self.scopeField.html(scopeName);
        self.equivalenceField.html(equivalence);
        self.stateField.html(itemState);
        
        self.editButton.click(function() {
            self.setToFormMode();
        });
        
        self.context.append(self.bridge1);
        self.context.append(self.bridge2);
        self.context.append(self.itemTypeField);
        self.context.append(self.bridge3);
        self.context.append(self.scopeField);
        self.context.append(self.equivalenceField);
        self.context.append(self.stateField);
        self.context.append(self.editButton);
    };
    
    this.setToFormMode = function() {
        function setBridges() {
            var scope = self.scopeField.find('option:selected').val();
            if(scope === 'room' || scope === 'house') {
                self.bridge2.html('any');
                self.bridge3.html('in');
            } else if(scope === 'item') {
                self.bridge2.html('the');
                self.bridge3.html('');
            }
        }
        
        self.errorMessage = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY);
        self.bridge1 = $('<div>When</div>');
        self.bridge2 = $('<div></div>');
        self.itemTypeFieldset = $('<fieldset><legend>Step 1 - Set type</legend></fieldset>');
        self.itemTypeWrapper = $('<div></div>').addClass('select-wrapper');
        self.itemTypeField = $('<select></select>');
        self.bridge3 = $('<div></div>');
        self.scopeFieldset = $('<fieldset><legend>Step 2 - Set scope</legend></fieldset>');
        self.scopeWrapper = $('<div></div>').addClass('select-wrapper');
        self.scopeField = $('<select></select>');
        self.equivalenceFieldset = $('<fieldset><legend>Step 3 - Set equiv</legend></fieldset>');
        self.equivalenceWrapper = $('<div></div>').addClass('select-wrapper');
        self.equivalenceField = $('<select></select>');
        self.stateFieldset = $('<fieldset><legend>Step 4 - Set state</legend></fieldset>');
        self.stateWrapper = $('<div></div>').addClass('select-wrapper');
        self.stateField = $('<select></select>');
        self.editButton = $('<button>Add new condition</button>');
        self.cancelButton = $('<button>Cancel</button>');
        self.saveButton = $('<button>Save</button>');
        
        self.context.html('');
        
        self.populateItemTypeField(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE]);
        self.populateScopeField(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ID], self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.ACTION.SCOPE]);
        self.populateEquivalenceField(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE], equivalence);
        self.populateStateField(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.VALUE]);
        setBridges();
        
        self.itemTypeField.click(function() {
            self.populateScopeField(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.ID], self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.ACTION.SCOPE]);
            self.populateStateField(self.ruleDisplay.ruleObj.event[APP.API.EVENTS.RULE.EVENT.VALUE]);
        });
        
        self.scopeField.click(function() {
            setBridges();
        });
        
        self.cancelButton.click(function() {
            self.setToDisplayMode();
        });
        
        self.saveButton.click(function() {
            var eventId     = self.ruleDisplay.ruleObj[APP.API.EVENTS.RULE.RULE_ID],
                ruleName    = self.ruleDisplay.ruleObj[APP.API.EVENTS.RULE.RULE_NAME],
                enabled     = self.ruleDisplay.ruleObj[APP.API.EVENTS.RULE.ENABLED],
                itemType    = self.itemTypeField.find('option:selected').val(),
                scope       = self.scopeField.find('option:selected').val(),
                id          = self.scopeField.find('option[value="' + scope + '"]').attr('data-id'),
                equivalence = self.equivalenceField.find('option:selected').val(),
                value       = self.stateField.find('option:selected').val();
            
            if(itemType === 'undefined' || scope === 'undefined' || equivalence === 'undefined' || value === 'undefined') {
                self.errorMessage.html('One or more fields are not set.');
            } else {
                self.errorMessage.html('');
                self.context.addClass(APP.DOM_HOOK.UPDATING);
                APP.ajax.put_events_eventId(eventId, ruleName, enabled, id, itemType, scope, equivalence, value,
                    function() {
                        self.ruleManager.update(function() {
                            self.context.removeClass(APP.DOM_HOOK.UPDATING);
                            self.setToDisplayMode();
                        });
                    },
                    function() {
                        // do nothing
                    }
                );
            }
        });
        
        self.context.append(self.errorMessage);
        self.context.append(self.bridge1);
        self.context.append(self.bridge2);
        self.context.append(self.itemTypeFieldset.append(self.itemTypeWrapper.append(self.itemTypeField)));
        self.context.append(self.bridge3);
        self.context.append(self.scopeFieldset.append(self.scopeWrapper.append(self.scopeField)));
        self.context.append(self.equivalenceFieldset.append(self.equivalenceWrapper.append(self.equivalenceField)));
        self.context.append(self.stateFieldset.append(self.stateWrapper.append(self.stateField)));
        self.context.append(self.cancelButton);
        self.context.append(self.saveButton);
    };
    
    this.update = this.setToDisplayMode;
    
    this.construct = function() {
        self.setToDisplayMode();
        return this.context;
    };
        
};
APP.inherit(APP.ECAEventDisplay, APP.ECANewRuleDisplay);



/**
 *
 */
APP.ECAConditionManager = function(ruleId, conditionArray, ruleManager) {
    var self = this;
    
    this.ruleId = ruleId;
    this.conditionArray = conditionArray;
    this.ruleManager = ruleManager;
    
    this.conditionDisplays = [];
    for(var i = 0; i < this.conditionArray.length; i++) {
        this.conditionDisplays.push(new APP.ECAConditionDisplay(ruleId, conditionArray[i], this.ruleManager));
    }
    this.newConditionDisplay = new APP.ECANewConditionDisplay(ruleId, this.ruleManager);
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.CONDITION);
    
    this.addECAConditionDisplays = function(conditionArray) {
        var conditionDisplay;
        
        for(var i = 0; i < conditionArray.length; i++) {
            conditionDisplay = new APP.ECAConditionDisplay(self.ruleId, conditionArray[i], self.ruleManager);
            self.conditionDisplays.push(conditionDisplay);
            self.context.append(conditionDisplay.construct());
        }
        // move the newConditionDisplay to the bottom
        if(conditionArray.length !== 0) {
            self.context.append(self.newConditionDisplay.context);
        }
    };
    
    this.removeECAConditionDisplay = function(conditionId) {
        for(var i = 0; i < self.conditionDisplays.length; i++) {
            if(self.conditionDisplays[i].conditionObj[APP.API.EVENTS.RULE.CONDITION.CONDITION_ID] === conditionId) {
                self.conditionDisplays[i].delete();
                self.conditionDisplays.splice(i, 1);
                break;
            }
        }
    };
    
    this.construct = function() {
        for(var i = 0; i < self.conditionDisplays.length; i++) {
            self.context.append(self.conditionDisplays[i].construct());
        }
        self.context.append(self.newConditionDisplay.construct());
        return self.context;
    };
    
    this.update = function(conditionArray) {
        var ruleId,
            conditions,
            conditionsCopy,
            conditionsCopyLength,
            conditionDisplaysCopy,
            conditionDisplaysCopyLength;
        
        conditions = conditionArray,
        conditionsCopy = conditions.slice(0),
        conditionsCopyLength = conditionsCopy.length,
        conditionDisplays = this.conditionDisplays,
        conditionDisplaysCopy = conditionDisplays.slice(0),
        conditionDisplaysCopyLength = conditionDisplays.length;
        
        for(var i = 0; i < conditionDisplaysCopyLength; i++) {
            inner:
            for(var j = 0; j < conditionsCopyLength; j++) {
                if(conditionDisplaysCopy[i].conditionObj[APP.API.EVENTS.RULE.CONDITION.CONDITION_ID] === conditionsCopy[j][APP.API.EVENTS.RULE.CONDITION.CONDITION_ID]) {
                    conditionDisplaysCopy[i].update(conditionsCopy[j]);
                    conditionDisplaysCopy.splice(i, 1);
                    conditionsCopy.splice(j, 1);
                    conditionDisplaysCopyLength = conditionDisplaysCopy.length;
                    conditionsCopyLength = conditionsCopy.length;
                    i--;
                    j--;
                    break inner;
                }
            }
        }
        
        // If there are any unmatched conditionDisplays, it means they need to be removed
        for(var i = 0; i < conditionDisplaysCopy.length; i++) {
            self.removeECAConditionDisplay(conditionDisplaysCopy[i].conditionObj[APP.API.EVENTS.RULE.CONDITION.CONDITION_ID]);
        }
        
        // If there are any unmatched conditions, it means they need to be added
        self.addECAConditionDisplays(conditionsCopy);
        
    };
    
};

/**
 * @class APP.ECAConditionNode
 * @constructor
 */
APP.ECAConditionDisplay = function(ruleId, conditionObj, ruleManager) {

    var self = this,
        itemId,
        itemName,
        equivalence,
        state;
    
    this.ruleId = ruleId;
    this.conditionObj = conditionObj;
    this.ruleManager = ruleManager;
    
    this.errorMessage;
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
    this.floatBox;
    this.deleteButton;
    this.saveButton;
    this.cancelButton;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.CONDITION_DISPLAY);
    
    this.setToDisplayMode = function() {
        function getStateDisplay() {
            var states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][self.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE]][APP.API.VERSION.SUPPORTED_TYPE.STATES];
            for(var i = 0; i < states.length; i++) {
                if(self.conditionObj[APP.API.EVENTS.RULE.CONDITION.VALUE] === states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID]) {
                    state = states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME];
                    break;
                }
            }
        }
        
        function getItemNameDisplay() {
            var rooms,
                items;
            rooms = APP.data.houseStructure[APP.API.STATE.ROOMS];
            for(var i = 0; i < rooms.length; i++) {
                items = rooms[i][APP.API.STATE.ROOM.ITEMS];
                for(var j = 0; j < items.length; j++) {
                    if(self.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_ID] === items[j][APP.API.STATE.ROOM.ITEM.ID]) {
                        itemName = items[j][APP.API.STATE.ROOM.ITEM.NAME];
                        break;
                    }
                }
            }
        }
        
        function getEquivalence() {
            equivalence = 'is'; // change when we implement equivalences
        }
        
        self.bridge1 = $('<div>If</div>');
        self.itemNameField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.equivalenceField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.stateField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.editButton = $('<button>Edit</button>');
        self.floatBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.DELETE);
        self.deleteButton = $('<button>Delete</button>');
        getEquivalence();
        getStateDisplay();
        getItemNameDisplay();
        
        self.context.html('');

        self.editButton.click(function() {
            self.setToFormMode();
        });
        
        self.deleteButton.click(function() {
            var eventId = self.ruleId,
                conditionId = self.conditionObj[APP.API.EVENTS.RULE.CONDITION.CONDITION_ID];
            self.context.addClass(APP.DOM_HOOK.UPDATING);
            APP.ajax.delete_events_eventId_conditions_conditionId(eventId, conditionId,
                function() {
                    self.ruleManager.update(function() {
                        self.context.removeClass(APP.DOM_HOOK.UPDATING);
                    });
                },
                function() {
                    // do nothing
                }
            );
        });
        
        self.context.append(self.bridge1);
        self.context.append(self.itemNameField.append(itemName));
        self.context.append(self.equivalenceField.append(equivalence));
        self.context.append(self.stateField.append(state));
        self.context.append(self.editButton);
        self.floatBox.append(self.deleteButton);
        self.context.append(self.floatBox);
        
    };
    
    this.setToFormMode = function() {
        self.errorMessage = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY),
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
        self.editButton = $('<button>Add new condition</button>'),
        self.cancelButton = $('<button>Cancel</button>'),
        self.saveButton = $('<button>Save</button>');
        
        self.context.html('');
        
        self.populateItemField(self.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_ID]);
        self.populateEquivalenceField(self.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE], equivalence);
        self.populateStateField(self.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE], self.conditionObj[APP.API.EVENTS.RULE.CONDITION.VALUE]);

        self.itemField.click(function() {
            self.populateEquivalenceField(self.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE], equivalence);
            self.populateStateField(self.conditionObj[APP.API.EVENTS.RULE.CONDITION.ITEM_TYPE], self.conditionObj[APP.API.EVENTS.RULE.CONDITION.VALUE]);
        });
        
        self.cancelButton.click(function() {
            self.setToDisplayMode();
        });
        
        self.saveButton.click(function() {
            var ruleId = self.ruleId,
                conditionId = self.conditionObj[APP.API.EVENTS.RULE.CONDITION.CONDITION_ID],
                itemId = self.itemField.children('option:selected').val(),
                equivalence = self.equivalenceField.children('option:selected').val(),
                state = self.stateField.children('option:selected').val();
            if(itemId === 'undefined' || equivalence === 'undefined' || state === 'undefined') {
                self.errorMessage.html('One or more fields are not set.');
            } else {
                self.errorMessage.html('');
                self.context.addClass(APP.DOM_HOOK.UPDATING);
                APP.ajax.put_events_eventId_conditions_conditionId(ruleId, conditionId, itemId, equivalence, state,
                    function() {
                        self.ruleManager.update(function() {
                            self.context.removeClass(APP.DOM_HOOK.UPDATING);
                        });
                    },
                    function() {
                        // do nothing
                    }
                );
            }
        });
        
        self.context.append(self.errorMessage);
        self.context.append(self.bridge1);
        self.context.append(self.itemFieldset.append(self.itemWrapper.append(self.itemField)));
        self.context.append(self.equivalenceFieldset.append(self.equivalenceWrapper.append(self.equivalenceField)));
        self.context.append(self.stateFieldset.append(self.stateWrapper.append(self.stateField)));
        self.context.append(self.cancelButton);
        self.context.append(self.saveButton);
        
    };
    
    this.construct = function() {
        self.setToDisplayMode();
        return this.context;
    };
    
    this.update = function(conditionObj) {
        var isChanged = false;
        for(var property in self.conditionObj) {
            if(self.conditionObj.hasOwnProperty(property)) {
                if(self.conditionObj[property] !== conditionObj[property]) {
                    isChanged = true;
                }
            }
        }
        if(isChanged === true) {
            self.conditionObj = conditionObj;
            self.setToDisplayMode();
        }
    };
    
    this.delete = function() {
        self.context.remove();
    };
    
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.populateItemField = function(selectedItemId) {
    var self = this,
        options;
        
    function getAllItems(selectedItemId) {
        var itemList = [],
            rooms,
            item,
            itemId,
            itemIP,
            itemName,
            itemType;
        
        itemList.push($('<option>(Not set)</option>').attr({value: 'undefined', 'data-itemType': 'undefined'}));
        rooms = APP.data.houseStructure[APP.API.STATE.ROOMS];
        for(var i = 0; i < rooms.length; i++) {
            items = rooms[i][APP.API.STATE.ROOM.ITEMS];
            for(var j = 0; j < items.length; j++) {
                itemId = items[j][APP.API.STATE.ROOM.ITEM.ID];
                itemIP = items[j][APP.API.STATE.ROOM.ITEM.IP];
                itemName = items[j][APP.API.STATE.ROOM.ITEM.NAME];
                itemType = items[j][APP.API.STATE.ROOM.ITEM.ITEM_TYPE];
                if(itemId === selectedItemId) {
                    itemList.push($('<option>' + itemName + ' (' + itemIP + ')' + '</option>').attr({value: itemId, 'data-itemtype': itemType, selected: 'selected'}));
                } else {
                    itemList.push($('<option>' + itemName + ' (' + itemIP + ')' + '</option>').attr({value: itemId, 'data-itemtype': itemType}));
                }
            }
        }
        return itemList;
    }

    options = getAllItems(selectedItemId);
    this.itemField.html('');
    for(var i = 0; i < options.length; i++) {
        this.itemField.append(options[i]);
    }
};

/**
 *
 */
APP.ECAConditionDisplay.prototype.populateEquivalenceField = APP.ECAEventDisplay.prototype.populateEquivalenceField;

/**
 *
 */
APP.ECAConditionDisplay.prototype.populateStateField = function(selectedItemType, selectedStateId) {
    var self = this,
        options;

    function getItemState(selectedItemType, selectedStateId) {
        var itemId = self.itemField.children('option:selected').val(),
            itemType = self.itemField.find('option[value=' + itemId + ']').attr('data-itemtype'),
            states,
            stateName,
            stateId,
            stateList = [];
        
        stateList.push($('<option>(Not set)</option>').attr({value: 'undefined'}));
        if(itemType !== 'undefined') {
            states = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][itemType][APP.API.VERSION.SUPPORTED_TYPE.STATES];
            for(var i = 0; i < states.length; i++) {
                stateName = states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.NAME];
                stateId = states[i][APP.API.VERSION.SUPPORTED_TYPE.STATE.ID];
                if(stateId === selectedStateId && itemType === selectedItemType) {
                    stateList.push($('<option>' + stateName + '</option>').attr({value: stateId, selected: 'selected'}));
                } else {
                    stateList.push($('<option>' + stateName + '</option>').attr({value: stateId}));
                }
            }
        }
        return stateList;
    }
        
    options = getItemState(selectedItemType, selectedStateId);
    this.stateField.html('');
    for(var i = 0; i < options.length; i++) {
        this.stateField.append(options[i]);
    }
};

/**
 *
 */
APP.ECANewConditionDisplay = function(ruleId, ruleManager) {
    var self = this;
    
    this.ruleId = ruleId;
    this.ruleManager = ruleManager;
    
    this.errorMessage;
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
    
    this.setToDisplayMode = function() {
        self.addButton = $('<button>Add new condition</button>');
        
        self.context.html('');
        
        self.addButton.click(function() {
            self.setToFormMode();
        });
        
        self.context.append(self.addButton);
    };
    
    this.setToFormMode = function() {
        self.errorMessage = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY),
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
        self.cancelButton = $('<button>Cancel</button>'),
        self.saveButton = $('<button>Save</button>');
        
        self.context.html('');
        self.populateItemField();
        self.populateEquivalenceField();
        self.populateStateField();
        
        self.itemField.click(function() {
            self.populateEquivalenceField();
            self.populateStateField();
        });
        
        self.cancelButton.click(function() {
            self.setToDisplayMode();
        });
        
        self.saveButton.click(function() {
            var dis = $(this),
                ruleId = self.ruleId,
                itemId = self.itemField.children('option:selected').val(),
                equivalence = self.equivalenceField.children('option:selected').val(),
                state = self.stateField.children('option:selected').val();
            if(itemId === 'undefined' || equivalence === 'undefined' || state === 'undefined') {
                self.errorMessage.html('One or more fields are not set.');
            } else {
                self.errorMessage.html('');
                dis.parent().addClass(APP.DOM_HOOK.UPDATING);
                 APP.ajax.post_events_eventId_conditions(ruleId, itemId, equivalence, state,
                    function() {
                        self.ruleManager.update(function() {
                            self.context.removeClass(APP.DOM_HOOK.UPDATING);
                            self.setToDisplayMode();
                        });
                    },
                    function() {
                        // do nothing
                    }
                );
            }
        });
        
        self.context.append(self.errorMessage);
        self.context.append(self.bridge1);
        self.context.append(self.itemFieldset.append(self.itemWrapper.append(self.itemField)));
        self.context.append(self.equivalenceFieldset.append(self.equivalenceWrapper.append(self.equivalenceField)));
        self.context.append(self.stateFieldset.append(self.stateWrapper.append(self.stateField)));
        self.context.append(self.cancelButton);
        self.context.append(self.saveButton);
        
    };
    
    this.construct = function() {
        self.setToDisplayMode();
        return this.context;
    };
        
    this.delete = function() {
    
    };
    
};
APP.inherit(APP.ECANewConditionDisplay, APP.ECAConditionDisplay);



/**
 *
 */
APP.ECAActionManager = function(ruleId, actionArray, ruleManager) {
    var self = this;
    
    this.ruleId = ruleId;
    this.actionArray = actionArray;
    this.ruleManager = ruleManager;
    
    this.actionDisplays = [];
    for(var i = 0; i < this.actionArray.length; i++) {
        this.actionDisplays.push(new APP.ECAActionDisplay(ruleId, this.actionArray[i], self.ruleManager));
    }
    this.newActionDisplay = new APP.ECANewActionDisplay(ruleId, self.ruleManager);
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.ACTION);
    
    this.addECAActionDisplays = function(actionArray) {
        var actionDisplay;
        
        for(var i = 0; i < actionArray.length; i++) {
            actionDisplay = new APP.ECAActionDisplay(self.ruleId, actionArray[i], self.ruleManager);
            self.actionDisplays.push(actionDisplay);
            self.context.append(actionDisplay.construct());
        }
        // move the newConditionDisplay to the bottom
        if(actionArray.length !== 0) {
            self.context.append(self.newActionDisplay.context);
        }
    };
    
    this.removeECAActionDisplay = function(actionId) {
        for(var i = 0; i < self.actionDisplays.length; i++) {
            if(self.actionDisplays[i].actionObj[APP.API.EVENTS.RULE.ACTION.ACTION_ID] === actionId) {
                self.actionDisplays[i].delete();
                self.actionDisplays.splice(i, 1);
                break;
            }
        }
    };
    
    this.construct = function() {
        for(var i = 0; i < self.actionArray.length; i++) {
            self.context.append(self.actionDisplays[i].construct());
        }
        self.context.append(self.newActionDisplay.construct());
        return self.context;
    };
    
    this.update = function(actionArray) {
        var ruleId,
            actions,
            actionsCopy,
            actionsCopyLength,
            actionDisplaysCopy,
            actionDisplaysCopyLength;
        
        actions = actionArray,
        actionsCopy = actions.slice(0),
        actionsCopyLength = actionsCopy.length,
        actionDisplays = this.actionDisplays,
        actionDisplaysCopy = actionDisplays.slice(0),
        actionDisplaysCopyLength = actionDisplays.length;
        
        for(var i = 0; i < actionDisplaysCopyLength; i++) {
            inner:
            for(var j = 0; j < actionsCopyLength; j++) {
                if(actionDisplaysCopy[i].actionObj[APP.API.EVENTS.RULE.ACTION.ACTION_ID] === actionsCopy[j][APP.API.EVENTS.RULE.ACTION.ACTION_ID]) {
                    actionDisplaysCopy[i].update(actionsCopy[j]);
                    actionDisplaysCopy.splice(i, 1);
                    actionsCopy.splice(j, 1);
                    actionDisplaysCopyLength = actionDisplaysCopy.length;
                    actionsCopyLength = actionsCopy.length;
                    i--;
                    j--;
                    break inner;
                }
            }
        }
        
        // If there are any unmatched actionDisplays, it means they need to be removed
        for(var i = 0; i < actionDisplaysCopy.length; i++) {
            self.removeECAActionDisplay(actionDisplaysCopy[i].actionObj[APP.API.EVENTS.RULE.ACTION.ACTION_ID]);
        }
        
        // If there are any unmatched actions, it means they need to be added
        self.addECAActionDisplays(actionsCopy);
        
    };
    
};

/**
 * @class APP.ECAActionNode
 * @constructor
 */
APP.ECAActionDisplay = function(ruleId, actionObj, ruleManager) {
    
    var self = this;
    
    this.ruleId = ruleId;
    this.actionObj = actionObj;
    this.ruleManager = ruleManager;
    
    this.errorMessage;
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
    this.floatBox;
    this.deleteButton;
    this.addButton;
    this.cancelButton;
    this.context = $('<div></div>').addClass(APP.DOM_HOOK.ECA.ACTION_DISPLAY);
    
    this.setToDisplayMode = function() {
    
        function getMethodField() {
            self.methodField.html(self.actionObj[APP.API.EVENTS.RULE.ACTION.METHOD]);
        }
        
        function getItemTypeField() {
            itemType = self.actionObj[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE];
            self.itemTypeField.html(itemType);
        }
        
        function getScopeFieldAndBridges() {
            switch (self.actionObj[APP.API.EVENTS.RULE.ACTION.SCOPE]) {
            case 'item':
                for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                    for(var j = 0; j < APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS].length; j++) {
                        if(self.actionObj[APP.API.EVENTS.RULE.ACTION.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.ID]) {
                            self.scopeField.html(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ITEMS][j][APP.API.STATE.ROOM.ITEM.NAME]);
                            break;
                        }
                    }
                }
                self.bridge1.html('the');
                self.bridge2.html('');
                break;
            case 'room':
                for(var i = 0; i < APP.data.houseStructure[APP.API.STATE.ROOMS].length; i++) {
                    if(self.actionObj[APP.API.EVENTS.RULE.ACTION.ID] === APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.ID]) {
                        self.scopeField.html(APP.data.houseStructure[APP.API.STATE.ROOMS][i][APP.API.STATE.ROOM.NAME]);
                        break;
                    }
                }
                break;
            case 'house':
                self.scopeField.html('the house');
                break;
            }
        }
        
        self.methodField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.bridge1 = $('<div>all</div>');
        self.itemTypeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.bridge2 = $('<div>s&nbsp;&nbsp;in</div>');
        self.scopeField = $('<div></div>').addClass(APP.DOM_HOOK.ECA.FIELD_DIV);
        self.editButton = $('<button>Edit</button>');
        self.floatBox = $('<div></div>').addClass(APP.DOM_HOOK.ECA.DELETE);
        self.deleteButton = $('<button>Delete</button>');
        
        self.context.html('');
        
        self.editButton.click(function() {
            self.setToFormMode();
        });
        
        self.deleteButton.click(function() {
            var eventId = self.ruleId,
                actionId = self.actionObj[APP.API.EVENTS.RULE.ACTION.ACTION_ID];
            self.context.addClass(APP.DOM_HOOK.UPDATING);
            APP.ajax.delete_events_eventId_actions_actionId(eventId, actionId,
                function() {
                    self.ruleManager.update(function() {
                        self.context.removeClass(APP.DOM_HOOK.UPDATING);
                    });
                },
                function() {
                    // do nothing
                }
            );
        });
        
        getMethodField();
        getItemTypeField();
        getScopeFieldAndBridges();
        
        self.context.append(self.methodField);
        self.context.append(self.bridge1);
        self.context.append(self.itemTypeField);
        self.context.append(self.bridge2);
        self.context.append(self.scopeField);
        self.context.append(self.editButton);
        self.floatBox.append(self.deleteButton);
        self.context.append(self.floatBox);
    };
    
    this.setToFormMode = function() {
        
        function setBridges() {
            var scope = self.scopeField.find('option:selected').val();
            if(scope === 'room' || scope === 'house') {
                self.bridge1.html('all');
                self.bridge2.html('s&nbsp;&nbsp;in');
            } else if(scope === 'item') {
                self.bridge1.html('the');
                self.bridge2.html('');
            } else {
                self.bridge1.html('');
                self.bridge2.html('');
            }
        }
        
        self.errorMessage = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY),
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
        self.cancelButton = $('<button>Cancel</button>'),
        self.saveButton = $('<button>Save</button>');
        
        self.context.html('');
        self.populateItemTypeField(self.actionObj[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE]);
        self.populateScopeField(self.actionObj[APP.API.EVENTS.RULE.ACTION.ACTION_ID], self.actionObj[APP.API.EVENTS.RULE.ACTION.SCOPE]);
        self.populateMethodField(self.actionObj[APP.API.EVENTS.RULE.ACTION.METHOD]);
        setBridges();
        
        self.itemTypeField.click(function() {
            self.populateScopeField(self.actionObj[APP.API.EVENTS.RULE.ACTION.ACTION_ID], self.actionObj[APP.API.EVENTS.RULE.ACTION.SCOPE]);
            self.populateMethodField(self.actionObj[APP.API.EVENTS.RULE.ACTION.METHOD]);
        });
        
        self.scopeField.click(function() {
            setBridges();
        });
        
        self.cancelButton.click(function() {
            self.setToDisplayMode();
        });
        
        self.saveButton.click(function() {
            var ruleId = self.ruleId,
                actionId = self.actionObj[APP.API.EVENTS.RULE.ACTION.ACTION_ID],
                scope = self.scopeField.find('option:selected').val(),
                id = self.scopeField.find('option:selected').attr('data-id'),
                itemType = self.itemTypeField.find('option:selected').val(),
                method = self.methodField.find('option:selected').val();
            if(scope === 'undefined' || itemType === 'undefined' || method === 'undefined') {
                self.errorMessage.html('One or more fields are not defined.');
            } else {
                self.errorMessage.html('');
                self.context.addClass(APP.DOM_HOOK.UPDATING);
                APP.ajax.put_events_eventId_actions_actionId(ruleId, actionId, id, scope, itemType, method,
                    function() {
                        self.ruleManager.update(function() {
                            self.context.removeClass(APP.DOM_HOOK.UPDATING);
                            self.setToDisplayMode();
                        });
                    },
                    function() {
                        // do nothing
                    }
                );
            }
        });
        
        self.context.append(self.errorMessage);
        self.context.append(self.methodFieldset.append(self.methodWrapper.append(self.methodField)));
        self.context.append(self.bridge1);
        self.context.append(self.itemTypeFieldset.append(self.itemTypeWrapper.append(self.itemTypeField)));
        self.context.append(self.bridge2);
        self.context.append(self.scopeFieldset.append(self.scopeWrapper.append(self.scopeField)));
        self.context.append(self.cancelButton);
        self.context.append(self.saveButton);
    };
    
    this.construct = function() {
        self.setToDisplayMode();
        return this.context;
    };
    
    this.update = function(actionObj) {
        var isChanged = false;
        for(var property in self.actionObj) {
            if(self.actionObj.hasOwnProperty(property)) {
                if(self.actionObj[property] !== actionObj[property]) {
                    isChanged = true;
                }
            }
        }
        if(isChanged === true) {
            self.actionObj = actionObj;
            self.setToDisplayMode();
        }
    };
    
    this.delete = function() {
        self.context.remove();
    };
    
};

/**
 *
 */
APP.ECAActionDisplay.prototype.populateItemTypeField = APP.ECAEventDisplay.prototype.populateItemTypeField;

/**
 *
 */
APP.ECAActionDisplay.prototype.populateScopeField = APP.ECAEventDisplay.prototype.populateScopeField;

/**
 *
 */
APP.ECAActionDisplay.prototype.populateMethodField = function(selectedItemType) {
    var self = this,
        options;
    
    function getMethods(selectedMethod) {
        var itemType = self.itemTypeField.children('option:selected').val(),
            methodList = [],
            method;
        self.methodField.html('');
        methodList.push($('<option>(Not set)</option>').attr({val: 'undefined'}));
        if(itemType !== 'undefined') {
            for(var type in APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES]) {
                if(APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES].hasOwnProperty(type) && type === itemType) {
                    for(var i = 0; i < APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][type][APP.API.VERSION.SUPPORTED_TYPE.METHODS].length; i++) {
                        method = APP.data.cache[APP.API.VERSION.SUPPORTED_TYPES][type][APP.API.VERSION.SUPPORTED_TYPE.METHODS][i];
                        if(method === selectedMethod) {
                            methodList.push($('<option>' + method + '</option>').attr({value: method, selected: 'selected'}));
                        } else {
                            methodList.push($('<option>' + method + '</option>').attr({value: method}));
                        }
                    }
                    break;
                }
            }
        }
        return methodList;
    }

    options = getMethods(selectedItemType);
    this.methodField.html('');
    for(var i = 0; i < options.length; i++) {
        this.methodField.append(options[i]);
    }
};

/**
 *
 */
APP.ECANewActionDisplay = function(ruleId, ruleManager) {
    var self = this;
    
    this.ruleId = ruleId;
    this.ruleManager =ruleManager;
    
    this.errorMessage;
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
    
    this.setToDisplayMode = function() {
        self.addButton = $('<button>Add new action</button>');
        
        self.context.html('');
        self.addButton.click(function() {
            self.setToFormMode();
        });
        
        self.context.append(self.addButton);
    };
    
    this.setToFormMode = function() {
        self.errorMessage = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY),
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
        self.cancelButton = $('<button>Cancel</button>'),
        self.saveButton = $('<button>Save</button>');
        
        self.context.html('');
        self.populateItemTypeField();
        self.populateScopeField();
        self.populateMethodField();
        
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
        
        self.cancelButton.click(function() {
            self.setToDisplayMode();
        });
        
        self.saveButton.click(function() {
            var ruleId = self.ruleId,
                scope = self.scopeField.find('option:selected').val(),
                id = self.scopeField.find('option:selected').attr('data-id'),
                itemType = self.itemTypeField.find('option:selected').val(),
                method = self.methodField.find('option:selected').val();
            if(scope === 'undefined' || itemType === 'undefined' || method === 'undefined') {
                self.errorMessage.html('One or more fields are not defined.');
            } else {
                self.errorMessage.html('');
                self.context.addClass(APP.DOM_HOOK.UPDATING);
                APP.ajax.post_events_eventId_actions(ruleId, id, scope, itemType, method,
                    function() {
                        self.ruleManager.update(function() {
                            self.context.removeClass(APP.DOM_HOOK.UPDATING);
                            self.setToDisplayMode();
                        });
                    },
                    function() {
                        // do nothing
                    }
                );
            }
        });
        
        self.context.append(self.errorMessage);
        self.context.append(self.methodFieldset.append(self.methodWrapper.append(self.methodField)));
        self.context.append(self.bridge1);
        self.context.append(self.itemTypeFieldset.append(self.itemTypeWrapper.append(self.itemTypeField)));
        self.context.append(self.bridge2);
        self.context.append(self.scopeFieldset.append(self.scopeWrapper.append(self.scopeField)));
        self.context.append(self.cancelButton);
        self.context.append(self.saveButton);
    };
    
    this.construct = function() {        
        self.setToDisplayMode();
        return this.context;
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
            // console.warn('WARNING: ' + stage.buttonId + ' already exists! Button remapped.');
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
            if(stage.constructing !== true) {
                $(this).toggleClass('selected');
                // toggle sibling buttons
                $(primaryButtonSelector).not($(this)).removeClass('selected');
                $(secondaryButtonSelector).not($(this)).removeClass('selected');
                // toggle stages
                stageManager.toggleStage(stage.stageId);
            } else {
                console.warn('Stage ' + stage.stageId + ' is still constructing! Button press ignored');
                return false;
            }
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
            'button-plugins': {
                menuId: null,
                buttonText: 'Plugins',
                class: 'blue',
                buttons: {}
            },
            'button-logs': {
                menuId: 'menu-logs',
                buttonText: 'Logs',
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
    this.stages = stages;
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
        console.log(activeStageId);
        console.log(stage.stageId);
        if(activeStageId === stage.stageId) {
            this.toggleStage(null);
        }
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
        stage.setMenuUpdate(function() {
            // default
        });
        stage.setConstruct(function() {
            stage.ready();
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
        stage.setMenuUpdate(function() {
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
                if(roomName === '' || /^[\s\t\n\u00A0;]+$/.test(roomName) === true || /[^]*[;][^]*/.test(roomName) === true) {
                    warning.html('Name cannot be empty, all whitespace, start with whitespace, or contain the semicolon (;).');
                } else {
                    dis.parent().addClass(APP.DOM_HOOK.UPDATING);
                    APP.ajax.post_rooms(roomName,
                        function(json) {
                            APP.ajax.get_state(
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
            stage.ready();
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
        
        function updateItemTypes() {
            var items = getRoom(roomId)[APP.API.STATE.ROOM.ITEMS],
                item,
                itemTypes = {},
                itemTypesCopy = {},
                itemType,
                oldItems = stage.data.items,
                isEqual = true;
            
            stage.data.items = items;
            if(oldItems !== undefined) {
                if(stage.data.items.length !== oldItems.length) {
                    isEqual = false;
                } else {
                    for(var i = 0; i < oldItems.length; i++) {
                        if(stage.data.items[i][APP.API.STATE.ROOM.ITEM.ID] !== oldItems[i][APP.API.STATE.ROOM.ITEM.ID]) {
                            isEqual = false;
                            break;
                        }
                    }
                }
            }
            
            for(var prop in itemTypes) {
                if(itemTypes.hasOwnProperty(prop)) {
                    itemTypesCopy[prop] = itemTypes[prop];
                }
            }
            
            for(var j = 0; j < items.length; j++) {
                item = items[j];
                itemType = item[APP.API.STATE.ROOM.ITEM.ITEM_TYPE];
                if(itemTypes[itemType] === undefined) {
                    itemTypes[itemType] = [];
                } else {
                    delete itemTypesCopy[itemType];
                }
                itemTypes[itemType].push(item);
            }
            
            for(var prop in itemTypesCopy[prop]) {
                if(itemTypesCopy.hasOwnProperty(prop)) {
                    delete itemTypes[prop];
                }
            }
            stage.data.itemTypes = itemTypes;
            return isEqual;
        }
        
        function constructItemTypeDisplays(itemTypes) {
            for(var type in itemTypes) {
                if(itemTypes.hasOwnProperty(type)) {
                    stage.data.itemTypeDisplays[type] = new APP.ItemTypeDisplay(stage, type, getRoom(roomId));
                    stage.data.itemTypeDisplays[type].construct();
                }
            }
        }
        
        function updateItemTypeDisplays() {
            var itemTypes = {},
                displays = {};
            
            for(var prop in stage.data.itemTypes) {
                if(stage.data.itemTypes.hasOwnProperty(prop)) {
                    itemTypes[prop] = stage.data.itemTypes[prop];
                }
            }
            
            for(var prop in stage.data.itemTypeDisplays) {
                if(stage.data.itemTypeDisplays.hasOwnProperty(prop)) {
                    displays[prop] = stage.data.itemTypeDisplays[prop];
                }
            }
            
            for(var prop in stage.data.itemTypes) {
                if(stage.data.itemTypes.hasOwnProperty(prop)) {
                    if(stage.data.itemTypeDisplays[prop] !== undefined) {
                        stage.data.itemTypeDisplays[prop].update();
                        delete displays[prop];
                    }
                }
            }
            // what's left in displays need to be removed
            
            for(var prop in stage.data.itemTypeDisplays) {
                if(stage.data.itemTypeDisplays.hasOwnProperty(prop)) {
                    delete itemTypes[prop];
                }
            }
            // what's left in itemTypes need to be constructed
            
            for(var prop in displays) {
                if(displays.hasOwnProperty(prop)) {
                    stage.data.itemTypeDisplays[prop].remove();
                }
            }
            
            for(var prop in itemTypes) {
                if(itemTypes.hasOwnProperty(prop)) {
                    stage.data.itemTypeDisplays[prop] = new APP.ItemTypeDisplay(stage, prop, getRoom(roomId));
                    stage.data.itemTypeDisplays[prop].construct();
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
                    if(addRoomName === '' || /^[\s\t\n\u00A0;]+$/.test(addRoomName) === true || /[^]*[;][^]*/.test(addRoomName) === true) {
                        addWarning.html('Name cannot be empty, all whitespace, start with whitespace, or contain the semicolon (;).');
                    } else {
                        $(this).parent().addClass(APP.DOM_HOOK.UPDATING);
                        APP.ajax.post_rooms(addRoomName,
                            function(json) {
                                APP.ajax.get_state(
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
                        APP.ajax.delete_rooms_roomId(
                            stage.data.roomId,
                            function(json) {
                                APP.ajax.get_state(
                                    function() {
                                        if(APP.data.houseStructure[APP.API.STATE.ROOMS].length === 0) {
                                            self.setStage_NoRoom();
                                        }
                                        dis.parent().removeClass(APP.DOM_HOOK.UPDATING);
                                        stage.update();
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
                    
                itemsPanel.append($('<h2></h2>').html('Item manager'));
                
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
                    if(targetName === '' || /^[\s\t\n\u00A0;]+$/.test(targetName) === true || /[^]*[;][^]*/.test(targetName) === true) {
                        addWarningName.html('Name cannot be empty, all whitespace, start with whitespace, or contain the semicolon (;).');
                    } else {
                        addWarningName.html('');
                    }
                    
                    // perform IP check
                    targetIP = $('#' + addInputIPSelector).val();
                    // regex from http://stackoverflow.com/questions/10006459/regular-expression-for-ip-address-validation
                    /*
                    if(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/.test(targetIP) === true) {
                    */
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
                            APP.ajax.post_rooms_roomId_items(roomId, targetBrand, targetIP, targetName, targetType,
                                function(json) {
                                    var obj = APP.unpackToPayload(json),
                                        newItemId = obj[APP.API.ITEMS.ITEM_ID],
                                        hasSameType = false;
                                    
                                    // AJAX call
                                    APP.ajax.get_state(
                                        function() {
                                            self.parent().removeClass(APP.DOM_HOOK.UPDATING);
                                            stage.update();
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
                            addWarningIP.html('IP specified is already in use by existing item (' + rooms[roomIndex][APP.API.STATE.ROOM.ITEMS][itemIndex][APP.API.STATE.ROOM.ITEM.NAME] + ') in the room ' + rooms[roomIndex][APP.API.STATE.ROOM.NAME] + '.');
                        }
                    /*
                    } else {
                        addWarningIP.html('Invalid IPv4 address.');
                    }
                    */

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
                        targetName = targetOption.attr('data-name');
                    
                    if($('#' + removeInputSelector).val() === targetName) {
                        removeWarning.html('');
                        self.parent().addClass(APP.DOM_HOOK.UPDATING);
                        // AJAX call
                        APP.ajax.delete_rooms_roomId_items_itemId(roomId, targetItemId,
                            function() {
                                // AJAX call
                                APP.ajax.get_state(
                                    function() {
                                        stage.update();
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
        stage.setMenuUpdate(function() {
            stage.contextMenu.tearDown();
            stage.contextMenu.construct();
        });
        stage.setConstruct(function() {
            stage.getContext().append($('<div></div>').attr({id: 'context-bar'}));

            updateItemTypes();
            stage.data.itemTypeDisplays = {};
            console.log(stage.data.itemTypes);
            constructItemTypeDisplays(stage.data.itemTypes);
            
            stage.poller.startPolling();
            stage.ready();
        });
        stage.setTearDown(function() {
            // default
        });
        stage.setUpdate(function() {
            
            var unchanged;
            
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
            unchanged = updateItemTypes();
            if(unchanged !== true) {
                stage.contextMenu.update();
            }
            
            $('#context-bar').html('');
            $('#context-menu div.' + APP.DOM_HOOK.UPDATING).removeClass(APP.DOM_HOOK.UPDATING);
            updateItemTypeDisplays();
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
            APP.ajax.get_state(stage.update, stage.updateError);
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
        stage.setMenuUpdate(function() {
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
                stage.ready();
            }
            
            function constructWithoutError() {
                stageMessage.html('');
                construct();
                stage.poller.startPolling();
                stage.ready();
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
            APP.ajax.get_events(
                function() {
                    APP.ajax.get_state(
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
            stage.data.ruleManager.update();
        });
        stage.setUpdateError(function() {
            // default
        });
        stage.setPollFunction(1000, function() {
            APP.ajax.get_state(stage.update, stage.updateError);
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
        stage.setMenuUpdate(function() {
            // default
        });
        stage.setConstruct(function() {
            stage.ready();
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
        stage.setMenuUpdate(function() {
            // default
        });
        stage.setConstruct(function() {
            APP.ajax.get_whitelist(
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
                            APP.ajax.delete_whitelist(email,
                                function() {
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
                            form = $('<input></input>').attr({type: 'text', id: 'whitelist-add-form', placeholder: 'New email address'}),
                            addButton = $('<button>Add</button>').attr({id: 'whitelist-add-button'});
                        
                        addButton.click(function() {
                            var parent = $(this).parent(),
                                email = $('#' + 'whitelist-add-form').val();
                                
                            // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                            if(/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email) === true) {
                                parent.addClass(APP.DOM_HOOK.UPDATING);
                                APP.ajax.post_whitelist(email,
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
                    
                    stage.ready();
                },
                function() {
                    // do nothing
                }
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
        stage.setPollFunction(undefined, function() {
            
        });
    };
    
    /**
     *
     */
    this.setStage_Plugins = function() {
        var stageId = this.addStage(new APP.Stage(null, 'button-plugins', '', 'stage-plugins')),
            stage = stages.get(stageId);
        
        stage.setOnShow(function() {
            // default
        });
        stage.setOnHide(function() {
            // default
        });
        stage.setMenuConstruct(function() {
            APP.ajax.get_plugins(
                function(json) {
                    var obj = APP.unpackToPayload(json),
                        contextMenu = $('#context-menu'),
                        contextMenuInnerWrapper = $('<div></div>').addClass('context-menu-inner-wrapper plugins'),
                        contextMenuContent = $('<div></div>').addClass('context-menu-content'),
                        h1 = $('<h1>Plugin manager</h1>');
                    
                    function constructDisplay() {
                        var fieldset = $('<fieldset></fieldset>').append('<legend>Active plugins</legend>'),
                            fieldsetContent = $('<div></div>'),
                            ul = $('<ul></ul>'),
                            anchor;
                        
                        $('#context-menu').append(ul);
                        stage.data.plugins = obj[APP.API.PLUGINS].slice(0);
                        for(var i = 0; i < obj[APP.API.PLUGINS].length; i++) {
                            anchor = $('<a href="#">' + obj[APP.API.PLUGINS][i] + '</a>').addClass('button');
                            anchor.click(function() {
                                var src = '../plugins/' + $(this).html();
                                stage.getContext().html('');
                                stage.iframe = $('<iframe></iframe>').attr({src: src});
                                stage.getContext().append(stage.iframe);
                            });
                            ul.append($('<li></li>').append(anchor));
                        }
                        
                        fieldsetContent.append(ul);
                        fieldset.append(fieldsetContent);
                        contextMenuContent.append(fieldset);
                    }
                    
                    function constructAddForm() {
                        var fieldset = $('<fieldset></fieldset>').append('<legend>Add new plugin</legend>'),
                            fieldsetContent = $('<div></div>'),
                            messageDisplay = $('<div></div>'),
                            iframe = $('<iframe></iframe>').attr({id: 'upload-frame'}),
                            form = $('<form></form>').attr({
                                enctype: 'multipart/form-data',
                                action: '../plugins/',
                                method: 'POST',
                                target: 'upload-frame'
                            }),
                            fileSize = $('<input></input>').attr({
                                type: 'hidden',
                                name: 'MAX_FILE_SIZE',
                                value: '1000000'
                            }),
                            fileInput = $('<input></input>').attr({
                                name: '',
                                type: 'file'
                            }),
                            input = $('<input></input').attr({
                                type: 'submit',
                                value: 'OK'
                            });
                        
                        iframe.load(function() {
                            var response = iframe.contents().find('body');
                            messageDisplay.html('');
                            messageDisplay.append(response);
                        });
                        
                        fieldsetContent.append(messageDisplay);
                        fieldsetContent.append(iframe);
                        form.append(fileSize);
                        form.append(fileInput);
                        form.append(input);
                        fieldsetContent.append(form);
                        fieldset.append(fieldsetContent);
                        contextMenuContent.append(fieldset);
                    }
                    
                    function constructRemoveForm() {
                        var fieldset = $('<fieldset></fieldset>').append('<legend>Remove plugin</legend>'),
                            fieldsetContent = $('<div></div>'),
                            errorMessageDisplay = $('<div></div>').addClass(APP.DOM_HOOK.ERROR_MESSAGE_DISPLAY),
                            input = $('<input></input>').attr({type: 'text', placeholder: 'Plugin name'}),
                            button = $('<a href="#">Remove</a>').addClass('button');
                        
                        button.click(function() {
                            for(var i = 0; i < stage.data.plugins.length; i++) {
                                if(input.val() === stage.data.plugins[i]) {
                                    fieldsetContent.addClass(APP.DOM_HOOK.UPDATING);
                                    APP.ajax.delete_plugins(
                                        stage.data.plugins[i],
                                        function() {
                                            stage.tearDown();
                                            stage.construct();
                                        },
                                        function() {
                                            // do nothing
                                        }
                                    );
                                    return;
                                }
                            }
                            errorMessageDisplay.html('No such plugin found');
                        });
                        
                        fieldsetContent.append(errorMessageDisplay);
                        fieldsetContent.append(input);
                        fieldsetContent.append(button);
                        fieldset.append(fieldsetContent);
                        contextMenuContent.append(fieldset);
                    }
                    
                    contextMenuContent.append(h1);
                    constructDisplay();
                    constructAddForm();
                    constructRemoveForm();
                    
                    contextMenuInnerWrapper.append(contextMenuContent);
                    contextMenu.append(contextMenuInnerWrapper);
                    
                },
                function() {
                    // TODO
                }
            );
        });
        stage.setMenuUpdate(function() {
            // default
        });
        stage.setConstruct(function() {
            stage.ready();
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
    this.setStage_Logs_Energy = function() {
        var stageId = this.addStage(new APP.Stage('menu-logs', 'button-logs-energy', 'Energy usage', 'stage-logs-energy')),
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
        stage.setMenuUpdate(function() {
            // default
        });
        stage.setConstruct(function() {
            APP.ajax.get_energy('0000_01_01_00_00_00', '9999_12_31_23_59_59',
                function(json) {
                    
                    function getDateObj(dateStr) {
                        var ls, date, time, year, month, day, hour, minute, second;
                        
                        ls = dateStr.split(' ');
                        date = ls[0];
                        time = ls[1];
                        
                        ls = date.split('-');
                        year = ls[0];
                        month = ls[1] - 1;
                        day = ls[2];
                        
                        ls = time.split(':');
                        hour = ls[0];
                        minute = ls[1];
                        second = ls[2];
                        
                        return new Date(year, month, day, hour, minute, second);
                    }
                    
                    var obj = APP.unpackToPayload(json),
                        chartArea = $('<div id="energy-chart"></div>'),
                        chartWidth = 0.99 * $('#stage-logs-energy > .stage-content').width(),
                        chartHeight = 0.7 * $('#stage-logs-energy').height();
                    
                    stage.data.chartData = [];

                    for(var i = 0; i < obj[APP.API.ENERGY.VALUE.VALUES].length; i++) {
                        var entry = obj[APP.API.ENERGY.VALUE.VALUES][i],
                            dateObj = getDateObj(entry[APP.API.ENERGY.VALUE.TIME]);
                        
                        stage.data.chartData.push([dateObj.getTime(), entry[APP.API.ENERGY.VALUE.WATTS]]);
                        
                    }
                    console.log(stage.data);
                    
                    stage.getContext().append(chartArea);
                    $(function() {
                        $('#energy-chart').highcharts({
                            chart: {
                                backgroundColor: 'rgba(0,0,0,0)'
                            },
                            title: {
                                text: 'Energy consumption',
                                style: {
                                    color: 'rgba(0,134,191,1)',
                                    'font-size': '1.5em'
                                }
                            },
                            navigator: {
                                enabled: true,
                                height: 60,
                                margin: 30,
                                handles: {
                                    borderColor: 'rgba(132,169,14,1)'
                                },
                                maskFill: 'rgba(0,0,0,0.75)',
                                outlineColor: 'rgba(132,169,14,1)'
                            },
                            rangeSelector: {
                                enabled: true,
                                selected: undefined,
                                buttonTheme: {
                                    fill: 'none',
                                    stroke: 'rgba(255,255,255,0.5)',
                                    style: {
                                        color: '#FFFFFF'
                                    },
                                    states: {
                                        hover: {
                                            fill: 'none',
                                            style: {
                                                color: 'rgba(0,134,191,1)'
                                            }
                                        },
                                        select: {
                                            fill: 'rgba(0,134,191,1)',
                                            style: {
                                                color: '#FFFFFF',
                                            }
                                        }
                                    }
                                },
                                labelStyle: {
                                    color: '#CCCCCC',
                                },
                                inputStyle: {
                                    color: '#FFFFFF'
                                },
                                buttons: [
                                    {   type: 'week',
                                        count: 1,
                                        text: '1wk'
                                    },
                                    {
                                        type: 'month',
                                        count: 1,
                                        text: '1m'
                                    },
                                    {
                                        type: 'month',
                                        count: 3,
                                        text: '3m'
                                    },
                                    {
                                        type: 'month',
                                        count: 6,
                                        text: '6m'
                                    },
                                    {
                                        type: 'year',
                                        count: 1,
                                        text: '1y'
                                    },
                                    {
                                        type: 'all',
                                        text: 'All'
                                    }
                                ]
                            },
                            legend: {
                                enabled: false
                            },
                            tooltip: {
                                valueSuffix: ' W'
                            },
                            plotOptions: {
                                areaspline: {
                                    marker: {
                                        enabled: false
                                    },
                                    lineWidth: 1,
                                    fillColor: {
                                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                        stops: [
                                            [0, Highcharts.getOptions().colors[0]],
                                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                        ]
                                    },
                                    states: {
                                        hover: {
                                            lineWidth: 1
                                        }
                                    }
                                }
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                title: {
                                    text: 'Watts (W)',
                                    style: {
                                        color: 'rgba(0,134,191,1)',
                                        'font-weight': 'normal',
                                        'font-size': '1.2em'
                                    }
                                },
                                gridLineColor: 'rgba(255,255,255,0.3)',
                                // minorTickInterval: 'auto',
                                // minorGridLineColor: 'rgba(255,255,255,0.1)',
                            },
                            series: [{
                                type: 'areaspline',
                                pointInterval: 24 * 3600 * 1000,
                                pointStart: stage.data.chartData[0],
                                name: 'Energy consumption',
                                data: stage.data.chartData
                            }]
                        });
                    });
                    
                    stage.ready();
                },
                function() {
                
                }
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
        stage.setPollFunction(undefined, function() {
            
        });
    },
    
    /**
     *
     */
    this.setStage_Logs_Error = function() {
        var stageId = this.addStage(new APP.Stage('menu-logs', 'button-logs-error', 'Error', 'stage-logs-error')),
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
        stage.setMenuUpdate(function() {
            // default
        });
        stage.setConstruct(function() {
            stage.ready();
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
    },
    
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
            stage.ready();
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
                        if(primaryMenuMap[target.attr('id')].menuId !== null) {
                            target.toggleClass('selected');
                        }
                        primaryButtons.not(target).each(function() {
                            $(this).removeClass('selected');
                        });
                        primaryMenuMapping = primaryMenuMap[target.attr('id')].menuId;
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
        
        // no-menu button stages (Behavior not encouraged. MenuManager hack)
        // ---------------
        
        // home stage
        this.setStage_Home();
        
        // plugins stage
        this.setStage_Plugins();
        
        // normal stages
        // -------------
        
        // control stages
        APP.ajax.get_state(function() {
            
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
        
        // log stages
        this.setStage_Logs_Energy();
        this.setStage_Logs_Error();
        
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
     * @return {Date} current date object
     * returns the current date object
     */
    getCurrentDate: function() {
        return new Date();
    },
    
    /**
     * @for APP.clock
     * @method getTimestamp
     * @param {Date | undefined} dateInput Input Date object. If not defined, this method uses the current date
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

