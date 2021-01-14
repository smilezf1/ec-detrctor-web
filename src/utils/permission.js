import Vue from 'vue';
import store from '../store/getter';
const permission = Vue.directive("permission", {
    inserted: function (el, binding) {
        if (!permissionJudge(binding.value)) {
            el.parentNode.removeChild(el)
        }
        function permissionJudge(value) {
            const list = store.state.menuBtnList;
            for (let item of list) {
                if (item == value) {
                    return true
                }
            }
            return false
        }
    }
})
export default permission