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
    
    /* APP.Stage */
    (function() {
        
        var stages = [],
            params = [];
        
        module('APP.Stage', {
            setup: function() {
                stages = [];
                params = [];
                params.push({menuId: null, buttonId: 'button-home', buttonText: '', stageId: 'stage-home'});
                stages.push(new APP.Stage(params[0].menuId, params[0].buttonId, params[0].buttonText, params[0].stageId));
                params.push({menuId: 'menu-rules', buttonId: 'button-rules-ECA', buttonText: 'ECA', stageId: 'stage-rules-eca'});
                stages.push(new APP.Stage(params[1].menuId, params[1].buttonId, params[1].buttonText, params[1].stageId));
            },
            teardown: function() {}
        });
                
            test('constructor', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(APP.Stage), 'function', 'Constructor type === "function"');
                    equal(typeof(APP.Stage()), 'undefined', 'Constructor return type === "undefined"');
                    equal(APP.Poller(), undefined, 'Constructor returns undefined');
                    equal(typeof(stage), 'object', 'Initialized object is of type "object"');
                    ok(stage instanceof APP.Stage, 'Initialized object is instanceof APP.Stage');
                }
            });
            
            test('property menuId', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    if(typeof(stage.menuId) === 'object' || typeof(stage.menuId) === 'string') {
                        ok(true, 'property menuId initialized to type object (null) or string');
                    } else {
                        ok(false, 'property menuId not initialized to type object (null) or string');
                    }
                    equal(stage.menuId, params[i].menuId, 'property menuId initialized to value passed in');
                }
            });
            
            test('property buttonId', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    if(typeof(stage.menuId) === 'object' || typeof(stage.menuId) === 'string') {
                        ok(true, 'property buttonId initialized to type object (null) or string');
                    } else {
                        ok(false, 'property buttonId not initialized to type object (null) or string');
                    }
                    equal(stage.buttonId, params[i].buttonId, 'property buttonId initialized to value passed in');
                }
            });
            
            test('property buttonText', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.buttonText), 'string', 'property buttonText initialized to type "string"');
                    equal(stage.buttonText, params[i].buttonText, 'property buttonText initialized to value passed in');
                }
            });
            
            test('property stageId', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.stageId), 'string', 'property stageId initialized to type "string"');
                    equal(stage.stageId, params[i].stageId, 'property stageId initialized to value passed in');
                }
            });
            
            test('property contextMenu', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.contextMenu), 'object', 'property contextMenu initialized to type "object"');
                    ok(stage.contextMenu instanceof APP.ContextMenu, 'property contextMenu is instanceof APP.ContextMenu');
                }
            });
            
            test('property poller', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.poller), 'object', 'property poller initialized to type "object"');
                    ok(stage.poller instanceof APP.Poller, 'property poller is instanceof APP.Poller');
                }
            });
            
            test('property colorClass', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    if(stage.menuId === null) {
                        equal(typeof(stage.colorClass), 'string', 'property colorClass initialized to type "string"');
                        equal(stage.colorClass, $('#' + stage.buttonId).attr('data-color-class'), 'property colorClass initialized to correct value');
                    } else {
                        equal(typeof(stage.colorClass), 'string', 'property colorClass initialized to type "string"');
                        equal(stage.colorClass, $('#' + stage.menuId).attr('data-color-class'), 'property colorClass initialized to correct value');
                    }
                }
            });
            
            test('property isReady', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.isReady), 'boolean', 'property isReady initialized to type "boolean"');
                    equal(stage.isReady, false, 'property isReady initialized to false');
                }
            });
            
            test('property constructing', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.constructing), 'boolean', 'property constructing initialized to type "boolean"');
                    equal(stage.constructing, false, 'property isReady initialized to false');
                }
            });
            
            test('property data', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.data), 'object', 'property data initialized to type "object"');
                    deepEqual(stage.data, {}, 'property data initialized to empty object {}');
                }
            });
            
            test('method ready', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.ready), 'function', 'property ready initialized to type "function"');
                    stage.ready();
                    equal(stage.isReady, true, 'property isReady set to true');
                    equal(stage.constructing, false, 'property constructing set to false');
                }
            });
            
            test('method notReady', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.notReady), 'function', 'property notReady initialized to type "function"');
                    stage.notReady();
                    equal(stage.isReady, false, 'property isReady set to false');
                    
                }
            });
            
            test('method onShow', function() {
                expect(2 * stages.length);
                
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.onShow), 'function', 'property onShow initialized to type "function"');
                    
                    var _construct = stage.construct;
                    stage.construct = function() {
                        ok(true, 'method construct run');
                        _construct.apply(this, arguments);
                    };
                    
                    stage.onShow();
                }
            });
            
            test('method onHide', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.onHide), 'function', 'property onHide initialized to type "function"');
                    
                    var _tearDown = stage.tearDown;
                    stage.tearDown = function() {
                        ok(true, 'method tearDown run');
                        _tearDown.apply(this, arguments);
                    };
                    
                    stage.onHide();
                    
                }
            });
            
            test('method construct', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    // todo 
                    expect(0);
                }
            });
            
            test('method tearDown', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    // todo
                    expect(0);
                }
            });
            
            test('method update', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.update), 'function', 'property update initialized to type "function"');
                }
            });
            
            this('method updateError', function() {
                for(var i = 0; i < stages.length; i++) {
                    var stage = stages[i];
                    
                    equal(typeof(stage.updateError), 'function', 'property updateError initialized to type "function"');
                }
            });
        
    })();
    
})();
