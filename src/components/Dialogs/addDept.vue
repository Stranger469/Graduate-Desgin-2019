<template>
  <dialogBase v-if="show" :title="title" @ok="submit" @close="close">
      <form class="addDept">
          <div class="form-item">
            <label class="require" for="dept-name">部门名称:</label>
            <input id="dept-name" v-model="outData.name" type="text" placeholder="长度必须小于10">
            <div class="error_text">
              {{ hasError__name }}
            </div>
          </div>
      </form>
  </dialogBase>
</template>

<script>
import dialogBase from '@/components/Dialogs/base/dialogBase';

export default{
  props: ['dialogData', 'show', 'title'],
  data() {
    const defaultObj = {
      outData: {},
      hasError__name: '',
    };
    this.resetData(defaultObj.outData);
    return defaultObj;
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
      this.outData = obj || this.outData;
      this.outData.name = this.dialogData.name;
      this.outData.id = this.dialogData.id;
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
      if (!flag) return;
      this.$emit('done', this.outData);
    },
  },
  components: {
    dialogBase,
  },
};
</script>
<style lang="less">
  .addDept{
    .form-item {
      position: relative;
      margin: 20px 10px;
      flex-wrap: wrap;
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
