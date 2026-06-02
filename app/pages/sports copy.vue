<script setup lang="ts">
import PublicCategoryPage from "~/components/public/pages/PublicCategoryPage.vue";

definePageMeta({
  layout: "public",
  title: "Sports",
});
</script>

<template>
  <PublicCategoryPage
    title-km="កីឡា"
    title-en="Sports"
    subtitle-km="ព័ត៌មានកីឡាថ្មីៗក្នុងស្រុក និងអន្តរជាតិ។"
    subtitle-en="Latest local and international sports news."
    category-slug="sports"
  />
</template>