const isDevBuild = process.argv.indexOf("--env.prod") < 0;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        app: './ClientApp/src/app.js',
        knockoutapp: './src/app/pages/index.js',
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
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    resolve: {
            extensions:[".ts", ".js", ".html"]
    },
    devtool: isDevBuild?'inline-source-map':'',

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
    ].concat(isDevBuild ? [] 
                        : [new UglifyJSPlugin({ compress: { warnings: false } }),
                           new OptimizeCssAssetsPlugin({
                                                        assetNameRegExp: /\.css$/g,
                                                        cssProcessor: require('cssnano'),
                                                        cssProcessorOptions: { discardComments: { removeAll: true } },
                                                        canPrint: true}) ])
    ,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'ClientApp/dist')
    }
};