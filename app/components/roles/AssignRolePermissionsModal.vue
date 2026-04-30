<script setup lang="ts">
import type { RoleItem } from '~/composables/useRole'
import type { PermissionItem } from '~/composables/usePermission'

const props = defineProps<{
  open: boolean
  role: RoleItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'saved'): void
}>()

const { getRole, syncRolePermissions } = useRole()
const { getAllPermissions } = usePermission()
const toast = useToast()

const loading = ref(false)
const saving = ref(false)
const errorMessage = ref('')

const permissions = ref<PermissionItem[]>([])
const selectedPermissions = ref<string[]>([])

const groupedPermissions = computed(() => {
  const groups: Record<string, PermissionItem[]> = {}

  permissions.value.forEach((permission) => {
    const moduleName = permission.name.split('.')[0] || 'other'

    if (!groups[moduleName]) {
      groups[moduleName] = []
    }

    groups[moduleName].push(permission)
  })

  return groups
})

const isAllSelectedInGroup = (groupPermissions: PermissionItem[]) => {
  return groupPermissions.every((permission) =>
    selectedPermissions.value.includes(permission.name)
  )
}

const toggleGroup = (groupPermissions: PermissionItem[]) => {
  const allSelected = isAllSelectedInGroup(groupPermissions)

  if (allSelected) {
    selectedPermissions.value = selectedPermissions.value.filter(
      (name) => !groupPermissions.some((permission) => permission.name === name)
    )
  } else {
    const names = groupPermissions.map((permission) => permission.name)
    selectedPermissions.value = Array.from(
      new Set([...selectedPermissions.value, ...names])
    )
  }
}

const fetchData = async () => {
  if (!props.role) return

  loading.value = true
  errorMessage.value = ''

  try {
    const [permissionsData, roleData] = await Promise.all([
      getAllPermissions(),
      getRole(props.role.id),
    ])

    permissions.value = permissionsData
    selectedPermissions.value =
      roleData.data.role.permissions?.map((permission) => permission.name) || []
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to load role permissions'
  } finally {
    loading.value = false
  }
}

watch(
  () => props.open,
  async (value) => {
    if (value && props.role) {
      await fetchData()
    }
  }
)

const handleClose = () => {
  errorMessage.value = ''
  selectedPermissions.value = []
  emit('close')
}

const handleSave = async () => {
  if (!props.role) return

  saving.value = true
  errorMessage.value = ''

  try {
    await syncRolePermissions(props.role.id, {
      permissions: selectedPermissions.value,
    })

    toast.success('Permissions updated', 'Role permissions were updated successfully.')
    emit('saved')
    handleClose()
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to save permissions'
    toast.error('Permission update failed', errorMessage.value)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-slate-900/50" @click="handleClose" />

      <div class="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 class="text-xl font-bold text-slate-900">
              Assign Permissions
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Role:
              <strong>{{ props.role?.name }}</strong>
            </p>
          </div>

          <button
            class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            @click="handleClose"
          >
            Close
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-6">
          <div
            v-if="errorMessage"
            class="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {{ errorMessage }}
          </div>

          <div
            v-if="loading"
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500"
          >
            Loading permissions...
          </div>

          <div v-else class="space-y-5">
            <div class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950/40">
              Selected permissions:
              <strong>{{ selectedPermissions.length }}</strong>
            </div>

            <div
              v-for="(groupPermissions, moduleName) in groupedPermissions"
              :key="moduleName"
              class="rounded-2xl border border-slate-200 bg-white"
            >
              <div class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div>
                  <h3 class="text-sm font-bold capitalize text-slate-900">
                    {{ moduleName }}
                  </h3>
                  <p class="text-xs text-slate-500">
                    {{ groupPermissions.length }} permissions
                  </p>
                </div>

                <button
                  type="button"
                  class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  @click="toggleGroup(groupPermissions)"
                >
                  {{ isAllSelectedInGroup(groupPermissions) ? 'Unselect All' : 'Select All' }}
                </button>
              </div>

              <div class="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                <label
                  v-for="permission in groupPermissions"
                  :key="permission.id"
                  class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm hover:bg-slate-50"
                >
                  <input
                    v-model="selectedPermissions"
                    type="checkbox"
                    :value="permission.name"
                    class="h-4 w-4 rounded border-slate-300"
                  />

                  <span class="font-medium text-slate-700">
                    {{ permission.name }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            @click="handleClose"
          >
            Cancel
          </button>

          <button
            type="button"
            :disabled="saving || loading"
            class="rounded-xl bg-slate-900 px-5 py-3 text-sm text-white hover:bg-slate-800 disabled:opacity-60"
            @click="handleSave"
          >
            {{ saving ? 'Saving...' : 'Save Permissions' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>