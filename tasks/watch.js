const gulp        = require('gulp'),
      watch       = require('gulp-watch'),
      path        = require('path');


//datos
const data = require('./../frontend.json');

const imagesPath = data.app + data.assets + 'images/**/*.{gif,svg,jpg,png}';
const fontPath = data.app + data.assets + 'fonts/**/*.{svg,eot,ttf,woff,woff2}'


gulp.task('watch', ['browserSync'], ()=>{

  watch(data.app + data.stylus, ()=>{
  	gulp.start('css', 'csslint')
  } );


  watch( [data.app + data.views, data.app + data.templates], ()=>{
  	gulp.start('views')
   });

  watch(data.app + data.babel, ()=>{
  	gulp.start('js');
  });

  watch(imagesPath, ()=>{
  	gulp.start('assets:img');

  });

  watch(fontPath, ()=>{
  	gulp.start('assets:fonts');

  });


});


