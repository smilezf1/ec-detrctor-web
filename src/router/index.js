import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/", name: 'login', component: () => import('../components/page/login.vue')
    },
    {
      path: "/home", name: 'home', meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/page/home"), children: [
        { path: 'index', meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/page/index.vue") },
        { path: "detector/android/list", name: 'androidList', meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/detector/android/list.vue") },
        { path: "detector/android/detail", name: 'androidDetail', meta: { requireAuth: true, KeepAlive: false }, component: () => import('../components/detector/android/detail.vue') },
        { path: "detector/ios/list", name: 'iosList', meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/detector/ios/list.vue") }
        , { path: "detector/ios/detail", name: 'iosDetail', meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/detector/ios/detail.vue") },
        {
          path: 'system/role/list', name: 'role', meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/system/roleManageMent.vue")
        },
        { path: "system/user/list", meta: { requireAuth: true, KeepAlive: false }, name: 'user', component: () => import("../components/system/userManageMent.vue") },
        { path: 'system/menu/list', meta: { requireAuth: true, KeepAlive: false }, name: 'menu', component: () => import('../components/system/menuManageMent.vue') },
        { path: 'system/manage/about', meta: { requireAuth: true, KeepAlive: false }, name: 'about', component: () => import('../components/system/recommend.vue') },
        { path: "configuration/detectorItem/list", name: 'detectorItemList', meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/configuration/detectorItem/list.vue") },
        { path: "configuration/detectorStrategy/list", name: "detectorStrategyList", meta: { requireAuth: true, KeepAlive: false }, component: () => import("../components/configuration/detectorStrategy/list.vue") }
        /* import("../components/configuration/detectorStrategy/list.vue") */
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/page/login')
    }

  ]
})