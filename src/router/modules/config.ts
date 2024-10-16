import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/config',
        component: Layout,
        redirect: '/config/agent',
        name: 'Config',
        meta: { title: '配置管理', icon: 'Setting' },
        children: [
            {
                path: 'agent',
                name: 'Agent',
                component: createNameComponent(
                    () => import('@/views/docker/config/index.vue')
                ),
                meta: { title: '客户端配置', icon: 'Setting' }
            },
            {
                path: 'white',
                name: 'white',
                component: createNameComponent(
                    () => import('@/views/docker/config/whitelist.vue')
                ),
                meta: { title: '白名单IP', icon: 'Grape' }
            },
            {
                path: 'forbidden',
                name: 'forbidden',
                component: createNameComponent(
                    () => import('@/views/docker/config/forbidden.vue')
                ),
                meta: { title: '禁用记录', icon: 'WindPower' }
            },
            {
                path: 'warn',
                name: 'warn',
                component: createNameComponent(
                    () => import('@/views/docker/config/warn.vue')
                ),
                meta: { title: '告警配置', icon: 'Warn' }
            }
        ]
    }
]

export default route
