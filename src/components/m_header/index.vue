<template>
  <div class="m-header">
    <div class="m-header-container">
      <div class="m-header-container-left">
        <a class="icon" href="#/"><img height="40" src="../../assets/img/logo.png"></a>
        <ul>
          <li><a href="#/">首页</a></li>
          <li><a>职位</a></li>
          <li><a>公司</a></li>
        </ul>
      </div>
      <div class="m-header-container-right">
        <ul>
          <li><a>我要招聘</a></li>
          <li><a class="with-border">注册</a></li>
          <li style="margin-left:0"><a class="with-border" href="#/login">登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {

    };
  },
};
</script>

<style lang="less">
@import url(../../../static/style/site.vars.less);
.m-header {
  width: 100%;
  height: 50px;
  background: @site-black;
  .m-header-container {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .m-header-container-left {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &>.icon {
        margin-top: 5px;
      }
    }
    .m-header-container-right {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  ul {
    font-size: 0;
    height: 100%;
    margin-left: 15px;
    display: inline-block;
    &>li {
      height: 100%;
      display: inline-flex;
      align-items: center;
      list-style: none;
      color: #fff;
      font-size: 14px;
      margin: 0 20px;
      cursor: pointer;
      user-select: none;
      &>a {
        transition: color linear .1s;
        &:hover, &:active {
          color: @site-main;
        }
        &.with-border {
          transition: color linear .1s;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 25px;
          width: 50px;
          border: 1px solid @site-main;
          border-radius: 20px;
        }
      }

    }
  }
}
</style>
