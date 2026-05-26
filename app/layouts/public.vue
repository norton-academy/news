<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-[#f7f6f2] text-slate-900">
    <SiteHeader />

    <main>
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>