<template>
  <div class="navi">
    <a
      v-for="route of routes"
      :class="{ chosen: route.chosen }"
      :href="route.link"
      :key="route.name">
        {{ route.name }}
    </a>
  </div>
</template>
<script>
export default {
  name: 'Navigate',
  props: {
    routes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {

    };
  },
};
</script>
<style lang="less">
@import url(../../../static/style/site.comm.less);
@import url(../../../static/style/site.vars.less);
.navi {
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  background: rgba(87, 166, 255, 0.45);
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 0;
  & > a {
    color: rgb(0, 62, 133) !important;
    font-size: 14px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px 0 20px;
    &:hover {
      background-color: #fff;
    }
    &.chosen {
      background: #fff;
    }
  }
}
</style>
