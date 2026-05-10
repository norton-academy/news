<script setup lang="ts">
withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    subtitle?: string;
    size?: "sm" | "md" | "lg" | "xl";
  }>(),
  {
    title: "",
    subtitle: "",
    size: "md",
  }
);

const emit = defineEmits<{
  (e: "close"): void;
}>();

const sizeClass = computed(() => {
  return {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-overlay">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          @click="emit('close')"
        />

        <Transition name="modal-panel" appear>
          <div
            :class="[
              'relative z-10 max-h-[92vh] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950',
              sizeClass,
            ]"
          >
            <div
              v-if="title || subtitle || $slots.icon"
              class="flex items-start gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800"
            >
              <div
                v-if="$slots.icon"
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                <slot name="icon" />
              </div>

              <div class="min-w-0 flex-1">
                <h2 v-if="title" class="text-lg font-bold text-ui">
                  {{ title }}
                </h2>

                <p v-if="subtitle" class="mt-1 text-sm text-muted">
                  {{ subtitle }}
                </p>
              </div>

              <button
                type="button"
                class="transition-smooth rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                @click="emit('close')"
              >
                ✕
              </button>
            </div>

            <div class="max-h-[calc(92vh-96px)] overflow-y-auto p-6">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
