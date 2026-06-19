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
} from "lucide-vue-next";

definePageMeta({
  layout: "public",
});

useSeoMeta({
  title: "អំពីយើង",
  description:
    "ស្វែងយល់អំពី COBO-NEWS បេសកកម្ម រដ្ឋបាលតម្លៃ ចក្ខុវិស័យនិពន្ធ និងក្រុមការងារដែលនៅពីក្រោយការិយាល័យព័ត៌មានផ្តោតលើប្រទេសកម្ពុជារបស់យើង។",
  ogTitle: "អំពីយើង | COBO-NEWS",
  ogDescription:
    "ស្វែងយល់ពីសាច់រឿង បេសកកម្ម ចក្ខុវិស័យ តម្លៃ និងក្រុមការងារនៅពីក្រោយ COBO-NEWS។",
  ogType: "website",
});

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
          "ការិយាល័យព័ត៌មានទំនើបផ្តោតលើប្រទេសកម្ពុជា ដែលផ្តល់ជូននូវព័ត៌មានគួរឱ្យទុកចិត្ត ការវិភាគ និងបរិបទដែលមានប្រយោជន៍។",
      }),
    },
  ],
});

const milestones = [
  {
    year: "២០១៩",
    title: "ការិយាល័យព័ត៌មានដែលមានបេះដូងក្នុងស្រុក",
    description:
      "យើងបានចាប់ផ្តើមជាមួយក្រុមការងារនិពន្ធតូចមួយ ដោយផ្តោតលើព័ត៌មានកម្ពុជាដែលគួរឱ្យទុកចិត្ត និងការរាយការណ៍ផ្ទាល់ពីមូលដ្ឋាន។",
  },
  {
    year: "២០២២",
    title: "ការពង្រីកវិសាលភាពគ្របដណ្តប់",
    description:
      "យើងបានរីកចម្រើនទៅលើការរាយការណ៍ព័ត៌មានផ្នែកធុរកិច្ច បច្ចេកវិទ្យា សុខាភិបាល អប់រំ កីឡា និងរបាយការណ៍បម្រើផលប្រយោជន៍សាធារណៈ។",
  },
  {
    year: "២០២៦",
    title: "បង្កើតឡើងសម្រាប់អ្នកអាននាពេលបច្ចុប្បន្ន",
    description:
      "ផលិតផលរបស់យើងឥឡូវនេះរួមបញ្ចូលគ្នានូវការរាយការណ៍ព័ត៌មានច្បាស់លាស់ ការបង្ហាញបែបស្អាតភ្នែក និងការនិទានរឿងដែលងាយស្រួលយល់នៅលើគ្រប់ឧបករណ៍។",
  },
];

const principles = [
  {
    title: "បេសកកម្ម",
    icon: Target,
    description:
      "ផ្តល់ជូននូវសារព័ត៌មានដែលគួរឱ្យទុកចិត្ត មានតុល្យភាព និងអាចយកទៅប្រើប្រាស់ជាប្រយោជន៍បាន ដើម្បីជួយឱ្យមនុស្សយល់ដឹងពីកម្ពុជានិងពិភពលោកកាន់តែទូលំទូលាយ។",
  },
  {
    title: "ចក្ខុវិស័យ",
    icon: Eye,
    description:
      "ក្លាយជាការិយាល័យព័ត៌មានទំនើបដែលគួរឱ្យទុកចិត្តបំផុត និងត្រូវបានគេស្គាល់ចំពោះភាពច្បាស់លាស់ ភាពរហ័សរហួន និងសុចរិតភាពនៃការនិពន្ធនៅលើគ្រប់ផ្ទាំងកញ្ចក់ឧបករណ៍។",
  },
  {
    title: "តម្លៃស្នូល",
    icon: ShieldCheck,
    description:
      "ការពិតជាចម្បង ការរាយការណ៍ព័ត៌មានដែលផ្តោតលើមនុស្សជាកណ្តាល គណនេយ្យភាព និងការគោរពចំពោះសហគមន៍ដែលយើងយកព័ត៌មាន។",
  },
];

const values = [
  {
    title: "ភាពត្រឹមត្រូវ",
    description:
      "យើងផ្ទៀងផ្ទាត់យ៉ាងម៉ត់ចត់មុនពេលផ្សាយ និងបង្ហាញបរិបទឱ្យឃើញច្បាស់លាស់ ដោយមិនលាក់បាំងឡើយ។",
  },
  {
    title: "ឯករាជ្យភាព",
    description:
      "ការសម្រេចចិត្តរបស់ផ្នែកនិពន្ធគឺស្ថិតនៅដាច់ដោយឡែកពីសម្ពាធខាងក្រៅ និងសំឡេងរំខានរយៈពេលខ្លី។",
  },
  {
    title: "ភាពច្បាស់លាស់",
    description:
      "យើងសរសេរដើម្បីឱ្យងាយយល់ និងរហ័ស ដោយមិនបាត់បង់អត្ថន័យស៊ីជម្រៅ ឬព័ត៌មានលម្អិតឡើយ។",
  },
  {
    title: "សហគមន៍",
    description:
      "យើងបង្កើតការផ្សាយដែលឆ្លុះបញ្ចាំងពីមនុស្សពិត ទីកន្លែងពិត និងឥទ្ធិពលជាក់ស្តែងនៅក្នុងសង្គម។",
  },
];

const team = [
  {
    name: "Rithy",
    role: "វិស្វករកម្មវិធី (Software Engineer)",
    image: "/images/team/marketing-david.jpg",
    bio:
      " បង្កើត និងថែទាំគេហទំព័រ COBO-NEWS ដើម្បីធានាបាននូវបទពិសោធន៍លឿន គួរឱ្យទុកចិត្ត និងងាយស្រួលប្រើប្រាស់សម្រាប់អ្នកអានរបស់យើង។",
  },
  {
    name: "LongHeng",
    role: "ប្រធានផ្នែកបច្ចេកទេស (Technical Lead)",
    image: "/images/team/chef-michael.jpg",
    bio:
      " ត្រួតពិនិត្យទិសដៅបច្ចេកទេសរបស់ COBO-NEWS ដោយដឹកនាំកិច្ចខិតខំប្រឹងប្រែងអភិវឌ្ឍន៍ និងធានាថាគេហទំព័រឌីជីថលរបស់យើងគាំទ្រដល់បេសកកម្មនិពន្ធប្រកបដោយប្រសិទ្ធភាព។",
  }
];

const metrics = [
  { value: "២៤/៧", label: "ចង្វាក់ការងារព័ត៌មាន" },
  { value: "៥", label: "សសរស្តម្ភនៃព័ត៌មានស្នូល" },
  { value: "១០០%", label: "ទស្សនវិស័យផ្តោតលើកម្ពុជាជាចម្បង" },
];
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50"
  >
    <main>
      <section
        class="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800/80 dark:bg-slate-950"
      >
        <div class="absolute inset-0">
          <div
            class="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-500/15 blur-3xl"
          ></div>
          <div
            class="absolute right-0 top-16 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"
          ></div>
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(248,250,252,0.06),_transparent_32%)]"
          ></div>
        </div>

        <div
          class="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24"
        >
          <div class="max-w-3xl">
            <div
              class="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
            >
              <Sparkles class="size-4" />
              អំពី COBO-NEWS
            </div>

            <h1
              class="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              ការិយាល័យព័ត៌មានដែលបង្កើតឡើងដើម្បីបកស្រាយពីកម្ពុជា ប្រកបដោយភាពច្បាស់លាស់
              ឆាប់រហ័ស និងយកចិត្តទុកដាក់។
            </h1>

            <p
              class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300"
            >
              COBO-NEWS រួមបញ្ចូលគ្នានូវការរាយការណ៍ព័ត៌មាន ការវិភាគ
              និងសារព័ត៌មានបម្រើសេវាកម្ម នៅក្នុងបទពិសោធន៍ដ៏ទំនើប និងស្អាតភ្នែក។
              យើងជួយអ្នកអានឱ្យយល់ពីអ្វីដែលសំខាន់ ហេតុអ្វីបានជាវាសំខាន់
              និងអ្វីដែលនឹងកើតឡើងបន្ទាប់។
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                អានអត្ថបទចុងក្រោយបង្អស់
                <ArrowRight class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#team"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                ជួបជាមួយក្រុមការងារ
              </NuxtLink>
            </div>

            <div class="mt-10 grid gap-4 sm:grid-cols-3">
              <div
                v-for="metric in metrics"
                :key="metric.label"
                class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div
                  class="text-2xl font-black tracking-tight text-slate-950 dark:text-white"
                >
                  {{ metric.value }}
                </div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {{ metric.label }}
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div
              class="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2rem] bg-slate-200/60 blur-xl dark:bg-slate-800/70"
            ></div>
            <div
              class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900"
            >
              <img
                src="/images/kitchen-story.png"
                alt="សាច់រឿងការិយាល័យព័ត៌មាន COBO-NEWS"
                class="h-72 w-full object-cover sm:h-96"
              />
              <div class="grid gap-4 p-6 sm:grid-cols-2">
                <div
                  class="rounded-2xl bg-slate-950 p-5 text-white dark:bg-slate-50 dark:text-slate-950"
                >
                  <div
                    class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-300 dark:text-red-600"
                  >
                    <BookOpen class="size-4" />
                    ការផ្តោតលើការនិពន្ធ
                  </div>
                  <p class="mt-3 text-sm leading-6 text-slate-300 dark:text-slate-600">
                    ព័ត៌មាន បរិបទ
                    និងការផ្សាយព័ត៌មានជាក់ស្តែងសម្រាប់អ្នកអានដែលចង់បានរូបភាពពេញលេញ។
                  </p>
                </div>
                <div
                  class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div
                    class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400"
                  >
                    <MapPin class="size-4 text-red-600" />
                    មានមូលដ្ឋាននៅកម្ពុជា
                  </div>
                  <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    យើងរក្សាការរាយការណ៍ព័ត៌មានរបស់យើងឱ្យស្របទៅនឹងតថភាពក្នុងស្រុក
                    និងទំនាក់ទំនងក្នុងតំបន់។
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
            <p
              class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400"
            >
              ប្រវត្តិនៃរឿងរ៉ាវរបស់យើង
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ពីតុនិពន្ធដែលផ្តោតលើគោលដៅជាក់លាក់ ឆ្ពោះទៅកាន់បទពិសោធន៍ព័ត៌មានឌីជីថលពេញលេញ។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              COBO-NEWS បានចាប់ផ្តើមឡើងជាមួយគំនិតសាមញ្ញមួយ៖
              ផ្តល់ជូនព័ត៌មានកម្ពុជាដែលគួរឱ្យទុកចិត្ត តាមរបៀបច្បាស់លាស់ លឿនរហ័ស
              និងមានប្រយោជន៍ពិតប្រាកដ។ នៅពេលដែលអ្នកអានរបស់យើងកើនឡើង
              យើងបានពង្រីកទៅលើវិស័យកាន់តែច្រើន ធ្វើឱ្យបទពិសោធន៍នៃការអានកាន់តែប្រសើរឡើង
              និងបង្កើតការិយាល័យព័ត៌មានដែលចាត់ទុកការរចនានិងសារព័ត៌មានជាដៃគូមិនអាចខ្វះបាន។
            </p>
          </div>

          <div class="relative">
            <div
              class="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-red-500 via-slate-300 to-transparent dark:via-slate-700"
            ></div>
            <div class="space-y-6">
              <article
                v-for="milestone in milestones"
                :key="milestone.year"
                class="relative rounded-3xl border border-slate-200 bg-white p-6 pl-16 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div
                  class="absolute left-0 top-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-slate-50 bg-red-600 text-sm font-bold text-white dark:border-slate-950"
                >
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

      <section
        class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24"
      >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <p
              class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400"
            >
              អ្វីដែលជំរុញទឹកចិត្តយើង
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              បេសកកម្ម ចក្ខុវិស័យ និងតម្លៃស្នូល ដែលណែនាំគ្រប់អត្ថបទដែលយើងផ្សាយ។
            </h2>
          </div>

          <div class="mt-10 grid gap-6 lg:grid-cols-3">
            <article
              v-for="item in principles"
              :key="item.title"
              class="group rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm ring-1 ring-slate-200 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white dark:bg-slate-950 dark:ring-slate-800"
              >
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
              <div
                class="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
              >
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
            <p
              class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400"
            >
              ក្រុមការងាររបស់យើង
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ក្រុមការងារតូចមួយជាមួយស្តង់ដាររួម៖ ធ្វើឱ្យព័ត៌មានក្លាយជាទីទុកចិត្ត
              និងងាយស្រួលបំផុត។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              យើងរួមបញ្ចូលគ្នានូវការវិនិច្ឆ័យផ្នែកនិពន្ធ ការគិតគូរពីតម្រូវការអ្នកអាន
              និងការរចនាជាក់ស្តែង ដើម្បីឱ្យការិយាល័យព័ត៌មានដើរបានលឿនរហ័ស
              ដោយមិនបាត់បង់ភាពស៊ីជម្រៅ ឬការយកចិត្តទុកដាក់ឡើយ។
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
              <div
                class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-5"
              >
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
        <div
          class="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-[0_28px_90px_-30px_rgba(15,23,42,0.6)] dark:border-slate-800 sm:px-10 lg:px-14"
        >
          <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div class="max-w-2xl">
              <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-300">
                ចូលរួមការងារជាមួយយើង
              </p>
              <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                យើងកំពុងបង្កើតការិយាល័យព័ត៌មានដែលផ្តល់ភាពកក់ក្តៅ និងគួរឱ្យជឿជាក់
                ដូចទៅនឹងអ្វីដែលអ្នកបានឃើញ។
              </h2>
              <p class="mt-4 text-base leading-8 text-slate-300">
                ប្រសិនបើអ្នកយកចិត្តទុកដាក់លើការរាយការណ៍ព័ត៌មានដែលគិតគូរបានល្អិតល្អន់
                ស្តង់ដារនិពន្ធរឹងមាំ និងបទពិសោធន៍អានដ៏ល្អប្រណីត COBO-NEWS
                ត្រូវបានបង្កើតឡើងសម្រាប់អ្នក។
              </p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <NuxtLink
                to="/"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                ស្វែងយល់ពីព័ត៌មានរបស់យើង
                <Globe2 class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#story"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10"
              >
                ពិនិត្យមើលប្រវត្តិរបស់យើង
                <ArrowRight class="size-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
