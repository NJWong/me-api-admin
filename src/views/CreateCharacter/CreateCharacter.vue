<template>
  <AppLayout>
    <PageHeader title="Create Species" />

    <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12 flex flex-col gap-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input ref="nameInput" v-model="characterName" type="text" name="name" id="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Commander Shepard" />
            </div>
          </div>

          <!-- Species -->
          <div>
            <label for="species" class="block text-sm font-medium leading-6 text-gray-900">Species</label>
            <select v-model="characterSpecies" id="species" name="species" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'text-gray-400': characterSpecies === null, 'text-gray-900': characterSpecies !== null }">
              <option :value="null">Choose a species</option>
              <option v-for="s in speciesList" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>

          <!-- Gender -->
          <div>
            <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
            <select v-model="characterGender" id="gender" name="gender" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'text-gray-400': characterGender === null, 'text-gray-900': characterGender !== null }">
              <option :value="null">Choose a gender</option>
              <option v-for="g in gendersList" :key="g.id" :value="g.id">{{ g.name }}</option>
            </select>
          </div>

          <!-- Class -->
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Class</label>
            <div class="mt-2">
              <input v-model="characterClass" type="text" name="class" id="class" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Spectre" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button @click="handleCancel" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>

    <div class="border-t border-gray-900/10 mt-4 pt-4">
      <div class="flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">ID</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Species</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gender</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Class</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="character in charactersList" :key="character.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ character.id }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ character.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ character.species.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ character.gender.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ character.class }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useQueryClient } from '@tanstack/vue-query'

import AppLayout from '@/components/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader'

import { useSpecies } from '@/api/species.api'
import { useGenders } from '@/api/genders.api'
import { useCharacters, useCreateCharacter } from '@/api/characters.api'

const router = useRouter()
const { getAccessTokenSilently } = useAuth0()
const queryClient = useQueryClient()

const nameInput = ref<HTMLInputElement | null>(null)

const characterName = ref('')
const characterSpecies = ref<number | null>(null)
const characterGender = ref<number | null>(null)
const characterClass = ref('')

const { data: speciesList } = useSpecies()
const { data: gendersList } = useGenders()
const { data: charactersList } = useCharacters()
const { mutate: createCharacter } = useCreateCharacter()

const handleSubmit = async () => {
  try {
    if (!characterName.value || !characterSpecies.value || !characterGender.value || !characterClass.value) {
      throw new Error('Missing required fields')
    }

    const token = await getAccessTokenSilently()

    const callback = () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] })

      clearFields()

      nameInput.value?.focus()
    }

    createCharacter({
      data: {
        name: characterName.value,
        species: characterSpecies.value,
        gender: characterGender.value,
        class: characterClass.value
      },
      token,
      callback,
    })

  } catch (e) {
    console.error(e)
  }
}

const handleCancel = () => {
  router.push({ name: 'characters' })
}

const clearFields = () => {
  characterName.value = ''
  characterSpecies.value = null
  characterGender.value = null
  characterClass.value = ''
}
</script>