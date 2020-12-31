import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    cacheComponents: [],
    menuBtnList: []
}
const mutations = {
    getCacheComponents(state, data) {
        state.cacheComponents = data
    },
    //更新菜单权限按钮数据
    updateMenuBtnList(state, val) {
        state.menuBtnList = val
    }
}
export default new Vuex.Store({
    state,
    mutations
})