import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router/router.js'

import Vuex from 'vuex'

Vue.use(Vuex)

// Create a new store instance.
const store = new Vuex.Store({
    state() {
        return {
            fromDate: new Date(),
            toDate: new Date()
        }
    },
    mutations: {
        setFromDate(state, date) {
            state.fromDate = date
        },
        setToDate(state, date) {
            state.toDate = date
        }
    }
})

Vue.config.productionTip = false;
Vue.prototype.$toDate = new Date();
Vue.prototype.$fromDate = new Date(
    Vue.prototype.$toDate.getFullYear() - 1,
    Vue.prototype.$toDate.getMonth(),
    Vue.prototype.$toDate.getDate()
);

Vue.prototype.$apiBaseUrl = "https://api.themoviedb.org/3/movie/";
Vue.prototype.$apiToken = '11004c5dda64d0bae607c7af2636e983';

Vue.use(store)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)

export const eventBus = new Vue();


new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#app')