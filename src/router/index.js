import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/homes',
      name: 'homes',
      meta: {
        auth: true
      },
      component: resolve => require(['@/components/homes'], resolve)
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //权限判断
    if (localStorage.getItem('token')) { //读取token值
    //  成功
      next()
    } else {
      next({path:'/'})
    }
  } else {
    // 没有meta.auth 不用管
    next()
  }
});

export default router;
