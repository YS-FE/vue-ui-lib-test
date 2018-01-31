import Vue from 'vue'
import router from "./router"
import UiLib from '@/index.js'

import App from './App'
import DemoBlock from './components/demo-block.vue'

Vue.component('demo-block', DemoBlock)

Vue.use(UiLib)
Vue.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
