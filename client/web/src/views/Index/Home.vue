<template>
  <div class="home">
    <el-header height="70px" class="header bg-primary-1 text-white clearfix">
      <h1 class="d-iblock header-text">
        <i class="iconfont iconshrink text-gray pr-2"></i>
        MORNING CLOCK
      </h1>
      
    </el-header>
    <el-container class="home-contaniner">
      <el-aside width="200px" class="home-aside bg-primary-3 text-white">Aside</el-aside>
      <el-main class="home-main">
        
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    this.$http.get('/test')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/_variable.scss';
  .home{
    width: 100%;
    height: 100vh;
    .header{
      line-height: 67px;
      border-bottom: 1px solid map-get($colors-drak, 'primary-2');
      .header-text{
        height: 100%;
        font-size: 1.4286rem;
        i {
          font-size: inherit;
        }
      }
    }
    .home-contaniner{
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      padding-top: 70px;
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
