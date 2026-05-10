<script setup lang="ts">
import { MoreHorizontal, X } from "lucide-vue-next";

export interface AppDropdownItem {
  label: string;
  value: string;
  icon?: any;
  description?: string;
  variant?: "default" | "success" | "warning" | "danger";
  disabled?: boolean;
  visible?: boolean;
}

const props = withDefaults(
  defineProps<{
    items: AppDropdownItem[];
    buttonIcon?: any;
    buttonLabel?: string;
    align?: "left" | "right";
    width?: string;
  }>(),
  {
    buttonLabel: "",
    align: "right",
    width: "w-64",
  }
);

const emit = defineEmits<{
  (e: "select", value: string): void;
}>();

const open = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const currentButtonIcon = computed(() => {
  return props.buttonIcon || MoreHorizontal;
});

const visibleItems = computed(() => {
  return props.items.filter((item) => item.visible !== false);
});

const itemClass = (variant?: AppDropdownItem["variant"]) => {
  const variants: Record<string, string> = {
    default: "text-ui hover:bg-surface-soft",
    success:
      "text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-950/40",
    warning:
      "text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/40",
    danger: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40",
  };

  return variants[variant || "default"];
};

const panelStyle = computed(() => {
  if (!import.meta.client || !dropdownRef.value) {
    return {};
  }

  const rect = dropdownRef.value.getBoundingClientRect();
  const spacing = 8;

  return {
    top: `${rect.bottom + spacing}px`,
    left: props.align === "left" ? `${rect.left}px` : "auto",
    right: props.align === "right" ? `${window.innerWidth - rect.right}px` : "auto",
  };
});

const toggle = () => {
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

const handleSelect = (item: AppDropdownItem) => {
  if (item.disabled) return;

  emit("select", item.value);
  close();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    close();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative inline-block text-left"
    data-ignore-row-click="true"
  >
    <button
      type="button"
      class="transition-smooth active-press inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-ui bg-surface px-3 text-sm font-semibold text-muted shadow-sm hover:-translate-y-0.5 hover:bg-surface-soft hover:text-ui"
      :class="open ? 'bg-surface-soft text-ui' : ''"
      @click.stop="toggle"
    >
      <component :is="currentButtonIcon" class="h-5 w-5" />

      <span v-if="buttonLabel">
        {{ buttonLabel }}
      </span>
    </button>

    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="open"
          class="fixed inset-0 z-[80]"
          data-ignore-row-click="true"
          @click.self="close"
        >
          <div
            :class="[
              'ui-card absolute z-[90] overflow-hidden rounded-3xl p-2 shadow-xl',
              width,
            ]"
            :style="panelStyle"
          >
            <div v-if="visibleItems.length" class="space-y-1">
              <button
                v-for="item in visibleItems"
                :key="item.value"
                type="button"
                :disabled="item.disabled"
                :class="[
                  'transition-smooth flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  itemClass(item.variant),
                ]"
                @click="handleSelect(item)"
              >
                <span
                  v-if="item.icon"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ui bg-surface"
                >
                  <component :is="item.icon" class="h-4 w-4" />
                </span>

                <span class="min-w-0 flex-1">
                  <span class="block truncate">
                    {{ item.label }}
                  </span>

                  <span
                    v-if="item.description"
                    class="mt-0.5 block truncate text-xs font-normal text-muted"
                  >
                    {{ item.description }}
                  </span>
                </span>
              </button>
            </div>

            <div v-else class="px-4 py-8 text-center">
              <X class="mx-auto h-8 w-8 text-soft" />

              <p class="mt-3 text-sm font-semibold text-ui">No actions</p>

              <p class="mt-1 text-xs text-muted">There are no available actions.</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
