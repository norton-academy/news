<script setup lang="ts">
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  LocateFixed,
  PencilRuler,
  Sparkles,
  UserRound,
  Users,
  Zap,
} from "lucide-vue-next"

definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Careers",
  description:
    "Join COBO-NEWS. Explore open positions, learn about our culture and benefits, and see how our hiring process works.",
  ogTitle: "Careers at COBO-NEWS",
  ogDescription:
    "Discover open roles, culture, benefits, and the application process at COBO-NEWS.",
  ogType: "website",
})

const perks = [
  {
    title: "Flexible collaboration",
    description:
      "We support focused work, clear communication, and practical hybrid collaboration where possible.",
    icon: HeartHandshake,
  },
  {
    title: "Modern toolkit",
    description:
      "Work with a fast editorial stack, clean design systems, and tools that support great journalism.",
    icon: PencilRuler,
  },
  {
    title: "Growth-minded team",
    description:
      "We encourage feedback, skill building, and ownership so everyone can grow with the newsroom.",
    icon: Zap,
  },
]

const openings = [
  {
    title: "Senior News Editor",
    location: "Phnom Penh, Cambodia",
    type: "Full-time",
    team: "Editorial",
    description:
      "Lead daily story planning, shape breaking-news coverage, and strengthen the quality of our reporting.",
  },
  {
    title: "Frontend Developer",
    location: "Remote / Phnom Penh",
    type: "Full-time",
    team: "Product",
    description:
      "Build fast, responsive interfaces that help our stories load beautifully across devices.",
  },
  {
    title: "Community & Social Manager",
    location: "Phnom Penh, Cambodia",
    type: "Full-time",
    team: "Audience",
    description:
      "Grow reader engagement, manage social presence, and surface feedback that improves our coverage.",
  },
]

const steps = [
  {
    title: "Apply online",
    description:
      "Send us your CV, portfolio, and a short note about why the role fits you.",
    icon: ClipboardList,
  },
  {
    title: "Intro chat",
    description:
      "We schedule a short conversation to learn more about your experience and goals.",
    icon: UserRound,
  },
  {
    title: "Team interview",
    description:
      "Meet the people you would work with and discuss how you approach the role.",
    icon: Users,
  },
  {
    title: "Offer & onboarding",
    description:
      "If it’s a match, we’ll move quickly with a clear offer and a warm onboarding plan.",
    icon: BadgeCheck,
  },
]

const testimonials = [
  {
    name: "Sarah Lim",
    role: "Editor-in-Chief",
    quote:
      "We care about detail, but we also care about people. The best hires here make the newsroom better for readers and for each other.",
  },
  {
    name: "David Chan",
    role: "Audience Growth Lead",
    quote:
      "There’s room to experiment here. If you like ownership and thoughtful feedback, this is a great place to grow.",
  },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main>
      <section class="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div class="absolute inset-0">
          <div class="absolute -left-24 top-16 h-72 w-72 rounded-full bg-red-500/15 blur-3xl"></div>
          <div class="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(248,250,252,0.06),_transparent_32%)]"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              <Sparkles class="size-4" />
              Careers at COBO-NEWS
            </div>

            <h1 class="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Join a team that values craft, speed, and real impact.
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              We’re building a modern newsroom for Cambodia, and we want curious people who care about quality, collaboration, and meaningful storytelling.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="#openings"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                View open positions
                <ArrowRight class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#process"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                See the process
              </NuxtLink>
            </div>

            <div class="mt-10 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="text-2xl font-black tracking-tight">Hybrid</div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">when the role allows it</div>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="text-2xl font-black tracking-tight">Fast</div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">feedback and decisions</div>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="text-2xl font-black tracking-tight">Human</div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">supportive team culture</div>
              </div>
            </div>
          </div>

          <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.2)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400">
              <BriefcaseBusiness class="size-4" />
              Why join us
            </div>
            <div class="mt-6 space-y-4">
              <article
                v-for="perk in perks"
                :key="perk.title"
                class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <div class="flex items-center gap-3">
                  <div class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <component :is="perk.icon" class="size-5" />
                  </div>
                  <h2 class="text-base font-bold">
                    {{ perk.title }}
                  </h2>
                </div>
                <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {{ perk.description }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Culture & benefits
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              A workplace built around clarity, trust, and room to grow.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              We keep the environment professional but approachable. People here are encouraged to ask questions, improve the process, and care deeply about the output.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <LocateFixed class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">Clear direction</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Everyone knows what good looks like and how their work contributes.
              </p>
            </article>
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <CalendarDays class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">Stable rhythm</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Predictable workflows help you plan, focus, and do your best work.
              </p>
            </article>
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <BadgeCheck class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">Feedback culture</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                We share feedback honestly, respectfully, and with the goal of making each other better.
              </p>
            </article>
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <Users class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">Team support</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                You’ll work with people who are helpful, responsive, and invested in your success.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="openings" class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Open positions
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Current openings at COBO-NEWS.
            </h2>
          </div>

          <div class="mt-10 grid gap-6 lg:grid-cols-3">
            <article
              v-for="job in openings"
              :key="job.title"
              class="group rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex items-center justify-between gap-3">
                <span class="rounded-full bg-red-600/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-700 dark:bg-red-950/40 dark:text-red-300">
                  {{ job.team }}
                </span>
                <span class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {{ job.type }}
                </span>
              </div>
              <h3 class="mt-5 text-2xl font-black tracking-tight">
                {{ job.title }}
              </h3>
              <p class="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                {{ job.location }}
              </p>
              <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {{ job.description }}
              </p>
              <button
                class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition-all duration-200 hover:gap-3 dark:text-red-300"
              >
                Apply now
                <ArrowRight class="size-4" />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="process" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Application process
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              A straightforward process so candidates know what to expect.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              We move efficiently and keep communication clear at each step. That means no mystery, no unnecessary loops, and a respectful experience from start to finish.
            </p>
          </div>

          <div class="grid gap-4">
            <article
              v-for="step in steps"
              :key="step.title"
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex items-start gap-4">
                <div class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <component :is="step.icon" class="size-5" />
                </div>
                <div>
                  <h3 class="text-lg font-bold">
                    {{ step.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div class="grid gap-6 lg:grid-cols-2">
          <article
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
              <UserRound class="size-4" />
              Team voice
            </div>
            <p class="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-200">
              “{{ testimonial.quote }}”
            </p>
            <div class="mt-6">
              <p class="font-bold text-slate-950 dark:text-white">
                {{ testimonial.name }}
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ testimonial.role }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
