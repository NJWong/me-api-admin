<template>
  <AppLayout>
    <div class="mb-5 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-base font-semibold leading-6 text-gray-900">Characters</h3>
      <div class="mt-3 sm:ml-4 sm:mt-0">
        <RouterLink to="/characters/new">
          <a class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Character
          </a>
        </RouterLink>
      </div>
    </div>

    <ul role="list" class="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 mb-5 sm:rounded-xl">
      <li v-for="character in characters" :key="character.id" class="flex items-center justify-between gap-x-6 px-4 py-5">
        <div class="min-w-0 flex gap-x-4">
          <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <div>
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ character.name }}</p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p class="whitespace-nowrap">
                {{ character.species.name }}
              </p>
              <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <p class="truncate">{{ character.class }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-none items-center gap-x-4">
          <a href="#" class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer sm:block">
            View<span class="sr-only">, {{ character.name }}</span>
          </a>
          <Menu as="div" class="relative flex-none">
            <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span class="sr-only">Open options</span>
              <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <RouterLink :to="`/characters/${character.id}/edit`">
                    <a :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">
                      Edit<span class="sr-only">, {{ character.name }}</span>
                    </a>
                  </RouterLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']" @click="handleDelete(character.id)">
                    Delete<span class="sr-only">, {{ character.name }}</span>
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
import { useQueryClient } from '@tanstack/vue-query'
import { useAuth0 } from '@auth0/auth0-vue'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

import AppLayout from '@/components/layouts/AppLayout.vue'

import { useCharacters, useDeleteCharacter } from '@/api/characters.api.ts'

const { getAccessTokenSilently } = useAuth0()
const queryClient = useQueryClient()

const { data: characters } = useCharacters()
const { mutate: deleteCharacter } = useDeleteCharacter()

const handleDelete = async (id: number) => {
  const token = await getAccessTokenSilently()

  const callback = () => {
    queryClient.invalidateQueries(['characters'])
  }

  deleteCharacter({ id, token, callback })
}
</script>