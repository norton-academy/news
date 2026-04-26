<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    type?: string
    placeholder?: string
    error?: string
    required?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
    required: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputClass = computed(() => {
  return [
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200',
    'placeholder:text-slate-400',
    'focus:ring-4',
    props.error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100',
  ]
})
</script>

<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :class="inputClass"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>