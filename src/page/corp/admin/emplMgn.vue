<template>
  <div class="emplMgn">
    <header>
      <div style="flex:1">
        <div class="btn primary">添加</div>
      </div>
      <div>
        <input type="text" placeholder="姓名" v-model="likeName">
        <input type="text" placeholder="部门名" v-model="likeDeptName">
        <div class="btn primary">搜索</div>
      </div>
    </header>
    <div class="card-container">
      <div class="card-row" v-for="(empl, index) of empls" :key="index">
        <div class="card">
          <div class="row">
            <div class="name">{{ empl[0].name }}<span class="close">x</span></div>
          </div>
          <div class="row">
            <span>电话:</span> {{ empl[0].tel }}
            <span><font size="1">部门: </font>{{ empl[0].dept }}</span>
          </div>
          <div class="row">
            <span>邮箱:</span> {{ empl[0].email }}
            <span><div class="btn primary">修改</div></span>
          </div>
        </div>
        <div class="card" style="margin: 0 10px 0 10px">
          <div class="row">
            <div class="name">{{ empl[1].name }}<span class="close">x</span></div>
          </div>
          <div class="row">
            <span>电话:</span> {{ empl[1].tel }}
            <span><font size="1">部门: </font>{{ empl[1].dept }}</span>
          </div>
          <div class="row">
            <span>邮箱:</span> {{ empl[1].email }}
            <span><div class="btn primary">修改</div></span>
          </div>
        </div>
        <div class="card">
          <div class="row">
            <div class="name">{{ empl[2].name }}<span class="close">x</span>
          </div>
          </div>
          <div class="row">
            <span>电话:</span> {{ empl[2].tel }}
            <span><font size="1">部门: </font>{{ empl[2].dept }}</span>
          </div>
          <div class="row">
            <span>邮箱:</span> {{ empl[2].email }}
            <span><div class="btn primary">修改</div></span>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <Page @setCurPage="setCurPage" :curPage="curPage" :total="total" :pageSize="pageSize"></Page>
    </footer>
  </div>
</template>
<script>
import { corpMixin } from '@/mixins/NavigationGuards';
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
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        // ],
        // [
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        // ],
        // [
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        //   { name: '李博今', tel: '17612082048', dept: '傻屌总部 - 傻屌分部', email: '1034356409@qq.com' },
        // ],
      ],
      curPage: 1,
      total: 1000,
      pageSize: 10,
    };
  },
  components: {
    Page,
  },
  mounted() {
    this.companyId = sessionStorage.getItem("companyId");
    this.getAllEmpl();
  },
  methods: {
    getAllEmpl() {
      const that = this;
      let params = new URLSearchParams();
      params.append("companyId",sessionStorage.getItem("companyId"));
      params.append("rows",that.$data.pageSize);
      params.append("page",that.$data.curPage);
      params.append("deptName",that.$data.likeDeptName);
      params.append("name",that.$data.likeName);
      that.$data.empls.splice(0,that.$data.empls.length);
      api.getAllEmploApi(params).then((response) => {
        let newarray = [];
        for(let i = 0 ; i < response.data.rows.length ; i++) {
          console.log(response.data.rows[i]);
          newarray.push({
            name: response.data.rows[i].sysUser.realname,
            tel: response.data.rows[i].sysUser.phone,
            dept: response.data.rows[i].bdept.name,
            email: response.data.rows[i].bdept.email
          });
          if(newarray.length === 3) {
            that.$data.empls.push(newarray);
            newarray.splice(0,newarray.length);
          }
        }
        if(newarray.length !== 0) {
          that.$data.empls.push(newarray)
        }
        that.$data.total = response.data.total;
        that.$data.curPage = response.data.pageNu;
        console.log(that.$data.empls)
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
