<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface SidebarItem {
  label: string
  to: string
  icon?: Component
  badge?: string | number
  active?: boolean
}

interface Props {
  modelValue?: boolean
  items?: SidebarItem[]
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  items: () => [],
  title: 'Cobo Core',
  description: 'Admin System',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function closeSidebar() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        @click.self="closeSidebar"
      >
        <Transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="duration-150 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <aside class="h-full w-80 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div class="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
              <UiLogo
                :name="title"
                :subtitle="description"
              />

              <UiIconButton
                label="Close sidebar"
                variant="ghost"
                @click="closeSidebar"
              >
                <X class="size-5" />
              </UiIconButton>
            </div>

            <nav class="space-y-1 p-4">
              <NuxtLink
                v-for="item in items"
                :key="item.to"
                :to="item.to"
                :class="[
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  item.active
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                ]"
                @click="closeSidebar"
              >
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="size-4 shrink-0"
                />

                <span class="min-w-0 flex-1 truncate">
                  {{ item.label }}
                </span>

                <UiBadge
                  v-if="item.badge"
                  size="sm"
                  variant="outline"
                >
                  {{ item.badge }}
                </UiBadge>
              </NuxtLink>
            </nav>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>

  <aside class="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:block">
    <div class="flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800">
      <UiLogo
        :name="title"
        :subtitle="description"
      />
    </div>

    <nav class="space-y-1 p-4">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
          item.active
            ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
        ]"
      >
        <component
          :is="item.icon"
          v-if="item.icon"
          class="size-4 shrink-0"
        />

        <span class="min-w-0 flex-1 truncate">
          {{ item.label }}
        </span>

        <UiBadge
          v-if="item.badge"
          size="sm"
          variant="outline"
        >
          {{ item.badge }}
        </UiBadge>
      </NuxtLink>
    </nav>
  </aside>
</template>