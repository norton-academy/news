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
const toast = useToast()

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

    toast.success('User deleted', 'The user account was deleted successfully.')
    emit('deleted')
    handleClose()
  } catch (error: any) {
    generalError.value = error.message || 'Failed to delete user'
    toast.error('Delete failed', generalError.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppModal
    :open="open"
    title="Delete User"
    subtitle="This action cannot be undone."
    size="sm"
    @close="handleClose"
  >
    <div class="space-y-5">
      <div
        v-if="generalError"
        class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
      >
        {{ generalError }}
      </div>

      <div class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
        <p class="text-sm text-slate-700">
          Are you sure you want to delete this user?
        </p>

        <div class="mt-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <p class="text-sm font-semibold text-slate-900">
            {{ user?.name || 'Unknown User' }}
          </p>

          <p class="text-sm text-slate-500">
            {{ user?.email || '-' }}
          </p>

          <p class="mt-1 text-xs text-slate-400">
            Role: {{ user?.role || 'No Role' }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
        <AppButton
          type="button"
          variant="secondary"
          @click="handleClose"
        >
          Cancel
        </AppButton>

        <AppButton
          type="button"
          variant="danger"
          :loading="loading"
          @click="handleDelete"
        >
          Delete User
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>