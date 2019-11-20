import Vue from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.use(VueKonva)
Vue.use(BootstrapVue)

// globally (in your main .js file)
Vue.component('v-icon', Icon)

new Vue({
  render: h => h(App),
}).$mount('#app')
