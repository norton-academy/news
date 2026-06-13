<script setup lang="ts">
import {
  ArrowRight,
  BarChart3,
  BadgeDollarSign,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Mail,
  Megaphone,
  Package,
  Target,
  Users,
} from "lucide-vue-next"

definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Advertise",
  description:
    "Explore advertising and partnership opportunities with COBO-NEWS, including media kit highlights, rate card, benefits, and advertiser contact form.",
  ogTitle: "Advertise with COBO-NEWS",
  ogDescription:
    "Promote your brand with premium placements, sponsored content, newsletter spots, and custom partnerships.",
  ogType: "website",
})

const adOptions = [
  {
    title: "Homepage hero takeover",
    description:
      "Premium visibility for campaigns that need strong brand awareness and broad reach.",
    icon: Megaphone,
  },
  {
    title: "Sponsored content",
    description:
      "Thoughtful branded stories designed to inform readers while supporting your message.",
    icon: Package,
  },
  {
    title: "Newsletter placement",
    description:
      "Reach a loyal audience with curated sponsor spots in our email updates.",
    icon: Mail,
  },
  {
    title: "Display banners",
    description:
      "Flexible placements across desktop and mobile for ongoing visibility.",
    icon: BarChart3,
  },
]

const rateCard = [
  {
    label: "Homepage hero",
    price: "$1,200 / week",
    details: "Top-of-page exposure with high-impact creative support.",
  },
  {
    label: "Sponsored article",
    price: "$850 / piece",
    details: "Includes editorial coordination and branded content format.",
  },
  {
    label: "Newsletter banner",
    price: "$450 / send",
    details: "Appears in our high-engagement email placements.",
  },
  {
    label: "Standard display",
    price: "$300 / week",
    details: "Responsive ad slots across article and category pages.",
  },
]

const benefits = [
  "Professional Cambodia-focused audience",
  "Clean, brand-safe presentation",
  "Responsive placements across devices",
  "Flexible packages for short or long campaigns",
  "Support for custom partnership ideas",
  "Clear performance reporting on request",
]

const mediaKit = [
  {
    title: "Audience snapshot",
    description: "Reader demographics, top interests, and traffic trends.",
    icon: Users,
  },
  {
    title: "Placement inventory",
    description: "Available formats, page positions, and sizing guidance.",
    icon: Target,
  },
  {
    title: "Performance metrics",
    description: "Typical impressions, CTR ranges, and campaign benchmarks.",
    icon: Gauge,
  },
]

const advertiserForm = reactive({
  name: "",
  company: "",
  email: "",
  budget: "",
  message: "",
})

const formErrors = reactive({
  name: "",
  company: "",
  email: "",
  budget: "",
  message: "",
})

const isSending = ref(false)
const isSubmitted = ref(false)

function clearErrors() {
  formErrors.name = ""
  formErrors.company = ""
  formErrors.email = ""
  formErrors.budget = ""
  formErrors.message = ""
}

function validateAdvertiserForm() {
  clearErrors()

  let valid = true
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!advertiserForm.name.trim()) {
    formErrors.name = "Your name is required."
    valid = false
  }

  if (!advertiserForm.company.trim()) {
    formErrors.company = "Company name is required."
    valid = false
  }

  if (!advertiserForm.email.trim()) {
    formErrors.email = "Email is required."
    valid = false
  } else if (!emailPattern.test(advertiserForm.email)) {
    formErrors.email = "Enter a valid email address."
    valid = false
  }

  if (!advertiserForm.budget.trim()) {
    formErrors.budget = "Please select a budget range."
    valid = false
  }

  if (!advertiserForm.message.trim()) {
    formErrors.message = "Tell us a little about your campaign."
    valid = false
  } else if (advertiserForm.message.trim().length < 20) {
    formErrors.message = "Please include at least 20 characters."
    valid = false
  }

  return valid
}

function submitAdvertiserForm() {
  if (!validateAdvertiserForm()) return

  isSending.value = true
  const mailto = new URL("mailto:ads@cobo-news.com")
  mailto.searchParams.set("subject", `[Advertising Inquiry] ${advertiserForm.company}`)
  mailto.searchParams.set(
    "body",
    `Name: ${advertiserForm.name}\nCompany: ${advertiserForm.company}\nEmail: ${advertiserForm.email}\nBudget: ${advertiserForm.budget}\n\n${advertiserForm.message}`,
  )

  window.location.href = mailto.toString()

  isSending.value = false
  isSubmitted.value = true

  advertiserForm.name = ""
  advertiserForm.company = ""
  advertiserForm.email = ""
  advertiserForm.budget = ""
  advertiserForm.message = ""

  setTimeout(() => {
    isSubmitted.value = false
  }, 4000)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main>
      <section class="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div class="absolute inset-0">
          <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-500/15 blur-3xl"></div>
          <div class="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(248,250,252,0.06),_transparent_32%)]"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              <Megaphone class="size-4" />
              Advertising & partnerships
            </div>

            <h1 class="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Grow your brand with premium placements and trusted reach.
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              COBO-NEWS offers brand-safe, responsive advertising opportunities for companies that want to connect with an engaged Cambodia-focused audience.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="#contact"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Request a proposal
                <ArrowRight class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#rates"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                View rate card
              </NuxtLink>
            </div>
          </div>

          <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.2)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400">
              <BadgeDollarSign class="size-4" />
              Media kit summary
            </div>
            <div class="mt-6 space-y-4">
              <article
                v-for="item in mediaKit"
                :key="item.title"
                class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <div class="flex items-center gap-3">
                  <div class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <component :is="item.icon" class="size-5" />
                  </div>
                  <h2 class="text-base font-bold">{{ item.title }}</h2>
                </div>
                <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {{ item.description }}
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
              Advertising options
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Flexible formats designed for different campaign goals.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              Whether you want awareness, thought leadership, or direct campaign support, we can tailor a package that fits your message and timeline.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <article
              v-for="item in adOptions"
              :key="item.title"
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <component :is="item.icon" class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Why advertise with us
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              A strong mix of audience trust, clean design, and campaign flexibility.
            </h2>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="benefit in benefits"
              :key="benefit"
              class="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <CheckCircle2 class="size-4 text-red-600" />
                Benefit
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {{ benefit }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="rates" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              Rate card
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Transparent starting prices for common placements.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              Rates are starting points and may vary based on campaign length, creative requirements, and placement volume.
            </p>
          </div>

          <div class="grid gap-4">
            <article
              v-for="item in rateCard"
              :key="item.label"
              class="flex flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 class="text-lg font-bold">{{ item.label }}</h3>
                <p class="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {{ item.details }}
                </p>
              </div>
              <div class="text-lg font-black text-red-700 dark:text-red-300">
                {{ item.price }}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="border-t border-slate-200/80 bg-slate-950 py-16 text-white dark:border-slate-800 lg:py-24">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-300">
              Advertiser contact form
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Tell us about your campaign and we’ll follow up with a tailored proposal.
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-300">
              Share your goals, timing, and budget range. We’ll review the request and respond with the most relevant options.
            </p>
          </div>

          <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
            <form class="space-y-5" @submit.prevent="submitAdvertiserForm">
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="name" class="mb-2 block text-sm font-semibold text-slate-200">Your name</label>
                  <input id="name" v-model="advertiserForm.name" type="text" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.name ? 'border-red-500' : ''" placeholder="Jane Doe">
                  <p v-if="formErrors.name" class="mt-2 text-sm text-red-300">{{ formErrors.name }}</p>
                </div>
                <div>
                  <label for="company" class="mb-2 block text-sm font-semibold text-slate-200">Company</label>
                  <input id="company" v-model="advertiserForm.company" type="text" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.company ? 'border-red-500' : ''" placeholder="Company name">
                  <p v-if="formErrors.company" class="mt-2 text-sm text-red-300">{{ formErrors.company }}</p>
                </div>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="email" class="mb-2 block text-sm font-semibold text-slate-200">Email</label>
                  <input id="email" v-model="advertiserForm.email" type="email" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.email ? 'border-red-500' : ''" placeholder="name@company.com">
                  <p v-if="formErrors.email" class="mt-2 text-sm text-red-300">{{ formErrors.email }}</p>
                </div>
                <div>
                  <label for="budget" class="mb-2 block text-sm font-semibold text-slate-200">Budget range</label>
                  <select id="budget" v-model="advertiserForm.budget" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.budget ? 'border-red-500' : ''">
                    <option value="" disabled>Select a range</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1,500">$500 - $1,500</option>
                    <option value="$1,500 - $5,000">$1,500 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                  <p v-if="formErrors.budget" class="mt-2 text-sm text-red-300">{{ formErrors.budget }}</p>
                </div>
              </div>

              <div>
                <label for="message" class="mb-2 block text-sm font-semibold text-slate-200">Project details</label>
                <textarea id="message" v-model="advertiserForm.message" rows="6" class="w-full rounded-[1.5rem] border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.message ? 'border-red-500' : ''" placeholder="Tell us about your campaign goals, timeline, and preferred placements."></textarea>
                <p v-if="formErrors.message" class="mt-2 text-sm text-red-300">{{ formErrors.message }}</p>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-sm text-slate-300">We typically respond within 1-2 business days.</p>
                <button type="submit" :disabled="isSending" class="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70">
                  {{ isSending ? "Sending..." : "Send inquiry" }}
                  <ArrowRight class="size-4" />
                </button>
              </div>

              <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="isSubmitted" class="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
                  Request ready in your email client.
                </div>
              </Transition>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
