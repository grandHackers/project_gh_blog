var path = require('path');

module.exports = {
    entry: {
    	main: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js/')
    },
	module: {
		loaders: [
			{
			  test: /\.js$/,
			  loader: 'babel',
			  include: [
			    path.join(__dirname, 'src'),
                path.join(__dirname, 'config'),
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

