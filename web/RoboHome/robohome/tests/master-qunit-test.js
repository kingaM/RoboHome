module('APP.Map');
(function() {

    test('constructor', function() {
        equal(typeof(APP.Map), 'function');
        var map = new APP.Map();
        equal(typeof(map), 'object');
        equal(map.size, 0);
        deepEqual(map.__items, {});
    });
        
    test('property .size', function() {
        var map = new APP.Map();
        equal(typeof(map.size), 'number');
        
        equal(map.size, 0);
    });
    
    test('property .__items', function() {
        var map = new APP.Map();
        equal(typeof(map.__items), 'object');
        
        deepEqual(map.__items, {});
    });
    
    test('method .hash', function() {
        var map = new APP.Map();
        equal(typeof(map.hash), 'function');
        
        equal(map.hash(1), 'number 1');
        equal(map.hash('str'), 'string str');
        equal(map.hash({}), 'object NaN');
        equal(map.hash({foo: 'bar'}), 'object NaN');
        equal(map.hash(function(){}), 'function NaN');
        equal(map.hash(function func(){}), 'function NaN');
        // null unhandled
        // undefined unhandled
    });
    
    test('method .clear', function() {
        var map = new APP.Map();
        equal(typeof(map.clear), 'function');
        
        // put in key-value pairs
        map.put('key1', 'value1');
        map.put('key2', 'value2');
        // clear
        map.clear();
        equal(map.size, 0);
        deepEqual(map.__items, {});
    });
    
    test('method .put', function() {
        var map = new APP.Map();
        equal(typeof(map.put), 'function');
        
        map.put('key', 'value');
        equal(map.size, 1);
        map.remove('key');
        equal(map.size, 0);
        // 1st key-value
        map.put('key', 'value');
        equal(map.get('key'), 'value');
        // 2nd key-value
        map.put('key2', 'value2');
        equal(map.get('key2'), 'value2');
        // override 1st key-value
        map.put('key', 'newValue');
        equal(map.get('key'), 'newValue');
        
    });
    
    test('method .remove', function() {
        var map = new APP.Map();
        equal(typeof(map.remove), 'function');
        
        // insert key
        map.put('key', 'value');
        // remove it
        map.remove('key');
        equal(map.get('key'), undefined);
        // removing non-existent key should not throw an error
        map.remove('non-key');
    });
    
    test('method .get', function() {
        var map = new APP.Map();
        equal(typeof(map.get), 'function');
        
        // 1st key-value
        map.put('key', 'value');
        equal(map.get('key'), 'value');
        // 2nd key-value
        map.put('key2', 'value2');
        equal(map.get('key2'), 'value2');
        // override 1st key-value
        map.put('key', 'newValue');
        equal(map.get('key'), 'newValue');
    });
    
    test('method .getAll', function() {
        var map = new APP.Map();
        equal(typeof(map.getAll), 'function');
        
        map.put('key1', 'value1');
        map.put('key2', 'value2');
        map.put(0, 'value3');
        map.put(1, 'value4');
        map.put({}, 'value5');
        map.put(function(){}, 'value6');
        deepEqual(map.getAll(), ['value1', 'value2', 'value3', 'value4', 'value5', 'value6']);
    });
    
    test('method .getKeys', function() {
        var map = new APP.Map();
        equal(typeof(map.getKeys), 'function');
        
        map.put('key1', 'value1');
        map.put('key2', 'value2');
        map.put(0, 'value3');
        map.put(1, 'value4');
        map.put({}, 'value5');
        map.put(function(){}, 'value6');
        deepEqual(map.getKeys(), ['string key1', 'string key2', 'number 0', 'number 1', 'object NaN', 'function NaN']);
    });
    
})();

module('APP.pack');
(function() {

    test('static method .pack()', function() {
        equal(typeof(APP.pack), 'function');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.pack('payload'), obj);
    });
    
})();

module('APP.packToJSON');
(function() {
    
    test('static method .packToJSON()', function() {
        equal(typeof(APP.packToJSON), 'function');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.packToJSON('payload'), JSON.stringify(obj));
    });

})();

module('APP.unpack');
(function() {
    
    test('static method .unpack', function() {
        equal(typeof(APP.unpack), 'function');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.unpack(JSON.stringify(obj)), obj);
    });
    
})();

module('APP.unpackToJSON');
(function() {
    
    test('static method .unpackToPayload', function() {
        equal(typeof(APP.unpackToPayload), 'function');
        
        var obj = {};
        obj[APP.API.WRAPPER.CONTENT] = 'payload';
        deepEqual(APP.unpackToPayload(JSON.stringify(obj)), 'payload');
    });
    
})();








