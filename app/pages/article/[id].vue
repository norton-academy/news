<!-- pages/article/[id].vue -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Calendar,
  Eye,
  Heart,
  Gamepad2,
  Facebook,
  Twitter,
  Instagram,
  GraduationCap,
  Sprout,
  Share2,
  BookOpen,
  ArrowUp,
  MessageCircle,
  Check,
  Copy,
  Linkedin,
  Link2,
  ThumbsUp,
  Clock,
  User,
  Mail,
  Moon,
  Sun,
} from "lucide-vue-next";

definePageMeta({
  layout: "public",
  title: "Article",
});

const route = useRoute();
const articleId = computed(() => parseInt(route.params.id as string));

// Mock article database
const articlesDatabase = ref([
  {
    id: 1,
    title: "National Assembly Passes Landmark Education Reform Bill",
    excerpt: "Unanimous vote paves way for modernization of curriculum and teacher training across Cambodia.",
    content: `
      <h2>Historic Legislative Milestone</h2>
      <p>The National Assembly today voted unanimously to pass the long-awaited Education Reform Bill, a landmark piece of legislation that overhauls Cambodia's public education system for the first time in two decades.</p>
      <p>The bill introduces a new national curriculum focused on critical thinking, digital literacy, and practical skills. It also mandates continuous professional development for all teachers and establishes a merit-based promotion system.</p>
      <h2>Key Provisions of the Bill</h2>
      <ul>
        <li>Modernized curriculum with emphasis on STEM and Khmer language proficiency</li>
        <li>Annual teacher training requirements with performance incentives</li>
        <li>Increased funding for rural schools and infrastructure</li>
        <li>Establishment of a National Education Quality Assurance Council</li>
      </ul>
      <h2>Stakeholder Reactions</h2>
      <p>Minister of Education, Hang Chuon Naron, called the bill "a transformative step toward a knowledge-based economy." The opposition also supported the bill, praising its inclusive drafting process.</p>
      <p>The bill now awaits signature by the King before becoming law. Implementation is expected to begin in the 2026 academic year.</p>
      <h3>Implementation Timeline</h3>
      <p>The Ministry has outlined a three-phase rollout beginning with pilot schools in Phnom Penh, followed by provincial capitals, and finally rural areas by 2027.</p>
    `,
    category: "Politics",
    date: "May 28, 2025",
    views: 3200,
    likes: 245,
    readTime: 5,
    image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200&h=600&fit=crop",
    imageCredit: "National Assembly of Cambodia",
    author: "Sophea Meas",
    authorTitle: "Senior Political Correspondent",
    authorBio: "Sophea has covered Cambodian politics for over a decade, specializing in legislative and governance issues. Her reporting has been featured in international publications including Asia Times and The Diplomat.",
    authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    authorSocial: { twitter: "@sopheameas", linkedin: "sophea-meas" },
  },
  {
    id: 2,
    title: "Cambodia's Economy Shows Strong Recovery with 6% Growth in Q1",
    excerpt: "The Ministry of Economy and Finance reports robust performance in tourism and manufacturing sectors.",
    content: `
      <h2>Economic Indicators Exceed Expectations</h2>
      <p>Cambodia's economy grew by 6% in the first quarter of 2025, driven by a resurgence in tourism and strong manufacturing exports, according to a report released today by the Ministry of Economy and Finance.</p>
      <p>The growth exceeded forecasts and marks a full recovery from the pandemic-induced slowdown. Tourist arrivals reached 1.5 million in Q1, up 35% year-on-year, while garment exports increased by 12%.</p>
      <h2>Sector Performance Highlights</h2>
      <ul>
        <li>Tourism: $800M in revenue, led by Chinese and Korean visitors</li>
        <li>Manufacturing: Garment exports up 12%, electronics up 18%</li>
        <li>Construction: Residential projects surge in Phnom Penh suburbs</li>
        <li>Agriculture: Rice exports to EU hit record high</li>
      </ul>
      <h2>Government Outlook</h2>
      <p>Finance Minister Aun Pornmoniroth stated that the government will maintain supportive fiscal policies to sustain growth. The IMF has revised its full-year forecast for Cambodia to 6.2%.</p>
    `,
    category: "Business",
    date: "May 27, 2025",
    views: 2800,
    likes: 189,
    readTime: 4,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&h=600&fit=crop",
    imageCredit: "Phnom Penh Economic Zone",
    author: "Rithy Samnang",
    authorTitle: "Business Editor",
    authorBio: "Rithy has 15 years of experience covering Cambodia's economic and financial sectors, previously serving as a financial analyst at the World Bank.",
    authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    authorSocial: { twitter: "@rithysamnang", linkedin: "rithy-samnang" },
  },
  {
    id: 3,
    title: "Cambodian AI Startup Raises $12M Series A for Agriculture Solutions",
    excerpt: "'AgriMind' uses computer vision to detect crop diseases, aiming to increase rice yields by 30%.",
    content: `
      <h2>Record-Breaking Fundraise for Cambodian Tech</h2>
      <p>Phnom Penh-based agritech startup AgriMind has raised $12 million in a Series A funding round led by Singapore-based VC firm Golden Gate Ventures, the company announced today.</p>
      <p>The startup's flagship product uses computer vision and machine learning to identify crop diseases from smartphone photos, providing real-time recommendations to farmers.</p>
      <h2>Transformative Impact on Agriculture</h2>
      <p>In pilot programs across Battambang and Kampong Cham provinces, AgriMind reduced pesticide misuse by 40% and increased rice yields by an average of 28%. The company plans to expand to 100,000 farmers by the end of 2026.</p>
      <h2>Founder's Vision</h2>
      <p>"We're building technology that solves real problems for Cambodian farmers," said CEO Sreynoch Lim. "This investment will allow us to scale our platform and add new features like weather forecasting and market price alerts."</p>
      <p>The funding round also included participation from Mekong Angel Investors and Impact Asia.</p>
    `,
    category: "Technology",
    date: "May 26, 2025",
    views: 3500,
    likes: 423,
    readTime: 5,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=600&fit=crop",
    imageCredit: "AgriMind Demo",
    author: "Sreynoch Lim",
    authorTitle: "Tech Reporter",
    authorBio: "Sreynoch covers technology and innovation across Southeast Asia, with a focus on Cambodia's startup ecosystem and digital transformation initiatives.",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    authorSocial: { twitter: "@sreynochlim", linkedin: "sreynoch-lim" },
  },
  {
    id: 4,
    title: "Cambodia National Football Team Advances to AFF Cup Semifinals",
    excerpt: "Historic 2-1 victory over Indonesia sends Angkor Warriors to the final four for the first time in 10 years.",
    content: `
      <h2>Dramatic Victory at Olympic Stadium</h2>
      <p>In front of a roaring crowd of 50,000 at Phnom Penh's Olympic Stadium, the Cambodian national football team secured a dramatic 2-1 victory over Indonesia to advance to the AFF Cup semifinals for the first time since 2015.</p>
      <p>Striker Sieng Chanthea scored both goals for Cambodia, including a 89th-minute winner that sent the stadium into delirium. Indonesia had equalized early in the second half, but Cambodia's relentless pressure paid off.</p>
      <h2>Road to the Semifinals</h2>
      <p>Cambodia finished second in Group B behind Vietnam, with wins over Laos and Myanmar. The semifinal opponent will be determined by a draw later this week.</p>
      <h2>Coach's Reaction</h2>
      <p>Coach Felix Dalmas praised his team's resilience: "These players never gave up. We believe we can go all the way." The semifinal first leg will be played on June 5 at Olympic Stadium.</p>
    `,
    category: "Sports",
    date: "May 25, 2025",
    views: 5200,
    likes: 892,
    readTime: 4,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=600&fit=crop",
    imageCredit: "FFC / AFF Cup",
    author: "Bora Thach",
    authorTitle: "Sports Editor",
    authorBio: "Bora has covered Cambodian football for 12 years and is a regular commentator on local broadcasts, known for his passionate analysis and deep knowledge of ASEAN football.",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    authorSocial: { twitter: "@borathach", linkedin: "bora-thach" },
  },
  {
    id: 5,
    title: "Universal Health Coverage Expansion Reaches 5 Million Cambodians",
    excerpt: "Government launches digital health ID system to streamline access to public hospitals nationwide.",
    content: `
      <h2>Healthcare Milestone Achieved</h2>
      <p>The Ministry of Health today announced that the national universal health coverage (UHC) scheme now covers more than 5 million citizens, exceeding its 2025 target six months early.</p>
      <p>The centerpiece of the expansion is a new digital health ID system that allows patients to access services at any public hospital using a smartphone app or a physical card.</p>
      <h2>Key Achievements of the Program</h2>
      <ul>
        <li>Over 1,200 health centers upgraded with electronic medical records</li>
        <li>Free maternal and child health services for all pregnant women</li>
        <li>Chronic disease management programs for diabetes and hypertension</li>
        <li>Telemedicine consultations in remote provinces</li>
      </ul>
      <h2>Future Expansion Plans</h2>
      <p>Health Minister Mam Bunheng stated that the government aims to reach 8 million citizens by the end of 2026. The initiative is supported by the World Bank and Global Fund.</p>
    `,
    category: "Health",
    date: "May 24, 2025",
    views: 2900,
    likes: 367,
    readTime: 5,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
    imageCredit: "Ministry of Health",
    author: "Dr. Malis Sovann",
    authorTitle: "Health Correspondent",
    authorBio: "Dr. Sovann is a public health specialist and journalist covering healthcare in Cambodia, holding a Master's in Public Health from Johns Hopkins University.",
    authorAvatar: "https://randomuser.me/api/portraits/women/56.jpg",
    authorSocial: { twitter: "@drmalissovann", linkedin: "malis-sovann" },
  },
  {
    id: 6,
    title: "Angkor Music Festival Returns with Star-Studded Lineup",
    excerpt: "International and local artists to perform at Siem Reap's iconic temple backdrop for 3-day celebration.",
    content: "<h2>Grand Return After Hiatus</h2><p>The Angkor Music Festival will return from November 15-17, 2025, featuring headliners including Cambodian pop star Laura Mam and international acts from Thailand and Vietnam...</p><h2>Cultural Significance</h2><p>The festival celebrates Cambodia's rich musical heritage while embracing contemporary sounds, attracting thousands of visitors annually.</p>",
    category: "Entertainment",
    date: "May 22, 2025",
    views: 4100,
    likes: 578,
    readTime: 3,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
    imageCredit: "Angkor Music Festival",
    author: "Ratanak Kim",
    authorTitle: "Entertainment Editor",
    authorBio: "Ratanak covers arts, culture, and entertainment in Cambodia, with a passion for promoting local artists on the international stage.",
    authorAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
    authorSocial: { twitter: "@ratanakk", instagram: "ratanak.kim" },
  },
  {
    id: 7,
    title: "Government Launches Digital Literacy Program for 1 Million Students",
    excerpt: "Partnership with tech companies brings tablets and coding curriculum to public schools nationwide.",
    content: "<h2>Bridging the Digital Divide</h2><p>The Ministry of Education today unveiled a $50 million digital literacy program that will provide tablets and coding training to 1 million students over the next three years...</p><h2>Public-Private Partnership</h2><p>Major tech companies including Smart Axiata and Cellcard have committed to providing infrastructure support and training resources.</p>",
    category: "Education",
    date: "May 20, 2025",
    views: 2300,
    likes: 312,
    readTime: 4,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
    imageCredit: "MoEYS",
    author: "Sreymom Chea",
    authorTitle: "Education Correspondent",
    authorBio: "Sreymom reports on education policy and school innovations in Cambodia, previously working as a teacher in rural provinces.",
    authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    authorSocial: { twitter: "@sreymomchea", linkedin: "sreymom-chea" },
  },
  {
    id: 8,
    title: "Cambodia Rice Exports Surge 25% in First Half of 2025",
    excerpt: "China and EU markets drive record shipments as premium fragrant rice gains global recognition.",
    content: "<h2>Record Export Figures</h2><p>Cambodia exported 650,000 tons of milled rice in the first six months of 2025, a 25% increase over the same period last year, according to the Cambodia Rice Federation...</p><h2>Quality Recognition</h2><p>Cambodian premium fragrant rice won the World's Best Rice Award for the third consecutive year at the World Rice Conference.</p>",
    category: "Agriculture",
    date: "May 18, 2025",
    views: 1900,
    likes: 156,
    readTime: 4,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop",
    imageCredit: "CRF",
    author: "Sophea Rin",
    authorTitle: "Agriculture Editor",
    authorBio: "Sophea has reported on Cambodia's agricultural sector for over a decade, traveling extensively to rice-growing provinces.",
    authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
    authorSocial: { twitter: "@sophearin", linkedin: "sophea-rin" },
  },
]);

// Dark mode support
const isDarkMode = ref(false);

// Check for saved dark mode preference or system preference
const initDarkMode = () => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    isDarkMode.value = saved === 'true';
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyDarkMode();
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', String(isDarkMode.value));
  applyDarkMode();
};

const applyDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Enhanced comments system
interface Comment {
  id: number;
  name: string;
  email?: string;
  avatar: string;
  text: string;
  date: string;
  timestamp: number;
  likes: number;
  replies?: Comment[];
}

const comments = ref<Comment[]>([
  {
    id: 1,
    name: "Sokha Chan",
    email: "sokha@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "Excellent coverage! The education reform bill is truly transformative for our country's future.",
    date: "2 hours ago",
    timestamp: Date.now() - 7200000,
    likes: 12,
  },
  {
    id: 2,
    name: "Vannak Rith",
    email: "vannak@example.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Thanks for the detailed analysis. Looking forward to seeing how these policies are implemented at the grassroots level.",
    date: "1 hour ago",
    timestamp: Date.now() - 3600000,
    likes: 5,
  },
  {
    id: 3,
    name: "Malis Sovan",
    email: "malis@example.com",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "Important news for all Cambodians. Hope the reforms will reach rural schools effectively.",
    date: "30 minutes ago",
    timestamp: Date.now() - 1800000,
    likes: 8,
  },
]);

// State variables
const article = ref<any>(null);
const loading = ref(true);
const processedContent = ref("");
const readingProgress = ref(0);
const showBackToTop = ref(false);
const isLiked = ref(false);
const likesCount = ref(0);
const copiedLink = ref(false);
const newComment = ref({ name: "", email: "", text: "" });
const isSubmittingComment = ref(false);
const commentError = ref("");
const showCommentSuccess = ref(false);
const sortBy = ref<"newest" | "oldest" | "mostLiked">("newest");

// Computed properties
const formattedDate = computed(() => {
  if (!article.value) return "";
  return new Date(article.value.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const formattedViews = computed(() => {
  if (!article.value) return "";
  if (article.value.views >= 1000) {
    return `${(article.value.views / 1000).toFixed(1)}k views`;
  }
  return `${article.value.views} views`;
});

const sortedComments = computed(() => {
  const sorted = [...comments.value];
  switch (sortBy.value) {
    case "newest":
      return sorted.sort((a, b) => b.timestamp - a.timestamp);
    case "oldest":
      return sorted.sort((a, b) => a.timestamp - b.timestamp);
    case "mostLiked":
      return sorted.sort((a, b) => b.likes - a.likes);
    default:
      return sorted;
  }
});

// Helper functions
const truncate = (text: string, length: number) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

const processContent = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  // Add IDs to headings for potential linking (without TOC display)
  const headings = doc.querySelectorAll("h2, h3");
  headings.forEach((heading, index) => {
    heading.id = `heading-${index}`;
  });
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc.body).replace(/<\/?body[^>]*>/g, "");
};

const updateProcessedContent = () => {
  if (article.value?.content) {
    processedContent.value = processContent(article.value.content);
  }
};

// Share functionality
const shareArticle = async () => {
  const url = window.location.href;
  const title = article.value.title;
  const text = article.value.excerpt;

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      console.log("Share cancelled");
    }
  } else {
    await copyToClipboard(url);
  }
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copiedLink.value = true;
    setTimeout(() => (copiedLink.value = false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(article.value.title);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "width=600,height=400");
};

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");
};

const shareToLinkedIn = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(article.value.title);
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, "_blank", "width=600,height=400");
};

// Like functionality
const toggleLike = () => {
  if (isLiked.value) {
    likesCount.value--;
    isLiked.value = false;
  } else {
    likesCount.value++;
    isLiked.value = true;
  }
};

// Comment functionality
const addComment = async () => {
  commentError.value = "";
  
  if (!newComment.value.name.trim()) {
    commentError.value = "Please enter your name";
    return;
  }
  if (!newComment.value.text.trim()) {
    commentError.value = "Please enter a comment";
    return;
  }
  if (newComment.value.text.length > 1000) {
    commentError.value = "Comment must be less than 1000 characters";
    return;
  }

  isSubmittingComment.value = true;

  setTimeout(() => {
    const newId = Math.max(...comments.value.map(c => c.id), 0) + 1;
    const comment: Comment = {
      id: newId,
      name: newComment.value.name.trim(),
      email: newComment.value.email || undefined,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newComment.value.name)}&background=dc2626&color=fff`,
      text: newComment.value.text.trim(),
      date: "Just now",
      timestamp: Date.now(),
      likes: 0,
    };
    comments.value.unshift(comment);
    newComment.value = { name: "", email: "", text: "" };
    showCommentSuccess.value = true;
    setTimeout(() => (showCommentSuccess.value = false), 3000);
    isSubmittingComment.value = false;
  }, 500);
};

const likeComment = (commentId: number) => {
  const comment = comments.value.find(c => c.id === commentId);
  if (comment) {
    comment.likes++;
  }
};

// Scroll handlers
const handleScroll = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
  readingProgress.value = Math.min(100, Math.max(0, progress));
  showBackToTop.value = scrollTop > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Fetch article data
const fetchArticle = () => {
  loading.value = true;
  setTimeout(() => {
    const found = articlesDatabase.value.find((a) => a.id === articleId.value);
    if (found) {
      article.value = { ...found };
      likesCount.value = found.likes || 0;
      updateProcessedContent();
    }
    loading.value = false;
  }, 300);
};

// Watch for article changes
watch(articleId, () => {
  fetchArticle();
}, { immediate: true });

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchArticle();
  initDarkMode();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// SEO
useHead(() => ({
  title: article.value ? `${article.value.title} | Cambodia News` : "Loading Article...",
  meta: [
    { name: "description", content: article.value?.excerpt || "Latest news from Cambodia" },
    { property: "og:title", content: article.value?.title },
    { property: "og:description", content: article.value?.excerpt },
    { property: "og:image", content: article.value?.image },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
}));
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 font-sans antialiased transition-colors duration-300">
    <!-- Reading Progress Bar -->
    <div 
      class="fixed top-0 left-0 right-0 h-1 bg-red-100 dark:bg-red-900/30 z-50"
      :style="{ transform: `translateX(${readingProgress - 100}%)` }"
      style="transform-origin: 0% 50%; transition: transform 0.1s ease-out;"
    >
      <div class="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
    </div>

    <!-- Loading State with Skeleton (Dark mode aware) -->
    <div v-if="loading" class="mx-auto px-4 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
        <div class="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>

    <!-- Article Not Found -->
    <div v-else-if="!article" class="text-center py-20">
      <div class="max-w-md mx-auto">
        <div class="text-6xl mb-6">🔍</div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:scale-105"
        >
          Back to Home
        </NuxtLink>
      </div>
    </div>

    <!-- Article Display -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 overflow-x-auto whitespace-nowrap">
        <NuxtLink to="/" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</NuxtLink>
        <ChevronRight class="w-4 h-4 flex-shrink-0" />
        <NuxtLink
          :to="`/category/${article.category.toLowerCase()}`"
          class="hover:text-red-600 dark:hover:text-red-400 transition-colors capitalize"
        >
          {{ article.category }}
        </NuxtLink>
        <ChevronRight class="w-4 h-4 flex-shrink-0" />
        <span class="text-gray-700 dark:text-gray-300 font-medium">{{ truncate(article.title, 60) }}</span>
      </nav>

      <!-- Article Header -->
      <header class="mb-8">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
            {{ article.category }}
          </span>
          <span class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
            <Calendar class="w-4 h-4" /> {{ formattedDate }}
          </span>
          <span class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
            <Clock class="w-4 h-4" /> {{ article.readTime }} min read
          </span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          {{ article.title }}
        </h1>
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <img
              :src="article.authorAvatar"
              class="w-14 h-14 rounded-full object-cover border-2 border-red-100 dark:border-red-900"
              :alt="article.author"
            />
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">{{ article.author }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ article.authorTitle }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="toggleLike"
              class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
              :class="isLiked ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              <Heart class="w-5 h-5" :fill="isLiked ? 'currentColor' : 'none'" />
              <span class="font-medium">{{ likesCount }}</span>
            </button>
            <div class="relative">
              <button
                @click="shareArticle"
                class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 class="w-5 h-5" />
                <span class="hidden sm:inline">Share</span>
              </button>
              <div v-if="copiedLink" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap">
                Link copied!
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Image -->
      <div class="relative rounded-2xl overflow-hidden mb-10 shadow-xl">
        <img
          :src="article.image"
          :alt="article.title"
          class="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
          loading="eager"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
          <p class="text-white text-sm italic">📷 {{ article.imageCredit }}</p>
        </div>
      </div>

      <!-- Article Content (Enhanced Typography with dark mode) -->
      <div class="prose prose-lg prose-red max-w-none dark:prose-invert mb-10">
        <div v-html="processedContent" class="article-content"></div>
      </div>

      <!-- Share & Engagement Bar (dark mode) -->
      <div class="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Share this article:</span>
            <div class="flex gap-2">
              <button
                @click="shareToFacebook"
                class="p-2 bg-[#1877f2] rounded-full text-white hover:bg-[#0f5bb5] transition-all transform hover:scale-110"
                aria-label="Share on Facebook"
              >
                <Facebook class="w-4 h-4" />
              </button>
              <button
                @click="shareToTwitter"
                class="p-2 bg-[#1da1f2] rounded-full text-white hover:bg-[#0d8bd9] transition-all transform hover:scale-110"
                aria-label="Share on Twitter"
              >
                <Twitter class="w-4 h-4" />
              </button>
              <button
                @click="shareToLinkedIn"
                class="p-2 bg-[#0077b5] rounded-full text-white hover:bg-[#005582] transition-all transform hover:scale-110"
                aria-label="Share on LinkedIn"
              >
                <Linkedin class="w-4 h-4" />
              </button>
              <button
                @click="copyToClipboard(window.location.href)"
                class="p-2 bg-gray-600 rounded-full text-white hover:bg-gray-700 transition-all transform hover:scale-110"
                aria-label="Copy link"
              >
                <Link2 class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Eye class="w-4 h-4" />
              <span class="text-sm">{{ formattedViews }}</span>
            </div>
            <div class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MessageCircle class="w-4 h-4" />
              <span class="text-sm">{{ comments.length }} comments</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Author Bio (dark mode) -->
      <div class="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 mb-12 border border-gray-100 dark:border-gray-700 shadow-sm">
        <div class="flex flex-col sm:flex-row gap-5">
          <img
            :src="article.authorAvatar"
            class="w-20 h-20 rounded-full object-cover border-2 border-red-200 dark:border-red-800"
            :alt="article.author"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h4 class="font-bold text-xl text-gray-900 dark:text-white">{{ article.author }}</h4>
              <div class="flex gap-2">
                <a v-if="article.authorSocial?.twitter" href="#" class="text-gray-500 dark:text-gray-400 hover:text-[#1da1f2] transition-colors">
                  <Twitter class="w-4 h-4" />
                </a>
                <a v-if="article.authorSocial?.linkedin" href="#" class="text-gray-500 dark:text-gray-400 hover:text-[#0077b5] transition-colors">
                  <Linkedin class="w-4 h-4" />
                </a>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{{ article.authorBio }}</p>
            <NuxtLink
              :to="`/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`"
              class="text-red-600 dark:text-red-400 text-sm hover:underline inline-flex items-center gap-1"
            >
              View all articles by {{ article.author.split(' ')[0] }}
              <ChevronRight class="w-3 h-3" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Enhanced Comments Section (dark mode) -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageCircle class="w-5 h-5 text-red-600 dark:text-red-400" />
            Comments ({{ comments.length }})
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
            <select 
              v-model="sortBy"
              class="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="mostLiked">Most liked</option>
            </select>
          </div>
        </div>

        <!-- Comment Form (dark mode) -->
        <div class="mb-8 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Leave a comment</h4>
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                <div class="relative">
                  <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    v-model="newComment.name"
                    type="text"
                    class="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (optional)</label>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    v-model="newComment.email"
                    type="email"
                    class="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comment *</label>
              <textarea
                v-model="newComment.text"
                rows="4"
                class="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Share your thoughts..."
                maxlength="1000"
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p v-if="commentError" class="text-red-500 dark:text-red-400 text-xs">{{ commentError }}</p>
                <p class="text-gray-400 dark:text-gray-500 text-xs text-right">{{ newComment.text.length }}/1000</p>
              </div>
            </div>
            <button
              @click="addComment"
              :disabled="isSubmittingComment"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span v-if="isSubmittingComment" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
              Post Comment
            </button>
            <div v-if="showCommentSuccess" class="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
              <Check class="w-4 h-4" /> Comment posted successfully!
            </div>
          </div>
        </div>

        <!-- Comments List (dark mode) -->
        <div class="space-y-5">
          <div v-for="comment in sortedComments" :key="comment.id" class="flex gap-3 group">
            <img :src="comment.avatar" class="w-10 h-10 rounded-full object-cover" :alt="comment.name" />
            <div class="flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="font-semibold text-gray-900 dark:text-white">{{ comment.name }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ comment.date }}</p>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm mt-1 leading-relaxed">{{ comment.text }}</p>
              <div class="flex items-center gap-4 mt-2">
                <button 
                  @click="likeComment(comment.id)"
                  class="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <ThumbsUp class="w-3 h-3" />
                  <span>{{ comment.likes }}</span>
                </button>
                <button class="text-xs text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">Reply</button>
              </div>
            </div>
          </div>
          <div v-if="comments.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to share your thoughts!
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button (dark mode) -->
    <transition name="fade">
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ArrowUp class="w-5 h-5" />
      </button>
    </transition>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced prose styling for article content with dark mode support */
.article-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
  scroll-margin-top: 80px;
}

.dark .article-content :deep(h2) {
  color: #f3f4f6;
}

.article-content :deep(h3) {
  font-size: 1.375rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #374151;
  scroll-margin-top: 80px;
}

.dark .article-content :deep(h3) {
  color: #e5e7eb;
}

.article-content :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
  color: #4b5563;
}

.dark .article-content :deep(p) {
  color: #9ca3af;
}

.article-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.dark .article-content :deep(li) {
  color: #9ca3af;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #dc2626;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}

.dark .article-content :deep(blockquote) {
  color: #9ca3af;
}

.article-content :deep(img) {
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Progress bar animation */
.progress-bar {
  transition: transform 0.1s ease-out;
}

/* Group hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Details marker removal */
details > summary {
  list-style: none;
}

details > summary::-webkit-details-marker {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .article-content :deep(h2) {
    font-size: 1.5rem;
  }
  
  .article-content :deep(h3) {
    font-size: 1.25rem;
  }
}
</style>