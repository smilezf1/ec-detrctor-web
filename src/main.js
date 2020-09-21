// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Form, TabPane } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './components/request/api'
import guid from './guid'
import axios from 'axios'
import resetMessage from './resetMessage'//设置ElementUi的Message消息提示每次值弹出一次
Vue.use(ElementUI);
Vue.prototype.$message = resetMessage;
Vue.config.productionTip = false
Vue.prototype.guid = guid;
Vue.prototype.axios = axios
Vue.prototype.api = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
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
