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
          <van-icon
            name="search"
            size="0.48rem"
            color="#fff"
            @click="moveSearchPageFn"
          />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏 导航 -->
    <div>
      <van-tabs
        v-model="channelId"
        animated
        sticky
        offset-top="1.226667rem"
        @change="channelChangeFn"
      >
        <van-tab
          :title="item.name"
          v-for="item in userChannelList"
          :key="item.id"
          :name="item.id"
        >
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="plusClickFn"
      />
    </div>
    <!-- 频道管理的弹出层 -->
    <van-popup v-model="show" get-container="body">
      <ChannelEdit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @userChannelClickEV="userChannelClickFn"
        @closePopupEV="closePopupFn"
        v-model="channelId"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import {
  getUserChannelsAPI,
  getAllChannelsAPI,
  updateChannelsAPI,
  removeChannelAPI
} from '@/api/index.js'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
import Toast from '@/ui/Toast.js'

export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      channelId: 0, // tab 导航-激活频道ID（默认频道ID为0，页面刚打开时推荐频道高亮-对应文章数据）
      userChannelList: [], // 用户选择的频道列表
      allChannelList: [], // 所有频道列表
      show: false, // 控制弹出层展示
      channelScrollTObj: {} // 保存每个频道的滚动位置
    }
  },
  beforeCreate() {
    Toast({
      type: 'loading',
      message: '拼命加载中...',
      overlay: true
    })
  },
  async created() {
    // 获取用户的频道列表
    const { data: res } = await getUserChannelsAPI()
    this.userChannelList = res.data.channels
    // 获取所有的频道列表
    const { data: res2 } = await getAllChannelsAPI()
    this.allChannelList = res2.data.channels
  },
  methods: {
    // + 号的点击方法
    plusClickFn() {
      this.show = true
    },
    // 添加频道 的 点击事件
    async addChannelFn(obj) {
      this.userChannelList.push(obj)
      // 发送请求，向后台传递最新的用户选择的频道
      try {
        // 我们向后台传递的频道不能包括推荐频道
        const theNewArr = this.userChannelList.filter((item) => item.id !== 0)
        // 我们需要更改需要传递的频道数组中对象的结构  具体思路请参见 @/test/03xxx.js
        const channels = theNewArr.map((item, index) => {
          const newItem = { ...item }
          delete newItem.name
          newItem.seq = index
          return newItem
        })

        const { data: res } = await updateChannelsAPI({ channels })
        if (res.message !== '更新用户频道成功') {
          Toast('编辑频道失败！')
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    // 移除频道 的 点击事件
    userChannelClickFn(obj) {
      // 利用 findIndex() 方法找到目标索引 从用户频道列表中移除即可
      const index = this.userChannelList.findIndex((item) => item.id === obj.id)
      this.userChannelList.splice(index, 1)
      removeChannelAPI({ channelId: obj.id })
    },
    // 关闭弹出层
    closePopupFn() {
      this.show = false
      // 让内部的编辑状态回归 false
    },
    // 首页右上角放大镜点击事件 -> 跳转搜索
    moveSearchPageFn() {
      this.$router.push('/search')
    },
    scrollFn() {
      this.$route.meta.scrollT = document.documentElement.scrollTop
      // 同时保存当前频道的滚动距离
      this.channelScrollTObj[this.channelId] =
        document.documentElement.scrollTop
    },
    // tabs 切换的事件 -> 获取文章列表数据
    channelChangeFn() {
      // tab 切换以后 设置滚动条的位置
      // tab 切换后，这个组件内部，会把切走的容器height 设置为 0，滚动条因为没有高度回到了顶部
      // 切回来的一瞬间，没有高度，滚动事件从地下上来也被触发可，所以才把数据设置为0
      this.$nextTick(() => {
        window.scrollTo(0, this.channelScrollTObj[this.channelId])
      })
    }
  },
  computed: {
    // 用户未选择的频道
    // 简写后的写法
    unCheckChannelList() {
      return this.allChannelList.filter(
        (item) =>
          !this.userChannelList.some((ele) => {
            return ele.id === item.id
          })
      )
    }
  },
  // 前提：组件缓存，切走了就是失去激活生命周期方法触发
  // 无组件缓存，被切走了，destoryed 销毁生命周期方法
  activated() {
    window.addEventListener('scroll', this.scrollFn)
    window.scrollTo(0, this.$route.meta.scrollT)
  },
  deactivated() {
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 60px;
  right: 8px;
  z-index: 999;
}

// 设置 频道弹出层的样式
.van-popup {
  width: 100vw;
  height: 100vh;
}
</style>
