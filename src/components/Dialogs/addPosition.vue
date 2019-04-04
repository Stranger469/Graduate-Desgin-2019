<template>
  <dialogBase v-if="show" :title="title" @ok="submit" @close="close">
    <form class="addDept">
      <div class="form-item">
        <label class="require" for="user-name">工作名称:</label>
        <input id="user-name" v-model="outData.name" type="text" placeholder="姓名">
        <div class="error_text">
          {{ hasError__name }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-city">工作城市:</label>
        <Select
          width="195px"
          v-model="city"
          placeholder="工作城市">
          <Option
            v-for="item of ['北京','上海','广州','深圳']"
            :key="item"
            :value="item">
              {{ item }}
          </Option>
        </Select>
        <div class="error_text">
          {{ hasError__city }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-loc">工作地点:</label>
        <input id="user-loc" v-model="outData.loc" type="text" placeholder="工作地点">
        <div class="error_text">
          {{ hasError__loc }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-exp">所需经验:</label>
        <input id="user-exp" v-model="outData.exp" type="text" placeholder="所需经验">
        <div class="error_text">
          {{ hasError__exp }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-edubg">所需学历:</label>
        <Select
          width="195px"
          v-model="edubg"
          placeholder="所需学历">
          <Option
            v-for="item of ['小学','初中','高中','大学','研究生','博士']"
            :key="item"
            :value="item">
              {{ item }}
          </Option>
        </Select>
        <div class="error_text">
          {{ hasError__edubg }}
        </div>
      </div>
      <div class="form-item">
        <label class="require" for="user-minSalary">最低工资:</label>
        <input id="user-minSalary" v-model="outData.minSalary" type="text" placeholder="最低工资">
        <div class="error_text">
          {{ hasError__minSalary }}
        </div>
      </div>
      <div class="form-item">
        <label for="user-maxSalary">最高工资:</label>
        <input id="user-maxSalary" v-model="outData.maxSalary" type="text" placeholder="最高工资">
        <div class="error_text">
          {{ hasError__maxSalary }}
        </div>
      </div>
      <div class="form-item">
        <label for="user-desc">工作描述:</label>
        <textarea
          id="user-desc"
          v-model="outData.desc"
          type="text"
          cols="21"
          rows="10"
          style="padding:5px;box-sizing:border-box;"
          placeholder="工作描述"></textarea>
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
        name: '',
        exp: '',
        loc: '',
        minSalary: '',
        maxSalary: '',
        desc: '',
      },
      hasError__name: '',
      hasError__city: '',
      hasError__loc: '',
      hasError__exp: '',
      hasError__edubg: '',
      hasError__minSalary: '',
      hasError__maxSalary: '',
      hasError__desc: '',
      city: '',
      edubg: '',
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
      this.$data.outData.name = this.dialogData.name;
      this.$data.city = this.dialogData.city;
      this.$data.outData.loc = this.dialogData.loc;
      this.$data.outData.exp = this.dialogData.exp;
      this.$data.edubg = this.dialogData.edubg;
      this.$data.outData.minSalary = this.dialogData.minSalary;
      this.$data.outData.maxSalary = this.dialogData.maxSalary;
      this.$data.outData.desc = this.dialogData.desc;
      this.$data.hasError__name = '';
      this.$data.hasError__city = '';
      this.$data.hasError__loc = '';
      this.$data.hasError__exp = '';
      this.$data.hasError__edubg = '';
      this.$data.hasError__minSalary = '';
      this.$data.hasError__maxSalary = '';
      this.$data.hasError__desc = '';
    },
    close() {
      this.$emit('close', false);
    },
    submit() {
      let flag = true;
      if (!this.outData.name || this.getStrLen(this.outData.name) > 10) {
        this.hasError__name = '工作名称填写不规范';
        flag = false;
      } else {
        this.hasError__name = '';
      }
      if (!this.city) {
        this.hasError__city = '请选择工作地点';
        flag = false;
      } else {
        this.hasError__city = '';
      }
      if (!this.outData.loc) {
        this.hasError__loc = '请填写工作地点';
        flag = false;
      } else {
        this.hasError__loc = '';
      }
      if (!this.outData.exp) {
        this.hasError__exp = '请填写所需经验';
        flag = false;
      } else {
        this.hasError__exp = '';
      }
      if (!this.edubg) {
        this.hasError__edubg = '请选择学历';
        flag = false;
      } else {
        this.hasError__edubg = '';
      }
      if (!this.outData.minSalary) {
        this.hasError__minSalary = '请填写最低工资';
        flag = false;
      } else {
        this.hasError__minSalary = '';
      }
      if (!this.outData.maxSalary) {
        this.hasError__maxSalary = '请填写最高工资';
        flag = false;
      } else {
        this.hasError__maxSalary = '';
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
        city: this.city,
        edubg: this.edubg,
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
