<script setup lang="ts">
import {
  Mail,
  ShieldCheck,
  KeyRound,
  RefreshCcw,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  LockKeyhole,
} from "lucide-vue-next";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { sendPasswordOtp, verifyPasswordOtp, resetPasswordWithOtp } = usePasswordOtp();

const toast = useToast();

type Step = "email" | "otp" | "reset" | "done";

const step = ref<Step>("email");
const loading = ref(false);

const message = ref("");
const generalError = ref("");

const form = reactive({
  email: "",
  otp: "",
  password: "",
  password_confirmation: "",
});

const errors = reactive<Record<string, string>>({
  email: "",
  otp: "",
  password: "",
  password_confirmation: "",
});

const stepMeta = computed(() => {
  return {
    email: {
      title: "Forgot password?",
      subtitle: "Enter your email address and we will send you a 6-digit OTP code.",
      icon: Mail,
    },
    otp: {
      title: "Verify OTP code",
      subtitle: "Enter the OTP code we sent to your email.",
      icon: ShieldCheck,
    },
    reset: {
      title: "Create new password",
      subtitle: "Your OTP is verified. Now create a new password.",
      icon: LockKeyhole,
    },
    done: {
      title: "Password reset complete",
      subtitle: "Your password was updated successfully.",
      icon: CheckCircle2,
    },
  }[step.value];
});

const resetErrors = () => {
  generalError.value = "";
  message.value = "";

  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};

watch(
  () => form.otp,
  (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 6);

    if (cleaned !== value) {
      form.otp = cleaned;
    }
  }
);

const handleSendOtp = async () => {
  loading.value = true;
  resetErrors();

  try {
    const response = await sendPasswordOtp({
      email: form.email,
    });

    message.value = response.message;
    toast.success("OTP sent", response.message);
    step.value = "otp";
  } catch (error: any) {
    generalError.value = error.message || "Failed to send OTP";
    toast.error("Failed", generalError.value);

    if (error.errors) {
      errors.email = error.errors.email?.[0] || "";
    }
  } finally {
    loading.value = false;
  }
};

const handleVerifyOtp = async () => {
  loading.value = true;
  resetErrors();

  try {
    const response = await verifyPasswordOtp({
      email: form.email,
      otp: form.otp,
    });

    message.value = response.message;
    toast.success("OTP verified", response.message);
    step.value = "reset";
  } catch (error: any) {
    generalError.value = error.message || "Failed to verify OTP";
    toast.error("Failed", generalError.value);

    if (error.errors) {
      errors.otp = error.errors.otp?.[0] || "";
    }
  } finally {
    loading.value = false;
  }
};

const handleResetPassword = async () => {
  loading.value = true;
  resetErrors();

  try {
    const response = await resetPasswordWithOtp({
      email: form.email,
      otp: form.otp,
      password: form.password,
      password_confirmation: form.password_confirmation,
    });

    message.value = response.message;
    toast.success("Password reset", response.message);
    step.value = "done";
  } catch (error: any) {
    generalError.value = error.message || "Failed to reset password";
    toast.error("Failed", generalError.value);

    if (error.errors) {
      errors.otp = error.errors.otp?.[0] || "";
      errors.password = error.errors.password?.[0] || "";
      errors.password_confirmation = error.errors.password_confirmation?.[0] || "";
    }
  } finally {
    loading.value = false;
  }
};

const resendOtp = async () => {
  form.otp = "";
  await handleSendOtp();
};

const goBack = () => {
  resetErrors();

  if (step.value === "otp") {
    step.value = "email";
    return;
  }

  if (step.value === "reset") {
    step.value = "otp";
  }
};
</script>

<template>
  <AuthCard :title="stepMeta.title" :subtitle="stepMeta.subtitle">
    <!-- Icon Header -->
    <div class="mb-6 flex justify-center">
      <div
        class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-300/50"
      >
        <component :is="stepMeta.icon" class="h-8 w-8" />
      </div>
    </div>

    <!-- Progress -->
    <div class="mb-6 grid grid-cols-3 gap-2">
      <div
        class="h-2 rounded-full"
        :class="
          ['email', 'otp', 'reset', 'done'].includes(step)
            ? 'bg-slate-900'
            : 'bg-slate-200'
        "
      />
      <div
        class="h-2 rounded-full"
        :class="['otp', 'reset', 'done'].includes(step) ? 'bg-slate-900' : 'bg-slate-200'"
      />
      <div
        class="h-2 rounded-full"
        :class="['reset', 'done'].includes(step) ? 'bg-slate-900' : 'bg-slate-200'"
      />
    </div>

    <!-- Success Message -->
    <div
      v-if="message"
      class="mb-5 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
    >
      <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0" />
      <span>{{ message }}</span>
    </div>

    <!-- Error Message -->
    <div
      v-if="generalError"
      class="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
    >
      <AlertCircle class="mt-0.5 h-5 w-5 shrink-0" />
      <span>{{ generalError }}</span>
    </div>

    <!-- Step 1: Email -->
    <form v-if="step === 'email'" class="space-y-5" @submit.prevent="handleSendOtp">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-slate-700"> Email Address </label>

        <div class="relative">
          <Mail
            class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p v-if="errors.email" class="text-sm text-red-600">
          {{ errors.email }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Mail v-if="!loading" class="h-5 w-5" />
        <RefreshCcw v-else class="h-5 w-5 animate-spin" />
        {{ loading ? "Sending OTP..." : "Send OTP Code" }}
      </button>
    </form>

    <!-- Step 2: OTP -->
    <form v-if="step === 'otp'" class="space-y-5" @submit.prevent="handleVerifyOtp">
      <div class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4 dark:border-blue-900 dark:bg-blue-950/40">
        <div class="flex gap-3">
          <Mail class="mt-0.5 h-5 w-5 text-blue-700" />
          <div>
            <p class="text-sm font-semibold text-blue-900">Check your email</p>
            <p class="mt-1 text-sm text-blue-700">
              We sent a 6-digit OTP code to
              <strong>{{ form.email }}</strong>
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-slate-700"> OTP Code </label>

        <div class="relative">
          <KeyRound
            class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            v-model="form.otp"
            type="text"
            inputmode="numeric"
            maxlength="6"
            placeholder="000000"
            class="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 text-center text-2xl font-bold tracking-[0.4em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p v-if="errors.otp" class="text-sm text-red-600">
          {{ errors.otp }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="loading || form.otp.length !== 6"
        class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ShieldCheck v-if="!loading" class="h-5 w-5" />
        <RefreshCcw v-else class="h-5 w-5 animate-spin" />
        {{ loading ? "Verifying..." : "Verify OTP" }}
      </button>

      <button
        type="button"
        class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        :disabled="loading"
        @click="resendOtp"
      >
        <RefreshCcw class="h-5 w-5" />
        Resend OTP
      </button>
    </form>

    <!-- Step 3: Reset password -->
    <form v-if="step === 'reset'" class="space-y-5" @submit.prevent="handleResetPassword">
      <div class="rounded-2xl border border-green-100 bg-green-50 px-4 py-4">
        <div class="flex gap-3">
          <ShieldCheck class="mt-0.5 h-5 w-5 text-green-700" />
          <div>
            <p class="text-sm font-semibold text-green-900">OTP verified</p>
            <p class="mt-1 text-sm text-green-700">
              Now create a new password for your account.
            </p>
          </div>
        </div>
      </div>

      <AuthInput
        v-model="form.password"
        label="New Password"
        type="password"
        placeholder="Enter new password"
        :error="errors.password"
        required
      />

      <AuthInput
        v-model="form.password_confirmation"
        label="Confirm New Password"
        type="password"
        placeholder="Confirm new password"
        :error="errors.password_confirmation"
        required
      />

      <button
        type="submit"
        :disabled="loading"
        class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <LockKeyhole v-if="!loading" class="h-5 w-5" />
        <RefreshCcw v-else class="h-5 w-5 animate-spin" />
        {{ loading ? "Resetting..." : "Reset Password" }}
      </button>
    </form>

    <!-- Done -->
    <div v-if="step === 'done'" class="space-y-5">
      <div class="rounded-2xl border border-green-200 bg-green-50 px-4 py-5 text-center">
        <CheckCircle2 class="mx-auto h-10 w-10 text-green-700" />
        <p class="mt-3 text-sm font-semibold text-green-900">
          Your password has been reset successfully.
        </p>
        <p class="mt-1 text-sm text-green-700">
          You can now login with your new password.
        </p>
      </div>

      <NuxtLink
        to="/login"
        class="block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
      >
        Back to Login
      </NuxtLink>
    </div>

    <!-- Footer -->
    <div class="mt-6 flex items-center justify-between text-sm">
      <button
        v-if="step === 'otp' || step === 'reset'"
        type="button"
        class="inline-flex items-center gap-2 font-medium text-slate-600 hover:text-slate-900"
        @click="goBack"
      >
        <ArrowLeft class="h-4 w-4" />
        Back
      </button>

      <div v-else />

      <NuxtLink
        v-if="step !== 'done'"
        to="/login"
        class="font-semibold text-blue-600 hover:text-blue-700"
      >
        Sign in
      </NuxtLink>
    </div>
  </AuthCard>
</template>
