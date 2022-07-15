// 基于 axios 封装网络请求
import theAxios from 'axios'
import router from '@/router'
// import { Toast } from 'vant'
import { getToken, removeToken } from './token.js' // , setToken
// import { getNewTokenAPI } from '@/api/index.js'
const axios = theAxios.create({
  // baseURL: 'http://toutiao.itheima.net',
  baseURL: 'http://geek.itheima.net',
  // 设置超时时间
  timeout: 20000 // 20 秒无响应，直接判定为超时
})
// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 统一让所有请求都携带 token
    // ?. 是 可选链操作符 ,如果前面对象里没有length,整个表达式原地返回 undefined
    // 如果getToken()在原地有 token 字符串,才能调用 length 获取长度
    // 此处我认为最简单的写法是直接写一个 getToken() 这里是为了用一下"可选链操作符"这个小知识
    if (getToken()?.length > 0 && !config.headers.Authorization) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // http 响应状态码为 2xx 3xx 就进入这里
    return response
  },
  async (error) => {
    // 对响应错误做点什么
    // http 响应状态码为 4xx 5xx 报错 就进入这里
    // 只有 401 我们需要跳转到登录页面
    if (error.response.status === 401) {
      // 不能使用 this.$router (因为 this 不是 vue 的组件对象,无法调用$router)
      // 因为 this.$router是为了拿到 router 路由对象,所以直接去上面引入 @/router 下的router对象即可

      // Toast({ message: '身份过期或未登录', duration: 1500 })
      removeToken()
      // 方式1：清除 Token，强制跳转到登陆，用户有感知
      // router.currentRoute 相当 在 vue 文件内的 this.$route -> 当前路由对象信息
      router.replace(`/login?path=${router.currentRoute.fullPath}`)

      // 方式2：使用 refresh_token 换回新的token 再继续调用，JS代码实现，用户无感知，效果好
      /* const { data: res } = await getNewTokenAPI()
      // 1. 更新 token 在本地
      setToken(res.data.token)
      // 2. 未完成这次请求，再次发起
      // err.config 就是上一次请求的配置对象
      // 3. 更新新的token 在请求头里面
      error.config.headers.Authorization = getToken()
      // 结果我们要 return 回原本逻辑页面调用的地方
      return axios(error.config)
    } else if (
      error.response.status === 500 &&
      error.config.url === '/v1_0/authorizations' &&
      error.config.method === 'put'
    ) {
      // 刷新的 refresh_token 也过期了
      removeToken()
      localStorage.removeItem('refresh_token')
      router.replace('/login')
      Toast({ message: '身份过期或未登录', duration: 1500 }) */
    }
    return Promise.reject(error)
  }
)
// 用这种方式替换原来直接导出axios对象的方式的优点：
// 在后期如果想将 axios 替换为 jquery 或 其他第三方技术的时候，只需在 箭头函数内部修改代码，而不用去动大量的其他代码
export default ({
  url,
  method = 'GET',
  params = {},
  data = {},
  headers = {}
}) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
