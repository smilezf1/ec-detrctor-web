import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    cacheComponents: []
}
const mutations = {
    getCacheComponents(state, data) {
        state.cacheComponents = data
    }
}
export default new Vuex.Store({
    state,
    mutations
})