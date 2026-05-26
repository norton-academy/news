<script setup lang="ts">
import { ExternalLink, ImageIcon } from "lucide-vue-next";
import type { Advertisement } from "~/types/news";

const props = defineProps<{
  advertisements: Advertisement[];
}>();

const ad = computed(() => {
  return props.advertisements.find((item) => item.placement === "homepage_top") || null;
});
</script>

<template>
  <section
    v-if="ad"
    class="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
  >
    <a
      v-if="ad.link_url"
      :href="ad.link_url"
      target="_blank"
      rel="noopener noreferrer"
      class="block"
    >
      <div v-if="ad.image" class="h-28 bg-[#efeee9] md:h-36">
        <img
          :src="ad.image"
          :alt="ad.title"
          class="h-full w-full object-cover"
        />
      </div>

      <div
        v-else
        class="flex h-28 items-center justify-center gap-3 bg-blue-50 px-5 text-blue-700 md:h-36"
      >
        <ImageIcon class="h-6 w-6" />
        <div>
          <p class="text-xs font-black uppercase">Advertisement</p>
          <p class="font-black">{{ ad.title }}</p>
        </div>
        <ExternalLink class="h-4 w-4" />
      </div>
    </a>

    <div v-else>
      <div v-if="ad.image" class="h-28 bg-[#efeee9] md:h-36">
        <img
          :src="ad.image"
          :alt="ad.title"
          class="h-full w-full object-cover"
        />
      </div>

      <div
        v-else
        class="flex h-28 items-center justify-center gap-3 bg-blue-50 px-5 text-blue-700 md:h-36"
      >
        <ImageIcon class="h-6 w-6" />
        <div>
          <p class="text-xs font-black uppercase">Advertisement</p>
          <p class="font-black">{{ ad.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>