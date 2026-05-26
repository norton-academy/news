<script setup lang="ts">
import type { Advertisement, Article, NewsSource } from "~/types/news";

import WeatherCard from "./WeatherCard.vue";
import AdvertisementCard from "./AdvertisementCard.vue";
import TrendingCard from "./TrendingCard.vue";
import SourceToggleCard from "./SourceToggleCard.vue";

defineProps<{
  weather: {
    city: string;
    temperature: string;
    condition: string;
  } | null;
  popularArticles: Article[];
  advertisements: Advertisement[];
  sources: NewsSource[];
  selectedSources: string[];
}>();

const emit = defineEmits<{
  toggleSource: [slug: string];
  clearSources: [];
}>();
</script>

<template>
  <aside class="space-y-5">
    <WeatherCard :weather="weather" />

    <AdvertisementCard
      :advertisements="advertisements"
      placement="homepage_sidebar"
    />

    <TrendingCard :articles="popularArticles" />

    <SourceToggleCard
      :sources="sources"
      :selected-sources="selectedSources"
      @toggle="emit('toggleSource', $event)"
      @clear="emit('clearSources')"
    />
  </aside>
</template>