<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
    <!-- Header (copied from homepage with Featured active) -->
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

          <!-- Desktop Navigation with Featured added -->
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

          <!-- Desktop Right Actions (Search, Notes, Profile) – same as homepage -->
          <div class="hidden lg:flex items-center gap-3">
            <button @click="openSearch" class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Search">
              <Search class="w-5 h-5 text-gray-600" />
            </button>
            <button @click="openNotes" class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
              <NotebookPen class="w-5 h-5 text-gray-600" />
              <span v-if="noteCount > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{{ noteCount }}</span>
            </button>
            <div class="relative">
              <button @click="toggleProfileMenu" class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" class="w-8 h-8 rounded-full object-cover" alt="Profile" />
                <ChevronDown class="w-4 h-4 text-gray-600 transition-transform duration-200" :class="{ 'rotate-180': isProfileMenuOpen }" />
              </button>
              <div v-if="isProfileMenuOpen" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-up">
                <NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"> <User class="w-4 h-4" /> My Account </NuxtLink>
                <NuxtLink to="/saved" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"> <Bookmark class="w-4 h-4" /> Saved Articles </NuxtLink>
                <NuxtLink to="/settings" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"> <Settings class="w-4 h-4" /> Settings </NuxtLink>
                <hr class="my-1 border-gray-100" />
                <button @click="logout" class="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-50 transition text-red-600"> <LogOut class="w-4 h-4" /> Sign Out </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-gray-700" />
            <X v-else class="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu (same as homepage, with Featured added) -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 lg:hidden">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeMobileMenu"></div>
          <div class="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col animate-slide-in">
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"><span class="text-white font-bold">C</span></div>
                <span class="text-xl font-bold text-gray-900">COBO-NEWS</span>
              </div>
            </div>
            <nav class="flex-1 p-4 space-y-1">
              <NuxtLink v-for="item in navItems" :key="item.name" :to="item.href" class="flex items-center justify-between py-3 px-4 text-gray-700 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200" @click="closeMobileMenu">
                {{ item.name }}
              </NuxtLink>
              <div class="mt-1">
                <button @click="toggleMobileMoreSubmenu" class="flex items-center justify-between w-full py-3 px-4 text-gray-700 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                  <span>More</span>
                  <ChevronDown :class="['w-4 h-4 transition-transform duration-300', { 'rotate-180': isMobileMoreOpen }]" />
                </button>
                <div v-show="isMobileMoreOpen" class="ml-6 mt-1 space-y-1 border-l-2 border-red-200 pl-3">
                  <NuxtLink to="/health" class="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu"> <Heart class="w-4 h-4" /> Health </NuxtLink>
                  <NuxtLink to="/entertainment" class="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu"> <Gamepad2 class="w-4 h-4" /> Entertainment </NuxtLink>
                  <NuxtLink to="/education" class="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu"> <GraduationCap class="w-4 h-4" /> Education </NuxtLink>
                  <NuxtLink to="/agriculture" class="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-red-50 hover:text-red-600" @click="closeMobileMenu"> <Sprout class="w-4 h-4" /> Agriculture </NuxtLink>
                </div>
              </div>
            </nav>
            <div class="p-6 border-t border-gray-100">
              <button class="w-full py-3 bg-red-600 text-white font-medium rounded-xl shadow-md hover:bg-red-700 transition-all duration-300">Subscribe</button>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content: Featured Page -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Hero Featured Story -->
      <section class="mb-12 lg:mb-16 animate-fade-in-up">
        <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl group">
          <div class="absolute inset-0 bg-black/40 z-10 transition-all duration-500 group-hover:bg-black/30"></div>
          <img :src="heroArticle.image" class="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent">
            <div class="flex items-center gap-2 text-sm text-red-300 font-semibold mb-3">
              <span class="bg-red-600 text-white px-2 py-0.5 rounded text-xs">FEATURED STORY</span>
              <Star class="w-4 h-4 text-yellow-400" fill="currentColor" />
            </div>
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-lg">{{ heroArticle.title }}</h1>
            <p class="text-gray-200 text-sm md:text-base max-w-2xl line-clamp-2">{{ heroArticle.excerpt }}</p>
            <div class="flex items-center gap-3 mt-4">
              <img :src="heroArticle.authorAvatar" class="w-10 h-10 rounded-full border-2 border-white" />
              <div>
                <p class="text-white font-medium">{{ heroArticle.author }}</p>
                <p class="text-gray-300 text-xs">{{ heroArticle.date }} · {{ heroArticle.readTime }} min read</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Editor's Picks Section (Grid of 3) -->
      <div class="mb-12">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-1 h-7 bg-red-600 rounded-full"></div>
          <h2 class="text-2xl font-bold text-gray-900">Editor's Picks</h2>
          <div class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">Curated</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="article in editorPicks" :key="article.id" class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2">
            <div class="relative overflow-hidden h-48">
              <img :src="article.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute top-3 left-3"><span class="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-md shadow-md">{{ article.category }}</span></div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <Calendar class="w-3 h-3" /> {{ article.date }} · <Eye class="w-3 h-3" /> {{ article.views }} views
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition">{{ article.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ article.excerpt }}</p>
              <NuxtLink :to="`/article/${article.id}`" class="inline-flex items-center gap-1 text-red-600 font-medium text-sm hover:gap-2 transition-all duration-300">Read more <ChevronRight class="w-4 h-4" /></NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Trending Now (Horizontal scrollable or grid, here we use 2 rows of 2) -->
      <div class="mb-12 bg-gray-50 rounded-2xl p-6">
        <div class="flex items-center gap-2 mb-6">
          <TrendingUp class="w-5 h-5 text-red-600" />
          <h2 class="text-2xl font-bold text-gray-900">Trending Now</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="article in trendingArticles" :key="article.id" class="flex gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="article.image" class="w-full h-full object-cover" />
            </div>
            <div>
              <span class="text-xs text-red-600 font-semibold">{{ article.category }}</span>
              <h3 class="font-bold text-gray-800 line-clamp-2 hover:text-red-600 transition"><NuxtLink :to="`/article/${article.id}`">{{ article.title }}</NuxtLink></h3>
              <p class="text-xs text-gray-500 mt-1">{{ article.views }} views</p>
            </div>
          </div>
        </div>
      </div>

      <!-- All Featured Articles (Grid) -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">More Featured Stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="article in allFeatured" :key="article.id" class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2">
            <div class="relative overflow-hidden h-48">
              <img :src="article.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute top-3 left-3"><span class="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-md shadow-md">{{ article.category }}</span></div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <Calendar class="w-3 h-3" /> {{ article.date }} · <Eye class="w-3 h-3" /> {{ article.views }} views
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition">{{ article.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ article.excerpt }}</p>
              <NuxtLink :to="`/article/${article.id}`" class="inline-flex items-center gap-1 text-red-600 font-medium text-sm hover:gap-2 transition-all duration-300">Read more <ChevronRight class="w-4 h-4" /></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer (identical to homepage's 4-column footer) -->
    <footer class="bg-gray-900 text-gray-300 mt-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"><span class="text-white font-bold text-lg">C</span></div>
              <span class="text-2xl font-bold text-white">COBO-NEWS</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">Delivering trusted news and insights from Cambodia and beyond. Independent, factual, and forward-thinking.</p>
            <div class="flex gap-4 pt-2">
              <a href="#" class="hover:text-red-400"><Facebook class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400"><Twitter class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400"><Instagram class="w-5 h-5" /></a>
              <a href="#" class="hover:text-red-400"><Youtube class="w-5 h-5" /></a>
            </div>
          </div>
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
              <li><NuxtLink to="/featured" class="hover:text-red-400 text-sm font-semibold text-red-400">Featured</NuxtLink></li>
            </ul>
          </div>
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
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Follow Us</h4>
            <ul class="space-y-2">
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Facebook class="w-4 h-4" /> Facebook</a></li>
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Twitter class="w-4 h-4" /> Twitter</a></li>
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Instagram class="w-4 h-4" /> Instagram</a></li>
              <li><a href="#" class="flex items-center gap-3 hover:text-red-400 text-sm"><Youtube class="w-4 h-4" /> YouTube</a></li>
            </ul>
            <div class="mt-6">
              <p class="text-sm text-gray-400 mb-2">Download our app</p>
              <div class="flex gap-3">
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

    <!-- Search Overlay (same as homepage) -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isSearchOpen" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20" @click.self="closeSearch">
          <div class="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-down">
            <div class="p-4 border-b border-gray-100 flex items-center">
              <Search class="w-5 h-5 text-gray-400 ml-2" />
              <input type="text" v-model="searchQuery" placeholder="Search news, topics, or authors..." class="flex-1 px-3 py-2 text-lg outline-none" autofocus @keyup.enter="performSearch" />
              <button @click="closeSearch" class="p-2 hover:bg-gray-100 rounded-full"><X class="w-5 h-5" /></button>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div v-if="searchResults.length" class="divide-y divide-gray-100">
                <NuxtLink v-for="result in searchResults" :key="result.id" :to="`/article/${result.id}`" class="block p-4 hover:bg-gray-50 transition" @click="closeSearch">
                  <h4 class="font-semibold text-gray-900">{{ result.title }}</h4>
                  <p class="text-sm text-gray-500">{{ result.category }} • {{ result.date }}</p>
                </NuxtLink>
              </div>
              <div v-else-if="searchQuery && !searching" class="p-8 text-center text-gray-500">No results found for "{{ searchQuery }}"</div>
              <div v-else-if="!searchQuery" class="p-8 text-center text-gray-500">Start typing to search...</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'public' })
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Menu, X, ChevronDown, ChevronRight, Calendar, Eye, Heart, Gamepad2, 
  Facebook, Twitter, Instagram, Trophy, Search, NotebookPen, User, Bookmark, 
  Settings, LogOut, Youtube, Linkedin, GraduationCap, Sprout, Star, TrendingUp
} from 'lucide-vue-next'

// Header state & methods (identical to homepage)
const isMobileMenuOpen = ref(false)
const isMobileMoreOpen = ref(false)
const isProfileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const searching = ref(false)
const noteCount = ref(3)

const navItems = ref([
  { name: 'Home', href: '/', active: false },
  { name: 'Politics', href: '/politics', active: false },
  { name: 'Business', href: '/business', active: false },
  { name: 'Technology', href: '/technology', active: false },
  { name: 'Sports', href: '/sports', active: false },
  { name: 'Featured', href: '/featured', active: true }
])

// Mock article database (with featured flag)
const articles = ref([
  { id: 1, title: "Cambodia's Digital Economy Set to Triple by 2026", excerpt: "New policies drive growth in Phnom Penh's startup ecosystem.", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop", category: "Technology", date: "May 28, 2025", views: "5.2k", readTime: 4, featured: true, author: "Sreynoch Lim", authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, title: "Cambodia's Economy Shows Strong Recovery with 6% Growth in Q1", excerpt: "Tourism and manufacturing drive robust performance.", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop", category: "Business", date: "May 28, 2025", views: "2.4k", readTime: 3, featured: true, author: "Rithy Samnang", authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, title: "Cambodian Football Team Advances to AFF Cup Semifinals", excerpt: "Historic victory over Indonesia sends Angkor Warriors to final four.", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=250&fit=crop", category: "Sports", date: "May 25, 2025", views: "8.1k", readTime: 5, featured: true, author: "Bora Thach", authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 4, title: "Universal Health Coverage Expansion Reaches 5 Million", excerpt: "Digital health ID system launched nationwide.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop", category: "Health", date: "May 24, 2025", views: "3.5k", readTime: 4, featured: true, author: "Dr. Malis Sovann", authorAvatar: "https://randomuser.me/api/portraits/women/56.jpg" },
  { id: 5, title: "Angkor Music Festival Returns with Star-Studded Lineup", excerpt: "International and local artists perform at Siem Reap.", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop", category: "Entertainment", date: "May 22, 2025", views: "6.3k", readTime: 3, featured: true, author: "Ratanak Kim", authorAvatar: "https://randomuser.me/api/portraits/men/52.jpg" },
  { id: 6, title: "Government Launches Digital Literacy Program for 1M Students", excerpt: "Tablets and coding curriculum for public schools.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop", category: "Education", date: "May 20, 2025", views: "2.9k", readTime: 4, featured: true, author: "Sreymom Chea", authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg" },
  { id: 7, title: "Cambodia Rice Exports Surge 25% in First Half of 2025", excerpt: "China and EU drive record shipments.", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop", category: "Agriculture", date: "May 18, 2025", views: "2.1k", readTime: 3, featured: true, author: "Sophea Rin", authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg" },
  { id: 8, title: "New Tech Hub Launch in Phnom Penh Attracts Regional Startups", excerpt: "Silicon Temple aims to foster digital talent.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop", category: "Technology", date: "May 27, 2025", views: "1.8k", readTime: 4, featured: false },
  // ... other non-featured articles
])

// Hero article (first featured)
const heroArticle = computed(() => articles.value.find(a => a.featured) || articles.value[0])

// Editor's picks (next 3 featured after hero)
const editorPicks = computed(() => articles.value.filter(a => a.featured && a.id !== heroArticle.value.id).slice(0, 3))

// Trending (mix of high views, take 4)
const trendingArticles = computed(() => articles.value.filter(a => a.featured).sort((a,b) => parseInt(b.views) - parseInt(a.views)).slice(0, 4))

// All featured articles (excluding hero and editor's picks to avoid duplicate? but we'll show all featured in the bottom grid)
const allFeatured = computed(() => articles.value.filter(a => a.featured).slice(0, 9))

// Search (mock)
const performSearch = () => {
  if (!searchQuery.value.trim()) return
  searching.value = true
  setTimeout(() => {
    const q = searchQuery.value.toLowerCase()
    searchResults.value = articles.value.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)).slice(0,10)
    searching.value = false
  }, 300)
}

const openSearch = () => { isSearchOpen.value = true; searchQuery.value = ''; searchResults.value = [] }
const closeSearch = () => { isSearchOpen.value = false }
const handleEscape = (e) => { if (e.key === 'Escape' && isSearchOpen.value) closeSearch() }
onMounted(() => window.addEventListener('keydown', handleEscape))
onUnmounted(() => window.removeEventListener('keydown', handleEscape))

const toggleProfileMenu = () => { isProfileMenuOpen.value = !isProfileMenuOpen.value }
const openNotes = () => { navigateTo('/saved') }
const logout = () => { console.log('logout') }

const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value; if (isMobileMenuOpen.value) document.body.style.overflow = 'hidden'; else document.body.style.overflow = '' }
const closeMobileMenu = () => { isMobileMenuOpen.value = false; document.body.style.overflow = ''; isMobileMoreOpen.value = false }
const toggleMobileMoreSubmenu = () => { isMobileMoreOpen.value = !isMobileMoreOpen.value }
</script>

<style scoped>
/* Same as homepage styles */
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
.animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
.animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity 0.3s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.grid > div { animation: fadeInUp 0.5s ease-out backwards; }
@media (max-width: 1024px) { .container { padding-left: 1.5rem; padding-right: 1.5rem; } }
</style>