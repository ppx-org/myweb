
const MODULE = '/test/'

let subRouter = [
    {path: `${MODULE}/Example`, component: () => import('./Example.vue')},
    {path: `${MODULE}/Example2`, component: () => import('./Example2.vue')},
]

export {subRouter};