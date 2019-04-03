<template>
  <div>
    <div class="table-header">
      <p>职位列表</p>
      <div class="search-bar">
        <input type="text">
        <div class="btn primary">搜索</div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
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
        <tr>
          <td>扫地</td>
          <td>广州</td>
          <td>博士</td>
          <td>10年以上</td>
          <td>100 ~ 500元</td>
          <td>白云山</td>
          <td><a>修改</a>&nbsp;&nbsp;<a>删除</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { emplMixin } from '@/mixins/NavigationGuards';

export default {
  mixins: [emplMixin],
  name: 'PositionMgn',
  data() {
    return {
      tableData: [
        {
          posName: '扫地',
          posLoc: '广州',

        },
      ],
    };
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

</style>
