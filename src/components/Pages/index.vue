<template>
    <div class="site-page">
       <div class="msg">
         共<span>{{totalPage}}</span>页/<span>{{total}}</span>条数据
       </div>
       <div class="content">
         <span class="page-item" @click="toPage(curPage-1)"> {{ forward }} </span>
         <template  v-if="startPage>=showSizeMax">
            <span class="page-item" @click="toPage(1)">1</span>
            <span class="page-item">...</span>
         </template>
         <template  v-for="(index,key) in showSize">
           <span
            class="page-item"
            :class="{cur:(key + startPage === curPage)}"
            @click="toPage(key + startPage)">{{ key + startPage}}</span>
         </template>
         <template  v-if="(startPage + showSize - 1) !== totalPage">
           <span class="page-item">...</span>
           <span class="page-item" @click="toPage(totalPage)">{{totalPage}}</span>
         </template>
         <span class="page-item" @click="toPage(curPage+1)"> >> </span>
       </div>
       <div class="jump">
          <span @click="toPage(inValue)">跳至</span>
          <input class="page-item" v-model='inValue'>
          页
       </div>
    </div>
</template>
<style lang="less">
  .site-page{
    text-align: left;
    display:inline-block;
    font-size:12px;
    user-select: none;
    .page-item{
      width: 35px;
      height: 25px;
      line-height: 25px;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid rgba(215, 215, 215, 1);
      font-size: 13px;
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      &.cur{
        background: #0064D3;
        color:#fff;
        border-color:#0064D3;
       }
    }
    .msg{
      vertical-align: middle;
      display: inline-block;
      margin-right:10px;
      span{
        color: #FF3C2C;
      }
    }
    .content{
      display: inline-block;
      vertical-align: middle;
      font-size: 0;
      .page-item {
        margin-right: 5px;
      }
    }
    .jump{
      vertical-align: middle;
      display: inline-block;
      margin-left:10px;
      color:#999;
      span{
        margin-right:8px;
        cursor: pointer;
        color: #0064D3;
      }
      input{
        margin-right:8px;
      }
    }
  }


</style>
<script>
/* eslint-disable */
export default{
  name: 'page',
  props: [
    'total',
    'curPage',
    'pageSize',
  ],
  data() {
    return {
      // pageSize:10,
      showSizeMax: 6,
      inValue: '',
      forward: '<<',
    };
  },
  computed: {
    totalPage() {
      const totalPage = this.total / this.pageSize;
      return totalPage === 0 ? 0 : Math.ceil(totalPage);
    },
    startPage() {
      const rightSize = this.showSizeMax - 1;
      const num = Math.floor(this.curPage / rightSize);
      const group = this.curPage % rightSize === 0 ? num - 1 : num;
      const start = (group * rightSize) + 1;
      // console.log(group);
      return start === 0 ? 1 : start;
      // 1 8 15 22 29
    },
    showSize() {
      const max = (this.startPage - 1) + this.showSizeMax;
      const min = max - this.totalPage;
      return min > 0 ? this.showSizeMax - min : this.showSizeMax;
    },
  },
  methods: {
    toPage(page) {
      if (page < 1) {
        page = 1;
      } else if (page > this.totalPage) {
        page = this.totalPage;
      }
      this.$emit('setCurPage', page);
      this.inValue = '';
      //        this.curPage = page;
    },
  },
};

</script>
