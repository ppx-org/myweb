<template>
  <el-col :span="12">
    <el-menu
        ref="menu"
        :default-active="activeIndex"
             :uniqueOpened="true"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-submenu :key="d.id" :index="d.id + ''" v-for="(d) in menu">
        <template #title><span @click.stop="itemClick(d)" class="my_title" :id="'title_' + d.id"><i class="el-icon-menu"></i>{{d.title}}</span>
          <el-button @click.stop="addMenu(d)" style="float:right;margin-right:25px;margin-top:15px">新增菜单</el-button>
        </template>
        <el-submenu :key="m.id" :index="m.id + ''" v-for="(m) in d.sub" class="menu-title">
          <template #title><span @click.stop="itemClick(m)" class="my_title" :id="'title_' + m.id">{{m.title}}</span></template>
          <el-menu-item @click="itemClick(o)" :key="o.id" :index="o.id + ''" v-for="(o) in m.sub">
            <span class="my_title" :id="'title_' + o.id"><i class="el-icon-s-operation"></i>{{o.title}}</span>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-col>

  <div style="display: flex">
    <div style="width: 300px">
      <div>title</div>
      <div>
        <div>test.........1 <a class="el-icon-delete"></a></div>
        <div>test.........2 <a class="el-icon-delete"></a></div>
      </div>
    </div>
    <div style="">
      <div>
<!--        <el-select placeholder="模块">-->
<!--          <el-option>/test/</el-option>-->
<!--        </el-select>-->
      </div>
      <div>
        <div>test.........1 <a class="el-icon-delete"></a></div>
        <div>test.........2 <a class="el-icon-delete"></a></div>
      </div>
    </div>

  </div>

  <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="450px">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item label="菜单名称" prop="resName">
        <el-input v-model="addForm.resName" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="资源类型">
        <el-select v-model="addForm.resType" style="width: 300px;" disabled>
          <el-option v-for="(l,v) in dict.resType" :label="l" :value="v" :key="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单URI" prop="menuPath">
        <el-input v-model="addForm.menuPath" style="width: 300px;"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="addFormV = false">取 消</el-button>
              <el-button type="primary" @click="insert">确 定</el-button>
            </span>
    </template>
  </el-dialog>

</template>

<script>
const ctrl = "/security/res/"
import { ref } from 'vue'
export default {
  name: 'Menu',
  setup() {
    const addFormV = ref(false);
    return {
      addFormV
    }
  },
  data() {
    return {
      activeIndex: '1',
      menu:[],
      form: {
        resId: '',
        resName: '',
        resParentId: '',
        resType: '',
        menuPath: ''
      },
      addForm: {...this.form},
      rules: {
        resName: [
          {required: true, message: '必填'}
        ],
        menuPath: [
          {required: true, message: '必填'}
        ]
      },
      dict: {
        resType: {'d': '目录', 'm': '菜单', 'o': '操作'}
      }
    }
  },
  methods: {
    handleSelected(key) {
      let x = document.querySelectorAll(".my_title");
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("res-selected");
        x[i].classList.add("res-no-select");
      }
      document.getElementById("title_" + key).classList.remove("res-no-select");
      document.getElementById("title_" + key).classList.add("res-selected");
    },
    handleOpen(key) {
    },
    handleClose(key) {
    },
    itemClick(o) {
      this.handleSelected(o.id);
    },
    test() {
      alert(222);
    },
    addMenu(m) {
      this.addFormV = true;
      this.addForm.resType = "m";
      this.addForm.resParentId = m.id;
    },
    insert() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) return;
        this.axios.post(`${ctrl}insert`, this.addForm).then(() => {
          this.$refs.menu.open(this.addForm.resParentId);
          this.loadAllRes();
          this.addFormV = false;
        })
      })
    },
    loadAllRes() {
      let api = "/security/res/listAllRes";
      this.axios.get(api, {}).then((res) => {
        this.menu = res.data.content;
      })
    }
  },
  created: function() {
    this.loadAllRes();
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

.res-selected {
  color: rgb(255, 208, 75);
}
.res-no-select {
  color: white;
}


</style>
