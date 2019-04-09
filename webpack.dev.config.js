const HOST = 'http://10.99.22.133:8180';
let webpack = require('webpack'),
    path = require('path'),
    merge = require('webpack-merge'),
    ExtractTextPlugin  = require('extract-text-webpack-plugin'),
    cleanWebpackPlugin = require('clean-webpack-plugin'),
    config = require('./webpack.config'),
    devConfig = merge(config,{
        // devtool:'cheap-module-eval-source-map',
        devtool: 'cheap-module-eval-source-map',
        resolve: {
            alias: {
                vue:'vue/dist/vue.js'
            }
        },
        devServer: {
            contentBase: path.resolve(__dirname, './app/'), // 文件入口
            host: '127.0.0.1',
            inline: true,  //开启热更新
            open: true,  // 自动打开浏览器
            port: 8000,
            // 配置跨域
            proxy: {
                '/exchange_manager/': {
                    target:HOST,
                    changeOrigin: true,
                    secure: false
                }
            }
        },
        plugins:[
            //开发环境插件
            new webpack.DefinePlugin({
                'process.env.NODE_EVN':'"development"'
            }),
            // 清空dist打包文件夹
            new cleanWebpackPlugin(['dist']),
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

    module.exports = devConfig;