
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Form, TabPane } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './components/request/api'
import guid from '../src/utils/guid'
import axios from 'axios'
import resetMessage from '../src/utils/resetMessage'//设置ElementUi的Message消息提示每次值弹出一次
import confirm from '../src/utils/confirm';
/* import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; */
Vue.use(ElementUI);
Vue.prototype.$message = resetMessage;
Vue.prototype.$messageTips = confirm;
Vue.config.productionTip = false
Vue.prototype.guid = guid;
Vue.prototype.axios = axios;
Vue.prototype.api = api
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//进度条配置
/* NProgress.inc(0.2);
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
}) */

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {//判断路由是否需要登录权限
    if (localStorage.getItem("Authorization")) {
      /*  NProgress.start() */
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
/* router.afterEach(() => {
  NProgress.done()
}) */