
import UiInput  from '../packages/UiInput'

const components = [UiInput]
const install =  function (Vue, options){
  components.map((com) => {
    Vue.component(com.name, com)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  UiInput
}
