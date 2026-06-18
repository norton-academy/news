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
  title: "កញ្ចប់ព័ត៌មានប្រព័ន្ធផ្សព្វផ្សាយ (Press Kit)",
  description:
    "ទាញយកទ្រព្យសកម្មម៉ាកយីហោ (Brand Assets) របស់ COBO-NEWS អានការណែនាំអំពីការប្រើប្រាស់ម៉ាកយីហោ ពិនិត្យមើលសេចក្តីថ្លែងការណ៍ព័ត៌មាន និងស្វែងរកព័ត៌មានលម្អិតសម្រាប់ទាក់ទងផ្នែកប្រព័ន្ធផ្សព្វផ្សាយ។",
  ogTitle: "កញ្ចប់ព័ត៌មានប្រព័ន្ធផ្សព្វផ្សាយ | COBO-NEWS",
  ogDescription:
    "ចូលប្រើប្រាស់រូបសញ្ញា (Logos) រូបភាព ការណែនាំអំពីម៉ាកយីហោ សេចក្តីថ្លែងការណ៍ព័ត៌មាន និងព័ត៌មានទំនាក់ទំនងប្រព័ន្ធផ្សព្វផ្សាយសម្រាប់ COBO-NEWS។",
  ogType: "website",
})

const brandAssets = [
  {
    title: "រូបសញ្ញាចម្បង (Primary logo)",
    format: "PNG",
    size: "កម្រិតច្បាស់ខ្ពស់",
    href: "/logo.png",
  },
  {
    title: "រូបសញ្ញាវ៉ិចទ័រ (Vector logo)",
    format: "SVG",
    size: "អាចពង្រីកបង្រួមបាន",
    href: "/logo.svg",
  },
  {
    title: "និមិត្តសញ្ញា (Alternate mark)",
    format: "PNG",
    size: "ផ្ទៃខាងក្រោយថ្លា",
    href: "/logo.png",
  },
  {
    title: "កញ្ចប់រូបភាពសម្រាប់សារព័ត៌មាន",
    format: "PNG",
    size: "រួចរាល់សម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយ",
    href: "/images/kitchen-story.png",
  },
]

const guidelines = [
  "ប្រើប្រាស់រូបសញ្ញាដោយរក្សាលំហទំនេរជុំវិញឱ្យបានគ្រប់គ្រាន់។",
  "ផ្តល់អាទិភាពដល់រូបសញ្ញាដែលមានពណ៌ពេញលេញនៅលើផ្ទៃខាងក្រោយពណ៌ស្រាល។",
  "ប្រើប្រាស់ទម្រង់ SVG នៅពេលអ្នកត្រូវការកម្រិតច្បាស់សម្រាប់ការបោះពុម្ព ឬលើបណ្តាញវ៉ិប។",
  "មិនត្រូវធ្វើឱ្យខូចទ្រង់ទ្រាយ ផ្លាស់ប្តូរពណ៌ ឬដាក់រូបសញ្ញានៅលើផ្ទៃខាងក្រោយដែលមានភាពរញ៉េរញ៉ៃឡើយ។",
]

const pressReleases = [
  {
    title: "COBO-NEWS ពង្រីកវិសាលភាពនៃការផ្សាយដើម្បីផលប្រយោជន៍សាធារណៈ",
    date: "មិថុនា ២០២៦",
    summary:
      "ការធ្វើបច្ចុប្បន្នភាពបន្ទប់ព័ត៌មានដែលផ្តោតលើការរាយការណ៍ស៊ីជម្រៅជុំវិញរឿងរ៉ាវអាជីវកម្ម អប់រំ និងសហគមន៍។",
  },
  {
    title: "ការដាក់ឱ្យដំណើរការបទពិសោធន៍អានថ្មីលើទូរស័ព្ទដៃ",
    date: "មេសា ២០២៦",
    summary:
      "COBO-NEWS ណែនាំទម្រង់រចនាដែលលឿនជាងមុន និងងាយស្រួលចូលមើលជាងមុនសម្រាប់អ្នកអានតាមទូរស័ព្ទ និងថេប្លេត។",
  },
  {
    title: "COBO-NEWS ប្រកាសបើកកម្មវិធីកិច្ចសហការដៃគូ",
    date: "មករា ២០២៦",
    summary:
      "ទិដ្ឋភាពទូទៅនៃឱកាសសហការថ្មីៗសម្រាប់បណ្តាម៉ាកយីហោ និងស្ថាប័នផ្សេងៗ។",
  },
]

const mediaContacts = [
  {
    label: "អ៊ីមែល",
    value: "press@cobo-news.com",
    href: "mailto:press@cobo-news.com",
    icon: Mail,
  },
  {
    label: "ទូរស័ព្ទ",
    value: "+855 12 345 678",
    href: "tel:+85512345678",
    icon: CircleUserRound,
  },
  {
    label: "គេហទំព័រ",
    value: "cobo-news.com",
    href: "/",
    icon: Globe2,
  },
]

const imageAssets = [
  {
    title: "រូបភាពបន្ទប់ព័ត៌មាន",
    description: "រូបភាពចម្បងកម្រិតច្បាស់ខ្ពស់ ដែលអាចប្រើប្រាស់បានច្រើនទម្រង់សម្រាប់ការចុះផ្សាយរបស់ប្រព័ន្ធផ្សព្វផ្សាយ។",
    href: "/cobo_news.png",
  },
  {
    title: "រូបថតក្រុមការងារ",
    description: "ប្រើប្រាស់រូបភាពក្រុមការងាររបស់យើងសម្រាប់អត្ថបទពិសេស ឬព័ត៌មានសង្ខេបរបស់ដៃគូ។",
    href: "/team.png",
  },
  {
    title: "រូបភាពសម្រាប់ផ្នែកនិពន្ធ",
    description: "សាកសមសម្រាប់ដាក់ជាក្បាលអត្ថបទ និងរូបភាពតំណាង (Thumbnails) នៃការចុះផ្សាយព័ត៌មាន។",
    href: "/img_5.png",
  },
]

const downloads = [
  {
    title: "រូបសញ្ញា PNG",
    note: "ល្អបំផុតសម្រាប់បទបង្ហាញ និងការប្រើប្រាស់រហ័ស",
    href: "/logo.png",
  },
  {
    title: "រូបសញ្ញា SVG",
    note: "ល្អបំផុតសម្រាប់ការបោះពុម្ព និងទម្រង់ដែលអាចពង្រីកទំហំបាន",
    href: "/logo.svg",
  },
  {
    title: "កញ្ចប់រូបថតប្រព័ន្ធផ្សព្វផ្សាយ",
    note: "កម្រិតរូបភាពច្បាស់ខ្ពស់សម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយប្រើប្រាស់",
    href: "/images/kitchen-story.png",
  },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main>
      <!-- Hero Section -->
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
              កញ្ចប់ព័ត៌មានប្រព័ន្ធផ្សព្វផ្សាយ
            </div>

            <h1 class="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              ទ្រព្យសកម្មម៉ាកយីហោ និងធនធានប្រព័ន្ធផ្សព្វផ្សាយសម្រាប់ការចុះផ្សាយពី COBO-NEWS។
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              ចូលប្រើប្រាស់រូបសញ្ញា រូបភាព ការណែនាំអំពីម៉ាកយីហោ និងឯកសារសារព័ត៌មានរបស់យើងនៅក្នុងទីតាំងតែមួយប្រកបដោយវិជ្ជាជីវៈ និងងាយស្រួលស្វែងរក។
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="#downloads"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                ទាញយកទ្រព្យសកម្ម
                <ArrowDownToLine class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#contact"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                ទំនាក់ទំនងប្រព័ន្ធផ្សព្វផ្សាយ
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
                    ស្តង់ដារវិជ្ជាជីវៈ
                  </p>
                  <h2 class="mt-1 text-lg font-bold">ការប្រើប្រាស់ម៉ាកយីហោដោយទំនុកចិត្ត</h2>
                </div>
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                យើងរក្សាទុកទ្រព្យសកម្មម៉ាកយីហោរបស់យើងឱ្យមានសណ្តាប់ធ្នាប់ និងងាយស្រួលប្រើប្រាស់សម្រាប់ក្រុមការងារនិពន្ធ ដៃគូសហការ និងស្ថាប័នព័ត៌មានផ្សេងៗ។
              </p>
            </article>

            <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="flex items-center gap-3">
                <div class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <FileText class="size-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    បណ្ណសារសារព័ត៌មាន
                  </p>
                  <h2 class="mt-1 text-lg font-bold">បច្ចុប្បន្នភាពបន្ទប់ព័ត៌មានចុងក្រោយ</h2>
                </div>
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                ពិនិត្យមើលសេចក្តីសង្ខេបនៃការប្រកាសព័ត៌មានថ្មីៗ និងសមិទ្ធផលសំខាន់ៗនៃបន្ទប់ព័ត៌មានរបស់យើង។
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Assets Download Section -->
      <section id="downloads" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              ទ្រព្យសកម្មដែលអាចទាញយកបាន
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              រូបសញ្ញា រូបថត និងឯកសារម៉ាកយីហោដែលរួចរាល់សម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយ។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              ប្រើប្រាស់ឯកសារទាំងនេះសម្រាប់អត្ថបទ ការសម្ភាសន៍ ការប្រកាសពីដៃគូសហការ និងការចុះផ្សាយព័ត៌មាន។ ទម្រង់ PNG គឺមានសារប្រយោជន៍សម្រាប់ការប្រើប្រាស់រហ័ស ខណៈពេលដែល SVG គឺល្អបំផុតសម្រាប់ការរក្សាកម្រិតច្បាស់ពេលពង្រីកទំហំ។
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
                ទាញយក
                <ArrowDownToLine class="size-4" />
              </a>
            </article>
          </div>
        </div>
      </section>

      <!-- Guidelines Section -->
      <section class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
                ការណែនាំអំពីម៉ាកយីហោ
              </p>
              <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                វិធានសាមញ្ញៗដើម្បីរក្សាអត្តសញ្ញាណទស្សនីយភាពរបស់យើងឱ្យមានភាពស៊ីសង្វាក់គ្នា។
              </h2>
              <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                ប្រសិនបើអ្នកត្រូវការរូបសញ្ញា ឬរូបភាពសម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយ សូមអនុវត្តតាមការណែនាំខាងក្រោម ដើម្បីឱ្យម៉ាកយីហោរក្សាបាននូវភាពច្បាស់លាស់ ងាយស្រួលមើល និងគួរឱ្យទុកចិត្ត។
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

      <!-- Press Releases Section -->
      <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              សេចក្តីថ្លែងការណ៍ព័ត៌មាន
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              បណ្ណសារនៃការប្រកាសព័ត៌មានថ្មីៗរបស់បន្ទប់ព័ត៌មាន។
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

      <!-- Image Grid & Contact Section -->
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
                ទំនាក់ទំនងប្រព័ន្ធផ្សព្វផ្សាយ
              </p>
              <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                ទាក់ទងមកក្រុមការងារទំនាក់ទំនងរបស់យើងសម្រាប់ការស្នើសុំព័ត៌មាន។
              </h2>
              <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                យើងរីករាយទទួលការស្នើសុំសម្ភាសន៍ សំណួរផ្ទៀងផ្ទាត់ការពិត ការអនុម័តប្រើប្រាស់ម៉ាកយីហោ និងការសាកសួរអំពីកិច្ចសហការដៃគូ។
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
                ផ្ញើអ៊ីមែលទៅកាន់ក្រុមការងារព័ត៌មាន
                <Mail class="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Quick Downloads Callout -->
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
              ទាញយកទ្រព្យសកម្ម
              <ArrowDownToLine class="size-4" />
            </a>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>