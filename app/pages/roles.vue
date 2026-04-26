<script setup lang="ts">
import type { RoleItem, RolePagination } from '~/composables/useRole'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { getRoles, createRole, updateRole, deleteRole } = useRole()

const roles = ref<RoleItem[]>([])
const search = ref('')
const page = ref(1)
const perPage = ref(10)
const loading = ref(false)
const errorMessage = ref('')

const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const selectedRole = ref<RoleItem | null>(null)

const form = reactive({
  name: '',
  guard_name: 'web',
})

const pagination = ref<RolePagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
})

const fetchRoles = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await getRoles({
      search: search.value || undefined,
      page: page.value,
      per_page: perPage.value,
    })

    roles.value = response.data.roles
    pagination.value = response.data.pagination
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to load roles'
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  selectedRole.value = null
  form.name = ''
  form.guard_name = 'web'
  modalOpen.value = true
}

const openEdit = (role: RoleItem) => {
  selectedRole.value = role
  form.name = role.name
  form.guard_name = role.guard_name
  modalOpen.value = true
}

const saveRole = async () => {
  try {
    if (selectedRole.value) {
      await updateRole(selectedRole.value.id, form)
    } else {
      await createRole(form)
    }

    modalOpen.value = false
    await fetchRoles()
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to save role'
  }
}

const openDelete = (role: RoleItem) => {
  selectedRole.value = role
  deleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!selectedRole.value) return

  try {
    await deleteRole(selectedRole.value.id)
    deleteModalOpen.value = false
    selectedRole.value = null
    await fetchRoles()
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to delete role'
  }
}

let searchTimeout: ReturnType<typeof setTimeout> | null = null

watch(search, () => {
  page.value = 1

  if (searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    await fetchRoles()
  }, 400)
})

onMounted(fetchRoles)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">
          Roles Management
        </h1>
        <p class="mt-1 text-sm text-slate-500">
          Manage user roles for your RBAC system.
        </p>
      </div>

      <button
        class="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        @click="openCreate"
      >
        Add Role
      </button>
    </div>

    <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <input
        v-model="search"
        type="text"
        placeholder="Search role..."
        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">Role</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">Guard</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">Created</th>
            <th class="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="4" class="px-6 py-12 text-center text-sm text-slate-500">
              Loading roles...
            </td>
          </tr>

          <tr v-else-if="roles.length === 0">
            <td colspan="4" class="px-6 py-12 text-center text-sm text-slate-500">
              No roles found.
            </td>
          </tr>

          <tr v-for="role in roles" v-else :key="role.id" class="hover:bg-slate-50">
            <td class="px-6 py-4">
              <p class="text-sm font-semibold text-slate-900">{{ role.name }}</p>
            </td>
            <td class="px-6 py-4 text-sm text-slate-600">
              {{ role.guard_name }}
            </td>
            <td class="px-6 py-4 text-sm text-slate-500">
              {{ role.created_at }}
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">
                <button
                  class="rounded-lg border border-blue-200 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50"
                  @click="openEdit(role)"
                >
                  Edit
                </button>
                <button
                  class="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  @click="openDelete(role)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-sm">
      <p>
        Page {{ pagination.current_page }} of {{ pagination.last_page }} |
        Total roles: {{ pagination.total }}
      </p>

      <div class="flex gap-2">
        <button
          class="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-50"
          :disabled="pagination.current_page <= 1 || loading"
          @click="page--; fetchRoles()"
        >
          Previous
        </button>

        <button
          class="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-50"
          :disabled="pagination.current_page >= pagination.last_page || loading"
          @click="page++; fetchRoles()"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/50" @click="modalOpen = false" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div class="border-b border-slate-200 px-6 py-4">
            <h2 class="text-xl font-bold text-slate-900">
              {{ selectedRole ? 'Edit Role' : 'Create Role' }}
            </h2>
          </div>

          <form class="space-y-5 px-6 py-6" @submit.prevent="saveRole">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Role Name
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Example: Admin"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
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
            </div>

            <div class="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                @click="modalOpen = false"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="rounded-xl bg-slate-900 px-5 py-3 text-sm text-white hover:bg-slate-800"
              >
                {{ selectedRole ? 'Update Role' : 'Create Role' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Modal -->
    <Teleport to="body">
      <div v-if="deleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/50" @click="deleteModalOpen = false" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div class="border-b border-slate-200 px-6 py-4">
            <h2 class="text-xl font-bold text-slate-900">Delete Role</h2>
            <p class="mt-1 text-sm text-slate-500">This action cannot be undone.</p>
          </div>

          <div class="space-y-5 px-6 py-6">
            <p class="text-sm text-slate-700">
              Are you sure you want to delete
              <strong>{{ selectedRole?.name }}</strong>?
            </p>

            <div class="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                @click="deleteModalOpen = false"
              >
                Cancel
              </button>

              <button
                class="rounded-xl bg-red-600 px-5 py-3 text-sm text-white hover:bg-red-700"
                @click="confirmDelete"
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>