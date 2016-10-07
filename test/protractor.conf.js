'use strict'

var fs = require('fs');


exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    browserName: 'chrome'
  },
  cucumberOpts: {
    require: ['cucumber/support.js','cucumber/steps/*.js'],
    format: 'json'
  }
}
