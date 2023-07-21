<template>
  <AppLayout>
    <PageHeader title="Edit Gender" />

    <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Gender name</label>
            <div class="mt-2">
              <input v-model="genderName" type="text" name="name" id="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Human" />
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

import { useGenders, useUpdateGender } from '@/api/genders.api'

const router = useRouter()
const { getAccessTokenSilently } = useAuth0()
const queryClient = useQueryClient()

const { data } = useGenders()
const { mutate: updateGender } = useUpdateGender()

const gender = computed(() => {
  return data.value?.find((gender) => gender.id === parseInt(String(router.currentRoute.value.params.id)))
})

const genderName = ref(gender.value?.name ?? '')

const handleSubmit = async () => {
  try {
    if (!gender.value?.id) {
      throw new Error('Gender ID not found')
    }

    const token = await getAccessTokenSilently()

    const callback = () => {
      queryClient.invalidateQueries({ queryKey: ['genders'] })
    }

    updateGender({ id: gender.value.id, name: genderName.value, token, callback })

    router.push({ name: 'genders' })
  } catch (e) {
    console.error(e)
  }
}

const handleCancel = () => {
  router.push({ name: 'genders' })
}
</script>