
cucumber-chai-wd
================

Adapter for cucumber and chai to WebdriverJS just as Jasminewd is for Jasmine.

- Wraps expactations in control flow to have calls in sequences 

To use it, just load it in a support js of cucumber:

module.exports = function cucumberChai() {
	// instruments cucumber with cucumber chai wd
	require('cucumber-chai-wd').use(this);

}

