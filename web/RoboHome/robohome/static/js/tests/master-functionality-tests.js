/**
 * Functionality tests for RoboHome
 * These tests address user/dynamically-generated event-handling and server interactions
 *
 * JavaScript for Robohome
 * Author: Li Quan Khoo
 */

APP.URL.PARROT = '/test/parrot/'

/**
 * @method
 * @static
 * Runs the whole suite of tests. Make sure the UI has been wholly set up
 *   before calling this function
 */
APP.runFunctionalityTests = function() {
    
    /* AJAX calls */
    (function() {
        module('AJAX calls');
        
        asyncTest('static method APP.ajax (success)', function() {
        
            var method = 'GET',
                args = {arg: 'arg', foo: 'foo'},
                lastSuccess = APP.data.connection.lastSuccess;
            APP.ajax(method, APP.URL.PARROT + APP.url_args(args), '',
                function(json) {
                    var obj = APP.unpack(json);
                    delete obj.args['_'];
                    start();
                    equal(obj.method, method, 'Method matches');
                    deepEqual(obj.args, args, 'Arguments match');
                    notEqual(lastSuccess, APP.data.connection.lastSuccess, 'APP.data.connection.lastSuccess updated');
                },
                function() {}
            );
        });
        stop();
        
        asyncTest('static method APP.ajax (failure)', function() {
        
            var method = 'GET',
                lastNoSuccess = APP.data.connection.lastNoSuccess;
            APP.ajax(method, 'somenonexistenturl', '',
                function() {},
                function(json) {
                    start();
                    notEqual(lastNoSuccess, APP.data.connection.lastNoSuccess, 'APP.data.connection.lastNoSuccess updated');
                }
            );
        });
        stop();
        
        asyncTest('static method APP.ajax_get_state', function() {
        
            var retrieved = APP.data.retrieved.houseStructure;
            APP.ajax_get_state(
                function() {
                    start();
                    // No way to check whether houseStructure itself is updated since it's not returned
                    notEqual(retrieved, APP.data.retrieved.houseStructure, 'APP.data.retrieved.houseStructure updated');
                },
                function() {}
            );
        });
        stop();
        
        asyncTest('static method APP.ajax_get_version', function() {
            
            var retrieved = APP.data.retrieved.version;
            APP.ajax_get_version(
                function() {
                    start();
                    notEqual(retrieved, APP.data.retrieved.version, 'APP.data.retrieved.version updated');
                },
                function() {}
            );
            
        });
        stop();
        
        asyncTest('static method APP.ajax_get_events', function() {
            
            var retrieved = APP.data.retrieved.events;
            APP.ajax_get_events(
                function() {
                    start();
                    notEqual(retrieved, APP.data.retrieved.events, 'APP.data.retrieved.events updated');
                },
                function() {}
            );
            
        });
        stop();
        
    })();
    
};
