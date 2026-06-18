<script setup lang="ts">
import {
  Newspaper,
  Flame,
  TrendingUp,
  Zap,
  Star,
} from "lucide-vue-next"
import type { FeedFilter, FilterTab } from "~/types/news"

const props = defineProps<{
  modelValue: FeedFilter
  breakingCount: number
  description: string
}>()

const emit = defineEmits<{
  "update:modelValue": [value: FeedFilter]
}>()
const FEED_FILTERS: FilterTab[] = [
  {
    key: "latest",
    label: "ថ្មីៗបំផុត",
    icon: Newspaper,
    description: "ព័ត៌មានថ្មីៗបំផុត",
  },
  {
    key: "popular",
    label: "ពេញនិយម",
    icon: Flame,
    description: "ព័ត៌មានដែលមានអ្នកអានច្រើនបំផុតថ្ងៃនេះ",
  },
  {
    key: "trending",
    label: "កំពុងល្បី",
    icon: TrendingUp,
    description: "ព័ត៌មានដែលកំពុងកើនឡើងការចាប់អារម្មណ៍យ៉ាងលឿនក្នុងរយៈពេល ៦ ម៉ោងចុងក្រោយ",
  },
  {
    key: "breaking",
    label: "ព័ត៌មានទាន់ហេតុការណ៍",
    icon: Zap,
    description: "បង្ហាញតែព័ត៌មានទាន់ហេតុការណ៍តែប៉ុណ្ណោះ",
  },
 /*  {
    key: "editors_pick",
    label: "និពន្ធនាយកជ្រើសរើស",
    icon: Star,
    description: "ព័ត៌មានដែលជ្រើសរើសផ្ទាល់ដោយក្រុមនិពន្ធនាយករបស់យើង",
  }, */
]
</script>

<template>
  <div
    class="flex items-center justify-between mb-8 border-b border-slate-200/60 dark:border-slate-800/80 relative"
  >
    <div
      class="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0 relative"
    >
      <button
        v-for="tab in FEED_FILTERS"
        :key="tab.key"
        @click="emit('update:modelValue', tab.key)"
        class="group relative flex items-center gap-2 px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-95 z-10"
        :class="
          modelValue === tab.key
            ? 'text-red-600 dark:text-red-500'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        "
        :title="tab.description"
      >
        <component
          :is="tab.icon"
          class="size-4 transition-transform duration-300 ease-out"
          :class="
            modelValue === tab.key
              ? 'scale-110 rotate-3'
              : 'group-hover:scale-110 group-hover:-rotate-3'
          "
        />
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.key === 'breaking' && breakingCount"
          class="inline-flex items-center justify-center size-4 text-[9px] font-black bg-red-600 text-white rounded-full animate-bounce"
        >
          {{ breakingCount }}
        </span>

        <span
          v-if="modelValue === tab.key"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500 origin-left animate-line-slide"
        ></span>
      </button>
    </div>

    <p
      class="hidden lg:block text-xs text-slate-400 dark:text-slate-500 font-medium italic opacity-85"
    >
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
@keyframes lineSlide {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}
.animate-line-slide {
  animation: lineSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
