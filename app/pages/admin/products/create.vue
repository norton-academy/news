<template>
  <div class="w-full max-w-none animate-fade-in">
    <div class="max-w-7xl mx-auto">
      <!-- Page header -->
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create New Product
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Add a new product to your catalog
          </p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/admin/products"
            class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all"
          >
            Cancel
          </NuxtLink>
          <button
            @click="submitForm"
            class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md text-sm font-medium text-white hover:shadow-lg transition-all"
          >
            Save Product
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content (2/3) -->
        <div class="lg:col-span-2 space-y-6">
          <AdminProductBasicInfo v-model="form.basicInfo" />
          <AdminProductPricingStock v-model="form.pricingStock" />
          <AdminProductAttributes v-model="form.attributes" />
          <AdminProductVariants v-model="form.variants" />
        </div>

        <!-- Sidebar (1/3) -->
        <div class="space-y-6">
          <AdminProductStatusOptions v-model="form.statusOptions" />
          <AdminProductTaxonomy
            v-model="form.taxonomy"
            :categories="availableCategories"
            :brands="availableBrands"
          />
          <AdminProductImages v-model="form.images" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

definePageMeta({
  layout: 'admin'
})

// Available options
const availableCategories = ['Electronics', 'Fashion', 'Home & Living', 'Books', 'Beauty', 'Sports']
const availableBrands = ['Sony', 'Nike', 'Apple', 'Samsung', 'Adobe', 'Penguin', 'L\'Oréal']

// Form data structure
const form = reactive({
  basicInfo: {
    name: '',
    slug: '',
    shortDescription: '',
    content: ''
  },
  pricingStock: {
    sku: '',
    price: null as number | null,
    specialPrice: null as number | null,
    specialPriceFrom: '',
    specialPriceTo: '',
    manageStock: false,
    stockQuantity: 0,
    stockStatus: 'in_stock'
  },
  attributes: [] as { name: string; value: string }[],
  variants: [] as { sku: string; price: number | null; quantity: number; attributes: string }[],
  statusOptions: {
    approved: false,
    status: 'active',
    store: 'main',
    isFeatured: false
  },
  taxonomy: {
    categories: [] as string[],
    brand: '',
    labels: [] as string[],
    tagsInput: ''
  },
  images: [] as { file: File; preview: string }[]
})

// Submit form
const submitForm = () => {
  // Basic validation
  if (!form.basicInfo.name) {
    alert('Product name is required')
    return
  }
  if (!form.pricingStock.sku) {
    alert('SKU is required')
    return
  }
  if (!form.pricingStock.price) {
    alert('Regular price is required')
    return
  }

  // Prepare tags array
  const tags = form.taxonomy.tagsInput.split(',').map(t => t.trim()).filter(t => t)

  const payload = {
    ...form.basicInfo,
    ...form.pricingStock,
    ...form.statusOptions,
    categories: form.taxonomy.categories,
    brand: form.taxonomy.brand,
    labels: form.taxonomy.labels,
    tags,
    attributes: form.attributes.filter(a => a.name && a.value),
    variants: form.variants.filter(v => v.sku && v.price),
    images: form.images.map(img => img.file)
  }

  console.log('Product data to submit:', payload)
  alert('Product saved! (check console for payload)')
}
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
</style>