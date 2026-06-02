<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
    <!-- Header / Navigation -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm transition-all duration-300">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2 group cursor-pointer">
            <div class="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
              <span class="text-white font-bold text-lg">C</span>
            </div>
            <span class="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">COBO-NEWS</span>
          </NuxtLink>

          <!-- Desktop Navigation (hidden on mobile) -->
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
            
            <!-- More Dropdown (Desktop) -->
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
                  <NuxtLink to="/education" class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                    <GraduationCap class="w-4 h-4" /> Education
                  </NuxtLink>
                  <NuxtLink to="/agriculture" class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                    <Sprout class="w-4 h-4" /> Agriculture
                  </NuxtLink>
                </div>
              </div>
            </div>
          </nav>

          <!-- Desktop Right Actions (Search, Notes, Profile) -->
          <div class="hidden lg:flex items-center gap-3">
            <!-- Search Button -->
            <button @click="openSearch" class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Search">
              <Search class="w-5 h-5 text-gray-600" />
            </button>
            
            <!-- Notes (Bookmarks) Button -->
            <button @click="openNotes" class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative" aria-label="Saved notes">
              <NotebookPen class="w-5 h-5 text-gray-600" />
              <span v-if="noteCount > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{{ noteCount }}</span>
            </button>
            
            <!-- Profile Avatar & Dropdown -->
            <div class="relative">
              <button @click="toggleProfileMenu" class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" class="w-8 h-8 rounded-full object-cover" alt="Profile" />
                <ChevronDown class="w-4 h-4 text-gray-600 transition-transform duration-200" :class="{ 'rotate-180': isProfileMenuOpen }" />
              </button>
              
              <!-- Profile Dropdown -->
              <div v-if="isProfileMenuOpen" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-up">
                <NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
                  <User class="w-4 h-4" /> My Account
                </NuxtLink>
                <NuxtLink to="/saved" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
                  <Bookmark class="w-4 h-4" /> Saved Articles
                </NuxtLink>
                <NuxtLink to="/settings" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
                  <Settings class="w-4 h-4" /> Settings
                </NuxtLink>
                <hr class="my-1 border-gray-100" />
                <button @click="logout" class="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-50 transition text-red-600">
                  <LogOut class="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu" 
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-gray-700" />
            <X v-else class="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu Overlay + Drawer (updated with new section links) -->
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
              
              <!-- Mobile More Section with Expandable (updated) -->
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
                  <NuxtLink to="/education" class="flex items-center gap-3 py-2.5 px-4 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu">
                    <GraduationCap class="w-4 h-4" /> Education
                  </NuxtLink>
                  <NuxtLink to="/agriculture" class="flex items-center gap-3 py-2.5 px-4 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu">
                    <Sprout class="w-4 h-4" /> Agriculture
                  </NuxtLink>
                </div>
              </div>
            </nav>
            <div class="p-6 border-t border-gray-100">
              <button class="w-full py-3 bg-red-600 text-white font-medium rounded-xl shadow-md hover:bg-red-700 transition-all duration-300">
                Subscribe (Mobile)
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content (unchanged from original) -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Hero Section -->
      <section class="mb-12 lg:mb-16 animate-fade-in-up">
        <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl group">
          <div class="absolute inset-0 bg-black/40 z-10 transition-all duration-500 group-hover:bg-black/30"></div>
          <img 
            src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&h=600&fit=crop" 
            alt="Cambodia News" 
            class="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent">
            <div class="flex items-center gap-2 text-sm text-red-300 font-semibold mb-3">
              <span class="bg-red-600 text-white px-2 py-0.5 rounded text-xs">BREAKING</span>
              <span>Just now</span>
            </div>
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-lg">
              Cambodia's Digital Economy Set to Triple by 2026
            </h1>
            <p class="text-gray-200 text-sm md:text-base max-w-2xl line-clamp-2">
              New policies and tech investments drive unprecedented growth in Phnom Penh's startup ecosystem.
            </p>
          </div>
        </div>
      </section>

      <!-- Category Highlights -->
      <div class="flex flex-wrap gap-2 mb-8 pb-2 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <button 
          v-for="cat in categories" 
          :key="cat"
          class="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap"
          :class="activeCategory === cat ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- News Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <div 
          v-for="(article, index) in filteredArticles" 
          :key="article.id"
          class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 hover:-translate-y-2"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <div class="relative overflow-hidden h-48">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute top-3 left-3">
              <span class="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-md shadow-md">{{ article.category }}</span>
            </div>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> {{ article.date }}</span>
              <span class="flex items-center gap-1"><Eye class="w-3 h-3" /> {{ article.views }} views</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
              {{ article.title }}
            </h3>
            <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ article.excerpt }}</p>
            <NuxtLink :to="`/article/${article.id}`" class="inline-flex items-center gap-1 text-red-600 font-medium text-sm hover:gap-2 transition-all duration-300">
              Read more <ChevronRight class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Featured Section with Side Layout (Alternative style) -->
      <div class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-12 animate-fade-in-up">
        <div class="grid md:grid-cols-2 gap-0">
          <div class="relative h-64 md:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1543993452-315c2f5b5f3d?w=600&h=400&fit=crop" 
              alt="Sports Feature" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
          </div>
          <div class="p-6 md:p-8 flex flex-col justify-center">
            <span class="text-red-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-1"><Trophy class="w-4 h-4" /> Special Report</span>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Cambodia SEA Games Legacy: How Sports Infrastructure Transforms Communities</h2>
            <p class="text-gray-600 mb-4">From new stadiums to youth programs, discover the lasting impact of hosting Southeast Asia's biggest sporting event.</p>
            <div class="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-8 h-8 rounded-full" alt="author" />
              <span class="text-sm text-gray-500">Sokha Chea • 5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer (4 columns, no newsletter) -->
    <footer class="bg-gray-900 text-gray-300 mt-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <!-- Column 1: About / Brand -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">C</span>
              </div>
              <span class="text-2xl font-bold text-white">COBO-NEWS</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">Delivering trusted news and insights from Cambodia and beyond. Independent, factual, and forward-thinking.</p>
            <div class="flex gap-4 pt-2">
              <a href="#" class="hover:text-red-400 transition-colors"><Facebook class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400 transition-colors"><Twitter class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400 transition-colors"><Instagram class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400 transition-colors"><Youtube class="w-5 h-5" /></a>
            </div>
          </div>

          <!-- Column 2: Sections (grid with 2 columns → 4 rows for 8 items) -->
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Sections</h4>
            <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
              <li><NuxtLink to="/politics" class="hover:text-red-400 text-sm">Politics</NuxtLink></li>
              <li><NuxtLink to="/business" class="hover:text-red-400 text-sm">Business</NuxtLink></li>
              <li><NuxtLink to="/technology" class="hover:text-red-400 text-sm">Technology</NuxtLink></li>
              <li><NuxtLink to="/sports" class="hover:text-red-400 text-sm">Sports</NuxtLink></li>
              <li><NuxtLink to="/health" class="hover:text-red-400 text-sm">Health</NuxtLink></li>
              <li><NuxtLink to="/entertainment" class="hover:text-red-400 text-sm">Entertainment</NuxtLink></li>
              <li><NuxtLink to="/education" class="hover:text-red-400 text-sm">Education</NuxtLink></li>
              <li><NuxtLink to="/agriculture" class="hover:text-red-400 text-sm">Agriculture</NuxtLink></li>
            </ul>
          </div>

          <!-- Column 3: Company -->
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Company</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/about" class="hover:text-red-400 text-sm">About Us</NuxtLink></li>
              <li><NuxtLink to="/careers" class="hover:text-red-400 text-sm">Careers</NuxtLink></li>
              <li><NuxtLink to="/advertise" class="hover:text-red-400 text-sm">Advertise</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-red-400 text-sm">Contact</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="hover:text-red-400 text-sm">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/terms" class="hover:text-red-400 text-sm">Terms of Use</NuxtLink></li>
            </ul>
          </div>

          <!-- Column 4: Follow Us / App Downloads -->
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Follow Us</h4>
            <ul class="space-y-2">
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Facebook class="w-4 h-4" /> Facebook</a></li>
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Twitter class="w-4 h-4" /> Twitter</a></li>
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Instagram class="w-4 h-4" /> Instagram</a></li>
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Youtube class="w-4 h-4" /> YouTube</a></li>
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Linkedin class="w-4 h-4" /> LinkedIn</a></li>
            </ul>
            <div class="mt-6">
              <p class="text-sm text-gray-400 mb-2">Download our app</p>
              <div class="flex gap-3">
                <!-- Placeholder images for app stores – replace with actual assets -->
                <div class="h-10 w-28 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-400">App Store</div>
                <div class="h-10 w-28 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-400">Google Play</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 COBO-NEWS. All rights reserved. Cambodia News Network.</p>
        </div>
      </div>
    </footer>

    <!-- Search Overlay (Teleported to body) -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isSearchOpen" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20" @click.self="closeSearch">
          <div class="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-down">
            <div class="p-4 border-b border-gray-100 flex items-center">
              <Search class="w-5 h-5 text-gray-400 ml-2" />
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search news, topics, or authors..." 
                class="flex-1 px-3 py-2 text-lg outline-none"
                autofocus
                @keyup.enter="performSearch"
              />
              <button @click="closeSearch" class="p-2 hover:bg-gray-100 rounded-full">
                <X class="w-5 h-5" />
              </button>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div v-if="searchResults.length" class="divide-y divide-gray-100">
                <NuxtLink v-for="result in searchResults" :key="result.id" :to="`/article/${result.id}`" class="block p-4 hover:bg-gray-50 transition" @click="closeSearch">
                  <h4 class="font-semibold text-gray-900">{{ result.title }}</h4>
                  <p class="text-sm text-gray-500">{{ result.category }} • {{ result.date }}</p>
                </NuxtLink>
              </div>
              <div v-else-if="searchQuery && !searching" class="p-8 text-center text-gray-500">
                No results found for "{{ searchQuery }}"
              </div>
              <div v-else-if="!searchQuery" class="p-8 text-center text-gray-500">
                Start typing to search...
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'test'
})
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Menu, X, ChevronDown, ChevronRight, Calendar, Eye, Heart, Gamepad2, 
  Facebook, Twitter, Instagram, Trophy, Search, NotebookPen, User, Bookmark, 
  Settings, LogOut, Youtube, Linkedin, GraduationCap, Sprout
} from 'lucide-vue-next'

// State
const isMobileMenuOpen = ref(false)
const isMobileMoreOpen = ref(false)
const activeCategory = ref('All')
const isProfileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const searching = ref(false)
const noteCount = ref(3) // Example – replace with real data

// Navigation items
const navItems = ref([
  { name: 'Home', href: '/', active: true },
  { name: 'Politics', href: '/politics', active: false },
  { name: 'Business', href: '/business', active: false },
  { name: 'Technology', href: '/technology', active: false },
  { name: 'Sports', href: '/sports', active: false }
])

// Categories for filtering
const categories = ['All', 'Politics', 'Business', 'Technology', 'Sports', 'Health', 'Entertainment', 'Education', 'Agriculture']

// Sample articles (Cambodia focused)
const articles = ref([
  {
    id: 1,
    title: "Cambodia's Economy Shows Strong Recovery with 6% Growth in Q1",
    excerpt: "The Ministry of Economy and Finance reports robust performance in tourism and manufacturing sectors.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop",
    category: "Business",
    date: "May 28, 2025",
    views: "2.4k"
  },
  {
    id: 2,
    title: "New Tech Hub Launch in Phnom Penh Attracts Regional Startups",
    excerpt: "The 'Silicon Temple' innovation center aims to foster digital talent and cross-border collaboration.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop",
    category: "Technology",
    date: "May 27, 2025",
    views: "1.8k"
  },
  {
    id: 3,
    title: "Historic Temple Conservation Project Receives Global Funding",
    excerpt: "Angkor Wat preservation efforts get $10M boost from international heritage funds.",
    image: "https://images.unsplash.com/photo-1563351660-502e1f5c5d5c?w=400&h=250&fit=crop",
    category: "Politics",
    date: "May 26, 2025",
    views: "3.2k"
  },
  {
    id: 4,
    title: "Cambodian Football Team Prepares for AFF Championship",
    excerpt: "National squad intensifies training with new head coach aiming for historic semifinal.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=250&fit=crop",
    category: "Sports",
    date: "May 25, 2025",
    views: "4.1k"
  },
  {
    id: 5,
    title: "Universal Healthcare Expansion Announced for Rural Areas",
    excerpt: "New government initiative to provide health coverage to 2 million citizens by year end.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    category: "Health",
    date: "May 24, 2025",
    views: "1.5k"
  },
  {
    id: 6,
    title: "Khmer Film Wins Award at International Festival",
    excerpt: "Drama 'Last Night in Siem Reap' receives Best Director prize in Busan.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop",
    category: "Entertainment",
    date: "May 23, 2025",
    views: "2.2k"
  },
  {
    id: 7,
    title: "Green Energy Transition: Solar Farms Across Cambodia",
    excerpt: "Government partners with private sector to achieve 30% renewable energy by 2027.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
    category: "Technology",
    date: "May 22, 2025",
    views: "1.9k"
  },
  {
    id: 8,
    title: "Trade Agreement with EU Boosts Agricultural Exports",
    excerpt: "Cambodian rice and cashew nuts gain tariff-free access to European markets.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb221f7a1?w=400&h=250&fit=crop",
    category: "Business",
    date: "May 21, 2025",
    views: "2.7k"
  },
  {
    id: 9,
    title: "Digital Literacy Program Reaches 200,000 Students",
    excerpt: "Government expands tablet distribution to remote schools.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    category: "Education",
    date: "May 20, 2025",
    views: "1.8k"
  },
  {
    id: 10,
    title: "Rice Exporters Eye New Markets in Middle East",
    excerpt: "Cambodian fragrant rice gains popularity in Gulf countries.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
    category: "Agriculture",
    date: "May 19, 2025",
    views: "1.2k"
  }
])

// Computed filtered articles
const filteredArticles = computed(() => {
  if (activeCategory.value === 'All') return articles.value
  return articles.value.filter(article => article.category === activeCategory.value)
})

// Search function (mock)
const performSearch = () => {
  if (!searchQuery.value.trim()) return
  searching.value = true
  // Simulate API delay
  setTimeout(() => {
    const query = searchQuery.value.toLowerCase()
    searchResults.value = articles.value.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    ).slice(0, 10)
    searching.value = false
  }, 300)
}

// Open/close search
const openSearch = () => {
  isSearchOpen.value = true
  searchQuery.value = ''
  searchResults.value = []
}
const closeSearch = () => { isSearchOpen.value = false }

// Close search on Escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && isSearchOpen.value) {
    closeSearch()
  }
}
onMounted(() => window.addEventListener('keydown', handleEscape))
onUnmounted(() => window.removeEventListener('keydown', handleEscape))

// Profile menu
const toggleProfileMenu = () => { isProfileMenuOpen.value = !isProfileMenuOpen.value }
const openNotes = () => { navigateTo('/saved') }
const logout = () => { /* implement logout logic */ }

// Mobile menu methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    isMobileMoreOpen.value = false
  }
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  isMobileMoreOpen.value = false
}
const toggleMobileMoreSubmenu = () => {
  isMobileMoreOpen.value = !isMobileMoreOpen.value
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
.animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
.animate-slide-down { animation: slideDown 0.3s ease-out forwards; }

.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity 0.3s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.grid > div { animation: fadeInUp 0.5s ease-out backwards; }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@media (max-width: 1024px) {
  .container { padding-left: 1.5rem; padding-right: 1.5rem; }
}
</style>