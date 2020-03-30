/**
 * 此处定义全局指令
 * **/
import Vue from 'vue';

//自动获取焦点并弹出软键盘
Vue.directive("Vfocus", {
    bind: function(el, binding, vnode) {
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
