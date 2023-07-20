<template>
  <AppLayout>
    <PageHeader title="Edit Species" />

    <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Species name</label>
            <div class="mt-2">
              <input v-model="name" type="text" name="name" id="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Human" />
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
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useQueryClient } from '@tanstack/vue-query'

import AppLayout from '@/components/layouts/AppLayout.vue'
import PageHeader from '@/components/PageHeader'

import { useSpecies, useUpdateSpecies } from '@/api/species.api.ts'

const router = useRouter()
const { getAccessTokenSilently } = useAuth0()
const queryClient = useQueryClient()

const { data } = useSpecies()
const { mutate: updateSpecies } = useUpdateSpecies()

const species = computed(() => {
  return data.value?.find((species) => species.id === parseInt(String(router.currentRoute.value.params.id)))
})

const name = ref(species.value?.name ?? '')

const handleSubmit = async () => {
  try {
    if (!species.value?.id) {
      throw new Error('Species ID not found')
    }

    const token = await getAccessTokenSilently()

    const callback = () => {
      queryClient.invalidateQueries({ queryKey: ['species'] })
    }

    updateSpecies({ id: species.value.id, name: name.value, token, callback })

    router.push({ name: 'species' })
  } catch (e) {
    console.error(e)
  }
}

const handleCancel = () => {
  router.push({ name: 'species' })
}
</script>