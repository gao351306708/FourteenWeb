/**大杂烩，喜欢的各种类型都放这里**/
<template>
  <div class="allmost">
    <el-row class="section_container">
      <el-col :span="18" :xs="24" class="main">
        <div class="part" v-for="(itm, idx) in menuList" :key="idx" :id="itm.id">
          <div class="title">
            <span>{{ itm.name }}</span>
            <div v-if="idx == 0" class="editContent">
              <span v-if="editStatus" @click="addWebsit">添加网站</span>
              <span v-if="editStatus" @click="clearWebsit('clear')">全部清除</span>
              <span @click="editStatus = !editStatus"><i class="el-icon-setting"></i>{{ editStatus ? "退出编辑" : "编辑自定义网站" }}</span>
            </div>
          </div>
          <div class="contnet">
            <template v-if="itm.items">
              <div class="itempart" v-for="(ite, ix) in itm.items" :key="ix">
                <div class="item" @click="clickWebsitHandle(ite)">
                  <div class="headerImg"><img :src="filterLogo(ite.logo)" /></div>
                  <div class="header">
                    <div class="headerTitle">{{ ite.title }}</div>
                    <div class="introduce">{{ ite.introduce }}</div>
                  </div>
                </div>
                <div v-if="idx == 0 && editStatus" class="delete" @click.prevent="clearWebsit(ix)"><i class="el-icon-circle-close"></i></div>
              </div>
            </template>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="0">
        <div class="menu">
          <div v-for="(part, index) in menuList" :key="index" :class="{ item: true, active: index == currentItem }" @click="changeMenu(part, index)">
            {{ part.name }}
          </div>
        </div>
      </el-col>
    </el-row>
    <!--弹框编辑-->
    <el-dialog title="添加网站" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="65%">
      <el-form :model="form" ref="form" :rules="rules">
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
    <div class="Footer">
      <FooterBottom></FooterBottom>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterBottom from "@/components/footerBottom.vue";
import websit from "@/data/websit";
import { queryAllMenuWithWebsitList } from "@/api/manage.js";
import { setStore, getStore, clearStore, removeStore } from "@/utils/publicMethod";
export default {
  //data中放入初始默认值
  name: "allmost",
  components: {
    FooterBottom
  },
  data() {
    return {
      menuList: [
        {
          id: 1,
          name: "自定义",
          items: getStore("customItem") || []
        }
      ],
      moudleList: [],
      currentItem: 0,
      editStatus: false, //编辑按钮
      dialogFormVisible: false,
      form: {
        title: "",
        logo: "",
        introduce: "",
        url: ""
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入跳转地址", trigger: "blur" }]
      }
    };
  },
  created() {
    let _this = this;
    this.menuList = this.menuList.concat(websit.websitList);
    queryAllMenuWithWebsitList().then((res) => {
      if (res.code == 200) {
        let data = res.data;
        for (let i in data) {
          data[i].id = data[i]["_id"];
        }
        _this.menuList = [_this.menuList[0]].concat(data);
      }
    });
  },
  methods: {
    changeMenu(item, val) {
      this.currentItem = val;
      //定位锚点
      document.getElementById(item.id) && document.getElementById(item.id).scrollIntoView(true);
    },
    filterLogo(val) {
      return val ? val : require("@/assets/img/web/website.png");
    },
    clickWebsitHandle(item) {
      window.open(item.url);
    },
    addWebsit() {
      Object.assign(this, { dialogFormVisible: true });
    },
    clearWebsit(val) {
      if (val != "clear") {
        let newList = [];
        let customItem = getStore("customItem");
        if (customItem) {
          customItem.splice(val, 1);
          newList = customItem;
        } else {
          newList = [];
        }
        setStore("customItem", newList);
        this.menuList[0].items = newList;
      } else {
        clearStore("customItem");
        this.menuList[0].items = [];
      }
    },
    //编辑框确定按钮
    Dialoghandle(value, formName) {
      let _this = this;
      if (value == "confirm") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            debugger;
            let customItem = getStore("customItem");
            let newList = [];
            if (customItem) {
              newList = customItem.concat([this.form]);
            } else {
              newList = [this.form];
            }
            setStore("customItem", newList);
            this.menuList[0].items = newList;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs[formName].resetFields();
      }
      Object.assign(this, { dialogFormVisible: false });
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../assets/mixin.less";
.allmost {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .section_container {
    position: relative;
    padding: 40px;
    display: flex;
    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 200px;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 100;
      height: 400px;
      .item {
        position: relative;
        padding: 8px 0;
        cursor: pointer;
      }
      .active {
        color: chocolate;
      }
      .active::before {
        content: "";
        background-color: black;
        width: 16px;
        height: 4px;
        position: absolute;
        left: -24px;
        margin-top: 10px;
        z-index: 1;
      }
    }
    .main {
      margin-left: 8%;
      width: 100%;
      overflow: hidden;
      min-height: 70vh;
      .scroll {
        overflow-y: auto;
        height: 100%;
        margin-right: -13px;
        padding-right: 15px;
      }
      .part {
        background-color: white;
        min-height: 100px;
        border-radius: 12px;
        margin-bottom: 20px;
        .title {
          display: flex;
          justify-content: space-between;
          line-height: 48px;
          font-size: 18px;
          font-weight: bold;
          padding-left: 20px;
          border-bottom: 1px solid #f1f4f9;
          .editContent {
            font-size: 14px;
            margin-right: 10px;
            color: #51b5e1;
            span {
              margin: 0 5px;
              cursor: pointer;
            }
            i {
              margin: 0 3px;
            }
          }
        }
        .contnet {
          display: flex;
          flex-wrap: wrap;
          padding: 25px 20px;
          .itempart {
            position: relative;
          }
          .item {
            position: relative;
            display: flex;
            align-items: center;
            max-width: 200px;
            cursor: pointer;
            margin: 0 25px 25px 10px;
            padding: 8px;
            .headerImg {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .header {
              .headerTitle {
                font-size: 15px;
                white-space: nowrap;
              }
              .introduce {
                max-width: 135px;
                color: #8f8f8f;
                font-size: 13px;
                margin-top: 8px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                line-clamp: 2;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                box-orient: vertical;
              }
            }
          }
          .delete {
            position: absolute;
            top: -6px;
            right: -2px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .Footer {
    position: relative;
    width: 100%;
    height: 150px;
  }
}
</style>
