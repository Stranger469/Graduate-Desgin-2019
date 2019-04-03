<template>
  <div class="corpInfo">
    <form>
      <div class="form-item">
        <label class="form-item-left">公司名称</label>
        <div class="form-item-right">
          <input type="text" disabled v-model="companyName">
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">法人代表</label>
        <div class="form-item-right">
          <input type="text" disabled v-model="legalPerson">
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
              v-for="item of [{key: '0', value: '(1-10)'},
              {key: '1', value: '(11-50)'},
              {key: '2', value: '(51-100)'},
              {key: '3', value: '(101-500)'},
              {key: '4', value: '(501-1000)'},
              {key: '5', value: '(1001-5000) '},
              {key: '6', value: '(5001-10000)'},
              {key: '7', value: '(>10000)'}]"
              :key="item.key"
              :value="item.key">
                {{ item.value }}
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
              v-for="item of [{key: '0', value: '天使轮'},
              {key: '1', value: 'A轮'},
              {key: '2', value: 'B轮'},
              {key: '3', value: 'C轮'},
              {key: '4', value: '不需要融资'}]"
              :key="item.key"
              :value="item.key">
                {{ item.value }}
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
        <label class="form-item-left" >注册资本</label>
        <div class="form-item-right">
          <input type="text" v-model="capital">
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left" >官网地址</label>
        <div class="form-item-right">
          <input type="text" v-model="url">
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left" >公司地址</label>
        <div class="form-item-right">
          <input type="text" v-model="address">
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-left">公司图标</label>
        <div class="form-item-right">
          <input id="logo" ref="logo" type="file" v-show="false" @change="updateLogo">
          <label for="logo" style="cursor:pointer">
            <div class="banner"></div>
            <img ref="logoImg" width="195px" :src="logoPic">
          </label>
        </div>
      </div>
    </form>
    <form>
      <div class="form-item">
        <label class="form-item-left">公司图片</label>
        <div class="form-item-right">
          <input id="corpImg" type="file" v-show="false" ref="newpic" @change="updateNewPic">
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
          <textarea cols="30" rows="10" v-model="description"></textarea>
        </div>
      </div>
    </form>
    <div class="btn primary" @click="getCompanyInfo">重置</div>
    <div class="btn primary" @click="update">修改</div>
  </div>
</template>
<script>
import { corpMixin } from '@/mixins/NavigationGuards';
import Select from '@/components/select/Select';
import Option from '@/components/select/Option';
import DatePicker from '@/components/Date/index';
import api from '@/api/corpInfo';
import nginx from '@/assets/nginxconfig'
export default {
  mixins: [corpMixin],
  name: 'CorpInfo',
  data() {
    return {
      companyName: '',
      legalPerson: '',
      capital: '',
      url:'',
      address: '',
      description: '',
      scale: '',
      finacial: '',
      date: null,
      // 公司图片
      corpImgs: [
      ],
      companyinfo: '',
      companyId: '',
      logoPic: '',
      ico: '',
    };
  },
  mounted() {
    this.companyId = sessionStorage.getItem("companyId");
    this.getCompanyInfo();
  },
  components: {
    Select,
    Option,
    DatePicker,
  },
  methods: {
    getCompanyInfo() {
      const that = this;
      api.getCompanyInfoApi(that.companyId).then((response) => {
        that.companyinfo = response.data.data;
        that.$data.companyName = response.data.data.name;
        that.$data.legalPerson = response.data.data.legalPerson;
        that.$data.description = response.data.data.description;
        that.$data.capital = response.data.data.capital;
        that.$data.url = response.data.data.url;
        that.$data.address = response.data.data.address;
        that.$data.date = new Date(response.data.data.establish);
        that.$data.scale = response.data.data.scale;
        that.$data.finacial = response.data.data.financing;
        that.$data.logoPic = nginx.nginxaddress + response.data.data.ico;
        that.$data.ico = response.data.data.ico;
        let pics = response.data.data.images.split(",");
        that.$data.corpImgs.splice(0,that.$data.corpImgs.length);
        for(let i = 0 ; i < pics.length ; i++) {
          that.$data.corpImgs.push({
            name: pics[i],
            value: nginx.nginxaddress + pics[i]
          })
        }
      });
    },
    updateLogo() {
      if (this.$refs.logo.files[0] !== undefined) {
        this.$confirm('确定要更换公司图标吗？', (res) => {
          if (res === true) {
            let params = new FormData();
            params.append("file",this.$refs.logo.files[0]);
            const that = this;
            api.uploadPic(params).then((response) => {
              console.log(response.data)
              that.$data.logoPic = nginx.nginxaddress + response.data.data;
              that.$data.ico = response.data.data;
              this.$alert('更改成功');
            });
          } else {
            this.$refs.logo.value = null;
          }
        });
      }
    },
    updateNewPic() {
      if (this.$refs.newpic.files[0] !== undefined) {
        this.$confirm('确定要添加图片吗？', (res) => {
          if (res === true) {
            let params = new FormData();
            params.append("file",this.$refs.newpic.files[0]);
            const that = this;
            api.uploadPic(params).then((response) => {
              console.log(response.data)
              that.$data.corpImgs.push(
                {
                  name:response.data.data,
                  value: nginx.nginxaddress + response.data.data
                }
              );
              this.$alert('添加成功');
            });
          } else {
            this.$refs.newpic.value = null;
          }
        });
      }
    },
    update() {
      const that = this;
      this.$confirm('确定修改公司信息吗？', (res) => {
        if (res === true) {
          let params = new URLSearchParams();
          params.append("capital",that.$data.capital);
          params.append("url",that.$data.url);
          params.append("description",that.$data.description);
          params.append("address",that.$data.address);
          params.append("ico",that.$data.ico);
          let img = "";
          for(let i = 0 ; i < that.$data.corpImgs.length ; i++) {
            if(i === 0) {
              img += that.$data.corpImgs[0].name;
            }else {
              img += "," + that.$data.corpImgs[0].name;
            }
          }
          params.append("images",img);
          api.update(that.companyId, params).then((response) => {
            console.log(response.data)
            if(response.data.code === 200) {
              this.$alert('修改成功');
              that.getCompanyInfo();
            }else {
              this.$alert('修改失败');
            }
          });
        } else {

        }
      });

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
