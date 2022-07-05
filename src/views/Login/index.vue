<template>
  <div>
    <van-nav-bar title="黑马头条 - 登录" />
    <!-- 整体表单组件 -->
    <van-form @submit="onSubmit">
      <!-- 手机号输入框 -->
      <van-field
        v-model="user.mobile"
        required
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        :rules="[
          { required: true, message: '请填写手机号', pattern: /^1[3-9]\d{9}$/ }
        ]"
      />
      <!-- 密码输入框 -->
      <van-field
        v-model="user.code"
        required
        type="password"
        name="code"
        label="密码"
        placeholder="请输入6位密码"
        :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]"
      />
      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
          :disabled="isLoading"
          loading-text="正在登录ing..."
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { Notify } from 'vant'
// 导入操作 Token 的工具模块
import { setToken } from '@/utils/token.js'
export default {
  data() {
    return {
      user: {
        mobile: '15893828701', // 手机号
        code: '246810' // 验证码(密码-必须是246810 后台规定死的)
      },
      isLoading: false // 登录按钮的加载状态
    }
  },
  methods: {
    // 提交方法
    async onSubmit(values) {
      try {
        this.isLoading = true
        const { data: res } = await loginAPI(values)
        console.log(res)
        Notify({ type: 'success', message: '登录成功！！！' })
        setToken(res.data.token)
        // 注意：跳转一定要写在最后 -> 尽量最后执行
        this.$router.replace('/layout')
      } catch (err) {
        // Promise 内的 ajax 抛出错误，直接进入这里
        Notify({ type: 'danger', message: '账号或密码错误' })
      } finally {
        // 网络请求完成，无论成功或失败都结束 Loading 状态
        this.isLoading = false
      }
    }
  }
}
</script>

<style></style>
