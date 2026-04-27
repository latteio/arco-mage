import {RouteRecordRaw} from 'vue-router';

/**
 * 静态路由
 */
const staticRoutes: RouteRecordRaw[] = [
  {
    name: "/",
    path: "/",
    component: () => import('@/views/demos/Main.vue'),
    meta: {type: 'menu-group'},
    redirect: '/home',
    children: [
      {
        name: "dashboard",
        path: "/dashboard",
        component: () => import('@/views/demos/Empty.vue'),
        meta: {type: 'menu-group', title: '我的面板'},
        children: [{
          name: "home",
          path: "/home",
          component: () => import('@/views/demos/Home.vue'),
          meta: {
            type: 'menu',
            title: '主页'
          }
        }]
      },
      {
        name: "dev",
        path: "/dev",
        component: () => import('@/views/demos/Empty.vue'),
        meta: {type: 'menu-group', title: '开发实例'},
        children: [{
          name: "table0",
          path: "/table0",
          component: () => import('@/views/demos/crud/table0.vue'),
          meta: {
            type: 'menu',
            title: '基础表格'
          }
        }, {
          name: "table1",
          path: "/table1",
          component: () => import('@/views/demos/crud/table1.vue'),
          meta: {
            type: 'menu',
            title: '组件化表格'
          }
        }]
      }
    ]
  }
];

export default staticRoutes;
