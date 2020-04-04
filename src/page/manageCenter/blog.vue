<template>
  <div class="blog sectionMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="tableContent">
      <div class="topSection">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="formInline.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="formInline.date1"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="状态">
              <el-option label="显示" value="1"></el-option>
              <el-option label="隐藏" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="middleSection">
       <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="550"
        >
        <el-table-column
          fixed
          type="index"
          label="序列"
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,'edit')" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row,'remove')" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </section>
    <!--弹框编辑-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择活动区域">
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"blog",
    data(){
      return{
        message:"blog",
        formInline: {
          title: '',
          data1: '',
          data2: '',
          status: ''
        },
        tableData:[{
          date: '2016-05-02',
          title: '王小虎',
          type: '上海',
          status: '普陀区',
        }, {
          date: '2016-05-04',
          title: '王小虎',
          type: '上海',
          status: '普陀区',
        }, {
          date: '2016-05-01',
          title: '王小虎',
          type: '上海',
          status: '普陀区',
        }, {
          date: '2016-05-03',
          title: '王小虎',
          type: '上海',
          status: '普陀区',
        }],
        dialogFormVisible: false,
        form: {
          title: '',
          status: '',
        },
        formLabelWidth: '120px'
      }
    },
    methods:{
      handleClick(item,key){
        if(key == 'edit'){
          Object.assign(this,{dialogFormVisible:true});
        }
        if(key == 'remove'){
          this.$message({
            message: key + '成功',
            type: 'success'
          });
        }
      },
      onSearch() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
.blog{
  .tableContent{
    margin-top: 20px;
    .topSection{
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
    }
  }
}
</style>
