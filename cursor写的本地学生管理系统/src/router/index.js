import { createRouter, createWebHistory } from 'vue-router'


const Home = () => import('../views/Home.vue')
const Manager = () => import('../views/Manager.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/manager',
        name: 'Manager',
        component: Manager
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router