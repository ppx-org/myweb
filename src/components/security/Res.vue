<template>
  <el-row style="margin-top:-15px;margin-bottom: 3px">
    <el-button @click="addDir()" style="float:right;margin-right:25px;margin-top:15px">新增目录</el-button>
  </el-row>
  <el-col :span="12">
    <el-menu ref="menu" :default-active="activeIndex"
             :uniqueOpened="true" background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b">
      <el-submenu :key="d.id" :index="d.id + ''" v-for="(d, dIndex) in menu">
        <template #title>
          <span @click.stop="itemClick(d)" class="my_title" :id="'title_' + d.id"><i class="el-icon-folder"></i>{{d.title}}</span>
          <el-button @click.stop="editDir(d, dIndex, menu.length)" style="float:right;margin-right:25px;margin-top:15px">修改</el-button>
          <el-button @click.stop="addMenu(d)" style="float:right;margin-right:15px;margin-top:15px">+菜单</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="delRes(d.id)" style="float:right;margin-top:18px">
            <template #reference><i class="el-icon-delete"></i></template>
          </el-popconfirm>
        </template>
        <el-submenu :key="m.id" :index="m.id + ''" v-for="(m, mIndex) in d.sub" class="menu-title">
          <template #title>
            <span @click.stop="itemClick(m)" class="my_title" :id="'title_' + m.id" ><i class="el-icon-menu"></i>{{m.title}}</span>
            <el-button @click.stop="editMenu(m, mIndex, d.sub.length)" style="float:right;margin-right:25px;margin-top:15px">修改</el-button>
            <el-button @click.stop="addOperate(m)" style="float:right;margin-right:15px;margin-top:15px">+操作</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="delRes(d.id)" style="float:right;margin-top:18px">
              <template #reference><i class="el-icon-delete"></i></template>
            </el-popconfirm>
          </template>
          <el-menu-item @click="itemClick(o)" :key="o.id" :index="o.id + ''" v-for="(o, oIndex) in m.sub">
            <template #title>
              <span class="my_title" :id="'title_' + o.id"><i class="el-icon-setting"></i>{{o.title}}</span>
              <el-button @click.stop="editOperate(o, oIndex, m.sub.length)" style="float:right;margin-top:10px">修改</el-button>
              <el-popconfirm title="确定删除吗？" @confirm="delRes(o.id)" style="float:right;margin-top:18px">
                <template #reference><i class="el-icon-delete"></i></template>
              </el-popconfirm>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-col>

  <div style="display: flex;" class="el-table--mini">
    <div style="width: 300px; margin-left:15px">
      <div>资源URI（选中:{{selectedTitle}}）</div>
      <div style="" v-if="resUriList.length == 0" class="el-table__empty-text">暂无数据</div>
      <div style="margin-top:18px">
        <div :key="'res' + v" v-for="(v) in resUriList" style="margin-top:12px">
          <el-popconfirm title="确定删除吗？" @confirm="resDelUri(v)">
            <template #reference><i class="el-icon-delete"></i></template>
          </el-popconfirm>
          {{v}}
        </div>
      </div>
    </div>
    <div>
      <div>
        <span>待选URI</span>
        <el-select v-model="queryModulePath" placeholder="模块" @change="queryUriByModuleName">
          <el-option value="/test/">/test/</el-option>
          <el-option value="/security/">/security/</el-option>
        </el-select>
      </div>
      <div>
        <div :key="'query' + v" v-for="(v) in queryUriList" style="margin-top:12px">
          <a @click="resAddUri(v)" class="el-icon-circle-plus"></a>{{v}}
        </div>
      </div>
    </div>
  </div>

  <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="450px">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item label="资源类型">
        <el-select v-model="addForm.resType" style="width: 300px;" disabled>
          <el-option v-for="(l,v) in dict.resType" :label="l" :value="v" :key="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源名称" prop="resName">
        <el-input v-model="addForm.resName" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item v-if="menuPathV" label="菜单URI" prop="menuPath">
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

  <el-dialog title="修改" v-model="editFormV" :close-on-click-modal="false" width="450px">
    <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
      <el-form-item label="资源类型">
        <el-select v-model="editForm.resType" style="width: 300px;" disabled>
          <el-option v-for="(l,v) in dict.resType" :label="l" :value="v" :key="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源名称" prop="resName">
        <el-input v-model="editForm.resName" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item v-if="editMenuPathV" label="菜单URI" prop="menuPath">
        <el-input v-model="editForm.menuPath" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="资源排序" prop="resName">
        <el-select v-model="editForm.resSort" style="width: 300px;">
          <el-option v-for="(l) in tmpResSort" :label="l" :value="l" :key="l"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editFormV = false">取 消</el-button>
        <el-button type="primary" @click="editRes">确 定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
const ctrl = "/security/res/"
import { ref, reactive } from 'vue'
export default {
  name: 'Menu',
  setup() {
    let selectedResId = -1;
    let selectedTitle = "无";
    const addFormV = ref(false);
    const editFormV = ref(false);
    const menuPathV = ref(false);
    const editMenuPathV = ref(false);
    const queryModulePath = ref("");
    const resUriList = reactive([]);
    const queryUriList = reactive([]);

    const tmpResSort = reactive([]);
    return {
      selectedResId, selectedTitle,
      addFormV, menuPathV, editFormV, editMenuPathV,
      queryModulePath, resUriList, queryUriList,
      tmpResSort,
    }
  },
  data() {
    return {
      activeIndex: '',
      menu:[],
      form: {
        resId: '',
        resName: '',
        resParentId: '',
        resType: '',
        resSort: '',
        resSortOld: '',
        menuPath: ''
      },
      addForm: {...this.form},
      editForm: {...this.form},
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
    handleSelected(o) {
      let key = o.id;
      let x = document.querySelectorAll(".my_title");
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("res-selected");
        x[i].classList.add("res-no-select");
      }
      document.getElementById("title_" + key).classList.remove("res-no-select");
      document.getElementById("title_" + key).classList.add("res-selected");

      const title = document.getElementById("title_" + key).innerText;

      if (o.t == "d") {
        this.selectedTitle = "目录-" + title;
      }
      else if (o.t == "m") {
        this.selectedTitle = "菜单-" + title;
      }
      else if (o.t == "o") {
        this.selectedTitle = "操作-" + title;
      }
      
      this.selectedResId = key;
      this.listResUriPath(key);
    },
    itemClick(o) {
      this.handleSelected(o);
    },
    addDir() {
      this.menuPathV = false;
      this.addFormV = true;
      this.addForm.resType = "d";
      this.addForm.resParentId = 0;
    },
    addMenu(d) {
      this.menuPathV = true;
      this.addFormV = true;
      this.addForm.resType = "m";
      this.addForm.resParentId = d.id;
    },
    addOperate(m) {
      this.menuPathV = false;
      this.addFormV = true;
      this.addForm.resType = "o";
      this.addForm.resParentId = m.id;
    },
    insert() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) return;
        this.axios.post(`${ctrl}insert`, this.addForm).then(() => {
          this.activeIndex = -1;
          this.loadAllRes();
          if (this.addForm.resParentId) {
            this.$nextTick(() => {
              this.$refs.menu.open(this.addForm.resParentId);
            });
          }
          this.addFormV = false;
        })
      })
    },
    editDir(d, dIndex, dSize) {
      this.tmpResSort = [];
      for (let i = 1; i <= dSize; i++) {
        this.tmpResSort.push(i);
      }
      this.editForm.resSort = dIndex + 1;
      this.editForm.resSortOld = dIndex + 1;
      this.editForm.resParentId = d.pid;

      this.editMenuPathV = false;
      this.editFormV = true;
      this.editForm.resType = d.t;
      this.editForm.resId = d.id;
      this.editForm.resName = d.title;
    },
    editMenu(m, mIndex, mSize) {
      this.tmpResSort = [];
      for (let i = 1; i <= mSize; i++) {
        this.tmpResSort.push(i);
      }
      this.editForm.resSort = mIndex + 1;
      this.editForm.resSortOld = mIndex + 1;
      this.editForm.resParentId = m.pid;

      this.editMenuPathV = true;
      this.editFormV = true;
      this.editForm.resType = m.t;
      this.editForm.resId = m.id;
      this.editForm.resName = m.title;
    },
    editOperate(o, oIndex, oSize) {
      this.tmpResSort = [];
      for (let i = 1; i <= oSize; i++) {
        this.tmpResSort.push(i);
      }
      this.editForm.resSort = oIndex + 1;
      this.editForm.resSortOld = oIndex + 1;
      this.editForm.resParentId = o.pid;

      this.editMenuPathV = false;
      this.editFormV = true;
      this.editForm.resType = o.t;
      this.editForm.resId = o.id;
      this.editForm.resName = o.title;
    },
    editRes() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) return;
        this.axios.post(`${ctrl}update`, this.editForm).then(() => {
          this.loadAllRes();
          this.editFormV = false;
        })
      })
    },
    delRes(id) {
      this.axios.post(`${ctrl}delResAndChildren`, {id:id}).then(() => {
        this.loadAllRes();
      })
    },
    loadAllRes() {
      let api = "/security/res/listAllRes";
      this.axios.get(api, {}).then((res) => {
        this.menu = res.data.content;
      })
    },
    queryUriByModuleName() {
      const params = {modulePath:this.queryModulePath};
      this.axios.get(`${ctrl}listSystemUri`, {params}).then((res) => {
        this.queryUriList = res.data.content;
        this.$forceUpdate();
      })
    },
    listResUriPath(resId) {
      const params = {resId:resId};
      this.axios.get(`${ctrl}listResUriPath`, {params}).then((res) => {
        this.resUriList = res.data.content;
        this.$forceUpdate();
      })
    },
    resAddUri(uriPath) {
      for (let i = 0; i < this.resUriList.length; i++) {
        if (this.resUriList[i] === uriPath) {
          this.$message.warning("URI已经存在");
          return;
        }
      }
      this.axios.post(`${ctrl}resAddUri`, {resId:this.selectedResId, uriPath:uriPath}).then((res) => {
        this.resUriList = res.data.content;
        this.$forceUpdate();
      })
    },
    resDelUri(uriPath) {
      this.axios.post(`${ctrl}resDelUri`, {resId:this.selectedResId, uriPath:uriPath}).then((res) => {
        this.resUriList = res.data.content;
        this.$forceUpdate();
      })
    },
  },
  created: function() {
    this.loadAllRes();
  }
}
</script>

<style scoped>
.el-col-12 {max-width:450px;width:450px}
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

.el-icon-circle-plus, .el-icon-delete {
  cursor: pointer;
  padding-right: 5px;
}

.el-icon-delete {
  color:red;
}

</style>
