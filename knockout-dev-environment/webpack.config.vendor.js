﻿const path = require('path');
var webpack = require('webpack');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
            'modernizr',
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
            path: 'ClientApp/dist/[name]-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        }),
        new ExtractTextPlugin("[name].bundle.css")
        //new webpack.optimize.CommonsChunkPlugin({
        //    name: 'common' // Specify the common bundle's name.
        // }),
        //new CleanWebpackPlugin(['ClientApp/dist']),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'ClientApp/dist'),
        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib'
    }
};