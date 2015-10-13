'use strict'


module.exports = function cucumberChaiWd(world) {

	/**
	* wrap cucumber and chai in webdriver
	*/

	var chai = require('chai');

	//https://github.com/domenic/chai-as-promised/
	var chaiAsPromised = require('chai-as-promised');

	var _ = require('lodash');

	chai.use(chaiAsPromised);

	var expectChai = chai.expect;


	// wraps up expect into wd flow promise

	var webdriver = require('protractor/node_modules/selenium-webdriver');

	var flow = webdriver.promise.controlFlow();

	global.expect = function(actual) {
		if (webdriver.promise.isPromise(actual)) {
			return expectChai(actual)
		} else {
			return expectChai(flow.execute(function() {return actual;}));

		}
	}

	/**
	 * execute a function in the control flow to sequentialise its execution
	 */

	function wrapInControlFlow(world, fn, args) {
		var defered = webdriver.promise.defer();
		flow.execute(function() { fn.apply(world,args); })
		  .then(function() {
			flow.execute(function () {
       			defered.fulfill();});	
			}, function(error) {
				defered.reject(error);
			})		

		return defered;
	}

 	/**
 	 * override a cucumber step definition
 	 */

 	 function overRideStep(world,originalStep,originalStepName) {
 	 	world[originalStepName] = function(fixture,fn) {	
 			originalStep(fixture, function() {
				// wrap up original step in a webdriver promise so that it goes in control flow
				return wrapInControlFlow(world,fn,arguments)
			});
		};
 	 }

 	 overRideStep(world,world.Then,'Then');
	 overRideStep(world,world.When,'When');
	 overRideStep(world,world.Given,'Given');
	 overRideStep(world,world.defineStep,'defineStep');
}
