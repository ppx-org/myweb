
import { createRouter, createWebHistory } from 'vue-router'
import Index from './components/Index.vue'
import UserCenter from './components/UserCenter.vue'
import Resource from './components/grant/Resource.vue'

import Home from './Home.vue'
import Login from './Login.vue'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [{
            path: '/Home',
            name: 'Home',
            component: Home,
                children: [
                    {
                        path: '/userCenter',
                        component: UserCenter
                    }, {
                        path: '/resource',
                        component: Resource
                    },{
                        path: '/index',
                        component: Index
                    }
                ]
            },{
                path: '/',
                component: Login
            }
    ]
})

// meta:{title:'测试路由test', noCache:true}
router.addRoute('Home', {
    path: '/example',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) fro this route
    // which is lazy-loaded when the route is visited
    component: () => import('./components/test/Example11.vue')
})

router.addRoute('Home', {path:'/test/Example11', component:() => import('./components/test/Example11.vue')})
router.addRoute('Home', {path:'/test/Example12', component:() => import('./components/test/Example12.vue')})

router.addRoute('Home', {path:'/test/Example21', component:() => import('./components/test/Example21.vue')})
router.addRoute('Home', {path:'/test/Example22', component:() => import('./components/test/Example22.vue')})

router.addRoute('Home', {path:'/test/Example', component:() => import('./components/test/Example.vue')})

export default router
