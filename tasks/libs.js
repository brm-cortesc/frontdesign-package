const gulp       = require('gulp'),
      concat     = require('gulp-concat'), 
      rename     = require('gulp-rename'),
      header     = require('gulp-header'),
      uglify      = require('gulp-uglify'),
      path       = require('path'),
      plumber    = require('gulp-plumber');

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


//Traemos las librerias js que se estén incluyendo en frontend.json.
//y las pasamos a un array para poderlas usar en gulp.task()

const libs = Object.keys(data.libs).map((k)=> data.app + data.assets + data.js + 'libs/' + data.libs[k]);

//Tarea para comprimir las libreriras JS
gulp.task('libs',  () =>{ 
    console.log('Las librerías que se van a minificar son:')
    console.log(libs)
     return gulp.src(libs)
        // .pipe(header(banner, { pkg : data } ))
        .pipe(plumber())
        .pipe(concat('concat.libs.js'))
        .pipe(gulp.dest(data.build + data.assets + data.js))
        .pipe(rename('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(data.build + data.assets + data.js));
});