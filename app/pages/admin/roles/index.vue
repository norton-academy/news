<template>
  <div class="w-full max-w-none animate-fade-in">
    <!-- Page Header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Role Management</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Manage user roles and permissions</p>
      </div>

      <!-- Actions Bar with Create, Export, Settings -->
      <RbacRolesHeaderActions
        @export="handleExport"
        @import="handleImport"
        @duplicate="handleDuplicate"
        @bulk-delete="handleBulkDelete"
        @refresh="handleRefresh"
      />
    </div>

    <!-- Stat Cards Grid -->
    <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <RbacStatCard
        title="Total Roles"
        :value="totalRoles"
        unit=""
        trend="+2"
        trend-color="text-emerald-200"
        trend-text="this month"
        progress="75%"
        gradient="from-indigo-600 to-indigo-500"
        :icon="Shield"
        :animated-value="totalRoles"
        link="/admin/roles/analysis/roles"
      />
      <RbacStatCard
        title="Total Permissions"
        :value="totalPermissionsAssigned"
        unit=""
        trend="+8"
        trend-color="text-blue-200"
        trend-text="assigned"
        progress="60%"
        gradient="from-blue-600 to-blue-500"
        :icon="Key"
        :animated-value="totalPermissionsAssigned"
        link="/admin/roles/analysis/permissions"
      />
      <RbacStatCard
        title="Assigned Users"
        :value="totalUsersAssigned"
        unit=""
        trend="+5"
        trend-color="text-amber-200"
        trend-text="active"
        progress="45%"
        gradient="from-amber-500 to-amber-600"
        :icon="Users"
        :animated-value="totalUsersAssigned"
        link="/admin/roles/analytics"
      />
      <RbacStatCard
        title="Avg. Permissions"
        :value="avgPermissionsPerRole"
        unit="/role"
        trend="+0.3"
        trend-color="text-emerald-200"
        trend-text="per role"
        progress="82%"
        gradient="from-emerald-500 to-emerald-600"
        :icon="Activity"
        :animated-value="avgPermissionsPerRole"
        link="/admin/roles/analytics"
      />
    </div>

    <!-- Role Table -->
    <RbacRoleTable :roles="roles" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { Activity, Key, Shield, Users } from 'lucide-vue-next'
import { useRole } from '~/composables/useRole'

definePageMeta({
  layout: 'admin'
})

const {
  roles,
  deleteRole,
  totalRoles,
  totalPermissionsAssigned,
  totalUsersAssigned,
  avgPermissionsPerRole
} = useRole()

const handleDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
    deleteRole(id)
  }
}

const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
  console.log(`Exporting roles as ${format.toUpperCase()}`)
  alert(`Export as ${format.toUpperCase()} - Implement API call here`)
}

const handleImport = () => {
  console.log('Import roles triggered')
  alert('Import roles - Implement file upload modal')
}

const handleDuplicate = () => {
  console.log('Duplicate selected roles')
  alert('Duplicate selected roles - Implement selection logic')
}

const handleBulkDelete = () => {
  console.log('Bulk delete selected roles')
  alert('Bulk delete - Implement selection logic')
}

const handleRefresh = () => {
  console.log('Refreshing roles data')
  alert('Refresh data - Implement API refetch')
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
