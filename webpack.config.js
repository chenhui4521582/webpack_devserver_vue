let path = require('path'),
    htmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin  = require('extract-text-webpack-plugin'),
    webpackConfig = {
        /*/入口/*/
        entry:{},

        /*/出口/*/
        output:{
            path:path.resolve(__dirname,'dist'),
            filename:"./js/[name].build.js"
        },

        /*/特例/*/
        resolve: {
            //import  省略后缀名
            extensions: ['*', '.js', '.json', '.vue', '.scss', '.css','.html'],
            alias: {
                '@': path.resolve("app"),
                '@components': path.resolve("app/v-component"),
                '@util': path.resolve("app/lib"),
                '@modules': path.resolve('app/modules')
            }
        },

        /*/ 设置开发环境的文件编译 /*/
        module:{
            rules:[
                {
                    test:/\.vue$/,
                    use:{
                        loader:'vue-loader'
                        // 使用组件   vue-loader , vue-template-compiler;
                    },
                    exclude:/node_modules/
                },
                {
                    test:/\.js$/,
                    use:{
                        loader:'babel-loader',
                        options: {
                            presets: ["es2015","stage-3"]
                        }

                        // 使用组件  babel-loader , babel-cli , babel-core , babel-preset-es2015
                    },
                    exclude:/node_modules/
                },
                {
                    test:/\.css$/,
                    //css 分离
                    use:ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {loader:'css-loader'},
                            // css 自动增加前缀  postcss-loader , 依赖 autoprefixer ;
                            {loader:'postcss-loader',options:{plugins:[require("autoprefixer")]}}
                        ],
                        publicPath:'../'
                    }),
                    exclude:/node_modules/
                },
                {
                    test:/\.scss$/,
                    //css 分离（ExtractTextPlugin.extract）
                    use:ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {loader:'css-loader'},
                            // css 自动增加前缀  postcss-loader , 依赖 autoprefixer ;
                            {loader:'postcss-loader',options:{plugins:[require("autoprefixer")]}},
                            {loader:'sass-loader'}
                        ],
                        publicPath:'../'
                    }),
                    exclude:/node_modules/
                },
                {
                    test:/\.(jpg|png|svg|gif)/,
                    use:{
                        loader:'file-loader',
                        options:{
                            limit:1000,
                            // 文件大小
                            name:'./images/[name]-[hash].[ext]'
                            //  name-> 文件名 , hash->哈希 , ext ->文件后缀
                        }
                    },
                    exclude:/node_modules/,
                },
                {
                    test:/\.html$/,
                    use:{
                        loader:'html-withimg-loader'
                    }
                }
            ]
        },

        /*/ 设置插件 /*/
        plugins:[]
    },
    htmlArray = [
        {entry:'index',title:'首页'},
        // {entry:'ie',title:'ie升级'}
    ];
    htmlArray.forEach(item=>{
        let {entry='',title=''} = item;
        webpackConfig.entry[entry] = path.resolve(__dirname,`./app/js/${entry}.js`);
        let htmlConfig = {
            template:`./app/page/${entry}.html`,
            filename:`./${entry}.html`,
            chunks:[entry],
            hash: true,
            inject:true
        };
        if(entry === 'index'){
            htmlConfig.chunks = ['index','ie'];
        }
        if(entry === 'ie'){
            htmlConfig.chunks = [];
        }
        webpackConfig.plugins.push(
            new htmlWebpackPlugin(htmlConfig)
        )
    });
    module.exports = webpackConfig;


