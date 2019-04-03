<template>
  <div class="corpInfo">
    <form>
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
            <!-- 这里也可以用对象数组 [{},{},{}] 循环，key值不重复就行，value是你要得到的值，双大括号中是你要显示的值 -->
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
          <date-picker
            :single-input="true"
            v-model="date"
            :disabled="true"
            width="195px"></date-picker>
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
        <label class="form-item-left">公司图标</label>
        <div class="form-item-right">
          <input id="logo" ref="logo" type="file" v-show="false" @change="updateLogo">
          <label for="logo" style="cursor:pointer">
            <div class="banner"></div>
            <img ref="logoImg" width="195px" src="@/assets/img/logo.png">
          </label>
        </div>
      </div>
    </form>
    <form>
      <div class="form-item">
        <label class="form-item-left">公司图片</label>
        <div class="form-item-right">
          <input id="corpImg" type="file" v-show="false">
          <label for="corpImg">
            <div class="btn primary">上传</div>
          </label>
          <div class="corpImg-container">
            <div class="corpImgs" v-for="(img, index) of corpImgs" :key="img.id">
              <span style="flex:1">{{ img.name }}</span><span @click="deleteImg(index)">x</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">公司描述</label>
        <div class="form-item-right">
          <textarea cols="30" rows="10"></textarea>
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
      // 公司图片
      corpImgs: [
        { name: '图片名称1', id: '111' },
        { name: '图片名称2', id: '222' },
        { name: '图片名称3', id: '333' },
        { name: '图片名称4', id: '444' },
        { name: '图片名称5', id: '555' },
      ],
    };
  },
  components: {
    Select,
    Option,
    DatePicker,
  },
  methods: {
    updateLogo() {
      if (this.$refs.logo.files[0] !== undefined) {
        this.$confirm('确定要更换公司图标吗？', (res) => {
          if (res === true) {
            // TODO 更换图片后台逻辑
            this.$alert('更改成功');
          } else {
            this.$refs.logo.value = null;
          }
        });
      }
    },
    deleteImg(index) {
      this.$confirm('确定要删除图片吗？', (res) => {
        if (res === true) {
          // TODO 删除图片后台逻辑
          this.corpImgs.splice(index, 1);
          this.$alert('删除成功');
        }
      });
    },
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

.corpInfo {
  font-size: 0;
  display: flex;
  justify-content: center;
  & > form {
    display: inline-block;
    text-align: left;
    box-sizing: border-box;
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
    .corpImg-container {
      margin-top: 20px;
      .corpImgs {
        font-size: 10px;
        width: 200px;
        height: 30px;
        background: #B3D7FF;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px 0 10px;
        margin-top: 5px;
        & > span:nth-child(2) {
          cursor: pointer;
          box-sizing: border-box;
          width: 21px;
          height: 21px;
          text-align: center;
          border-radius: 15px;
          padding-top: 1.5px;
          padding-right: 1px;
          color: #fff;
          background-color: rgb(39, 114, 253);
          &:hover {
            background-color: rgba(39, 114, 253, 0.6);
          }
        }
      }
    }
    textarea {
      padding: 5px;
    }
  }
}
</style>
