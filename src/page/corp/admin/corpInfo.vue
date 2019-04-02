<template>
  <div class="corpInfo">
    <form class="left">
      <div class="form-item">
        <label class="form-item-left">公司名称</label>
        <div class="form-item-right">
          <input type="text" disabled>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">法人代表</label>
        <div class="form-item-right">
          <input type="text" disabled>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">公司规模</label>
        <div class="form-item-right">
          <Select
            :disabled="true"
            width="195px"
            v-model="scale"
            placeholder="公司规模">
            <!-- 这里也可以用对象循环，key值不重复就行，value是你要得到的值，双大括号中是你要显示的值 -->
            <Option
              v-for="item of ['10人以下', '100人以下', '1000人', '1000人以上']"
              :key="item"
              :value="item">
                {{ item }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">融资情况</label>
        <div class="form-item-right">
          <Select
            :disabled="true"
            width="195px"
            v-model="finacial"
            placeholder="融资情况">
            <Option
              v-for="item of ['不需要融资', '天使轮', 'A轮', 'B轮', 'C轮']"
              :key="item"
              :value="item">
                {{ item }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">创建时间</label>
        <div class="form-item-right">
          <date-picker :single-input="true" v-model="date"></date-picker>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">注册资本</label>
        <div class="form-item-right">
          <input type="text">
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">官网地址</label>
        <div class="form-item-right">
          <input type="text">
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">公司地址</label>
        <div class="form-item-right">
          <input type="text">
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">上传图片</label>
        <div class="form-item-right">
          <input type="file">
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { corpMixin } from '@/mixins/NavigationGuards';
import Select from '@/components/select/Select';
import Option from '@/components/select/Option';
import DatePicker from '@/components/Date/index';

export default {
  mixins: [corpMixin],
  name: 'CorpInfo',
  data() {
    return {
      scale: '',
      finacial: '',
      date: null,
    };
  },
  components: {
    Select,
    Option,
    DatePicker,
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

.corpInfo {
  & > form.left {
    display: inline-block;
    text-align: left;
    width: 50%;
    .form-item-left {
      width: 80px;
      text-align: right;
    }
    .form-item-right {
      width: 200px;
      position: relative;
      text-align: left;
    }
  }
}
</style>
