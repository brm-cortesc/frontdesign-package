'use strict';
/*Indica a grunt que es un archivo que contiene tareas a ejecutar*/
module.exports = function(grunt) {

	 var debug;
	 debug = !!grunt.option('debug');
	 require('load-grunt-tasks')(grunt);

	//Se inicia la configuración del projecto
		grunt.initConfig({
		//Le indica cuales archivos de configuracion se van a leer
		pkg: grunt.file.readJSON('frontend.jquery.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Inicio de la configuración de las tareas
		//Tarea que se utiliza para limpiar los archivos temporales que se crean al momento de minificar o combinar archivos
		clean: {
			files: ['dist']
		},
		//Concatena archivos css o js en un solo archivo
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['publication/js/libs/jquery.js', 'publication/js/libs/bootstrap.min.js', 'publication/js/libs/jquery.validate.js'],
				dest: 'publication/js/concat.<%= pkg.name %>.js'
			},
		},
		//Minifica librerias js (jquery,bootstrap, etc)
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'publication/js/libs.<%= pkg.name %>.min.js'
			},
		},
		//Se utiliza para revisar el código js
		qunit: {
			files: ['test/**/*.html','publication/js/*.js']
		},
		//Depura el código js
		jshint: {
			options: {
				jshintrc: true
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src: {
				src: ['publication/js/*.js','publication/**/*.js']
			},
			test: {
				src: ['test/**/*.js']
			},
			css: {
				src: ['publication/css/**/*.*','publication/css/*.*']
			},
		},
		stylus: {
			map:{
			  files: {
					'publication/css/style.css': 'src/stylus/main.styl'
				}
			},
			options:{
				 banner: '<%= banner %>', 
				compress: false,
				sourcemap:{
				           inline: true
				},
				define: {
				         DEBUG: debug
				       }
			},
			/*Tarea para compilar stylus, escuchamos solo el archivo base donde se importan todas las librerias*/
			compile: {
				files: {
					'publication/css/style.css': 'src/stylus/main.styl'
				}
			}
		},
		// Minifica y combina el código css
		cssmin: {
		      combine: {
		      files: {
		        'publication/css/<%= pkg.name %>.min.css': ['publication/css/*.*', "!publication/css/<%= pkg.name %>.min.css", "!publication/css/readme.md"]
		      }
		    }
		  },
		
		/*Cargamos Jade como template engine*/
		pug: {
			 compile: {
					 options: {
							 pretty: true,
							 data:{
							 	debug: debug //Variable para compilar html con archivos de JS y CSS comprimidos si es false exporta cada archivo, si es true exporta con el link del archivo compilado 
							 }
					 },
					 files: [ {
						 cwd: "src/jTemplates", //Directorio donde se encuentran los archivos
						 src: [ '**/*.pug', '!**/partials/*.pug', '!**/modules/*.pug' ],//ignoramos las carpetas con los fragmentos de código
						 dest: "publication/",
						 expand: true,//Esto  es para exportar el html comprimido o extendido
						 ext: ".html" //Extensión de los archivos
					 } ]
			 }
		},

		//Se usa para reiniciar automaticamente el navegador al momento de modificar algún archivo *leer reload.txt*
		browserSync: {
					dev: {
							bsFiles: {
									src : ['publication/**/*.*','publication/*.*']
							},
							options: {
									watchTask: true, // < VERY important
									injectChanges: true,
									server: {
												baseDir: "publication/"
											}
							}
					}
			},
				//Se utiliza para ejecutar comandos de consola desde el archivo
		shell: {
			phantom: {
				command: 'phantomjs publication/js/phantom/screen.js',
				options: {
						stdout: true
				},
				init: {                      // Target
							options: {                      // Options
									stderr: false
							},
							command: 'git init'
					},

				stats: {                      // Target
							options: {                      // Options
									stderr: false
							},
							command: 'git status'
					},
					add: {                      // Target
							options: {                      // Options
									stderr: false
							},
							command: 'git add .'
					},

				
		},
		stylus:{
			command: 'stylus -u nib -u jeet --sourcemap src/stylus/main.styl --out publication/css/style.css ',
			options: {
					stdout: true,
					stderr: true
			}

		}

	
		},
		/*Mantiene una tarea que observa los archivos y ejecuta tareas atumaticamente al momento de detectar cambios, solo se observan los archivos de los preprocesadores para evitar loops.*/
		watch: {
			brm: {
				
				files: ['src/**/**.pug',
						'src/*.pug',
						'src/**/**.styl',
						'src/*.styl',
						'publication/*.js',
						'publication/**/**.js',
						'publication/images/**.*'
						],

				tasks : ["pug", "cssmin", "shell:stylus"],/*las tareas que se corren por defecto al observar cambios en los archivos*/
				task : ['shell:stats']
			}
		},
	});
// Fin de la configuración de las tareas

	// Se especifican los plugins que se van a utilizar

	// Se programan las tareas a ejecuar al momento de llamar "grunt %nombretarea%".
	grunt.registerTask('minicss', ['cssmin','clean']);
	grunt.registerTask('minijs', ['concat','uglify','clean']);
	grunt.registerTask('csstylus', ['stylus']);
	grunt.registerTask('template', ['pug']);
	grunt.registerTask('comando', ['shell:phantom']);
	grunt.registerTask('git', ['shell:init']);
	grunt.registerTask('stat', ['shell:stats','shell:add']);
	grunt.registerTask('observar', ['watch:brm','browserSync']);
	grunt.registerTask('depurar', ['jshint']);

	grunt.registerTask('default', ['browserSync','watch']); 
};