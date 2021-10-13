import {createRouter, createWebHistory} from 'vue-router'
import Login from './Login.vue'
import Home from './Home.vue'
import Index from './components/Index.vue'

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
                path: '/index',
                component: Index
            }]
        }
    ]
})

// meta:{title:'测试路由test', noCache:true}
router.addRoute('Home', {
    path: '/test/Example',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) fro this route
    // which is lazy-loaded when the route is visited
    component: () => import('./components/test/Example.vue')
})

router.addRoute('Home', {path: '/security/Res', component: () => import('./components/security/Res.vue')})
router.addRoute('Home', {path: '/security/Role', component: () => import('./components/security/Role.vue')})
router.addRoute('Home', {path: '/security/User', component: () => import('./components/security/User.vue')})


export default router
