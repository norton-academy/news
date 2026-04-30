<script setup lang="ts">
import type { RoleItem } from "~/composables/useRole";
import { RefreshCcw, Save, Settings } from "lucide-vue-next";
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "setting.view",
});

const { getSettings, updateSettings } = useSettings();
const { getRoles } = useRole();
const authStore = useAuthStore();
const toast = useToast();

const loading = ref(false);
const saving = ref(false);
const errorMessage = ref("");

const roles = ref<RoleItem[]>([]);
const rolesLoading = ref(false);

const form = reactive({
  app_name: "",
  support_email: "",
  allow_registration: true,
  maintenance_mode: false,
  default_user_role: "",
});

const errors = reactive<Record<string, string>>({
  app_name: "",
  support_email: "",
  allow_registration: "",
  maintenance_mode: "",
  default_user_role: "",
});

const roleOptions = computed(() => {
  return roles.value.map((role) => ({
    label: role.name,
    value: role.name,
  }));
});

const resetErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};

const applySettingsToForm = (settings: any[]) => {
  const map = Object.fromEntries(settings.map((item) => [item.key, item.value]));

  form.app_name = String(map.app_name || "");
  form.support_email = String(map.support_email || "");
  form.allow_registration = Boolean(map.allow_registration);
  form.maintenance_mode = Boolean(map.maintenance_mode);
  form.default_user_role = String(map.default_user_role || "");
};

const fetchRoles = async () => {
  rolesLoading.value = true;

  try {
    const response = await getRoles({
      per_page: 100,
    });

    roles.value = response.data.roles;
  } catch (error: any) {
    toast.error("Failed to load roles", error.message || "Could not load roles");
  } finally {
    rolesLoading.value = false;
  }
};

const fetchSettings = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const [settingsResponse] = await Promise.all([getSettings(), fetchRoles()]);

    applySettingsToForm(settingsResponse.data.settings);
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load settings";
    toast.error("Settings failed", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  saving.value = true;
  resetErrors();

  try {
    const response = await updateSettings({
      app_name: form.app_name,
      support_email: form.support_email,
      allow_registration: form.allow_registration,
      maintenance_mode: form.maintenance_mode,
      default_user_role: form.default_user_role,
    });

    applySettingsToForm(response.data.settings);
    toast.success("Settings updated", "System settings were updated successfully.");
  } catch (error: any) {
    toast.error("Update failed", error.message || "Failed to update settings");

    if (error.errors) {
      errors.app_name = error.errors.app_name?.[0] || "";
      errors.support_email = error.errors.support_email?.[0] || "";
      errors.allow_registration = error.errors.allow_registration?.[0] || "";
      errors.maintenance_mode = error.errors.maintenance_mode?.[0] || "";
      errors.default_user_role = error.errors.default_user_role?.[0] || "";
    }
  } finally {
    saving.value = false;
  }
};

onMounted(fetchSettings);
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Settings" subtitle="Manage global system configuration.">
      <template #actions>
        <AppButton variant="secondary" :loading="loading" @click="fetchSettings">
          <RefreshCcw class="mr-2 h-4 w-4" />
          Refresh
        </AppButton>
      </template>
    </PageHeader>

    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
    >
      {{ errorMessage }}
    </div>

    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm"
    >
      Loading settings...
    </div>

    <template v-else>
      <div class="grid gap-6 lg:grid-cols-3">
        <AppCard
          title="System Status"
          subtitle="Quick configuration status."
          class="lg:col-span-1"
        >
          <div class="space-y-4">
            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400">
                Registration
              </span>
              <AppBadge :variant="form.allow_registration ? 'success' : 'default'">
                {{ form.allow_registration ? "Enabled" : "Disabled" }}
              </AppBadge>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400"
                >Maintenance</span
              >
              <AppBadge :variant="form.maintenance_mode ? 'warning' : 'success'">
                {{ form.maintenance_mode ? "On" : "Off" }}
              </AppBadge>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400"
                >Default Role</span
              >
              <span class="text-sm font-bold text-slate-900 dark:text-white">
                {{ form.default_user_role || "-" }}
              </span>
            </div>
          </div>
        </AppCard>

        <AppCard
          title="General Settings"
          subtitle="Update application and authentication settings."
          class="lg:col-span-2"
        >
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="grid gap-5 md:grid-cols-2">
              <AppInput
                v-model="form.app_name"
                label="Application Name"
                placeholder="Admin Panel"
                :error="errors.app_name"
              />

              <AppInput
                v-model="form.support_email"
                label="Support Email"
                type="email"
                placeholder="support@example.com"
                :error="errors.support_email"
              />

              <AppSelect
                v-model="form.default_user_role"
                label="Default User Role"
                :options="roleOptions"
                :placeholder="rolesLoading ? 'Loading roles...' : 'Select default role'"
                :disabled="rolesLoading"
                :error="errors.default_user_role"
              />
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <label
                class="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">
                    Allow Registration
                  </p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Allow new users to register accounts.
                  </p>
                </div>

                <input
                  v-model="form.allow_registration"
                  type="checkbox"
                  class="h-5 w-5 rounded border-slate-300 dark:border-slate-700"
                />
              </label>

              <label
                class="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">
                    Maintenance Mode
                  </p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Mark the system as under maintenance.
                  </p>
                </div>

                <input
                  v-model="form.maintenance_mode"
                  type="checkbox"
                  class="h-5 w-5 rounded border-slate-300 dark:border-slate-700"
                />
              </label>
            </div>

            <div
              class="flex justify-end border-t border-slate-200 dark:border-slate-800/60 pt-5"
            >
              <AppButton
                type="submit"
                :loading="saving"
                :disabled="!authStore.hasPermission('setting.update')"
              >
                Save Settings
              </AppButton>
            </div>
          </form>
        </AppCard>
      </div>
    </template>
  </div>
</template>
