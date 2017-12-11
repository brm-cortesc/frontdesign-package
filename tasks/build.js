const gulp = require('gulp'),
	runSequence = require('run-sequence'),
	argv    = require('yargs').argv,
	del    = require('del');

//datos
const data = require('./../frontend.json'),
	  production = argv.production;


gulp.task('build', (cb)=>{

	if (production){
		runSequence(
			'clean',
	  		'assets:img',
	  		'assets:fonts',
	  		'assets:js',
	  		'assets:css',
	  		'views',
	  		'css',
	  		'minicss',
	  		'js',
	  		'js:ugly',
	  		'libs',
	  		'clean:maps',
	  		cb
		);
		
	}



})