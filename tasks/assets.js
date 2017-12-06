const gulp        = require('gulp'),
      path        = require('path');

//datos
const data = require('./../frontend.json');

const imagesPath = data.app + data.assets + 'images/**/*.{gif,svg,jpg,png}',
	  fontPath = data.app + data.assets + 'fonts/**/*.{svg,eot,ttf,woff,woff2}',
	  libsPath = data.app + data.assets + data.js + 'libs/**/**';


gulp.task('assets:img', ()=>{
	return gulp.src(imagesPath)
		   .pipe(gulp.dest(data.build + data.assets + data.images ))

});


gulp.task('assets:fonts', ()=>{
	return gulp.src(fontPath)
		   .pipe(gulp.dest(data.build + data.assets + data.fonts ))

});


gulp.task('assets:js', ()=>{
	return gulp.src(libsPath)
		   .pipe(gulp.dest(data.build + data.assets + data.js + 'libs/' ))

});