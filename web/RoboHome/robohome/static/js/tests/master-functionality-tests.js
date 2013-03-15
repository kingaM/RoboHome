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
        
        /* static metohd APP.ajax (success) */
        (function() {
            var obj,
                method = 'GET',
                args = {arg: 'arg', foo: 'foo'},
                lastSuccess = APP.data.connection.lastSuccess;
                
            APP.ajax(method, APP.URL.PARROT + APP.url_args(args), '',
                function(json) {
                    obj = APP.unpack(json);
                    delete obj.args['_'];
                    test('static method APP.ajax (success)', function() {
                        equal(obj.method, method, 'Method matches');
                        deepEqual(obj.args, args, 'Arguments match');
                        notEqual(lastSuccess, APP.data.connection.lastSuccess, 'APP.data.connection.lastSuccess updated');
                    });
                },
                function() {}
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
                }
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
                function() {}
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
                function() {}
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
                function() {}
            );
        })();
        
        // other AJAX calls not tested at the moment as they are minor or they cause server side effects
        
    })();
    
    /* APP.StageManager */
    (function() {
        module('APP.StageManager');

        test('Home button', function() {
            var buttonId = 'button-home',
                stageId = 'stage-home';
                
            equal($('#' + buttonId).length, 1, 'Button exists');
            equal($('#' + stageId).length, 1, 'Stage exists');
            ok(! $('#' + stageId).hasClass('active'), 'Stage is not active when set up');
            $('#' + buttonId).click();
            ok($('#' + stageId).hasClass('active'), 'Stage becomes active when button clicked');
            $('#' + buttonId).click();
            ok(! $('#' + stageId).hasClass('active'), 'Stage goes inactive when button clicked again');
        });
        
        test('Control button', function() {
            var buttonId = 'button-control',
                menuId = 'menu-control';
            equal($('#' + buttonId).length, 1, 'Button exists');
            equal($('#' + menuId).length, 1, 'Menu exists');
            ok(! $('#' + menuId).hasClass('active'), 'Menu is not active when set up');
            $('#' + buttonId).click();
            ok($('#' + menuId).hasClass('active'), 'Menu becomes active when button clicked');
            $('#' + buttonId).click();
            ok(! $('#' + menuId).hasClass('active'), 'Menu becomes inactive when button clicked');
        });
        
        (function() {
            var buttons = APP.data.stageManager.menuManager.buttons,
                primaryButtonId = 'button-control',
                menuId = 'menu-control',
                buttonId,
                stageId,
                interval;
            
            $('#' + primaryButtonId).click(); // make the menu active
            interval = window.setInterval(func, 500);
            function func() {
                if(buttons[menuId] !== undefined) {
                    for(var i = 0; i < buttons[menuId].length; i++) {
                        buttonId = buttons[menuId][i].buttonId;
                        stageId = buttons[menuId][i].stageId;
                        
                        test('Control menu buttons test ' + buttonId, function() {
                            ok(! $('#' + stageId).hasClass('active'), 'Stage is not active when set up');
                            $('#' + buttonId).click();
                            ok($('#' + stageId).hasClass('active'), 'Stage becomes active when button clicked');
                            $('#' + buttonId).click();
                            ok(! $('#' + stageId).hasClass('active'), 'Stage becomes inactive when button clicked');
                        });
                    }
                    $('#' + primaryButtonId).click(); // make the menu inactive
                    window.clearInterval(interval);
                }
            }
        })();
        
        test('Rules button', function() {
            ok(! $('#menu-rules').hasClass('active'), 'Menu is not active when set up');
            $('#button-rules').click();
            ok($('#menu-rules').hasClass('active'), 'Menu becomes active when button clicked');
            $('#button-rules').click();
            ok(! $('#menu-rules').hasClass('active'), 'Menu becomes inactive when button clicked');
        });
        
        (function() {
            var buttons = APP.data.stageManager.menuManager.buttons,
                primaryButtonId = 'button-rules',
                menuId = 'menu-rules',
                buttonId,
                stageId;
            $('#' + primaryButtonId).click(); // make the menu active
            for(var i = 0; i < buttons[menuId].length; i++) {
                buttonId = buttons[menuId][i].buttonId;
                stageId = buttons[menuId][i].stageId;
                test('Rules menu buttons test ' + buttonId, function() {
                    ok(! $('#' + stageId).hasClass('active'), 'Stage is not active when set up');
                    $('#' + buttonId).click();
                    ok($('#' + stageId).hasClass('active'), 'Stage becomes active when button clicked');
                    $('#' + buttonId).click();
                    ok($('#' + stageId).hasClass('active'), 'Stage does not go away since it is still being constructed');
                });
            }
            $('#' + primaryButtonId).click(); // make the menu inactive
        })();
        
        test('Config button', function() {
            ok(! $('#menu-config').hasClass('active'), 'Menu is not active when set up');
            $('#button-config').click();
            ok($('#menu-config').hasClass('active'), 'Menu becomes active when button clicked');
            $('#button-config').click();
            ok(! $('#menu-config').hasClass('active'), 'Menu becomes inactive when button clicked');
        });
        
        (function() {
            var buttons = APP.data.stageManager.menuManager.buttons,
                primaryButtonId = 'button-config',
                menuId = 'menu-config',
                buttonId,
                stageId;
            $('#' + primaryButtonId).click(); // make the menu active
            for(var i = 0; i < buttons[menuId].length; i++) {
                buttonId = buttons[menuId][i].buttonId;
                stageId = buttons[menuId][i].stageId;
                test('Config menu buttons test ' + buttonId, function() {
                    ok(! $('#' + stageId).hasClass('active'), 'Stage is not active when set up');
                    $('#' + buttonId).click();
                    ok($('#' + stageId).hasClass('active'), 'Stage becomes active when button clicked');
                    $('#' + buttonId).click();
                    ok(! $('#' + stageId).hasClass('active'), 'Stage becomes inactive when button clicked');
                });
            }
            $('#' + primaryButtonId).click(); // make the menu inactive
        })();
        
    })();
    
};
