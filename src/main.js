import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 flexible.js - > 设置根标签字体大小（移动端适配）
import 'amfe-flexible'
import {
  NavBar,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Cell,
  CellGroup
} from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
