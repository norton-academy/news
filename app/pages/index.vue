<script setup lang="ts">
import { computed } from "vue"
import { ChevronRight } from "lucide-vue-next"
import { useArticleFeed } from "~/composables/useArticleFeed"

definePageMeta({
  layout: "public",
})

const {
  activeFilter,
  breakingArticles,
  filteredArticles,
  featuredArticle,
  secondaryArticles,
  trendingArticles,
  setFilter,
} = useArticleFeed()

const activeFilterDescription = computed(() => {
  const descriptions: Record<string, string> = {
    latest: "រឿងថ្មីបំផុត",
    popular: "ដែលបានអានច្រើនបំផុតថ្ងៃនេះ",
    trending: "កំពុង​កើនឡើង​យ៉ាងលឿន​នៅ៦ម៉ោង​ចុងក្រោយ",
    breaking: "ព័ត៌មាន​បន្ទាន់​ប៉ុណ្ណោះ",
    editors_pick: "ជ្រើសរើស​ដោយ​ក្រុម​អ្នកកែសម្រួល",
  }
  return descriptions[activeFilter.value] ?? ""
})
</script>

<template>
  <div
    class="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-500"
  >
    <!-- Breaking News Banner -->
    <BreakingNewsBanner :articles="breakingArticles" />

    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Feed Filter Tabs -->
      <FeedFilterTabs
        v-model="activeFilter"
        :breaking-count="breakingArticles.length"
        :description="activeFilterDescription"
      />

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        <!-- ── Main Feed ─────────────────────────────────────────── -->
        <section class="xl:col-span-3">
          <transition name="fade-layout" mode="out-in">
            <div :key="activeFilter">
              <!-- Empty State -->
              <ArticleEmptyState
                v-if="filteredArticles.length === 0"
                :active-filter="activeFilter"
                @reset="setFilter('latest')"
              />

              <div v-else class="space-y-8">
                <!-- Featured Article -->
                <FeaturedArticleHeroCard
                  v-if="featuredArticle"
                  :article="featuredArticle"
                />

                <!-- Section Divider -->
                <div class="flex items-center gap-4 select-none">
                  <span
                    class="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500"
                  >
                    Stream Registry
                  </span>
                  <div class="flex-1 h-px bg-slate-200/60 dark:bg-slate-800/80"></div>
                </div>

                <!-- Article Grid -->
                <div class="relative">
                  <TransitionGroup
                    name="card-grid"
                    tag="div"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <ArticleCard
                      v-for="article in secondaryArticles"
                      :key="article.id"
                      :article="article"
                    />
                  </TransitionGroup>
                </div>

                <!-- Load More -->
                <div class="pt-4 text-center">
                  <button
                    class="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white dark:hover:bg-slate-900 shadow-xs hover:shadow-md active:scale-98 transition-all duration-200"
                  >
                    <span>Load more stories</span>
                    <ChevronRight class="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </section>

        <!-- ── Sidebar ────────────────────────────────────────────── -->
        <NewsSidebar :trending-articles="trendingArticles" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-grid-enter-active,
.card-grid-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-grid-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.card-grid-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
.card-grid-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-grid-leave-active {
  position: absolute !important;
  visibility: hidden;
  width: 100%;
  max-width: 290px;
}

.fade-layout-enter-active,
.fade-layout-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-layout-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-layout-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
.fade-layout-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-layout-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
.fade-layout-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-layout-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
.fade-layout-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-layout-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
