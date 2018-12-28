<template>
      <table border="0" cellspacing="0" cellpadding="0" align="center" style="width: 100%;vertical-align: middle;background-color:#ffffff;">
        <tr>
          <td>
            <table class="table" cellspacing=0 bordercolordark=#ffffff cellpadding=5 bordercolorlight=#e3e3e3 style="margin: auto;width: 80%">
              <tbody>
              <tr>
                <td align='left' height="40" style="font-size: 16px;font-weight: 600" colspan="2" id="tblTitle" class="title">数学线上教材</td>
              </tr>
              <tr>
                <td align="left" class="txt1" width="10%"><font color="#006699">教材形式:</font></td>
                <td align="left" class="txt2">
                  <input type="radio" name="radio1" value="C" checked />线上教材
                  <input type="radio" name="radio1" value="P" />手写教材
                  <!--<input type="radio" name="radio1" value="SK">-->
                  <!--精进工坊 -->
                </td>
              </tr>
              <tr>
                <td align="left"><font color="#006699">章名查询:</font></td>
                <td align="left">
                  <input type="text" style="border: 1px solid darkgray;line-height: 30px;" id="txtSearch" :keyup="onSearch2(1)" />
                  <el-button type="primary" size="small" id="btnSearch" @click="onSearch2(0)">查询</el-button>
                </td>
              </tr>
              <tr>
                <td colspan="2" valign=top align=middle>
                  <table cellspacing=0 width="100%"
                         bordercolordark=#ffffff cellpadding=0 bordercolorlight=#e3e3e3 border=1 class="table">
                    <tbody>
                    <tr>
                      <td style="width: 35px;overflow: hidden" class="txt3">章列表:</td>
                      <td width="35%" class="txt3">单元列表:</td>
                      <td width="30%" class="txt3">章描述:&nbsp;<label id="lblChp"></label><label id="lblUnit"></label></td>
                    </tr>
                    <tr>
                      <td valign=top rowspan="7" style="width: 35px;">
                        <ul id="lstChp" style="width: 100%;height:600px;overflow: scroll;list-style: none;-webkit-padding-start: 0px;"></ul>
                      </td>
                      <td valign=top rowspan="7">
                        <ul id="lstUnit" style="width: 100%;height:600px;overflow: scroll;list-style: none;-webkit-padding-start: 0px;"></ul>
                      </td>
                      <td valign="top">
                        <textarea class="t" readonly id="txtChpDesc" style="width: 100%"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="txt3">单元描述:</td>
                    </tr>
                    <tr>
                      <td valign="top">
                        <textarea class="t" readonly id="txtUnitDesc" style="width: 100%"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="txt3">例题:</td>
                    </tr>
                    <tr>
                      <td>
                        <textarea valign="top" class="t" readonly id="txtSample" style="width: 100%">adfsd</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="txt3">&nbsp;</td>
                    </tr>
                    <tr>
                      <td valign=center align=center>
                        <div class="btn-group" role="group" aria-label="...">
                          <el-button type="primary" size="small" id="btnExercise" @click="handleClick">确 定</el-button>
                          <!--<button type="button" id="btnPreview" @click="onNewPreview('N')" class="btn btn-default">预览</button>-->
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
</template>
<script type="text/ecmascript-6">
  import {onSearch,
    onNewPreview,onlstUnit} from '../js/Newdefault'
  export default {
    data(){
      return {
      }
    },
    mounted(){
//      onSearch();
    },
    methods:{
      onSearch2(v){
        onSearch();
      },
      handleClick(){
        let url = onNewPreview('Y')
        if(!url){
          return this.$message({type:'warning',message:'添加失败！'})
        }
        this.$emit('selectClassHandle',url)
      }
    }
  }
</script>
