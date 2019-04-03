<template>
  <div class="emplMgn">
    <header>
      <div style="flex:1">
        <div class="btn primary" @click="addEmplShow = true">添加</div>
      </div>
      <div>
        <input type="text" placeholder="姓名" v-model="likeName">
        <input type="text" placeholder="部门名" v-model="likeDeptName">
        <div class="btn primary" @click="getAllEmpl">搜索</div>
      </div>
    </header>
    <div class="card-container">
      <div class="card-row" v-for="(empl, index) of empls" :key="index">
        <div class="card">
          <div class="row">
            <div class="name">
              {{ empl[0].name }}
              <span class="close" @click="deleteEmpl(empl[0])">x</span>
            </div>
          </div>
          <div class="row">
            <span>电话:</span> {{ empl[0].tel }}
            <span><font size="1">部门: </font>{{ empl[0].deptName }}</span>
          </div>
          <div class="row">
            <span>邮箱:</span> {{ empl[0].email }}
            <span><div class="btn primary" @click="modifyEmplClicked(empl[0])">修改</div></span>
          </div>
        </div>
        <div class="card" style="margin: 0 10px 0 10px" v-if="empl[1]">
          <div class="row">
            <div class="name">
              {{ empl[1].name }}
              <span class="close" @click="deleteEmpl(empl[1])">x</span>
            </div>
          </div>
          <div class="row">
            <span>电话:</span> {{ empl[1].tel }}
            <span><font size="1">部门: </font>{{ empl[1].deptName }}</span>
          </div>
          <div class="row">
            <span>邮箱:</span> {{ empl[1].email }}
            <span><div class="btn primary" @click="modifyEmplClicked(empl[1])">修改</div></span>
          </div>
        </div>
        <div class="card" style="opacity:0" v-else></div>
        <div class="card" v-if="empl[2]">
          <div class="row">
            <div class="name">
              {{ empl[2].name }}
              <span class="close" @click="deleteEmpl(empl[2])">x</span>
            </div>
          </div>
          <div class="row">
            <span>电话:</span> {{ empl[2].tel }}
            <span><font size="1">部门: </font>{{ empl[2].deptName }}</span>
          </div>
          <div class="row">
            <span>邮箱:</span> {{ empl[2].email }}
            <span><div class="btn primary" @click="modifyEmplClicked(empl[2])">修改</div></span>
          </div>
        </div>
        <div class="card" style="opacity:0" v-else></div>
      </div>
    </div>
    <footer>
      <Page @setCurPage="setCurPage" :curPage="curPage" :total="total" :pageSize="pageSize"></Page>
    </footer>
    <empl-mgn-dialog
      @close="addEmplShow = false"
      @done="addEmpl"
      :dialogData="{}"
      title="添加员工"
      :show="addEmplShow"
    ></empl-mgn-dialog>
    <empl-mgn-dialog
      @close="modifyEmplShow = false"
      @done="modifyEmpl"
      :dialogData="modifyEmplData"
      title="添加员工"
      :show="modifyEmplShow"
    ></empl-mgn-dialog>
  </div>
</template>
<script>
import { corpMixin } from '@/mixins/NavigationGuards';
import EmplMgnDialog from '@/components/Dialogs/emplMgn';
import Page from '@/components/Pages/index';
import api from '@/api/emplMgn';

export default {
  mixins: [corpMixin],
  name: 'EmplMgn',
  data() {
    return {
      likeName: '',
      likeDeptName: '',
      empls: [
        // [
        //   { name: '李博今', tel: '17612082011', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082022', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082033', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        // ],
        // [
        //   { name: '李博今', tel: '17612082044', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082055', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082066', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        // ],
        // [
        //   { name: '李博今', tel: '17612082077', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        // ],
      ],
      curPage: 1,
      total: 1000,
      pageSize: 10,

      addEmplShow: false,
      modifyEmplShow: false,
      modifyEmplData: null,
    };
  },
  components: {
    Page,
    EmplMgnDialog,
  },
  mounted() {
    this.companyId = sessionStorage.getItem('companyId');
    this.getAllEmpl();
  },
  methods: {
    getAllEmpl() {
      const that = this;
      const params = new URLSearchParams();
      params.append('companyId', sessionStorage.getItem('companyId'));
      params.append('rows', that.$data.pageSize);
      params.append('page', that.$data.curPage);
      params.append('deptName', that.$data.likeDeptName);
      params.append('name', that.$data.likeName);
      that.$data.empls.splice(0, that.$data.empls.length);
      api.getAllEmploApi(params).then((response) => {
        const newarray = [];
        for (let i = 0; i < response.data.rows.length; i += 1) {
          newarray.push({
            name: response.data.rows[i].sysUser.realname,
            tel: response.data.rows[i].sysUser.phone,
            dept: response.data.rows[i].bdept.businessId,
            deptName: response.data.rows[i].bdept.name,
            email: response.data.rows[i].sysUser.email,
            id: response.data.rows[i].sysUser.businessId,
            desc: response.data.rows[i].brecruiter.description,
          });
          if (newarray.length === 3) {
            that.$data.empls.push([...newarray]);
            newarray.splice(0, newarray.length);
          }
        }
        if (newarray.length !== 0) {
          that.$data.empls.push(newarray);
        }
        that.$data.total = response.data.total;
        that.$data.curPage = response.data.pageNu;
        // console.log(that.$data.empls);
        console.log(that.$data.empls);
      });
    },
    addEmpl(empl) {
      this.addEmplShow = false;
      const params = new URLSearchParams();
      params.append('companyId', sessionStorage.getItem('companyId'));
      params.append('deptId', empl.dept);
      params.append('password', empl.psw);
      params.append('realName', empl.name);
      params.append('email', empl.email);
      params.append('phone', empl.tel);
      params.append('desc', empl.desc);
      api.addApi(params).then((response) => {
        if (response.data.code === 200) {
          this.$alert('添加成功');
          this.getAllEmpl();
        } else {
          this.$alert(response.data.message);
        }
      });
    },
    modifyEmplClicked(empl) {
      this.modifyEmplData = { ...empl };
      this.modifyEmplShow = true;
    },
    modifyEmpl(empl) {
      this.modifyEmplShow = false;
      const params = new URLSearchParams();
      params.append('deptId', empl.dept);
      params.append('password', empl.psw);
      params.append('realname', empl.name);
      params.append('email', empl.email);
      params.append('phone', empl.tel);
      params.append('desc', empl.desc);
      api.updateApi(empl.id, params).then((response) => {
        if (response.data.code === 200) {
          this.$alert('添加成功');
          this.getAllEmpl();
        } else {
          this.$alert(response.data.message);
        }
      });
    },
    deleteEmpl(empl) {
      console.log(empl);
      this.$confirm('确定要移除该员工吗？', (res) => {
        if (res) {
          api.deleteApi(empl.id).then((response) => {
            if (response.data.code === 200) {
              this.$alert('删除成功');
              this.getAllEmpl();
            } else {
              this.$alert(response.data.message);
            }
          });
        }
      });
    },
    setCurPage(page) {
      this.curPage = page;
    },
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);
.emplMgn {
  padding-top: 20px;
  & > header {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-bottom: 20px;
    & > div:nth-child(2) {
      display: flex;
      justify-content: right;
      box-sizing: border-box;
      & > input {
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .card-container {
    height: 470px;
    .card-row {
      display: flex;
      justify-content: left;
      align-items: center;
      margin-bottom: 10px;
      .card {
        position: relative;
        background: rgba(103, 174, 255, 0.3);
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        padding: 15px;
        .row {
          user-select: none;
          color: @site-main;
          box-sizing: border-box;
          padding: 0px;
          height: 45px;
          .close {
            cursor: pointer;
            float: right;
            font-size: 12px;
          }
          .name {
            color: rgb(0, 64, 138);
            font-size: 24px;
          }
          .tel {
            color: #fff;
          }
          & > span:nth-child(1) {
            font-size: 10px;
          }
          & > span:nth-child(2) {
            float: right;
          }
        }
      }
    }
  }
  & > footer {
    margin-top: 30px;
    padding: 20px 0 20px 0;
    border: 1px rgba(0, 97, 207, 0.3) solid;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
