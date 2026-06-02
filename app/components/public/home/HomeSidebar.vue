<script setup lang="ts">
import type { Article, NewsSource } from "~/types/news";

import WeatherCard from "./WeatherCard.vue";
import TrendingCard from "./TrendingCard.vue";
import SourceToggleCard from "./SourceToggleCard.vue";

defineProps<{
  weather: {
    city: string;
    temperature: string;
    condition: string;
  } | null;
  popularArticles: Article[];
  sources: NewsSource[];
  selectedSources: string[];
}>();

const emit = defineEmits<{
  toggleSource: [slug: string];
  clearSources: [];
}>();
</script>

<template>
  <aside class="space-y-5 lg:sticky lg:top-32 lg:self-start">
    <WeatherCard :weather="weather" />

    <TrendingCard :articles="popularArticles" />

    <SourceToggleCard
      :sources="sources"
      :selected-sources="selectedSources"
      @toggle="emit('toggleSource', $event)"
      @clear="emit('clearSources')"
    />
  </aside>
</template>