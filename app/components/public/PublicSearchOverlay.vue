<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

interface Article {
  id: number
  title: string
  category: string
  excerpt: string
}

interface Props {
  modelValue: boolean
  articles?: Article[]
}

const props = withDefaults(defineProps<Props>(), {
  articles: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [article: Article]
}>()

const searchQuery = ref('')
const searching = ref(false)

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const query = searchQuery.value.toLowerCase()
  return props.articles
    .filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    )
    .slice(0, 10)
})

const closeSearch = () => {
  emit('update:modelValue', false)
}

const selectArticle = (article: Article) => {
  emit('select', article)
  closeSearch()
}

const performSearch = () => {
  if (!searchQuery.value.trim()) return
  searching.value = true
  setTimeout(() => {
    searching.value = false
  }, 300)
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    closeSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20"
        @click.self="closeSearch"
      >
        <div class="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-down">
          <div class="p-4 border-b border-gray-100 flex items-center">
            <Search class="w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles, topics, or categories..."
              class="flex-1 px-3 py-2 text-lg outline-none bg-transparent placeholder:text-gray-400"
              @keyup.enter="performSearch"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              @click="searchQuery = ''"
            >
              <X class="w-5 h-5 text-gray-500" />
            </button>
            <button
              type="button"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              @click="closeSearch"
            >
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div v-if="searchResults.length" class="divide-y divide-gray-100">
              <NuxtLink
                v-for="article in searchResults"
                :key="article.id"
                :to="`/article/${article.id}`"
                class="block p-4 hover:bg-gray-50 transition-colors"
                @click="selectArticle(article)"
              >
                <div class="flex items-start gap-3">
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900 text-sm">{{ article.title }}</h4>
                    <p class="text-xs text-gray-500 mt-1">{{ article.category }}</p>
                    <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ article.excerpt }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div v-else-if="searchQuery && !searching" class="p-8 text-center">
              <Search class="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p class="text-gray-500 text-sm">No articles found for "{{ searchQuery }}"</p>
            </div>
            <div v-else class="p-8 text-center">
              <Search class="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p class="text-gray-500 text-sm">Search articles, topics, or categories</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
