import Dashboard from "../views/Dashboard.vue"
import Movie from "../views/Movie.vue"

import VueRouter from 'vue-router'

const routes = [{
        path: '/',
        name: 'home',
        component: Dashboard
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: Movie
    },
]
const router = new VueRouter({
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    if (to.path === '/movie/' && to.params.id === undefined)
        next('/')
    next()
})
export default router;