<template>
  <el-col :span="12">
    <el-menu :default-active="activeIndex"
             router
             :uniqueOpened="true"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-submenu :key="m.id" :index="dIndex + ''" v-for="(m, dIndex) in menu">
        <template #title><i class="el-icon-menu"></i><span>{{m.title}}</span>

          <el-button @click.stop="test" style="float:right;margin-right:25px;margin-top:15px">新增菜单</el-button>
        </template>
        <el-menu-item :key="s.id" :index="s.path" v-for="(s) in m.sub" class="menu-title">{{s.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activeIndex: '/index',
      menu:[]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    test() {
      alert(222)
    }
  },
  created: function() {
    let api = "/security/menu/list";
    this.axios.get(api, {}).then((res) => {
      this.menu = res.data.content;
    })
  }
}
</script>

<style scoped>
.el-col-12 {max-width:400px;width:400px}
.el-submenu .el-menu-item {min-width:auto}

.menu-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
