/**
 * Functionality tests for RoboHome
 * These tests address user/dynamically-generated event-handling and server interactions
 *
 * JavaScript for Robohome
 * Author: Li Quan Khoo
 */

APP.URL.PARROT = '/test/parrot/';

/**
 * @method
 * @static
 * Runs the whole suite of tests. Make sure the UI has been wholly set up
 *   before calling this function
 */
(function() {
    
    /* AJAX calls */
    (function() {
        
        /* static method APP.ajax (success) */
        (function() {
            var obj,
                method = 'GET',
                args = {arg: 'arg', foo: 'foo'},
                lastSuccess = APP.data.connection.lastSuccess;
                
            APP.ajax(method, APP.URL.PARROT + APP.url_args(args), '',
                function(json) {
                    obj = APP.unpack(json);
                    delete obj.args['_'];
                    module('AJAX calls');
                    test('static method APP.ajax (success)', function() {
                        equal(obj.method, method, 'Method matches');
                        deepEqual(obj.args, args, 'Arguments match');
                        notEqual(lastSuccess, APP.data.connection.lastSuccess, 'APP.data.connection.lastSuccess updated');
                    });
                },
                function() {},
                false // synchronous call
            );
        })();
        
        /* static method APP.ajax (failure) */
        (function() {
            var method = 'GET',
                lastNoSuccess = APP.data.connection.lastNoSuccess;
            APP.ajax(method, 'somenonexistenturl', '',
                function() {},
                function(json) {
                    test('static method APP.ajax (failure)', function() {
                        notEqual(lastNoSuccess, APP.data.connection.lastNoSuccess, 'APP.data.connection.lastNoSuccess updated');
                    });
                },
                false // synchronous call
            );
        })();
        
        /* static method APP.ajax_get_state */
        (function() {
            var retrieved = APP.data.retrieved.houseStructure;
            APP.ajax_get_state(
                function() {
                    test('static method APP.ajax_get_state', function() {
                        // No way to check whether houseStructure itself is updated since it's not returned
                        notEqual(retrieved, APP.data.retrieved.houseStructure, 'APP.data.retrieved.houseStructure updated');
                    });
                },
                function() {},
                false // synchronous call
            );
        })();
        
        /* static method APP.ajax_get_version */
        (function() {
            var retrieved = APP.data.retrieved.version;
            APP.ajax_get_version(
                function() {
                    test('static method APP.ajax_get_version', function() {
                        notEqual(retrieved, APP.data.retrieved.version, 'APP.data.retrieved.version updated');
                    });
                },
                function() {},
                false // synchronous call
            );
        })();
        
        /* static method APP.ajax_get_events */
        (function() {
            var retrieved = APP.data.retrieved.events;
            APP.ajax_get_events(
                function() {
                    test('APP.ajax_get_events', function() {
                        notEqual(retrieved, APP.data.retrieved.events, 'APP.data.retrieved.events updated');
                    });
                },
                function() {},
                false  // synchronous call
            );
        })();
        
        // other AJAX calls not tested at the moment as they are minor or they cause server side effects
        
    })();
    
    /* APP.StageManager */
    (function() {
        module('APP.StageManager');
        
        var timings = [0, 10, 30, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            maxTime = 1000;
        
        function primaryButtonTest(buttonId, stageId) {
            
            this.assertActive = function(pos) {
                var self = this,
                    timePos = pos || 0;
                $('#' + buttonId).click();
                if($('#' + stageId).hasClass('active')) {
                    ok(true, 'Click event - Dependant (' + stageId + ') is active (' + timings[timePos] + 'ms)');
                } else {
                    ok(true, 'Click event - Dependant (' + stageId + ') is not ready (' + timings[timePos] + 'ms)');
                    if(timings[timePos] <= maxTime) {
                        window.setTimeout(self.assertActive(timePos + 1), timings[timePos + 1] - timings[timePos]);
                    } else {
                        ok(false, 'Click event - Dependant (' + stageId + ') is not ready after ' + maxTime);
                    }
                }
            };
            
            this.assertInactive = function(pos) {
                var self = this,
                    timePos = pos || 0;
                
                $('#' + buttonId).click();
                if(! $('#' + stageId).hasClass('active')) {
                    ok(true, 'Click event - Dependant (' + stageId + ') is inactive (' + timings[timePos] + 'ms)');
                } else {
                    ok(true, 'Click event - Dependant (' + stageId + ') is not ready (' + timings[timePos] + 'ms)');
                    if(timings[timePos] <= maxTime) {
                        window.setTimeout(self.assertActive(timePos + 1), timings[timePos + 1] - timings[timePos]);
                    } else {
                        ok(false, 'Click event - Dependant (' + stageId + ') is not ready after ' + maxTime);
                    }
                }
            };
            
            equal($('#' + buttonId).length, 1, 'Button (' + buttonId + ') exists');
            equal($('#' + stageId).length, 1, 'Dependant (' + stageId + ') exists');
            ok(! $('#' + stageId).hasClass('active'), 'Dependant (' + stageId + ') is not active when set up');
            this.assertActive();
            this.assertInactive();
        }
        
        /*
        function menuButtonTest(buttonId, menuId) {
            
            this.assertActive = function(pos) {
                var self = this,
                    timePos = pos || 0;
                $('#' + buttonId).click();
                if($('#' + menuId).hasClass('active')) {
                    ok(true, 'Click event - Menu is active (' + timings[timePos] + 'ms)');
                    console.log(APP.data.stageManager.menuManager.buttons);
                    if(APP.data.stageManager.menuManager.buttons[menuId]) {
                        ok(true, 'menuManager buttons populated (' + timings[timePos] + 'ms)');
                        for(var i = 0; i < APP.data.stageManager.menuManager.buttons[menuId].length; i++) {
                            stageButtonTest(buttonId, APP.data.stageManager.menuManager.buttons[menuId][i]);
                        }
                    } else {
                        else(true, 'menuManager buttons not yet populated(' + timings[timePos] + 'ms)');
                        
                    }
                } else {
                    ok(true, 'Click event - Menu not ready (' + timings[timePos] + 'ms)');
                    if(timings[timePos] <= maxTime) {
                        window.setTimeout(self.assertActive(timePos + 1), timings[timePos + 1] - timings[timePos]);
                    } else {
                        ok(false, 'Click event - Menu not ready after ' + maxTime);
                    }
                }
            };
            
            this.assertInactive = function(pos) {
                var self = this,
                    timePos = pos || 0;
                
                $('#' + buttonId).click();
                if(! $('#' + menuId).hasClass('active')) {
                    ok(true, 'Click event - Menu is inactive (' + timings[timePos] + 'ms)');
                } else {
                    ok(true, 'Click event - Menu not ready (' + timings[timePos] + 'ms)');
                    if(timings[timePos] <= maxTime) {
                        window.setTimeout(self.assertActive(timePos + 1), timings[timePos + 1] - timings[timePos]);
                    } else {
                        ok(false, 'Click event - Menu not ready after ' + maxTime);
                    }
                }
            };
            
            equal($('#' + buttonId).length, 1, 'Button exists');
            equal($('#' + menuId).length, 1, 'Menu exists');
            ok(! $('#' + menuId).hasClass('active'), 'Menu is not active when set up');
            this.assertActive();
            this.assertInactive();
        }
        */
        
        test('Home button', function() {
            primaryButtonTest('button-home', 'stage-home');
        });
        
        test('Control button', function() {
            primaryButtonTest('button-control', 'menu-control');
        });
        
        test('Rules button', function() {
            primaryButtonTest('button-rules', 'menu-rules');
        });
        
        test('Config button', function() {
            primaryButtonTest('button-config', 'menu-config');
        });
        
    })();
    
})();
