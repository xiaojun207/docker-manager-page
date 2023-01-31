import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/container',
        component: Layout,
        redirect: '/container/container',
        name: 'Container',
        meta: { title: '容器管理', icon: 'Files' },
        children: [
            {
                path: 'container',
                name: 'ContainerList',
                component: createNameComponent(
                    () => import('@/views/docker/container/index.vue')
                ),
                meta: { title: '容器', icon: 'Files' }
            },
            {
                path: 'stats',
                name: 'Stats',
                component: createNameComponent(
                    () => import('@/views/docker/container/stats.vue')
                ),
                meta: { title: '最新状态', icon: 'HotWater' }
            },
            {
                path: 'tailLog',
                name: 'tailLog',
                component: createNameComponent(() => import('@/views/docker/logs/index.vue')),
                meta: { title: '实时日志', icon: 'Dessert' }
            },
            {
                path: 'connect',
                name: 'connect',
                component: createNameComponent(
                    () => import('@/views/docker/container/connect.vue')
                ),
                meta: { title: '连接容器', icon: 'Sugar' }
            }
        ]
    }
]

export default route
