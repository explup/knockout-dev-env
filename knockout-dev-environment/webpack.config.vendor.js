var isDevBuild = process.argv.indexOf("--env.prod") < 0;
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
module.exports = {
    entry: {
        vendor: [
            'jquery',
            'lodash',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.css',
            'jquery-validation',
            'jquery-validation-unobtrusive',
            'Respond.js/dest/respond.min.js',
            'font-awesome/css/font-awesome.css',
            'knockout'
        ]
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
                test: /\.modernizrrc.js$/,
                use: ['modernizr-loader']
            },
            {
                test: /\.modernizrrc(\.json)?$/,
                use: ['modernizr-loader', 'json-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, "path/to/.modernizrrc")
        }     
    },
    devtool: isDevBuild?'inline-source-map':'',
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: 'ClientApp/dist/vendor/[name]-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        }),
        new ExtractTextPlugin("[name].[contenthash].css"),
        //new webpack.optimize.CommonsChunkPlugin({
        //    name: 'common' // Specify the common bundle's name.
        // }),
        new CleanWebpackPlugin(['ClientApp/dist']),
        new CleanObsoleteChunks(),
    ].concat(isDevBuild ? [] 
                        : [new UglifyJSPlugin({ compress: { warnings: false } }),
                           new OptimizeCssAssetsPlugin({
                                                        assetNameRegExp: /\.css$/g,
                                                        cssProcessor: require('cssnano'),
                                                        cssProcessorOptions: { discardComments: { removeAll: true } },
                                                        canPrint: true}) ])
    ,
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'ClientApp/dist/vendor'),
        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib'
    }
};