import { App } from "vue"
import { createAuthGuard } from "@auth0/auth0-vue"
import { createRouter, createWebHistory } from "vue-router"

import Home from '@/views/Home'
import Login from '@/views/Login'
import Characters from '@/views/Characters'
import Species from "@/views/Species"
import CreateSpecies from "@/views/CreateSpecies"
import EditSpecies from "@/views/EditSpecies"
import Genders from "@/views/Genders"

export const createAppRouter = (app: App) => {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/characters',
        name: 'characters',
        component: Characters,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/species',
        name: 'species',
        component: Species,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/species/new',
        name: 'create-species',
        meta: {
          parent: 'species'
        },
        component: CreateSpecies,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/species/:id/edit',
        name: 'edit-species',
        meta: {
          parent: 'species'
        },
        component: EditSpecies,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/genders',
        name: 'genders',
        component: Genders,
        beforeEnter: createAuthGuard(app)
      },
    ]
  })
}

