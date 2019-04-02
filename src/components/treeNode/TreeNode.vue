<template>
  <div class="node">
    <span class="text">
      <slot></slot>
    </span>
    <span class="add"> + </span><span class="modify"> √ </span><span class="delete"> x </span>
  </div>
</template>
<script>

export default {
  name: 'Node',
  props: {
    item: Object,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>
<style lang="less">
@import url(../../../static/style/site.comm.less);
@import url(../../../static/style/site.vars.less);

.node {
  margin-top: 15px;
  .text {
    padding: 10px;
    margin-right: 20px;
  }
  .add, .modify, .delete {
    width: 30px;
    height: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
    padding-right: 1px;
    border-radius: 15px;
    box-sizing: border-box;
    color: #fff;
    background: @site-main;
    cursor: pointer;
    margin: 0 5px 0 5px;
    &:hover {
      background: rgba(0, 98, 211, 0.424);
    }
  }
}
</style>
