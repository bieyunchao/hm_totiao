<template>
  <div>
    <!-- 头部 导航 -->
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/images/logo.png" alt="" class="logo" />
        </template>
        <template #right>
          <!-- 坑：postcss 只能翻译style里的css样式代码，标签内的行内样式无法将px转换为rem -->
          <van-icon name="search" size="0.48rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏 导航 -->
    <div>
      <van-tabs v-model="active" animated sticky offset-top="1.226667rem">
        <van-tab
          :title="item.name"
          v-for="item in userChannelList"
          :key="item.id"
        >
          <ArticleList></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getUserChannelsAPI } from '@/api/index.js'
import ArticleList from './components/ArticleList.vue'

export default {
  components: {
    ArticleList
  },
  data() {
    return {
      active: 0, // tab 导航激活索引
      userChannelList: [] // 用户选择的频道列表
    }
  },
  async created() {
    const { data: res } = await getUserChannelsAPI()
    this.userChannelList = res.data.channels
  },
  methods: {
    onClickLeft() {
      Toast('返回')
    },
    onClickRight() {
      Toast('按钮')
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
</style>
