// 基于 axios 封装网络请求
import theAxios from 'axios'

const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  // 设置超时时间
  timeout: 20000 // 20 秒无响应，直接判定为超时
})

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
