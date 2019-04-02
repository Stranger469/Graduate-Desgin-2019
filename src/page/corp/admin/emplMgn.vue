<template>
  <div>
    员工管理
  </div>
</template>
<script>
import ng from '@/mixins/NavigationGuards';

export default {
  mixins: [ng],
  name: 'EmplMgn',
  data() {
    return {

    };
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem('userToken') === null) {
      next(false);
    }
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

</style>
