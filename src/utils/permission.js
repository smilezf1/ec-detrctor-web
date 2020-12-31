import Vue from 'vue';
import store from '../store/getter';
const permission = Vue.directive("permission", {
    inserted: function (el, binding) {
        if (!permissionJudge(binding.value)) {
            el.parentNode.removeChild(el)
        }
        function permissionJudge(value) {
            let list = store.state.menuBtnList;
            for (let item of list) {
                //key 唯一标识
                if (item.key == value) {
                    return true
                }
            }
            return false
        }
    }
})
export default permission