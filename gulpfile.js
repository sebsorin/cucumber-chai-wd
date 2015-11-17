'use strict'

var gulp = require('gulp');

var protractor = require('protractor');


var protractor = require("gulp-protractor").protractor;

var webdriver_update = require("gulp-protractor").webdriver_update;

var child_process = require('child_process');


// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// launch protractor server
gulp.task('protractor_server', function() {
	var server = child_process.spawn('npm',['start']);

	server.stdout.on('data', function (data) {
  		console.log('' + data);
	});
	server.stderr.on('data', function (data) {
  		console.log('' + data);
	});
});



gulp.task('e2e',['webdriver_update','protractor_server'], function(done){
	gulp.src('src/test/cucumber/features/*.feature')
		.pipe(protractor({
		//debug: true,
        configFile: "test/protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8080']
    })).on('error', function(e) {
        console.log(e)
    }).on('end', done);  
})
