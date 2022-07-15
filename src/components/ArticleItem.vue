<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- 单图 -->
          <img
            v-if="artObj.cover.type === 1"
            v-lazy="artObj.cover.images[0]"
            class="thumb"
            alt=""
          />
          <!-- <van-image
            v-if="artObj.cover.type === 1"
            class="thumb"
            v-lazy="artObj.cover.images[0]"
          >
            <template v-slot:error>加载失败</template>
          </van-image> -->
        </div>
        <!-- 三图 -->
        <div class="thumb-box" v-if="artObj.cover.type === 3">
          <img
            class="thumb"
            v-lazy="item"
            v-for="(item, index) in artObj.cover.images"
            :key="index"
          />
          <!-- <van-image
            v-lazy="item"
            class="thumb"
            alt=""
            v-for="(item, index) in artObj.cover.images"
            :key="index"
          >
            <template v-slot:error>图片走丢了~</template>
          </van-image> -->
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}评论</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @cancel="cancelFn"
      @closed="closedFn"
      get-container="body"
      :cancel-text="bottomText"
    />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report.js'

export default {
  props: {
    // 需要渲染的文章对象
    artObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShow: {
      type: Boolean,
      default: true // 首页的地方不想动了，首页肯定没传 isShow 值进来，所以首页需要显示
    }
  },
  data() {
    return {
      show: false, // 反馈面板 显示/隐藏
      actions: firstActions, // 反馈面板选项数组(套对象)
      bottomText: '取消' // 反馈面板底部选项文字 取消/返回
    }
  },
  methods: {
    formatTime: timeAgo,
    // 反馈面板-“选项”选择事件
    onSelect(item, index) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (item.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (item.name === '不感兴趣') {
        this.$emit('onDislikeEV', this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('onReportsEV', {
          articleId: this.artObj.art_id,
          type: item.value
        })
        this.show = false
      }
    },
    // 反馈面板 底部按钮的点击事件
    cancelFn() {
      if (this.bottomText === '返回') {
        this.closedFn()
        this.show = true
      }
    },
    // 反馈面板-关闭面板，动画结束后触发
    closedFn() {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
