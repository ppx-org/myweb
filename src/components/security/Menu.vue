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
          <template #title><i class="el-icon-folder"></i><span>{{m.title}}</span></template>
          <el-menu-item :key="s.id" :index="s.path" v-for="(s) in m.sub" class="menu-title" style="margin-left:-10px"><i class="el-icon-menu"></i>{{s.title}}</el-menu-item>
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
  .el-col-12 {max-width:200px;width:200px}
  .el-submenu .el-menu-item {min-width:auto}

  .menu-title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
