import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/server',
        component: Layout,
        redirect: '/server/docker',
        name: 'Server',
        meta: { title: '主机管理', icon: 'DocumentCopy' },
        children: [
            {
                path: 'docker',
                name: 'Docker',
                component: createNameComponent(() => import('@/views/docker/server/index.vue')),
                meta: { title: '主机管理', icon: 'DocumentCopy' }
            }
        ]
    }
]

export default route
