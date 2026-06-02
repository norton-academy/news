<script setup lang="ts">
import { Square } from "lucide-vue-next";
import type { NewsSource } from "~/types/news";

const props = defineProps<{
  sources: NewsSource[];
  selectedSources: string[];
}>();

const emit = defineEmits<{
  toggle: [slug: string];
  clear: [];
}>();

const languageStore = usePublicLanguageStore();

const getShortName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const isSelected = (slug: string) => {
  return props.selectedSources.includes(slug);
};
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
      <h3 class="flex items-center gap-2 font-black text-slate-700">
        <Square class="h-3 w-3 text-slate-400" />
        {{ languageStore.isKhmer ? "ប្រភពព័ត៌មាន" : "News Sources" }}
      </h3>

      <button
        v-if="selectedSources.length"
        class="text-xs font-bold text-blue-700 hover:underline"
        @click="emit('clear')"
      >
        {{ languageStore.isKhmer ? "សម្អាត" : "Clear" }}
      </button>
    </div>

    <div>
      <button
        v-for="source in sources"
        :key="source.id"
        type="button"
        class="flex w-full items-center justify-between border-b border-slate-100 px-5 py-4 text-left transition last:border-b-0 hover:bg-slate-50"
        @click="emit('toggle', source.slug)"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-xs font-black text-blue-700">
            <img
              v-if="source.logo"
              :src="source.logo"
              :alt="source.name"
              class="h-full w-full object-cover"
            />

            <span v-else>
              {{ getShortName(source.name) }}
            </span>
          </div>

          <div>
            <p class="font-bold text-slate-700">
              {{ source.name }}
            </p>

            <p class="text-xs text-slate-400">
              {{ isSelected(source.slug)
                ? languageStore.isKhmer ? "បើក" : "Enabled"
                : languageStore.isKhmer ? "បិទ" : "Disabled"
              }}
            </p>
          </div>
        </div>

        <span
          class="relative h-6 w-11 rounded-full transition"
          :class="isSelected(source.slug) ? 'bg-blue-700' : 'bg-slate-300'"
        >
          <span
            class="absolute top-1 h-4 w-4 rounded-full bg-white transition"
            :class="isSelected(source.slug) ? 'right-1' : 'left-1'"
          />
        </span>
      </button>

      <div
        v-if="!sources.length"
        class="p-5 text-sm text-slate-500"
      >
        No sources available.
      </div>
    </div>
  </section>
</template>
