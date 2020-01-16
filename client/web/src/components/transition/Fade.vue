<template>
  <transition name="fade" class="box">
    <slot v-if="show"></slot>
  </transition>
</template>

<script>
export default {
  name:'fade',
  props: {
    show: {
      require: true,
      default: false
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: all .5s linear;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>