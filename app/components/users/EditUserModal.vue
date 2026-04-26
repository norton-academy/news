<script setup lang="ts">
import type { UpdateUserPayload, UserItem } from "~/composables/useUser";
import type { RoleItem } from "~/composables/useRole";

const props = defineProps<{
  open: boolean;
  user: UserItem | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "updated"): void;
}>();

const { updateUser } = useUser();
const { getRoles } = useRole();

const loading = ref(false);
const generalError = ref("");

const roles = ref<RoleItem[]>([]);
const rolesLoading = ref(false);

const form = reactive<UpdateUserPayload>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  status: "active",
  role: "",
});

const errors = reactive<Record<string, string>>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  status: "",
  role: "",
});

const resetErrors = () => {
  generalError.value = "";

  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};

const fillForm = () => {
  form.name = props.user?.name || "";
  form.email = props.user?.email || "";
  form.password = "";
  form.password_confirmation = "";
  form.status = props.user?.status || "active";
  form.role = props.user?.role || "";
};

const fetchRoles = async () => {
  rolesLoading.value = true;

  try {
    const response = await getRoles({
      per_page: 100,
    });

    roles.value = response.data.roles;
  } catch (error) {
    console.error("Failed to load roles", error);
  } finally {
    rolesLoading.value = false;
  }
};

watch(
  () => props.user,
  () => {
    if (props.user) {
      fillForm();
      resetErrors();
    }
  },
  { immediate: true }
);

watch(
  () => props.open,
  async (value) => {
    if (value && props.user) {
      fillForm();
      resetErrors();
      await fetchRoles();
    }
  }
);

const handleClose = () => {
  resetErrors();
  emit("close");
};

const handleSubmit = async () => {
  if (!props.user) return;

  resetErrors();
  loading.value = true;

  try {
    const payload: UpdateUserPayload = {
      name: form.name,
      email: form.email,
      status: form.status,
      role: form.role || undefined,
    };

    if (form.password) {
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }

    await updateUser(props.user.id, payload);

    emit("updated");
    handleClose();
  } catch (error: any) {
    generalError.value = error.message || "Failed to update user";

    if (error.errors) {
      errors.name = error.errors.name?.[0] || "";
      errors.email = error.errors.email?.[0] || "";
      errors.password = error.errors.password?.[0] || "";
      errors.password_confirmation = error.errors.password_confirmation?.[0] || "";
      errors.status = error.errors.status?.[0] || "";
      errors.role = error.errors.role?.[0] || "";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50" @click="handleClose" />

      <div
        class="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div
          class="flex items-center justify-between border-b border-slate-200 px-6 py-4"
        >
          <div>
            <h2 class="text-xl font-bold text-slate-900">Edit User</h2>
            <p class="mt-1 text-sm text-slate-500">
              Update user information and account settings.
            </p>
          </div>

          <button
            class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            @click="handleClose"
          >
            Close
          </button>
        </div>

        <form class="space-y-5 px-6 py-6" @submit.prevent="handleSubmit">
          <div
            v-if="generalError"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {{ generalError }}
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Enter full name"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <p v-if="errors.name" class="mt-2 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="Enter email address"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                New Password
              </label>
              <input
                v-model="form.password"
                type="password"
                placeholder="Leave blank to keep current password"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Confirm New Password
              </label>
              <input
                v-model="form.password_confirmation"
                type="password"
                placeholder="Confirm new password"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <p v-if="errors.password_confirmation" class="mt-2 text-sm text-red-600">
                {{ errors.password_confirmation }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                v-model="form.status"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <p v-if="errors.status" class="mt-2 text-sm text-red-600">
                {{ errors.status }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700"> Role </label>

              <select
                v-model="form.role"
                class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                :disabled="rolesLoading"
              >
                <option value="">
                  {{ rolesLoading ? "Loading roles..." : "Select role" }}
                </option>

                <option v-for="role in roles" :key="role.id" :value="role.name">
                  {{ role.name }}
                </option>
              </select>

              <p v-if="errors.role" class="mt-2 text-sm text-red-600">
                {{ errors.role }}
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
              type="submit"
              :disabled="loading"
              class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ loading ? "Updating..." : "Update User" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
