import Vue from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './store'

// plugins
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify)



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
