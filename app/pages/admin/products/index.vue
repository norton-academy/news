<template>
  <div class="w-full max-w-none animate-fade-in">
    <!-- Page Header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Manage Products
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Physical & Digital products • Categories • Brands • Reviews
        </p>
        <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">
          <Clock :size="12" />
          <span>Last updated: {{ lastUpdated }}</span>
        </div>
      </div>
      <NuxtLink
        to="/admin/products/create"
        class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md text-sm font-medium text-white hover:shadow-lg transition-all"
      >
        + New Product
      </NuxtLink>
    </div>

    <!-- Stats Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10"
    >
      <template v-if="loading">
        <div
          v-for="i in 6"
          :key="i"
          class="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 p-5 shadow-sm animate-pulse flex flex-col justify-between min-h-[140px]"
        >
          <div
            class="absolute inset-0 backdrop-blur-[2px] bg-white/30 dark:bg-gray-900/30"
          ></div>
          <div class="relative z-10 flex flex-col gap-3">
            <div class="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-600 shimmer"></div>
            <div class="h-8 w-2/3 rounded bg-gray-300 dark:bg-gray-600 shimmer"></div>
            <div class="h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-600 shimmer"></div>
            <div
              class="h-2 w-full rounded bg-gray-300 dark:bg-gray-600 shimmer mt-2"
            ></div>
          </div>
        </div>
      </template>
      <template v-else>
        <AdminStatCard v-for="stat in enhancedStats" :key="stat.title" v-bind="stat" />
      </template>
    </div>

    <!-- Filters + View Toggle + Bulk Actions -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
      <AdminProductFilters
        v-model:search-query="searchQuery"
        v-model:type-filter="typeFilter"
        v-model:category-filter="categoryFilter"
        v-model:brand-filter="brandFilter"
        :categories="categories"
        :brands="brands"
        @reset="resetFilters"
      />

      <div class="flex items-center gap-4">
        <AdminBulkActions
          :selected-count="selectedProducts.length"
          @set-active="bulkUpdateStatus('active')"
          @set-inactive="bulkUpdateStatus('inactive')"
          @delete="bulkDelete"
        />

        <AdminViewToggle v-model="viewMode" :view-modes="viewModes" />
      </div>
    </div>

    <!-- Product Views -->
    <template v-if="filteredProducts.length">
      <AdminProductGrid
        v-if="viewMode === 'grid'"
        :products="filteredProducts"
        :selected-ids="selectedProducts"
        :open-menu-id="openActionMenuId"
        @toggle-select="toggleSelection"
        @preview="openProductPreview"
        @toggle-menu="toggleActionMenu"
        @view-reviews="viewReviews"
        @update-status="updateProductStatus"
      />

      <AdminProductCard
        v-else-if="viewMode === 'card'"
        :products="filteredProducts"
        :selected-ids="selectedProducts"
        :open-menu-id="openActionMenuId"
        @toggle-select="toggleSelection"
        @preview="openProductPreview"
        @toggle-menu="toggleActionMenu"
        @view-reviews="viewReviews"
        @update-status="updateProductStatus"
      />

      <AdminProductList
        v-else-if="viewMode === 'list'"
        :products="filteredProducts"
        :selected-ids="selectedProducts"
        :open-menu-id="openActionMenuId"
        @toggle-select="toggleSelection"
        @preview="openProductPreview"
        @toggle-menu="toggleActionMenu"
        @view-reviews="viewReviews"
        @update-status="updateProductStatus"
      />

      <AdminProductTable
        v-else-if="viewMode === 'table'"
        :products="filteredProducts"
        :selected-ids="selectedProducts"
        :open-menu-id="openActionMenuId"
        @toggle-select="toggleSelection"
        @toggle-all="toggleAllSelection"
        @toggle-menu="toggleActionMenu"
        @view-reviews="viewReviews"
        @update-status="updateProductStatus"
      />
    </template>

    <!-- Empty State -->
    <div v-else class="text-center py-16 text-gray-400 text-lg">
      No products found matching your filters.
    </div>

    <!-- Reviews Modal -->
    <AdminReviewsModal
      :is-open="showReviewsModal"
      :product="currentProduct"
      :reviews="fakeReviews"
      @close="closeReviewsModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Clock } from 'lucide-vue-next'
import {
  ShoppingBag,
  Package,
  Monitor,
  CheckCircle,
  Star,
  AlertTriangle
} from 'lucide-vue-next'
import { useProducts, type Product } from '~/composables/useProducts'

definePageMeta({
  layout: 'admin'
})

// Use composable for product data
const { products, updateProductStatus: updateStatus, deleteProducts, bulkUpdateStatus: bulkUpdate } = useProducts()

// View modes
const viewMode = ref('grid')
const viewModes = [
  { key: 'grid', label: 'Grid', icon: '▦' },
  { key: 'card', label: 'Card', icon: '□' },
  { key: 'list', label: 'List', icon: '≡' },
  { key: 'table', label: 'Table', icon: '▤' }
]

// Filters
const searchQuery = ref('')
const typeFilter = ref('all')
const categoryFilter = ref('all')
const brandFilter = ref('all')

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Software', 'Books', 'Beauty', 'Sports']
const brands = ['Sony', 'Nike', 'Apple', 'Samsung', 'Adobe', 'Penguin', 'L’Oréal']

// Computed filtered products
const filteredProducts = computed(() => {
  let filtered = products.value
  const q = searchQuery.value.toLowerCase().trim()
  if (q) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.toLowerCase().includes(q))
    )
  }
  if (typeFilter.value !== 'all') filtered = filtered.filter(p => p.type === typeFilter.value)
  if (categoryFilter.value !== 'all') filtered = filtered.filter(p => p.category === categoryFilter.value)
  if (brandFilter.value !== 'all') filtered = filtered.filter(p => p.brand === brandFilter.value)
  return filtered
})

// Selection & Bulk
const selectedProducts = ref<number[]>([])
const toggleSelection = (id: number) => {
  const idx = selectedProducts.value.indexOf(id)
  if (idx === -1) selectedProducts.value.push(id)
  else selectedProducts.value.splice(idx, 1)
}
const toggleAllSelection = () => {
  if (selectedProducts.value.length === filteredProducts.value.length) {
    selectedProducts.value = []
  } else {
    selectedProducts.value = filteredProducts.value.map(p => p.id)
  }
}
const bulkUpdateStatus = (status: string) => {
  bulkUpdate(selectedProducts.value, status)
  selectedProducts.value = []
  updateStats()
}
const bulkDelete = () => {
  deleteProducts(selectedProducts.value)
  selectedProducts.value = []
  updateStats()
}

// Action menu
const openActionMenuId = ref<number | null>(null)
const toggleActionMenu = (id: number) => {
  openActionMenuId.value = openActionMenuId.value === id ? null : id
}
const updateProductStatus = (id: number, status: string) => {
  updateStatus(id, status)
  openActionMenuId.value = null
  updateStats()
}

// Reviews modal
const showReviewsModal = ref(false)
const currentProduct = ref<Product | null>(null)
const fakeReviews = [
  { user: 'Emma Thompson', stars: 5, comment: 'Absolutely love this product! Fast shipping and great quality.', date: '2 days ago' },
  { user: 'Michael Chen', stars: 4, comment: 'Works perfectly. Only minor issue with packaging.', date: '1 week ago' },
  { user: 'Sarah Patel', stars: 5, comment: 'Best digital tool I’ve bought this year. Highly recommended!', date: '3 weeks ago' }
]
const viewReviews = (product: Product) => {
  currentProduct.value = product
  showReviewsModal.value = true
}
const closeReviewsModal = () => {
  showReviewsModal.value = false
  currentProduct.value = null
}

// Preview
const openProductPreview = (product: Product) => {
  alert(`Product: ${product.name}\nPrice: $${product.price}\nCategory: ${product.category}\nBrand: ${product.brand}\nRating: ${product.rating} ★ (${product.reviews} reviews)\nTags: ${product.tags.join(', ')}`)
}

// Reset filters
const resetFilters = () => {
  searchQuery.value = ''
  typeFilter.value = 'all'
  categoryFilter.value = 'all'
  brandFilter.value = 'all'
}

// Stats
const loading = ref(true)
const lastUpdated = ref('')
const enhancedStats = ref<any[]>([])
const animatedStats = ref({
  total: 0,
  physical: 0,
  digital: 0,
  active: 0,
  avgRating: 0,
  lowStock: 0
})

const updateStats = () => {
  const total = products.value.length
  const physical = products.value.filter(p => p.type === 'physical').length
  const digital = products.value.filter(p => p.type === 'digital').length
  const active = products.value.filter(p => p.status === 'active').length
  const avgRating = total ? products.value.reduce((sum, p) => sum + p.rating, 0) / total : 0
  const lowStock = products.value.filter(p => p.type === 'physical' && p.stock && p.stock < 20).length

  animatedStats.value = {
    total,
    physical,
    digital,
    active,
    avgRating: Number(avgRating.toFixed(1)),
    lowStock
  }

  enhancedStats.value = [
    { title: 'Total Products', value: total, unit: '', trend: '+12%', trendColor: 'text-green-200', trendText: 'vs last month', progress: '68%', gradient: 'from-indigo-600 to-indigo-500', icon: ShoppingBag, animatedValue: animatedStats.value.total },
    { title: 'Physical', value: physical, unit: '', trend: '+8%', trendColor: 'text-emerald-200', trendText: 'in stock', progress: '45%', gradient: 'from-emerald-500 to-emerald-600', icon: Package, animatedValue: animatedStats.value.physical },
    { title: 'Digital', value: digital, unit: '', trend: '+15%', trendColor: 'text-violet-200', trendText: 'new licenses', progress: '32%', gradient: 'from-violet-500 to-violet-600', icon: Monitor, animatedValue: animatedStats.value.digital },
    { title: 'Active', value: active, unit: '', trend: '+5%', trendColor: 'text-emerald-200', trendText: 'online', progress: '76%', gradient: 'from-emerald-500 to-emerald-600', icon: CheckCircle, animatedValue: animatedStats.value.active },
    { title: 'Avg. Rating', value: avgRating, unit: '★', trend: '+0.2', trendColor: 'text-amber-200', trendText: 'improved', progress: '82%', gradient: 'from-amber-500 to-amber-600', icon: Star, animatedValue: animatedStats.value.avgRating },
    { title: 'Low Stock', value: lowStock, unit: '', trend: '-3', trendColor: 'text-red-200', trendText: 'needs restock', progress: '23%', gradient: 'from-red-500 to-red-600', icon: AlertTriangle, animatedValue: animatedStats.value.lowStock }
  ]
}

onMounted(() => {
  const now = new Date()
  lastUpdated.value = now.toLocaleTimeString() + ' ' + now.toLocaleDateString()
  setTimeout(() => {
    loading.value = false
    updateStats()
  }, 500)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1s infinite;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
