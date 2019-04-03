<template>
  <div class="initPage">
    <MainHeader/>
    <router-view></router-view>
  </div>
</template>
<script>
import MainHeader from '@/components/m_header/index';

export default {
  name: 'HomePage',
  data() {
    return {

    };
  },
  components: {
    MainHeader,
  },
};
</script>
<style lang="less">
@import url(../../static/style/site.comm.less);
@import url(../../static/style/site.vars.less);
.initPage {
  height: 100%;
}
</style>
