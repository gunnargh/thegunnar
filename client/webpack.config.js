const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ExtractSass = new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
});
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    entry: {
        frontPage: './src/App.vue',
        style: './sass/output/frontend.scss'
    },
    output: {
        filename: '[name].js',        
        path: path.resolve(__dirname, './public/js'),
        publicPath: '/js/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(query-string|strict-uri-encode|vue-carousel|lazy-value)\/).*/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractSass.extract([{
                    loader: 'css-loader',
                    options: {
                        alias: {
                            "../assets/img": "./../../img"
                        },
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        ident: 'postcss',
                        plugins: (loader) => {
                            return [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('autoprefixer')(),
                                require('cssnano')()
                          ]; 
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }])
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  {
                      loader: 'file-loader',
                      options: {
                        outputPath: './../assets/img/',
                        context: './../assets/img/'
                      }
                  }
                ],
            }
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        ExtractSass,
        new CopyWebpackPlugin([{
            from: './img/',
            to: '../assets/img/'
        }]),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        
    ],
    devtool: 'source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    devServer: {
        host: '192.168.57.10',
        port: 8081,
        hot: false,
        inline: true,
        publicPath: 'http://192.168.57.10/',
        watchOptions: {
            poll: true
        },
        proxy: {
            '/': {
                target: {
                    host: "nginx",
                    protocol: "http:",
                    port: 80
                },
                changeOrigin: true,
                secure: false
            }
        }
    },
    watchOptions: {
        poll: true
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: {
                drop_console: true,
                pure_funcs: ['console.error']
              },
              ecma: 5,
              mangle: true,
              safari10: true,
              output: {
                comments: false,
                beautify: false
              }
            },
            sourceMap: true
          })
        ]
    },
};