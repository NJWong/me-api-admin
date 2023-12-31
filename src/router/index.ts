import { App } from 'vue'
import { createAuthGuard } from '@auth0/auth0-vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Characters from '@/views/Characters'
import CreateCharacter from '@/views/CreateCharacter'
import EditCharacter from '@/views/EditCharacter'
import Species from '@/views/Species'
import CreateSpecies from '@/views/CreateSpecies'
import EditSpecies from '@/views/EditSpecies'
import Genders from '@/views/Genders'
import CreateGender from '@/views/CreateGender'
import EditGender from '@/views/EditGender'

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
        path: '/characters/new',
        name: 'create-character',
        meta: {
          parent: 'characters'
        },
        component: CreateCharacter,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/characters/:id/edit',
        name: 'edit-character',
        meta: {
          parent: 'characters'
        },
        component: EditCharacter,
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
      {
        path: '/genders/new',
        name: 'create-gender',
        meta: {
          parent: 'genders'
        },
        component: CreateGender,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/genders/:id/edit',
        name: 'edit-gender',
        meta: {
          parent: 'genders'
        },
        component: EditGender,
        beforeEnter: createAuthGuard(app)
      },
    ]
  })
}

