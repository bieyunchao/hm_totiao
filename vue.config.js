// vue.config.js
const path = require('path')
const themePath = path.join(__dirname, './src/styles/theme.less')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePath}";`
        }
      }
    }
  }
}
