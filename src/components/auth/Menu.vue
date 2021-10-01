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
        <el-submenu :index="dIndex + ''" v-for="(m, dIndex) in menu">
          <template #title><i class="el-icon-menu"></i><span>{{m.title}}</span></template>
          <el-menu-item :index="s.path" v-for="(s, mIndex) in m.sub">{{s.title}}</el-menu-item>
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


  .test {
    width: 100%; /*根据自己项目进行定义宽度*/
    overflow: hidden; /*设置超出的部分进行影藏*/
    text-overflow: ellipsis; /*设置超出部分使用省略号*/
    white-space: nowrap; /*设置为单行*/
  }
</style>
