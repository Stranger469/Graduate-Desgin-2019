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
        <label class="form-item-left"></label>
        <div class="form-item-right gvc-container">
          <input class="gvc" type="text" v-model="graphicVerifyCode" placeholder="验证码">
          <img v-bind:src="imgpath" width="80" height="30">
          <div class="wrong">{{ gvcWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">短信验证码:</label>
        <div class="form-item-right">
          <input type="text" v-model="SNSverifyCode" placeholder="短信验证码">
          <div
            role="button"
            class="send" :class="{disable: countdown}"
            @click="sendMsgFn">{{ sendMsg }}
          </div>
          <div class="wrong">{{ snsWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <div class="btn primary submit" @click="submit" @keyup.enter="submit">登录</div>
      </div>
    </form>
  </div>
</template>
<script>
import api from '@/api/login';

export default {
  name: 'Login',
  data() {
    return {
      imgpath: '',
      imgid: '',
      phoneid: '',
      tel: '',
      graphicVerifyCode: '',
      SNSverifyCode: '',
      // 发送验证码/倒计时
      sendMsg: '发送验证码',
      countdown: false,
      // 手机号/图形验证码/短信验证码出错
      telWrong: '',
      gvcWrong: '',
      snsWrong: '',
    };
  },
  mounted() {
    const that = this;
    api.getImgValidate({}).then((response) => {
      // console.log(response);
      // console.log(response.data.data.base64);
      // console.log(response.data.data.id);
      that.$data.imgpath = response.data.data.base64;
      that.$data.imgid = response.data.data.id;
    });
  },
  methods: {
    sendMsgFn() {
      // 简单逻辑：如果手机号长度不等于11位，则显示手机号错误
      if (this.tel.length !== 11) {
        this.telWrong = '手机号不正确';
        return;
      }
      if (this.graphicVerifyCode === '') {
        this.gvcWrong = '请输入验证码';
        return;
      }
      this.gvcWrong = '';
      this.telWrong = '';

      const that = this;
      if (this.countdown) {
        return;
      }
      // 判断图形验证码是否正确
      api.validateImg({
        id: that.$data.imgid,
        code: that.$data.graphicVerifyCode,
      }).then((response) => {
        // 如果正确则发送短信验证码
        if (response.data.data === true) {
          that.gvcWrong = '';
          api.getPhoneValidate({
            phone: that.$data.tel,
            type: 1,
          }).then((res) => {
            that.$data.phoneid = res.data.data;
            // console.log(res);
            let seconds = 10;
            that.$data.sendMsg = `已发送(${seconds}s)`;
            that.$data.countdown = true;
            const interval = setInterval(() => {
              seconds -= 1;
              that.$data.sendMsg = `已发送(${seconds}s)`;
              if (seconds === 0) {
                clearInterval(interval);
                that.$data.sendMsg = '重新发送';
                that.$data.countdown = false;
              }
            }, 1000);
          });
        // 如果错误则显示图形验证码错误
        } else {
          that.gvcWrong = '验证码不正确';
        }
      });
    },
    submit() {
      const that = this;
      // 判断手机验证码是否正确，错误则显示手机验证码错误
      api.candidateLoginByPhone({
        id: that.$data.phoneid,
        code: that.$data.SNSverifyCode,
        username: that.$data.tel,
      }).then((response) => {
        // console.log(response);
        if (response.data.code === 400) {
          that.snsWrong = '短信验证码不正确';
        } else {
          this.$alert('登陆成功');
          this.snsWrong = '';
          // console.log(response);
          // TODO 这里存放一个全局变量，将TOKEN存入
        }
      });
    },
  },
  components: {},
};
</script>
<style lang="less">
  @import url(../../../static/style/site.vars.less);

  .login {
    text-align: center;
    user-select: none;
    & > p {
      margin-top: 50px;
      font-size: 30px;
      color: @site-main;
    }
    & > form {
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
        width: 70px;
        text-align: center;
        top: 6px;
        right: 10px;
        font-size: 10px;
        border-left: 1px solid rgb(209, 209, 209);
        padding-left: 5px;
        color: @site-main;
        cursor: pointer;
        &.disable {
          color: #7a7a7a;
          cursor: not-allowed;
        }
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
