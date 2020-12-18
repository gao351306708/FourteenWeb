<template>
  <div class="sectionMain websitType">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="tableContent">
      <div class="addContent">
        <el-button @click="addHandle">新增</el-button>
      </div>
      <el-table :data="currentData" border style="width: 100%" height="550">
        <el-table-column fixed type="index" label="序列" width="50"></el-table-column>
        <el-table-column prop="name" label="类型名"></el-table-column>
        <el-table-column prop="modeltype" label="类型ID"></el-table-column>
        <el-table-column prop="sort" label="顺序"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
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
    </section>
    <!--弹框编辑-->
    <el-dialog :title="dialogTile" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序:" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-input v-model="form.modeltype" autocomplete="off" :disabled="dialogType == 'add' ? false : true"></el-input>
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
import { addWebsitMenu, removeWebsitMenu, updateWebsitMenu, queryAllMenuList } from "@/api/manage.js";
export default {
  name: "websitType",
  data() {
    return {
      tableData: [
        {
          name: "css",
          modeltype: "计算机"
        }
      ], //原始数据
      currentData: [], //当前显示的数据
      dialogFormVisible: false,
      dialogType: "",
      form: {
        name: "",
        modeltype: "",
        sort: ""
      },
      formLabelWidth: "120px",
      currentPage: 1,
      total: 10,
      pageSize: 10
    };
  },
  computed: {
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
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await queryAllMenuList();
      if (res.code == 200) {
        this.tableData = res.data;
        this.total = res.data.length;
        this.getPageData(res.data);
      }
    },
    //获取当前显示分页数据
    getPageData(data) {
      this.currentData = data.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    },
    //新增
    addHandle() {
      Object.assign(this, { dialogFormVisible: true, dialogType: "add" });
      this.resetForm();
    },
    Dialoghandle(value, formName) {
      if (value == "confirm") {
        let params = this.form;
        params.id = this.form._id;
        if (this.dialogType == "add") {
          addWebsitMenu(params)
            .then((res) => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
            })
            .finally(() => {
              this.getList();
            });
        } else {
          updateWebsitMenu(params)
            .then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
            })
            .finally(() => {
              this.getList();
            });
        }
      }
      Object.assign(this, { dialogFormVisible: false });
    },
    resetForm() {
      this.form = {
        name: "",
        status: "开启",
        dependence: ""
      };
    },
    //编辑 删除处理逻辑
    handleClick(item, key) {
      if (key == "edit") {
        this.resetForm(); //先重置之前的内容
        let formValue = Object.assign({}, item);
        Object.assign(this, {
          dialogFormVisible: true,
          dialogType: "edit",
          form: formValue
        });
      }
      if (key == "remove") {
        removeWebsitMenu({ id: item._id })
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
    //切换页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPageData(this.tableData);
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.websitType {
  .tableContent {
    margin-top: 20px;
    .addContent {
      margin: 10px 0;
    }
  }
  .paginationSection {
    margin: 15px;
  }
}
</style>
