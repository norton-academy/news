<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { useEntertainmentFeed, ENTERTAINMENT_SUB_TOPICS } from '~/composables/useEntertainmentFeed'

definePageMeta({
  layout: 'public',
})

useSeoMeta({
  title: 'Entertainment',
  description: 'Latest Cambodia entertainment news covering movies, music, TV, celebrities, events, and lifestyle.',
})

const {
  activeTopic,
  breakingArticles,
  filteredArticles,
  featuredArticle,
  gridArticles,
  trendingArticles,
  topicIcon,
  topicLabel,
  setTopic,
} = useEntertainmentFeed()
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 antialiased">
    <NewBreakingBanner :articles="breakingArticles" />

    <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        <section class="xl:col-span-3 min-w-0">
          <NewEmptyState
            v-if="filteredArticles.length === 0"
            :topic-label="topicLabel(activeTopic)"
            @reset="setTopic('all')"
          />

          <div v-else>
            <NewHeroCard
              v-if="featuredArticle"
              :article="featuredArticle"
              :topic-icon="topicIcon(featuredArticle.topic)"
              :topic-label="topicLabel(featuredArticle.topic)"
            />

            <div class="flex items-center gap-4 mb-6">
              <span class="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                More Stories
              </span>
              <div class="flex-1 h-px bg-slate-200/60 dark:bg-slate-800/80"></div>
            </div>

            <TransitionGroup
              name="card-grid"
              tag="div"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative"
            >
              <NewArticleCard
                v-for="article in gridArticles"
                :key="article.id"
                :article="article"
                :topic-icon="topicIcon(article.topic)"
                :topic-label="topicLabel(article.topic)"
              />
            </TransitionGroup>

            <div class="mt-10 text-center">
              <button class="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold rounded-full hover:border-red-200 dark:hover:border-red-900 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 active:scale-95 transition-all duration-300 shadow-xs cursor-pointer">
                Load more stories <ChevronRight class="size-4" />
              </button>
            </div>
          </div>
        </section>

        <NewSidebar
          v-model:active-topic="activeTopic"
          :sub-topics="ENTERTAINMENT_SUB_TOPICS"
          :trending-articles="trendingArticles"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-grid-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-grid-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: absolute;
  z-index: 0;
  pointer-events: none;
}
.card-grid-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
}
.card-grid-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
.card-grid-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
