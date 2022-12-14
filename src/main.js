import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'
import request from "@/utils/request";

Vue.config.productionTip = false
Vue.use(ViewUI)

Vue.prototype.$axios = axios
Vue.prototype.$request = request
axios.defaults.baseURL = 'http://localhost:8080/eduonline'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
