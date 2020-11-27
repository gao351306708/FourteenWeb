/**
 * 此处定义全局指令
 * **/
import Vue from 'vue';

//自动获取焦点并弹出软键盘
Vue.directive("Vfocus", {
  bind: function (el, binding, vnode) {
    const {
      value
    } = binding;
    if (value && typeof value === "boolean") {
      vnode.context.$nextTick(() => {
        const input = el.getElementsByClassName("van-field__control");
        if (input && input.length !== 0) {
          input[0].focus();
        }
      });
    }
  }
})
//给元素添加滚动到底部触发事件
Vue.directive("scrollbottom", {
  bind: function (el, binding, vnode) {
    const {
      value
    } = binding;
    $(el).scroll(function () {
      let scrollH = $(this)[0].scrollHeight;
      let clientH = $(this)[0].clientHeight;
      let scrollTop = $(this).scrollTop();
      if (parseInt(scrollTop + clientH) >= scrollH) {
        console.log("到底了。。。", scrollH, clientH, scrollTop);
        value();
      }
    });
  }
})
//给元素添加点击enter键事件
Vue.directive("keyenter", {
  bind: function (el, binding, vnode) {
    const {
      value
    } = binding;
    document.onkeyup = function (e) {
      if (window.event)
        //如果window.event对象存在，就以此事件对象为准
        e = window.event;
      var code = e.charCode || e.keyCode;
      if (code == 13) {
        value();
      }
    };
  }
})
