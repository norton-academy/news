<script setup lang="ts">
import { ImageIcon } from "lucide-vue-next";
import type { Advertisement } from "~/types/news";

const props = defineProps<{
  advertisements?: Advertisement[];
}>();

const ad = computed(() => {
  return props.advertisements?.find((item) => item.placement === "article_sidebar") || null;
});
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-[#fbfaf7] text-center">
    <template v-if="ad">
      <a
        v-if="ad.link_url"
        :href="ad.link_url"
        target="_blank"
        rel="noopener noreferrer"
        class="block"
      >
        <div v-if="ad.image" class="h-44 bg-[#efeee9]">
          <img
            :src="ad.image"
            :alt="ad.title"
            class="h-full w-full object-cover"
          />
        </div>

        <div v-else class="flex h-36 items-center justify-center bg-[#efeee9]">
          <ImageIcon class="h-8 w-8 text-slate-400" />
        </div>

        <div class="p-5">
          <p class="text-xs font-bold uppercase text-slate-400">
            Advertisement
          </p>
          <p class="mt-2 font-black text-slate-700">
            {{ ad.title }}
          </p>
        </div>
      </a>

      <div v-else>
        <div v-if="ad.image" class="h-44 bg-[#efeee9]">
          <img
            :src="ad.image"
            :alt="ad.title"
            class="h-full w-full object-cover"
          />
        </div>

        <div v-else class="flex h-36 items-center justify-center bg-[#efeee9]">
          <ImageIcon class="h-8 w-8 text-slate-400" />
        </div>

        <div class="p-5">
          <p class="text-xs font-bold uppercase text-slate-400">
            Advertisement
          </p>
          <p class="mt-2 font-black text-slate-700">
            {{ ad.title }}
          </p>
        </div>
      </div>
    </template>

    <div v-else class="p-6">
      <p class="text-sm font-bold text-slate-400">Advertisement</p>
      <p class="mt-3 text-lg font-black text-slate-700">
        Article Sidebar Slot
      </p>
    </div>
  </section>
</template>