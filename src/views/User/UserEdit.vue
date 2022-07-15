<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="$store.state.userPhoto"
            @click="imageClickFn"
          />
          <!-- file 选择框 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="$store.state.nickname"
        @click="nameClickFn"
      />
      <van-cell
        title="生日"
        is-link
        :value="profileObj.birthday"
        @click="birthdayClickFn"
      />
    </van-cell-group>

    <!-- 姓名修改的弹窗 -->
    <van-dialog
      v-model="show"
      title="更新用户名"
      show-cancel-button
      :before-close="beforeCloseFn"
    >
      <input type="text" v-focus v-model="inputUserName" />
    </van-dialog>

    <!-- 时间选择器 -->
    <van-popup
      v-model="datetimePickerShow"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateCancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  userProfileAPI,
  updateUserPhotoAPI,
  updateUserProfileAPI
} from '@/api/index.js'
import { formatDate } from '@/utils/date.js'
import { mapMutations } from 'vuex'
import Toast from '@/ui/Toast.js'
export default {
  name: 'UserEdit',
  data() {
    return {
      profileObj: {}, // 用户基本资料
      show: false, // 控制姓名输入框的出现/隐藏
      inputUserName: '', // 修改名字-弹出框输入框绑定值
      minDate: new Date(1922, 0, 1), // 最小范围
      maxDate: new Date(), // 最大范围（默认获取今日日期）
      currentDate: new Date(2021, 0, 17), // 当前时间
      datetimePickerShow: false // 日期选择器弹出层显示/隐藏
    }
  },
  async created() {
    const { data: res } = await userProfileAPI()
    this.profileObj = res.data
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO', 'SET_NICKNAME']),
    // 文件选择改变事件
    async onFileChange(e) {
      if (e.target.files.length === 0) return // 阻止代码向下
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const { data: res } = await updateUserPhotoAPI(theFd)
      this.SET_USERPHOTO(res.data.photo) // 更新同步后，同步到 vuex 中
    },
    // 图片点击事件
    imageClickFn() {
      this.$refs.iptFile.click()
    },
    // 姓名 - 点击事件
    nameClickFn() {
      this.show = true
      this.inputUserName = this.$store.state.nickname
    },
    // 姓名 - 确认框 -关闭前的回调函数
    async beforeCloseFn(action, done) {
      if (action === 'confirm') {
        // 点确定
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName)) {
          await updateUserProfileAPI({
            name: this.inputUserName
          })
          this.SET_NICKNAME(this.inputUserName)
          done()
        } else {
          Toast({
            message: '用户名只能是1-7位中英文数字组合',
            position: 'top'
          })
        }
      } else {
        // 点取消
        done() // 让弹窗关闭
      }
    },
    // 生日单元格 - 点击事件
    birthdayClickFn() {
      this.datetimePickerShow = true // 时间选择器出现
      this.currentDate = new Date(this.profileObj.birthday)
    },
    // 生日单元格弹出层 - 取消事件
    dateCancelFn() {
      this.datetimePickerShow = false
    },
    // 生日单元格弹出层 - 确定事件
    confirmFn() {
      updateUserProfileAPI({
        birthday: formatDate(this.currentDate)
      })
      this.profileObj.birthday = formatDate(this.currentDate)
      this.datetimePickerShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
::v-deep .van-dialog__content {
  text-align: center;
  input {
    padding: 0;
    outline: none;
    border: none;
    text-align: center;
  }
}
</style>
