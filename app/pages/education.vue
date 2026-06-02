<!-- pages/education.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
    <!-- Header / Navigation (More dropdown includes Education) -->
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
            
            <!-- More Dropdown (Desktop) - Education highlighted -->
            <div class="relative group">
              <button class="flex items-center gap-1 px-4 py-2 text-gray-700 font-medium rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                More
                <ChevronDown class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div class="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100 z-50">
                <div class="py-2">
                  <NuxtLink to="/health" class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                    <Heart class="w-4 h-4" /> Health
                  </NuxtLink>
                  <NuxtLink to="/entertainment" class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                    <Gamepad2 class="w-4 h-4" /> Entertainment
                  </NuxtLink>
                  <NuxtLink to="/education" class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 bg-red-50 text-red-600">
                    <GraduationCap class="w-4 h-4" /> Education
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

      <!-- Mobile Menu Drawer -->
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
                  <NuxtLink to="/health" class="flex items-center gap-3 py-2.5 px-4 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu">
                    <Heart class="w-4 h-4" /> Health
                  </NuxtLink>
                  <NuxtLink to="/entertainment" class="flex items-center gap-3 py-2.5 px-4 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu">
                    <Gamepad2 class="w-4 h-4" /> Entertainment
                  </NuxtLink>
                  <NuxtLink to="/education" class="flex items-center gap-3 py-2.5 px-4 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 bg-red-50 text-red-600" @click="closeMobileMenu">
                    <GraduationCap class="w-4 h-4" /> Education
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

    <!-- Main Content: Education Page -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Education Hero Section -->
      <section class="mb-12 lg:mb-16 animate-fade-in-up">
        <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl group">
          <div class="absolute inset-0 bg-black/40 z-10 transition-all duration-500 group-hover:bg-black/30"></div>
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop" 
            alt="Cambodia Students" 
            class="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent">
            <div class="flex items-center gap-2 text-sm text-red-300 font-semibold mb-3">
              <span class="bg-red-600 text-white px-2 py-0.5 rounded text-xs">EDUCATION REFORM</span>
              <span>2 days ago</span>
            </div>
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-lg">
              Government Launches Digital Literacy Program for 1 Million Students
            </h1>
            <p class="text-gray-200 text-sm md:text-base max-w-2xl line-clamp-2">
              Partnership with tech companies brings tablets and coding curriculum to public schools nationwide.
            </p>
          </div>
        </div>
      </section>

      <!-- Section Header with Education Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8 pb-2 border-b border-gray-200">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tab in educationTabs" 
            :key="tab"
            class="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
            :class="activeTab === tab ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="text-sm text-gray-500 flex items-center gap-1">
          <BookOpen class="w-4 h-4" /> Future of learning
        </div>
      </div>

      <!-- Featured Education Articles Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <!-- Large Featured Card (Main story) -->
        <div class="lg:col-span-2 group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100">
          <div class="relative overflow-hidden h-64 md:h-80">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop" 
              alt="Scholarship Students"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute top-3 left-3">
              <span class="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-md shadow-md">Scholarships</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> May 28, 2025</span>
              <span class="flex items-center gap-1"><Award class="w-3 h-3" /> Higher Education</span>
            </div>
            <NuxtLink to="/article/7">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-200">
                5,000 New University Scholarships Announced for Rural Students
              </h3>
            </NuxtLink>
            <p class="text-gray-600 text-base mb-4 line-clamp-3">
              Government and private sector partnerships aim to increase tertiary enrollment in remote provinces.
            </p>
            <div class="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/28.jpg" class="w-8 h-8 rounded-full" alt="author" />
              <span class="text-sm text-gray-600">Sreymom Chea • Education Correspondent</span>
            </div>
          </div>
        </div>

        <!-- Side list of latest education news -->
        <div class="space-y-4">
          <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all hover:shadow-md">
            <div class="flex gap-4">
              <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&h=150&fit=crop" class="w-full h-full object-cover" alt="news" />
              </div>
              <div>
                <span class="text-xs font-semibold text-red-600">EdTech</span>
                <NuxtLink to="/article/7">
                  <h4 class="font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer transition">Online Learning Platform E2Khmer Reaches 500k Users</h4>
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
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=150&h=150&fit=crop" class="w-full h-full object-cover" alt="news" />
              </div>
              <div>
                <span class="text-xs font-semibold text-red-600">Teacher Training</span>
                <NuxtLink to="/article/7">
                  <h4 class="font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer transition">New Pedagogy Center Opens to Train 10k Teachers</h4>
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
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=150&h=150&fit=crop" class="w-full h-full object-cover" alt="news" />
              </div>
              <div>
                <span class="text-xs font-semibold text-red-600">Early Childhood</span>
                <NuxtLink to="/article/7">
                  <h4 class="font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer transition">Kindergarten Enrollment Rises 20% After Campaign</h4>
                </NuxtLink>
                <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Clock class="w-3 h-3" /> Yesterday
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Statistics / Key Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Users class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Enrollment Rate</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">97%</p>
          <p class="text-xs text-green-600">Primary school</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <School class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Public Schools</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">8,247</p>
          <p class="text-xs text-green-600">+120 new in 2025</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <GraduationCap class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Literacy Rate</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">83.5%</p>
          <p class="text-xs text-green-600">↑ 4.2% since 2020</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Laptop class="w-5 h-5 text-red-600" />
            </div>
            <span class="text-xs text-gray-500">Student:Computer Ratio</span>
          </div>
          <p class="text-2xl font-bold text-gray-900">15:1</p>
          <p class="text-xs text-green-600">Target 10:1 by 2027</p>
        </div>
      </div>

      <!-- Regular Education Articles Grid (filtered by active tab) -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span class="w-1 h-7 bg-red-600 rounded-full"></span>
          {{ activeTab }} News
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(article, idx) in filteredEducationArticles" 
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

      <!-- School Spotlight / Feature Section -->
      <div class="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl p-6 md:p-8 text-white mb-12">
        <div class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <Building class="w-5 h-5 text-blue-300" />
              <span class="text-blue-300 font-semibold text-sm uppercase tracking-wider">School Spotlight</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold mb-2">How One Rural School Became a Model for Nationwide Reform</h3>
            <p class="text-gray-200 max-w-2xl">Innovative teaching methods and community involvement transform Koh Kong's Samaki Primary School.</p>
          </div>
          <button class="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium transition-all duration-300 shadow-lg whitespace-nowrap">
            Read Feature
          </button>
        </div>
      </div>

      <!-- More Education News Load More Button -->
      <div class="text-center">
        <button class="px-8 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
          Load More Education News
        </button>
      </div>
    </main>

    <!-- Footer -->
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
              <li><NuxtLink to="/education" class="hover:text-red-400 transition-colors duration-200 text-sm">Education</NuxtLink></li>
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
  Facebook, Twitter, Instagram, Clock, GraduationCap, BookOpen, Award, 
  Users, School, Laptop, Building
} from 'lucide-vue-next'

// Mobile menu state
const isMobileMenuOpen = ref(false)
const isMobileMoreOpen = ref(false)

// Navigation items (no active on main nav, Education is under More)
const navItems = ref([
  { name: 'Home', href: '/', active: false },
  { name: 'Politics', href: '/politics', active: false },
  { name: 'Business', href: '/business', active: false },
  { name: 'Technology', href: '/technology', active: false },
  { name: 'Sports', href: '/sports', active: false }
])

// Education sub-tabs
const educationTabs = ['All', 'K-12', 'Higher Ed', 'EdTech', 'Scholarships', 'Teacher Dev']
const activeTab = ref('All')

// Education articles data (Cambodia focused)
const educationArticles = ref([
  {
    id: 1,
    title: "New STEM Curriculum Launches in 200 Secondary Schools",
    excerpt: "Hands-on science labs and robotics clubs introduced to boost technical skills.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
    subcategory: "K-12",
    date: "May 28, 2025",
    views: "2.3k"
  },
  {
    id: 2,
    title: "Royal University of Phnom Penh Tops ASEAN Ranking",
    excerpt: "Cambodia's premier university recognized for research output and international partnerships.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
    subcategory: "Higher Ed",
    date: "May 27, 2025",
    views: "3.7k"
  },
  {
    id: 3,
    title: "Mobile App 'LearnKhmer' Wins Global EdTech Award",
    excerpt: "Startup's gamified language learning platform recognized at Barcelona summit.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    subcategory: "EdTech",
    date: "May 26, 2025",
    views: "2.1k"
  },
  {
    id: 4,
    title: "Australia Awards Cambodia Opens Applications for 2026",
    excerpt: "100 fully-funded master's degree scholarships for Cambodian professionals.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    subcategory: "Scholarships",
    date: "May 25, 2025",
    views: "4.2k"
  },
  {
    id: 5,
    title: "Ministry Launches Teacher Housing Program in Remote Areas",
    excerpt: "Incentives aim to attract qualified teachers to underserved provinces.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    subcategory: "Teacher Dev",
    date: "May 24, 2025",
    views: "1.6k"
  },
  {
    id: 6,
    title: "Cambodian Students Win Gold at International Science Olympiad",
    excerpt: "Team from Phnom Penh's Preah Sisowath High School excels in biology category.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
    subcategory: "K-12",
    date: "May 23, 2025",
    views: "2.9k"
  }
])

// Computed: filter articles based on active tab
const filteredEducationArticles = computed(() => {
  if (activeTab.value === 'All') return educationArticles.value
  return educationArticles.value.filter(article => article.subcategory === activeTab.value)
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
})
</script>

<style scoped>
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