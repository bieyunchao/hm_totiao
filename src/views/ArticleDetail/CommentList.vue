<template>
  <div>
    <!-- 评论列表 -->
    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShowCmtInput,
        'art-cmt-container-2': !isShowCmtInput
      }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多评论了，请发表评论"
        @load="onLoad"
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="item in commentArr" :key="item.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="item.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ item.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="item.is_liking"
                @click="loveFn(item, true)"
              />
              <van-icon
                name="like-o"
                size="16"
                color="gray"
                v-else
                @click="loveFn(item, false)"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">{{ item.content }}</div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ dateFormat(item.pubdate) }}</div>
        </div>
      </van-list>
    </div>
    <!-- 发表评论的容器 -->
    <div>
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="isShowCmtInput">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="toggleShowFn">发表评论</div>
        <div class="icon-box">
          <van-badge :content="totalCount === 0 ? '' : totalCount" max="99">
            <van-icon
              name="comment-o"
              size="0.53333334rem"
              @click="commentClickFn"
            />
          </van-badge>
          <van-icon name="star-o" size="0.53333334rem" />
          <van-icon name="share-o" size="0.53333334rem" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea
          placeholder="友善评论、理性发言、阳光心灵"
          v-focus
          @blur="blurFn"
          v-model.trim="comText"
        ></textarea>
        <van-button type="default" :disabled="!comText" @click="sendFn"
          >发布</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  commentsListAPI,
  loveCommpentAPI,
  unLoveCommpentAPI,
  commentSendAPI
} from '@/api/index.js'
import { timeAgo } from '@/utils/date.js'
export default {
  data() {
    return {
      offset: null, // 偏移量的评论 ID
      commentArr: [], // 评论列表
      totalCount: 0, // 评论的总数量
      isShowCmtInput: true, // 底部显示短/高的评论容器
      comText: '', // 发布评论的内容
      loading: true,
      finished: false,
      lastId: null // 分页
    }
  },
  async created() {
    const { data: res } = await commentsListAPI({
      id: this.$route.query.art_id
    })
    this.commentArr = res.data.results
    this.totalCount = res.data.total_count
    this.lastId = res.data.last_id // 分页
    this.loading = false
  },
  methods: {
    dateFormat: timeAgo,
    // 评论的小心心 点赞/取消点赞
    async loveFn(commentObj, bool) {
      if (bool) {
        // 目标：取消点赞
        commentObj.is_liking = false
        // 发送取消点赞的请求
        await unLoveCommpentAPI({
          commId: commentObj.com_id
        })
      } else {
        // 目标：点赞
        commentObj.is_liking = true
        // 发送点赞的请求
        await loveCommpentAPI({
          commId: commentObj.com_id
        })
      }
    },
    // 显示 - 评论输入框（第2套 高）
    toggleShowFn() {
      this.isShowCmtInput = false
    },
    // 评论按钮 -> 点击事件 -> 把第一条评论滑动到最上面
    commentClickFn() {
      // JS代码是在 html + css 运行后，真实DOM已经在网页上了，从document 往下获取标签是 ok 的
      /* const articleHeight =
        document.querySelector('.article-container').scrollHeight
      window.scrollTo(0, articleHeight) */
      // 原生标签 比较方便的方法 scrollIntoView()，让原生的标签滚动到屏幕最上面
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 发布按钮的点击事件
    async sendFn() {
      const { data: res } = await commentSendAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      this.commentArr.unshift(res.data.new_obj)
      this.totalCount++
      this.comText = ''
      this.commentClickFn() // 让第一条评论滚动到屏幕上
    },
    // 输入框失去焦点
    blurFn() {
      setTimeout(() => {
        this.isShowCmtInput = true
      })
    },
    // 底部加载更多
    async onLoad() {
      const { data: res } = await commentsListAPI({
        id: this.$route.query.art_id,
        offset: this.lastId
      })
      if (res.data.last_id === null) {
        return (this.finished = true)
      }
      this.commentArr = [...this.commentArr, ...res.data.results]
      this.lastId = res.data.last_id // 分页
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}

/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
