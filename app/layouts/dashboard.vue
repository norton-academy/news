<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <AppShell>
    <slot />
  </AppShell>
</template>