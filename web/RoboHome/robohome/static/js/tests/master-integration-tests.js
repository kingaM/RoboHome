/**
 * Integration QUnit tests for master.js
 *
 * JavaScript for Robohome
 * Author: Li Quan Khoo
 */

// outgoing
/* APP.ajax */
(function() {
    module('APP.ajax');
    
    var props = []; // properties
    function remove(propertyName) {
        var index = props.indexOf(propertyName);
        if(index !== -1) {
            props.splice(index, 1);
        }
    }
    
    function testSent(ajaxObj, settings) {
        equal(ajaxObj.method, settings.method, 'Sent: Request method matches (' + settings.method + ')');
        equal(ajaxObj.url, settings.url, 'Sent: Request URL matches (' + settings.url + ')');
        delete ajaxObj.args['test'];
        var str = 'Sent: Request arguments match (',
            isEmpty = true;
        for(var property in settings.args) {
            if(settings.args.hasOwnProperty(property)) {
                str = str + property + ': ' + settings.args[property];
                isEmpty = false;
            }
        }
        if(isEmpty === true) { str += 'none'; }
        str += ')';
        deepEqual(ajaxObj.args, settings.args, str);
    }
    
    function testClient(ajaxObj, settings) {
        equal(typeof(settings.func), 'function', 'Method is of type "function"');
        testSent(ajaxObj, settings);
    }
    
    function testServerReceived(obj, method, data, args) {
        equal(obj.method, method, 'Server: Request method matches (' + obj.method + ')');
        equal(obj.data, data, 'Server: Request data matches (' + obj.data + ')');
        delete obj.args['_'];
        delete obj.args['test'];
        var str = 'Server: Request arguments match (',
            isEmpty = true;
        for(var property in obj.args) {
            if(obj.args.hasOwnProperty(property)) {
                str = str + property + ': ' + obj.args[property];
                isEmpty = false;
            }
        }
        if(isEmpty === true) { str += 'none'; }
        str += ')';
        deepEqual(obj.args, args, str);
    }
    
    function getSettings(params) {
        return {
            func: params.func,
            method: params.method,
            url: params.url,
            args: params.args,
            callback: function(json) {
                var obj = APP.unpack(json);
                testServerReceived(obj, params.method, undefined, params.args);
                start();
            },
            error: function() {
                ok(false, 'Callback error');
                start();
            },
            test: 'test'
        };
    };
    
    for(var property in APP.ajax) {
        if(APP.ajax.hasOwnProperty(property)) {
            props.push(property);
        }
    }
    
    /* _ajax */
    (function() {
        remove('_ajax');
        asyncTest('method _ajax', function() {
            var settings = {
                    func: APP.ajax._ajax,
                    method: 'GET',
                    url: APP.URL.VERSION,
                    args: {test: 'test'},
                    callback: function(json) {
                        var obj = APP.unpack(json);
                        testServerReceived(obj, settings.method, undefined, {});
                        start();
                    },
                    error: function() {}
                },
                ajaxObj = settings.func(new APP.AjaxObj(settings));
                equal(typeof(settings.func), 'function', 'Method is of type "function"');
                testSent(ajaxObj, settings);
        });
    })();
    
    /* get_state */
    (function() {
        remove('get_state');
        asyncTest('method get_state', function() {
            var args = {},
                settings;
            settings = getSettings({
                func: APP.ajax.get_state,
                method: 'GET',
                url: APP.URL.STATE,
                args: args
            });
            ajaxObj = settings.func(settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* get_version */
    (function() {
        remove('get_version');
        asyncTest('method get_version', function() {
            var args = {},
                settings,
                ajaxObj;
            settings = getSettings({
                func: APP.ajax.get_version,
                method: 'GET',
                url: APP.URL.VERSION,
                args: args
            });
            ajaxObj = settings.func(settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* post_rooms */
    (function() {
        remove('post_rooms');
        asyncTest('method post_rooms', function() {
            var args = {},
                settings,
                ajaxObj;
            args[APP.API.ROOMS.NAME] = 'roomName';
            settings = getSettings({
                func: APP.ajax.post_rooms,
                method: 'POST',
                url: APP.URL.ROOMS,
                args: args
            });
            ajaxObj = settings.func('roomName', settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* delete_rooms_roomId */
    (function() {
        remove('delete_rooms_roomId');
        asyncTest('method delete_rooms_roomId', function() {
            var args = {},
                settings,
                ajaxObj,
                roomId = 1;
                
            settings = getSettings({
                func: APP.ajax.delete_rooms_roomId,
                method: 'DELETE',
                url: APP.URL.ROOMS_ROOMID(roomId),
                args: args
            });
            ajaxObj = settings.func(roomId, settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* post_rooms_roomId_items */
    (function() {
        remove('post_rooms_roomId_items');
        asyncTest('method post_rooms_roomId_items', function() {
            var args = {},
                settings,
                ajaxObj,
                roomId = 1;
            args[APP.API.ITEMS.BRAND] = 'itemBrand';
            args[APP.API.ITEMS.IP] = '1.1.1.1';
            args[APP.API.ITEMS.NAME] = 'itemName';
            args[APP.API.ITEMS.ITEM_TYPE] = 'itemType';
            settings = getSettings({
                func: APP.ajax.post_rooms_roomId_items,
                method: 'POST',
                url: APP.URL.ROOMS_ROOMID_ITEMS(roomId),
                args: args
            });
            ajaxObj = settings.func(roomId, args[APP.API.ITEMS.BRAND], args[APP.API.ITEMS.IP], args[APP.API.ITEMS.NAME], args[APP.API.ITEMS.ITEM_TYPE], settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* delete_rooms_roomId_items_itemId */
    (function() {
        remove('delete_rooms_roomId_items_itemId');
        asyncTest('method delete_rooms_roomId_items_itemId', function() {
            var args = {},
                settings,
                ajaxObj,
                roomId = 1,
                itemId = 1;
            settings = getSettings({
                func: APP.ajax.delete_rooms_roomId_items_itemId,
                method: 'DELETE',
                url: APP.URL.ROOMS_ROOMID_ITEMS_ITEMID(roomId, itemId),
                args: args
            });
            ajaxObj = settings.func(roomId, itemId, settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* put_rooms_roomId_items_itemId_cmd */
    (function() {
        remove('put_rooms_roomId_items_itemId_cmd');
        asyncTest('method put_rooms_roomId_items_itemId_cmd', function() {
            var args = {},
                settings,
                ajaxObj,
                roomId = 1,
                itemId = 1,
                cmd = 'cmd';
            settings = getSettings({
                func: APP.ajax.put_rooms_roomId_items_itemId_cmd,
                method: 'PUT',
                url: APP.URL.ROOMS_ROOMID_ITEMS_ITEMID_CMD(roomId, itemId, cmd),
                args: args
            });
            ajaxObj = settings.func(roomId, itemId, cmd, settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* get_events */
    (function() {
        remove('get_events');
        asyncTest('method get_events', function() {
            var args = {},
                settings,
                ajaxObj;
            settings = getSettings({
                func: APP.ajax.get_events,
                method: 'GET',
                url: APP.URL.EVENTS,
                args: args
            });
            ajaxObj = settings.func(settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* post_events */
    (function() {
        remove('post_events');
        asyncTest('method post_events', function() {
            var args = {},
                settings,
                ajaxObj;
            args[APP.API.EVENTS.RULE.RULE_NAME] = 'ruleName';
            args[APP.API.EVENTS.RULE.ENABLED] = 'true';
            args[APP.API.EVENTS.RULE.EVENT.ID] = '1';
            args[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE] = 'itemType';
            args[APP.API.EVENTS.RULE.EVENT.SCOPE] = 'scope';
            args[APP.API.EVENTS.RULE.EVENT.EQUIVALENCE] = 'equivalence';
            args[APP.API.EVENTS.RULE.EVENT.VALUE] = 'value';
            settings = getSettings({
                func: APP.ajax.post_events,
                method: 'POST',
                url: APP.URL.EVENTS,
                args: args
            });
            ajaxObj = settings.func(args[APP.API.EVENTS.RULE.RULE_NAME], args[APP.API.EVENTS.RULE.ENABLED], args[APP.API.EVENTS.RULE.EVENT.ID],
                    args[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE], args[APP.API.EVENTS.RULE.EVENT.SCOPE], args[APP.API.EVENTS.RULE.EVENT.EQUIVALENCE], args[APP.API.EVENTS.RULE.EVENT.VALUE], 
                    settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* put_events_eventId */
    (function() {
        remove('put_events_eventId');
        asyncTest('method put_events_eventId', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1;
            args[APP.API.EVENTS.RULE.RULE_NAME] = 'ruleName';
            args[APP.API.EVENTS.RULE.ENABLED] = 'true';
            args[APP.API.EVENTS.RULE.EVENT.ID] = '1';
            args[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE] = 'itemType';
            args[APP.API.EVENTS.RULE.EVENT.SCOPE] = 'scope';
            args[APP.API.EVENTS.RULE.EVENT.EQUIVALENCE] = 'equivalence';
            args[APP.API.EVENTS.RULE.EVENT.VALUE] = 'value';
            settings = getSettings({
                func: APP.ajax.put_events_eventId,
                method: 'PUT',
                url: APP.URL.EVENTS_EVENTID(eventId),
                args: args
            });
            ajaxObj = settings.func(eventId, args[APP.API.EVENTS.RULE.RULE_NAME], args[APP.API.EVENTS.RULE.ENABLED], args[APP.API.EVENTS.RULE.EVENT.ID],
                    args[APP.API.EVENTS.RULE.EVENT.ITEM_TYPE], args[APP.API.EVENTS.RULE.EVENT.SCOPE], args[APP.API.EVENTS.RULE.EVENT.EQUIVALENCE], args[APP.API.EVENTS.RULE.EVENT.VALUE], 
                    settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* delete_events_eventId */
    (function() {
        remove('delete_events_eventId');
        asyncTest('method delete_events_eventId', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1;
            settings = getSettings({
                func: APP.ajax.delete_events_eventId,
                method: 'DELETE',
                url: APP.URL.EVENTS_EVENTID(eventId),
                args: args
            });
            ajaxObj = settings.func(eventId, settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* post_events_eventId_conditions */
    (function() {
        remove('post_events_eventId_conditions');
        asyncTest('method post_events_eventId_conditions', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1;
            args[APP.API.EVENTS.RULE.CONDITION.ITEM_ID] = '1';
            args[APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE] = 'equivalence';
            args[APP.API.EVENTS.RULE.CONDITION.VALUE] = 'value';
            settings = getSettings({
                func: APP.ajax.post_events_eventId_conditions,
                method: 'POST',
                url: APP.URL.EVENTS_EVENTID_CONDITIONS(eventId),
                args: args
            });
            ajaxObj = settings.func(eventId, args[APP.API.EVENTS.RULE.CONDITION.ITEM_ID],
                    args[APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE], args[APP.API.EVENTS.RULE.CONDITION.VALUE],
                    settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* put_events_eventId_conditions_conditionId */
    (function() {
        remove('put_events_eventId_conditions_conditionId');
        asyncTest('method put_events_eventId_conditions_conditionId', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1,
                conditionId = 1;
            args[APP.API.EVENTS.RULE.CONDITION.ITEM_ID] = '1';
            args[APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE] = 'equivalence';
            args[APP.API.EVENTS.RULE.CONDITION.VALUE] = 'value';
            settings = getSettings({
                func: APP.ajax.put_events_eventId_conditions_conditionId,
                method: 'PUT',
                url: APP.URL.EVENTS_EVENTID_CONDITIONS_CONDITIONID(eventId, conditionId),
                args: args
            });
            ajaxObj = settings.func(eventId, conditionId, args[APP.API.EVENTS.RULE.CONDITION.ITEM_ID],
                    args[APP.API.EVENTS.RULE.CONDITION.EQUIVALENCE], args[APP.API.EVENTS.RULE.CONDITION.VALUE],
                    settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* delete_events_eventId_conditions_conditionId */
    (function() {
        remove('delete_events_eventId_conditions_conditionId');
        asyncTest('method delete_events_eventId_conditions_conditionId', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1,
                conditionId = 1;
            settings = getSettings({
                func: APP.ajax.delete_events_eventId_conditions_conditionId,
                method: 'DELETE',
                url: APP.URL.EVENTS_EVENTID_CONDITIONS_CONDITIONID(eventId, conditionId),
                args: args
            });
            ajaxObj = settings.func(eventId, conditionId, settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* post_events_eventId_actions */
    (function() {
        remove('post_events_eventId_actions');
        asyncTest('method post_events_eventId_actions', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1;
            args[APP.API.EVENTS.RULE.ACTION.ID] = '1';
            args[APP.API.EVENTS.RULE.ACTION.SCOPE] = 'scope';
            args[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE] = 'itemType';
            args[APP.API.EVENTS.RULE.ACTION.METHOD] = 'method';
            settings = getSettings({
                func: APP.ajax.post_events_eventId_actions,
                method: 'POST',
                url: APP.URL.EVENTS_EVENTID_ACTIONS(eventId),
                args: args
            });
            ajaxObj = settings.func(eventId, args[APP.API.EVENTS.RULE.ACTION.ID], args[APP.API.EVENTS.RULE.ACTION.SCOPE], 
                    args[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE], args[APP.API.EVENTS.RULE.ACTION.METHOD], 
                    settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* put_events_eventId_actions_actionId */
    (function() {
        remove('put_events_eventId_actions_actionId');
        asyncTest('method put_events_eventId_actions_actionId', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1,
                actionId = 1;
            args[APP.API.EVENTS.RULE.ACTION.ID] = '1';
            args[APP.API.EVENTS.RULE.ACTION.SCOPE] = 'scope';
            args[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE] = 'itemType';
            args[APP.API.EVENTS.RULE.ACTION.METHOD] = 'method';
            settings = getSettings({
                func: APP.ajax.put_events_eventId_actions_actionId,
                method: 'PUT',
                url: APP.URL.EVENTS_EVENTID_ACTIONS_ACTIONID(eventId, actionId),
                args: args
            });
            ajaxObj = settings.func(eventId, actionId, args[APP.API.EVENTS.RULE.ACTION.ID], args[APP.API.EVENTS.RULE.ACTION.SCOPE], 
                    args[APP.API.EVENTS.RULE.ACTION.ITEM_TYPE], args[APP.API.EVENTS.RULE.ACTION.METHOD], 
                    settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* delete_events_eventId_actions_actionId */
    (function() {
        remove('delete_events_eventId_actions_actionId');
        asyncTest('method delete_events_eventId_actions_actionId', function() {
            var args = {},
                settings,
                ajaxObj,
                eventId = 1,
                actionId = 1;
            settings = getSettings({
                func: APP.ajax.delete_events_eventId_actions_actionId,
                method: 'DELETE',
                url: APP.URL.EVENTS_EVENTID_ACTIONS_ACTIONID(eventId, actionId),
                args: args
            });
            ajaxObj = settings.func(eventId, actionId, settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* get_energy */
    (function() {
        remove('get_energy');
        asyncTest('method get_energy', function() {
            var args = {},
                settings,
                ajaxObj,
                startTime = '0000_01_01_00_00_00',
                endTime = '9999_12_31_23_59_59';
            args[APP.API.ENERGY.START_TIME] = startTime;
            args[APP.API.ENERGY.END_TIME] = endTime;
            settings = getSettings({
                func: APP.ajax.get_energy,
                method: 'GET',
                url: APP.URL.ENERGY,
                args: args
            });
            ajaxObj = settings.func(args[APP.API.ENERGY.START_TIME], args[APP.API.ENERGY.END_TIME], settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* get_plugins */
    (function() {
        remove('get_plugins');
        asyncTest('method_get_plugins', function() {
            var args = {},
                settings,
                ajaxObj;
            settings = getSettings({
                func: APP.ajax.get_plugins,
                method: 'GET',
                url: APP.URL.PLUGINS,
                args: args
            });
            ajaxObj = settings.func(settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* delete_plugins */
    (function() {
        remove('delete_plugins');
        asyncTest('method_delete_plugins', function() {
            var args = {},
                settings,
                ajaxObj,
                pluginName = 'pluginName';
            settings = getSettings({
                func: APP.ajax.delete_plugins,
                method: 'DELETE',
                url: APP.URL.PLUGINS_PLUGIN_NAME(pluginName),
                args: args
            });
            ajaxObj = settings.func(pluginName, settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* get_whitelist */
    (function() {
        remove('get_whitelist');
        asyncTest('method get_whitelist', function() {
            var args = {},
                settings,
                ajaxObj;
            settings = getSettings({
                func: APP.ajax.get_whitelist,
                method: 'GET',
                url: APP.URL.WHITELIST,
                args: args
            });
            ajaxObj = settings.func(settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* post_whitelist */
    (function() {
        remove('post_whitelist');
        asyncTest('method post_whitelist', function() {
            var args = {},
                settings,
                ajaxObj;
                args[APP.API.WHITELIST.EMAIL] = 'email';
            settings = getSettings({
                func: APP.ajax.post_whitelist,
                method: 'POST',
                url: APP.URL.WHITELIST,
                args: args
            });
            ajaxObj = settings.func(args[APP.API.WHITELIST.EMAIL], settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    /* delete_whitelist */
    (function() {
        remove('delete_whitelist');
        asyncTest('method delete_whitelist', function() {
            var args = {},
                settings,
                ajaxObj;
                args[APP.API.WHITELIST.EMAIL] = 'email';
            settings = getSettings({
                func: APP.ajax.delete_whitelist,
                method: 'DELETE',
                url: APP.URL.WHITELIST,
                args: args
            });
            ajaxObj = settings.func(args[APP.API.WHITELIST.EMAIL], settings.callback, settings.error, settings.test);
            testClient(ajaxObj, settings);
        });
    })();
    
    // if there are any properties left in props it means they were not tested
    test('all properties tested', function() {
        if(props.length !== 0) {
            var str = 'Propertie(s) ';
            for(var i = 0; i < props.length; i++) {
                str += props[i];
                str += ', ';
            }
            str += 'left in test stack. Please make sure all properties are tested and popped off the stack.';
            ok(false, str);
        } else {
            ok(true, 'All properties tested');
        }
    });
})();

// incoming tests are in master-api-tests.js