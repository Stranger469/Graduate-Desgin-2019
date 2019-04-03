<template>
  <transition name="fade">
    <div class="siteDialog">
        <div class="bg"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  name: 'baseCom',
};
</script>

<style lang='less'>
  .siteDialog{
    z-index: 1000;
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    display: flex;
    justify-content: center;
    align-items:center;
    .bg{
      background-color: rgba(0,0,0,0.6);
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    .content{
      position: relative;
      background-color: #fff;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
