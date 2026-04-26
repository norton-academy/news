<script setup lang="ts">
const props = defineProps<{
  search: string
  status: string
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:status', value: string): void
  (e: 'refresh'): void
}>()
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="grid gap-4 sm:grid-cols-2 lg:w-full lg:max-w-2xl">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Search
          </label>
          <input
            :value="search"
            type="text"
            placeholder="Search by name or email..."
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            @input="emit('update:search', ($event.target as HTMLInputElement).value)"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            :value="status"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            @change="emit('update:status', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          @click="emit('refresh')"
        >
          Refresh
        </button>

        <button
          class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Add User
        </button>
      </div>
    </div>
  </div>
</template>