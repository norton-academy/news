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
              <input type="text" placeholder="Search withdrawals..." v-model="searchQuery" class="w-full bg-gray-50 dark:bg-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm dark:text-white">
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
        <!-- Page header with balance and CTA -->
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Withdrawals</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1">Request and manage payouts securely.</p>
          </div>
          <div class="flex gap-3">
            <button @click="openRequestModal" class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md text-sm font-medium text-white hover:shadow-lg transition-all">
              + Request Withdrawal
            </button>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(balance) }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Pending Withdrawals</p>
                <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ formatCurrency(pendingTotal) }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Total Withdrawn (This Month)</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(monthlyWithdrawn) }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M6 6h12M5 14h14M7 18h10" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Last Payout Date</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ lastPayoutDate || '—' }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Search -->
        <div class="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div class="flex flex-wrap gap-4">
            <div class="relative min-w-[200px]">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" v-model="searchQuery" placeholder="Search by ID, account, or method" class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
            <select v-model="statusFilter" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
            <input type="date" v-model="dateFrom" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
            <input type="date" v-model="dateTo" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
            <button @click="resetFilters" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 transition">Reset</button>
          </div>
          <button @click="exportCSV" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm flex items-center gap-2 hover:shadow-md transition">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
          </button>
        </div>

        <!-- Main Table -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="req in filteredRequests" :key="req.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td class="px-4 py-3 whitespace-nowrap text-sm font-mono">#{{ req.id }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{{ req.date }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">{{ formatCurrency(req.amount) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-red-500">{{ formatCurrency(req.fee) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-600">{{ formatCurrency(req.net) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-1">
                    <span v-if="req.method === 'Bank Transfer'" class="text-indigo-600">🏦</span>
                    <span v-else-if="req.method === 'PayPal'" class="text-blue-600">💰</span>
                    <span v-else class="text-gray-600">💳</span>
                    {{ req.method }}
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                    <span :class="statusBadgeClass(req.status)" class="px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
                      {{ req.status }}
                    </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex gap-2">
                    <button @click="openPreview(req)" class="text-indigo-600 hover:text-indigo-800 text-sm">View</button>
                    <!-- Admin actions only for pending requests -->
                    <template v-if="req.status === 'pending'">
                      <button @click="approveRequest(req.id)" class="text-green-600 hover:text-green-800 text-sm">Approve</button>
                      <button @click="rejectRequest(req.id)" class="text-red-600 hover:text-red-800 text-sm">Reject</button>
                    </template>
                    <template v-if="req.status === 'approved'">
                      <button @click="markAsPaid(req.id)" class="text-blue-600 hover:text-blue-800 text-sm">Mark Paid</button>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredRequests.length === 0">
                <td colspan="8" class="px-4 py-8 text-center text-gray-500">No withdrawal requests found.</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Request Withdrawal Modal (Slide-over style) -->
        <div v-if="showRequestModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeRequestModal">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Request Withdrawal</h3>
              <button @click="closeRequestModal" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form @submit.prevent="submitWithdrawalRequest" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (USD)</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input type="number" step="0.01" min="1" v-model="newRequest.amount" required @input="calculateFee" class="w-full pl-8 pr-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <p class="text-xs text-gray-500 mt-1">Min: $10.00 | Max: {{ formatCurrency(balance) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                <select v-model="newRequest.method" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Bank Transfer</option>
                  <option>PayPal</option>
                  <option>Wire Transfer</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Details</label>
                <input type="text" v-model="newRequest.account" placeholder="Account number / email" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-sm">
                <div class="flex justify-between">
                  <span>Requested Amount:</span>
                  <span class="font-medium">{{ formatCurrency(newRequest.amount) }}</span>
                </div>
                <div class="flex justify-between text-red-600">
                  <span>Fee (2.0%):</span>
                  <span>- {{ formatCurrency(calculatedFee) }}</span>
                </div>
                <div class="flex justify-between font-bold mt-1 pt-1 border-t border-gray-300 dark:border-gray-600">
                  <span>Net Payout:</span>
                  <span class="text-green-600">{{ formatCurrency(netPayout) }}</span>
                </div>
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" @click="closeRequestModal" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Cancel</button>
                <button type="submit" :disabled="!isValidRequest" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white disabled:opacity-50">Submit Request</button>
              </div>
            </form>
          </div>
        </div>

        <!-- View Details Modal -->
        <div v-if="selectedRequest" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closePreview">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Withdrawal Details</h3>
              <button @click="closePreview" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between"><span class="text-gray-500">ID:</span><span>#{{ selectedRequest.id }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Date:</span><span>{{ selectedRequest.date }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Amount:</span><span>{{ formatCurrency(selectedRequest.amount) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Fee:</span><span>{{ formatCurrency(selectedRequest.fee) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Net:</span><span class="font-bold">{{ formatCurrency(selectedRequest.net) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Method:</span><span>{{ selectedRequest.method }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Account:</span><span>{{ selectedRequest.account }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Status:</span><span :class="statusBadgeClass(selectedRequest.status)" class="px-2 py-0.5 rounded-full">{{ selectedRequest.status }}</span></div>
            </div>
            <div class="mt-6 flex gap-2">
              <button @click="closePreview" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700">Close</button>
            </div>
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

// Data
const balance = ref(12580.75)
const withdrawals = ref([
  { id: 1001, date: '2025-03-28', amount: 500.00, fee: 10.00, net: 490.00, method: 'Bank Transfer', account: '****1234', status: 'pending' },
  { id: 1002, date: '2025-03-25', amount: 1200.00, fee: 24.00, net: 1176.00, method: 'PayPal', account: 'user@example.com', status: 'approved' },
  { id: 1003, date: '2025-03-20', amount: 300.00, fee: 6.00, net: 294.00, method: 'Wire Transfer', account: '****5678', status: 'paid' },
  { id: 1004, date: '2025-03-18', amount: 75.00, fee: 1.50, net: 73.50, method: 'Bank Transfer', account: '****4321', status: 'rejected' },
  { id: 1005, date: '2025-03-15', amount: 2000.00, fee: 40.00, net: 1960.00, method: 'PayPal', account: 'vendor@example.com', status: 'processing' },
])

// Computed totals
const pendingTotal = computed(() => withdrawals.value.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0))
const monthlyWithdrawn = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  return withdrawals.value.filter(w => {
    const date = new Date(w.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear && w.status === 'paid'
  }).reduce((sum, w) => sum + w.net, 0)
})
const lastPayoutDate = computed(() => {
  const paid = withdrawals.value.filter(w => w.status === 'paid').sort((a,b) => new Date(b.date) - new Date(a.date))
  return paid[0]?.date || null
})

// Filters
const searchQuery = ref('')
const statusFilter = ref('all')
const dateFrom = ref('')
const dateTo = ref('')

const filteredRequests = computed(() => {
  let filtered = withdrawals.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(w => w.id.toString().includes(q) || w.account?.toLowerCase().includes(q) || w.method.toLowerCase().includes(q))
  }
  if (statusFilter.value !== 'all') filtered = filtered.filter(w => w.status === statusFilter.value)
  if (dateFrom.value) filtered = filtered.filter(w => w.date >= dateFrom.value)
  if (dateTo.value) filtered = filtered.filter(w => w.date <= dateTo.value)
  return filtered
})

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  dateFrom.value = ''
  dateTo.value = ''
}

// Status badge helper
const statusBadgeClass = (status) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  }
  return map[status] || map.pending
}

// Actions
const approveRequest = (id) => {
  const req = withdrawals.value.find(w => w.id === id)
  if (req && req.status === 'pending') req.status = 'approved'
}
const rejectRequest = (id) => {
  const req = withdrawals.value.find(w => w.id === id)
  if (req && req.status === 'pending') req.status = 'rejected'
}
const markAsPaid = (id) => {
  const req = withdrawals.value.find(w => w.id === id)
  if (req && req.status === 'approved') req.status = 'paid'
}

// Modal for new request
const showRequestModal = ref(false)
const newRequest = ref({ amount: 0, method: 'Bank Transfer', account: '' })
const calculatedFee = ref(0)
const netPayout = ref(0)

const calculateFee = () => {
  const amount = parseFloat(newRequest.value.amount) || 0
  const fee = amount * 0.02 // 2% fee
  calculatedFee.value = fee < 0.5 ? 0.5 : fee
  netPayout.value = amount - calculatedFee.value
}

const isValidRequest = computed(() => {
  const amount = parseFloat(newRequest.value.amount)
  return amount >= 10 && amount <= balance.value && newRequest.value.account.trim().length > 0
})

const openRequestModal = () => {
  newRequest.value = { amount: 0, method: 'Bank Transfer', account: '' }
  calculateFee()
  showRequestModal.value = true
}
const closeRequestModal = () => { showRequestModal.value = false }

const submitWithdrawalRequest = () => {
  if (!isValidRequest.value) return
  const amount = parseFloat(newRequest.value.amount)
  const fee = calculatedFee.value
  const net = netPayout.value
  const newId = Math.max(...withdrawals.value.map(w => w.id)) + 1
  withdrawals.value.push({
    id: newId,
    date: new Date().toISOString().slice(0,10),
    amount,
    fee,
    net,
    method: newRequest.value.method,
    account: newRequest.value.account,
    status: 'pending'
  })
  // Reduce balance (simulate)
  balance.value -= amount
  closeRequestModal()
}

// Preview modal
const selectedRequest = ref(null)
const openPreview = (req) => { selectedRequest.value = req }
const closePreview = () => { selectedRequest.value = null }

// Export CSV
const exportCSV = () => {
  const headers = ['ID','Date','Amount','Fee','Net','Method','Account','Status']
  const rows = filteredRequests.value.map(w => [w.id, w.date, w.amount, w.fee, w.net, w.method, w.account, w.status])
  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `withdrawals_${new Date().toISOString().slice(0,10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
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