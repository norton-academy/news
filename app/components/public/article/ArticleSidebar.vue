<script setup lang="ts">
import type { Article } from "~/types/news";

import TelegramJoinCard from "./TelegramJoinCard.vue";
import MoreFromSourceCard from "./MoreFromSourceCard.vue";
import PopularArticlesCard from "./PopularArticlesCard.vue";

defineProps<{
  sourceName: string;
  moreFromSource: Article[];
  popularArticles: Article[];
}>();
</script>

<template>
  <aside class="space-y-5">
    <TelegramJoinCard />

    <MoreFromSourceCard
      :source-name="sourceName"
      :articles="moreFromSource"
    />

    <PopularArticlesCard :articles="popularArticles" />
  </aside>
</template>