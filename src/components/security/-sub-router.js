
const MODULE = '/security/'

let subRouter = [
    {path: `${MODULE}/Menu`, component: () => import('./Menu.vue')},
    {path: `${MODULE}/Res`, component: () => import('./Res.vue')},
    {path: `${MODULE}/Role`, component: () => import('./Role.vue')},
    {path: `${MODULE}/User`, component: () => import('./User.vue')},


]

export {subRouter};