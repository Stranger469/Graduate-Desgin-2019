<template>
  <div>
    <transition name="vconfirm-ani">
      <div class="confirm-bg" v-if="show"></div>
    </transition>
    <transition name="vconfirm-ani">
      <div class="vconfirm-wrap" v-if="show">
        <div class="vconfirm" >
          <p>{{msg}}</p>
          <span class="cancel" @click="cancel">取消</span>
          <span @click="ok">确定</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'alert',
  data() {
    return {
      msg: '',
      type: 'confirm',
      show: false,
    };
  },
  methods: {
    ok() {
      this.callback && this.callback(true);
      this.hide();
    },
    cancel() {
      this.callback && this.callback(false);
      this.hide();
    },
    hide() {
      this.show = false;
      setTimeout(() => {
        this.$destroy();
        document.body.removeChild(this.$el);
      }, 500);
    },
  },
};
</script>
<style lang="less">
  .confirm-bg{
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0px;
    text-align: center;
    z-index: 11111;
    background: rgba(0, 0, 0, 0.6);
  }
  .vconfirm-wrap{
    width: 100%;
    position: fixed;
    height: 0;
    top: -20px;
    text-align: center;
    z-index: 11111;
    background: rgba(0,0,0,0.45);
    .vconfirm{
      display: inline-block;
      width: 330px;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ebeef5;
      background: #fff;
      z-index: 11112;
      margin-top: 150px;
      p{
        font-size: 14px;
        line-height: 21px;
        color: #606266;
        text-align: left;
        margin: 6px 0 0;
        padding-bottom: 20px;
      }
      span{
        padding: 9px 15px;
        font-size: 12px;
        color: #fff;
        background-color: #0064D3;
        cursor: pointer;
        float: right;
        margin-right: 5px;
        &.cancel{
          background: #efefef;
          color: #a5a7ac;
          margin-right: 0;
        }
      }
    }
  }

  .vconfirm-ani-enter-active,.vconfirm-ani-leave-active {
    transition: opacity .5s;
  }
  .vconfirm-ani-enter,.vconfirm-ani-leave-to {
    opacity: 0;
  }
</style>
