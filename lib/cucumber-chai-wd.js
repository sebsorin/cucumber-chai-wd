'use strict';

module.exports = function cucumberChaiWd(world, useShould) {
  var arity = require('util-arity');
  var chaiAsPromised = require('chai-as-promised');
  var classExtend = require('class-extend');
  var webdriver = require('selenium-webdriver');
  var chai = require('chai');
  var chaiAssertion = chai.Assertion;
  var stepsOverridden = false;

  chai.use(chaiAsPromised);

  // Only load should when the useShould parameter is not provided, or is true
  if(useShould === undefined || useShould === true) {
    chai.should();
  }

  chaiAssertion.extend = classExtend.extend;

  // Extend Chai Assertion
  chai.Assertion = chaiAssertion.extend({
    constructor: function(obj, msg, stack) {
      var wrappedObj = obj;
      if(!webdriver.promise.isPromise(obj)) {
        wrappedObj = browser.driver.controlFlow().execute(function() {
          return obj;
        });
      }
      chaiAssertion.prototype.constructor.call(this, wrappedObj, msg, stack);
    }
  });

  /**
   * Show a message when expect is called before steps have been modified
   */
  global.expect = function(actual) {
    if(!stepsOverridden) {
      console.warn('Steps have not been overridden, this support code might have been loaded after steps definition, your tests will fail');
      throw 'Steps not in control flow';
    }
    return chai.expect(actual);
  };

  /**
   * Execute a function in the webdriver control flow
   */
  function wrapInControlFlow(world, fn, args) {
    stepsOverridden = true;

    return browser.driver.controlFlow().execute(function() {
      return fn.apply(world, args);
    });
  }

  /**
   * Wrap the provided step while conserving argument counts using arity
   */
  function overRideStep(world, originalStepName) {
    var originalStep = world[originalStepName];
    world[originalStepName] = function(fixture, fn) {
      originalStep(fixture, arity(fn.length, function() {
        return wrapInControlFlow(world, fn, arguments)
      }));
    };
  }

  overRideStep(world, 'Then');
  overRideStep(world, 'When');
  overRideStep(world, 'Given');
  overRideStep(world, 'defineStep');
};
