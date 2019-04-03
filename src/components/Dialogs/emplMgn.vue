<template>
  <dialogBase v-if="show" :title="title" @ok="submit" @close="close">
    <form class="addDept">
      <div class="form-item">
        <label class="require" for="user-name">姓名:</label>
        <input id="user-name" v-model="outData.name" type="text" placeholder="姓名">
        <div class="error_text">
          {{ hasError__name }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-tel">手机:</label>
        <input id="user-tel" v-model="outData.tel" type="text" placeholder="手机号">
        <div class="error_text">
          {{ hasError__tel }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-email">邮箱:</label>
        <input id="user-email" v-model="outData.email" type="text" placeholder="邮箱">
        <div class="error_text">
          {{ hasError__email }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-psw">密码:</label>
        <input id="user-psw" v-model="outData.psw" type="text" placeholder="密码">
        <div class="error_text">
          {{ hasError__psw }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-dept">部门:</label>
        <!-- <input id="user-dept" v-model="outData.dept" type="text" placeholder="部门"> -->
        <Select
          width="195px"
          v-model="dept"
          placeholder="部门名称">
          <Option
            v-for="item of [{key: '0', value: '傻屌分部1'},
            {key: '1', value: '傻屌分部2'},
            {key: '2', value: '傻屌分部3'},]"
            :key="item.key"
            :value="item.key">
              {{ item.value }}
          </Option>
        </Select>
        <div class="error_text">
          {{ hasError__dept }}
        </div>
      </div>
      <div class="form-item">
        <label for="user-desc">描述:</label>
        <textarea
          id="user-desc"
          v-model="outData.desc"
          type="text"
          cols="21"
          rows="10"
          style="padding:5px;box-sizing:border-box;"
          placeholder="描述"></textarea>
        <div class="error_text">
          {{ hasError__desc }}
        </div>
      </div>
    </form>
  </dialogBase>
</template>

<script>
import dialogBase from '@/components/Dialogs/base/dialogBase';
import Option from '@/components/select/Option';
import Select from '@/components/select/Select';

export default{
  props: ['dialogData', 'show', 'title'],
  data() {
    return {
      outData: {
        name: this.dialogData.name,
        tel: this.dialogData.tel,
        email: this.dialogData.email,
        psw: this.dialogData.psw,
        desc: this.dialogData.desc,
      },
      hasError__name: '',
      hasError__tel: '',
      hasError__email: '',
      hasError__psw: '',
      hasError__dept: '',
      hasError__desc: '',
      dept: this.dialogData.dept,
    };
  },
  watch: {
    dialogData: {
      handler(val) {
        this.resetData(val);
      },
      deep: true,
    },
  },
  methods: {
    getStrLen(str) {
      // return str.replace(/[\u0391-\uFFE5]/g, 'xx').length;
      return str.length;
    },
    resetData(obj) {
      this.$data.outData = obj || this.outData;
      this.$data.outData.name = this.dialogData.name;
      this.$data.outData.tel = this.dialogData.tel;
      this.$data.outData.email = this.dialogData.email;
      this.$data.outData.psw = this.dialogData.psw;
      this.$data.dept = this.dialogData.dept;
      this.$data.outData.desc = this.dialogData.desc;
      this.$data.hasError__name = '';
      this.$data.hasError__tel = '';
      this.$data.hasError__email = '';
      this.$data.hasError__psw = '';
      this.$data.hasError__dept = '';
      this.$data.hasError__desc = '';
    },
    close() {
      this.$emit('close', false);
    },
    submit() {
      let flag = true;
      if (!this.outData.name || this.getStrLen(this.outData.name) > 10) {
        this.hasError__name = '部门名称格式错误';
        flag = false;
      } else {
        this.hasError__name = '';
      }
      if (!this.outData.tel || this.getStrLen(this.outData.tel) !== 11) {
        this.hasError__tel = '手机号格式错误';
        flag = false;
      } else {
        this.hasError__tel = '';
      }
      if (!this.outData.email || this.getStrLen(this.outData.email) === '') {
        this.hasError__email = '邮箱格式错误';
        flag = false;
      } else {
        this.hasError__email = '';
      }
      if (!this.outData.psw || this.getStrLen(this.outData.psw) === '') {
        this.hasError__psw = '请填写密码';
        flag = false;
      } else {
        this.hasError__psw = '';
      }
      if (!this.dept) {
        this.hasError__dept = '请选择部门';
        flag = false;
      } else {
        this.hasError__dept = '';
      }
      // if (!this.outData.desc || this.getStrLen(this.outData.desc) === '') {
      //   this.hasError__desc = '请填写描述';
      //   flag = false;
      // } else {
      //   this.hasError__desc = '';
      // }
      if (!flag) return;
      this.$emit('done', {
        ...this.outData,
        dept: this.dept,
      });
    },
  },
  components: {
    dialogBase,
    Select,
    Option,
  },
};
</script>
<style lang="less">
  .addDept{
    .form-item {
      position: relative;
      margin: 20px 10px;
      flex-wrap: wrap;
      .select-box {
        margin: 0;
      }
      .error_text {
        position: absolute;
        top: 29px;
        left: 205px;
        width:195px;
        margin-right:6px;
        text-align:left;
        color:red;
        font-size: 12px;
      }
    }
  }
</style>
