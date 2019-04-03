<template>
  <dialogBase v-if="show" :title="title" @ok="submit" @close="close">
      <div class="form addRules">
          <div class="form-item">
            <label class="require" for="rule-name">部门名称:</label>
            <input id="rule-name" v-model="outData.name" type="text" placeholder="长度必须小于7个字节">
            <div class="error_text">
              {{ hasError__name }}
            </div>
          </div>
          <div class="form-item">
            <label class="require" for="rule-desc">职能描述:</label>
            <textarea placeholder="长度必须小于50个字符" rows="3" v-model="outData.desc" id="rule-desc" ></textarea>
            <div class="error_text" style="top:59px">
              {{ hasError__desc }}
            </div>
          </div>
      </div>
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
      hasError__desc: '',
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
      return str.replace(/[\u0391-\uFFE5]/g, 'xx').length;
    },
    resetData(obj) {
      this.outData = obj || this.outData;
      this.outData.name = this.dialogData.name;
      this.outData.desc = this.dialogData.desc;
      this.outData.dept_id = this.dialogData.dept_id;
    },
    close() {
      this.$emit('close', false);
    },
    submit() {
      let flag = true;
      if (!this.outData.name || this.getStrLen(this.outData.name) > 7) {
        this.hasError__name = '部门名称格式错误';
        flag = false;
      } else {
        this.hasError__name = '';
      }
      if (!this.outData.desc || this.getStrLen(this.outData.name) > 50) {
        this.hasError__desc = '职能描述格式错误';
        flag = false;
      } else {
        this.hasError__desc = '';
      }
      if (!flag) return;
      this.$emit('saveData', { outData: this.outData });
    },
  },
  components: {
    dialogBase,
  },
};
</script>
<style lang="less">
  .addRules{
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
