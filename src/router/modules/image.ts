import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
    {
        path: '/image',
        component: Layout,
        redirect: '/image/list',
        name: 'Image',
        meta: { title: '镜像管理', icon: 'CopyDocument' },
        children: [
            {
                path: 'list',
                name: 'List',
                component: createNameComponent(() => import('@/views/docker/image/index.vue')),
                meta: { title: '镜像管理' }
            }
        ]
    },
]

export default route
