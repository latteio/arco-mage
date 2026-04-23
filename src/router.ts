import {createRouter, createWebHashHistory, RouterOptions} from 'vue-router';
import staticRoutes from "@/routes";

/**
 * 创建路由
 */
const routes = [...staticRoutes];
const router = createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: routes
});

router.beforeEach(() => {
});

router.afterEach(() => {
});

/**
 * onError
 */
router.onError(() => {
});

export default router;
