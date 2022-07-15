<template>
  <div>
    <keep-alive exclude="Search,SearchResult,Detail,UserEdit">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
