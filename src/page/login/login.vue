<template>
  <div class="login">
    <p>登录</p>
    <form>
      <div class="form-item">
        <label class="form-item-left">手机号:</label>
        <div class="form-item-right">
          <input type="tel" v-model="tel" placeholder="请输入手机号">
          <div class="wrong">{{ telWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">图形验证码:</label>
        <div class="form-item-right gvc-container">
          <input class="gvc" type="text" v-model="graphicVerifyCode" placeholder="图形验证码">
          <img width="80" height="30">
          <div class="wrong">{{ gvcWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">短信验证码:</label>
        <div class="form-item-right">
          <input type="text" v-model="SNSverifyCode" placeholder="短信验证码">
          <div role="button" class="send">{{ sendMsg }}</div>
          <div class="wrong">{{ snsWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <div class="btn primary submit">登录</div>
      </div>
    </form>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data() {
    return {
      tel: '',
      graphicVerifyCode: '',
      SNSverifyCode: '',
      sendMsg: '发送验证码',
      // 手机号/图形验证码/短信验证码出错
      telWrong: '出错了',
      gvcWrong: '出错了',
      snsWrong: '',
    };
  },
  methods: {

  },
  components: {
  },
};
</script>
<style lang="less">
@import url(../../../static/style/site.vars.less);
.login {
  text-align: center;
  user-select: none;
  &>p {
    margin-top: 50px;
    font-size: 30px;
    color: @site-main;
  }
  &>form {
    box-sizing: border-box;
    border: 1px solid @site-main;
    width: 500px;
    margin-top: 50px;
    background: #fff;
    .form-item-left {
      width: 80px;
      text-align: right;
    }
    .form-item-right {
      width: 200px;
      position: relative;
      text-align: left;
    }
    .gvc-container {
      display: flex;
      justify-content: left;
      align-items: center;
      .gvc {
        margin-right: 5px;
        width: 95px;
      }
    }
    .send {
      position: absolute;
      width: 60px;
      top: 6px;
      right: 10px;
      font-size: 10px;
      border-left: 1px solid rgb(209, 209, 209);
      padding-left: 5px;
      color: @site-main;
      cursor: pointer;
    }
    .submit {
      width: 280px;
      margin-top: 10px;
    }
    .wrong {
      position: absolute;
      font-size: 10px;
      top: 29px;
      color: rgb(255, 103, 103);
    }
  }

}
</style>
