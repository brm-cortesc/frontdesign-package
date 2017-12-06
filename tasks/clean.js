const gulp   = require('gulp'),
	  del    = require('del');


//datos
const data = require('./../frontend.json');


const build = data.build;
//limpiamos publication para generar assets desde 0

gulp.task('clean:maps', ()=>{
	del('./publication/maps/')
} );



gulp.task('clean', ()=>{
	
	del(build).then(paths =>{
		console.log('se borraron los archivos carpetas:\n', paths.join('\n'));
	});

});

