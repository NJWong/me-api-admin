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
              <input v-model="characterName" type="text" name="name" id="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Commander Shepard" />
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
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useQueryClient } from '@tanstack/vue-query'

import AppLayout from '@/components/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader'

import { useSpecies } from '@/api/species.api'
import { useGenders } from '@/api/genders.api'
import { useCharacters, useUpdateCharacter } from '@/api/characters.api'

const router = useRouter()
const route = useRoute()
const { getAccessTokenSilently } = useAuth0()
const queryClient = useQueryClient()

const { data } = useCharacters()
const { data: speciesList } = useSpecies()
const { data: gendersList } = useGenders()
const { mutate: updateCharacter } = useUpdateCharacter()

const character = computed(() => {
  return data.value?.find((character) => character.id === parseInt(String(route.params.id)))
})

const characterName = ref(character.value?.name ?? '')
const characterSpecies = ref<number | null>(character.value?.species.id ?? null)
const characterGender = ref<number | null>(character.value?.gender.id ?? null)
const characterClass = ref(character.value?.class ?? '')


const handleSubmit = async () => {
  try {
    if (!character.value?.id) {
      throw new Error('Invalid character ID')
    }

    if (!characterName.value || !characterSpecies.value || !characterGender.value || !characterClass.value) {
      throw new Error('Missing required fields')
    }

    const token = await getAccessTokenSilently()

    const callback = () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] })

      router.push({ name: 'characters' })
    }

    updateCharacter({
      id: character.value.id,
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
</script>