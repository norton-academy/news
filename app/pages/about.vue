<script setup lang="ts">
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  Handshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Globe2,
} from "lucide-vue-next"

definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "About Us",
  description:
    "Learn about COBO-NEWS, our mission, values, editorial vision, and the people behind our Cambodia-focused newsroom.",
  ogTitle: "About Us | COBO-NEWS",
  ogDescription:
    "Discover the story, mission, vision, values, and team behind COBO-NEWS.",
  ogType: "website",
})

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "COBO-NEWS",
        url: "https://cobo-news.com",
        logo: "https://cobo-news.com/logo.png",
        description:
          "A modern Cambodia-focused newsroom delivering trusted stories, analysis, and useful context.",
      }),
    },
  ],
})

const milestones = [
  {
    year: "2019",
    title: "A newsroom with a local heartbeat",
    description:
      "We began with a small editorial team focused on credible Cambodia news and on-the-ground reporting.",
  },
  {
    year: "2022",
    title: "Expanded coverage",
    description:
      "We grew into business, technology, health, education, sports, and public-interest reporting.",
  },
  {
    year: "2026",
    title: "Built for a faster audience",
    description:
      "Our product now blends sharp reporting, clean presentation, and accessible storytelling across devices.",
  },
]

const principles = [
  {
    title: "Mission",
    icon: Target,
    description:
      "Deliver reliable, balanced, and practical journalism that helps people understand Cambodia and the wider world.",
  },
  {
    title: "Vision",
    icon: Eye,
    description:
      "Become a trusted modern newsroom known for clarity, speed, and editorial integrity across every screen.",
  },
  {
    title: "Values",
    icon: ShieldCheck,
    description:
      "Truth first, people-centered reporting, accountability, and respect for the communities we cover.",
  },
]

const values = [
  {
    title: "Accuracy",
    description:
      "We verify before we publish and keep context visible, not hidden.",
  },
  {
    title: "Independence",
    description:
      "Editorial decisions stay separate from outside pressure and short-term noise.",
  },
  {
    title: "Clarity",
    description:
      "We write to be understood quickly without flattening nuance or detail.",
  },
  {
    title: "Community",
    description:
      "We create coverage that reflects real people, real places, and real impact.",
  },
]

const team = [
  {
    name: "PHANG Rithy",
    role: "Software Engineer",
    image: "/images/team/marketing-david.jpg",
    bio: " Builds and maintains the COBO-NEWS website, ensuring a fast, reliable, and user-friendly experience for our readers.",
  },
  {
    name: "Chhoeun Longheng",
    role: "Technical Lead",
    image: "/images/team/chef-michael.jpg",
    bio: " Oversees the technical direction of COBO-NEWS, leading development efforts and ensuring our digital platform supports our editorial mission effectively.",
  },
  {
    name: "No Name",
    role: "None",
    image: "/images/team/manager-sarah.jpg",
    bio: "Sets the editorial direction and keeps the newsroom focused on useful, fair, and timely stories.",
  },
  {
    name: "No name",
    role: "",
    image: "/images/team/support-emma.jpg",
    bio: "Builds reader trust through responsive engagement, service stories, and community-first ideas.",
  },
]

const metrics = [
  { value: "24/7", label: "newsroom rhythm" },
  { value: "5", label: "core coverage pillars" },
  { value: "100%", label: "Cambodia-first perspective" },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main>
      <section class="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800/80 dark:bg-slate-950">
        <div class="absolute inset-0">
          <div class="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-500/15 blur-3xl"></div>
          <div class="absolute right-0 top-16 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(248,250,252,0.06),_transparent_32%)]"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div class="max-w-3xl">
            <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              <Sparkles class="size-4" />
              About COBO-NEWS
            </div>

            <h1 class="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A newsroom built to explain Cambodia with clarity, speed, and care.
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              COBO-NEWS brings together reporting, analysis, and service journalism in a clean, modern experience. We help readers understand what matters, why it matters, and what comes next.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Read the latest stories
                <ArrowRight class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#team"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                Meet the team
              </NuxtLink>
            </div>

            <div class="mt-10 grid gap-4 sm:grid-cols-3">
              <div
                v-for="metric in metrics"
                :key="metric.label"
                class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div class="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                  {{ metric.value }}
                </div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {{ metric.label }}
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2rem] bg-slate-200/60 blur-xl dark:bg-slate-800/70"></div>
            <div class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900">
              <img
                src="/images/kitchen-story.png"
                alt="COBO-NEWS newsroom story"
                class="h-72 w-full object-cover sm:h-96"
              />
              <div class="grid gap-4 p-6 sm:grid-cols-2">
                <div class="rounded-2xl bg-slate-950 p-5 text-white dark:bg-slate-50 dark:text-slate-950">
                  <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-300 dark:text-red-600">
                    <BookOpen class="size-4" />
                    Editorial focus
                  </div>
                  <p class="mt-3 text-sm leading-6 text-slate-300 dark:text-slate-600">
                    News, context, and practical coverage for readers who want the full picture.
                  </p>
                </div>
                <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    <MapPin class="size-4 text-red-600" />
                    Based in Cambodia
                  </div>
                  <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    We keep our reporting grounded in local realities and regional relevance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Our story
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              From a focused editorial desk to a full digital news experience.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              COBO-NEWS started with a simple idea: deliver trustworthy Cambodia news in a way that feels clear, fast, and genuinely useful. As our audience grew, we expanded into more beats, refined the reading experience, and built a newsroom that treats design and journalism as partners.
            </p>
          </div>

          <div class="relative">
            <div class="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-red-500 via-slate-300 to-transparent dark:via-slate-700"></div>
            <div class="space-y-6">
              <article
                v-for="milestone in milestones"
                :key="milestone.year"
                class="relative rounded-3xl border border-slate-200 bg-white p-6 pl-16 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div class="absolute left-0 top-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-slate-50 bg-red-600 text-sm font-bold text-white dark:border-slate-950">
                  {{ milestone.year }}
                </div>
                <h3 class="text-lg font-bold tracking-tight">
                  {{ milestone.title }}
                </h3>
                <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {{ milestone.description }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              What drives us
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Mission, vision, and values that guide every story we publish.
            </h2>
          </div>

          <div class="mt-10 grid gap-6 lg:grid-cols-3">
            <article
              v-for="item in principles"
              :key="item.title"
              class="group rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm ring-1 ring-slate-200 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white dark:bg-slate-950 dark:ring-slate-800">
                <component :is="item.icon" class="size-5" />
              </div>
              <h3 class="mt-5 text-xl font-bold">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {{ item.description }}
              </p>
            </article>
          </div>

          <div class="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="value in values"
              :key="value.title"
              class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <CheckCircle2 class="size-4 text-red-600" />
                {{ value.title }}
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {{ value.description }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="team" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              The team
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              A small team with a shared standard: make the news easy to trust.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              We combine editorial judgment, audience thinking, and practical design so the newsroom stays fast without losing depth or care.
            </p>
          </div>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="member in team"
            :key="member.name"
            class="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="relative h-72 overflow-hidden">
              <img
                :src="member.image"
                :alt="member.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-5">
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                  {{ member.role }}
                </p>
                <h3 class="mt-2 text-2xl font-black tracking-tight text-white">
                  {{ member.name }}
                </h3>
              </div>
            </div>
            <div class="p-6">
              <p class="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {{ member.bio }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div class="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-[0_28px_90px_-30px_rgba(15,23,42,0.6)] dark:border-slate-800 sm:px-10 lg:px-14">
          <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div class="max-w-2xl">
              <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-300">
                Work with us
              </p>
              <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                We’re building a newsroom that feels as dependable as it looks.
              </h2>
              <p class="mt-4 text-base leading-8 text-slate-300">
                If you care about thoughtful reporting, strong editorial standards, and a polished reading experience, COBO-NEWS is built for you.
              </p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <NuxtLink
                to="/"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Explore coverage
                <Globe2 class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#story"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10"
              >
                Review our story
                <ArrowRight class="size-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
