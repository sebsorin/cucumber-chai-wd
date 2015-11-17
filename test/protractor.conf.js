'use strict'

var fs = require('fs');


exports.config = {
  framework: 'cucumber',
  specs: [
    'features/*.feature'
  ],
  capabilities: {
    browserName: 'firefox'
  },
  cucumberOpts: {
    require: ['cucumber/steps/*.js','cucumber/support/*.js'],
    format: 'json',
    logTo: function(data) {
    	fs.appendFile('toto',data)
    } 
  }
}
