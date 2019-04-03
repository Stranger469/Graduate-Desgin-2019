<template>
  <div class="deptMgn">
    <div class="tree-container" ref="tree_container">
      <Node
        @add="addDeptClicked"
        @modify="modifyDeptClicked"
        @delete="deleteDeptClicked"
        v-for="obj of html"
        :key="obj.id"
        :item="obj">
          {{ obj.name }}
      </Node>
    </div>
    <dept-dialog
      @close="addDialogShow = false"
      @done="addDialog"
      :dialogData="{}"
      title="添加部门"
      :show="addDialogShow"
    ></dept-dialog>
    <dept-dialog
      @close="modifyDialogShow = false"
      @done="modifyDialog"
      :dialogData="modifyDialogData"
      title="修改部门信息"
      :show="modifyDialogShow"
    ></dept-dialog>
  </div>
</template>
<script>
import { corpMixin } from '@/mixins/NavigationGuards';
import Node from '@/components/treeNode/TreeNode';
import DeptDialog from '@/components/Dialogs/addDept';

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
                name: '部门1.2',
                id: 10004,
                children: [
                  {
                    name: '部门1.2.1',
                    id: 10008,
                    children: [
                      {
                        name: '部门1.1',
                        id: 10009,
                        children: null,
                      }, {
                        name: '部门1.1',
                        id: 100010,
                        children: null,
                      },
                    ],
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
          {
            name: '部门3',
            id: 10010,
            children: [
              {
                name: '部门2.1',
                id: 10011,
                children: null,
              },
              {
                name: '部门2.2',
                id: 10012,
                children: null,
              },
              {
                name: '部门2.3',
                id: 10013,
                children: null,
              },
            ],
          },
        ],
      },
      addDialogShow: false,
      modifyDialogShow: false,
      modifyDialogData: {
        name: null,
        id: null,
      },

      newDept: {
        parentId: null,
        name: null,
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
    addDeptClicked(parent) {
      this.newDept.parentId = parent.id;
      this.addDialogShow = true;
    },
    modifyDeptClicked(node) {
      // eslint-disable-next-line no-irregular-whitespace
      this.modifyDialogData.name = node.name.replace(/　/g, '');
      this.modifyDialogData.id = node.id;
      this.modifyDialogShow = true;
    },
    deleteDeptClicked(node) {
      this.$confirm('确定要删除部门吗？', (res) => {
        if (res) {
          // TODO 删除部门逻辑，node里面有name和id
        }
      });
    },
    addDialog(obj) {
      this.newDept.name = obj.name;
      this.addDialogShow = false;
      // TODO 添加新部门接口逻辑，刷新树
    },
    modifyDialog(obj) {
      this.modifyDialogShow = false;
      // obj有name和id两个属性
      // TODO 修改部门逻辑
    },
  },
  mounted() {
    this.renderTree(this.tree, 0, 0);
  },
  components: {
    Node,
    DeptDialog,
  },
};
</script>
<style lang="less">
@import url(../../../../static/style/site.comm.less);
@import url(../../../../static/style/site.vars.less);

.deptMgn {
  .tree-container {
    margin-top: 50px;
  }
}
</style>
