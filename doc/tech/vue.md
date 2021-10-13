
# vue

# code...........................
```javascript
this.$refs[formName].resetFields()

main.js
console.log("xxxxx>>>>>>>>")
console.log(import.meta.env.MODE)
console.log(import.meta.env.VITE_SOME_KEY)



meta:{title:'测试路由test', noCache:true}
router.addRoute('Home', {
    path: '/test/Example',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) fro this route
    // which is lazy-loaded when the route is visited
    component: () => import('./components/test/Example.vue')
})


```