<script setup lang="ts">
const isSearchOpen = ref(false)
const noteCount = ref(3)
const searchItems = useState<any[]>('public-search-items', () => [])

function openSearch() {
  isSearchOpen.value = true
}

function closeSearch() {
  isSearchOpen.value = false
}

function openNotes() {
  navigateTo('/saved')
}

function logout() {
  console.log('Logout clicked')
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <PublicHeader
      :note-count="noteCount"
      @search="openSearch"
      @notes="openNotes"
      @logout="logout"
    />

    <main class="">
      <slot />
    </main>

    <PublicFooter />

    <PublicSearchOverlay
      v-model="isSearchOpen"
      :articles="searchItems"
    />
  </div>
</template>