<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    columns?: "1" | "2" | "3" | "4";
  }>(),
  {
    title: "",
    subtitle: "",
    columns: "4",
  }
);

const gridClass = computed(() => {
  return {
    "1": "md:grid-cols-1",
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4",
  }[props.columns];
});
</script>

<template>
  <div class="ui-card rounded-3xl p-4">
    <div v-if="title || subtitle || $slots.header" class="mb-4 flex flex-col gap-1">
      <slot name="header">
        <h3 v-if="title" class="text-sm font-bold text-ui">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-muted">
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div :class="['grid flex-1 gap-4', gridClass]">
        <slot />
      </div>

      <div v-if="$slots.actions" class="flex flex-wrap items-center gap-3 lg:justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
