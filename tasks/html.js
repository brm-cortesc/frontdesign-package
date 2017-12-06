const gulp        = require('gulp'),
      reload     = require('browser-sync').reload,
      concat      = require('gulp-concat'), 
      rename      = require('gulp-rename'),
      dataJson    = require('gulp-data'),
      notify     = require('gulp-notify'),
      header      = require('gulp-header'),
      sourcemaps  = require('gulp-sourcemaps'),
      path        = require('path'),      
      pug         = require('gulp-pug'),
      plumber     = require('gulp-plumber'),      
      argv        = require('yargs').argv;


//datos
const data = require('./../frontend.json'),
      production = argv.production;

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
const libs = Object.keys(data.libs).map((k)=> data.assets + data.js + 'libs/' + data.libs[k]);


//Render de pug
gulp.task('views',  () =>{
  return gulp.src(data.app + data.views + '*.pug')
  .pipe(dataJson( function (file) {
      return {
        production: production,
        name: data.name,
        libs: libs
        
      };
    }))
  .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
  .pipe(pug({
    pretty: true
    }))
  .pipe(gulp.dest(data.build))
  .pipe(reload({
      stream: true
    }))
});
