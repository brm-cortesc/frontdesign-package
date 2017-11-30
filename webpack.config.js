//Archivo de configuración base de tareas con Webpack para BRM
//dependencias del proyecto
const path    = require('path');
const merge   = require('webpack-merge');
const webpack = require('webpack');

//configuraciones individuales
const parts   = require('./webpack.parts');

//Rutas del proyecto
const PATHS = {
	app: path.join(__dirname, 'src/'),
	build: path.join(__dirname, 'publication/'),
	css: 'css/',
	stylus: 'stylus/',
	views: 'views/',
	templates: 'templates/',
	es6: 'es6/',
	js: 'js/',
	assets: 'assets/'
};


// new HtmlWebpackPlugin({
// 	inject: false,
// 	template: '!!pug-loader!'+ PATHS.app + 'index.pug',
// })
const configBase = merge([
	{
		entry:{
			app: PATHS.app,
		},
		output:{
			path: PATHS.build,
			filename: "[name].[chunkhash:8].js"
		},
		plugins:[
			new webpack.NamedModulesPlugin(),
			
		],
	},
	
	parts.loadJS({
		include: PATHS.app
	}),

	// parts.lintJavaScript({include:PATHS.app}),

]);

const configProd = merge([

	parts.genMaps({type:'source-map'}),

	// parts.extractCSS({
	// 	use: "stylus-loader",
	// }),

	parts.loadImages({
		options:{
			limit:15000,
			name: "[name].[ext]",
		}
	}),

	parts.cleanDir(PATHS.build),

	parts.copyAssets({
		from: PATHS.app + PATHS.assets,
		to: PATHS.build + PATHS.assets
	}),

	parts.miniJS(),

	{
		recordsPath: path.join(__dirname, "records.json"),
	}



]);

const configDev = merge([
	{
		output:{
			devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]",
		}
	},
	parts.genMaps({type:"cheap-module-eval-source-map"} ),
	
	parts.devServer({
		host: process.env.HOST,
		port: process.env.port || 3000,
	}),

	parts.copyAssets({
		from: PATHS.app + PATHS.assets,
		to: PATHS.build
	}),

	parts.loadCSS(),
	parts.loadImages(),

]);



module.exports = (env) =>{
	console.log(`
		::-----------------------------::
		::-----------------------------::
		::-----------------------------::
		::-----------------------------::
		:: Ambiente actual: ${env} ::
		::-----------------------------::
		::-----------------------------::
		::-----------------------------::
		::-----------------------------::	
		`);
	
	// if ( env == 'production' ) return merge(configBase, configProd);

	// return merge(configBase, configDev)

	const pages = [
		parts.page({title:'Home', template: '!!pug-loader!'+ PATHS.app + 'index.pug', file:'index'}),
		parts.page({title:'otro', template: '!!pug-loader!'+ PATHS.app + 'index.pug', file:'otro'}),
	];

	const config =
		env === "production" ? configProd : configDev

	return pages.map(page => merge(configBase, config, page))


}