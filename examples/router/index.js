import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const doc = () =>
  import ("../components/doc.vue")
const UiInput = () =>
  import ("../docs/ui-input.md")

const routes = [{
  path: '*',
  redirectTo: '/'
}, {
  path: '/doc',
  component: doc,
  children: [{
    path: 'ui-input',
    component: UiInput
  }]
}]


export default new VueRouter({
  routes
})
