<template>
  <AppLayout>
    <div class="mb-5 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-base font-semibold leading-6 text-gray-900">Genders</h3>
      <div class="mt-3 sm:ml-4 sm:mt-0">
        <RouterLink to="/genders/new">
          <a class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Gender
          </a>
        </RouterLink>
      </div>
    </div>

    <ul role="list" class="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5  mb-5 sm:rounded-xl">
      <li v-for="gender in genders" :key="gender.id" class="relative flex justify-between items-center gap-x-6 px-4 py-5 sm:px-6">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            {{ gender.name }}
          </p>
        </div>

        <div class="flex flex-none items-center gap-x-4">
          <a href="#" class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer sm:block"
            >View<span class="sr-only">, {{ gender.name }}</span></a
          >
          <Menu as="div" class="relative flex-none">
            <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span class="sr-only">Open options</span>
              <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <RouterLink :to="`/genders/${gender.id}/edit`">
                    <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">
                      Edit<span class="sr-only">, {{ gender.name }}</span>
                    </a>
                  </RouterLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button :class="[active ? 'bg-gray-50' : '', 'w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900']" @click="handleDelete(gender.id)">
                    Delete<span class="sr-only">, {{ gender.name }}</span>
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </li>
    </ul>
  </AppLayout>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { useQueryClient } from '@tanstack/vue-query'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

import AppLayout from '@/components/layouts/AppLayout.vue'

import { useDeleteGender, useGenders } from '@/api/genders.api'

const { getAccessTokenSilently } = useAuth0()
const queryClient = useQueryClient()

const { data: genders } = useGenders()
const { mutate: deleteGender } = useDeleteGender()

const handleDelete = async (id: number) => {
  const token = await getAccessTokenSilently()

  const callback = () => {
    queryClient.invalidateQueries({ queryKey: ['genders'] })
  }

  deleteGender({ id, token, callback })
}
</script>