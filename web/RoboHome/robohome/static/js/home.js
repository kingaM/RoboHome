$(document).ready(function() {
    
    APP.ajax_get_version(function() {
        // Instantiate manager objects
        APP.data.stageManager = new APP.StageManager();
        
        // Initialize UI menus and stages
        APP.data.stageManager.init();
        
        // Start clock
        APP.clock.startClock();
        
        // Listen to size changes
        APP.windowResizeListener.listen();
        APP.resizer.resizeAll();
        
    });
    
});