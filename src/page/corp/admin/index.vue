<template>
  <div class="corpIndex">
    <Navi :routes="routes"></Navi>
    <router-view @route-switch="switchChosen"></router-view>
  </div>
</template>
<script>
import Navi from '@/components/Navigate/index';

export default {
  name: 'CorpIndex',
  data() {
    return {
      routes: [
        {
          name: '公司管理',
          link: '#/corp/corpInfo',
          chosen: true,
        },
        {
          name: '员工管理',
          link: '#/corp/emplMgn',
          chosen: false,
        },
        {
          name: '部门管理',
          link: '#/corp/deptMgn',
          chosen: false,
        },
      ],
    };
  },
  methods: {
    switchChosen(name) {
      this.routes.forEach((e) => {
        if (e.link.split('/').pop() !== name) {
          e.chosen = false;
        } else {
          e.chosen = true;
        }
      });
    },
  },
  components: {
    Navi,
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);
.corpIndex {
  height: calc(100% - 50px);
  border: .1px transparent solid;
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
