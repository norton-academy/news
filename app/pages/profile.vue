<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "profile.view",
});

import { KeyRound, RefreshCcw, Save, User } from "lucide-vue-next";

const { getProfile, updateProfile, updatePassword } = useProfile();
const authStore = useAuthStore();
const toast = useToast();

const loading = ref(false);
const profileSaving = ref(false);
const passwordSaving = ref(false);
const errorMessage = ref("");

const profileForm = reactive({
  name: "",
  email: "",
});

const passwordForm = reactive({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const profileErrors = reactive<Record<string, string>>({
  name: "",
  email: "",
});

const passwordErrors = reactive<Record<string, string>>({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const resetProfileErrors = () => {
  profileErrors.name = "";
  profileErrors.email = "";
};

const resetPasswordErrors = () => {
  passwordErrors.current_password = "";
  passwordErrors.password = "";
  passwordErrors.password_confirmation = "";
};

const fetchProfile = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getProfile();

    profileForm.name = response.data.user.name;
    profileForm.email = response.data.user.email;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load profile";
    toast.error("Profile failed", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const handleUpdateProfile = async () => {
  profileSaving.value = true;
  resetProfileErrors();

  try {
    const response = await updateProfile({
      name: profileForm.name,
      email: profileForm.email,
    });

    authStore.user = response.data.user as any;

    if (process.client) {
      localStorage.setItem("auth_user", JSON.stringify(response.data.user));
    }

    toast.success(
      "Profile updated",
      "Your profile information was updated successfully."
    );
  } catch (error: any) {
    toast.error("Update failed", error.message || "Failed to update profile");

    if (error.errors) {
      profileErrors.name = error.errors.name?.[0] || "";
      profileErrors.email = error.errors.email?.[0] || "";
    }
  } finally {
    profileSaving.value = false;
  }
};

const handleUpdatePassword = async () => {
  passwordSaving.value = true;
  resetPasswordErrors();

  try {
    await updatePassword({
      current_password: passwordForm.current_password,
      password: passwordForm.password,
      password_confirmation: passwordForm.password_confirmation,
    });

    passwordForm.current_password = "";
    passwordForm.password = "";
    passwordForm.password_confirmation = "";

    toast.success("Password updated", "Your password was updated successfully.");
  } catch (error: any) {
    toast.error("Password update failed", error.message || "Failed to update password");

    if (error.errors) {
      passwordErrors.current_password = error.errors.current_password?.[0] || "";
      passwordErrors.password = error.errors.password?.[0] || "";
      passwordErrors.password_confirmation =
        error.errors.password_confirmation?.[0] || "";
    }
  } finally {
    passwordSaving.value = false;
  }
};

onMounted(fetchProfile);
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Profile" subtitle="Manage your account information and password.">
      <template #actions>
        <AppButton variant="secondary" :loading="loading" @click="fetchProfile">
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
      Loading profile...
    </div>

    <template v-else>
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Profile Summary -->
        <AppCard class="lg:col-span-1">
          <div class="flex flex-col items-center text-center">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-900 text-3xl font-bold text-white shadow-lg dark:bg-white dark:text-slate-900"
            >
              {{ profileForm.name.charAt(0).toUpperCase() || "U" }}
            </div>

            <h2 class="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              {{ profileForm.name || "User" }}
            </h2>

            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {{ profileForm.email }}
            </p>

            <div class="mt-4 flex flex-wrap justify-center gap-2">
              <AppBadge
                v-for="role in authStore.user?.roles || []"
                :key="role"
                variant="info"
              >
                {{ role }}
              </AppBadge>
            </div>
          </div>
        </AppCard>

        <!-- Update Profile -->
        <AppCard
          title="Profile Information"
          subtitle="Update your name and email address."
          class="lg:col-span-2"
        >
          <form class="space-y-5" @submit.prevent="handleUpdateProfile">
            <div class="grid gap-5 md:grid-cols-2">
              <AppInput
                v-model="profileForm.name"
                label="Name"
                placeholder="Enter your name"
                :error="profileErrors.name"
              />

              <AppInput
                v-model="profileForm.email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                :error="profileErrors.email"
              />
            </div>

            <div
              class="flex justify-end border-t border-slate-200 dark:border-slate-600 pt-5"
            >
              <AppButton
                type="submit"
                variant="primary"
                :loading="profileSaving"
                :disabled="!authStore.hasPermission('profile.update')"
              >
                <Save class="mr-2 h-4 w-4" />
                Save Changes
              </AppButton>
            </div>
          </form>
        </AppCard>
      </div>

      <!-- Update Password -->
      <AppCard title="Change Password" subtitle="Update your password securely.">
        <form class="space-y-5" @submit.prevent="handleUpdatePassword">
          <div class="grid gap-5 md:grid-cols-3">
            <AppInput
              v-model="passwordForm.current_password"
              label="Current Password"
              type="password"
              placeholder="Current password"
              :error="passwordErrors.current_password"
            />

            <AppInput
              v-model="passwordForm.password"
              label="New Password"
              type="password"
              placeholder="New password"
              :error="passwordErrors.password"
            />

            <AppInput
              v-model="passwordForm.password_confirmation"
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              :error="passwordErrors.password_confirmation"
            />
          </div>

          <div
            class="flex justify-end border-t border-slate-200 dark:border-slate-600 pt-5"
          >
            <AppButton
              type="submit"
              variant="primary"
              :loading="passwordSaving"
              :disabled="!authStore.hasPermission('profile.update')"
            >
              <KeyRound class="mr-2 h-4 w-4" />
              Update Password
            </AppButton>
          </div>
        </form>
      </AppCard>
    </template>
  </div>
</template>
