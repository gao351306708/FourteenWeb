<template>
  <div>
    <head-top></head-top>
    <div class="teacherManage_section">
      <header>
        <el-row>
          <el-col :span="12" class="grid-content titleSetion"><h2>班级列表</h2></el-col>
          <el-col :span="12" class="grid-content editSetion"><el-button type="primary" @click="addUser">新增班级</el-button></el-col>
        </el-row>
      </header>
      <section class="section_table">
        <el-table
          ref="multipleTable"
          :data="currentData"
          border
          height="450"
          :header-row-style="headerStyle"
          :highlight-current-row="true"
          :cell-style="cellStyle"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="expand" label="详情" width="60">
            <template slot-scope="props">
              <el-row>
                <span>中心：{{props.row.centerId}}</span>
              </el-row>
              <el-form label-position="left" inline class="demo-table-expand" v-for=" (item,index) in props.row.otherInfo">
                <el-form-item>
                  <span>{{"科目" + (index+1) + "："}}</span><span>{{item.subjectId=='0' ? '数学':'英语'}}</span>
                </el-form-item>
                <el-form-item label="老师:">
                  <span>{{item.teacherName}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="classId"
            sortable
            label="班级编号">
          </el-table-column>
          <el-table-column
            prop="className"
            sortable
            label="班级名">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="年级">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="12">
            <div style="text-align: left">
              <el-button @click="deleteSelection()">删除选中的项</el-button>
              <el-button @click="cancelSelection()">取消选择</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              @current-change=this.PageChange
              :total="allData.length">
            </el-pagination>
          </el-col>
        </el-row>
        <el-dialog
          title="列表信息"
          :show-close="modalClickOther"
          :visible.sync="dialogVisible"
          :closeOnClickModal="modalClickOther"
          width="70%">
          <div class="questionStyle">
            <el-form label-position="right" label-width="80px"
                     :inline="true"
                     class="demo-form-inline">
              <el-form-item label="班级编号:">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="班级名:">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item label="年级:">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-form-item label="科目:">
                <el-input v-model="formLabelAlign.subject"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="MakeSureHandle()">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import headTop from '../../components/headTop'
  import {getStore} from '../../config/publicMethod'
  import {getAllManagerList,getAllClassesOfCenter} from '../../api/manage'
  export default{
    data(){
      return{
        cellStyle:{
          textAlign:'center'
        },
        headerStyle:{
          backgroundColor:'rgb(117, 203, 214)',
          color: '#4f504b'
        },
        pageSize:10,
        allData:[],//所有的数据
        currentData:[],//当前页面展示的条数
        multipleSelection: [],
        dialogVisible:false,
        modalClickOther:false,
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
          subject:''
        }
      }
    },
    components:{
      headTop
    },
    computed: {
    },
    mounted(){
      //进入首页的时候查询
      this.getAllUserList();
    },
    methods:{
      async getAllUserList(){
        let userInfo = JSON.parse(getStore('manageUser'));
        let result = await getAllClassesOfCenter({centerId:'002'});
        this.allData = result.data;
        this.currentData = this.allData.slice(0,this.pageSize);
        console.log("所有的中心列表",result,this.allData)
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row);
        alert("删除用户")
      },
      PageChange(page){
        console.log("PageChange",page)
        let num = this.pageSize;
        this.currentData = this.allData.slice( (page-1)*num,(page-1)*num+num)
      },
      MakeSureHandle(){
      },
      addUser(){
        alert("添加用户")
      },
      deleteSelection() {
        console.log("选择的行：：---》》》",this.$refs.multipleTable.selection);
      },
      cancelSelection(rows) {
        this.$refs.multipleTable.clearSelection();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .teacherManage_section {
    position: relative;
    padding: 20px;
    overflow: auto;
  .section_table{
    border: 1px solid gainsboro;
    padding: 10px;
  }
  .titleSetion{
    padding: 20px;
    text-align: left;
  }
  .editSetion{
    padding: 20px;
    text-align: right;
  }
  .questionStyle{
    padding: 10px;
  }
  }
  .el-row {
    font-size: 14px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
    padding: 5px 0;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 32px;
    line-height: 32px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    min-width: 200px;
  }
  .demo-table-expand .el-form-item label {
    width: 90px;
    color: #99a9bf;
  }
</style>
