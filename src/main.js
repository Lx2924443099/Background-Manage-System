import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from "js-cookie"

Vue.config.productionTip = false

// 前置导航守卫
router.beforeEach(
  (to, from, next) => {
    let token = Cookie.get("token")
    if (!token && to.name != 'Login') {
      next({ name: 'Login' })
    }
    else {
      next()
    }
  })

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
