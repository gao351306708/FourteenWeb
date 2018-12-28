<template>
  <div>
    <head-top></head-top>
    <div class="centerManage_section">
      <header>
        <el-row>
          <el-col :span="12" class="grid-content titleSetion"><h2>各中心的管理员列表</h2></el-col>
          <el-col :span="12" class="grid-content editSetion"><el-button type="primary" @click="addUser">新增用户</el-button></el-col>
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
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="centerId"
            sortable
            label="中心号">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="中心管理员名">
          </el-table-column>
          <el-table-column
            prop="permissionLevel"
            sortable
            label="权限">
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
          title="试题信息"
          :show-close="modalClickOther"
          :visible.sync="dialogVisible"
          :closeOnClickModal="modalClickOther"
          width="70%">
          <div class="questionStyle">
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
  import {getAllManagerList} from '../../api/manage'
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
        let result = await getAllManagerList();
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
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .centerManage_section {
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
      border: 1px solid gainsboro;
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
</style>
