## Protractor-skip-desynchronization

This plugin helps to switch default protractor and angular synchronization with our own plugin synchronization. What it does is very alike waitForAngular, but if we don't get synchronized in default amount of time (e.g. 15 sec) it just skips synchronization for the current promise. Before the next promises synchronization time will be less (e.g. 3 sec). But if we get synchronized before 3 sec it will switch to 15 sec again.

More about how protractor synchronize with Angular [read here.](http://agibalov.io/2017/05/19/How-do-Protractor-and-Angular-synchronize/)

## Getting Started

### Usage
Add plugin into your config file (e.g. protractor.conf.js)
```
exports.config = {
    plugins: [{
        package: 'protractor-skip-desynchronization',
        defaultsSyncTimeout: 15,
        afterFailTimeout: 3,
        rootSelector: '[ng-app="myApp"]',
        resetSkipStabilityAfterEachTest: true
    }]
```

* *defaultsSyncTimeout* - amount of seconds plugin waiting for waitForAngular alike synchronization.
* *afterFailTimeout* - amount of seconds to synchronize before next promise after synchronization fail.
* *rootSelector* - Angular app root selector.
* *resetSkipStabilityAfterEachTest* - set pluginSetSkipStability to false after each test.

Specify the place where start to use plugin synchronization. It could be beginning of the test, beforeEach hook or if you use page object pattern, each time element().
```
protractor.pluginSetSkipStability(true).
```

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

