const gulp        = require('gulp'),
      browserSync = require('browser-sync'),
      path        = require('path'),      
      argv        = require('yargs').argv;

//datos
const data = require('./../frontend.json');

const serverConfig = {
	port: 3000,
	server:{
		baseDir: data.build
	}
};


gulp.task('browserSync',  () =>{
 	browserSync.init(serverConfig);

});

