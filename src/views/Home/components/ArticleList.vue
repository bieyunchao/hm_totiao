<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="finished"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的 ^_^"
        @load="onLoad"
        offset="50"
      >
        <ArticleItem
          v-for="item in articleList"
          :key="item.art_id"
          :artObj="item"
          @onDislikeEV="dislikeArticleFn"
          @onReportsEV="reportsFn"
          @click.native="itemClickFn(item.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import {
  getAllArticleListAPI,
  dislikeArticleAPI,
  reportsArticleAPI
} from '@/api/index.js'
import Toast from '@/ui/Toast.js'
export default {
  data() {
    return {
      articleList: [], // 文章数组
      loading: true, // 底部加载状态
      finished: false, // 底部完成状态
      isLoading: false, // 下拉刷新状态
      pre_timestamp: +new Date() // 请求下一页数据用到的 时间戳
    }
  },
  methods: {
    async initArticleList(isPullRdfresh) {
      const { data: res } = await getAllArticleListAPI({
        channelId: this.channelId,
        timestamp: this.pre_timestamp
      })
      if (isPullRdfresh) {
        // 表示下拉刷新,新数据在前,旧数据在后
        this.articleList = [...res.data.results, ...this.articleList]
      } else {
        // 上拉加载，旧数据在前，新数据在后
        this.articleList = [...this.articleList, ...res.data.results]
      }
      // 保存下一次请求需要用的时间戳
      this.pre_timestamp = res.data.pre_timestamp
      this.loading = false
      this.isLoading = false
      // 如果 返回过来的 pre_timestamp 值为 null，则表明没有下一页数据了
      if (res.data.pre_timestamp === null) return (this.finished = true)
    },
    // 底部加载的事件方法
    async onLoad() {
      this.initArticleList()
    },
    // 刷新数据事件方法
    async onRefresh() {
      this.initArticleList(this.isLoading)
    },
    // 反馈 - 不感兴趣
    async dislikeArticleFn(articleId) {
      try {
        const { data: res } = await dislikeArticleAPI(articleId)
        if (res.message === 'OK') {
          Toast({
            type: 'success',
            message: '反馈成功',
            duration: 500
          })
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    // 反馈 - 举报文章（按照类型）
    async reportsFn(reportObj) {
      try {
        const { data: res } = await reportsArticleAPI(reportObj)
        if (res.message === 'OK') {
          Toast({
            type: 'success',
            message: '反馈成功',
            duration: 500
          })
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    // 文章单元格的点击事件
    itemClickFn(id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  },
  components: {
    ArticleItem
  },
  props: {
    // 当前频道的 Id
    channelId: {
      type: [String, Number],
      default: 0
    }
  },
  async created() {
    Toast({
      type: 'loading',
      message: '拼命加载中...',
      overlay: true
    })
    this.initArticleList()
    Toast.clear()
  }
}
</script>

<style></style>
