import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 flexible.js - > 设置根标签字体大小（移动端适配）
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
