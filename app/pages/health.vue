<!-- pages/health.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
    <!-- Header / Navigation (same as homepage, More active with Health highlighted) -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm transition-all duration-300">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo -->
          <div class="flex items-center space-x-2 group cursor-pointer">
            <div class="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
              <span class="text-white font-bold text-lg">C</span>
            </div>
            <span class="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">COBO-NEWS</span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.name"
              :to="item.href"
              class="px-4 py-2 text-gray-700 font-medium rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200 ease-in-out"
              :class="{ 'text-red-600 bg-red-50': item.active }"
            >
              {{ item.name }}
            </NuxtLink>
            
            <!-- More Dropdown (Desktop) - Health active inside -->
            <div class="relative group">
              <button class="flex items-center gap-1 px-4 py-2 text-gray-700 font-medium rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                More
                <ChevronDown class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div class="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100 z-50">
                <div class="py-2">
                  <NuxtLink to="/health" class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 bg-red-50 text-red-600">
                    <Heart class="w-4 h-4" /> Health
                  </NuxtLink>
                  <NuxtLink to="/entertainment" class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                    <Gamepad2 class="w-4 h-4" /> Entertainment
                  </NuxtLink>
                </div>
              </div>
            </div>
          </nav>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu" 
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-gray-700" />
            <X v-else class="w-6 h-6 text-gray-700" />
          </button>

          <!-- Desktop Action Button -->
          <div class="hidden lg:block">
            <button class="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Drawer (same as homepage) -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 lg:hidden">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeMobileMenu"></div>
          <div class="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col animate-slide-in">
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold">C</span>
                </div>
                <span class="text-xl font-bold text-gray-900">COBO-NEWS</span>
              </div>
            </div>
            <nav class="flex-1 p-4 space-y-1">
              <NuxtLink 
                v-for="item in navItems" 
                :key="item.name"
                :to="item.href"
                class="flex items-center justify-between py-3 px-4 text-gray-700 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                @click="closeMobileMenu"
              >
                {{ item.name }}
              </NuxtLink>
              <div class="mt-1">
                <button 
                  @click="toggleMobileMoreSubmenu"
                  class="flex items-center justify-between w-full py-3 px-4 text-gray-700 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <span>More</span>
                  <ChevronDown :class="['w-4 h-4 transition-transform duration-300', { 'rotate-180': isMobileMoreOpen }]" />
                </button>
                <div v-show="isMobileMoreOpen" class="ml-6 mt-1 space-y-1 border-l-2 border-red-200 pl-3">
                  <NuxtLink to="/health" class="flex items-center gap-3 py-2.5 px-4 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 bg-red-50 text-red-600" @click="closeMobileMenu">
                    <Heart class="w-4 h-4" /> Health
                  </NuxtLink>
                  <NuxtLink to="/entertainment" class="flex items-center gap-3 py-2.5 px-4 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu">
                    <Gamepad2 class="w-4 h-4" /> Entertainment
                  </NuxtLink>
                </div>
              </div>
            </nav>
            <div class="p-6 border-t border-gray-100">
              <button class="w-full py-3 bg-red-600 text-white font-medium rounded-xl shadow-md hover:bg-red-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content: Health Page -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Health Hero Section -->
      <section class="mb-12 lg:mb-16 animate-fade-in-up">
        <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl group">
          <div class="absolute inset-0 bg-black/40 z-10 transition-all duration-500 group-hover:bg-black/30"></div>
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop" 
            alt="Cambodia Healthcare" 
            class="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent">
            <div class="flex items-center gap-2 text-sm text-red-300 font-semibold mb-3">
              <span class="bg-red-600 text-white px-2 py-0.5 rounded text-xs">HEALTH ALERT</span>
              <span>1 day ago</span>
            </div>
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-lg">
              Universal Health Coverage Expansion Reaches 5 Million Cambodians
            </h1>
            <p class="text-gray-200 text-sm md:text-base max-w-2xl line-clamp-2">
              Government launches digital health ID system to streamline access to public hospitals nationwide.
            </p>
          </div>
        </div>
      </section>

      <!-- Section Header with Health Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8 pb-2 border-b border-gray-200">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tab in healthTabs" 
            :key="tab"
            class="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
            :class="activeTab === tab ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="text-sm text-gray-500 flex items-center gap-1">
          <Stethoscope class="w-4 h-4" /> Medical updates
        </div>
      </div>

      <!-- Featured Health Articles Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <!-- Large Featured Card (Main story) -->
        <div class="lg:col-span-2 group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100">
          <div class="relative overflow-hidden h-64 md:h-80">
            <img 
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop" 
              alt="Vaccination Campaign"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute top-3 left-3">
              <span class="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-md shadow-md">Public Health</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> May 28, 2025</span>
              <span class="flex items-center gap-1"><Syringe class="w-3 h-3" /> Immunization</span>
            </div>
            <NuxtLink to="/article/5">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-200">
                National HPV Vaccination Drive Aims to Protect 500,000 Girls
              </h3>
            </NuxtLink>
            <p class="text-gray-600 text-base mb-4 line-clamp-3">
              Cambodia joins global effort to eliminate cervical cancer, with free vaccines in all secondary schools.
            </p>
            <div class="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/56.jpg" class="w-8 h-8 rounded-full" alt="author" />
              <span class="text-sm text-gray-600">Dr. Malis Sovann • Health Correspondent</span>
            </div>
          </div>
        </div>

        <!-- Side list of latest health news -->
        <div class="space-y-4">
          <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all hover:shadow-md">
            <div class="flex gap-4">
              <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop" class="w-full h-full object-cover" alt="news" />
              </div>
              <div>
                <span class="text-xs font-semibold text-red-600">Mental Health</span>
                <NuxtLink to="/article/5">
                  <h4 class="font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer transition">New National Mental Health Hotline Launches</h4>
                </NuxtLink>
                <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Clock class="w-3 h-3" /> 3 hours ago
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all hover:shadow-md">
            <div class="flex gap-4">
              <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop" class="w-full h-full object-cover" alt="news" />
              </div>
              <div>
                <span class="text-xs font-semibold text-red-600">Nutrition</span>
                <NuxtLink to="/article/5">
                  <h4 class="font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer transition">Rice Fortification Program Expands to 10 Provinces</h4>
                </NuxtLink>
                <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Clock class="w-3 h-3" /> 5 hours ago
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all hover:shadow-md">
            <div class="flex gap-4">
              <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=150&h=150&fit=crop" class="w-full h-full object-cover" alt="news" />
              </div>
              <div>
                <span class="text-xs font-semibold text-red-600">Medical Tech</span>
                <NuxtLink to="/article/5">
                  <h4 class="font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer transition">AI-Powered TB Detection Tool Deployed in Rural Clinics</h4>
                </NuxtLink>
                <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Clock class="w-3 h-3" /> Yesterday
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Health Statistics / Data Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Hospital class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Public Hospitals</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">127</p>
          <p class="text-xs text-green-600">+12 new in 2025</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Users class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Doctors per 10k</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">8.2</p>
          <p class="text-xs text-green-600">↑ 0.5 from 2024</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Activity class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Life Expectancy</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">71.4 yrs</p>
          <p class="text-xs text-green-600">↑ 2.1 since 2020</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Baby class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Infant Mortality</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">18.5 /1k</p>
          <p class="text-xs text-green-600">↓ 3.2 from 2020</p>
        </div>
      </div>

      <!-- Regular Health Articles Grid (filtered by active tab) -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span class="w-1 h-7 bg-red-600 rounded-full"></span>
          {{ activeTab }} News
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(article, idx) in filteredHealthArticles" 
            :key="article.id"
            class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 hover:-translate-y-2"
            :style="{ animationDelay: `${idx * 0.05}s` }"
          >
            <div class="relative overflow-hidden h-48">
              <img :src="article.image" :alt="article.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute top-3 left-3">
                <span class="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-md shadow-md">{{ article.subcategory }}</span>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> {{ article.date }}</span>
                <span class="flex items-center gap-1"><Eye class="w-3 h-3" /> {{ article.views }} views</span>
              </div>
              <NuxtLink :to="`/article/${article.id}`">
              <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                {{ article.title }}
              </h3>
            </NuxtLink>
              <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ article.excerpt }}</p>
              <NuxtLink :to="`/article/${article.id}`" class="inline-flex items-center gap-1 text-red-600 font-medium text-sm hover:gap-2 transition-all duration-300">
                Read more <ChevronRight class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Expert Advice / Wellness Tip Section -->
      <div class="bg-gradient-to-r from-teal-900 to-emerald-800 rounded-2xl p-6 md:p-8 text-white mb-12">
        <div class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <Apple class="w-5 h-5 text-red-300" />
              <span class="text-red-300 font-semibold text-sm uppercase tracking-wider">Wellness Wednesday</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold mb-2">5 Traditional Khmer Herbs for Immune Support</h3>
            <p class="text-gray-200 max-w-2xl">Expert advice from the National Institute of Traditional Medicine on boosting your family's health naturally.</p>
          </div>
          <button class="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium transition-all duration-300 shadow-lg whitespace-nowrap">
            Read Guide
          </button>
        </div>
      </div>

      <!-- More Health News Load More Button -->
      <div class="text-center">
        <button class="px-8 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
          Load More Health News
        </button>
      </div>
    </main>

    <!-- Footer (same as other pages) -->
    <footer class="bg-gray-900 text-gray-300 mt-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">C</span>
              </div>
              <span class="text-2xl font-bold text-white">COBO-NEWS</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">Delivering trusted news and insights from Cambodia and beyond. Independent, factual, and forward-thinking.</p>
            <div class="flex gap-4 pt-2">
              <a href="#" class="hover:text-red-400 transition-colors duration-200"><Facebook class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400 transition-colors duration-200"><Twitter class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400 transition-colors duration-200"><Instagram class="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Sections</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/politics" class="hover:text-red-400 transition-colors duration-200 text-sm">Politics</NuxtLink></li>
              <li><NuxtLink to="/business" class="hover:text-red-400 transition-colors duration-200 text-sm">Business</NuxtLink></li>
              <li><NuxtLink to="/technology" class="hover:text-red-400 transition-colors duration-200 text-sm">Technology</NuxtLink></li>
              <li><NuxtLink to="/sports" class="hover:text-red-400 transition-colors duration-200 text-sm">Sports</NuxtLink></li>
              <li><NuxtLink to="/health" class="hover:text-red-400 transition-colors duration-200 text-sm">Health</NuxtLink></li>
              <li><NuxtLink to="/entertainment" class="hover:text-red-400 transition-colors duration-200 text-sm">Entertainment</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Company</h4>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-red-400 transition-colors duration-200 text-sm">About Us</a></li>
              <li><a href="#" class="hover:text-red-400 transition-colors duration-200 text-sm">Careers</a></li>
              <li><a href="#" class="hover:text-red-400 transition-colors duration-200 text-sm">Advertise</a></li>
              <li><a href="#" class="hover:text-red-400 transition-colors duration-200 text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Newsletter</h4>
            <p class="text-sm text-gray-400 mb-3">Get the latest headlines delivered to your inbox.</p>
            <div class="flex flex-col gap-2">
              <input type="email" placeholder="Your email" class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all">
              <button class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2025 COBO-NEWS. All rights reserved. Cambodia News Network.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-red-400 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-red-400 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Menu, X, ChevronDown, ChevronRight, Calendar, Eye, Heart, Gamepad2, 
  Facebook, Twitter, Instagram, Clock, Stethoscope, Syringe, Hospital, 
  Users, Activity, Baby, Apple
} from 'lucide-vue-next'

// Mobile menu state
const isMobileMenuOpen = ref(false)
const isMobileMoreOpen = ref(false)

// Navigation items (Health is under More, so no active on main nav)
const navItems = ref([
  { name: 'Home', href: '/', active: false },
  { name: 'Politics', href: '/politics', active: false },
  { name: 'Business', href: '/business', active: false },
  { name: 'Technology', href: '/technology', active: false },
  { name: 'Sports', href: '/sports', active: false }
])

// Health sub-tabs
const healthTabs = ['All', 'Wellness', 'Nutrition', 'Mental Health', 'Medical News', 'Maternal Health']
const activeTab = ref('All')

// Health articles data (Cambodia focused)
const healthArticles = ref([
  {
    id: 1,
    title: "Yoga and Meditation Classes Expand to Rural Communities",
    excerpt: "Government partners with NGOs to offer free mental wellness programs in 5 provinces.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
    subcategory: "Wellness",
    date: "May 28, 2025",
    views: "1.8k"
  },
  {
    id: 2,
    title: "Child Malnutrition Rate Drops to 10-Year Low",
    excerpt: "Successful school meal program credited for improvement in rural areas.",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400&h=250&fit=crop",
    subcategory: "Nutrition",
    date: "May 27, 2025",
    views: "2.4k"
  },
  {
    id: 3,
    title: "Post-Pandemic Anxiety: New Study Reveals Trends Among Youth",
    excerpt: "Research from Royal University of Phnom Penh calls for expanded counseling services.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=250&fit=crop",
    subcategory: "Mental Health",
    date: "May 26, 2025",
    views: "3.1k"
  },
  {
    id: 4,
    title: "Dengue Fever Cases Rise During Early Monsoon",
    excerpt: "Health ministry urges communities to eliminate mosquito breeding sites.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop",
    subcategory: "Medical News",
    date: "May 25, 2025",
    views: "4.2k"
  },
  {
    id: 5,
    title: "Mobile Clinics Bring Prenatal Care to Remote Villages",
    excerpt: "Partnership with WHO reaches 20,000 pregnant women in Mondulkiri and Ratanakiri.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    subcategory: "Maternal Health",
    date: "May 24, 2025",
    views: "1.9k"
  },
  {
    id: 6,
    title: "Traditional Khmer Massage Recognized by UNESCO",
    excerpt: "Ancient healing practice gains international cultural heritage status.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop",
    subcategory: "Wellness",
    date: "May 23, 2025",
    views: "2.7k"
  }
])

// Computed: filter articles based on active tab
const filteredHealthArticles = computed(() => {
  if (activeTab.value === 'All') return healthArticles.value
  return healthArticles.value.filter(article => article.subcategory === activeTab.value)
})

// Mobile menu methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  isMobileMoreOpen.value = false
}
const toggleMobileMoreSubmenu = () => {
  isMobileMoreOpen.value = !isMobileMoreOpen.value
}
definePageMeta({
  layout: "test",
});
</script>

<style scoped>
/* Same animations as previous pages */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.grid > div {
  animation: fadeInUp 0.5s ease-out backwards;
}
</style>