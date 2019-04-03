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
import api from '@/api/deptMgn';
export default {
  mixins: [corpMixin],
  name: 'DeptMgn',
  data() {
    return {
      layer: '',
      html: [],
      tree: {
        // name: '总部门',
        // id: 10000,
        // children: [
        //   {
        //     name: '部门1',
        //     id: 10001,
        //     children: [
        //       {
        //         name: '部门1.1',
        //         id: 10003,
        //         children: null,
        //       },
        //       {
        //         name: '部门1.2',
        //         id: 10004,
        //         children: [
        //           {
        //             name: '部门1.2.1',
        //             id: 10008,
        //             children: null,
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     name: '部门2',
        //     id: 10002,
        //     children: [
        //       {
        //         name: '部门2.1',
        //         id: 10005,
        //         children: null,
        //       },
        //       {
        //         name: '部门2.2',
        //         id: 10006,
        //         children: null,
        //       },
        //       {
        //         name: '部门2.3',
        //         id: 10007,
        //         children: null,
        //       },
        //     ],
        //   },
        // ],
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
    getDeptTree() {
      this.html = [];
      this.tree = {};
      this.layer = '';
      let params = new URLSearchParams();
      params.append("companyId",sessionStorage.getItem("companyId"));
      api.getDeptTreeApi(params).then((response) => {
        console.log(response.data.data);
        this.tree = response.data.data;
        console.log(this.tree);
        this.renderTree(this.tree, 0, 0);
        console.log(this.html);
      });
    },
    renderTree(obj, index, length) {
      this.html.push({
        name: this.layer + obj.name,
        id: obj.businessId,
      });
      if (obj.bdepts.length !== 0) {
        this.layer += '　　';
        obj.bdepts.forEach((e, i) => {
          this.renderTree(e, i, obj.bdepts.length);
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
          api.deleteApi(node.id).then((response) => {
            if(response.data.code === 200) {
              this.getDeptTree();
              this.$alert("删除成功")
            }else{{
              this.$alert(response.data.message)
            }}
          });
        }
      });
    },
    addDialog(obj) {
      this.newDept.name = obj.name;
      this.addDialogShow = false;
      let params = new URLSearchParams();
      params.append("companyId",sessionStorage.getItem("companyId"));
      params.append("parentId",this.newDept.parentId);
      params.append("name",this.newDept.name);
      api.addDeptApi(params).then((response) => {
        if(response.data.code === 200) {
          this.getDeptTree();
          this.$alert("添加成功")
        }
      });
    },
    modifyDialog(obj) {
      this.modifyDialogShow = false;
      // obj有name和id两个属性
      let params = new URLSearchParams();
      params.append("name",obj.name);
      api.updateApi(obj.id, params).then((response) => {
        if(response.data.code === 200) {
          this.getDeptTree();
          this.$alert("修改成功")
        }
      });
    },
  },
  mounted() {
    this.getDeptTree();
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
