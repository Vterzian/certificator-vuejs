import { createRouter, createWebHistory } from 'vue-router'
import routes from './constants/routes'
import { isLoggedIn } from './helpers/auth'

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('BEFORE EACH ROUTE');
  if (to.name == 'logIn' && isLoggedIn()) {
    next({path: '/home'});
  }
  else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  }
  else {
    next();
  }  
});

export default router;