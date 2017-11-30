//Dependencias
const nib          = require('nib');
const extractText  = require('extract-text-webpack-plugin');
const cleanWebpack = require('clean-webpack-plugin');
const copyWeb      = require('copy-webpack-plugin');
const uglyJS       = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

//sourcemaps
exports.genMaps = ({type}) => ({
	devtool:type,

});


//configuracion de servidor HMR
exports.devServer = ({ host, port } = {}) => ({
	devServer:{
			historyApiFallback: true,
			stats: 'errors-only',
			host,
			port,

			overlay:{
				errors:true,
				warnings:true,
			}

	},
});


//modulo para sitios multipagina
exports.page = (
	{
		path="",
		template = require.resolve("html-webpack-plugin/default_index.ejs"),
		title,
		file,
	} = {}
	) =>({

		plugins:[
			new HtmlWebpackPlugin({
				// filename: `${path && path + "/"}index.html`,
				filename: `${file}.html`,
				template,
				title,
			})
		],
	})
// exports.page = (
// 	{
// 		path = "",
// 		template = require.resolve(
// 		"html-webpack-plugin/default_index.ejs"
// 		),
// 	title,
// 	} = {}
// 	) => ({
// 	plugins: [
// 	new HtmlWebpackPlugin({
// 	filename: `${path && path + "/"}index.html`,
// 	template,
// 	title,
// 	}),
// 	],
// });


//cargador de CSS
exports.loadCSS = ({include,exclude}= {}) => ({
	module:{
		rules:[{
			test: /\.styl$/,
			include,
			exclude,
			use:[
				"style-loader",
				"css-loader",
				{
					loader: "stylus-loader",
					options:{
						use: [require('nib')],
					}
			}],
			

		}],

	},

});

//generador de archivos .css //not working
exports.extractCSS = ({include,exclude, use}={}) => {

	const plugin = new extractText({
		allChunks:true,
		filename:"[name].[contenthash:8].css",

	});

	return {
		module:{
			rules:[{
				test: /\.css$/,
				include,
				exclude,

				use: plugin.extract({
					use,
					fallback: ["style-loader", "css-loader"],
				}),
			}],
		},
		plugins: [plugin],
	};

};


//Cargador de imgs
exports.loadImages = ({include,exclude, options}={}) =>({
	module:{
		rules:[{
			test: /\.(png|jpg|svg)$/,
			include,
			exclude,
			use:{
				loader: 'url-loader',
				options,
			},
		},],
	},

});


//Cargador Babel
exports.loadJS = ({include,exclude}={}) =>({
	module:{
		rules:[{
			test: /\.js$/,
			include,
			exclude,
			use: 'babel-loader',
		},],
	},

});


//Minificador JS

exports.miniJS = () => ({
	plugins: [new uglyJS()],

});




//limpiador de directorio pub/dist/build
exports.cleanDir = (path) => ({
	plugins: [new cleanWebpack(path)],
});

//copiar assets de src a pub/dist/build
exports.copyAssets = ({from,to}={}) => ({
	plugins: [new copyWeb([
		{
			from,
			to,
		},
		],
		{
			ignore:[
			'**/.DS_Store',
			'**/*.md',
		]
		}

		)]
});


