/**
 * Integration QUnit tests for master.js
 * These tests can be run independently of the server by opening qunit.html offline, locally
 *
 * JavaScript for Robohome
 * Author: Li Quan Khoo
 */

// outgoing
/* APP.ajax */
(function() {
    
    var propertyArray = [];
    
    for(var property in APP.ajax) {
        if(APP.ajax.hasOwnProperty(property)) {
            propertyArray.push(property);
        }
    }
    
    for(var property in APP.ajax) {
        // TODO
    }
    
    // if there are any properties left in propertyArray it means they were not tested
    // TODO
    
})();


// incoming