<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  password: '',
})
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
      <Card
        title="Welcome back"
        description="Login to continue to your dashboard."
        class="w-full"
      >
        <form class="space-y-5">
          <FormField
            label="Email Address"
            for="email"
          >
            <Input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
            />
          </FormField>

          <FormField
            label="Password"
            for="password"
          >
            <PasswordInput
              id="password"
              v-model="form.password"
              placeholder="Enter your password"
            />
          </FormField>

          <Button
            type="submit"
            block
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  </main>
</template>