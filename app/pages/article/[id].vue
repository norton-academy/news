<!-- pages/article/[id].vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
    <!-- Header (same as other pages, but no active state) -->
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

          <!-- Desktop Navigation (simplified for article page) -->
          <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.name"
              :to="item.href"
              class="px-4 py-2 text-gray-700 font-medium rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200 ease-in-out"
            >
              {{ item.name }}
            </NuxtLink>
            
            <!-- More Dropdown -->
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
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Article Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p class="mt-4 text-gray-600">Loading article...</p>
      </div>

      <!-- Article Not Found -->
      <div v-else-if="!article" class="text-center py-20">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <p class="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
        <NuxtLink to="/" class="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
          Back to Home
        </NuxtLink>
      </div>

      <!-- Article Display -->
      <div v-else class="max-w-4xl mx-auto">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <NuxtLink to="/" class="hover:text-red-600">Home</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <NuxtLink :to="`/${article.category.toLowerCase()}`" class="hover:text-red-600 capitalize">{{ article.category }}</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <span class="text-gray-700">{{ truncate(article.title, 50) }}</span>
        </div>

        <!-- Article Header -->
        <div class="mb-8">
          <div class="flex items-center gap-2 mb-4">
            <span class="bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full">{{ article.category }}</span>
            <span class="text-gray-500 text-sm flex items-center gap-1"><Calendar class="w-4 h-4" /> {{ article.date }}</span>
          </div>
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            {{ article.title }}
          </h1>
          <div class="flex items-center gap-4 mb-6">
            <img :src="article.authorAvatar" class="w-12 h-12 rounded-full object-cover" alt="author" />
            <div>
              <p class="font-semibold text-gray-900">{{ article.author }}</p>
              <p class="text-sm text-gray-500">{{ article.authorTitle }} • {{ article.readTime }} min read</p>
            </div>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="relative rounded-2xl overflow-hidden mb-10 shadow-lg">
          <img :src="article.image" :alt="article.title" class="w-full h-auto object-cover" />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p class="text-white text-sm italic">Photo: {{ article.imageCredit }}</p>
          </div>
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg prose-red max-w-none mb-12">
          <div v-html="article.content"></div>
        </div>

        <!-- Share & Tags -->
        <div class="border-t border-b border-gray-200 py-6 mb-10">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">Share this article:</span>
              <button class="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition">
                <Facebook class="w-4 h-4" />
              </button>
              <button class="p-2 bg-sky-500 rounded-full text-white hover:bg-sky-600 transition">
                <Twitter class="w-4 h-4" />
              </button>
              <button class="p-2 bg-pink-600 rounded-full text-white hover:bg-pink-700 transition">
                <Instagram class="w-4 h-4" />
              </button>
            </div>
            <div class="flex items-center gap-2">
              <Eye class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-600">{{ article.views }} views</span>
            </div>
          </div>
        </div>

        <!-- Author Bio -->
        <div class="bg-gray-50 rounded-2xl p-6 mb-12 flex gap-4 flex-wrap md:flex-nowrap">
          <img :src="article.authorAvatar" class="w-20 h-20 rounded-full object-cover" alt="author" />
          <div>
            <h4 class="font-bold text-lg text-gray-900 mb-1">{{ article.author }}</h4>
            <p class="text-gray-600 text-sm mb-2">{{ article.authorBio }}</p>
            <div class="flex gap-3">
              <a href="#" class="text-red-600 text-sm hover:underline">Twitter</a>
              <a href="#" class="text-red-600 text-sm hover:underline">LinkedIn</a>
              <a href="#" class="text-red-600 text-sm hover:underline">All articles</a>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <div class="mb-12">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span class="w-1 h-7 bg-red-600 rounded-full"></span>
            Related Articles
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="related in relatedArticles" 
              :key="related.id"
              class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <NuxtLink :to="`/article/${related.id}`">
                <div class="relative overflow-hidden h-48">
                  <img :src="related.image" :alt="related.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div class="p-5">
                  <h4 class="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition">
                    {{ related.title }}
                  </h4>
                  <p class="text-gray-600 text-sm line-clamp-2">{{ related.excerpt }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Comments Section (placeholder) -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Comments ({{ comments.length }})</h3>
          <div class="space-y-4 mb-6">
            <div v-for="comment in comments" :key="comment.id" class="flex gap-3">
              <img :src="comment.avatar" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-semibold text-gray-900">{{ comment.name }}</p>
                <p class="text-sm text-gray-600">{{ comment.text }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ comment.date }}</p>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-4">
            <textarea placeholder="Leave a comment..." rows="3" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"></textarea>
            <button class="mt-3 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Post Comment</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer (same as other pages) -->
    <footer class="bg-gray-900 text-gray-300 mt-16">
      <!-- ... same footer as previous pages ... -->
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">C</span>
              </div>
              <span class="text-2xl font-bold text-white">COBO-NEWS</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">Delivering trusted news and insights from Cambodia and beyond.</p>
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
              <li><NuxtLink to="/agriculture" class="hover:text-red-400 transition-colors duration-200 text-sm">Agriculture</NuxtLink></li>
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
              <input type="email" placeholder="Your email" class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600">
              <button class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">Subscribe</button>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2025 COBO-NEWS. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-red-400">Privacy Policy</a>
            <a href="#" class="hover:text-red-400">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Menu, X, ChevronDown, ChevronRight, Calendar, Eye, Heart, Gamepad2, 
  Facebook, Twitter, Instagram, GraduationCap, Sprout
} from 'lucide-vue-next'
definePageMeta({
  layout: "test",
  title: "Article",
})
const route = useRoute()
const articleId = computed(() => parseInt(route.params.id))

// Mock article database (in real app, fetch from API)
const articlesDatabase = ref([
  // Politics article (id: 1)
  {
    id: 1,
    title: "National Assembly Passes Landmark Education Reform Bill",
    excerpt: "Unanimous vote paves way for modernization of curriculum and teacher training across Cambodia.",
    content: `
      <p>The National Assembly today voted unanimously to pass the long-awaited Education Reform Bill, a landmark piece of legislation that overhauls Cambodia's public education system for the first time in two decades.</p>
      <p>The bill introduces a new national curriculum focused on critical thinking, digital literacy, and practical skills. It also mandates continuous professional development for all teachers and establishes a merit-based promotion system.</p>
      <h2>Key Provisions</h2>
      <ul>
        <li>Modernized curriculum with emphasis on STEM and Khmer language proficiency</li>
        <li>Annual teacher training requirements with performance incentives</li>
        <li>Increased funding for rural schools and infrastructure</li>
        <li>Establishment of a National Education Quality Assurance Council</li>
      </ul>
      <p>Minister of Education, Hang Chuon Naron, called the bill "a transformative step toward a knowledge-based economy." The opposition also supported the bill, praising its inclusive drafting process.</p>
      <p>The bill now awaits signature by the King before becoming law. Implementation is expected to begin in the 2026 academic year.</p>
    `,
    category: "Politics",
    date: "May 28, 2025",
    views: "3.2k",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200&h=600&fit=crop",
    imageCredit: "National Assembly of Cambodia",
    author: "Sophea Meas",
    authorTitle: "Senior Political Correspondent",
    authorBio: "Sophea has covered Cambodian politics for over a decade, specializing in legislative and governance issues.",
    authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  // Business article (id: 2)
  {
    id: 2,
    title: "Cambodia's Economy Shows Strong Recovery with 6% Growth in Q1",
    excerpt: "The Ministry of Economy and Finance reports robust performance in tourism and manufacturing sectors.",
    content: `
      <p>Cambodia's economy grew by 6% in the first quarter of 2025, driven by a resurgence in tourism and strong manufacturing exports, according to a report released today by the Ministry of Economy and Finance.</p>
      <p>The growth exceeded forecasts and marks a full recovery from the pandemic-induced slowdown. Tourist arrivals reached 1.5 million in Q1, up 35% year-on-year, while garment exports increased by 12%.</p>
      <h2>Sector Highlights</h2>
      <ul>
        <li>Tourism: $800M in revenue, led by Chinese and Korean visitors</li>
        <li>Manufacturing: Garment exports up 12%, electronics up 18%</li>
        <li>Construction: Residential projects surge in Phnom Penh suburbs</li>
        <li>Agriculture: Rice exports to EU hit record high</li>
      </ul>
      <p>Finance Minister Aun Pornmoniroth stated that the government will maintain supportive fiscal policies to sustain growth. The IMF has revised its full-year forecast for Cambodia to 6.2%.</p>
    `,
    category: "Business",
    date: "May 27, 2025",
    views: "2.8k",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&h=600&fit=crop",
    imageCredit: "Phnom Penh Economic Zone",
    author: "Rithy Samnang",
    authorTitle: "Business Editor",
    authorBio: "Rithy has 15 years of experience covering Cambodia's economic and financial sectors.",
    authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  // Technology article (id: 3)
  {
    id: 3,
    title: "Cambodian AI Startup Raises $12M Series A for Agriculture Solutions",
    excerpt: "'AgriMind' uses computer vision to detect crop diseases, aiming to increase rice yields by 30%.",
    content: `
      <p>Phnom Penh-based agritech startup AgriMind has raised $12 million in a Series A funding round led by Singapore-based VC firm Golden Gate Ventures, the company announced today.</p>
      <p>The startup's flagship product uses computer vision and machine learning to identify crop diseases from smartphone photos, providing real-time recommendations to farmers.</p>
      <h2>Impact Potential</h2>
      <p>In pilot programs across Battambang and Kampong Cham provinces, AgriMind reduced pesticide misuse by 40% and increased rice yields by an average of 28%. The company plans to expand to 100,000 farmers by the end of 2026.</p>
      <p>"We're building technology that solves real problems for Cambodian farmers," said CEO Sreynoch Lim. "This investment will allow us to scale our platform and add new features like weather forecasting and market price alerts."</p>
      <p>The funding round also included participation from Mekong Angel Investors and Impact Asia.</p>
    `,
    category: "Technology",
    date: "May 26, 2025",
    views: "3.5k",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=600&fit=crop",
    imageCredit: "AgriMind Demo",
    author: "Sreynoch Lim",
    authorTitle: "Tech Reporter",
    authorBio: "Sreynoch covers technology and innovation across Southeast Asia, with a focus on Cambodia's startup ecosystem.",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  // Sports article (id: 4)
  {
    id: 4,
    title: "Cambodia National Football Team Advances to AFF Cup Semifinals",
    excerpt: "Historic 2-1 victory over Indonesia sends Angkor Warriors to the final four for the first time in 10 years.",
    content: `
      <p>In front of a roaring crowd of 50,000 at Phnom Penh's Olympic Stadium, the Cambodian national football team secured a dramatic 2-1 victory over Indonesia to advance to the AFF Cup semifinals for the first time since 2015.</p>
      <p>Striker Sieng Chanthea scored both goals for Cambodia, including a 89th-minute winner that sent the stadium into delirium. Indonesia had equalized early in the second half, but Cambodia's relentless pressure paid off.</p>
      <h2>Road to Semifinals</h2>
      <p>Cambodia finished second in Group B behind Vietnam, with wins over Laos and Myanmar. The semifinal opponent will be determined by a draw later this week.</p>
      <p>Coach Felix Dalmas praised his team's resilience: "These players never gave up. We believe we can go all the way." The semifinal first leg will be played on June 5 at Olympic Stadium.</p>
    `,
    category: "Sports",
    date: "May 25, 2025",
    views: "5.2k",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=600&fit=crop",
    imageCredit: "FFC / AFF Cup",
    author: "Bora Thach",
    authorTitle: "Sports Editor",
    authorBio: "Bora has covered Cambodian football for 12 years and is a regular commentator on local broadcasts.",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  // Health article (id: 5)
  {
    id: 5,
    title: "Universal Health Coverage Expansion Reaches 5 Million Cambodians",
    excerpt: "Government launches digital health ID system to streamline access to public hospitals nationwide.",
    content: `
      <p>The Ministry of Health today announced that the national universal health coverage (UHC) scheme now covers more than 5 million citizens, exceeding its 2025 target six months early.</p>
      <p>The centerpiece of the expansion is a new digital health ID system that allows patients to access services at any public hospital using a smartphone app or a physical card.</p>
      <h2>Key Achievements</h2>
      <ul>
        <li>Over 1,200 health centers upgraded with electronic medical records</li>
        <li>Free maternal and child health services for all pregnant women</li>
        <li>Chronic disease management programs for diabetes and hypertension</li>
        <li>Telemedicine consultations in remote provinces</li>
      </ul>
      <p>Health Minister Mam Bunheng stated that the government aims to reach 8 million citizens by the end of 2026. The initiative is supported by the World Bank and Global Fund.</p>
    `,
    category: "Health",
    date: "May 24, 2025",
    views: "2.9k",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
    imageCredit: "Ministry of Health",
    author: "Dr. Malis Sovann",
    authorTitle: "Health Correspondent",
    authorBio: "Dr. Sovann is a public health specialist and journalist covering healthcare in Cambodia.",
    authorAvatar: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  // Add more articles for other categories (id:6,7,8...)
  {
    id: 6,
    title: "Angkor Music Festival Returns with Star-Studded Lineup",
    excerpt: "International and local artists to perform at Siem Reap's iconic temple backdrop for 3-day celebration.",
    content: "<p>The Angkor Music Festival will return from November 15-17, 2025, featuring headliners including Cambodian pop star Laura Mam and international acts from Thailand and Vietnam...</p>",
    category: "Entertainment",
    date: "May 22, 2025",
    views: "4.1k",
    readTime: 3,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
    imageCredit: "Angkor Music Festival",
    author: "Ratanak Kim",
    authorTitle: "Entertainment Editor",
    authorBio: "Ratanak covers arts, culture, and entertainment in Cambodia.",
    authorAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: 7,
    title: "Government Launches Digital Literacy Program for 1 Million Students",
    excerpt: "Partnership with tech companies brings tablets and coding curriculum to public schools nationwide.",
    content: "<p>The Ministry of Education today unveiled a $50 million digital literacy program that will provide tablets and coding training to 1 million students over the next three years...</p>",
    category: "Education",
    date: "May 20, 2025",
    views: "2.3k",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
    imageCredit: "MoEYS",
    author: "Sreymom Chea",
    authorTitle: "Education Correspondent",
    authorBio: "Sreymom reports on education policy and school innovations in Cambodia.",
    authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: 8,
    title: "Cambodia Rice Exports Surge 25% in First Half of 2025",
    excerpt: "China and EU markets drive record shipments as premium fragrant rice gains global recognition.",
    content: "<p>Cambodia exported 650,000 tons of milled rice in the first six months of 2025, a 25% increase over the same period last year, according to the Cambodia Rice Federation...</p>",
    category: "Agriculture",
    date: "May 18, 2025",
    views: "1.9k",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop",
    imageCredit: "CRF",
    author: "Sophea Rin",
    authorTitle: "Agriculture Editor",
    authorBio: "Sophea has reported on Cambodia's agricultural sector for over a decade.",
    authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
  }
])

// Comments mock
const comments = ref([
  { id: 1, name: "Sokha Chan", avatar: "https://randomuser.me/api/portraits/women/1.jpg", text: "Great article! Very informative.", date: "2 hours ago" },
  { id: 2, name: "Vannak Rith", avatar: "https://randomuser.me/api/portraits/men/2.jpg", text: "Thanks for sharing this important news.", date: "1 hour ago" }
])

const article = ref(null)
const loading = ref(true)
const relatedArticles = ref([])

onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    const found = articlesDatabase.value.find(a => a.id === articleId.value)
    if (found) {
      article.value = found
      // Get related articles (same category, exclude current, limit 3)
      relatedArticles.value = articlesDatabase.value
        .filter(a => a.category === found.category && a.id !== found.id)
        .slice(0, 3)
    }
    loading.value = false
  }, 300)
})

// Navigation items (without active highlight)
const navItems = ref([
  { name: 'Home', href: '/' },
  { name: 'Politics', href: '/politics' },
  { name: 'Business', href: '/business' },
  { name: 'Technology', href: '/technology' },
  { name: 'Sports', href: '/sports' }
])

// Mobile menu state
const isMobileMenuOpen = ref(false)
const isMobileMoreOpen = ref(false)

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

const truncate = (text, length) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
</script>

<style scoped>
/* Same animations and styles as previous pages */
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
/* Prose styling for article content */
.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}
.prose p {
  margin-bottom: 1.25rem;
  line-height: 1.75;
  color: #374151;
}
.prose ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1.25rem;
}
.prose li {
  margin-bottom: 0.5rem;
}
</style>
