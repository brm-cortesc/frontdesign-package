var gulp        = require('gulp'),
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
	pug         = require('gulp-pug');

var debug = true;
//banner
var pkg = require('./frontend.json');
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
var jsLibs = ['publication/js/libs/underscore-min.js',
              'publication/js/libs/angular.min.js', 
              'publication/js/libs/angular-route.min.js'];


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
	.pipe(rename('style.css')) //renombramos el archivo
	.pipe(gulp.dest('./publication/css')) // destino del archivo
	.pipe(sourcemaps.write('.')) //creamos sourcemap aparte
	.pipe(gulp.dest('./publication/css'))
	.pipe(browserSync.reload({
      stream: true
    }))

});

gulp.task('views', function() {
  return gulp.src('src/views/*.pug')
  	.pipe(data( function (file) {
  		return {
  			debug: debug
  		};
  	}))
	.pipe(pug({
		pretty: true
		}))
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


//tarea que observa cambios para recargar el navegador
gulp.task('watch', ['browserSync', 'views', 'css'], function (){

	gulp.watch('src/views/*.pug', ['views']);
	gulp.watch('src/stylus/**/*.styl', ['css']);
	gulp.watch('publication/js/**/*.js', browserSync.reload); 

});