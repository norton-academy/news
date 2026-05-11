<script setup lang="ts">
const props = withDefaults(
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
  }[props.size];
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          @click="emit('close')"
        />

        <div
          :class="[
            'relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900',
            sizeClass,
          ]"
        >
          <div
            v-if="title || subtitle || $slots.header"
            class="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800"
          >
            <slot name="header">
              <div class="flex items-start gap-3">
                <div
                  v-if="$slots.icon"
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                >
                  <slot name="icon" />
                </div>

                <div>
                  <h2
                    v-if="title"
                    class="text-xl font-bold text-slate-900 dark:text-white"
                  >
                    {{ title }}
                  </h2>
                  <p
                    v-if="subtitle"
                    class="mt-1 text-sm text-slate-500 dark:text-slate-400"
                  >
                    {{ subtitle }}
                  </p>
                </div>
              </div>
            </slot>

            <button
              class="rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              @click="emit('close')"
            >
              Close
            </button>
          </div>

          <div class="px-6 py-6 text-slate-700 dark:text-slate-300">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="border-t border-slate-200 px-6 py-4 dark:border-slate-800"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>
