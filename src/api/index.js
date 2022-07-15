// 统一封装接口方法
// 每个方法负责请求一个 URL 地址
// 逻辑页面，导入这个接口页面，就可以发请求咯
// 好处：请求 URL 路径，可以在这里统一管理

import request from '@/utils/request.js'
import { getStorage } from '@/utils/storage.js'
// 即引入也同时向外按需导出
export * from './ArticleDetail.js'

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

// 用户 - 刷新 token
export const getNewTokenAPI = () =>
  request({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + getStorage('refresh_token')
    }
  })

// 用户 - 获取个人资料(编辑页面使用)
export const userProfileAPI = () =>
  request({
    url: '/v1_0/user/profile'
  })

// 用户 - 获取基本信息(我的页面显示数据)
export const getUserInfoAPI = () =>
  request({
    url: '/v1_0/user'
  })

// 用户 - 更新头像
export const updateUserPhotoAPI = (fd) =>
  request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd // 这个 fd 是外面一会儿传过来的 new FormData() 表单对象
  })

// 用户 - 更新基本资料
export const updateUserProfileAPI = (data) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
    /* : {
      name, // 昵称
      gender, // 性别 0：男 1：女
      birthday, // 生日（格式为2022-12-20）
      introl // 个人介绍
    } */
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
    url: '/v1_0/user/channels'
  })

// 频道 - 更新覆盖频道
export const updateChannelsAPI = ({ channels }) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels // 用户已选择的频道
    }
  })

// 频道 - 删除用户指定的频道
export const removeChannelAPI = ({ channelId }) =>
  request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })

// 文章 - 获取列表
export const getAllArticleListAPI = ({ channelId, timestamp }) =>
  request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp
    }
  })

// 文章 - 反馈 - 不感兴趣
export const dislikeArticleAPI = (artcileId) =>
  request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artcileId
    }
  })

// 文章 - 反馈 - 举报文章（按类型）
export const reportsArticleAPI = ({ articleId, typeId, remark }) =>
  request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: articleId,
      type: typeId,
      remark
    }
  })

// 文章 - 搜索的联想菜单
export const suggestListAPI = ({ keywords }) =>
  request({
    url: '/v1_0/suggestion',
    params: {
      q: keywords
    }
  })
// 搜索 - 搜索结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) =>
  request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
