const path    = require('path'),
 	  webpack = require('webpack');
	  argv    = require('yargs').argv;


const data = require('./../frontend.json'),
	  production = argv.production;

const inputJS = path.join(__dirname, data.app + data.babel);
const outputJS = path.join(__dirname, data.build + data.assets + data.js);

module.exports = (extractVendorLibs)=>{
	let webpackConfig = {
		entry: {
			app:
				path.resolve(__dirname, 'src/babel/index.js')
		},
		module: {
			rules: [
			    {
					test: /\.js$/,
					exclude: path.resolve(__dirname, "node_modules/"),
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
			    }
		  	]
		},
		output: { 
			path: './src/assets/',
			filename:  'bundle.js'
		},
		resolve: {
			modules: [inputJS, 'node_modules', 'bower_components']
		},
		plugins: []
	};

	// if (production) {
	// 	webpackConfig.plugins.push(
	// 		new webpack.optimize.UglifyJsPlugin({
	// 		    compress: { warnings: false }
	//     	}),
	// 	 	new webpack.NoEmitOnErrorsPlugin()
	// 	)
	// }else {
	// 	console.log('hola dev')
	// 	webpackConfig.devtool = 'inline-source-map'
	// 	webpackConfig.entry.app.unshift('webpack-hot-middleware/client?reload=true')
	// 	webpackConfig.plugins.push(
	// 		new webpack.HotModuleReplacementPlugin()
	// 	)
	// }

	// if(extractVendorLibs) {
	// 	webpackConfig.plugins.push(
	// 		new webpack.optimize.CommonsChunkPlugin({
	// 			name: 'vendor',
	// 			filename: 'vendor.js'
	// 		})
	// 	);
 //    }

    // return webpackConfig;
};