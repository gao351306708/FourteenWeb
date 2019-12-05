<template>
  <div class="upload-section">
    <div class='section_container'>
      <el-upload class="upload-demo" ref="upload" :file-list="fileList" action="/api/file/upload" :on-change="handleFileChange"
        :on-remove="handleFileRemove" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传***.xlsx格式文件</div>
      </el-upload>
      <div class="formSection">
        <div class="demoinput">
          <label>输入文件路径:</label>
          <el-input v-model="filename"></el-input>
          <span style="font-size: 0.875rem;color: #e6a23c;">此路径第一次上传文件文件之后会返回到此处，可以保存到本地，下次查询可以直接输入之前保存的值</span>
          <div><el-button type="primary" @click="getAllData">获取文件数据</el-button></div>
        </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
          <el-form-item label="查询类型" prop="type">
            <el-select v-model="formLabelAlign.type" placeholder="请选择类型">
              <el-option v-for="(item,index) in data" :label="item.type" :value="index" :key='index'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询数目" prop="number">
            <el-input v-model="formLabelAlign.number"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="getFileData('ruleForm')">查询</el-button>
        <div class="queryReslut">
          <div style="text-align: left;"><span>查询结果：</span>{{this.formLabelAlign.type}}</div>
          <div>
            <li class="reslut" v-for="item in endList" :key="item.id">{{item.value}}</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {uploadFile,loadFileData} from '@/api/upload.js'
  export default {
    //data中放入初始默认值
    data() {
      return {
        fileList:[],
        labelPosition: 'right',
        data:[],
        endList:[],
        filename:'',
        queryName:'',
        formLabelAlign: {
          number: 5,
          type: '',
        },
        rules: {
          number: [
            { required: true, message: '请输入查询个数', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择查询类型', trigger: 'change' }
          ],
        }
      }
    },
    mounted(){
      this.filename = localStorage.getItem('filename');
    },
    methods:{
      getAllData(){
        loadFileData({filename:this.filename}).then((responsedata)=>{
          console.log(responsedata)
          if(responsedata.code === 200){
            this.data = responsedata.data
          }
        });
      },
      getFileData(formName){
        if(this.data.length==0){
          return this.$message({message: '请先查询文件数据',type:'error'});
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data1 = this.data[this.formLabelAlign.type];
            this.queryName = data1.type;
            this.endList = this.getRandomArrayElements(data1.list, this.formLabelAlign.number);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getRandomArrayElements(arr, count) {
          var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
          if(min<=0){
            return arr;
          }
          while (i-- > min) {
              index = Math.floor((i + 1) * Math.random());
              temp = shuffled[index];
              shuffled[index] = shuffled[i];
              shuffled[i] = temp;
          }
          return shuffled.slice(min);
      },
      submitUpload() {
         const data = new FormData();
         data.append("files", this.$refs.upload.uploadFiles);
         data.append("type", 'vocabulay');
         this.$refs.upload.submit(); //上传文件 "/api/file/upload"
      },
      handleFileChange(file, fileList){
        this.fileList = [file]
      },
      beforeUpload(file){
        //在这里可以做文件上传之前的操作
        console.log("文件上传之前：：：：",file);
        let index = file.name.lastIndexOf('.')
        let type = file.name.slice(index+1);
        if(type !== 'xlsx'){
          this.$message({message: '请上传正确.xlsx格式文件！',type:'error'});
          return false
        }
      },
      //文件上传成功
      uploadSuccess(response, file, fileList){
        console.log("上传成功：：：：",response,file);
        this.filename = response.file;
        localStorage.setItem('filename',response.file);
        this.$message({message: '上传成功！',type:'success'});
      },
      //文件上传失败处理
      uploadError(err, file, fileList){
        console.log("上传失败：：：：",err,file,fileList);
        this.$message({message: '上传成功！',type:'error'});
      },
      //删除选择的上传文件
      handleFileRemove(file){
        let filterNowList = this.fileList;
        for(let ii in filterNowList){
          if(filterNowList[ii].uid == file.uid){
            filterNowList.splice(ii,1)
            break;
          }
        }
        console.log("删除的文件：：：：",file, this.fileList);
      },
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../../assets/mixin.less';
  .upload-section{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y:auto ;
  }
  .section_container{
    position: absolute;
    top: 50px;
    bottom: 40px;
    left: 50px;
    right: 50px;
  }
  .formSection{
    padding:1rem 0.625rem;
  }
  .demoinput{
    padding: 0.9375rem 0;
  }
  .queryReslut{
    padding: 10px 0;
    .reslut{
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
</style>
