import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit.vue'
// import Chat from '@/views/Chat'
import { getToken } from '@/utils/token.js'
// 总结：
// 路由懒加载：为了让第一个页面，加载的app.js 小一点，打开网页快一点
// 思路：把组件对应的js，分成若干个.js ，路由切换到那个页面，才去加载对应的 .js
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'Login' */ '@/views/Login'),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (getToken()?.length > 0) {
        // next(false) // 留在原地
        // 想要进登录页面不留在原地了，而是返回首页
        next('/layout/home')
      } else {
        next() // 其他情况统统放行
      }
    }
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: 'Layout' */ '@/views/Layout'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: 'Home' */ '@/views/Home'),
        meta: {
          scrollT: 0 // 保存首页离开时，滚动条的位置
        }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: 'User' */ '@/views/User')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: 'Search' */ '@/views/Search')
  },
  {
    // 搜索结果页面
    path: '/search_result/:kw',
    component: () =>
      import(
        /* webpackChunkName: 'SearchResult' */ '@/views/Search/SearchResult'
      )
  },
  {
    // 文章的详情页
    path: '/detail',
    component: () =>
      import(/* webpackChunkName: 'Detail' */ '@/views/ArticleDetail')
  },
  {
    // 用户编辑页面
    path: '/user_edit',
    component: () =>
      import(/* webpackChunkName: 'UserEdit' */ '@/views/User/UserEdit.vue')
  },
  {
    // 聊天页面
    path: '/chat',
    component: () => import(/* webpackChunkName: 'Chat' */ '@/views/Chat')
  }
]

const router = new VueRouter({
  routes
})

// 路由的全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 需求：如果你已经登录了，不要切换到登陆页面
//   if (getToken()?.length > 0 && to.path === '/login') {
//     next('/layout/home')
//   } else {
//     next() // 其他情况统统放行
//   }
// })
export default router
