const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {},
  chainWebpack(config){
    config.plugin('html').tap(args =>{
      args[0].title = "谷粒外卖"
      return args
    })
  },
});
