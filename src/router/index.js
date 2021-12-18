import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    name: 'App',
    meta: { title: '应用管理', icon: 'el-icon-cherry' },
    children: [
      {
        path: 'index',
        name: 'AppIndex',
        component: () => import('@/views/app/index'),
        meta: { title: '应用列表', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'group',
        name: 'Group',
        component: () => import('@/views/group/index'),
        meta: { title: '应用组', icon: 'el-icon-copy-document' }
      },
      {
        path: 'taskList',
        name: 'TaskList',
        component: () => import('@/views/task/index'),
        meta: { title: '任务列表', icon: 'el-icon-bank-card' }
      },
      {
        path: 'publish',
        name: 'Publish',
        component: () => import('@/views/form/index'),
        meta: { title: '发布容器', icon: 'form' }
      }
    ]
  },
  {
    path: '/server',
    component: Layout,
    redirect: '/server/docker',
    name: 'Server',
    meta: { title: '服务器', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'docker',
        name: 'Docker',
        component: () => import('@/views/server/index'),
        meta: { title: '服务器', icon: 'table' }
      }
    ]
  },

  {
    path: '/container',
    component: Layout,
    redirect: '/container/container',
    name: 'Container',
    meta: { title: '容器管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'container',
        name: 'ContainerList',
        component: () => import('@/views/container/index'),
        meta: { title: '容器', icon: 'tree' }
      },
      {
        path: 'stats',
        name: 'Stats',
        component: () => import('@/views/server/stats'),
        meta: { title: '最新状态', icon: 'el-icon-date' }
      },
      {
        path: 'tailLog',
        name: 'tailLog',
        component: () => import('@/views/logs/index'),
        meta: { title: '实时日志', icon: 'el-icon-s-order' }
      }
    ]
  },

  {
    path: '/image',
    component: Layout,
    redirect: '/image/list',
    name: 'Image',
    meta: { title: '镜像管理', icon: 'el-icon-document-copy' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/image/index'),
        meta: { title: '镜像管理', icon: 'el-icon-document-copy' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/agent',
    name: 'Config',
    meta: { title: '配置管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'agent',
        name: 'Agent',
        component: () => import('@/views/config/index'),
        meta: { title: '客户端配置', icon: 'el-icon-setting' }
      }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
