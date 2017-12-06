const gulp        = require('gulp'),
      reload 	  = require('browser-sync').reload,
      concat      = require('gulp-concat'), 
      rename      = require('gulp-rename'),
      uglify      = require('gulp-uglify'),
      header      = require('gulp-header'),
      sourcemaps  = require('gulp-sourcemaps'),
      path        = require('path'),      
      babel       = require('gulp-babel'),
      plumber     = require('gulp-plumber'),      
      argv        = require('yargs').argv;

//datos
const data = require('./../frontend.json');

//Stamps
const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.author.name %> - <%= pkg.author.email %>',
  ' * @license <%= pkg.license %>',
  ' *<%= new Date() %>',
  ' */',
  ''
].join('\n');



//Babel transpailer
gulp.task('js', ()=>{
  return gulp.src(data.app + data.babel+ '*js')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel({
   'presets': ['env']
  }))
  .pipe(sourcemaps.write('../../maps')) //creamos sourcemap aparte
  .pipe(gulp.dest(data.build + data.assets + data.js))
  // .pipe(uglify())
  .pipe(gulp.dest(data.build + data.assets + data.js))
  .pipe(reload({
      stream: true
    }))

});

//js compiler
gulp.task('js:ugly', ()=>{
  return gulp.src([data.build + data.assets + data.js + '*js', '!'+data.build + data.assets + data.js + 'libs/**', '!'+data.build + data.assets + data.js + 'libs.min.js' ])
  .pipe(uglify())
  .pipe(gulp.dest(data.build + data.assets + data.js))

});

