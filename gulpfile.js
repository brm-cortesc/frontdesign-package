var gulp      = require('gulp'),
  browserSync = require('browser-sync').create(),
  concat      = require('gulp-concat'), 
  rename      = require('gulp-rename'),
  minifyCSS   = require('gulp-minify-css'),
  uglify      = require('gulp-uglify'),
  data        = require('gulp-data'),
  header      = require('gulp-header'),
  sourcemaps  = require('gulp-sourcemaps'),
  stylus      = require('gulp-stylus'),
  nib         = require('nib'),
  fs          = require('fs'),
  cache       = require('gulp-cache'),
  pug         = require('gulp-pug'),
  argv        = require('yargs').argv;  

//data
var pkg   = require('./frontend.json'),
    debug = argv.debug;


//Error handler//
function onError(err) { console.log(err); this.emit('end'); };

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @link <%= pkg.author.name %> - <%= pkg.author.email %>',
  ' * @license <%= pkg.license %>',
  ' *<%= new Date() %>',
  ' */',
  ''
].join('\n');

//arreglo concatenar JS en el orden en el que se cargan
var jsLibs = ['publication/js/libs/jquery.js',
              'publication/js/libs/jquery.validate.js',
              'publication/js/libs/jquery.bxslider.min.js',
              'publication/js/libs/bootstrap.min.js',
              'publication/js/libs/velocity.min.js'
              ];


//Tarea para comprimir las libreriras JS
gulp.task('libs', function() {  
     return gulp.src(jsLibs)
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(concat('concat.libs.js'))
        .pipe(gulp.dest('publication/js'))
        .pipe(rename('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('publication/js'));
});


//tarea para compilar stylus
gulp.task('css', function () {
  return gulp.src('src/stylus/main.styl')
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(sourcemaps.init()) //cargamos tarea de sourcemaps
  .pipe(stylus({ //iniciamos stylus
    use: nib(), // cargamos nib para uso de css3
    compress: false
  })) 
  .on('error', onError)
  .pipe(rename('style.css')) //renombramos el archivo
  .pipe(gulp.dest('./publication/css')) // destino del archivo
  .pipe(sourcemaps.write('.')) //creamos sourcemap aparte
  .pipe(gulp.dest('./publication/css'))
  .pipe(browserSync.reload({
      stream: true
    }))

});

//Concatenar y minificar CSS
gulp.task('minicss', function() {
  return gulp.src(['publication/css/**/*.css', '!publication/css/**/'+pkg.name+'.min.css'])
  .pipe(minifyCSS())
  .pipe(concat(pkg.name +'.min.css'))
  .pipe(gulp.dest('publication/css'))

});


//Render de pug
gulp.task('views', function() {
  return gulp.src('src/views/*.pug')
    .pipe(data( function (file) {
      return {
        debug: debug,
        name: pkg.name
      };
    }))
  .pipe(pug({
    pretty: true
    }))
  .on('error', onError)
  .pipe(gulp.dest('./publication'))
  .pipe(browserSync.reload({
      stream: true
    }))
});



//Tarea base de browsersync para crear el servidor
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'publication/'
    },
  })
});

gulp.task('limpiar', function (done) {
  return cache.clearAll(done);
});


//tarea que observa cambios para recargar el navegador
gulp.task('watch', ['browserSync', 'views', 'css'], function (){

  gulp.watch('src/stylus/**/*.styl',  ['css']);
  gulp.watch(['src/views/*.pug', 'src/templates/**/*.pug'],  ['views']);
  gulp.watch('publication/js/**/*.js', browserSync.reload);
  gulp.watch('publication/images/**/*.{gif,svg,jpg,png}', browserSync.reload);
  gulp.watch('publication/fonts/**/*.{svg,eot,ttf,woff,woff2}', browserSync.reload);

});