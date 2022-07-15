<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-focus
        v-model.trim="kw"
        @input="inputFn"
        @search="searchFn"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div
        class="sugg-item"
        v-for="(item, index) in suggestList"
        :key="index"
        v-html="lightFn(item, kw)"
        @click="suggestClickFn(item)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(item, index) in history"
          :key="index"
          @click="historyClickFn(item)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api/index.js'
import { getStorage, setStorage } from '@/utils/storage.js'
export default {
  name: 'Search',
  data() {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖的定时器
      suggestList: [], // 联想建议列表的文字数据
      history: JSON.parse(getStorage('his')) || [] // 搜索历史
    }
  },
  methods: {
    // 输入框 - 内容实时改变触发的事件方法
    inputFn() {
      // 防抖：延迟执行逻辑代码，事件再次执行时，清除上一个定时器
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          const { data: res } = await suggestListAPI({ keywords: this.kw })
          this.suggestList = res.data.options
        }, 300)
      }
    },
    // 专门处理字符串高亮关键字
    lightFn(originStr, target) {
      // originStr: 原来字符串
      // target: 关键字
      // 说明orginStr的值为空
      if (!originStr) return
      const reg = new RegExp(target, 'ig')
      return originStr.replace(reg, (match) => {
        return `<span style="color: red;">${match}</span>`
      })
    },
    // 跳转方法，供下面的跳转方法使用
    moveFn(theKw) {
      // 路由跳转，在watch 执行之前，所以我们要让路由跳转，来一个定时器包裹
      setTimeout(() => {
        this.$router.push({
          path: `search_result/${theKw}`
        })
      })
    },
    // 输入框-搜索事件
    searchFn() {
      if (this.kw.length > 0) {
        // 把搜索关键字保存到历史记录的数组里
        this.history.push(this.kw)
        this.moveFn(this.kw)
      }
    },
    // 联想菜单-点击事件
    suggestClickFn(item) {
      // 把联菜单项保存到历史记录的数组里
      this.history.push(item)
      this.moveFn(item)
    },
    // 搜索历史-点击事件
    historyClickFn(item) {
      this.moveFn(item)
    },
    // 清除历史记录
    clearFn() {
      this.history = []
    }
  },
  // watch 侦听器
  watch: {
    history: {
      // 历史记录数组的改变
      deep: true,
      handler() {
        // 立即覆盖式的保存到本地
        // ES6新增了2中引用类型（以前Array，Object）新增（Set，Map）
        const theSet = new Set(this.history)
        const arr = Array.from(theSet)
        setStorage('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
