<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <!-- 文章列表 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="item in articleList"
          :key="item.art_id"
          :artObj="item"
          :isShow="false"
          @click.native="itemClickFn(item.art_id)"
        ></ArticleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultAPI } from '@/api/index.js'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  data() {
    return {
      page: 1, // 页码
      articleList: [], // 文章列表
      loading: false, // 上拉加载的状态
      finished: false // 是否有更多的状态
    }
  },
  components: {
    ArticleItem
  },
  async created() {
    const { data: res } = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    // 如果请求的回来的数据为空 直接将 fineshed状态改为true
    if (res.data.results.length === 0) return (this.finished = true)
    this.articleList = res.data.results
    this.loading = false
  },
  methods: {
    async onLoad() {
      if (this.articleList.length > 0) {
        this.page++
        const { data: res } = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.results.length === 0) {
          // 没有更多数据
          this.finished = true
        }
        this.articleList = [...this.articleList, ...res.data.results]
        this.loading = false
      }
    },
    // 跳转到详情
    itemClickFn(id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
