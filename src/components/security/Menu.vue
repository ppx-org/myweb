<template>
  <el-col :span="12">
    <el-menu ref="Menu" :default-active="defaultActive" :default-openeds="defaultOpen"
        router :uniqueOpened="true"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-sub-menu :key="d.id" :index="dIndex + ''" v-for="(d, dIndex) in menu" col>
        <template #title>
          <i class="el-icon-folder"></i><span>{{ d.title }}</span>
        </template>
        <el-menu-item :id="'menu' + m.path" :key="m.id" :index="m.path" v-for="(m) in d.sub" class="menu-title" @click="menuClick(m)">
          <i class="el-icon-menu"></i><span>{{ m.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: '',
      defaultOpen: [],
      menu: []
    }
  },
  methods: {
    menuClick(m) {
      document.getElementById("menu" + m.path).classList.add("is-active");
      this.$emit('setTitle', m.title);
    },
    setDefaultActive() {
      document.querySelectorAll(".el-menu-item").forEach(e => {
        e.classList.remove("is-active");
      });
      this.$emit('setTitle', '首页');
    },
  },
  mounted: function () {
    this.commonAxios.get("/security/home/listMenu", {}).then((res) => {
      this.menu = res.data.content;
      this.$nextTick(function() {
        if (this.$route.path === "/Index") {
          this.$refs.Menu.open('0')
        }
        else {
          this.defaultActive = this.$route.path;
          let title = '';
          let menuPathObj = document.getElementById("menu" + this.$route.path);
          if (menuPathObj) {
            title = menuPathObj.innerText;
          }
          this.$emit('setTitle', title);
        }
      })
    })

  }
}
</script>

<style scoped>
.el-col-12 {
  max-width: 200px;
  width: 200px
}

.el-sub-menu .el-menu-item {
  min-width: auto
}

.menu-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
