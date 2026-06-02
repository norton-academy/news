<script setup lang="ts">
import ProvinceFilter from "~/components/public/home/ProvinceFilter.vue";
import HeroNewsSection from "~/components/public/home/HeroNewsSection.vue";
import CategoryNewsSection from "~/components/public/home/CategoryNewsSection.vue";
import HomeSkeleton from "~/components/public/home/HomeSkeleton.vue";

definePageMeta({
  layout: "public",
  title: "Cambodia News Hub",
});

const homeStore = usePublicHomeStore();

await useAsyncData("public-home", () => homeStore.fetchHome());

const featuredArticles = computed(() => homeStore.featuredArticles);
const latestArticles = computed(() => homeStore.latestArticles);
const provinces = computed(() => homeStore.provinces);
const categorySections = computed(() => homeStore.categorySections);

const provinceTabs = computed(() => {
  return provinces.value.slice(0, 8);
});

const topStories = computed(() => {
  const featuredIds = new Set(featuredArticles.value.map((item) => item.id));

  return [
    ...featuredArticles.value,
    ...latestArticles.value.filter((item) => !featuredIds.has(item.id)),
  ].slice(0, 4);
});
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <ProvinceFilter :provinces="provinceTabs" />

    <AlertMessage
      v-if="homeStore.errorMessage"
      type="error"
      title="Unable to load homepage"
      :message="homeStore.errorMessage"
      class="mb-5"
    />

    <HomeSkeleton v-if="homeStore.loading" />

    <main v-else class="space-y-8">
      <HeroNewsSection :articles="topStories" />

      <CategoryNewsSection
        v-for="section in categorySections"
        :key="section.category.id"
        :category="section.category"
        :articles="section.articles"
      />
    </main>
  </div>
</template>