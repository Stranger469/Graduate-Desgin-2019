<template>
  <div class="emplIndex">
    <Navi :routes="routes"></Navi>
    <router-view @route-switch="switchChosen"></router-view>
  </div>
</template>
<script>
import Navi from '@/components/Navigate/index';

export default {
  name: 'EmplIndex',
  data() {
    return {
      routes: [
        {
          name: '面试分配',
          link: '#/empl/interAssign',
          chosen: true,
        },
        {
          name: '面试管理',
          link: '#/empl/interMgn',
          chosen: false,
        },
        {
          name: '职位管理',
          link: '#/empl/positionMgn',
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
.emplIndex {
  height: calc(100% - 50px);
  border: .1px transparent solid;
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
