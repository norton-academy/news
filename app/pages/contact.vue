<script setup lang="ts">
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-vue-next"

definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Contact",
  description:
    "Contact COBO-NEWS by email, phone, or our message form. Find our office address, social links, and location map.",
  ogTitle: "Contact COBO-NEWS",
  ogDescription:
    "Reach out to COBO-NEWS through our contact form, email, phone, or social channels.",
  ogType: "website",
})

const contactDetails = [
  {
    label: "Email",
    value: "hello@cobo-news.com",
    href: "mailto:hello@cobo-news.com",
    note: "General questions and story tips",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+855 12 345 678",
    href: "tel:+85512345678",
    note: "Office hours: Mon-Fri, 8:00-17:00",
    icon: Phone,
  },
  {
    label: "Address",
    value: "Phnom Penh, Cambodia",
    href: "https://maps.google.com/?q=Phnom+Penh+Cambodia",
    note: "Editorial office and meetings by appointment",
    icon: MapPin,
  },
]

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "X", href: "#", icon: Twitter },
  { label: "YouTube", href: "#", icon: Youtube },
]

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
})

const errors = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
})

const isSubmitting = ref(false)
const isSent = ref(false)

function resetErrors() {
  errors.name = ""
  errors.email = ""
  errors.subject = ""
  errors.message = ""
}

function validateForm() {
  resetErrors()

  let isValid = true
  if (!form.name.trim()) {
    errors.name = "Name is required."
    isValid = false
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = "Email is required."
    isValid = false
  } else if (!emailPattern.test(form.email)) {
    errors.email = "Please enter a valid email address."
    isValid = false
  }

  if (!form.subject.trim()) {
    errors.subject = "Subject is required."
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = "Message is required."
    isValid = false
  } else if (form.message.trim().length < 20) {
    errors.message = "Please write at least 20 characters."
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  if (!validateForm()) return

  isSubmitting.value = true

  const mailto = new URL("mailto:hello@cobo-news.com")
  mailto.searchParams.set("subject", `[Contact] ${form.subject}`)
  mailto.searchParams.set(
    "body",
    `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
  )

  window.location.href = mailto.toString()

  isSent.value = true
  isSubmitting.value = false

  form.name = ""
  form.email = ""
  form.subject = ""
  form.message = ""

  setTimeout(() => {
    isSent.value = false
  }, 4500)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main>
      <section class="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div class="absolute inset-0">
          <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-500/15 blur-3xl"></div>
          <div class="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.12),_transparent_33%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.14),_transparent_33%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_35%)]"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              <Send class="size-4" />
              Contact COBO-NEWS
            </div>

            <h1 class="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Let’s talk about stories, partnerships, and reader feedback.
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Whether you have a news tip, a business inquiry, or a question about our coverage, we’d love to hear from you. Choose the channel that works best for you, and we’ll respond as soon as we can.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@cobo-news.com"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                hello@cobo-news.com
                <ArrowRight class="size-4" />
              </a>
              <a
                href="tel:+85512345678"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                +855 12 345 678
              </a>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <article
              v-for="detail in contactDetails"
              :key="detail.label"
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex items-center gap-3">
                <div class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <component :is="detail.icon" class="size-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {{ detail.label }}
                  </p>
                  <a :href="detail.href" class="mt-1 block text-base font-bold text-slate-950 hover:text-red-700 dark:text-white dark:hover:text-red-300">
                    {{ detail.value }}
                  </a>
                </div>
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {{ detail.note }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-10">
            <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400">
              <CheckCircle2 class="size-4" />
              Send a message
            </div>
            <h2 class="mt-4 text-3xl font-black tracking-tight">
              Contact form
            </h2>
            <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Fill out the form and we’ll open your email client with the message prefilled. The form includes frontend validation so you can catch issues before sending.
            </p>

            <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="name" class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    autocomplete="name"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                    :class="errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''"
                    placeholder="Your full name"
                  >
                  <p v-if="errors.name" class="mt-2 text-sm text-red-600">
                    {{ errors.name }}
                  </p>
                </div>

                <div>
                  <label for="email" class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                    :class="errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''"
                    placeholder="you@example.com"
                  >
                  <p v-if="errors.email" class="mt-2 text-sm text-red-600">
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <div>
                <label for="subject" class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Subject</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  :class="errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''"
                  placeholder="How can we help?"
                >
                <p v-if="errors.subject" class="mt-2 text-sm text-red-600">
                  {{ errors.subject }}
                </p>
              </div>

              <div>
                <label for="message" class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="7"
                  class="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  :class="errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''"
                  placeholder="Tell us more about your request..."
                ></textarea>
                <p v-if="errors.message" class="mt-2 text-sm text-red-600">
                  {{ errors.message }}
                </p>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  We typically reply within 1-2 business days.
                </p>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {{ isSubmitting ? "Sending..." : "Send message" }}
                  <Send class="size-4" />
                </button>
              </div>

              <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform translate-y-2 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="isSent" class="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <CheckCircle2 class="size-4" />
                  Message ready in your email client.
                </div>
              </Transition>
            </form>
          </div>

          <div class="space-y-6">
            <div class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <h2 class="text-2xl font-black tracking-tight">
                  Find us on the map
                </h2>
              </div>
              <iframe
                title="COBO-NEWS office location"
                src="https://www.google.com/maps?q=Phnom%20Penh%20Cambodia&output=embed"
                class="h-80 w-full border-0 sm:h-96"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article class="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white dark:border-slate-800">
                <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-red-300">
                  <Clock3 class="size-4" />
                  Office hours
                </div>
                <p class="mt-3 text-sm leading-7 text-slate-300">
                  Monday to Friday, 8:00 AM to 5:00 PM
                </p>
              </article>

              <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400">
                  Social
                </div>
                <div class="mt-4 flex flex-wrap gap-3">
                  <a
                    v-for="social in socialLinks"
                    :key="social.label"
                    :href="social.href"
                    class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-red-200 hover:text-red-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-800 dark:hover:text-red-300"
                  >
                    <component :is="social.icon" class="size-4" />
                    {{ social.label }}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
