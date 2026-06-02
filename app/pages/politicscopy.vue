<script setup lang="ts">
import PublicCategoryPage from "~/components/public/pages/PublicCategoryPage.vue";

definePageMeta({
  layout: "public",
  title: "Politics",
});
</script>

<template>
  <PublicCategoryPage
    title-km="នយោបាយ"
    title-en="Politics"
    subtitle-km="ព័ត៌មាននយោបាយថ្មីៗនៅកម្ពុជា។"
    subtitle-en="Latest political news in Cambodia."
    category-slug="politics"
  />
</template>