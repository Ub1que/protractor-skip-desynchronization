module.exports = {
    // specify a function which can switch default waitForAngular stabilization with our own on fly.
    setup: function() {
        var plugin = this;
        this.noSync = false;
        this.skipAngularStability = false;

        protractor.pluginSetSkipStability = function(newValue) {
            plugin.skipAngularStability = newValue;
        };
    },
    // switch back to default waitForAngular stabilization after each test.
    postTest: function(){
        var plugin = this;
        if (plugin.config.resetSkipStabilityAfterEachTest === true) {
            plugin.skipAngularStability = false;
        }
    },
    waitForPromise : function(){
        var plugin = this;
        if (plugin.skipAngularStability === true) {

            return browser.executeAsyncScript(function(){

                var callback = arguments[arguments.length - 1];
                var noSync = arguments[0];
                var defaultsSyncTimeout = arguments[1];
                var afterFailTimeout = arguments[2];
                var rootSelector = arguments[3];
                var timer;

                window.angular.getTestability(document.querySelector(rootSelector)).whenStable(function(){
                    callback('stable');
                });

                if (noSync === false) {
                    timer = defaultsSyncTimeout;
                } else {
                    timer = afterFailTimeout;
                }

                var timeout = setTimeout(function(){
                    callback('noSync');
                    clearTimeout(timeout);
                }, timer * 1000);

            }, plugin.noSync, plugin.config.defaultsSyncTimeout, plugin.config.afterFailTimeout, plugin.config.rootSelector)
                .then(function (stability) {
                    if (stability === 'noSync') {
                        plugin.noSync = true;
                    } else {
                        plugin.noSync = false;
                    }
                });
        }
    }
};