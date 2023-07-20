import { App } from "vue"
import { createAuthGuard } from "@auth0/auth0-vue"
import { createRouter, createWebHistory } from "vue-router"

export const createAppRouter = (app: App) => {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login'),
      },
      {
        path: '/characters',
        name: 'characters',
        component: () => import('@/views/Characters'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/species',
        name: 'species',
        component: () => import('@/views/Species'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/species/new',
        name: 'create-species',
        component: () => import('@/views/CreateSpecies'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/genders',
        name: 'genders',
        component: () => import('@/views/Genders'),
        beforeEnter: createAuthGuard(app)
      },
    ]
  })
}

