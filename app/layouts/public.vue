<script setup lang="ts">
import SiteHeader from "~/components/public/SiteHeader.vue";
import SiteFooter from "~/components/public/SiteFooter.vue";

const languageStore = usePublicLanguageStore();

onMounted(() => {
  languageStore.initLanguage();
});
</script>

<template>
  <div
    class="min-h-screen bg-[#f7f6f2] text-slate-900 antialiased"
    :lang="languageStore.language"
  >
    <SiteHeader />

    <main class="min-h-[60vh]">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>