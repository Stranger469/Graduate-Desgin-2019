<template>
  <div class="positionMgn">
    <main>
      <div class="table-header">
        <p>职位列表</p>
        <div class="search-bar">
          <input v-model="posName" type="text" placeholder="职位名称">
          <div class="btn primary">搜索</div>
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
              <td>{{ pos.posName }}</td>
              <td>{{ pos.posLoc }}</td>
              <td>{{ pos.edubackground }}</td>
              <td>{{ pos.exp }}</td>
              <td>{{ pos.scale }}</td>
              <td>{{ pos.locDetial }}</td>
              <td><a>修改</a>&nbsp;&nbsp;<a>删除</a></td>
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
  </div>
</template>
<script>
import { emplMixin } from '@/mixins/NavigationGuards';
import Page from '@/components/Pages/index';

export default {
  mixins: [emplMixin],
  name: 'PositionMgn',
  data() {
    return {
      posName: '',
      tableData: [
        {
          id: '10000',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10001',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10002',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10003',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10004',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10005',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10006',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10007',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10008',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
        {
          id: '10009',
          posName: '扫地',
          posLoc: '广州',
          edubackground: '博士',
          exp: '10年以上',
          scale: '100~500元',
          locDetial: '白云山',
          desc: '好多钱好多钱好多钱好多钱好多钱好多钱好多钱好多钱',
        },
      ],

      curPage: 1,
      total: 1000,
      pageSize: 13,

      show: false,
      expendRow: [],
    };
  },
  mounted() {
    this.tableData.forEach(() => {
      this.expendRow.push(false);
    });
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
  },
  components: {
    Page,
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

.positionMgn {
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
