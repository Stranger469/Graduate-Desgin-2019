<template>
  <div class="login">
    <p>登录</p>
    <form>
      <div class="form-item">
        <label class="form-item-left">手机号:</label>
        <div class="form-item-right">
          <input type="tel" v-model="tel" placeholder="请输入手机号">
          <div class="wrong" v-show="display1">{{ telWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left"></label>
        <div class="form-item-right gvc-container">
          <input class="gvc" type="text" v-model="graphicVerifyCode" placeholder="验证码">
          <img v-bind:src="imgpath" width="80" height="30">
          <div class="wrong" v-show="display2">{{ gvcWrong }}</div>
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
          <div class="wrong" v-show="display3">{{ snsWrong }}</div>
        </div>
      </div>
      <div class="form-item">
        <div class="btn primary submit" @click="submit" @keyup.enter="submit">登录</div>
      </div>
    </form>
  </div>
</template>
<script>
  import axios from 'axios';

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
        telWrong: '手机号不合法',
        gvcWrong: '验证码输入错误',
        snsWrong: '验证码输入错误',
        display1: false,
        display2: false,
        display3: false,
      };
    },
    mounted() {
      let that = this;
      axios.get('http://localhost:8080/auth/getImgValidate', {}).then(function (response) {
        console.log(response);
        console.log(response.data.data.base64);
        console.log(response.data.data.id);
        that.$data.imgpath = response.data.data.base64;
        that.$data.imgid = response.data.data.id;
      });
    },
    methods: {
      sendMsgFn() {
        //简单逻辑：如果手机号长度小于11位，则显示手机号错误
        if (this.$data.tel.length < 11) {
          this.$data.display1 = true;
          return;
        } else {
          this.$data.display1 = false;
        }
        let that = this;
        if (this.countdown) {
          return;
        }
        //判断图形验证码是否正确
        axios.get('http://localhost:8080/auth/validateImg?id=' + that.$data.imgid + "&code=" + that.$data.graphicVerifyCode, {}).then(function (response) {
          //如果正确则发送短信验证码
          if (response.data.data === true) {
            that.$data.display2 = false;
            axios.get('http://localhost:8080/auth/getPhoneValidate?phone=' + that.$data.tel + "&type=1", {}).then(function (response) {
              that.$data.phoneid = response.data.data;
              console.log(response);
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
            //如果错误则显示图形验证码错误
          } else {
            that.$data.display2 = true;
          }
        });
      },
      submit() {
        let that = this;
        let params = new URLSearchParams();
        params.append("id", that.$data.phoneid);
        params.append("code", that.$data.SNSverifyCode);
        params.append("username", that.$data.tel);
        //判断手机验证码是否正确，错误则显示手机验证码错误
        axios.post('http://localhost:8080/auth/candidateLoginByPhone', params, {}).then(function (response) {
          console.log(response);
          if(response.data.code === 400) {
            that.$data.display3 = true;
          }
          else {
            alert("登陆成功");
            console.log(response)
            //TODO 这里存放一个全局变量，将TOKEN存入
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
