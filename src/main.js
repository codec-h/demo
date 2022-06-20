import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Dashboard from "./views/Dashboard.vue"
import Movie from "./views/Movie.vue"


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)

const routes = [
    { path: '/', component: Dashboard },
    { path: '/movie/:id', component: Movie },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
})

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')