<template>
  <div class="positionMgn">
    <main>
      <div class="table-header">
        <p>面试管理</p>
        <div class="search-bar">
          <div class="btn primary">添加</div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>联系人</th>
            <th>面试时间</th>
            <th>联系电话</th>
            <th>联系邮箱</th>
            <th>面试地点</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="inter of tableData">
            <tr :key="inter.id">
              <td class="expend">
                <img @click="expend($event)" src="@/assets/img/u4210.png"/>
              </td>
              <td>{{ inter.name }}</td>
              <td>{{ inter.date + ' ' + inter.time }}</td>
              <td>{{ inter.tel }}</td>
              <td>{{ inter.email }}</td>
              <td>{{ inter.loc }}</td>
              <td>
                <a>修改</a>&nbsp;&nbsp;
                <a>删除</a>
              </td>
            </tr>
            <tr :key="inter.id + 10000" style="display:none">
              <td class="middle-container" colspan="8">
                <div class="middle">
                  面试描述: {{ inter.desc }}
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
          name: '李博今',
          date: '2019-4-5',
          time: '23:00',
          tel: '17612082048',
          email: 'lbj@sd.com',
          loc: '中北天软',
          desc: '带上简历',
        },
      ],

      curPage: 1,
      total: 1000,
      pageSize: 13,
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
    height: 701px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
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
