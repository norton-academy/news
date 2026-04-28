<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const { forgotPassword } = usePasswordReset()
const toast = useToast()

const loading = ref(false)
const successMessage = ref('')
const generalError = ref('')

const form = reactive({
  email: '',
})

const errors = reactive<Record<string, string>>({
  email: '',
})

const resetErrors = () => {
  generalError.value = ''
  successMessage.value = ''
  errors.email = ''
}

const handleSubmit = async () => {
  loading.value = true
  resetErrors()

  try {
    const response = await forgotPassword({
      email: form.email,
    })

    successMessage.value = response.message
    toast.success('Email sent', response.message)
  } catch (error: any) {
    generalError.value = error.message || 'Failed to send reset link'
    toast.error('Failed', generalError.value)

    if (error.errors) {
      errors.email = error.errors.email?.[0] || ''
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthCard
    title="Forgot password?"
    subtitle="Enter your email address and we will send you a password reset link."
  >
    <div
      v-if="successMessage"
      class="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
    >
      {{ successMessage }}
    </div>

    <div
      v-if="generalError"
      class="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ generalError }}
    </div>

    <form class="space-y-5" @submit.prevent="handleSubmit">
      <AuthInput
        v-model="form.email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        :error="errors.email"
        required
      />

      <AuthButton
        label="Send Reset Link"
        :loading="loading"
        variant="primary"
      />
    </form>

    <div class="mt-6 text-center text-sm text-slate-600">
      Remember your password?
      <NuxtLink to="/login" class="font-semibold text-blue-600 hover:text-blue-700">
        Sign in
      </NuxtLink>
    </div>
  </AuthCard>
</template>