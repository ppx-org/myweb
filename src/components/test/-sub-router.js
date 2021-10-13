
const MODULE = '/test/'

let subRouter = [
    {path: `${MODULE}/Example`, component: () => import('./Example.vue')},

]

export {subRouter};