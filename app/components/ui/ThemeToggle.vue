<script setup lang="ts">
import { Check, Monitor, Moon, Sun } from "lucide-vue-next";
import type { ThemeMode } from "~/stores/theme";

const theme = useThemeStore();

const open = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const options: {
  label: string;
  description: string;
  value: ThemeMode;
  icon: typeof Sun;
}[] = [
  {
    label: "Light",
    description: "Clean bright interface",
    value: "light",
    icon: Sun,
  },
  {
    label: "Dark",
    description: "Low-light dashboard mode",
    value: "dark",
    icon: Moon,
  },
  {
    label: "System",
    description: "Follow device setting",
    value: "system",
    icon: Monitor,
  },
];

const currentOption = computed(() => {
  return options.find((item) => item.value === theme.mode) || options[2];
});

const selectTheme = (mode: ThemeMode) => {
  theme.setTheme(mode);
  open.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!dropdownRef.value) return;

  if (!dropdownRef.value.contains(event.target as Node)) {
    open.value = false;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      class="transition-smooth active-press inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ui bg-surface text-ui shadow-sm hover:-translate-y-0.5 hover:bg-surface-soft"
      :title="`Theme: ${currentOption.label}`"
      @click.stop="open = !open"
    >
      <component :is="currentOption.icon" class="h-5 w-5" />
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="ui-card absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-3xl p-2 shadow-xl"
      >
        <div class="px-3 py-2">
          <p class="text-xs font-bold uppercase tracking-wider text-soft">Appearance</p>
          <p class="mt-1 text-sm text-muted">Choose your dashboard theme.</p>
        </div>

        <div class="mt-1 space-y-1">
          <button
            v-for="item in options"
            :key="item.value"
            type="button"
            class="transition-smooth flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left hover:bg-surface-soft"
            :class="theme.mode === item.value ? 'bg-surface-soft' : ''"
            @click="selectTheme(item.value)"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-2xl border border-ui bg-surface"
                :class="
                  theme.mode === item.value
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-muted'
                "
              >
                <component :is="item.icon" class="h-5 w-5" />
              </div>

              <div>
                <p class="text-sm font-bold text-ui">
                  {{ item.label }}
                </p>
                <p class="mt-0.5 text-xs text-muted">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <div
              v-if="theme.mode === item.value"
              class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-400 dark:text-slate-950"
            >
              <Check class="h-4 w-4" />
            </div>
          </button>
        </div>

        <div class="mt-2 border-t border-ui px-3 py-3">
          <p class="text-xs text-muted">
            Current:
            <span class="font-semibold text-ui">
              {{ currentOption.label }}
            </span>
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
