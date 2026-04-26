<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 shadow-md transition-all duration-300">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3 group">
            <div class="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg shadow-md transition-all duration-300 group-hover:scale-110">
              A
            </div>
            <span class="font-semibold text-gray-800 dark:text-white text-lg tracking-tight">AdminCore</span>
          </div>
          <div class="flex items-center gap-4">
            <button @click="toggleDarkMode" class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
              <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </button>
            <div class="flex items-center gap-2 cursor-pointer group">
              <div class="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm shadow-sm transition-all group-hover:scale-110">
                JD
              </div>
              <span class="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="py-4 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-none">
        <!-- Toolbar -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div class="flex gap-2">
            <button @click="undo" :disabled="!canUndo" class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm disabled:opacity-50">↩ Undo</button>
            <button @click="redo" :disabled="!canRedo" class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm disabled:opacity-50">↪ Redo</button>
            <button @click="savePage" class="px-3 py-1.5 bg-indigo-600 text-white rounded-xl shadow-sm text-sm">Save</button>
            <button @click="previewMode = !previewMode" class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm">Preview</button>
          </div>
          <div class="flex gap-2">
            <select v-model="devicePreview" class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm">
              <option value="desktop">Desktop</option>
              <option value="tablet">Tablet</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>

        <!-- Main builder area (sidebars + canvas) -->
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Left sidebar: Components library -->
          <div class="lg:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
            <h3 class="font-semibold text-gray-800 dark:text-white mb-3">Add Blocks</h3>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="block in blockTypes" :key="block.type" @click="addBlock(block.type)" class="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition text-center">
                <div class="text-2xl mb-1">{{ block.icon }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-300">{{ block.label }}</div>
              </div>
            </div>
            <hr class="my-4 border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-gray-800 dark:text-white">Page Sections</h3>
              <button @click="reorderSections" class="text-xs text-indigo-600">Reorder</button>
            </div>
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="(section, idx) in sections" :key="section.id" class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-gray-400 cursor-move" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" /></svg>
                  <span class="text-sm">{{ section.type }}</span>
                </div>
                <div class="flex gap-1">
                  <button @click="selectSection(section)" class="text-indigo-600 text-xs">Edit</button>
                  <button @click="deleteSection(section.id)" class="text-red-600 text-xs">Del</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Center Canvas -->
          <div class="flex-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-all" :style="canvasStyle">
              <div v-if="previewMode" class="p-4 text-center text-gray-500 border-b">Preview Mode – Click edit to modify</div>
              <div class="p-4 space-y-6">
                <div v-for="(section, idx) in sections" :key="section.id" :class="['relative group rounded-lg transition-all', { 'ring-2 ring-indigo-500': selectedSection?.id === section.id }]" @click="selectSection(section)">
                  <!-- Render block based on type -->
                  <div v-if="section.type === 'hero'" class="py-12 px-4 text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl">
                    <h1 :contenteditable="!previewMode" @blur="updateText(section.id, 'title', $event.target.innerText)" class="text-4xl font-bold text-gray-900 dark:text-white" v-html="section.content.title"></h1>
                    <p :contenteditable="!previewMode" @blur="updateText(section.id, 'subtitle', $event.target.innerText)" class="mt-2 text-gray-600 dark:text-gray-300" v-html="section.content.subtitle"></p>
                    <button class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">Get Started</button>
                  </div>
                  <div v-else-if="section.type === 'text'" class="py-6 px-4">
                    <div :contenteditable="!previewMode" @blur="updateText(section.id, 'html', $event.target.innerHTML)" class="prose dark:prose-invert max-w-none" v-html="section.content.html"></div>
                  </div>
                  <div v-else-if="section.type === 'image'" class="py-4 flex justify-center">
                    <div class="relative">
                      <img :src="section.content.src" class="max-w-full rounded-lg shadow-md" style="max-height: 300px;">
                      <button v-if="!previewMode" @click="changeImage(section.id)" class="absolute top-2 right-2 bg-white rounded-full p-1 shadow">🖼️</button>
                    </div>
                  </div>
                  <div v-else-if="section.type === 'features'" class="py-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div v-for="(feature, fIdx) in section.content.features" :key="fIdx" class="text-center">
                        <div class="text-3xl">{{ feature.icon }}</div>
                        <h3 :contenteditable="!previewMode" @blur="updateFeature(section.id, fIdx, 'title', $event.target.innerText)" class="font-bold mt-2" v-html="feature.title"></h3>
                        <p :contenteditable="!previewMode" @blur="updateFeature(section.id, fIdx, 'desc', $event.target.innerText)" class="text-sm text-gray-600" v-html="feature.desc"></p>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="section.type === 'button'" class="py-4 flex justify-center">
                    <button :contenteditable="!previewMode" @blur="updateText(section.id, 'label', $event.target.innerText)" class="px-6 py-2 bg-indigo-600 text-white rounded-lg" v-html="section.content.label"></button>
                  </div>
                  <div v-else-if="section.type === 'footer'" class="py-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500">
                    <div :contenteditable="!previewMode" @blur="updateText(section.id, 'copyright', $event.target.innerText)" v-html="section.content.copyright"></div>
                  </div>
                  <!-- Delete button on hover (preview off) -->
                  <button v-if="!previewMode" @click.stop="deleteSection(section.id)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">✕</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right sidebar: Properties editor -->
          <div v-if="selectedSection && !previewMode" class="lg:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-semibold text-gray-800 dark:text-white">Properties</h3>
              <button @click="selectedSection = null" class="text-gray-400">✕</button>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Background Color</label>
                <input type="color" v-model="selectedSection.style.backgroundColor" class="w-full h-8 rounded">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Padding (px)</label>
                <input type="number" v-model="selectedSection.style.padding" class="w-full px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded">
              </div>
              <button @click="applyStyles" class="w-full py-1 bg-indigo-600 text-white rounded text-sm">Apply</button>
            </div>
          </div>
        </div>

        <!-- Toast notification -->
        <div v-if="toast" class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {{ toast }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Dark mode
const isDark = ref(false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

// State
const sections = ref([])
const selectedSection = ref(null)
const previewMode = ref(false)
const devicePreview = ref('desktop')
const toast = ref('')

// Undo/Redo
const history = ref([])
const historyIndex = ref(-1)
const canUndo = computed(() => historyIndex.value > 0)
const canRedo = computed(() => historyIndex.value < history.value.length - 1)

const saveToHistory = (newSections) => {
  const newHistory = history.value.slice(0, historyIndex.value + 1)
  newHistory.push(JSON.parse(JSON.stringify(newSections)))
  history.value = newHistory
  historyIndex.value = newHistory.length - 1
}

const undo = () => {
  if (canUndo.value) {
    historyIndex.value--
    sections.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
  }
}
const redo = () => {
  if (canRedo.value) {
    historyIndex.value++
    sections.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
  }
}

// Block library
const blockTypes = [
  { type: 'hero', label: 'Hero', icon: '🌟' },
  { type: 'text', label: 'Text', icon: '📝' },
  { type: 'image', label: 'Image', icon: '🖼️' },
  { type: 'features', label: 'Features', icon: '✨' },
  { type: 'button', label: 'Button', icon: '🔘' },
  { type: 'footer', label: 'Footer', icon: '📌' }
]

// Add block
const addBlock = (type) => {
  let newBlock = { id: Date.now(), type, content: {}, style: { backgroundColor: '#ffffff', padding: 16 } }
  switch (type) {
    case 'hero':
      newBlock.content = { title: 'Welcome to Our Platform', subtitle: 'Build amazing pages quickly' }
      break
    case 'text':
      newBlock.content = { html: '<p>Edit this text. Click to change.</p>' }
      break
    case 'image':
      newBlock.content = { src: 'https://picsum.photos/id/1015/400/200' }
      break
    case 'features':
      newBlock.content = { features: [{ icon: '🚀', title: 'Fast', desc: 'Lightning fast performance' }, { icon: '🎨', title: 'Customizable', desc: 'Tailor to your brand' }, { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' }] }
      break
    case 'button':
      newBlock.content = { label: 'Click Me' }
      break
    case 'footer':
      newBlock.content = { copyright: '© 2025 Your Company. All rights reserved.' }
      break
  }
  sections.value.push(newBlock)
  saveToHistory(sections.value)
  showToast(`Added ${type} block`)
}

const deleteSection = (id) => {
  sections.value = sections.value.filter(s => s.id !== id)
  if (selectedSection.value?.id === id) selectedSection.value = null
  saveToHistory(sections.value)
  showToast('Section deleted')
}

const selectSection = (section) => {
  if (!previewMode.value) selectedSection.value = section
}

// Update content helpers
const updateText = (id, field, value) => {
  const section = sections.value.find(s => s.id === id)
  if (section) {
    section.content[field] = value
    saveToHistory(sections.value)
  }
}
const updateFeature = (id, idx, field, value) => {
  const section = sections.value.find(s => s.id === id)
  if (section && section.content.features) {
    section.content.features[idx][field] = value
    saveToHistory(sections.value)
  }
}
const changeImage = (id) => {
  const newUrl = prompt('Enter image URL:', 'https://picsum.photos/400/200')
  if (newUrl) {
    const section = sections.value.find(s => s.id === id)
    if (section) section.content.src = newUrl
    saveToHistory(sections.value)
  }
}
const applyStyles = () => {
  if (selectedSection.value) {
    const idx = sections.value.findIndex(s => s.id === selectedSection.value.id)
    if (idx !== -1) sections.value[idx].style = { ...selectedSection.value.style }
    saveToHistory(sections.value)
    showToast('Styles applied')
  }
}
const savePage = () => {
  localStorage.setItem('pageBuilderData', JSON.stringify(sections.value))
  showToast('Page saved!')
}
const showToast = (msg) => {
  toast.value = msg
  setTimeout(() => toast.value = '', 2000)
}

// Reorder sections (simple alert)
const reorderSections = () => {
  alert('Drag & drop reordering will be available in full version.\nFor now, delete and re-add blocks to reorder.')
}

// Canvas preview width
const canvasStyle = computed(() => {
  let width = '100%'
  if (devicePreview.value === 'tablet') width = '768px'
  if (devicePreview.value === 'mobile') width = '375px'
  return { maxWidth: width, margin: '0 auto', transition: 'all 0.3s' }
})

// Load demo data
onMounted(() => {
  const saved = localStorage.getItem('pageBuilderData')
  if (saved) {
    sections.value = JSON.parse(saved)
  } else {
    // Default demo page
    sections.value = [
      { id: 1001, type: 'hero', content: { title: 'Page Builder Demo', subtitle: 'Create beautiful pages without code' }, style: { backgroundColor: '#f8fafc', padding: 32 } },
      { id: 1002, type: 'features', content: { features: [{ icon: '⚡', title: 'Fast', desc: 'Optimized performance' }, { icon: '🎨', title: 'Flexible', desc: 'Endless possibilities' }, { icon: '📱', title: 'Responsive', desc: 'Looks great on all devices' }] }, style: { backgroundColor: '#ffffff', padding: 24 } },
      { id: 1003, type: 'footer', content: { copyright: '© 2025 Page Builder Pro' }, style: { backgroundColor: '#1e293b', padding: 40 } }
    ]
  }
  saveToHistory(sections.value)
})
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
[contenteditable="true"] {
  outline: none;
  border: 1px dashed #cbd5e1;
  padding: 4px;
  min-width: 50px;
  background-color: rgba(99, 102, 241, 0.05);
}
[contenteditable="true"]:focus {
  border-color: #6366f1;
  background-color: rgba(99, 102, 241, 0.1);
}
</style>