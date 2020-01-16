<template>
  <div class="home">
    <el-header height="60px" class="header bg-primary-1 text-white clearfix">
      <h1 class="d-iblock header-text">
        <i class="iconfont iconshrink text-gray"></i>
        MORNING CLOCK
      </h1>
      <div class="profile fr">
        <el-dropdown class="fs-md">
          <span class="d-iblock cursor-pointer">
            <i class="iconfont iconperson fs-xxxl" style="vertical-align: bottom;"></i>
            <span>MorningClock</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <router-link to="/profile">个人中心</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to="/reset">修改密码</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to="/login">退出登录</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="home-contaniner">
      <el-aside width="220px" class="home-aside bg-primary-3 text-white">
        <AsideMenu></AsideMenu>
      </el-aside>
      <el-main class="home-main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from '../Layout/AsideMenu'
export default {
  name: 'home',
  components: {
    AsideMenu
  },
  created () {
    this.$http.get('/test')
  },
  methods: {
    hello () {
      console.log('heelo')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/_variable.scss';
  .home{
    width: 100%;
    height: 100vh;
    .header{
      position: absolute;
      top: 0;
      width: 100%;
      line-height: 4.0714rem;
      border-bottom: 1px solid map-get($colors, 'primary-2');
      .header-text{
        height: 100%;
        font-size: 1.4286rem;
        i.iconshrink {
          padding-right: 0.7143rem;
          font-size: inherit;
        }
      }
      .profile{
        padding: 0 0.7143rem;
        i.iconperson {
          color: map-get($colors, 'black');
          margin-right: 0.5714rem;
        }
      }
    }
    .home-contaniner{
      width: 100%;
      height: 100%;
      padding-top: 4.2857rem;
      .home-aside{
        height: 100%;
        overflow: auto;
      }
      .home-main{
        height: 100%;
        overflow: auto;
      }
    }
  }
</style>
