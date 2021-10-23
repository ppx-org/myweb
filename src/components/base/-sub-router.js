
const MODULE = '/base/'

let subRouter = [
    {path: `${MODULE}/Dict`, component: () => import('./Dict.vue')},
]

export {subRouter};