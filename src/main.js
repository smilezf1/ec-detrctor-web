
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Form, TabPane } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css';
import api from './components/request/api'
import guid from '../src/utils/guid'
import axios from 'axios'
import resetMessage from '../src/utils/resetMessage'//设置ElementUi的Message消息提示每次值弹出一次
import confirm from '../src/utils/confirm';
import store from '../src/store/getter';
import permission from '../src/utils/permission';
Vue.use(ElementUI);
Vue.use(permission);
Vue.prototype.$message = resetMessage;
Vue.prototype.$messageTips = confirm;
Vue.config.productionTip = false
Vue.prototype.guid = guid;
Vue.prototype.axios = axios;
Vue.prototype.api = api;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {//判断路由是否需要登录权限
    if (localStorage.getItem("Authorization")) {
      next()
    } else {
      if (to.path == '/login') {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  } else {
    next()
  }
})