<script setup lang="ts">
import { onMounted } from 'vue'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Globe2,
} from "lucide-vue-next"

// Page metadata
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "About Us",
  description: "Learn about COBO-NEWS, our mission, values, editorial vision, and the people behind our Cambodia-focused newsroom.",
  ogTitle: "About Us | COBO-NEWS",
  ogDescription: "Discover the story, mission, vision, values, and team behind COBO-NEWS.",
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
        description: "A modern Cambodia-focused newsroom delivering trusted stories, analysis, and useful context.",
      }),
    },
  ],
})

// Team members data
const team = [
  {
    name: "PHANG Rithy",
    role: "Software Engineer",
    image: "/images/team/marketing-david.jpg",
    bio: "Builds and maintains the COBO-NEWS platform, ensuring a fast, reliable, and user-friendly reader experience.",
  },
  {
    name: "Chhoeun Longheng",
    role: "Technical Lead",
    image: "/images/team/chef-michael.jpg",
    bio: "Oversees the digital architecture, scaling engine systems to support dynamic editorial delivery flawlessly.",
  },
  {
    name: "Srey Leak",
    role: "Managing Editor",
    image: "/images/team/manager-sarah.jpg",
    bio: "Sets the editorial compass, keeping our news coverage deeply focused, balanced, and locally analytical.",
  },
  {
    name: "Nika Sam",
    role: "Audience Lead",
    image: "/images/team/support-emma.jpg",
    bio: "Fosters deeper connections with readers through responsive interaction and community-first storytelling.",
  },
]

// Historical milestones
const milestones = [
  {
    year: "2019",
    title: "A newsroom with a local heartbeat",
    description: "We began with a small editorial team focused on credible Cambodia news and on-the-ground reporting.",
  },
  {
    year: "2022",
    title: "Expanded coverage",
    description: "We grew into business, technology, health, education, sports, and public-interest reporting.",
  },
  {
    year: "2026",
    title: "Built for a faster audience",
    description: "Our product now blends sharp reporting, clean presentation, and accessible storytelling across devices.",
  },
]

// Core principles with icons
const principles = [
  {
    title: "Mission",
    icon: Target,
    description: "Deliver reliable, balanced, and practical journalism that helps people understand Cambodia and the wider world.",
  },
  {
    title: "Vision",
    icon: Eye,
    description: "Become a trusted modern newsroom known for clarity, speed, and editorial integrity across every screen.",
  },
  {
    title: "Values",
    icon: ShieldCheck,
    description: "Truth first, people-centered reporting, accountability, and respect for the communities we cover.",
  },
]

// Editorial values
const values = [
  { title: "Accuracy", description: "We verify before we publish and keep context visible, not hidden." },
  { title: "Independence", description: "Editorial decisions stay separate from outside pressure and short-term noise." },
  { title: "Clarity", description: "We write to be understood quickly without flattening nuance or detail." },
  { title: "Community", description: "We create coverage that reflects real people, real places, and real impact." },
]

// Key metrics
const metrics = [
  { value: "24/7", label: "newsroom rhythm" },
  { value: "5", label: "core coverage pillars" },
  { value: "100%", label: "Cambodia-first perspective" },
]

// Scroll-triggered animation observer
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  )

  document.querySelectorAll('.scroll-anim').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main class="space-y-24 pb-24">
      
      <!-- Hero Section -->
      <section class="relative overflow-hidden border-b border-slate-200/50 bg-white pt-12 dark:border-slate-900 dark:bg-slate-950">
        <!-- Background gradients -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -left-24 top-0 h-96 w-96 rounded-full bg-red-500/10 blur-[100px]"></div>
          <div class="absolute right-0 top-16 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,_rgba(220,38,38,0.06),_transparent_40%)]"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          
          <!-- Hero Content -->
          <div class="scroll-anim flex flex-col justify-center">
            <div class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-red-200/60 bg-red-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
              <Sparkles class="size-3.5 animate-pulse" aria-hidden="true" />
              About COBO-NEWS
            </div>

            <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              A newsroom built to explain Cambodia with <span class="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent dark:from-red-400 dark:to-amber-400">clarity & speed.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
              COBO-NEWS brings together sharp reporting, operational analysis, and service journalism into a beautifully polished reading experience.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <NuxtLink to="/" class="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600 dark:bg-white dark:text-slate-950 dark:hover:bg-red-500 dark:hover:text-white">
                Read latest stories
                <ArrowRight class="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </NuxtLink>
              <NuxtLink to="#team" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900">
                Meet the team
              </NuxtLink>
            </div>

            <div class="mt-12 grid gap-4 sm:grid-cols-3">
              <div v-for="metric in metrics" :key="metric.label" class="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 dark:border-slate-900/50 dark:bg-slate-900/20">
                <div class="text-3xl font-black tracking-tight text-slate-950 dark:text-white">{{ metric.value }}</div>
                <div class="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ metric.label }}</div>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="scroll-anim relative lg:mt-0">
            <div class="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-4 shadow-xl shadow-slate-200/40 dark:border-slate-800/60 dark:bg-slate-900 dark:shadow-none">
              <div class="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                <img
                  src="/images/kitchen-story.png"
                  alt="COBO-NEWS newsroom showcase"
                  class="h-64 w-full object-cover sm:h-80 opacity-95 hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <div class="rounded-xl bg-slate-950 p-5 text-white dark:bg-slate-50 dark:text-slate-950">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 dark:text-red-600">
                    <BookOpen class="size-4" aria-hidden="true" /> Editorial focus
                  </div>
                  <p class="mt-2 text-xs leading-relaxed text-slate-300 dark:text-slate-600">News, global context, and deep local investigative modules.</p>
                </div>
                <div class="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <MapPin class="size-4 text-red-500" aria-hidden="true" /> Built in Phnom Penh
                  </div>
                  <p class="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Grounded realities matched directly with accurate regional data streams.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Timeline Section -->
      <section id="story" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div class="scroll-anim max-w-md sticky top-12 h-fit">
            <p class="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">Timeline</p>
            <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Our Evolution</h2>
            <p class="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              COBO-NEWS started with a singular, quiet task: clean up coverage gaps. Here is how we scaled into a high-performance publishing hub.
            </p>
          </div>

          <div class="relative space-y-6">
            <div class="absolute left-8 top-2 h-[calc(100%-24px)] w-px bg-slate-200 dark:bg-slate-800"></div>
            <article v-for="milestone in milestones" :key="milestone.year" class="scroll-anim relative flex gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900/40">
              <div class="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-50 font-bold text-red-600 ring-4 ring-white dark:bg-red-950/50 dark:text-red-400 dark:ring-slate-950 z-10">
                {{ milestone.year.slice(-2) }}
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-950 dark:text-white">{{ milestone.title }}</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ milestone.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Core DNA Section -->
      <section class="scroll-anim mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl border border-slate-200/60 bg-white p-8 dark:border-slate-900 dark:bg-slate-900/30 sm:p-12">
          <div class="max-w-2xl">
            <p class="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">Core DNA</p>
            <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">What Guides Our Desk</h2>
          </div>

          <div class="mt-10 grid gap-6 md:grid-cols-3">
            <article v-for="item in principles" :key="item.title" class="group rounded-2xl border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:bg-white hover:shadow-md dark:border-slate-900 dark:bg-slate-950/20 dark:hover:bg-slate-900">
              <div class="flex size-10 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm ring-1 ring-slate-100 group-hover:bg-red-600 group-hover:text-white dark:bg-slate-900 dark:ring-slate-800 transition-colors">
                <component :is="item.icon" class="size-5" aria-hidden="true" />
              </div>
              <h3 class="mt-4 text-base font-bold text-slate-950 dark:text-white">{{ item.title }}</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{{ item.description }}</p>
            </article>
          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="val in values" :key="val.title" class="rounded-xl border border-slate-100 p-5 dark:border-slate-900">
              <div class="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <CheckCircle2 class="size-4 text-red-600" aria-hidden="true" /> {{ val.title }}
              </div>
              <p class="mt-2 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{{ val.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section id="team" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="scroll-anim max-w-3xl">
          <p class="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">The Newsroom</p>
          <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">The Minds Behind the Desk</h2>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="member in team" :key="member.name" class="scroll-anim group overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-900 dark:bg-slate-900">
            <div class="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                :src="member.image"
                :alt="`${member.name}, ${member.role}`"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85"></div>
              <div class="absolute inset-x-0 bottom-0 p-5">
                <p class="text-[10px] font-bold uppercase tracking-widest text-red-400">{{ member.role }}</p>
                <h3 class="mt-1 text-lg font-bold text-white">{{ member.name }}</h3>
              </div>
            </div>
            <div class="p-5">
              <p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{{ member.bio }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="scroll-anim mx-auto max-w-7xl px-4">
        <div class="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-12 text-white dark:bg-slate-900 lg:px-16 lg:py-16">
          <div class="absolute -right-16 -top-16 size-64 rounded-full bg-red-600/20 blur-3xl pointer-events-none"></div>
          
          <div class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div class="max-w-2xl">
              <p class="text-xs font-bold uppercase tracking-widest text-red-400">Stay Informed</p>
              <h2 class="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl">Dependable news streams built for analytical clarity.</h2>
            </div>
            <div class="flex flex-wrap gap-4 shrink-0">
              <NuxtLink to="/" class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors">
                Explore Coverage <Globe2 class="size-4" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
.scroll-anim {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.scroll-anim.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>