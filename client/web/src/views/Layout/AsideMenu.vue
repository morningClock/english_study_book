<template>
  <div>
    <div class="avatar">
      <img src="../../assets/img/ui-sam.jpg" alt="">
      <h2 class="fs-md">MorningClock</h2>
    </div>
    <ul class="menu fs-sm text-gray-4">
      <li class="menu-item">
        <router-link to="stat">
          <i class="iconfont iconstatistics"></i>
          小成就统计
        </router-link>
      </li>
      <li class="menu-item">
        <a @click="toggleShow">
          <i class="iconfont iconbook"></i>
          我的单词本
        </a>
        <Fade :show="show">
          <ul class="submenu">
            <li><router-link to="word">所有单词</router-link></li>
            <li><a href="">错题本</a></li>
            <li><a href="">重点单词</a></li>
          </ul>
        </Fade>
      </li>
      <li class="menu-item">
        <a href="#">
          <i class="iconfont icontest"></i>
          自我检测
        </a>
      </li>
      <li class="menu-item">
        <a href="#">
          <i class="iconfont icontask"></i>
          自订目标本
        </a>
      </li>
      <li class="menu-item">
        <a href="#">
          <i class="iconfont icontime"></i>
          签到日志
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Fade from '../../components/transition/Fade'
export default {
  name: 'AsideMenu',
  components: {
    Fade
  },
  data () {
    return {
      show: false,
      activeIndex: 0
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/_variable.scss';
  .avatar{
    margin-bottom: 1.4286rem;
    text-align: center;
    img{
      overflow: hidden;
      margin: 1.0714rem 0;
      width: 4.2857rem;
      height: 4.2857rem;
      border-radius: 50%;
    }
  }
  .menu {
    margin:0 0.7143rem;
    a:hover {
      color: map-get($colors, 'white');
      background-color: map-get($colors, 'tips');
    }
  }
  .submenu{
    padding:0 1.2rem;
    a:hover {
      color: map-get($colors, 'white');
      background-color: inherit;
    }
  }
  a {
    display: block;
    cursor: pointer;
    padding: 1.4286rem 0.7143rem;
    i {
      margin-right: 0.3571rem;
    }
  }
</style>
