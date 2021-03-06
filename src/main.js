import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import {
  Row,
  Col,
  Button,
  Card,
  BackTop,
  Modal,
  message,
  Icon,
  Input,
  Table,
  Spin,
  Form,
  Avatar,
  Alert,
  AutoComplete
} from 'ant-design-vue'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Card)
Vue.use(BackTop)
Vue.use(Modal)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Table)
Vue.use(Spin)
Vue.use(Form)
Vue.use(Avatar)
Vue.use(Alert)
Vue.use(AutoComplete)
Vue.prototype.$message = message

Vue.config.productionTip = false

var _hmt = []
// 必须把_hmt挂载到window下，否则找不到
window._hmt = _hmt

var baiduTongJi = function() {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?d27ba259bc648899db93e6bdc54fc7c2'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
}
baiduTongJi()

router.beforeEach((to, from, next) => {
  if (window._hmt) {
    if (to.path) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }

  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
