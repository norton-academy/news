<script setup lang="ts">
export interface DataTableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  width?: string
}

const props = withDefaults(
  defineProps<{
    columns: DataTableColumn[]
    rows: Record<string, any>[]
    loading?: boolean
    emptyTitle?: string
    emptyMessage?: string
  }>(),
  {
    loading: false,
    emptyTitle: 'No data found',
    emptyMessage: 'There are no records to display.',
  }
)

const alignmentClass = (align?: string) => {
  const alignments: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return alignments[align || 'left']
}
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500',
                alignmentClass(column.align),
              ]"
              :style="{ width: column.width }"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td
              :colspan="columns.length"
              class="px-6 py-12 text-center text-sm text-slate-500"
            >
              Loading data...
            </td>
          </tr>

          <tr v-else-if="rows.length === 0">
            <td :colspan="columns.length">
              <EmptyState
                :title="emptyTitle"
                :message="emptyMessage"
              />
            </td>
          </tr>

          <tr
            v-for="row in rows"
            v-else
            :key="row.id"
            class="hover:bg-slate-50"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-4 text-sm text-slate-700',
                alignmentClass(column.align),
              ]"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :value="row[column.key]"
              >
                {{ row[column.key] ?? '-' }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>