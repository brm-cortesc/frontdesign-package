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
	  		'views',
	  		'css',
	  		'minicss',
	  		'js',
	  		'libs',
	  		'clean:maps',
	  		'assets:img',
	  		'assets:fonts',
	  		cb
		);
		
	}



})