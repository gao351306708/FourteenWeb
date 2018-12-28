<template>
  <div>
    <head-top></head-top>
    <el-row>
      <el-col :span="12">
        <div class="grid-content" style="height: 300px">
          <quill-editor v-model="editorContent"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption"
                        @ready="onEditorReady($event)">
          </quill-editor>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="height: 300px">
          <div class="editer" v-html="ContentValue"></div>
        </div>
      </el-col>
    </el-row>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import headTop from '../../components/headTop'
  import { quillEditor } from 'vue-quill-editor'
  // require styles 引入样式
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    data(){
      return {
        editorContent: '',
        ContentValue:'',
        editorOption: {
          modules:{
            toolbar:[
              [{ 'list': 'ordered'}],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              ['underline'],        // toggled buttons
              ['code-block','link','image']
            ]
          }
        }
      }
    },
    components: {
      headTop,
      quillEditor
    },
    mounted(){
      this.initStart();
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      initStart(){
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      submit(){
        console.log(this.editorContent);
        this.ContentValue = this.editorContent;
      },
      clickWindow(){
        window.open('https://youtube.com')
      }
    },
  }
</script>

<style scoped lang="less">
  @import '../../assets/mixin.less';
  .editer{
    height: 200px;
  }
  .submit_btn{
    text-align: center;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 24px;
    line-height: 24px;
  li{
    display: inline-block;
  }
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
