'use strict'

var fs = require('fs');


exports.config = {
  framework: 'cucumber',
  capabilities: {
    browserName: 'firefox'
  },
  cucumberOpts: {
    require: ['cucumber/support.js','cucumber/steps/*.js'],
    format: 'json'
  }
}
