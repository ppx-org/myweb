<template>
  <el-tree ref="resTree"
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[0]"
      :default-checked-keys="checkedKeys"
      :props="defaultProps"
  />

  <el-button @click="test"></el-button>
</template>

<script>
export default {
  data() {
    return {
      checkedKeys: [],
      data: [
        {
          id: 0,
          title: '资源',
          sub: [
            {id: 4,title: '目录01',
              sub: [ { id: 9, title: 'Level three 1-1-1', }, { id: 10, title: 'Level three 1-1-2',},],
            },
            {id: 4,title: '目录02',
              sub: [ { id: 11, title: 'Level three 1-1-1', }, { id: 12, title: 'Level three 1-1-2',},],
            },
          ],
        },
      ],
      defaultProps: {children: 'sub', label: 'title'},
    }
  },
  methods: {
    test() {
      this.checkedKeys = [0,4,9,10,4,11,12];
      // setCheckedNodes
      // let nodes = this.$refs.resTree.getCheckedNodes(false, true);
      // let id = [];
      // for (let i = 0; i < nodes.length; i++) {
      //   id.push(nodes[i].id);
      // }
      // alert(id);
    }
  }
}
</script>
