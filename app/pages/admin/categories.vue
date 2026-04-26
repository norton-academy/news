<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Header (consistent) -->
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 shadow-md transition-all duration-300">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3 group">
            <div class="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg shadow-md transition-all duration-300 group-hover:scale-110">
              A
            </div>
            <span class="font-semibold text-gray-800 dark:text-white text-lg tracking-tight">AdminCore</span>
          </div>
          <div class="hidden md:block flex-1 max-w-md mx-8">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search..." class="w-full bg-gray-50 dark:bg-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm dark:text-white">
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button @click="toggleDarkMode" class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110">
              <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <div class="flex items-center gap-2 cursor-pointer group">
              <div class="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm shadow-sm transition-all duration-200 group-hover:scale-110">
                JD
              </div>
              <span class="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div class="max-w-[1600px] mx-auto">
        <!-- Page title -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Categories</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your product category hierarchy</p>
        </div>

        <!-- Master-Detail Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- LEFT PANEL: Category Explorer -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden sticky top-24">
              <!-- Toolbar -->
              <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between gap-2 mb-3">
                  <div class="relative flex-1">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" v-model="treeSearch" placeholder="Search categories..." class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                  </div>
                  <div class="flex gap-1">
                    <button @click="expandAll" class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg transition" title="Expand all">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </button>
                    <button @click="collapseAll" class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg transition" title="Collapse all">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" /></svg>
                    </button>
                  </div>
                </div>
                <button @click="createNewCategory" class="w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition">
                  + Add New Category
                </button>
              </div>

              <!-- Bulk actions bar -->
              <div v-if="selectedCategories.length" class="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 border-b border-indigo-100 dark:border-indigo-800/50 flex items-center justify-between">
                <span class="text-sm text-indigo-700 dark:text-indigo-300">{{ selectedCategories.length }} selected</span>
                <div class="flex gap-2">
                  <button @click="bulkDelete" class="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  <button @click="selectedCategories = []" class="text-gray-500 text-sm">Clear</button>
                </div>
              </div>

              <!-- Category Tree -->
              <div class="p-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                <div v-if="filteredTree.length === 0" class="text-center py-8 text-gray-500">
                  No categories found
                </div>
                <CategoryTreeNode
                    v-for="node in filteredTree"
                    :key="node.id"
                    :node="node"
                    :expanded-nodes="expandedNodes"
                    :selected-categories="selectedCategories"
                    :current-edit-id="currentEditId"
                    @toggle-expand="toggleExpand"
                    @select-category="selectCategoryForEdit"
                    @toggle-select="toggleSelectCategory"
                    @add-child="addChildCategory"
                    @edit="editCategory"
                    @delete="confirmDeleteCategory"
                />
              </div>
            </div>
          </div>

          <!-- RIGHT PANEL: Context Editor -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden sticky top-24">
              <!-- Mode breadcrumb & title -->
              <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div class="text-xs text-gray-500 mb-1">
                      <span v-if="currentEditCategory" class="flex items-center gap-1">
                        <NuxtLink to="/admin/categories" class="hover:text-indigo-600">Categories</NuxtLink>
                        <span>/</span>
                        <span class="text-gray-700 dark:text-gray-300">{{ getBreadcrumb(currentEditCategory.id) }}</span>
                      </span>
                      <span v-else>Create new category</span>
                    </div>
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
                      {{ currentEditCategory ? `Editing: ${currentEditCategory.name}` : 'New Category' }}
                    </h2>
                  </div>
                  <div class="flex gap-2">
                    <button @click="saveCategory" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition">
                      Save
                    </button>
                    <button @click="resetForm" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium hover:shadow transition">
                      Cancel
                    </button>
                    <button v-if="currentEditCategory" @click="confirmDeleteCategory(currentEditCategory)" class="px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-700 dark:text-red-400 text-sm font-medium hover:shadow transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <!-- Form Sections -->
              <div class="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <!-- Basic Info -->
                <div class="space-y-4">
                  <h3 class="text-md font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Basic Info
                  </h3>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                    <input v-model="form.name" @input="onNameChange" type="text" class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" :class="{ 'border-red-500': errors.name }">
                    <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
                    <input v-model="form.slug" @input="slugManuallyEdited = true" type="text" class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" :class="{ 'border-red-500': errors.slug }">
                    <p v-if="errors.slug" class="text-xs text-red-500 mt-1">{{ errors.slug }}</p>
                    <p class="text-xs text-gray-400 mt-1">Leave empty to auto-generate from name</p>
                  </div>
                </div>

                <!-- Media -->
                <div class="space-y-4">
                  <h3 class="text-md font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Media
                  </h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji or URL)</label>
                      <input v-model="form.icon" type="text" placeholder="📁" class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
                      <input type="file" @change="handleImageUpload" accept="image/*" class="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700">
                      <div v-if="form.imagePreview" class="mt-2">
                        <img :src="form.imagePreview" class="h-12 w-12 object-cover rounded-lg">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Settings -->
                <div class="space-y-4">
                  <h3 class="text-md font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                    Settings
                  </h3>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                    <select v-model="form.parentId" class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option value="">None (Top level)</option>
                      <option v-for="cat in flatCategoriesForSelect" :key="cat.id" :value="cat.id" :disabled="cat.id === currentEditCategory?.id">
                        {{ '—'.repeat(cat.depth) }} {{ cat.name }}
                      </option>
                    </select>
                  </div>
                  <div class="flex items-center gap-3">
                    <label class="flex items-center gap-2">
                      <input type="checkbox" v-model="form.isActive" class="accent-indigo-600"> Active
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" v-model="form.isFeatured" class="accent-indigo-600"> Featured
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete confirmation modal -->
    <div v-if="deleteConfirm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="deleteConfirm = null">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Delete Category</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Are you sure you want to delete "{{ deleteConfirm.name }}" and all its subcategories? This action cannot be undone.</p>
        <div class="flex gap-3">
          <button @click="deleteConfirm = null" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700">Cancel</button>
          <button @click="performDelete" class="flex-1 py-2 rounded-xl bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Dark mode
const isDark = ref(false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

// Mock categories data (with more fields)
const categories = ref([
  { id: 1, name: 'Electronics', slug: 'electronics', parentId: null, isActive: true, isFeatured: true, icon: '📱', image: null, productCount: 128, lastUpdated: '2025-03-25', children: [] },
  { id: 2, name: 'Women Fashion', slug: 'women-fashion', parentId: null, isActive: true, isFeatured: false, icon: '👗', image: null, productCount: 64, lastUpdated: '2025-03-24', children: [] },
  { id: 3, name: 'Men Fashion', slug: 'men-fashion', parentId: null, isActive: true, isFeatured: false, icon: '👔', image: null, productCount: 42, lastUpdated: '2025-03-23', children: [] },
  { id: 4, name: 'Shoes', slug: 'shoes', parentId: null, isActive: true, isFeatured: true, icon: '👟', image: null, productCount: 89, lastUpdated: '2025-03-22', children: [] },
  { id: 5, name: 'Computers', slug: 'computers', parentId: 1, isActive: true, isFeatured: true, icon: '💻', image: null, productCount: 45, lastUpdated: '2025-03-21', children: [] },
  { id: 6, name: 'Desktop', slug: 'desktop', parentId: 5, isActive: true, isFeatured: false, icon: '🖥️', image: null, productCount: 12, lastUpdated: '2025-03-20', children: [] },
  { id: 7, name: 'Laptop', slug: 'laptop', parentId: 5, isActive: true, isFeatured: true, icon: '💻', image: null, productCount: 28, lastUpdated: '2025-03-19', children: [] },
  { id: 8, name: 'Phone', slug: 'phone', parentId: 1, isActive: true, isFeatured: true, icon: '📱', image: null, productCount: 56, lastUpdated: '2025-03-18', children: [] },
  { id: 9, name: 'Phone Case', slug: 'phone-case', parentId: 8, isActive: true, isFeatured: false, icon: '📱', image: null, productCount: 23, lastUpdated: '2025-03-17', children: [] },
])

// Build tree helper
const buildTree = (items) => {
  const map = {}
  const roots = []
  items.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })
  items.forEach(item => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item.id])
    } else {
      roots.push(map[item.id])
    }
  })
  return roots
}

const tree = computed(() => buildTree(categories.value))

// Tree expand/collapse state
const expandedNodes = ref(new Set())
const expandAll = () => {
  const allIds = []
  const collect = (nodes) => {
    nodes.forEach(node => {
      allIds.push(node.id)
      collect(node.children)
    })
  }
  collect(tree.value)
  expandedNodes.value = new Set(allIds)
}
const collapseAll = () => { expandedNodes.value.clear() }
const toggleExpand = (id) => {
  if (expandedNodes.value.has(id)) expandedNodes.value.delete(id)
  else expandedNodes.value.add(id)
}

// Search filtering
const treeSearch = ref('')
const filteredTree = computed(() => {
  if (!treeSearch.value.trim()) return tree.value
  const query = treeSearch.value.toLowerCase()
  const filterNode = (node) => {
    const matches = node.name.toLowerCase().includes(query)
    const filteredChildren = node.children.filter(filterNode)
    if (matches || filteredChildren.length) {
      return { ...node, children: filteredChildren }
    }
    return null
  }
  return tree.value.map(filterNode).filter(Boolean)
})

// Selected categories (for bulk actions)
const selectedCategories = ref([])
const toggleSelectCategory = (id) => {
  const index = selectedCategories.value.indexOf(id)
  if (index === -1) selectedCategories.value.push(id)
  else selectedCategories.value.splice(index, 1)
}

// Current editing category
const currentEditId = ref(null)
const currentEditCategory = computed(() => {
  if (currentEditId.value === null) return null
  return categories.value.find(c => c.id === currentEditId.value)
})

// Form state
const form = ref({
  name: '',
  slug: '',
  parentId: '',
  isActive: true,
  isFeatured: false,
  icon: '',
  image: null,
  imagePreview: ''
})
const slugManuallyEdited = ref(false)
const errors = ref({ name: '', slug: '' })

// On name change, auto-generate slug if not manually edited
const onNameChange = () => {
  if (!slugManuallyEdited.value) {
    form.value.slug = generateSlug(form.value.name)
    validateSlug()
  }
  validateName()
}
const generateSlug = (str) => {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Validation
const validateName = () => {
  if (!form.value.name.trim()) errors.value.name = 'Name is required'
  else if (categories.value.some(c => c.name === form.value.name && c.id !== currentEditId.value)) errors.value.name = 'Name already exists'
  else errors.value.name = ''
}
const validateSlug = () => {
  if (!form.value.slug) errors.value.slug = 'Slug is required'
  else if (categories.value.some(c => c.slug === form.value.slug && c.id !== currentEditId.value)) errors.value.slug = 'Slug already exists'
  else errors.value.slug = ''
}
watch(() => form.value.name, validateName)
watch(() => form.value.slug, validateSlug)

// Image upload
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.image = file
    const reader = new FileReader()
    reader.onload = (ev) => { form.value.imagePreview = ev.target.result }
    reader.readAsDataURL(file)
  }
}

// Reset form for new category or load existing
const resetForm = () => {
  if (currentEditId.value === null) {
    form.value = { name: '', slug: '', parentId: '', isActive: true, isFeatured: false, icon: '', image: null, imagePreview: '' }
    slugManuallyEdited.value = false
    errors.value = { name: '', slug: '' }
  } else {
    const cat = currentEditCategory.value
    form.value = {
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId || '',
      isActive: cat.isActive,
      isFeatured: cat.isFeatured,
      icon: cat.icon || '',
      image: null,
      imagePreview: cat.image || ''
    }
    slugManuallyEdited.value = true
  }
}
watch(currentEditId, () => { resetForm() })

const createNewCategory = () => {
  currentEditId.value = null
  resetForm()
}
const selectCategoryForEdit = (id) => {
  currentEditId.value = id
}
const editCategory = (cat) => { currentEditId.value = cat.id }

// Save category (create or update)
const saveCategory = () => {
  validateName()
  validateSlug()
  if (errors.value.name || errors.value.slug) return
  if (currentEditId.value === null) {
    // Create new
    const newId = Math.max(...categories.value.map(c => c.id), 0) + 1
    const newCat = {
      id: newId,
      name: form.value.name,
      slug: form.value.slug,
      parentId: form.value.parentId || null,
      isActive: form.value.isActive,
      isFeatured: form.value.isFeatured,
      icon: form.value.icon,
      image: form.value.imagePreview,
      productCount: 0,
      lastUpdated: new Date().toISOString().slice(0,10),
      children: []
    }
    categories.value.push(newCat)
    // Success feedback (toast or highlight)
    alert('Category created successfully')
  } else {
    // Update existing
    const idx = categories.value.findIndex(c => c.id === currentEditId.value)
    if (idx !== -1) {
      categories.value[idx] = {
        ...categories.value[idx],
        name: form.value.name,
        slug: form.value.slug,
        parentId: form.value.parentId || null,
        isActive: form.value.isActive,
        isFeatured: form.value.isFeatured,
        icon: form.value.icon,
        image: form.value.imagePreview,
        lastUpdated: new Date().toISOString().slice(0,10)
      }
      alert('Category updated')
    }
  }
  // Refresh tree and reset selection
  currentEditId.value = null
  resetForm()
}

// Delete category
const deleteConfirm = ref(null)
const confirmDeleteCategory = (cat) => {
  deleteConfirm.value = cat
}
const performDelete = () => {
  const id = deleteConfirm.value.id
  // Recursively delete category and its children
  const deleteRecursive = (catId) => {
    const children = categories.value.filter(c => c.parentId === catId)
    children.forEach(child => deleteRecursive(child.id))
    const idx = categories.value.findIndex(c => c.id === catId)
    if (idx !== -1) categories.value.splice(idx, 1)
  }
  deleteRecursive(id)
  // If deleted category was being edited, clear edit mode
  if (currentEditId.value === id) currentEditId.value = null
  deleteConfirm.value = null
  // Remove from selected
  selectedCategories.value = selectedCategories.value.filter(sid => sid !== id)
}

// Bulk delete
const bulkDelete = () => {
  if (confirm(`Delete ${selectedCategories.value.length} categories and their subcategories?`)) {
    selectedCategories.value.forEach(id => {
      const deleteRecursive = (catId) => {
        const children = categories.value.filter(c => c.parentId === catId)
        children.forEach(child => deleteRecursive(child.id))
        const idx = categories.value.findIndex(c => c.id === catId)
        if (idx !== -1) categories.value.splice(idx, 1)
      }
      deleteRecursive(id)
      if (currentEditId.value === id) currentEditId.value = null
    })
    selectedCategories.value = []
  }
}

// Add child category (open edit mode with parent preset)
const addChildCategory = (parent) => {
  currentEditId.value = null
  resetForm()
  form.value.parentId = parent.id
}

// Breadcrumb helper
const getBreadcrumb = (id) => {
  const path = []
  let current = categories.value.find(c => c.id === id)
  while (current) {
    path.unshift(current.name)
    current = categories.value.find(c => c.id === current.parentId)
  }
  return path.join(' / ')
}

// Flat list for parent dropdown with depth
const flatCategoriesForSelect = computed(() => {
  const result = []
  const flatten = (nodes, depth = 0) => {
    nodes.forEach(node => {
      result.push({ id: node.id, name: node.name, depth })
      flatten(node.children, depth + 1)
    })
  }
  flatten(tree.value)
  return result
})

// Initialize expanded nodes on mount
onMounted(() => {
  expandAll()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>

<!-- Recursive CategoryTreeNode Component -->
<script>
import { defineComponent, h, ref } from 'vue'

// Helper to check if a node should be visible based on search (implemented in parent filter, so we rely on filteredTree already)
// But for hover actions, we'll define the component.
const CategoryTreeNode = defineComponent({
  name: 'CategoryTreeNode',
  props: {
    node: Object,
    expandedNodes: Set,
    selectedCategories: Array,
    currentEditId: Number,
  },
  emits: ['toggle-expand', 'select-category', 'toggle-select', 'add-child', 'edit', 'delete'],
  setup(props, { emit }) {
    const isExpanded = computed(() => props.expandedNodes.has(props.node.id))
    const isSelected = computed(() => props.selectedCategories.includes(props.node.id))
    const isCurrentEdit = computed(() => props.currentEditId === props.node.id)

    const handleToggle = (e) => {
      e.stopPropagation()
      emit('toggle-expand', props.node.id)
    }
    const handleSelect = (e) => {
      e.stopPropagation()
      emit('select-category', props.node.id)
    }
    const handleCheckboxChange = (e) => {
      emit('toggle-select', props.node.id)
    }
    const handleAddChild = (e) => {
      e.stopPropagation()
      emit('add-child', props.node)
    }
    const handleEdit = (e) => {
      e.stopPropagation()
      emit('edit', props.node)
    }
    const handleDelete = (e) => {
      e.stopPropagation()
      emit('delete', props.node)
    }

    return () => {
      const children = props.node.children || []
      const hasChildren = children.length > 0
      return h('li', { class: 'relative mb-1' }, [
        h('div', {
          class: [
            'flex items-center gap-2 p-1 rounded-lg group transition-colors',
            isCurrentEdit.value ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
          ],
          onClick: handleSelect
        }, [
          hasChildren ? h('button', {
            onClick: handleToggle,
            class: 'p-0.5 text-gray-500 hover:text-gray-700',
          }, isExpanded.value ? '▼' : '▶') : h('span', { class: 'w-5' }),
          h('input', {
            type: 'checkbox',
            class: 'h-4 w-4 accent-indigo-600 rounded',
            checked: isSelected.value,
            onChange: handleCheckboxChange,
            onClick: (e) => e.stopPropagation()
          }),
          h('span', { class: 'text-sm font-medium text-gray-700 dark:text-gray-300' }, props.node.icon ? `${props.node.icon} ` : '', props.node.name),
          h('span', { class: 'text-xs text-gray-400 ml-2' }, `(${props.node.productCount || 0})`),
          h('div', { class: 'ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition' }, [
            h('button', { onClick: handleAddChild, class: 'p-1 text-gray-400 hover:text-indigo-600', title: 'Add child' }, [
              h('svg', { class: 'h-4 w-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6v6m0 0v6m0-6h6m-6 0H6' })
              ])
            ]),
            h('button', { onClick: handleEdit, class: 'p-1 text-gray-400 hover:text-indigo-600', title: 'Edit' }, [
              h('svg', { class: 'h-4 w-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })
              ])
            ]),
            h('button', { onClick: handleDelete, class: 'p-1 text-gray-400 hover:text-red-600', title: 'Delete' }, [
              h('svg', { class: 'h-4 w-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })
              ])
            ])
          ])
        ]),
        hasChildren && isExpanded.value && h('ul', { class: 'ml-6 mt-1 space-y-1' }, children.map(child =>
            h(CategoryTreeNode, {
              key: child.id,
              node: child,
              expandedNodes: props.expandedNodes,
              selectedCategories: props.selectedCategories,
              currentEditId: props.currentEditId,
              onToggleExpand: (id) => emit('toggle-expand', id),
              onSelectCategory: (id) => emit('select-category', id),
              onToggleSelect: (id) => emit('toggle-select', id),
              onAddChild: (node) => emit('add-child', node),
              onEdit: (node) => emit('edit', node),
              onDelete: (node) => emit('delete', node)
            })
        ))
      ])
    }
  }
})

export default {
  components: { CategoryTreeNode },
  // The rest of the component logic is already in <script setup> above
}
</script>