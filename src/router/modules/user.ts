import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        name: 'User',
        meta: { title: '用户管理', icon: 'User' },
        children: [
            {
                path: 'index',
                name: 'UserIndex',
                component: createNameComponent(() => import('@/views/docker/user/index.vue')),
                meta: { title: '用户列表', icon: 'User' }
            }
        ]
    }
]

export default route
