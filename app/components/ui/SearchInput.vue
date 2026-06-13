<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Search...',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
  clear: []
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function clearSearch() {
  emit('update:modelValue', '')
  emit('clear')
}

function submitSearch(value: string) {
  emit('search', value)
}
</script>

<template>
  <div class="relative">
    <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      :disabled="disabled"
      class="h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-9 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-white dark:focus:ring-white/10"
      @input="handleInput"
      @keyup.enter="submitSearch(String(modelValue))"
    >

    <button
      v-if="modelValue"
      type="button"
      class="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      @click="clearSearch"
    >
      <X class="size-4" />
      <span class="sr-only">Clear search</span>
    </button>
  </div>
</template>