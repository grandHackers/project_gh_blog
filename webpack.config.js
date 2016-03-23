var path = require('path');

module.exports = {
    entry: {
    	main: path.resolve(__dirname, 'src','components' , 'main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js/'),
    },
	module: {
		loaders: [
			{
			  test: /\.js$/,
			  loader: 'babel',
			  include: [
			    path.join(__dirname, 'src')
			  ],
			  query: {
			  	presets: [ 'react', 'es2015' ]
			  }
			}, 
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' }
            //
		]
	}
};

