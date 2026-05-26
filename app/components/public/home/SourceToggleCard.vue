<script setup lang="ts">
import { Square } from "lucide-vue-next";

const sources = [
  { name: "Fresh News", short: "FN", color: "bg-blue-100 text-blue-700", active: true },
  { name: "VOD Khmer", short: "VD", color: "bg-emerald-100 text-emerald-700", active: true },
  { name: "RFA Khmer", short: "RF", color: "bg-amber-100 text-amber-700", active: true },
  { name: "Dap News", short: "DN", color: "bg-slate-100 text-slate-700", active: false },
];
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="flex items-center gap-2 font-black text-slate-700">
        <Square class="h-3 w-3 text-slate-400" />
        ប្រភពព័ត៌មាន
      </h3>
    </div>

    <div>
      <div
        v-for="source in sources"
        :key="source.name"
        class="flex items-center justify-between border-b border-slate-100 px-5 py-4 last:border-b-0"
      >
        <div class="flex items-center gap-3">
          <div
            :class="source.color"
            class="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black"
          >
            {{ source.short }}
          </div>

          <div>
            <p class="font-bold text-slate-700">{{ source.name }}</p>
            <p class="text-xs text-slate-400">ប្រភពព័ត៌មាន</p>
          </div>
        </div>

        <button
          class="relative h-6 w-11 rounded-full transition"
          :class="source.active ? 'bg-blue-700' : 'bg-slate-300'"
        >
          <span
            class="absolute top-1 h-4 w-4 rounded-full bg-white transition"
            :class="source.active ? 'right-1' : 'left-1'"
          />
        </button>
      </div>
    </div>
  </section>
</template>