'use strict'

var gulp = require('gulp');

var protractor = require('protractor');


var protractor = require("gulp-protractor").protractor;

var webdriver_update = require("gulp-protractor").webdriver_update;

var child_process = require('child_process');

var serverProcess;

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);



// launch protractor server
gulp.task('protractor_server', function(done) {

  // to be able to kill at end of test, run in detach
	serverProcess = child_process.spawn('npm',['start'], {detached: true});

	serverProcess.stdout.on('data', function (data) {
  		console.log('' + data);
  		if (data.toString().includes('Starting express web server')) {
  			done();
  		}
	});
	serverProcess.stderr.on('data', function (data) {
  		console.log('' + data);
	});
	serverProcess.stderr.on('exit', function () {
  		done('Error launching server');
	});
});


// launch protractor test server before e2e testS
gulp.task('e2e',['webdriver_update','protractor_server'], function(done){
	gulp.src('test/cucumber/features/*.feature')
		.pipe(protractor({
		   // debug: true,
        configFile: "test/protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8081']
    })).on('error', function(e) {
        console.log(e);
        console.log('#### KILLING SERVER ######');
        process.kill(-serverProcess.pid);
        done(e);
    }).on('end', function() {
    	 process.kill(-serverProcess.pid);
    	done();
    });  
})
