import request from '@/utils/request.js'

// 文章 - 获取文章详情
export const detailAPI = ({ artId }) =>
  request({
    url: `/v1_0/articles/${artId}`
  })

// 文章 - 点赞文章
export const likeArticleAPI = ({ articleId }) =>
  request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
// 文章 - 取消点赞文章
export const unLikeArticleAPI = ({ articleId }) =>
  request({
    url: `/v1_0/article/likings/${articleId}`,
    method: 'DELETE'
  })

// 评论 - 点赞评论
export const loveCommpentAPI = ({ commId }) =>
  request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commId
    }
  })

// 评论 - 取消点赞评论
export const unLoveCommpentAPI = ({ commId }) =>
  request({
    url: `/v1_0/comment/likings/${commId}`,
    method: 'DELETE'
  })

// 评论 - 发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
  // 动态data参数对象
  const data = {
    target: id,
    content
  }
  if (art_id !== null) {
    // 如果有，就拼接上
    data.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
// 文章 - 获取 - 评论列表
export const commentsListAPI = ({ id, offset = null, limit = 10 }) =>
  request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: id,
      offset,
      limit
    }
  })
// 用户 - 关注
export const userFollowedAPI = ({ userId }) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })

// 用户 - 取消关注
export const userUnFollowedAPI = ({ userId }) =>
  request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
