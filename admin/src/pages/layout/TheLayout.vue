<!--
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * 主页面
 * @since: 2019-03-27 16:50:46
 * @lastTime: 2019-03-27 20:06:59
 -->
<template>
  <el-row class="page">
    <el-col :span="24">
      <the-header :open-nav="openNav" @toggle-open="toggleOpen"></the-header>
    </el-col>
    <el-col :span="24" class="page-main">
      <the-sidebar :open-nav="openNav"></the-sidebar>
      <section class="page-content" :class="{'page-content-hide-aside': !openNav || minScreen}">
        <vue-scroll>
          <the-main></the-main>
          <the-footer></the-footer>
        </vue-scroll>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import TheLayoutHeader from './TheLayoutHeader'
import TheLayoutSidebar from './TheLayoutSidebar'
import TheLayoutFooter from './TheLayoutFooter'
import TheLayoutMain from './TheLayoutMain'

export default {
  name: 'TheLayout',
  data () {
    let min_screen = window.innerWidth < 768
    return {
      openNav: !min_screen,
      minScreen: min_screen
    }
  },
  methods: {
    toggleOpen () {
      this.openNav = !this.openNav
    }
  },
  components: {
    'the-header': TheLayoutHeader,
    'the-sidebar': TheLayoutSidebar,
    'the-footer': TheLayoutFooter,
    'the-main': TheLayoutMain
  }
}
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .page-main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    .page-content {
      position: absolute;
      left: 240px;
      right: 0;
      height: 100%;
    }
    .page-content-hide-aside {
      left: 65px;
    }
  }
}
</style>
