/**
 * QUnit tests for master.js
 *
 * JavaScript for Robohome
 * Author: Li Quan Khoo
 */

module('APP.Map');
(function() {

    test('constructor', function() {
        equal(typeof(APP.Map), 'function', 'Constructor type === "function"');
        equal(typeof(APP.Map()), 'undefined', 'Constructor return type === "undefined"');
        equal(APP.Map(), undefined, 'Constructor returns undefined');

        var map = new APP.Map();
        equal(typeof(map), 'object', 'Initialized object is of type object');
        equal(map.size, 0, 'Size of map initialized to 0');
        deepEqual(map.__items, {}, 'Items in map initialized to blank object {}');
    });
        
    test('property size', function() {
        var map = new APP.Map();
        equal(typeof(map.size), 'number', 'Property is initialized to type "number"');
        
        equal(map.size, 0, 'Property is initialized to 0');
    });
    
    test('property __items', function() {
        var map = new APP.Map();
        equal(typeof(map.__items), 'object', 'Property is initialized to type "object"');
        
        deepEqual(map.__items, {}, 'Property is initialized to blank object {}');
    });
    
    test('method hash', function() {
        var map = new APP.Map();
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
        var map = new APP.Map();
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
        var map = new APP.Map();
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
        var map = new APP.Map();
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
        var map = new APP.Map();
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
        var map = new APP.Map();
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
        var map = new APP.Map();
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

module('APP.pack');
(function() {

    test('static method pack', function() {
        equal(typeof(APP.pack), 'function', 'Method type === "function"');
        equal(typeof(APP.pack('')), 'object', 'Method return type === "object"');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.pack('payload'), obj, 'Value packed === value unpacked');
    });
    
})();

module('APP.packToJSON');
(function() {
    
    test('static method packToJSON', function() {
        equal(typeof(APP.packToJSON), 'function', 'Method type === "function"');
        equal(typeof(APP.packToJSON('')), 'string', 'Method return type === "string"');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.packToJSON('payload'), JSON.stringify(obj), 'Value packed === value unpacked');
    });

})();

module('APP.unpack');
(function() {
    
    test('static method unpack', function() {
        equal(typeof(APP.unpack), 'function', 'Method type === "function"');
        // variable return type
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.unpack(JSON.stringify(obj)), obj, 'Value packed === value unpacked');
    });
    
})();

module('APP.unpackToPayload');
(function() {
    
    test('static method unpackToPayload', function() {
        equal(typeof(APP.unpackToPayload), 'function', 'Method type === "function"');
        // variable return type
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.unpackToPayload(JSON.stringify(obj)), 'payload', 'Value packed === value unpacked');
    });
    
})();



module('APP.clock');
(function() {
    
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




