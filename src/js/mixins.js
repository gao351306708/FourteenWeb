/**
 * 全局混入，可在此处写公用属性或者方法，在组件中混入使用
 * **/
export default {
    data() {
        return {
        }
    },
    created() {

    },
    activated() {

        let sb = this.$store.state.pub.scrollBehavior;
        for (let el in sb) {
            let element = document.querySelector("." + el);
            if (element) {
                element.scrollTop = sb[el];
            }
        }
    },
    methods:{

    },
    activated(){
    },
    deactivated() {
    }
}