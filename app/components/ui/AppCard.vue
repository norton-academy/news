<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: "",
    subtitle: "",
  }
);
</script>

<template>
  <div class="ui-card rounded-3xl transition-colors">
    <div
      v-if="title || subtitle || $slots.header"
      class="border-b border-slate-200 px-6 py-4 dark:border-slate-800"
    >
      <slot name="header">
        <h3 v-if="title" class="text-lg font-bold text-ui">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="mt-1 text-sm text-muted">
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <div class="p-6">
      <slot />
    </div>
  </div>
</template>
