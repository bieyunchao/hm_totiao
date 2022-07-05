<template>
  <div class="home-container">
    <!-- 二级路由页面 -->
    <router-view></router-view>
    <!-- 下面底部导航 -->
    <div>
      <van-tabbar route>
        <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/layout/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less" scoped>
.home-container {
  // 防止页面内容被上下两个导航栏覆盖
  padding: 46px 0 50px 0;

  // 底部导航栏的上边框
  .van-tabbar {
    border-top: 1px solid #f8f8f8;
  }
}
</style>
