<template>
  <div class="websitList sectionMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="tableContent">
      <div class="topSection">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="formInline.title" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="所属类别">
            <el-select v-model="formInline.modeltype" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.modeltype"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch('reset')">重置</el-button>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="addContent">
        <el-button @click="addHandle">新增</el-button>
      </div>
      <div class="middleSection">
        <el-table :data="currentData" border height="550" class="tablecss">
          <el-table-column fixed type="index" label="序列" width="50"></el-table-column>
          <el-table-column prop="title" label="名称" width="150"></el-table-column>
          <el-table-column label="logo" width="80">
            <template slot-scope="scope">
              <el-image :src="scope.row.logo"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="introduce" label="简介"></el-table-column>
          <el-table-column prop="url" label="跳转链接" width="250"></el-table-column>
          <el-table-column prop="modeltype" label="所属类别" width="100">
            <template slot-scope="scope">
              <div>{{ newOptions[scope.row.modeltype] }}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row, 'edit')" type="text" size="small">编辑</el-button>
              <el-popover placement="top" width="160" trigger="click">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini" @click="handleClick(scope.row, 'remove')">确定</el-button>
                </div>
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationSection">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </section>
    <!--弹框编辑-->
    <el-dialog :title="dialogTile" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="65%" top="10vh">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="所属类别" :label-width="formLabelWidth">
          <el-select v-model="form.modeltype" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.modeltype"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="logo" :label-width="formLabelWidth">
          <el-input v-model="form.logo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.introduce" placeholder="请输入基本简介"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Dialoghandle('cancel', 'form')">取 消</el-button>
        <el-button type="primary" @click="Dialoghandle('confirm', 'form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { addWebsit, removeWebsit, updateWebsit, queryAllWebsitList, queryAllMenuList, queryAllMenuWithWebsitList } from "@/api/manage.js";
import asyncComponent from "@/utils/asyncComponent.js";
asyncComponent.useComponentMoment; //异步调用moment
export default {
  name: "websitList",
  data() {
    return {
      formInline: {
        title: "",
        modeltype: ""
      },
      tableData: [], //table数据
      currentData: [], //当前显示的数据
      options: [], //所属类型集合
      newOptions: {},
      dialogFormVisible: false,
      dialogType: "add", //弹框类型 新增、编辑
      form: {
        title: "",
        logo: "",
        introduce: "",
        url: "",
        modeltype: ""
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        logo: [{ required: true, message: "请输入logo", trigger: "blur" }],
        introduce: [{ required: true, message: "请输入简介", trigger: "blur" }],
        url: [{ required: true, message: "请输入跳转地址", trigger: "blur" }],
        modeltype: [{ required: true, message: "请输入所属类别", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      currentPage: 1,
      total: 10,
      pageSize: 10
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    dialogTile() {
      switch (this.dialogType) {
        case "add":
          return "新增";
        case "edit":
          return "编辑";
        default:
          return "新增";
      }
    }
  },
  watch: {
    options(val) {
      let map = {};
      for (let i in val) {
        this.$set(this.newOptions, val[i].modeltype, val[i].name);
      }
    }
  },
  created() {
    this.getAllMenuList();
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取所属类别
    getAllMenuList() {
      queryAllMenuList().then((res) => {
        if (res.code == 200) {
          this.options = res.data;
        }
      });
    },
    async getList() {
      const { title, modeltype } = this.formInline;
      let params = {
        key: title,
        modeltype
      };
      let res = await queryAllWebsitList(params);
      if (res.code == 200) {
        this.tableData = res.data;
        this.total = res.data.length;
        this.getPageData(res.data);
      }
    },
    handleClick(item, key) {
      if (key == "edit") {
        this.resetForm(); //先重置之前的内容
        Object.assign(this, {
          dialogFormVisible: true,
          dialogType: "edit",
          formValue: item
        });
      }
      if (key == "remove") {
        removeWebsit({ id: item._id })
          .then((res) => {
            this.$message({
              message: key + "删除成功",
              type: "success"
            });
          })
          .catch((err) => {
            this.$message({
              message: key + "删除失败",
              type: "error"
            });
          })
          .finally(() => {
            this.getList();
          });
      }
    },
    //编辑框确定按钮
    Dialoghandle(value, formName) {
      let _this = this;
      if (value == "confirm") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = _this.form;
            params.links = params.textarea && params.textarea.split(",");
            params.id = _this.form._id;
            console.log(params);
            if (_this.dialogType == "add") {
              //添加文章
              addWebsit(params).then((res) => {
                _this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.getList();
              });
            } else if (_this.dialogType == "edit") {
              //编辑文章
              updateWebsit(params).then((res) => {
                _this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs[formName].resetFields();
      }
      Object.assign(this, { dialogFormVisible: false });
    },
    //新增
    addHandle() {
      Object.assign(this, { dialogFormVisible: true, dialogType: "add" });
      this.resetForm();
    },
    //重置表单
    resetForm() {
      (this.form = {
        title: "",
        logo: "",
        introduce: "",
        url: "",
        modeltype: ""
      }),
        this.$refs["form"] && this.$refs["form"].resetFields();
    },
    onSearch(val) {
      console.log("submit!", this.formInline);
      if (val == "reset") {
        Object.assign(this, { formInline: { title: "", modeltype: "" } });
      }
      this.getList();
    },
    //获取当前显示分页数据
    getPageData(data) {
      this.currentData = data.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    },
    //切换页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPageData(this.tableData);
    },
    switchName(val) {
      if (this.options.length > 0) {
        for (ii in this.options.length) {
          if (this.options[ii].modeltype == val) {
            return this.options[ii].name;
          }
        }
      }
      return val;
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.websitList {
  .tableContent {
    margin-top: 20px;
    .topSection {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
    }
  }
  .addContent {
    margin: 10px 0;
  }
  .paginationSection {
    margin: 15px;
  }
  .tablecss {
    width: 100%;
    text-align: center;
  }
  /deep/.el-table img {
    width: 40px;
  }
}
</style>
