import '@/utils/console.js' // 去掉打印语句
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'highlight.js/styles/default.css' // 代码高亮的样式
import 'amfe-flexible' // 引入 flexible.js - > 设置根标签字体大小（移动端适配）
import directiveObj from './utils/directive'
import './VueComponent.js' // vant 组件的注册，单独分成一个js文件，让main.js更新

console.log(process.env)

Vue.use(directiveObj) // Vue.use()作用：执行目标对象的 install 方法并传入 Vue类
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
