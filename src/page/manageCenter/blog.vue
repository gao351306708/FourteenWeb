<template>
  <div class="blog sectionMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="tableContent">
      <div class="topSection">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="formInline.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="formInline.datetime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
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
        <el-table :data="currentData" border style="width: 100%" height="550">
          <el-table-column fixed type="index" label="序列" width="50"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column label="标签类别" width="300">
            <template slot-scope="scope">
              <el-tag v-for="tag in scope.row.tag" :key="tag">{{ tag }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="150">
            <template slot-scope="scope">
              <div>{{ scope.row.createTime | YYMMDDhhmmss }}</div>
            </template>
          </el-table-column>
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
      </div>
    </section>
    <!--弹框编辑-->
    <el-dialog :title="dialogTile" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="65%" top="10vh">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.tag" @change="handleCheckedCitiesChange">
            <template v-for="tagItem in tagOptions">
              <el-checkbox v-if="tagItem.status == '开启'" :label="tagItem.name" :key="tagItem.name">{{ tagItem.name }}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
        </el-form-item>
        <el-form-item label="相关链接" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入相关链接" v-model="form.textarea"></el-input>
          <div style="height: 20px; color: red">***多条链接请用英文逗号,隔开***</div>
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
import { addBlog, deleteBlog, updateBlog, queryBlogList, queryBlogDetail, queryBlogTypeList } from "@/api/manage.js";
import asyncComponent from "@/utils/asyncComponent.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
asyncComponent.useComponentEditor; //异步调用quillEditor
asyncComponent.useComponentMoment; //异步调用moment
export default {
  name: "blog",
  data() {
    return {
      formInline: {
        title: "",
        datetime: []
      },
      tableData: [], //table数据
      currentData: [], //当前显示的数据
      tagOptions: [], //类型集合
      dialogFormVisible: false,
      dialogType: "add", //弹框类型 新增、编辑
      form: {
        title: "",
        content: "",
        tag: [],
        textarea: ""
      },
      rules: {
        title: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      content: "", //富文本
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ indent: "-1" }, { indent: "+1" }], //缩进
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["link", "image"],
            ["clean"]
          ]
        }
      },
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
  filters: {
    YYMMDDhhmmss(val) {
      let time = Number(val);
      return moment(time).format("YYYY-MM-DD HH:mm");
    }
  },
  created() {
    queryBlogTypeList().then((res) => {
      if (res.code == 200) {
        this.tagOptions = res.data;
      }
    });
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const { title, datetime } = this.formInline;
      let params = {
        key: title,
        startTime: datetime[0] ? new Date(datetime[0]) : "",
        endTime: datetime[0] ? new Date(datetime[1]) : ""
      };
      let res = await queryBlogList(params);
      if (res.code == 200) {
        this.tableData = res.data;
        this.total = res.data.length;
        this.getPageData(res.data);
      }
    },
    getBlogDetail(item) {
      const { _id } = item;
      let formValue = Object.assign({}, item);
      formValue.textarea = item.links ? item.links.join(",") : ""; //编辑的时候回显编辑的内容
      //查询文章详情
      queryBlogDetail({ id: _id }).then((res) => {
        if (res.code == 200) {
          console.log("detailItem   --->", res.data);
          formValue.content = res.data[0].content; //文章内容
          Object.assign(this, {
            form: formValue
          });
        }
      });
    },
    handleClick(item, key) {
      if (key == "edit") {
        this.resetForm(); //先重置之前的内容
        this.getBlogDetail(item); //查询详情
        Object.assign(this, {
          dialogFormVisible: true,
          dialogType: "edit"
        });
      }
      if (key == "remove") {
        deleteBlog({ id: item._id })
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
              addBlog(params).then((res) => {
                _this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.getList();
              });
            } else if (_this.dialogType == "edit") {
              //编辑文章
              updateBlog(params).then((res) => {
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
        content: "",
        tag: [],
        textarea: ""
      }),
        this.$refs["form"] && this.$refs["form"].resetFields();
    },
    onSearch(val) {
      console.log("submit!", this.formInline);
      if (val == "reset") {
        Object.assign(this, { formInline: { title: "", datetime: [] } });
      }
      this.getList();
    },
    //编辑文本
    onEditorChange(value) {},
    //先择的标签tags
    handleCheckedCitiesChange(value) {
      console.log("标签tags-->", value);
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
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.blog {
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
}
</style>
