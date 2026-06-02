<script setup lang="ts">
import PublicCategoryPage from "~/components/public/pages/PublicCategoryPage.vue";

definePageMeta({
  layout: "public",
  title: "Entertainment",
});
</script>

<template>
  <PublicCategoryPage
    title-km="កម្សាន្ត"
    title-en="Entertainment"
    subtitle-km="ព័ត៌មានសិល្បៈ កម្សាន្ត និងវប្បធម៌។"
    subtitle-en="Entertainment, arts, and culture news."
    category-slug="entertainment"
  />
</template>