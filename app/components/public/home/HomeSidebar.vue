<script setup lang="ts">
import type { Article } from "~/types/news";

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
}>();
</script>

<template>
  <aside class="space-y-5">
    <WeatherCard :weather="weather" />

    <AdvertisementCard />

    <TrendingCard :articles="popularArticles" />

    <SourceToggleCard />
  </aside>
</template>