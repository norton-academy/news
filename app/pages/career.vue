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
  title: "ឱកាសការងារ",
  description:
    "ចូលរួមជាមួយ COBO-NEWS។ ស្វែងរកឱកាសការងារដែលកំពុងជ្រើសរើស ស្វែងយល់ពីវប្បធម៌ការងារ និងអត្ថប្រយោជន៍របស់យើង ព្រមទាំងពិនិត្យមើលដំណើរការជ្រើសរើសបុគ្គលិករបស់យើង។",
  ogTitle: "ឱកាសការងារនៅ COBO-NEWS",
  ogDescription:
    "ស្វែងរកមុខតំណែងបើកចំហ វប្បធម៌ការងារ អត្ថប្រយោជន៍ និងដំណើរការដាក់ពាក្យស្នើសុំការងារនៅ COBO-NEWS។",
  ogType: "website",
})

const perks = [
  {
    title: "កិច្ចសហការប្រកបដោយភាពបត់បែន",
    description:
      "យើងគាំទ្រការធ្វើការងារដែលផ្តោតអារម្មណ៍ខ្ពស់ ការប្រាស្រ័យទាក់ទងច្បាស់លាស់ និងការសហការគ្នាបែប Hybrid ដែលអាចអនុវត្តទៅបានជាក់ស្តែង។",
    icon: HeartHandshake,
  },
  {
    title: "ឧបករណ៍ការងារទំនើប",
    description:
      "ធ្វើការជាមួយប្រព័ន្ធគ្រប់គ្រងអត្ថបទព័ត៌មានដ៏រហ័ស ប្រព័ន្ធរចនាស្អាត និងឧបករណ៍ទំនើបៗដែលគាំទ្រដល់ការងារសារព័ត៌មានដ៏អស្ចារ្យ។",
    icon: PencilRuler,
  },
  {
    title: "ក្រុមការងារដែលផ្តោតលើការរីកចម្រើន",
    description:
      "យើងលើកទឹកចិត្តឱ្យមានការផ្តល់មតិកែលម្អ ការកសាងជំនាញ និងការម្ចាស់ការលើការងារ ដើម្បីឱ្យអ្នករាល់គ្នាអាចរីកចម្រើនទៅមុខជាមួយបន្ទប់ព័ត៌មានរបស់យើង។",
    icon: Zap,
  },
]

const openings = [
  {
    title: "និពន្ធនាយកព័ត៌មានជាន់ខ្ពស់ (Senior News Editor)",
    location: "ភ្នំពេញ, ប្រទេសកម្ពុជា",
    type: "ពេញម៉ោង",
    team: "ផ្នែកនិពន្ធ",
    description:
      "ដឹកនាំការរៀបចំផែនការរឿងរ៉ាវព័ត៌មានប្រចាំថ្ងៃ តម្រង់ទិសការផ្សាយព័ត៌មានទាន់ហេតុការណ៍ និងពង្រឹងគុណភាពនៃការរាយការណ៍ព័ត៌មានរបស់យើង។",
  },
  {
    title: "Frontend Developer",
    location: "ការងារពីចម្ងាយ (Remote) / ភ្នំពេញ",
    type: "ពេញម៉ោង",
    team: "ផ្នែកផលិតផល",
    description:
      "បង្កើត Interface ដែលមានល្បឿនលឿន និងឆ្លើយតបបានល្អ (Responsive) ដើម្បីជួយឱ្យអត្ថបទព័ត៌មានរបស់យើងដំណើរការបានយ៉ាងរលូនលើគ្រប់ឧបករណ៍។",
  },
  {
    title: "អ្នកគ្រប់គ្រងសហគមន៍ និងបណ្តាញសង្គម (Community & Social Manager)",
    location: "ភ្នំពេញ, ប្រទេសកម្ពុជា",
    type: "ពេញម៉ោង",
    team: "ផ្នែកទស្សនិកជន",
    description:
      "បង្កើនការចូលរួមរបស់អ្នកអាន គ្រប់គ្រងវត្តមាននៅលើបណ្តាញសង្គម និងប្រមូលមតិកែលម្អដើម្បីកែលម្អការផ្សាយរបស់យើង។",
  },
]

const steps = [
  {
    title: "ដាក់ពាក្យតាមអនឡាញ",
    description:
      "ផ្ញើប្រវត្តិរូបសង្ខេប (CV) ផលបត្រការងារ (Portfolio) និងកំណត់ចំណាំខ្លីមួយមកយើងអំពីមូលហេតុដែលមុខតំណែងនេះសាកសមនឹងអ្នក។",
    icon: ClipboardList,
  },
  {
    title: "ជជែកពិភាក្សាណែនាំខ្លួន",
    description:
      "យើងនឹងរៀបចំការសន្ទនាខ្លីមួយដើម្បីស្វែងយល់បន្ថែមអំពីបទពិសោធន៍ និងគោលដៅការងាររបស់អ្នក។",
    icon: UserRound,
  },
  {
    title: "សម្ភាសជាមួយក្រុមការងារ",
    description:
      "ជួបជាមួយសហការីដែលអ្នកនឹងត្រូវធ្វើការជាមួយ និងពិភាក្សាអំពីរបៀបដែលអ្នកនឹងអនុវត្តការងារក្នុងមុខតំណែងនេះ។",
    icon: Users,
  },
  {
    title: "ការផ្តល់ការងារ & ការណែនាំការងារ",
    description:
      "ប្រសិនបើមានភាពស៊ីសង្វាក់គ្នា យើងនឹងបន្តទៅមុខយ៉ាងរហ័សជាមួយនឹងការផ្តល់ជូនការងារដ៏ច្បាស់លាស់ និងផែនការណែនាំការងារយ៉ាងកក់ក្តៅ។",
    icon: BadgeCheck,
  },
]

const testimonials = [
  {
    name: "Sarah Lim",
    role: "ចាងហ្វាងការផ្សាយ (Editor-in-Chief)",
    quote:
      "យើងយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត ប៉ុន្តែយើងក៏យកចិត្តទុកដាក់លើមនុស្សផងដែរ។ បុគ្គលិកដ៏ល្អបំផុតនៅទីនេះ គឺអ្នកដែលធ្វើឱ្យបន្ទប់ព័ត៌មានកាន់តែប្រសើរឡើងសម្រាប់អ្នកអាន និងសម្រាប់គ្នាទៅវិញទៅមក។",
  },
  {
    name: "David Chan",
    role: "ប្រធានផ្នែកពង្រីកទស្សនិកជន (Audience Growth Lead)",
    quote:
      "នៅទីនេះមានឱកាសច្រើនក្នុងការសាកល្បងអ្វីថ្មីៗ។ ប្រសិនបើអ្នកចូលចិត្តការម្ចាស់ការលើការងារ និងការទទួលយកមតិកែលម្អប្រកបដោយការគិតគូរ ទីនេះគឺជាកន្លែងដ៏ល្អបំផុតសម្រាប់រីកចម្រើន។",
  },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main>
      <!-- Hero Section -->
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
              ឱកាសការងារនៅ COBO-NEWS
            </div>

            <h1 class="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              ចូលរួមជាមួយក្រុមការងារដែលផ្តល់តម្លៃលើជំនាញ ល្បឿន និងឥទ្ធិពលពិតប្រាកដ។
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              យើងកំពុងកសាងបន្ទប់ព័ត៌មានដ៏ទំនើបមួយសម្រាប់ប្រទេសកម្ពុជា ហើយយើងចង់បានបុគ្គលិកដែលមានការចង់ដឹងចង់ឃើញ យកចិត្តទុកដាក់លើគុណភាព កិច្ចសហការ និងការនិទានរឿងប្រកបដោយអត្ថន័យ។
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="#openings"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                មើលមុខតំណែងដែលកំពុងជ្រើសរើស
                <ArrowRight class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#process"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:text-red-300"
              >
                មើលដំណើរការជ្រើសរើស
              </NuxtLink>
            </div>

            <div class="mt-10 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="text-2xl font-black tracking-tight">Hybrid</div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">នៅពេលដែលតួនាទីអនុញ្ញាត</div>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="text-2xl font-black tracking-tight">រហ័សទាន់ចិត្ត</div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">ការផ្តល់មតិ និងការសម្រេចចិត្ត</div>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="text-2xl font-black tracking-tight">យល់ចិត្ត</div>
                <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">វប្បធម៌ក្រុមការងារដែលជួយគ្នាទៅវិញទៅមក</div>
              </div>
            </div>
          </div>

          <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.2)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400">
              <BriefcaseBusiness class="size-4" />
              ហេតុអ្វីគួរចូលរួមជាមួយយើង
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

      <!-- Culture Section -->
      <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              វប្បធម៌ការងារ & អត្ថប្រយោជន៍
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              កន្លែងធ្វើការដែលបង្កើតឡើងជុំវិញភាពច្បាស់លាស់ ទំនុកចិត្ត និងឱកាសក្នុងការរីកចម្រើន។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              យើងរក្សាបរិយាកាសការងារបែបអាជីព ប៉ុន្តែងាយស្រួលចូលទៅជិត។ មនុស្សនៅទីនេះត្រូវបានលើកទឹកចិត្តឱ្យសួរដេញដោល កែលម្អដំណើរការការងារ និងយកចិត្តទុកដាក់យ៉ាងខ្លាំងលើលទ្ធផលដែលទទួលបាន។
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <LocateFixed class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">ទិសដៅច្បាស់លាស់</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                អ្នករាល់គ្នាដឹងពីអ្វីដែលហៅថាល្អ និងរបៀបដែលការងាររបស់ពួកគេរួមចំណែកដល់គោលដៅរួម។
              </p>
            </article>
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <CalendarDays class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">លំហូរការងារមានលំនឹង</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                លំហូរការងារដែលអាចប៉ាន់ស្មានបាន ជួយឱ្យអ្នករៀបចំផែនការ ផ្តោតអារម្មណ៍ និងធ្វើការងារបានល្អបំផុត។
              </p>
            </article>
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <BadgeCheck class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">វប្បធម៌នៃការផ្តល់មតិ</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                យើងចែករំលែកមតិកែលម្អដោយស្មោះត្រង់ គោរពគ្នាទៅវិញទៅមក និងក្នុងគោលបំណងធ្វើឱ្យគ្នាទៅវិញទៅមកកាន់តែប្រសើរឡើង។
              </p>
            </article>
            <article
              class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <Users class="size-5 text-red-600" />
              <h3 class="mt-4 text-lg font-bold">ការគាំទ្រពីក្រុមការងារ</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                អ្នកនឹងធ្វើការជាមួយមនុស្សដែលចូលចិត្តជួយជ្រោមជ្រែង មានការឆ្លើយតបលឿន និងយកចិត្តទុកដាក់លើភាពជោគជ័យរបស់អ្នក។
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Open Positions Section -->
      <section id="openings" class="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              មុខតំណែងដែលកំពុងជ្រើសរើស
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ឱកាសការងារបច្ចុប្បន្ននៅ COBO-NEWS។
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
              <h3 class="mt-5 text-2xl font-black tracking-tight leading-tight">
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
                ដាក់ពាក្យឥឡូវនេះ
                <ArrowRight class="size-4" />
              </button>
            </article>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section id="process" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div class="max-w-xl">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
              ដំណើរការដាក់ពាក្យស្នើសុំការងារ
            </p>
            <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ដំណើរការដ៏សាមញ្ញ និងច្បាស់លាស់ ដើម្បីឱ្យបេក្ខជនដឹងពីអ្វីដែលត្រូវរំពឹងទុក។
            </h2>
            <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              យើងធ្វើការដោយប្រសិទ្ធភាព និងរក្សាការប្រាស្រ័យទាក់ទងគ្នាយ៉ាងច្បាស់លាស់នៅគ្រប់ជំហាន។ នេះមានន័យថាមិនមានការលាក់លៀម មិនមានការចំណាយពេលលើកិច្ចការមិនចាំបាច់ និងផ្តល់នូវបទពិសោធន៍ប្រកបដោយការគោរពតាំងពីដើមរហូតដល់ចប់។
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

      <!-- Testimonials Section -->
      <section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div class="grid gap-6 lg:grid-cols-2">
          <article
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
              <UserRound class="size-4" />
              សំឡេងពីក្រុមការងារ
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