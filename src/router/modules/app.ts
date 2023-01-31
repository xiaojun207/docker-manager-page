import type {Route} from '../index.type'
import Layout from '@/layout/index.vue'
import {createNameComponent} from '../createNode'

const route: Route[] = [
    {
        path: '/app',
        component: Layout,
        redirect: '/app/index',
        meta: {title: '应用管理', icon: 'Memo'},
        children: [
            {
                path: 'index',
                component: createNameComponent(() => import('@/views/docker/app/index.vue')),
                meta: {title: '应用列表', icon: 'Memo'}
            },
            // {
            //     path: 'flowline',
            //     component: createNameComponent(() => import('@/views/docker/app/flowline/index.vue')),
            //     meta: {title: '流水线', icon: 'Help'}
            // },
            {
                path: 'group',
                component: createNameComponent(() => import('@/views/docker/group/index.vue')),
                meta: {title: '应用组', icon: 'Menu'}
            },
            {
                path: 'taskList',
                component: createNameComponent(() => import('@/views/docker/task/index.vue')),
                meta: {title: '任务列表', icon: 'Operation'}
            },
            {
                path: 'publish',
                component: createNameComponent(() => import('@/views/docker/publish/index.vue')),
                meta: {title: '发布容器', icon: 'DocumentAdd'}
            }
        ]
    },
]

export default route
