const uglyJS = require("uglifyjs-webpack-plugin");


exports.genMaps = ({type}) => ({
	devtool:type,

});


//Cargador Babel
exports.loadJS = ({include,exclude}={}) =>({
	module:{
		rules:[{
			test: /\.js$/,
			include,
			exclude,
			loader: 'babel-loader',
			options:{
				presets: [['env', {modules: false}]]
			}
		}],
	},

});

//Minificador JS

exports.miniJS = () => ({
	plugins: [new uglyJS()],

});
