<template>
  <div class="grid gap-6 lg:grid-cols-[1fr_390px]">
    <div class="space-y-6">
      <section class="grid gap-5 md:grid-cols-2">
        <div
          v-for="item in 2"
          :key="item"
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div class="h-56 animate-pulse bg-slate-200" />

          <div class="space-y-3 p-5">
            <div class="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
            <div class="h-5 w-full animate-pulse rounded bg-slate-200" />
            <div class="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
            <div class="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </section>

      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-200 px-5 py-4">
          <div class="h-5 w-40 animate-pulse rounded bg-slate-200" />
        </div>

        <div>
          <div
            v-for="item in 5"
            :key="item"
            class="grid grid-cols-[36px_1fr_112px] gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0"
          >
            <div class="h-5 w-5 animate-pulse rounded bg-slate-200" />

            <div class="space-y-2">
              <div class="h-5 w-full animate-pulse rounded bg-slate-200" />
              <div class="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>

            <div class="h-20 rounded-xl bg-slate-200" />
          </div>
        </div>
      </section>
    </div>

    <aside class="space-y-5">
      <div
        v-for="item in 4"
        :key="item"
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="mb-4 h-5 w-40 animate-pulse rounded bg-slate-200" />
        <div class="h-20 animate-pulse rounded-xl bg-slate-200" />
      </div>
    </aside>
  </div>
</template>