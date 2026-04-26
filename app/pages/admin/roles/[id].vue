<template>
  <div class="w-full max-w-none animate-fade-in">
    <div class="max-w-5xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Role</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Modify role details and permissions</p>
      </div>

      <!-- Role Form -->
      <RbacRoleForm
        v-if="role"
        v-model:name="name"
        v-model:description="description"
        :groups="permissionGroups"
        :selected-permissions="selectedPermissions"
        :selected-count="selectedPermissions.length"
        :total-count="totalPermissionsCount"
        submit-label="Update Role"
        @toggle-permission="handleTogglePermission"
        @toggle-group="handleToggleGroup"
        @submit="handleSubmit"
      />
      <div v-else class="text-center py-16 text-gray-500">Role not found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRole } from '~/composables/useRole'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const roleId = parseInt(route.params.id as string)

const {
  permissionGroups,
  selectedPermissions,
  totalPermissionsCount,
  togglePermission,
  toggleGroupPermissions,
  setSelectedPermissions,
  getRoleById,
  updateRole
} = useRole()

const name = ref('')
const description = ref('')
const role = ref(null)

onMounted(() => {
  const foundRole = getRoleById(roleId)
  if (foundRole) {
    role.value = foundRole
    name.value = foundRole.name
    description.value = foundRole.description
    setSelectedPermissions(foundRole.permissions)
  }
})

const handleTogglePermission = (permValue: string) => {
  togglePermission(permValue)
}

const handleToggleGroup = (group: any, select: boolean) => {
  toggleGroupPermissions(group, select)
}

const handleSubmit = () => {
  if (!name.value.trim()) {
    alert('Role name is required')
    return
  }

  updateRole(roleId, {
    name: name.value.trim(),
    description: description.value.trim(),
    permissions: [...selectedPermissions.value]
  })

  alert('Role updated successfully!')
  navigateTo('/admin/roles')
}
</script>