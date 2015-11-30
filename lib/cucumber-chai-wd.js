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

    // add variable to state if wteps have been overriden, this will help to warn user if they have not
    // steps might not have been overriden if support code has been loaded after step definition
	var stepsOverriden = false;

	global.expect = function(actual) {
		if(!stepsOverriden) {
			console.warn('Steps have not been overriden, this support code might have been loaded after steps definition, your tests will fail');
			throw 'Steps not in control flow'
		}
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
		var stepsOverriden = true;		
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
