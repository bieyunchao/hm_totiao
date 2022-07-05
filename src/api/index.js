// 统一封装接口方法
// 每个方法负责请求一个 URL 地址
// 逻辑页面，导入这个接口页面，就可以发请求咯
// 好处：请求 URL 路径，可以在这里统一管理

import request from '@/utils/request.js'
import { getToken } from '@/utils/token.js'

// 登录 - 登录接口
export const loginAPI = ({ mobile, code }) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })

// 频道 - 获取所有频道
export const getAllChannelsAPI = () =>
  request({
    url: '/v1_0/channels'
  })

// 频道 - 获取用户选择的频道
// 注意：用户没有登录，默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () =>
  request({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: getToken()
    }
  })

// 文章 - 获取列表
export const getAllArticleListAPI = (channelId) =>
  request({
    url: ' /v1_0/articles',
    headers: {
      Authorization: getToken()
    },
    params: {
      channel_id: channelId,
      timestamp: +new Date()
    }
  })
