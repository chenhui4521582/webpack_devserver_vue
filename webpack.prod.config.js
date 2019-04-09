let merge = require('webpack-merge'),
    webpack = require('webpack'),
    path = require('path'),
    config = require('./webpack.dev.config'),
    cleanWebpackPlugin = require('clean-webpack-plugin'),
    uglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    ExtractTextPlugin  = require('extract-text-webpack-plugin'),
    // 生产环境 设置
    prodConfig = merge(config,{
        devtool:'cheap-source-map',
        resolve:{
            alias:{
                vue:'vue/dist/vue.min.js'
            }
        },
        plugins:[
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),

            // 清空dist打包文件夹
            new cleanWebpackPlugin(['dist']),

            // 代码压缩
            new uglifyJsPlugin(),

            // 分离css
            new ExtractTextPlugin({
                filename:'./css/[name].css',
                allChunks: true
            }),

            // 允许错误不打断程序
            new webpack.NoEmitOnErrorsPlugin(),

            // 全局注册jquery
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "window.jQuery":"jquery"
            })
        ]
    });

module.exports = prodConfig;






