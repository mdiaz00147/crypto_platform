import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import Toasted from 'vue-toasted';
import BootstrapVue from 'bootstrap-vue'
import { store } from '@/store/index'
import {HTTP} from '@/config/http-common';

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(ArgonDashboard)
Vue.use(Toasted, {
  theme:'bubble'
})
Vue.prototype.$http = HTTP;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
