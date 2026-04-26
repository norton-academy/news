<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Header (same as categories) -->
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 shadow-md transition-all duration-300">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3 group">
            <div class="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg shadow-md transition-all duration-300 group-hover:scale-110">
              A
            </div>
            <span class="font-semibold text-gray-800 dark:text-white text-lg tracking-tight">AdminCore</span>
          </div>
          <div class="hidden md:block flex-1 max-w-md mx-8">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search tags..." v-model="tagSearch" class="w-full bg-gray-50 dark:bg-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm dark:text-white">
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button @click="toggleDarkMode" class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110">
              <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </button>
            <div class="flex items-center gap-2 cursor-pointer group">
              <div class="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm shadow-sm transition-all duration-200 group-hover:scale-110">
                JD
              </div>
              <span class="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div class="max-w-3xl mx-auto">
        <!-- Page header -->
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Tags</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1">Create and manage product tags</p>
          </div>
        </div>

        <!-- Tag input card -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add New Tag</h2>
          <div class="relative">
            <input
                type="text"
                v-model="newTagInput"
                @keydown.enter="addTagFromInput"
                @input="filterSuggestions"
                placeholder="Type tag name and press Enter..."
                class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <div v-if="suggestions.length" class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-48 overflow-y-auto">
              <button
                  v-for="suggestion in suggestions"
                  :key="suggestion"
                  @click="selectSuggestion(suggestion)"
                  class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span v-for="tag in tags" :key="tag" class="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
              {{ tag }}
              <button @click="removeTag(tag)" class="hover:text-red-500">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </span>
          </div>
        </div>

        <!-- Tags list with search -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div class="p-5 border-b border-gray-100 dark:border-gray-700">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" v-model="tagSearch" placeholder="Search existing tags..." class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
            </div>
          </div>
          <div class="p-5">
            <div v-if="filteredTags.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <div v-for="tag in filteredTags" :key="tag" class="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl group">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ tag }}</span>
                <button @click="removeTag(tag)" class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              No tags found
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDark = ref(false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

// Mock tags data
const tags = ref(['bestseller', 'new', 'sale', 'premium', 'wireless', 'gaming', 'travel', 'eco-friendly'])

// New tag input and suggestions
const newTagInput = ref('')
const suggestions = ref([])

const addTagFromInput = () => {
  const tag = newTagInput.value.trim()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
    newTagInput.value = ''
    suggestions.value = []
  }
}

const selectSuggestion = (suggestion) => {
  if (!tags.value.includes(suggestion)) {
    tags.value.push(suggestion)
  }
  newTagInput.value = ''
  suggestions.value = []
}

const filterSuggestions = () => {
  const input = newTagInput.value.toLowerCase().trim()
  if (!input) {
    suggestions.value = []
    return
  }
  // Show existing tags that contain the input and are not already added
  suggestions.value = tags.value.filter(tag => tag.toLowerCase().includes(input))
}

const removeTag = (tag) => {
  const index = tags.value.indexOf(tag)
  if (index !== -1) tags.value.splice(index, 1)
}

const tagSearch = ref('')
const filteredTags = computed(() => {
  if (!tagSearch.value.trim()) return tags.value
  const q = tagSearch.value.toLowerCase()
  return tags.value.filter(tag => tag.toLowerCase().includes(q))
})
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>