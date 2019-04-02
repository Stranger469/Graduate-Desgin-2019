<template>
  <div class="emplIndex">
    <Navi></Navi>
    <router-view></router-view>
  </div>
</template>
<script>
import Navi from '@/components/Navigate/index';

export default {
  name: 'EmplIndex',
  data() {
    return {

    };
  },
  components: {
    Navi,
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);
.emplIndex {
  height: calc(100% - 50px);
  border: .1px transparent solid;
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
