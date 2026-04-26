<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <div class="grid min-h-screen lg:grid-cols-2">
      <!-- Left Side -->
      <div class="hidden lg:flex items-center justify-center p-10 bg-slate-900 text-white">
        <div class="max-w-md">
          <p class="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-300">
            Welcome
          </p>
          <h1 class="text-4xl font-bold leading-tight">
            Build your professional admin system with clean authentication UI
          </h1>
          <p class="mt-6 text-base leading-7 text-slate-300">
            This auth layout is designed for real projects. It is simple, modern,
            responsive, and easy to scale for login, register, forgot password,
            and verification pages.
          </p>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div class="w-full max-w-md">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>