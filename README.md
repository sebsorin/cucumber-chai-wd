
cucumber-chai-wd
================

Adapter for cucumber and chai to WebDriverJS just as Jasminewd is for Jasmine.

- Wraps expectations in control flow to have calls in sequences 

To use it, just load it in a support js of cucumber:


```js
module.exports = function cucumberChai() {
	// instruments cucumber with cucumber chai wd
	require('cucumber-chai-wd').use(this);
}
```

To prevent the chai should syntax from loading, use the following
```js
module.exports = function cucumberChai() {
	// instruments cucumber with cucumber chai wd
	require('cucumber-chai-wd').use(this, false);
}
```

If you want to use chai modules, just register them to chai using `require('chai')` at any point.

This will expose expect as a global function that will wrap any expectation in the control flow.

This will also override the cucumber step definition to wrap there execution in control flow so that step will wait until every expectation is fulfilled in the control flow.
