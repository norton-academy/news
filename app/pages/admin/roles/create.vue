<template>
  <div class="w-full max-w-none animate-fade-in">
    <div class="max-w-5xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create New Role</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Define a new role and assign permissions</p>
      </div>

      <!-- Role Form -->
      <RbacRoleForm
        v-model:name="name"
        v-model:description="description"
        :groups="permissionGroups"
        :selected-permissions="selectedPermissions"
        :selected-count="selectedPermissions.length"
        :total-count="totalPermissionsCount"
        submit-label="Create Role"
        @toggle-permission="handleTogglePermission"
        @toggle-group="handleToggleGroup"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRole } from '~/composables/useRole'

definePageMeta({
  layout: 'admin'
})

const {
  permissionGroups,
  selectedPermissions,
  totalPermissionsCount,
  togglePermission,
  toggleGroupPermissions,
  resetSelectedPermissions,
  addRole
} = useRole()

const name = ref('')
const description = ref('')

onMounted(() => {
  resetSelectedPermissions()
})

const handleTogglePermission = (permValue: string, selected: boolean) => {
  // The event gives us the value and new selected state, but our composable toggle works directly.
  // We can just call togglePermission(permValue) regardless of selected state.
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

  addRole({
    name: name.value.trim(),
    description: description.value.trim(),
    permissions: [...selectedPermissions.value],
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' // default color
  })

  alert('Role created successfully!')
  navigateTo('/admin/roles')
}
</script>