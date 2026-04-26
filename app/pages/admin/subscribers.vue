<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Header (consistent with dashboard) -->
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
              <input type="text" placeholder="Search subscribers..." v-model="searchQuery" class="w-full bg-gray-50 dark:bg-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm dark:text-white">
            </div>
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

    <main class="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div class="w-full max-w-none">
        <!-- Page header -->
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Subscribers</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your email list and send campaigns.</p>
          </div>
          <div class="flex gap-3">
            <button @click="openImportModal" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all">
              Import CSV
            </button>
            <button @click="openCampaignModal" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md text-sm font-medium text-white hover:shadow-lg transition-all">
              + Create Campaign
            </button>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Total Subscribers</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalSubscribers }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">New (This Month)</p>
                <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ newThisMonth }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7M5 14l7 7 7-7" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Open Rate</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ avgOpenRate }}%</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Unsubscribe Rate</p>
                <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ unsubscribeRate }}%</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Actions -->
        <div class="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div class="flex flex-wrap gap-4">
            <div class="relative min-w-[200px]">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" v-model="searchQuery" placeholder="Search by email, name..." class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
            <select v-model="statusFilter" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
              <option value="bounced">Bounced</option>
            </select>
            <button @click="resetFilters" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 transition">Reset</button>
          </div>
          <div class="flex gap-2">
            <button @click="exportSubscribers" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm flex items-center gap-2 hover:shadow-md transition">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export CSV
            </button>
            <button @click="openAddSubscriberModal" class="px-4 py-2 bg-indigo-600 rounded-xl shadow-sm text-sm text-white hover:bg-indigo-700 transition">+ Add Subscriber</button>
          </div>
        </div>

        <!-- Subscribers Table -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="sub in filteredSubscribers" :key="sub.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td class="px-4 py-3 text-sm">{{ sub.email }}</td>
                <td class="px-4 py-3 text-sm">{{ sub.name || '—' }}</td>
                <td class="px-4 py-3">
                  <span :class="statusBadgeClass(sub.status)" class="px-2 py-1 text-xs font-semibold rounded-full shadow-sm">{{ sub.status }}</span>
                </td>
                <td class="px-4 py-3 text-sm">{{ sub.subscribedAt }}</td>
                <td class="px-4 py-3 text-sm">{{ sub.source }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex gap-2">
                    <button @click="editSubscriber(sub)" class="text-indigo-600 hover:text-indigo-800 text-sm">Edit</button>
                    <button @click="deleteSubscriber(sub.id)" class="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredSubscribers.length === 0">
                <td colspan="6" class="px-4 py-8 text-center text-gray-500">No subscribers found.</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Add/Edit Subscriber Modal -->
        <div v-if="showSubscriberModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeSubscriberModal">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ editingSubscriber ? 'Edit Subscriber' : 'Add Subscriber' }}</h3>
              <button @click="closeSubscriberModal" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form @submit.prevent="saveSubscriber" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                <input type="email" v-model="subscriberForm.email" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input type="text" v-model="subscriberForm.name" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select v-model="subscriberForm.status" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="active">Active</option>
                  <option value="unsubscribed">Unsubscribed</option>
                  <option value="bounced">Bounced</option>
                </select>
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" @click="closeSubscriberModal" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Cancel</button>
                <button type="submit" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Import CSV Modal -->
        <div v-if="showImportModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeImportModal">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Import Subscribers (CSV)</h3>
              <button @click="closeImportModal" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CSV File</label>
                <input type="file" accept=".csv" @change="handleImportFile" class="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                <p class="text-xs text-gray-500 mt-2">Expected columns: email, name (optional), status (active/unsubscribed/bounced), source (optional)</p>
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" @click="closeImportModal" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Cancel</button>
                <button type="button" @click="processImport" class="flex-1 py-2 rounded-xl bg-indigo-600 text-white">Import</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Create Campaign Modal -->
        <div v-if="showCampaignModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeCampaignModal">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Create Email Campaign</h3>
              <button @click="closeCampaignModal" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form @submit.prevent="sendCampaign" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Campaign Name</label>
                <input type="text" v-model="campaign.name" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Line</label>
                <input type="text" v-model="campaign.subject" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content (HTML / Text)</label>
                <textarea rows="4" v-model="campaign.content" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Send to</label>
                <select v-model="campaign.audience" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="all">All Active Subscribers</option>
                  <option value="new">New this month</option>
                  <option value="custom">Custom segment (coming soon)</option>
                </select>
              </div>
              <div>
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="campaign.scheduleLater" class="rounded">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Schedule for later</span>
                </label>
                <input v-if="campaign.scheduleLater" type="datetime-local" v-model="campaign.scheduledTime" class="mt-2 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" @click="closeCampaignModal" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Cancel</button>
                <button type="submit" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">Send / Schedule</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDark = ref(false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

// Mock subscribers data
const subscribers = ref([
  { id: 1, email: 'john.doe@example.com', name: 'John Doe', status: 'active', subscribedAt: '2025-03-01', source: 'Landing page' },
  { id: 2, email: 'jane.smith@example.com', name: 'Jane Smith', status: 'active', subscribedAt: '2025-03-15', source: 'Checkout' },
  { id: 3, email: 'bob.wilson@example.com', name: 'Bob Wilson', status: 'unsubscribed', subscribedAt: '2025-02-10', source: 'Newsletter' },
  { id: 4, email: 'alice.johnson@example.com', name: 'Alice Johnson', status: 'active', subscribedAt: '2025-03-20', source: 'Webinar' },
  { id: 5, email: 'charlie.brown@example.com', name: 'Charlie Brown', status: 'bounced', subscribedAt: '2025-01-05', source: 'Referral' },
  { id: 6, email: 'diana.prince@example.com', name: 'Diana Prince', status: 'active', subscribedAt: '2025-03-25', source: 'Landing page' },
])

// Stats
const totalSubscribers = computed(() => subscribers.value.filter(s => s.status === 'active').length)
const newThisMonth = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  return subscribers.value.filter(s => {
    const date = new Date(s.subscribedAt)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear && s.status === 'active'
  }).length
})
const avgOpenRate = ref(42.5) // Mock
const unsubscribeRate = computed(() => {
  const total = subscribers.value.length
  const unsub = subscribers.value.filter(s => s.status === 'unsubscribed').length
  return total ? ((unsub / total) * 100).toFixed(1) : 0
})

// Filters
const searchQuery = ref('')
const statusFilter = ref('all')
const filteredSubscribers = computed(() => {
  let filtered = subscribers.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(s => s.email.toLowerCase().includes(q) || (s.name && s.name.toLowerCase().includes(q)))
  }
  if (statusFilter.value !== 'all') filtered = filtered.filter(s => s.status === statusFilter.value)
  return filtered
})
const resetFilters = () => { searchQuery.value = ''; statusFilter.value = 'all' }

// Status badge helper
const statusBadgeClass = (status) => {
  const map = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    unsubscribed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    bounced: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  }
  return map[status]
}

// Subscriber modal (add/edit)
const showSubscriberModal = ref(false)
const editingSubscriber = ref(null)
const subscriberForm = ref({ email: '', name: '', status: 'active' })

const openAddSubscriberModal = () => {
  editingSubscriber.value = null
  subscriberForm.value = { email: '', name: '', status: 'active' }
  showSubscriberModal.value = true
}
const editSubscriber = (sub) => {
  editingSubscriber.value = sub
  subscriberForm.value = { email: sub.email, name: sub.name || '', status: sub.status }
  showSubscriberModal.value = true
}
const closeSubscriberModal = () => { showSubscriberModal.value = false }
const saveSubscriber = () => {
  if (editingSubscriber.value) {
    const index = subscribers.value.findIndex(s => s.id === editingSubscriber.value.id)
    if (index !== -1) {
      subscribers.value[index] = { ...subscribers.value[index], ...subscriberForm.value }
    }
  } else {
    const newId = Math.max(...subscribers.value.map(s => s.id)) + 1
    subscribers.value.push({
      id: newId,
      email: subscriberForm.value.email,
      name: subscriberForm.value.name,
      status: subscriberForm.value.status,
      subscribedAt: new Date().toISOString().slice(0,10),
      source: 'Manual'
    })
  }
  closeSubscriberModal()
}
const deleteSubscriber = (id) => {
  if (confirm('Delete this subscriber?')) {
    subscribers.value = subscribers.value.filter(s => s.id !== id)
  }
}

// Import CSV
const showImportModal = ref(false)
const importFile = ref(null)
const openImportModal = () => { showImportModal.value = true; importFile.value = null }
const closeImportModal = () => { showImportModal.value = false }
const handleImportFile = (e) => { importFile.value = e.target.files[0] }
const processImport = () => {
  if (!importFile.value) return alert('Please select a CSV file')
  // Simulate import (in real app, parse CSV and add subscribers)
  alert('Import simulated: 10 subscribers added.')
  closeImportModal()
}

// Export CSV
const exportSubscribers = () => {
  const headers = ['Email','Name','Status','Subscribed At','Source']
  const rows = filteredSubscribers.value.map(s => [s.email, s.name || '', s.status, s.subscribedAt, s.source])
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `subscribers_${new Date().toISOString().slice(0,10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// Campaign modal
const showCampaignModal = ref(false)
const campaign = ref({ name: '', subject: '', content: '', audience: 'all', scheduleLater: false, scheduledTime: '' })
const openCampaignModal = () => {
  campaign.value = { name: '', subject: '', content: '', audience: 'all', scheduleLater: false, scheduledTime: '' }
  showCampaignModal.value = true
}
const closeCampaignModal = () => { showCampaignModal.value = false }
const sendCampaign = () => {
  alert(`Campaign "${campaign.value.name}" sent to ${campaign.value.audience} subscribers.`)
  closeCampaignModal()
}
</script>

<style>
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