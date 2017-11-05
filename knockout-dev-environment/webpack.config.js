const isDevBuild = process.argv.indexOf("--env.prod") < 0;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        vendor: [
            'jquery',
            'lodash',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.css',
            'jquery-validation',
            'jquery-validation-unobtrusive',
            //'Respond.js/dest/respond.min.js',
            'font-awesome/css/font-awesome.css',
            'knockout'
        ],
        app: './ClientApp/src/app.js',
        knockoutapp: './src/app/pages/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevBuild ? true : false
                        }
                    }]
                })
            },
            {
                test: /\.html$/,
                use: 'html-loader?exportAsEs6Default'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevBuild ? true : false
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                                sourceMap: isDevBuild ? true : false
                        }
                    }]
                })
            }
        ]
    },
    resolve: {
            extensions:[".ts", ".js", ".html"]
    },
    devtool: isDevBuild?'inline-source-map':'',

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        //new webpack.DllReferencePlugin({
        //    context: '.',
        //    manifest: require('./ClientApp/dist/vendor-manifest.json')
        //}),
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the vendor bundle's name.
         }),
        new CleanWebpackPlugin(['ClientApp/dist']),
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
        path: path.resolve(__dirname, 'ClientApp/dist')
    }
};