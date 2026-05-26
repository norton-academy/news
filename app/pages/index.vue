<script setup lang="ts">
import ProvinceFilter from "~/components/public/home/ProvinceFilter.vue";
import TopAdvertisement from "~/components/public/home/TopAdvertisement.vue";
import FeaturedNewsGrid from "~/components/public/home/FeaturedNewsGrid.vue";
import LatestNewsList from "~/components/public/home/LatestNewsList.vue";
import HomeSidebar from "~/components/public/home/HomeSidebar.vue";

definePageMeta({
  layout: "public",
  title: "Cambodia News Hub",
});

const homeStore = usePublicHomeStore();

await useAsyncData("public-home", () => homeStore.fetchHome());

const featuredArticles = computed(() => homeStore.featuredArticles);
const latestArticles = computed(() => homeStore.latestArticles);
const provinces = computed(() => homeStore.provinces);
const popularArticles = computed(() => homeStore.popularArticles);
const weather = computed(() => homeStore.weather);
const advertisements = computed(() => homeStore.advertisements);
const sources = computed(() => homeStore.sources);

const selectedSources = ref<string[]>([]);

const provinceTabs = computed(() => {
  return provinces.value.slice(0, 6);
});

const filteredFeaturedArticles = computed(() => {
  if (!selectedSources.value.length) {
    return featuredArticles.value;
  }

  return featuredArticles.value.filter((article) => {
    return article.source?.slug && selectedSources.value.includes(article.source.slug);
  });
});

const filteredLatestArticles = computed(() => {
  if (!selectedSources.value.length) {
    return latestArticles.value;
  }

  return latestArticles.value.filter((article) => {
    return article.source?.slug && selectedSources.value.includes(article.source.slug);
  });
});

const filteredPopularArticles = computed(() => {
  if (!selectedSources.value.length) {
    return popularArticles.value;
  }

  return popularArticles.value.filter((article) => {
    return article.source?.slug && selectedSources.value.includes(article.source.slug);
  });
});

const toggleSource = (slug: string) => {
  if (selectedSources.value.includes(slug)) {
    selectedSources.value = selectedSources.value.filter((item) => item !== slug);
    return;
  }

  selectedSources.value = [...selectedSources.value, slug];
};

const clearSources = () => {
  selectedSources.value = [];
};
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <ProvinceFilter :provinces="provinceTabs" />

    <TopAdvertisement :advertisements="advertisements" />

    <AlertMessage
      v-if="homeStore.errorMessage"
      type="error"
      title="Unable to load homepage"
      :message="homeStore.errorMessage"
      class="mb-5"
    />

    <div
      v-if="homeStore.loading"
      class="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500"
    >
      Loading news...
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[1fr_390px]">
      <div class="space-y-6">
        <div
          v-if="selectedSources.length"
          class="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700"
        >
          Filtering by {{ selectedSources.length }} source(s).
          <button class="ml-2 underline" @click="clearSources">
            Clear filter
          </button>
        </div>

        <FeaturedNewsGrid :articles="filteredFeaturedArticles" />

        <LatestNewsList :articles="filteredLatestArticles" />
      </div>

      <HomeSidebar
        :weather="weather"
        :popular-articles="filteredPopularArticles"
        :advertisements="advertisements"
        :sources="sources"
        :selected-sources="selectedSources"
        @toggle-source="toggleSource"
        @clear-sources="clearSources"
      />
    </div>
  </div>
</template>