<script setup lang="ts">
import {
  ArrowDownToLine,
  BadgeInfo,
  BookMarked,
  CalendarDays,
  CircleUserRound,
  FileText,
  Globe2,
  Mail,
  Megaphone,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-vue-next"

definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Press Kit",
  description:
    "Download COBO-NEWS brand assets, read brand guidelines, browse press releases, and find media contact details.",
  ogTitle: "Press Kit | COBO-NEWS",
  ogDescription:
    "Access logos, images, brand guidelines, press releases, and media contact information for COBO-NEWS.",
  ogType: "website",
})

const brandAssets = [
  {
    title: "Primary logo",
    format: "PNG",
    size: "High-res",
    href: "/logo.png",
  },
  {
    title: "Vector logo",
    format: "SVG",
    size: "Scalable",
    href: "/logo.svg",
  },
  {
    title: "Alternate mark",
    format: "PNG",
    size: "Transparent",
    href: "/logo.png",
  },
  {
    title: "Editorial image pack",
    format: "PNG",
    size: "Press-ready",
    href: "/images/kitchen-story.png",
  },
]

const guidelines = [
  "Use the logo with enough clear space around it.",
  "Prefer the full-color version on light backgrounds.",
  "Use the SVG when you need crisp scaling for print or web.",
  "Do not distort, recolor, or place the logo on busy backgrounds.",
]

const pressReleases = [
  {
    title: "COBO-NEWS expands public-interest coverage",
    date: "June 2026",
    summary:
      "A newsroom update focused on deeper reporting across business, education, and community stories.",
  },
  {
    title: "New mobile reading experience launched",
    date: "April 2026",
    summary:
      "COBO-NEWS introduces a faster, more accessible design for readers on phones and tablets.",
  },
  {
    title: "COBO-NEWS announces partnership program",
    date: "January 2026",
    summary:
      "An overview of new collaboration opportunities for brands and institutions.",
  },
]

const mediaContacts = [
  {
    label: "Email",
    value: "press@cobo-news.com",
    href: "mailto:press@cobo-news.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+855 12 345 678",
    href: "tel:+85512345678",
    icon: CircleUserRound,
  },
  {
    label: "Website",
    value: "cobo-news.com",
    href: "/",
    icon: Globe2,
  },
]

const imageAssets = [
  {
    title: "Newsroom image",
    description: "A versatile high-resolution hero image for media coverage.",
    href: "/images/kitchen-story.png",
  },
  {
    title: "Team portrait",
    description: "Use our team images for feature stories or partner profiles.",
    href: "/images/team/manager-sarah.jpg",
  },
  {
    title: "Editorial visual",
    description: "Suitable for article headers and press coverage thumbnails.",
    href: "/img_5.png",
  },
]

const downloads = [
  {
    title: "Logo PNG",
    note: "Best for presentations and quick use",
    href: "/logo.png",
  },
  {
    title: "Logo SVG",
    note: "Best for print and scalable layouts",
    href: "/logo.svg",
  },
  {
    title: "Media photo pack",
    note: "High-resolution imagery for press use",
    href: "/images/kitchen-story.png",
  },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main>
      <section class="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div class="absolute inset-0">
          <div class="absolute -left-24 top-8 h-72 w-72 rounded-full bg-red-500/15 blur-3xl"></div>
          <div class="absolute right-0 top-16 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(248,250,252,0.06),_transparent_32%)]"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              <BadgeInfo class="size-4" />
              Press kit
            </div>

            <h1 class="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Brand assets and media resources for COBO-NEWS coverage.
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Access our logos, images, brand guidance, and press materials in one professional, easy-to-navigate location.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="#downloads"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Download assets
                <ArrowDownToLine class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#contact"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                Media contact
              </NuxtLink>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="flex items-center gap-3">
                <div class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <ShieldCheck class="size-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Professional standard
                  </p>
                  <h2 class="mt-1 text-lg font-bold">Trustworthy brand use</h2>
                </div>
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                We keep our brand assets organized and easy to use for editorial teams, partners, and media outlets.
              </p>
            </article>

            <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="flex items-center gap-3">
                <div class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <FileText class="size-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Press archive
                  </p>
                  <h2 class="mt-1 text-lg font-bold">Latest newsroom updates</h2>
                </div>
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Browse a summary of recent press announcements and newsroom milestones.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="downloads" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Downloadable assets
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Logos, photos, and brand files ready for media use.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              Use these files for articles, interviews, partner announcements, and press coverage. PNG is useful for quick usage, while SVG is best for crisp scaling.
            </p>
          </div>

          <div class="grid gap-4">
            <article
              v-for="asset in brandAssets"
              :key="asset.title"
              class="flex flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 class="text-lg font-bold">{{ asset.title }}</h3>
                <p class="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {{ asset.format }} · {{ asset.size }}
                </p>
              </div>
              <a
                :href="asset.href"
                :download="asset.href"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-red-500"
              >
                Download
                <ArrowDownToLine class="size-4" />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
                Brand guidelines
              </p>
              <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Simple rules that keep our visual identity consistent.
              </h2>
              <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                If you need the logo or imagery for media use, please follow the guidance below so the brand stays clear, legible, and trustworthy.
              </p>
            </div>

            <div class="grid gap-4">
              <article
                v-for="item in guidelines"
                :key="item"
                class="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div class="flex items-start gap-3">
                  <BookMarked class="mt-0.5 size-5 text-red-600" />
                  <p class="text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {{ item }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Press releases
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Archive of recent newsroom announcements.
            </h2>
          </div>

          <div class="space-y-4">
            <article
              v-for="release in pressReleases"
              :key="release.title"
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <CalendarDays class="size-4 text-red-600" />
                {{ release.date }}
              </div>
              <h3 class="mt-3 text-xl font-bold">{{ release.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {{ release.summary }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div class="grid gap-4 sm:grid-cols-2">
              <article
                v-for="image in imageAssets"
                :key="image.title"
                class="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <img :src="image.href" :alt="image.title" class="h-52 w-full object-cover">
                <div class="p-5">
                  <h3 class="text-lg font-bold">{{ image.title }}</h3>
                  <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {{ image.description }}
                  </p>
                </div>
              </article>
            </div>

            <div>
              <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
                Media contact
              </p>
              <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Reach our communications team for press requests.
              </h2>
              <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                We welcome interview requests, fact-checking questions, brand approvals, and partnership inquiries.
              </p>

              <div id="contact" class="mt-8 space-y-4">
                <article
                  v-for="contact in mediaContacts"
                  :key="contact.label"
                  class="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <component :is="contact.icon" class="size-4" />
                    </div>
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        {{ contact.label }}
                      </p>
                      <a :href="contact.href" class="mt-1 block text-base font-bold text-slate-950 hover:text-red-700 dark:text-white dark:hover:text-red-300">
                        {{ contact.value }}
                      </a>
                    </div>
                  </div>
                </article>
              </div>

              <a
                href="mailto:press@cobo-news.com"
                class="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Email press team
                <Mail class="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-28">
        <div class="grid gap-4 md:grid-cols-3">
          <article
            v-for="asset in downloads"
            :key="asset.title"
            class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex items-center gap-3">
              <div class="flex size-11 items-center justify-center rounded-2xl bg-red-600/10 text-red-700 dark:bg-red-950/40 dark:text-red-300">
                <ArrowDownToLine class="size-5" />
              </div>
              <div>
                <h3 class="text-lg font-bold">{{ asset.title }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  {{ asset.note }}
                </p>
              </div>
            </div>
            <a
              :href="asset.href"
              :download="asset.href"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition-all duration-200 hover:gap-3 dark:text-red-300"
            >
              Download asset
              <ArrowDownToLine class="size-4" />
            </a>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
