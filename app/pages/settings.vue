<script setup lang="ts">
import type { RoleItem } from "~/composables/useRole";
import {
  Mail,
  RefreshCcw,
  Save,
  Settings,
  ShieldCheck,
  UserPlus,
  Wrench,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "setting.view",
  title: "Settings",
});

const { getSettings, updateSettings } = useSettings();
import { useRoleManagementStore } from '~/stores/roleManagement'
const roleStore = useRoleManagementStore()

const authStore = useAuthStore();
const toast = useToast();
const notificationStore = useNotificationStore();

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

const parseBoolean = (value: unknown, fallback = false) => {
  if (value === true || value === "true" || value === 1 || value === "1") {
    return true;
  }

  if (value === false || value === "false" || value === 0 || value === "0") {
    return false;
  }

  return fallback;
};

const resetErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};

const applySettingsToForm = (settings: any[]) => {
  const map = Object.fromEntries(settings.map((item) => [item.key, item.value]));

  form.app_name = String(map.app_name || "");
  form.support_email = String(map.support_email || "");
  form.allow_registration = parseBoolean(map.allow_registration, true);
  form.maintenance_mode = parseBoolean(map.maintenance_mode, false);
  form.default_user_role = String(map.default_user_role || "");
};

const fetchRoles = async () => {
  rolesLoading.value = true;

  try {
    await roleStore.fetchRoles({ per_page: 100 }, { silent: true })
    roles.value = roleStore.roles
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
  errorMessage.value = "";
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

    await notificationStore.refreshNotifications();

    toast.success("Settings updated", "System settings were updated successfully.");
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || error.message || "Failed to update settings";

    toast.error("Update failed", errorMessage.value);

    const validationErrors = error.response?.data?.errors || error.errors;

    if (validationErrors) {
      errors.app_name = validationErrors.app_name?.[0] || "";
      errors.support_email = validationErrors.support_email?.[0] || "";
      errors.allow_registration = validationErrors.allow_registration?.[0] || "";
      errors.maintenance_mode = validationErrors.maintenance_mode?.[0] || "";
      errors.default_user_role = validationErrors.default_user_role?.[0] || "";
    }
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  await fetchSettings();
});
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Settings"
      subtitle="Manage global application, authentication, registration, and maintenance configuration."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="loading" @click="fetchSettings">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Settings error"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Application"
        :value="form.app_name || '-'"
        subtitle="Current app name"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <Settings class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Registration"
        :value="form.allow_registration ? 'Enabled' : 'Disabled'"
        subtitle="New account creation"
        :tone="form.allow_registration ? 'success' : 'warning'"
      >
        <template #badge>
          <AppBadge
            :variant="form.allow_registration ? 'success' : 'warning'"
            shape="square"
            size="md"
          >
            <UserPlus class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Maintenance"
        :value="form.maintenance_mode ? 'On' : 'Off'"
        subtitle="System availability"
        :tone="form.maintenance_mode ? 'warning' : 'success'"
      >
        <template #badge>
          <AppBadge
            :variant="form.maintenance_mode ? 'warning' : 'success'"
            shape="square"
            size="md"
          >
            <Wrench class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Default Role"
        :value="form.default_user_role || '-'"
        subtitle="Assigned to new users"
        tone="default"
      >
        <template #badge>
          <AppBadge variant="default" shape="square" size="md">
            <ShieldCheck class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>
    </div>

    <template v-if="loading">
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-3xl border border-border bg-card p-6 shadow-sm lg:col-span-1">
          <div class="h-5 w-36 animate-pulse rounded-full bg-muted" />

          <div class="mt-5 space-y-3">
            <div
              v-for="i in 3"
              :key="i"
              class="h-14 animate-pulse rounded-2xl bg-muted"
            />
          </div>
        </div>

        <div class="rounded-3xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <div class="h-5 w-44 animate-pulse rounded-full bg-muted" />

          <div class="mt-5 grid gap-5 md:grid-cols-2">
            <div
              v-for="i in 4"
              :key="i"
              class="h-12 animate-pulse rounded-2xl bg-muted"
            />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="grid gap-6 lg:grid-cols-3">
        <AppCard
          title="System Status"
          subtitle="Quick configuration status."
          class="lg:col-span-1"
        >
          <div class="space-y-3">
            <div
              class="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <AppBadge
                  :variant="form.allow_registration ? 'success' : 'warning'"
                  shape="square"
                  size="sm"
                >
                  <UserPlus class="h-4 w-4" />
                </AppBadge>

                <span class="text-sm font-semibold text-muted-foreground">
                  Registration
                </span>
              </div>

              <AppBadge :variant="form.allow_registration ? 'success' : 'warning'">
                {{ form.allow_registration ? "Enabled" : "Disabled" }}
              </AppBadge>
            </div>

            <div
              class="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <AppBadge
                  :variant="form.maintenance_mode ? 'warning' : 'success'"
                  shape="square"
                  size="sm"
                >
                  <Wrench class="h-4 w-4" />
                </AppBadge>

                <span class="text-sm font-semibold text-muted-foreground">
                  Maintenance
                </span>
              </div>

              <AppBadge :variant="form.maintenance_mode ? 'warning' : 'success'">
                {{ form.maintenance_mode ? "On" : "Off" }}
              </AppBadge>
            </div>

            <div
              class="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <AppBadge variant="default" shape="square" size="sm">
                  <ShieldCheck class="h-4 w-4" />
                </AppBadge>

                <span class="text-sm font-semibold text-muted-foreground">
                  Default Role
                </span>
              </div>

              <span class="text-sm font-bold text-card-foreground">
                {{ form.default_user_role || "-" }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <AppBadge variant="info" shape="square" size="sm">
                  <Mail class="h-4 w-4" />
                </AppBadge>

                <span class="text-sm font-semibold text-muted-foreground">
                  Support Email
                </span>
              </div>

              <span
                class="max-w-[150px] truncate text-right text-sm font-bold text-card-foreground"
              >
                {{ form.support_email || "-" }}
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
                class="cursor-pointer rounded-3xl border border-border bg-muted/40 p-5 hover:bg-muted/70"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <AppBadge variant="success" shape="square" size="sm">
                        <UserPlus class="h-4 w-4" />
                      </AppBadge>

                      <p class="text-sm font-bold text-card-foreground">
                        Allow Registration
                      </p>
                    </div>

                    <p class="mt-3 text-sm leading-6 text-muted-foreground">
                      Allow new users to register accounts from the authentication page.
                    </p>
                  </div>

                  <input
                    v-model="form.allow_registration"
                    type="checkbox"
                    class="peer sr-only"
                  />

                  <span
                    class="relative mt-1 inline-flex h-6 w-11 shrink-0 rounded-full border border-border bg-background"
                    :class="form.allow_registration ? 'bg-emerald-600' : ''"
                  >
                    <span
                      class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-card shadow-sm"
                      :class="form.allow_registration ? 'translate-x-5' : ''"
                    />
                  </span>
                </div>

                <p
                  v-if="errors.allow_registration"
                  class="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400"
                >
                  {{ errors.allow_registration }}
                </p>
              </label>

              <label
                class="cursor-pointer rounded-3xl border border-border bg-muted/40 p-5 hover:bg-muted/70"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <AppBadge variant="warning" shape="square" size="sm">
                        <Wrench class="h-4 w-4" />
                      </AppBadge>

                      <p class="text-sm font-bold text-card-foreground">
                        Maintenance Mode
                      </p>
                    </div>

                    <p class="mt-3 text-sm leading-6 text-muted-foreground">
                      Mark the system as under maintenance for users and admins.
                    </p>
                  </div>

                  <input
                    v-model="form.maintenance_mode"
                    type="checkbox"
                    class="peer sr-only"
                  />

                  <span
                    class="relative mt-1 inline-flex h-6 w-11 shrink-0 rounded-full border border-border bg-background"
                    :class="form.maintenance_mode ? 'bg-orange-500' : ''"
                  >
                    <span
                      class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-card shadow-sm"
                      :class="form.maintenance_mode ? 'translate-x-5' : ''"
                    />
                  </span>
                </div>

                <p
                  v-if="errors.maintenance_mode"
                  class="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400"
                >
                  {{ errors.maintenance_mode }}
                </p>
              </label>
            </div>

            <div class="flex justify-end border-t border-border pt-5">
              <AppButton
                type="submit"
                :loading="saving"
                :disabled="!authStore.hasPermission('setting.update')"
              >
                <Save class="h-4 w-4" />
                Save Settings
              </AppButton>
            </div>
          </form>
        </AppCard>
      </div>
    </template>
  </div>
</template>
