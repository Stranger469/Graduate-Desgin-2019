<template>
  <dialogBase v-if="show" :title="title" @ok="submit" @close="close">
    <form class="addDept">
      <div class="form-item">
        <label class="require" for="user-date">面试日期:</label>
        <date-picker
            :single-input="true"
            v-model="date"
            width="195px"></date-picker>
        <div class="error_text">
          {{ hasError__date }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-time">面试时间:</label>
        <input id="user-time" v-model="outData.time" type="text" placeholder="面试时间">
        <div class="error_text">
          {{ hasError__time }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-name">　联系人:</label>
        <input id="user-name" v-model="outData.name" type="text" placeholder="联系人">
        <div class="error_text">
          {{ hasError__name }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-tel">联系电话:</label>
        <input id="user-tel" v-model="outData.tel" type="text" placeholder="联系电话">
        <div class="error_text">
          {{ hasError__tel }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-email">联系邮箱:</label>
        <input id="user-email" v-model="outData.email" type="text" placeholder="联系邮箱">
        <div class="error_text">
          {{ hasError__email }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-loc">面试地点:</label>
        <input id="user-loc" v-model="outData.loc" type="text" placeholder="面试地点">
        <div class="error_text">
          {{ hasError__loc }}
        </div>
      </div>
      <div class="form-item">
        <label for="user-desc">面试描述:</label>
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
import DatePicker from '@/components/Date/index';

export default{
  props: ['dialogData', 'show', 'title'],
  data() {
    return {
      outData: {
        time: '',
        name: '',
        tel: '',
        email: '',
        loc: '',
        desc: '',
      },
      date: new Date(),
      hasError__date: '',
      hasError__time: '',
      hasError__name: '',
      hasError__tel: '',
      hasError__email: '',
      hasError__loc: '',
      hasError__desc: '',
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
  mounted() {
  },
  methods: {
    getStrLen(str) {
      // return str.replace(/[\u0391-\uFFE5]/g, 'xx').length;
      return str.length;
    },
    resetData(obj) {
      this.$data.outData = obj || this.outData;
      this.$data.date = new Date(this.dialogData.date === undefined
        ? null
        : this.dialogData.date);
      this.$data.outData.time = this.dialogData.time;
      this.$data.outData.email = this.dialogData.email;
      this.$data.outData.tel = this.dialogData.tel;
      this.$data.outData.name = this.dialogData.name;
      this.$data.outData.desc = this.dialogData.desc;
    },
    close() {
      this.$emit('close', false);
    },
    submit() {
      let flag = true;
      if (!this.date) {
        this.hasError__date = '请选择面试日期';
        flag = false;
      } else {
        this.hasError__date = '';
      }
      if (!this.outData.time) {
        this.hasError__time = '请选择面试时间';
        flag = false;
      } else {
        this.hasError__time = '';
      }
      if (!this.outData.name) {
        this.hasError__name = '请填写联系人';
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
      if (!this.outData.loc) {
        this.hasError__loc = '请填写面试地点';
        flag = false;
      } else {
        this.hasError__loc = '';
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
        date: this.date,
      });
    },
  },
  components: {
    dialogBase,
    Select,
    Option,
    DatePicker,
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
        left: 219px;
        width:195px;
        margin-right:6px;
        text-align:left;
        color:red;
        font-size: 12px;
      }
    }
  }
</style>
