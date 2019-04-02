<template>
  <div class="login">
    <form>
      <div class="login-radio-box">
        <span :class="{chosen: loginType === 1}" @click="switchType(1)">
          &nbsp;&nbsp;我要找工作&nbsp;&nbsp;
        </span>
        <span :class="{chosen: loginType === 3}" @click="switchType(3)">
          &nbsp;&nbsp;我要找人才&nbsp;&nbsp;
        </span>
        <span :class="{chosen: loginType === 2}" @click="switchType(2)">
          &nbsp;&nbsp;企业管理员&nbsp;&nbsp;
        </span>
        <span :class="{chosen: loginType === 4}" @click="switchType(4)">
          &nbsp;&nbsp;系统管理员&nbsp;&nbsp;
        </span>
      </div>
      <div class="form-item">
        <label class="form-item-left">手机号:</label>
        <div class="form-item-right">
          <input ref="initFocus" type="tel" v-model="tel" placeholder="请输入手机号">
          <div class="wrong">{{ telWrong }}</div>
        </div>
      </div>
      <div class="form-item" v-show="type === 0">
        <label class="form-item-left">密码:</label>
        <div class="form-item-right gvc-container">
          <input class="psw" type="text" v-model="psw" placeholder="密码">
          <div class="wrong">{{ pswWrong }}</div>
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
      <div class="form-item" v-show="type === 1">
        <label class="form-item-left">短信验证码:</label>
        <div class="form-item-right">
          <input type="text" v-model="SNSverifyCode" placeholder="短信验证码" @keyup.enter="submit">
          <div
            role="button"
            class="send" :class="{disable: countdown}"
            @click="sendMsgFn">{{ sendMsg }}
          </div>
          <div class="wrong">{{ snsWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <div class="btn primary submit" @click="submit">登录</div>
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
      type: 1,
      loginType: 1,
      imgpath: '',
      imgid: '',
      phoneid: '',
      tel: '',
      psw: '',
      graphicVerifyCode: '',
      SNSverifyCode: '',
      // 发送验证码/倒计时
      sendMsg: '发送验证码',
      countdown: false,
      // 手机号/图形验证码/短信验证码出错
      telWrong: '',
      gvcWrong: '',
      snsWrong: '',
      pswWrong: '',
    };
  },
  mounted() {
    sessionStorage.setItem('loginType', 2);
    sessionStorage.setItem('userToken', 'abc');
    this.$refs.initFocus.focus();
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
          // TODO 这里存放一个全局变量，将TOKEN存入（userToken）
          sessionStorage.setItem('loginType', this.loginType);
          switch (this.loginType) {
            // TODO case1 & case4
            case 2:
              this.$router.push({ name: 'Empl' });
              break;
            case 3:
              this.$router.push({ name: 'Corp' });
              break;
            default:
              break;
          }
        }
      });
    },
    switchType(type) {
      this.loginType = type;
      if (type < 3) {
        this.type = 1;
      } else {
        this.type = 0;
      }
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
    height: 100%;
    border: .1px transparent solid;
    background: url(../../assets/img/newbg.png) center bottom no-repeat;
    & > form {
      box-sizing: border-box;
      border-radius: 20px;
      box-shadow: 0px 10px 30px rgb(78, 138, 207);
      width: 500px;
      margin-top: 170px;
      background: #fff;
      .login-radio-box {
        font-size: 0;
        margin: 0 0 40px 5px;
        & > span {
          cursor: pointer;
          border: 1px rgb(224, 224, 224) solid;
          padding: 5px;
          font-size: 14px;
          margin: 0 2px 0 2px;
          &.chosen {
            color: rgb(23, 116, 223);
            border-color: rgb(78, 138, 207);
            box-shadow: 0 0 2px rgb(78, 138, 207);
          }
        }
      }
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
