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
              <td>{{ pos.city }}</td>
              <td>{{ pos.edubg }}</td>
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

export default {
  mixins: [emplMixin],
  name: 'PositionMgn',
  data() {
    return {
      name: '',
      tableData: [
        {
          id: '10000',
          name: '扫地1',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10001',
          name: '扫地2',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10002',
          name: '扫地3',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10003',
          name: '扫地4',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10004',
          name: '扫地5',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10005',
          name: '扫地6',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10006',
          name: '扫地7',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10007',
          name: '扫地8',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10008',
          name: '扫地9',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10009',
          name: '扫地10',
          city: '广州',
          edubg: '博士',
          exp: '10年以上',
          minSalary: '100',
          maxSalary: '500',
          loc: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
      ],

      curPage: 1,
      total: 1000,
      pageSize: 10,

      addPositionShow: false,
      modifyPositionShow: false,
      modifyPositionData: null,
    };
  },
  methods: {
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
      // TODO 查找职位列表
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
