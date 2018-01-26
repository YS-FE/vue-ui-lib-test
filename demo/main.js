import Vue from 'vue'
import UiLib from '../src/index.js'

import App from './App'

Vue.use(UiLib)
Vue.productionTip = false

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
