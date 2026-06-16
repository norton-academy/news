<script setup lang="ts">

type DropdownAlign = 'start' | 'end'

interface Props {
  align?: DropdownAlign
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  align: 'end',
  width: 'w-56',
})

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const panelClass = computed(() => {
  return [
    'absolute z-40 mt-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950',
    props.width,
    props.align === 'end' ? 'right-0' : 'left-0',
  ]
})

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

onClickOutside(dropdownRef, close)
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative inline-block text-left"
  >
    <div @click="toggle">
      <slot name="trigger" :open="isOpen" />
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-1 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-1 opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="panelClass"
        @click="close"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>