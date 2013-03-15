/**
 * Data / DOM-independent QUnit tests for master.js
 * These tests can be run independently of the server by opening qunit.html offline, locally
 *
 * JavaScript for Robohome
 * Author: Li Quan Khoo
 */

/* APP.Map */
(function() {
    
    var map;

    module('APP.Map', {
        setup: function() {
            map = new APP.Map();
        },
        teardown: function() {
            map = undefined;
        }
    });

    test('constructor', function() {
        equal(typeof(APP.Map), 'function', 'Constructor type === "function"');
        equal(typeof(APP.Map()), 'undefined', 'Constructor return type === "undefined"');
        equal(APP.Map(), undefined, 'Constructor returns undefined');

        equal(typeof(map), 'object', 'Initialized object is of type "object"');
        equal(map.size, 0, 'Size of map initialized to 0');
        deepEqual(map.__items, {}, 'Items in map initialized to blank object {}');
    });
        
    test('property size', function() {
        equal(typeof(map.size), 'number', 'Property is initialized to type "number"');
        
        equal(map.size, 0, 'Property is initialized to 0');
    });
    
    test('property __items', function() {
        equal(typeof(map.__items), 'object', 'Property is initialized to type "object"');
        
        deepEqual(map.__items, {}, 'Property is initialized to blank object {}');
    });
    
    test('method hash', function() {
        equal(typeof(map.hash), 'function', 'Method type === "function"');
        equal(typeof(map.hash(1)), 'string', 'Method return type === "string"');
        
        equal(map.hash(1), 'number 1', 'Hash of 1 === "number 1"');
        equal(map.hash('str'), 'string str', 'Hash of "str" === "string str"');
        equal(map.hash({}), 'object NaN', 'Hash of {} === "object NaN"');
        equal(map.hash({foo: 'bar'}), 'object NaN', 'Hash of {foo: "bar"} === "object NaN"');
        equal(map.hash([]), 'object NaN', 'Hash of [] === "object NaN"');
        equal(map.hash(/^/), 'object NaN', 'Hash of /^/ === "object NaN"');
        equal(map.hash(function(){}), 'function NaN', 'Hash of function(){} === "function NaN"');
        equal(map.hash(function func(){}), 'function NaN', 'Hash of function func(){} === "function NaN"');
    });
    
    test('method clear', function() {
        equal(typeof(map.clear), 'function', 'Method type === "function"');
        equal(typeof(map.clear()), 'undefined', 'Method return type === "undefined"');
        equal(map.clear(), undefined, 'Method returns undefined');
        
        // put in key-value pairs
        map.put('key1', 'value1');
        map.put('key2', 'value2');
        // clear
        map.clear();
        equal(map.size, 0, 'size property === 0 after call');
        deepEqual(map.__items, {}, '__items property === {} after call');
    });
    
    test('method put', function() {
        equal(typeof(map.put), 'function', 'Method type === "function"');
        equal(typeof(map.put(1)), 'undefined', 'Method return type === "undefined"');
        equal(map.put(1), undefined, 'Method returns undefined');
        
        map.clear();
        map.put('key', 'value');
        equal(map.size, 1, 'Size of map === 1 after one call');
        map.clear();
        // 1st key-value
        map.put('key', 'value');
        equal(map.get('key'), 'value', 'New key-value pair test');
        // 2nd key-value
        map.put('key2', 'value2');
        equal(map.get('key2'), 'value2', '2nd key-value pair test');
        // override 1st key-value
        map.put('key', 'newValue');
        equal(map.get('key'), 'newValue', 'Key overriding test');
        
    });
    
    test('method remove', function() {
        equal(typeof(map.remove), 'function', 'Method type === "function"');
        equal(typeof(map.remove(1)), 'undefined', 'Method return type === "undefined"');
        equal(map.remove(1), undefined, 'Method returns undefined');
        
        // insert key
        map.put('key', 'value');
        // remove it
        map.remove('key');
        equal(map.get('key'), undefined, 'Get call returns undefined after removing corresponding key');
        // removing non-existent key should not throw an error
        map.remove('non-key');
    });
    
    test('method get', function() {
        equal(typeof(map.get), 'function', 'Method type === "function"');
        // variable return type
        
        // 1st key-value
        map.put('key', 'value');
        equal(map.get('key'), 'value', 'New key-value pair test');
        // 2nd key-value
        map.put('key2', 'value2');
        equal(map.get('key2'), 'value2', '2nd key-value pair test');
        // override 1st key-value
        map.put('key', 'newValue');
        equal(map.get('key'), 'newValue', 'Key overriding test');
    });
    
    test('method getAll', function() {
        equal(typeof(map.getAll), 'function', 'Method type === "function"');
        equal(typeof(map.getAll()), 'object', 'Method return type === "object (array)"');
        
        map.put('key1', 'value1');
        map.put('key2', 'value2');
        map.put(0, 'value3');
        map.put(1, 'value4');
        map.put({}, 'value5');
        map.put(function(){}, 'value6');
        deepEqual(map.getAll(), ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'], 'Values input === values retrieved');
    });
    
    test('method getKeys', function() {
        equal(typeof(map.getKeys), 'function', 'Method type === "function"');
        equal(typeof(map.getKeys()), 'object', 'Method return type === "array (array)"');
        
        map.put('key1', 'value1');
        map.put('key2', 'value2');
        map.put(0, 'value3');
        map.put(1, 'value4');
        map.put({}, 'value5');
        map.put(function(){}, 'value6');
        deepEqual(map.getKeys(), ['string key1', 'string key2', 'number 0', 'number 1', 'object NaN', 'function NaN'], 'Values input === values retrieved');
    });
    
})();

/* APP.ContextMenu */
(function() {
    
    var cm;
    
    module('APP.ContextMenu', {
        setup: function() {
            cm = new APP.ContextMenu();
        },
        teardown: function() {
            cm = undefined;
        }
    });
    
    test('constructor', function() {
        equal(typeof(APP.ContextMenu), 'function', 'Constructor type === "function"');
        equal(typeof(APP.ContextMenu()), 'undefined', 'Constructor return type === "undefined"');
        equal(APP.ContextMenu(), undefined, 'Constructor returns undefined');
        equal(typeof(cm), 'object', 'Initialized object is of type "object"');
        ok(cm instanceof APP.ContextMenu, 'Initialized object is instanceof APP.ContextMenu');
    });
    
    test('method getContext', function() {
        equal(typeof(cm.getContext), 'function', 'Method type === "function"');
        equal(typeof(cm.getContext), 'function', 'Method return type === "function (jQuery object)"');
    });
    
    test('method construct', function() {
        equal(typeof(cm.construct), 'function', 'Method type === "function"');
        equal(typeof(cm.construct()), 'undefined', 'Method return type === "undefined"');
        equal(cm.construct(), undefined, 'Method returns undefined');
    });
    
    test('method setConstruct', function() {
        equal(typeof(cm.setConstruct), 'function', 'Method type === "function"');
        equal(typeof(cm.setConstruct()), 'undefined', 'Method return type === "undefined"');
        equal(cm.setConstruct(), undefined, 'Method returns undefined');
        
        var func = function() {};
        cm.setConstruct(func);
        deepEqual(cm.construct, func, 'Set contruct function === retrieved construct function');
    });
    
    test('method tearDown', function() {
        equal(typeof(cm.tearDown), 'function', 'Method type === "function"');
        equal(typeof(cm.tearDown()), 'undefined', 'Method return type === "undefined"');
        equal(cm.tearDown(), undefined, 'Method returns undefined');
    });
    
})();

/* APP.Poller */
(function() {
    
    var poller;
    
    module('APP.Poller', {
        setup: function() {
            poller = new APP.Poller();
        },
        teardown: function() {
            poller.stopPolling();
            poller = undefined;
        }
    });
    
    test('constructor', function() {
        equal(typeof(APP.Poller), 'function', 'Constructor type === "function"');
        equal(typeof(APP.Poller()), 'undefined', 'Constructor return type === "undefined"');
        equal(APP.Poller(), undefined, 'Constructor returns undefined');
        equal(typeof(poller), 'object', 'Initialized object is of type "object"');
        ok(poller instanceof APP.Poller, 'Initialized object isinstanceof APP.Poller');
        
        equal(poller.intervalId, undefined, 'property intervalId initialized to undefined');
        equal(poller.frequency, undefined, 'property frequency initialized to undefined');
        equal(typeof(poller.poll), 'function', 'property poll initialized to type "function"');
        
    });
    
    test('method startPolling', function() {
        equal(typeof(poller.startPolling), 'function', 'Method type === "function"');
        equal(typeof(poller.startPolling()), 'undefined', 'Method return type === "undefined"');
        equal(poller.startPolling(), undefined, 'Method returns undefined');
        
        // start polling without calling setPoll()
        poller.startPolling()
        equal(poller.intervalId, undefined, 'setPoll not called before -- window.setInterval not called, intervalId not defined');
        
        var frequency = 1000,
            func = function() {};
            
        poller.setPoll(frequency, func);
        poller.startPolling();
        notEqual(poller.intervalId, undefined, 'setPoll called -- window.setInterval called, intervalId === window.setInterval return');
        poller.stopPolling();
        
    });
    
    test('method stopPolling', function() {
        equal(typeof(poller.stopPolling), 'function', 'Method type === "function"');
        equal(typeof(poller.stopPolling()), 'undefined', 'Method return type === "undefined"');
        equal(poller.stopPolling(), undefined, 'Method returns undefined');
        
        // cannot test window.clearInterval()
        
    });
    
    test('method setPoll', function() {
        equal(typeof(poller.setPoll), 'function', 'Method type === "function"');
        equal(typeof(poller.setPoll()), 'undefined', 'Method return type === "undefined"');
        equal(poller.setPoll(), undefined, 'Method returns undefined');
        
        var frequency = 1000,
            func = function() {};
        
        poller.setPoll(frequency, func);
        equal(poller.frequency, frequency, 'Set frequency === retrieved frequency');
        deepEqual(poller.poll, func, 'Set poll function === retrieved poll function');
    });
    
})();

/* APP.clock */
(function() {
    module('APP.clock');
    
    test('static class', function() {
        equal(typeof(APP.clock), 'object', 'Static class is of type "object"');
    });
    
    test('static method getCurrentDate', function() {
        equal(typeof(APP.clock.getCurrentDate), 'function');
        
        ok(APP.clock.getCurrentDate() instanceof Date, 'Method return is instanceof Date');
    });
    
    test('static method getTimestamp', function() {
        equal(typeof(APP.clock.getTimestamp), 'function');
        equal(typeof(APP.clock.getTimestamp()), 'string', 'Method return type === "string" (noargs)');
        equal(typeof(APP.clock.getTimestamp(new Date())), 'string', 'Method return type === "string" (date arg)');
    });
    
    test('static method getCurrentTime', function() {
        equal(typeof(APP.clock.getCurrentTime), 'function');
        equal(typeof(APP.clock.getCurrentTime()), 'undefined', 'Method return type === "undefined"');
        equal(APP.clock.getCurrentTime(), undefined, 'Method returns undefined');
        
    });
    
    test('static method startClock', function() {
        equal(typeof(APP.clock.startClock), 'function');
        equal(typeof(APP.clock.startClock()), 'undefined', 'Method return type === "undefined"');
        equal(APP.clock.startClock(), undefined, 'Method returns undefined');
    });
    
})();

/* static methods */
(function() {
    module('static methods');
    test('static method APP.url_args', function() {
        equal(typeof(APP.url_args), 'function', 'Method type === "function"');
        equal(typeof(APP.url_args({})), 'string', 'Method return type === "string"');
        equal(APP.url_args({}), '', 'Empty argument object');
        equal(APP.url_args({foo: 'foo'}), '?foo=foo', 'Single argument');
        equal(APP.url_args({foo: 'foo', bar: 'bar', baz: 'baz'}), '?foo=foo&bar=bar&baz=baz', 'Multiple arguments');
    });
    
    test('static method APP.pack', function() {
        equal(typeof(APP.pack), 'function', 'Method type === "function"');
        equal(typeof(APP.pack('')), 'object', 'Method return type === "object"');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.pack('payload'), obj, 'Value packed === value unpacked');
    });
    
    test('static method APP.packToJSON', function() {
        equal(typeof(APP.packToJSON), 'function', 'Method type === "function"');
        equal(typeof(APP.packToJSON('')), 'string', 'Method return type === "string"');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.packToJSON('payload'), JSON.stringify(obj), 'Value packed === value unpacked');
    });
    
    test('static method APP.unpack', function() {
        equal(typeof(APP.unpack), 'function', 'Method type === "function"');
        // variable return type
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.unpack(JSON.stringify(obj)), obj, 'Value packed === value unpacked');
    });
    
    test('static method APP.unpackToPayload', function() {
        equal(typeof(APP.unpackToPayload), 'function', 'Method type === "function"');
        // variable return type
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.unpackToPayload(JSON.stringify(obj)), 'payload', 'Value packed === value unpacked');
    });
    
})();