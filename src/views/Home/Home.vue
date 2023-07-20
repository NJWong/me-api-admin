<template>
  <AppLayout>
    Home
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/components/layouts/AppLayout.vue'

const tabs = [
  { name: 'Characters', href: '/characters', current: false },
  { name: 'Species', href: '/species', current: false },
  { name: 'Genders', href: '/genders', current: false },
]
</script>
