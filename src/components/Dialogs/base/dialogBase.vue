<template>
  <basePosition>
    <div class="dialogBase">
      <header>
        <p>{{ title }}</p>
        <div class="close" alt="close" @click="close"></div>
      </header>
      <slot></slot>
      <footer>
        <div class="btn primary" :class="{gray:!cansub}" @click="ok">确认</div>
        <div class="btn default" @click="close">取消</div>
      </footer>
    </div>
  </basePosition>
</template>

<script>
import basePosition from '@/components/Dialogs/base/base';

export default{
  // props:['cansub','title'],
  props: {
    cansub: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
    },
  },
  methods: {
    ok() {
      if (this.cansub) {
        this.$emit('ok');
      }
    },
    close() {
      this.$emit('close');
    },
  },
  components: {
    basePosition,
  },
};
</script>
<style lang="less">
  .dialogBase{
    width:600px;
    &>header{
      box-sizing: border-box;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      background: #F2F2F2;
      border-bottom: 0.1px solid rgb(224, 224, 224);
      p{
        display: inline-block;
        text-align: left;
        flex: 1;
        font-weight: 600;
        color: #383838;
        user-select: none;
      }
      .close{
        cursor: pointer;
        width: 15px;
        height: 15px;
        background: url(../../../assets/img/u532.png) center center;
        &:hover {
           background: url(../../../assets/img/u532_mouseOver.png) center center;
         }
      }
    }
    footer{
      height: 80px;
      border-top: 0.1px solid rgb(224, 224, 224);
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      .btn {
        margin: 0 10px;
        &.gray{
          background: #e0e0e0;
        }
      }
      .fileType {
        margin-left: 30px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .radio_group {
          display: flex;
          flex-direction: row;
          margin: 10px 0 0 -10px;
        }
      }
    }
  }
</style>
