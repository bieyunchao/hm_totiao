// 统一封装接口方法
// 每个方法负责请求一个 URL 地址
// 逻辑页面，导入这个接口页面，就可以发请求咯
// 好处：请求 URL 路径，可以在这里统一管理

import axios from '@/utils/request.js'

// 频道 - 获取所有频道
export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    methods: 'GET'
  })
}
