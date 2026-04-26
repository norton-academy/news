<script setup lang="ts">
interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  created_at: string;
}

defineProps<{
  users: UserItem[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "edit", user: UserItem): void;
  (e: "delete", user: UserItem): void;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              User
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Role
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Status
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Created At
            </th>
            <th
              class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td colspan="5" class="px-6 py-12 text-center text-sm text-slate-500">
              Loading users...
            </td>
          </tr>

          <tr v-else-if="users.length === 0">
            <td colspan="5" class="px-6 py-12 text-center">
              <div>
                <p class="text-base font-semibold text-slate-900">No users found</p>
                <p class="mt-2 text-sm text-slate-500">
                  Try changing your search or filter settings.
                </p>
              </div>
            </td>
          </tr>

          <tr v-for="user in users" v-else :key="user.id" class="hover:bg-slate-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white"
                >
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-900">{{ user.name }}</p>
                  <p class="text-sm text-slate-500">{{ user.email }}</p>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 text-sm text-slate-700">
              {{ user.role }}
            </td>

            <td class="px-6 py-4">
              <UserStatusBadge :status="user.status" />
            </td>

            <td class="px-6 py-4 text-sm text-slate-500">
              {{ user.created_at }}
            </td>

            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">
                <button
                  class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  View
                </button>
                <button
                  class="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                  @click="emit('edit', user)"
                >
                  Edit
                </button>
                <button
                  class="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  @click="emit('delete', user)"
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
</template>
