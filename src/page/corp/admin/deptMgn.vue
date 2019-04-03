<template>
  <div class="deptMgn">
    <div class="tree-container" ref="tree_container">
      <Node v-for="obj of html" :key="obj.id" :item="obj">
        {{ obj.name }}
      </Node>
    </div>
  </div>
</template>
<script>
import { corpMixin } from '@/mixins/NavigationGuards';
import Node from '@/components/treeNode/TreeNode';

export default {
  mixins: [corpMixin],
  name: 'DeptMgn',
  data() {
    return {
      layer: '',
      html: [],
      tree: {
        name: '总部门',
        id: 10000,
        children: [
          {
            name: '部门1',
            id: 10001,
            children: [
              {
                name: '部门1.1',
                id: 10003,
                children: null,
              },
              {
                name: '部门1.2',
                id: 10004,
                children: [
                  {
                    name: '部门1.2.1',
                    id: 10008,
                    children: null,
                  },
                ],
              },
            ],
          },
          {
            name: '部门2',
            id: 10002,
            children: [
              {
                name: '部门2.1',
                id: 10005,
                children: null,
              },
              {
                name: '部门2.2',
                id: 10006,
                children: null,
              },
              {
                name: '部门2.3',
                id: 10007,
                children: null,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    renderTree(obj, index, length) {
      this.html.push({
        name: this.layer + obj.name,
        id: obj.id,
      });
      if (obj.children !== null) {
        this.layer += '　　';
        obj.children.forEach((e, i) => {
          this.renderTree(e, i, obj.children.length);
        });
      }
      if (index + 1 === length) {
        this.layer = this.layer.substr(0, this.layer.length - 2);
      }
    },
  },
  mounted() {
    this.renderTree(this.tree, 0, 0);
  },
  components: {
    Node,
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

</style>
