<script setup lang="ts">
interface OptionItem {
  label: string
  value: string | number
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null
    label?: string
    options: OptionItem[]
    placeholder?: string
    error?: string
    disabled?: boolean
  }>(),
  {
    label: '',
    placeholder: 'Select option',
    error: '',
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectClass = computed(() => {
  return [
    'w-full rounded-xl border px-4 py-3 text-sm outline-none transition',
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
    props.error
      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
      : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100',
  ]
})
</script>

<template>
  <div>
    <label
      v-if="label"
      class="mb-2 block text-sm font-medium text-slate-700"
    >
      {{ label }}
    </label>

    <select
      :value="modelValue"
      :disabled="disabled"
      :class="selectClass"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <p v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>