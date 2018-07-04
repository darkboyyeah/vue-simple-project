const path = require('path');
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
const htmlWebpackPlugin = require('html-webpack-plugin');
// 如果要配置插件，需要往到处的对象中，挂载一个plugins 节点。

const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: "development",
  entry: path.join(__dirname,"./src/main.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js"
  },
  plugins: [   // 所有webpack  插件的配置节点
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),   // 指定模板文件路径
      filename: 'index.html'    //  设置生成的内存页面名称
    }),
    new VueLoaderPlugin()
  ],
  module: {  // 配置 所有 第三方 loader 模块的
    rules: [  // 第三方模块的配置规则
      {test: /\.css$/, use: ['style-loader','css-loader']}, // 处理 css 文件的loader
      {test: /\.(jpg|png|jpeg|gif|bmp)$/, use: 'url-loader?limit=108397&name=[hash:8]-[name].[ext]'},   // 处理图片路径的 loader
      //  安装命令为： cnpm i url-loader file-loader -D
      //  注意： file-loader  是url-loader 内部依赖的，所以不用在配置规则中写。
      //  limit给定的值， 是图片的大小，单位是byte,如果我们引用的图片，大于或等于给定的值，
      //  则不会转化为 base64格式的字符串。如果小于给定的limit，则会转化为 base64的字符串。  
      {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},   // 处理字体文件的loader
      {test: /\.js$/, use: 'babel-loader',exclude: /node_modules/},
      //处理 .vue文件的loader
      {test: /\.vue$/, use: 'vue-loader'}
    ]
  }
}