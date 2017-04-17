var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './index',
    output: {
        publicPath: 'http://localhost:9090/assets',
        path: path.join(__dirname, 'vendor'),
        filename: 'bundle.js',
    },
    module: {
        loaders: require('./loaders.config')
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}