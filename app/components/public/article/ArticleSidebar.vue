<script setup lang="ts">
import type { Advertisement, Article } from "~/types/news";

import TelegramJoinCard from "./TelegramJoinCard.vue";
import MoreFromSourceCard from "./MoreFromSourceCard.vue";
import PopularArticlesCard from "./PopularArticlesCard.vue";
import ArticleAdvertisementCard from "./ArticleAdvertisementCard.vue";

defineProps<{
  sourceName: string;
  moreFromSource: Article[];
  popularArticles: Article[];
  advertisements?: Advertisement[];
}>();
</script>

<template>
  <aside class="space-y-5">
    <TelegramJoinCard />

    <ArticleAdvertisementCard :advertisements="advertisements" />

    <MoreFromSourceCard
      :source-name="sourceName"
      :articles="moreFromSource"
    />

    <PopularArticlesCard :articles="popularArticles" />
  </aside>
</template>