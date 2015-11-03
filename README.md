
cucumber-chai-wd
================

Adapter for cucumber and chai to WebdriverJS just as Jasminewd is for Jasmine.

- Wraps expactations in control flow to have calls in sequences 

To use it, just load it in a support js of cucumber:


```js
module.exports = function cucumberChai() {
	// instruments cucumber with cucumber chai wd
	require('cucumber-chai-wd').use(this);

}
```

This will expose expect as a global function that will wrap any expectation in the control flow.

This will also override the cucumber step definition to wrap there execution in controll flow so that step will wait until every expectation is fullfilled in the control flow
