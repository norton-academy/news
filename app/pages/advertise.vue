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
  title: "ផ្សព្វផ្សាយពាណិជ្ជកម្ម",
  description:
    "ស្វែងរកឱកាសផ្សព្វផ្សាយពាណិជ្ជកម្ម និងកិច្ចសហការដៃគូជាមួយ COBO-NEWS រួមមានព័ត៌មានសង្ខេបពី Media Kit តារាងតម្លៃ អត្ថប្រយោជន៍ និងទម្រង់បែបបទទំនាក់ទំនងសម្រាប់អ្នកផ្សាយពាណិជ្ជកម្ម។",
  ogTitle: "ផ្សព្វផ្សាយពាណិជ្ជកម្មជាមួយ COBO-NEWS",
  ogDescription:
    "លើកកម្ពស់ម៉ាកយីហោរបស់អ្នកជាមួយនឹងទីតាំងផ្សាយពាណិជ្ជកម្មកម្រិតប្រីមៀម អត្ថបទឧបត្ថម្ភ (Sponsored Content) ទីតាំងលើព្រឹត្តិបត្រព័ត៌មាន (Newsletter) និងកិច្ចសហការដៃគូស្របតាមតម្រូវការ។",
  ogType: "website",
})

const adOptions = [
  {
    title: "ការបង្ហាញលេចធ្លោលើទំព័រដើម (Homepage Hero Takeover)",
    description:
      "ការមើលឃើញកម្រិតប្រីមៀមសម្រាប់យុទ្ធនាការដែលត្រូវការការយល់ដឹងពីម៉ាកយីហោខ្លាំង និងការឈានទៅដល់ទស្សនិកជនទូលំទូលាយ។",
    icon: Megaphone,
  },
  {
    title: "អត្ថបទឧបត្ថម្ភ (Sponsored Content)",
    description:
      "សាច់រឿងម៉ាកយីហោដែលឆ្លងកាត់ការគិតគូរយ៉ាងល្អិតល្អន់ បង្កើតឡើងដើម្បីផ្តល់ព័ត៌មានដល់អ្នកអាន ព្រមទាំងគាំទ្រដល់សារពាណិជ្ជកម្មរបស់អ្នក។",
    icon: Package,
  },
  {
    title: "ទីតាំងលើព្រឹត្តិបត្រព័ត៌មាន (Newsletter Placement)",
    description:
      "ឈានទៅដល់ទស្សនិកជនដែលមានភាពស្មោះត្រង់ តាមរយៈទីតាំងឧបត្ថម្ភដែលបានរៀបចំយ៉ាងសម្រិតសម្រាំងនៅក្នុងអ៊ីមែលបច្ចុប្បន្នភាពរបស់យើង។",
    icon: Mail,
  },
  {
    title: "បដាផ្សព្វផ្សាយ (Display Banners)",
    description:
      "ទីតាំងដែលអាចបត់បែនបានទាំងនៅលើកុំព្យូទ័រ និងទូរស័ព្ទដៃ សម្រាប់ការមើលឃើញជាបន្តបន្ទាប់។",
    icon: BarChart3,
  },
]

const rateCard = [
  {
    label: "ទំព័រដើម (Homepage Hero)",
    price: "$1,200 / សប្តាហ៍",
    details: "ការបង្ហាញខ្លួននៅផ្នែកខាងលើបង្អស់នៃទំព័រ ជាមួយនឹងការគាំទ្រផ្ទាំងរចនាដែលមានឥទ្ធិពលទាក់ទាញខ្ពស់។",
  },
  {
    label: "អត្ថបទឧបត្ថម្ភ (Sponsored Article)",
    price: "$850 / អត្ថបទ",
    details: "រួមបញ្ចូលទាំងការសម្របសម្រួលពីផ្នែកនិពន្ធ និងទម្រង់ខ្លឹមសារតាមលំនាំម៉ាកយីហោ។",
  },
  {
    label: "បដាលើព្រឹត្តិបត្រព័ត៌មាន (Newsletter Banner)",
    price: "$450 / ការផ្ញើ ម្តង",
    details: "បង្ហាញនៅក្នុងទីតាំងអ៊ីមែលរបស់យើងដែលមានការចូលរួមមើល (Engagement) ខ្ពស់។",
  },
  {
    label: "បដាស្តង់ដារ (Standard Display)",
    price: "$300 / សប្តាហ៍",
    details: "ប្រហោងផ្សាយពាណិជ្ជកម្មបែប Responsive នៅលើទំព័រអត្ថបទ និងទំព័រប្រភេទព័ត៌មានផ្សេងៗ។",
  },
]

const benefits = [
  "ក្រុមទស្សនិកជនកម្រិតអាជីពដែលផ្តោតលើប្រទេសកម្ពុជា",
  "ការបង្ហាញស្អាតស្អំ ប្រកបដោយសុវត្ថិភាពសម្រាប់ម៉ាកយីហោ (Brand-safe)",
  "ទីតាំងផ្សាយពាណិជ្ជកម្មឆ្លើយតបបានល្អ (Responsive) លើគ្រប់ឧបករណ៍",
  "កញ្ចប់សេវាកម្មដែលអាចបត់បែនបាន សម្រាប់យុទ្ធនាការរយៈពេលខ្លី ឬវែង",
  "ការគាំទ្រសម្រាប់គំនិតសហការដៃគូស្របតាមតម្រូវការជាក់ស្តែង",
  "របាយការណ៍លទ្ធផលការងារច្បាស់លាស់តាមការស្នើសុំ",
]

const mediaKit = [
  {
    title: "ទិន្នន័យសង្ខេបនៃទស្សនិកជន",
    description: "ប្រជាសាស្ត្ររបស់អ្នកអាន ចំណាប់អារម្មណ៍ចម្បង និងនិន្នាការចរាចរណ៍គេហទំព័រ (Traffic)។",
    icon: Users,
  },
  {
    title: "បញ្ជីទីតាំងផ្សាយពាណិជ្ជកម្ម",
    description: "ទម្រង់ដែលមានស្រាប់ ទីតាំងនៅលើទំព័រ និងការណែនាំអំពីទំហំបដា។",
    icon: Target,
  },
  {
    title: "រង្វាស់លទ្ធផលការងារ",
    description: "ចំនួននៃការបង្ហាញ (Impressions) ជាមធ្យម កម្រិត CTR និងស្តង់ដារវាយតម្លៃយុទ្ធនាការ។",
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
    formErrors.name = "សូមបញ្ជាក់ឈ្មោះរបស់អ្នក។"
    valid = false
  }

  if (!advertiserForm.company.trim()) {
    formErrors.company = "សូមបញ្ជាក់ឈ្មោះក្រុមហ៊ុន។"
    valid = false
  }

  if (!advertiserForm.email.trim()) {
    formErrors.email = "សូមបញ្ជាក់អ៊ីមែល។"
    valid = false
  } else if (!emailPattern.test(advertiserForm.email)) {
    formErrors.email = "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ។"
    valid = false
  }

  if (!advertiserForm.budget.trim()) {
    formErrors.budget = "សូមជ្រើសរើសចន្លោះកញ្ចប់ថវិកា។"
    valid = false
  }

  if (!advertiserForm.message.trim()) {
    formErrors.message = "សូមប្រាប់យើងបន្តិចបន្តួចអំពីយុទ្ធនាការរបស់អ្នក។"
    valid = false
  } else if (advertiserForm.message.trim().length < 20) {
    formErrors.message = "សូមសរសេរយ៉ាងហោចណាស់ឱ្យបាន ២០ តួអក្សរ។"
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
      <!-- Hero Section -->
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
              ការផ្សព្វផ្សាយពាណិជ្ជកម្ម & កិច្ចសហការដៃគូ
            </div>

            <h1 class="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              ពង្រីកម៉ាកយីហោរបស់អ្នកជាមួយនឹងទីតាំងកម្រិតប្រីមៀម និងការឈានទៅដល់ដ៏គួរឱ្យទុកចិត្ត។
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              COBO-NEWS ផ្តល់ឱកាសផ្សព្វផ្សាយពាណិជ្ជកម្មប្រកបដោយសុវត្ថិភាពសម្រាប់ម៉ាកយីហោ និងមានភាពបត់បែនឆ្លើយតបបានល្អ សម្រាប់ក្រុមហ៊ុនដែលចង់ភ្ជាប់ទំនាក់ទំនងជាមួយក្រុមទស្សនិកជនដែលមានការចូលរួមខ្ពស់នៅក្នុងប្រទេសកម្ពុជា។
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="#contact"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                ស្នើសុំកញ្ចប់សេវាកម្ម
                <ArrowRight class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#rates"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                មើលតារាងតម្លៃ
              </NuxtLink>
            </div>
          </div>

          <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.2)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400">
              <BadgeDollarSign class="size-4" />
              សង្ខេបព័ត៌មាន Media kit
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

      <!-- Options Section -->
      <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              ជម្រើសផ្សព្វផ្សាយពាណិជ្ជកម្ម
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ទម្រង់ដ៏សម្បូរបែបដែលរចនាឡើងសម្រាប់គោលដៅយុទ្ធនាការផ្សេងៗគ្នា។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              មិនថាអ្នកចង់បង្កើនការយល់ដឹងពីម៉ាកយីហោ បង្ហាញភាពជាអ្នកដឹកនាំផ្នែកគំនិត ឬគាំទ្រដល់យុទ្ធនាការដោយផ្ទាល់នោះទេ យើងអាចរៀបចំកញ្ចប់សេវាកម្មដែលសមស្របទៅនឹងសារ និងពេលវេលារបស់អ្នក។
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

      <!-- Benefits Section -->
      <section class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              ហេតុអ្វីគួរផ្សព្វផ្សាយជាមួយយើង
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ការរួមបញ្ចូលគ្នាយ៉ាងរឹងមាំរវាងទំនុកចិត្តពីទស្សនិកជន ការរចនាស្អាតស្អំ និងភាពបត់បែននៃយុទ្ធនាការ។
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
                អត្ថប្រយោជន៍
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {{ benefit }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Rates Section -->
      <section id="rates" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              តារាងតម្លៃ
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              តម្លៃចាប់ផ្តើមប្រកបដោយតម្លាភាពសម្រាប់ទីតាំងទូទៅ។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              តម្លៃទាំងនេះគ្រាន់តែជាចំណុចចាប់ផ្តើមប៉ុណ្ណោះ ហើយអាចប្រែប្រួលទៅតាមរយៈពេលនៃយុទ្ធនាការ តម្រូវការនៃការរចនា និងបរិមាណទីតាំងដែលអ្នកជ្រើសរើស។
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

      <!-- Contact Section Form -->
      <section id="contact" class="border-t border-slate-200/80 bg-slate-950 py-16 text-white dark:border-slate-800 lg:py-24">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-300">
              ទម្រង់បែបបទទំនាក់ទំនងសម្រាប់អ្នកផ្សាយពាណិជ្ជកម្ម
            </p>
            <h2 class="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              ប្រាប់យើងអំពីយុទ្ធនាការរបស់អ្នក ហើយយើងនឹងទាក់ទងទៅវិញជាមួយនឹងកញ្ចប់សេវាកម្មដែលសមស្របបំផុត។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-300">
              ចែករំលែកគោលដៅ ពេលវេលា និងចន្លោះកញ្ចប់ថវិការបស់អ្នក។ យើងនឹងពិនិត្យមើលសំណើនេះ ហើយឆ្លើយតបវិញជាមួយនឹងជម្រើសដែលពាក់ព័ន្ធបំផុត។
            </p>
          </div>

          <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
            <form class="space-y-5" @submit.prevent="submitAdvertiserForm">
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="name" class="mb-2 block text-sm font-semibold text-slate-200">ឈ្មោះរបស់អ្នក</label>
                  <input id="name" v-model="advertiserForm.name" type="text" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.name ? 'border-red-500' : ''" placeholder="ឧ. ចាន់ ម៉ានី">
                  <p v-if="formErrors.name" class="mt-2 text-sm text-red-300">{{ formErrors.name }}</p>
                </div>
                <div>
                  <label for="company" class="mb-2 block text-sm font-semibold text-slate-200">ក្រុមហ៊ុន</label>
                  <input id="company" v-model="advertiserForm.company" type="text" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.company ? 'border-red-500' : ''" placeholder="ឈ្មោះក្រុមហ៊ុនរបស់អ្នក">
                  <p v-if="formErrors.company" class="mt-2 text-sm text-red-300">{{ formErrors.company }}</p>
                </div>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="email" class="mb-2 block text-sm font-semibold text-slate-200">អ៊ីមែល</label>
                  <input id="email" v-model="advertiserForm.email" type="email" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.email ? 'border-red-500' : ''" placeholder="name@company.com">
                  <p v-if="formErrors.email" class="mt-2 text-sm text-red-300">{{ formErrors.email }}</p>
                </div>
                <div>
                  <label for="budget" class="mb-2 block text-sm font-semibold text-slate-200">ចន្លោះកញ្ចប់ថវិកា</label>
                  <select id="budget" v-model="advertiserForm.budget" class="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.budget ? 'border-red-500' : ''">
                    <option value="" disabled>ជ្រើសរើសចន្លោះថវិកា</option>
                    <option value="Under $500">ក្រោម $500</option>
                    <option value="$500 - $1,500">$500 - $1,500</option>
                    <option value="$1,500 - $5,000">$1,500 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                  <p v-if="formErrors.budget" class="mt-2 text-sm text-red-300">{{ formErrors.budget }}</p>
                </div>
              </div>

              <div>
                <label for="message" class="mb-2 block text-sm font-semibold text-slate-200">ព័ត៌មានលម្អិតនៃគម្រោង</label>
                <textarea id="message" v-model="advertiserForm.message" rows="6" class="w-full rounded-[1.5rem] border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10" :class="formErrors.message ? 'border-red-500' : ''" placeholder="ប្រាប់យើងអំពីគោលដៅយុទ្ធនាការ ពេលវេលា និងទីតាំងផ្សាយពាណិជ្ជកម្មដែលអ្នកពេញចិត្ត។"></textarea>
                <p v-if="formErrors.message" class="mt-2 text-sm text-red-300">{{ formErrors.message }}</p>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-sm text-slate-300">ជាទូទៅ យើងនឹងឆ្លើយតបវិញក្នុងរយៈពេល ១ ទៅ ២ ថ្ងៃធ្វើការ។</p>
                <button type="submit" :disabled="isSending" class="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70">
                  {{ isSending ? "កំពុងផ្ញើ..." : "ផ្ញើសំណើ" }}
                  <ArrowRight class="size-4" />
                </button>
              </div>

              <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="isSubmitted" class="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
                  សំណើរបស់អ្នកត្រូវបានរៀបចំរួចរាល់នៅក្នុងកម្មវិធីអ៊ីមែលរបស់អ្នក។
                </div>
              </Transition>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>