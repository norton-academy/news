<script setup lang="ts">
import type {
  PermissionItem,
  PermissionPagination,
} from '~/composables/usePermission'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} = usePermission()

const permissions = ref<PermissionItem[]>([])
const search = ref('')
const page = ref(1)
const perPage = ref(10)
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const errorMessage = ref('')

const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const selectedPermission = ref<PermissionItem | null>(null)

const form = reactive({
  name: '',
  guard_name: 'web',
})

const formErrors = reactive<Record<string, string>>({
  name: '',
  guard_name: '',
})

const stats = ref({
  total_permissions: 0,
})

const pagination = ref<PermissionPagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
})

const resetFormErrors = () => {
  formErrors.name = ''
  formErrors.guard_name = ''
}

const fetchPermissions = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await getPermissions({
      search: search.value || undefined,
      page: page.value,
      per_page: perPage.value,
    })

    permissions.value = response.data.permissions
    pagination.value = response.data.pagination
    stats.value = response.data.stats
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to load permissions'
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  selectedPermission.value = null
  form.name = ''
  form.guard_name = 'web'
  resetFormErrors()
  modalOpen.value = true
}

const openEdit = (permission: PermissionItem) => {
  selectedPermission.value = permission
  form.name = permission.name
  form.guard_name = permission.guard_name
  resetFormErrors()
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedPermission.value = null
  resetFormErrors()
}

const savePermission = async () => {
  saving.value = true
  errorMessage.value = ''
  resetFormErrors()

  try {
    if (selectedPermission.value) {
      await updatePermission(selectedPermission.value.id, {
        name: form.name,
        guard_name: form.guard_name,
      })
    } else {
      await createPermission({
        name: form.name,
        guard_name: form.guard_name,
      })
    }

    closeModal()
    await fetchPermissions()
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to save permission'

    if (error.errors) {
      formErrors.name = error.errors.name?.[0] || ''
      formErrors.guard_name = error.errors.guard_name?.[0] || ''
    }
  } finally {
    saving.value = false
  }
}

const openDelete = (permission: PermissionItem) => {
  selectedPermission.value = permission
  deleteModalOpen.value = true
}

const closeDelete = () => {
  deleteModalOpen.value = false
  selectedPermission.value = null
}

const confirmDelete = async () => {
  if (!selectedPermission.value) return

  deleting.value = true
  errorMessage.value = ''

  try {
    await deletePermission(selectedPermission.value.id)
    closeDelete()
    await fetchPermissions()
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to delete permission'
  } finally {
    deleting.value = false
  }
}

let searchTimeout: ReturnType<typeof setTimeout> | null = null

watch(search, () => {
  page.value = 1

  if (searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    await fetchPermissions()
  }, 400)
})

onMounted(fetchPermissions)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">
          Permissions Management
        </h1>
        <p class="mt-1 text-sm text-slate-500">
          Manage system permissions for your RBAC access control.
        </p>
      </div>

      <button
        class="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        @click="openCreate"
      >
        Add Permission
      </button>
    </div>

    <!-- Error -->
    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ errorMessage }}
    </div>

    <!-- Stats -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">Total Permissions</p>
        <h3 class="mt-3 text-3xl font-bold text-slate-900">
          {{ stats.total_permissions }}
        </h3>
        <p class="mt-2 text-sm text-slate-500">
          All registered permissions
        </p>
      </div>
    </div>

    <!-- Search -->
    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <input
        v-model="search"
        type="text"
        placeholder="Search permission, example: user.create..."
        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Permission
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Module
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Action
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Guard
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Created
              </th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-12 text-center text-sm text-slate-500">
                Loading permissions...
              </td>
            </tr>

            <tr v-else-if="permissions.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-sm text-slate-500">
                No permissions found.
              </td>
            </tr>

            <tr
              v-for="permission in permissions"
              v-else
              :key="permission.id"
              class="hover:bg-slate-50"
            >
              <td class="px-6 py-4">
                <p class="text-sm font-semibold text-slate-900">
                  {{ permission.name }}
                </p>
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ permission.name.split('.')[0] || '-' }}
              </td>

              <td class="px-6 py-4">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {{ permission.name.split('.')[1] || '-' }}
                </span>
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ permission.guard_name }}
              </td>

              <td class="px-6 py-4 text-sm text-slate-500">
                {{ permission.created_at }}
              </td>

              <td class="px-6 py-4">
                <div class="flex justify-end gap-2">
                  <button
                    class="rounded-lg border border-blue-200 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50"
                    @click="openEdit(permission)"
                  >
                    Edit
                  </button>

                  <button
                    class="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    @click="openDelete(permission)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-sm">
      <p>
        Page {{ pagination.current_page }} of {{ pagination.last_page }} |
        Total permissions: {{ pagination.total }}
      </p>

      <div class="flex gap-2">
        <button
          class="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-50"
          :disabled="pagination.current_page <= 1 || loading"
          @click="page--; fetchPermissions()"
        >
          Previous
        </button>

        <button
          class="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-50"
          :disabled="pagination.current_page >= pagination.last_page || loading"
          @click="page++; fetchPermissions()"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div
        v-if="modalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-slate-900/50" @click="closeModal" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div class="border-b border-slate-200 px-6 py-4">
            <h2 class="text-xl font-bold text-slate-900">
              {{ selectedPermission ? 'Edit Permission' : 'Create Permission' }}
            </h2>
          </div>

          <form class="space-y-5 px-6 py-6" @submit.prevent="savePermission">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Permission Name
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Example: user.create"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <p v-if="formErrors.name" class="mt-2 text-sm text-red-600">
                {{ formErrors.name }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Guard Name
              </label>
              <input
                v-model="form.guard_name"
                type="text"
                placeholder="web"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <p v-if="formErrors.guard_name" class="mt-2 text-sm text-red-600">
                {{ formErrors.guard_name }}
              </p>
            </div>

            <div class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Recommended format:
              <strong>module.action</strong>, for example
              <strong>user.create</strong>.
            </div>

            <div class="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                @click="closeModal"
              >
                Cancel
              </button>

              <button
                type="submit"
                :disabled="saving"
                class="rounded-xl bg-slate-900 px-5 py-3 text-sm text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {{ saving ? 'Saving...' : selectedPermission ? 'Update Permission' : 'Create Permission' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Modal -->
    <Teleport to="body">
      <div
        v-if="deleteModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-slate-900/50" @click="closeDelete" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div class="border-b border-slate-200 px-6 py-4">
            <h2 class="text-xl font-bold text-slate-900">Delete Permission</h2>
            <p class="mt-1 text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>

          <div class="space-y-5 px-6 py-6">
            <p class="text-sm text-slate-700">
              Are you sure you want to delete
              <strong>{{ selectedPermission?.name }}</strong>?
            </p>

            <div class="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                @click="closeDelete"
              >
                Cancel
              </button>

              <button
                :disabled="deleting"
                class="rounded-xl bg-red-600 px-5 py-3 text-sm text-white hover:bg-red-700 disabled:opacity-60"
                @click="confirmDelete"
              >
                {{ deleting ? 'Deleting...' : 'Delete Permission' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>