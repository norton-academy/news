<script setup lang="ts">
import type { UserItem } from '~/composables/useUser'

const props = defineProps<{
  open: boolean
  user: UserItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'deleted'): void
}>()

const { deleteUser } = useUser()

const loading = ref(false)
const generalError = ref('')

const handleClose = () => {
  generalError.value = ''
  emit('close')
}

const handleDelete = async () => {
  if (!props.user) return

  generalError.value = ''
  loading.value = true

  try {
    await deleteUser(props.user.id)
    emit('deleted')
    handleClose()
  } catch (error: any) {
    generalError.value = error.message || 'Failed to delete user'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50" @click="handleClose" />

      <div class="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div class="border-b border-slate-200 px-6 py-4">
          <h2 class="text-xl font-bold text-slate-900">Delete User</h2>
          <p class="mt-1 text-sm text-slate-500">
            This action cannot be undone.
          </p>
        </div>

        <div class="space-y-4 px-6 py-6">
          <div
            v-if="generalError"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {{ generalError }}
          </div>

          <div class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
            <p class="text-sm text-slate-700">
              Are you sure you want to delete this user?
            </p>

            <div class="mt-3 rounded-lg bg-white px-4 py-3 border border-slate-200">
              <p class="text-sm font-semibold text-slate-900">
                {{ props.user?.name || 'Unknown User' }}
              </p>
              <p class="text-sm text-slate-500">
                {{ props.user?.email || '-' }}
              </p>
              <p class="mt-1 text-xs text-slate-400">
                Role: {{ props.user?.role || 'No Role' }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="handleClose"
            >
              Cancel
            </button>

            <button
              type="button"
              :disabled="loading"
              class="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              @click="handleDelete"
            >
              {{ loading ? 'Deleting...' : 'Delete User' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>