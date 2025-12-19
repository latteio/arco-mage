import {createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions} from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 静态路由
 */
const staticRoutes: RouteRecordRaw[] = [
  {
    name: "/",
    path: "/",
    component: () => import('@/views/demos/Main.vue')
  }
];

/**
 * 创建路由
 */
const routes = [...staticRoutes];
const router = createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: routes
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

/**
 * onError
 */
router.onError(() => {
  NProgress.done();
});

export default router;
