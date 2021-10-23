import {createRouter, createWebHistory} from 'vue-router'
import Login from './Login.vue'
import Home from './Home.vue'
import Index from './components/Index.vue'

import {subRouter as testRouter} from './components/test/-sub-router'
import {subRouter as securityRouter} from './components/security/-sub-router'
import {subRouter as baseRouter} from './components/base/-sub-router'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home,
            children: [{
                path: '/Index',
                component: Index
            }],
            redirect: "/Index"
        }
    ]
})


for (let i = 0; i < testRouter.length; i++) {
    router.addRoute('Home', testRouter[i]);
}
for (let i = 0; i < securityRouter.length; i++) {
    router.addRoute('Home', securityRouter[i]);
}
for (let i = 0; i < baseRouter.length; i++) {
    router.addRoute('Home', baseRouter[i]);
}

export default router
