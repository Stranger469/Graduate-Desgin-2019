<template>
  <div>
    <transition name="valert-ani" >
      <div class="valert-wrap" v-if="open">
        <div class="valert" >
          <p>{{ msg }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data() {
    return {
      msg: '',
      show: false,
      timer: null,
      duration: 2,
    };
  },
  computed: {
    open() {
      this.end();
      return this.show;
    },
  },
  methods: {
    end() {
      if (!this.timer) {
        this.hide();
        this.timer = setTimeout(() => {
          this.comDestory();
        }, this.duration * 1500);
      }
    },
    comDestory() {
      this.$destroy();
      document.body.removeChild(this.$el);
    },
    hide() {
      setTimeout(() => {
        this.show = false;
      }, this.duration * 1000);
    },
  },
};
</script>
<style lang="less">
  .valert-wrap{
    width: 100%;
    position: fixed;
    height: 0;
    top:20px;
    text-align: center;
    z-index: 11111;
    .valert{
      display: inline-block;
      width: 330px;
      padding: 10px 15px;
      border-radius: 8px;
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
        margin: 10px 0 ;
      }
    }
  }

  .valert-ani-enter-active, .valert-ani-leave-active {
    top:20px;
    opacity: 1;
    transition: all .1s ease;
  }
  .valert-ani-enter, .valert-ani-leave-to {
    top:10px;
    opacity: 0;
  }
</style>
