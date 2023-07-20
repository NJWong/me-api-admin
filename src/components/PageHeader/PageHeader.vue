<template>
  <div class="mb-5 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{ title }}</h3>
      <div v-if="actionCallback" class="mt-3 sm:ml-4 sm:mt-0">
        <button @click="handleClick" type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ actionText }}</button>
      </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  actionText: {
    type: String,
    default: '',
  },
  actionCallback: {
    type: Function,
    default: null,
  },
})

const handleClick = () => {
  if (props.actionCallback) {
    props.actionCallback()
  }
}
</script>