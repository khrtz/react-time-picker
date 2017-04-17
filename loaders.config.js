module.exports = [
    {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel'
    },
    {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    }
]