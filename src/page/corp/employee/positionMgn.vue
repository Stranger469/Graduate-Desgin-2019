<template>
  <div class="positionMgn">
    <main>
      <div class="table-header">
        <p>职位列表</p>
        <div class="search-bar">
          <input v-model="name" type="text" placeholder="职位名称">
          <div class="btn primary" style="margin-right:5px" @click="findPos">搜索</div>
          <div class="btn primary" @click="addPositionClicked">添加</div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>职位名称</th>
            <th>工作城市</th>
            <th>所需学历</th>
            <th>工作经验</th>
            <th>薪资范围</th>
            <th>工作地点</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="pos of tableData">
            <tr :key="pos.id">
              <td class="expend">
                <img @click="expend($event)" src="@/assets/img/u4210.png"/>
              </td>
              <td>{{ pos.name }}</td>
              <td>{{ pos.cityName }}</td>
              <td>{{ pos.eduName }}</td>
              <td>{{ pos.exp }}</td>
              <td>{{ pos.minSalary + '~' + pos.maxSalary + '元' }}</td>
              <td>{{ pos.loc }}</td>
              <td>
                <a @click="modifyPositionClicked(pos)">修改</a>&nbsp;&nbsp;
                <a @click="deletePos(pos.id)">删除</a>
              </td>
            </tr>
            <tr :key="pos.id + 10000" style="display:none">
              <td class="middle-container" colspan="8">
                <div class="middle">
                  职位描述：{{ pos.desc }}
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </main>
    <footer>
      <Page @setCurPage="setCurPage" :curPage="curPage" :total="total" :pageSize="pageSize"></Page>
    </footer>
    <position-dialog
      @close="addPositionShow = false"
      @done="addPosition"
      :dialogData="{}"
      title="添加员工"
      :show="addPositionShow"
    ></position-dialog>
    <position-dialog
      @close="modifyPositionShow = false"
      @done="modifyPosition"
      :dialogData="modifyPositionData"
      title="添加员工"
      :show="modifyPositionShow"
    ></position-dialog>
  </div>
</template>
<script>
import { emplMixin } from '@/mixins/NavigationGuards';
import Page from '@/components/Pages/index';
import PositionDialog from '@/components/Dialogs/addPosition';
import api from '@/api/positionMgn';

export default {
  mixins: [emplMixin],
  name: 'PositionMgn',
  data() {
    return {
      name: '',
      tableData: [
        // {
        //   id: '10000',
        //   name: '扫地1',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10001',
        //   name: '扫地2',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10002',
        //   name: '扫地3',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10003',
        //   name: '扫地4',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10004',
        //   name: '扫地5',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10005',
        //   name: '扫地6',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10006',
        //   name: '扫地7',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10007',
        //   name: '扫地8',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10008',
        //   name: '扫地9',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
        // {
        //   id: '10009',
        //   name: '扫地10',
        //   city: '广州',
        //   edubg: '博士',
        //   exp: '10年以上',
        //   minSalary: '100',
        //   maxSalary: '500',
        //   loc: '白云山',
        //   desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        // },
      ],

      curPage: 1,
      total: 1000,
      pageSize: 10,

      addPositionShow: false,
      modifyPositionShow: false,
      modifyPositionData: null,
      allCity:[],
    };
  },
  mounted() {
    this.getCity();
    this.getBJobsAndUser();
  },
  methods: {
    getCity() {
      api.getCityApi().then((response) => {
        this.allCity = response.data.data;
      })
    },
    getEduName(id) {
      switch (id){
        case "0":
          return "小学";
        case "1":
          return "初中";
        case "2":
          return "高中";
        case "3":
          return "专科";
        case "4":
          return "本科";
        case "5":
          return "研究生";
        case "6":
          return "博士";
      }
    },
    getCityName(id) {
      for(let i = 0 ; i < this.allCity.length ; i+=1) {
        if(this.allCity[i].businessId === id){
          return this.allCity[i].name;
        }
      }
    },
    getBJobsAndUser() {
      this.tableData = [];
      const params = new URLSearchParams();
      params.append('recruiterId', sessionStorage.getItem('recruiterId'));
      params.append('name', this.name);
      params.append('rows', this.pageSize);
      params.append('page', this.curPage);
      api.getBJobsAndUserApi(params).then((response) => {
        let datas = response.data.rows;
        for(let i = 0 ; i < datas.length ; i += 1)
        this.tableData.push({
          id: datas[i].bjob.businessId,
          name: datas[i].bjob.name,
          city: datas[i].bjob.expectCity,
          cityName: this.getCityName(datas[i].bjob.expectCity),
          edubg: datas[i].bjob.educated,
          eduName: this.getEduName(datas[i].bjob.educated),
          exp: datas[i].bjob.experience,
          minSalary: datas[i].bjob.minSalary,
          maxSalary: datas[i].bjob.maxSalary,
          loc: datas[i].bjob.cityDesc,
          desc: datas[i].bjob.description,
        })
      });
    },
    setCurPage(page) {
      this.curPage = page;
    },
    expend(e) {
      if (e.currentTarget.className === '') {
        e.currentTarget.className = 'rotate';
      } else {
        e.currentTarget.className = '';
      }
      const display = e.currentTarget.parentNode.parentNode.nextSibling.nextSibling.style.display;
      if (display === 'none') {
        e.currentTarget.parentNode.parentNode.nextSibling.nextSibling.style.display = '';
      } else {
        e.currentTarget.parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
      }
    },
    addPositionClicked() {
      this.addPositionShow = true;
    },
    addPosition(pos) {
      this.addPositionShow = false;
      // TODO 添加职位
      const params = new URLSearchParams();
      params.append('recruiterId', sessionStorage.getItem('recruiterId'));
      params.append('name', this.name);
      params.append('description', this.pageSize);
      params.append('expectCity', this.curPage);
      params.append('cityDesc', this.curPage);
      params.append('educated', this.curPage);
      params.append('experience', this.experience);
      params.append('jobType', this.curPage);
      params.append('minSalary', this.minSalary);
      params.append('maxSalary', this.maxSalary);
      api.getBJobsAndUserApi(params).then((response) => {

      });
    },
    modifyPositionClicked(pos) {
      this.modifyPositionShow = true;
      this.modifyPositionData = { ...pos };
    },
    modifyPosition(pos) {
      this.modifyPositionShow = false;
      // TODO 修改职位
    },
    deletePos(posId) {
      this.$confirm('确定要删除该职位吗?', (res) => {
        if (res) {
          // TODO 删除职位
        }
      });
    },
    findPos() {
      this.getBJobsAndUser();
    },
  },
  components: {
    Page,
    PositionDialog,
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

.positionMgn {
  &>main {
    position: relative;
    height: 701px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .table-header {
      position: sticky;
      top: 0;
    }
    .middle-container {
      box-sizing: border-box;
      padding: 10px;
      padding-left: 40px;
      background: rgb(238, 238, 238);
      height: 100px;
      // display: none;
      .middle {
        text-align: left;
      }
    }
  }
  & > footer {
    margin-top: 20px;
    padding: 20px 0 20px 0;
    border: 1px rgba(0, 97, 207, 0.3) solid;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
