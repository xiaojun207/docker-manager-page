import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'message.menu.dashboard.name', icon: 'HomeFilled' },
    children: [
      {
        path: 'dashboard',
        component: createNameComponent(() => import('@/views/docker/dashboard/index.vue')), // src/views/docker/dashboard/index.vue
        meta: { title: 'message.menu.dashboard.index', icon: 'HomeFilled', hideClose: true }
      }
    ]
  }
]

export default route
