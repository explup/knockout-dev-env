const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './ClientApp/src/appComponent.js',
        knockoutapp: './src/app/main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    devtool: 'inline-source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./ClientApp/dist/vendor-manifest.json')
        }),
        new ExtractTextPlugin("[name].bundle.css")
        //new webpack.optimize.CommonsChunkPlugin({
        //    name: 'common' // Specify the common bundle's name.
        // }),
        //new CleanWebpackPlugin(['ClientApp/dist']),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'ClientApp/dist')
    }
};