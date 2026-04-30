<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { verifyEmailOtp, resendEmailOtp } = useEmailOtp()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const resending = ref(false)
const message = ref('')
const errorMessage = ref('')

const form = reactive({
  otp: '',
})

const errors = reactive<Record<string, string>>({
  otp: '',
})

watch(
  () => form.otp,
  (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 6)

    if (cleaned !== value) {
      form.otp = cleaned
    }
  }
)

const resetMessages = () => {
  message.value = ''
  errorMessage.value = ''
  errors.otp = ''
}

const handleVerify = async () => {
  loading.value = true
  resetMessages()

  try {
    const response = await verifyEmailOtp(form.otp)

    message.value = response.message
    toast.success('Email verified', response.message)

    await authStore.fetchUser()

    await navigateTo('/dashboard')
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to verify OTP'
    toast.error('Verification failed', errorMessage.value)

    if (error.errors) {
      errors.otp = error.errors.otp?.[0] || ''
    }
  } finally {
    loading.value = false
  }
}

const handleResend = async () => {
  resending.value = true
  resetMessages()
  form.otp = ''

  try {
    const response = await resendEmailOtp()

    message.value = response.message
    toast.success('OTP sent', response.message)
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to resend OTP'
    toast.error('Resend failed', errorMessage.value)
  } finally {
    resending.value = false
  }
}
</script>

<template>
  <AuthCard
    title="Verify your email"
    subtitle="Enter the 6-digit OTP code sent to your email address."
  >
    <div
      v-if="message"
      class="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
    >
      {{ message }}
    </div>

    <div
      v-if="errorMessage"
      class="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
    >
      {{ errorMessage }}
    </div>

    <form class="space-y-5" @submit.prevent="handleVerify">
      <div class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
        We sent the OTP code to:
        <strong>{{ authStore.user?.email }}</strong>
      </div>

      <AuthInput
        v-model="form.otp"
        label="OTP Code"
        type="text"
        placeholder="Enter 6-digit OTP"
        :error="errors.otp"
        required
      />

      <AuthButton
        label="Verify Email"
        :loading="loading"
        variant="primary"
      />

      <button
        type="button"
        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        :disabled="resending"
        @click="handleResend"
      >
        {{ resending ? 'Sending...' : 'Resend OTP' }}
      </button>
    </form>

    <div class="mt-6 text-center text-sm text-slate-600">
      Already verified?
      <button
        class="font-semibold text-blue-600 hover:text-blue-700"
        @click="authStore.fetchUser().then(() => authStore.user?.is_email_verified ? navigateTo('/dashboard') : null)"
      >
        Continue
      </button>
    </div>
  </AuthCard>
</template>