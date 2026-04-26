<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Header with original styling -->
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
              <input type="text" placeholder="Search KYC..." v-model="searchQuery" class="w-full bg-gray-50 dark:bg-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm dark:text-white">
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
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">KYC Management</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1">Verify user identities and approve or reject submissions.</p>
          </div>
          <div class="flex gap-3">
            <button @click="openNewRequestModal" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md text-sm font-medium text-white hover:shadow-lg transition-all">
              + New Request
            </button>
          </div>
        </div>

        <!-- Summary stats cards (original style) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Total Submissions</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalSubmissions }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ pendingCount }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ approvedCount }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ rejectedCount }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and view toggle -->
        <div class="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div class="flex flex-wrap gap-4">
            <div class="relative min-w-[200px]">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" v-model="searchQuery" placeholder="Search by name, email, or ID" class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
            <select v-model="statusFilter" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select v-model="typeFilter" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
            <button @click="resetFilters" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 transition">Reset</button>
          </div>
          <!-- View toggle buttons (original style) -->
          <div class="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
            <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'" class="p-2 rounded-lg transition-all">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button @click="viewMode = 'card'" :class="viewMode === 'card' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'" class="p-2 rounded-lg transition-all">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
            <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'" class="p-2 rounded-lg transition-all">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <button @click="viewMode = 'table'" :class="viewMode === 'table' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'" class="p-2 rounded-lg transition-all">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
          </div>
        </div>

        <!-- Bulk Action Bar (only in table view) -->
        <div v-if="viewMode === 'table' && selectedRequestsIds.length > 0" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 flex items-center gap-4 animate-slide-up">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ selectedRequestsIds.length }} selected</span>
          <div class="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div class="relative">
            <button @click="toggleBulkDropdown" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl text-sm font-medium transition shadow-md">
              Bulk Actions
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-if="showBulkDropdown" class="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[140px] z-50 animate-fade-in-fast">
              <button @click="bulkUpdateStatus('approved')" class="w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Approve
              </button>
              <button @click="bulkUpdateStatus('rejected')" class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> Reject
              </button>
              <button @click="bulkUpdateStatus('pending')" class="w-full text-left px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Set Pending
              </button>
            </div>
          </div>
          <button @click="clearSelection" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- ==================== GRID VIEW (original style) ==================== -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="request in filteredRequests" :key="request.id" class="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-700 font-bold text-lg">
                  {{ request.initials }}
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white">{{ request.name }}</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ request.email }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span :class="statusClass(request.status)" class="px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
                  {{ request.status }}
                </span>
                <!-- Dropdown Actions -->
                <div class="relative">
                  <button @click="toggleDropdown(request.id)" class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>
                  <div v-if="activeDropdownId === request.id" class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30 animate-fade-in-fast">
                    <button @click="updateRequestStatus(request.id, 'approved'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Approve
                    </button>
                    <button @click="updateRequestStatus(request.id, 'rejected'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> Reject
                    </button>
                    <button @click="updateRequestStatus(request.id, 'pending'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Set Pending
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 space-y-2 text-sm">
              <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M6 6h12M5 14h14M7 18h10" /></svg>
                <span>{{ request.type }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>Submitted: {{ request.date }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span>{{ request.documentType }}</span>
              </div>
            </div>
            <div class="mt-4">
              <button @click="openPreview(request)" class="w-full py-2 text-center text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition shadow-sm">
                Preview Documents
              </button>
            </div>
          </div>
        </div>

        <!-- ==================== CARD VIEW (compact, original style) ==================== -->
        <div v-if="viewMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div v-for="request in filteredRequests" :key="request.id" class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-700 font-bold text-sm">
                {{ request.initials }}
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 dark:text-white text-sm">{{ request.name }}</h3>
                <p class="text-xs text-gray-500 truncate">{{ request.email }}</p>
              </div>
              <div class="relative">
                <button @click="toggleDropdown(request.id)" class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
                <div v-if="activeDropdownId === request.id" class="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30">
                  <button @click="updateRequestStatus(request.id, 'approved'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-green-600 hover:bg-gray-50">Approve</button>
                  <button @click="updateRequestStatus(request.id, 'rejected'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-gray-50">Reject</button>
                  <button @click="updateRequestStatus(request.id, 'pending'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-yellow-600 hover:bg-gray-50">Set Pending</button>
                </div>
              </div>
            </div>
            <div class="mt-3 flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ request.type }}</span>
              <span :class="statusClass(request.status)" class="px-2 py-0.5 text-xs rounded-full">{{ request.status }}</span>
            </div>
            <div class="mt-3 text-xs text-gray-400">{{ request.date }}</div>
            <button @click="openPreview(request)" class="mt-3 w-full py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 hover:bg-gray-200 transition">Preview</button>
          </div>
        </div>

        <!-- ==================== LIST VIEW (horizontal details, original style) ==================== -->
        <div v-if="viewMode === 'list'" class="space-y-3">
          <div v-for="request in filteredRequests" :key="request.id" class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-wrap items-center justify-between gap-3 transition-all hover:shadow-lg">
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-700 font-bold">
                {{ request.initials }}
              </div>
              <div>
                <p class="font-medium text-gray-800 dark:text-white">{{ request.name }}</p>
                <p class="text-xs text-gray-500">{{ request.email }} • {{ request.type }} • {{ request.documentType }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span :class="statusClass(request.status)" class="px-2 py-1 text-xs rounded-full">{{ request.status }}</span>
              <button @click="openPreview(request)" class="px-3 py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 hover:bg-gray-200 transition">Preview</button>
              <div class="relative">
                <button @click="toggleDropdown(request.id)" class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
                <div v-if="activeDropdownId === request.id" class="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30">
                  <button @click="updateRequestStatus(request.id, 'approved'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-green-600 hover:bg-gray-50">Approve</button>
                  <button @click="updateRequestStatus(request.id, 'rejected'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-50">Reject</button>
                  <button @click="updateRequestStatus(request.id, 'pending'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-yellow-600 hover:bg-gray-50">Set Pending</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== TABLE VIEW (full data grid with bulk selection) ==================== -->
        <div v-if="viewMode === 'table'" class="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md">
          <table class="min-w-full">
            <thead class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="px-4 py-3 text-left">
                <input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="request in filteredRequests" :key="request.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <td class="px-4 py-3 whitespace-nowrap">
                <input type="checkbox" v-model="selectedRequestsIds" :value="request.id" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {{ request.initials }}
                  </div>
                  <span class="font-medium text-gray-800 dark:text-white">{{ request.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ request.email }}</td>
              <td class="px-4 py-3 text-sm">{{ request.type }}</td>
              <td class="px-4 py-3 text-sm">{{ request.documentType }}</td>
              <td class="px-4 py-3 text-sm">{{ request.date }}</td>
              <td class="px-4 py-3">
                <span :class="statusClass(request.status)" class="px-2 py-1 text-xs rounded-full">{{ request.status }}</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex gap-2 items-center">
                  <button @click="openPreview(request)" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Preview</button>
                  <div class="relative">
                    <button @click="toggleDropdown(request.id)" class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                    <div v-if="activeDropdownId === request.id" class="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30">
                      <button @click="updateRequestStatus(request.id, 'approved'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-green-600 hover:bg-gray-50">Approve</button>
                      <button @click="updateRequestStatus(request.id, 'rejected'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-50">Reject</button>
                      <button @click="updateRequestStatus(request.id, 'pending'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-yellow-600 hover:bg-gray-50">Set Pending</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Transaction Log Section (new) -->
        <div class="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              <h3 class="font-semibold text-gray-800 dark:text-white">Transaction History</h3>
            </div>
            <span class="text-xs text-gray-500">{{ transactions.length }} entries</span>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div v-if="transactions.length === 0" class="px-6 py-8 text-center text-gray-400 text-sm">
              No transactions yet. Approve, reject, or create requests to see activity.
            </div>
            <div v-for="tx in reversedTransactions" :key="tx.id" class="px-6 py-3 border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition flex items-center gap-3">
              <div :class="{
                'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300': tx.action === 'approved',
                'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300': tx.action === 'rejected',
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300': tx.action === 'pending',
                'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300': tx.action === 'created'
              }" class="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold">
                <svg v-if="tx.action === 'approved'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <svg v-else-if="tx.action === 'rejected'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                <svg v-else-if="tx.action === 'pending'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  <span class="font-medium">{{ tx.admin }}</span> {{ tx.message }}
                </p>
                <p class="text-xs text-gray-400">{{ tx.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- New Request Modal (original style) -->
        <div v-if="showNewRequestModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeNewRequestModal">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">New KYC Request</h3>
              <button @click="closeNewRequestModal" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form @submit.prevent="submitNewRequest" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input type="text" v-model="newRequest.name" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" v-model="newRequest.email" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select v-model="newRequest.type" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="Individual">Individual</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Type</label>
                <select v-model="newRequest.documentType" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Passport</option>
                  <option>Driver License</option>
                  <option>ID Card</option>
                  <option>Business License</option>
                  <option>Tax ID</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Document (simulated)</label>
                <input type="file" accept="image/*,.pdf" class="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" @click="closeNewRequestModal" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Cancel</button>
                <button type="submit" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">Submit Request</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Preview Modal (original style) -->
        <div v-if="selectedRequest" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closePreview">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Document Preview</h3>
              <button @click="closePreview" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div class="space-y-3">
              <p><span class="font-medium">Name:</span> {{ selectedRequest.name }}</p>
              <p><span class="font-medium">Document Type:</span> {{ selectedRequest.documentType }}</p>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
                <svg class="h-16 w-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p class="text-sm text-gray-500 mt-2">Document preview area (simulated)</p>
              </div>
            </div>
            <div class="mt-6 flex gap-2">
              <button @click="closePreview" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Close</button>
              <button class="flex-1 py-2 rounded-xl bg-indigo-600 text-white">Download</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Dark mode
const isDark = ref(false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

// View mode
const viewMode = ref('grid')

// Filters
const searchQuery = ref('')
const statusFilter = ref('all')
const typeFilter = ref('all')

// KYC data
const kycRequests = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', initials: 'AJ', type: 'Individual', documentType: 'Passport', date: '2025-03-25', status: 'pending' },
  { id: 2, name: 'Robert Chen', email: 'robert@example.com', initials: 'RC', type: 'Business', documentType: 'Business License', date: '2025-03-24', status: 'pending' },
  { id: 3, name: 'Maria Garcia', email: 'maria@example.com', initials: 'MG', type: 'Individual', documentType: 'Driver License', date: '2025-03-23', status: 'approved' },
  { id: 4, name: 'James Smith', email: 'james@example.com', initials: 'JS', type: 'Individual', documentType: 'Passport', date: '2025-03-22', status: 'pending' },
  { id: 5, name: 'Linda Brown', email: 'linda@example.com', initials: 'LB', type: 'Business', documentType: 'Tax ID', date: '2025-03-21', status: 'rejected' },
  { id: 6, name: 'David Wilson', email: 'david@example.com', initials: 'DW', type: 'Individual', documentType: 'ID Card', date: '2025-03-20', status: 'pending' },
  { id: 7, name: 'Sarah Lee', email: 'sarah@example.com', initials: 'SL', type: 'Individual', documentType: 'Passport', date: '2025-03-19', status: 'approved' },
])

// Transaction Log
const transactions = ref([])
let nextTxId = 1

const addTransaction = (action, requestName, details = '') => {
  const actionMap = {
    approved: { action: 'approved', message: `approved ${requestName}'s request` },
    rejected: { action: 'rejected', message: `rejected ${requestName}'s request` },
    pending: { action: 'pending', message: `marked ${requestName}'s request as pending` },
    created: { action: 'created', message: `created a new KYC request for ${requestName}` }
  }
  const entry = actionMap[action] || { action: 'updated', message: `updated ${requestName}'s request` }
  transactions.value.unshift({
    id: nextTxId++,
    admin: 'John Doe',
    action: entry.action,
    message: entry.message + (details ? ` (${details})` : ''),
    timestamp: new Date().toLocaleString()
  })
}

// Update single request status with transaction
const updateRequestStatus = (id, newStatus) => {
  const request = kycRequests.value.find(r => r.id === id)
  if (request && request.status !== newStatus) {
    const oldStatus = request.status
    request.status = newStatus
    addTransaction(newStatus, request.name, `changed from ${oldStatus} to ${newStatus}`)
  }
}

// Bulk selection (table view)
const selectedRequestsIds = ref([])
const showBulkDropdown = ref(false)

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedRequestsIds.value = filteredRequests.value.map(r => r.id)
  } else {
    selectedRequestsIds.value = []
  }
}

const isAllSelected = computed(() => {
  return filteredRequests.value.length > 0 && selectedRequestsIds.value.length === filteredRequests.value.length
})

const clearSelection = () => {
  selectedRequestsIds.value = []
  showBulkDropdown.value = false
}

const toggleBulkDropdown = () => {
  showBulkDropdown.value = !showBulkDropdown.value
}

const bulkUpdateStatus = (newStatus) => {
  const selectedRequests = kycRequests.value.filter(r => selectedRequestsIds.value.includes(r.id))
  selectedRequests.forEach(req => {
    if (req.status !== newStatus) {
      const oldStatus = req.status
      req.status = newStatus
      addTransaction(newStatus, req.name, `bulk: ${oldStatus} → ${newStatus}`)
    }
  })
  clearSelection()
}

// Dropdown management
const activeDropdownId = ref(null)

const toggleDropdown = (id) => {
  activeDropdownId.value = activeDropdownId.value === id ? null : id
}

const closeDropdown = () => {
  activeDropdownId.value = null
}

// Click outside to close dropdown
const handleClickOutside = (event) => {
  if (activeDropdownId.value && !event.target.closest('.relative')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Stats
const totalSubmissions = computed(() => kycRequests.value.length)
const pendingCount = computed(() => kycRequests.value.filter(r => r.status === 'pending').length)
const approvedCount = computed(() => kycRequests.value.filter(r => r.status === 'approved').length)
const rejectedCount = computed(() => kycRequests.value.filter(r => r.status === 'rejected').length)

// Filtered requests
const filteredRequests = computed(() => {
  let filtered = kycRequests.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q))
  }
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(r => r.status === statusFilter.value)
  }
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(r => r.type.toLowerCase() === typeFilter.value)
  }
  return filtered
})

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  typeFilter.value = 'all'
}

// Status badge classes (original colors)
const statusClass = (status) => {
  return {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  }[status]
}

// Preview modal
const selectedRequest = ref(null)
const openPreview = (request) => { selectedRequest.value = request }
const closePreview = () => { selectedRequest.value = null }

// New request modal
const showNewRequestModal = ref(false)
const newRequest = ref({ name: '', email: '', type: 'Individual', documentType: 'Passport' })

const openNewRequestModal = () => { showNewRequestModal.value = true }
const closeNewRequestModal = () => {
  showNewRequestModal.value = false
  newRequest.value = { name: '', email: '', type: 'Individual', documentType: 'Passport' }
}

const submitNewRequest = () => {
  const newId = Math.max(...kycRequests.value.map(r => r.id), 0) + 1
  const initials = newRequest.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const createdRequest = {
    id: newId,
    name: newRequest.value.name,
    email: newRequest.value.email,
    initials,
    type: newRequest.value.type,
    documentType: newRequest.value.documentType,
    date: new Date().toISOString().slice(0, 10),
    status: 'pending'
  }
  kycRequests.value.push(createdRequest)
  addTransaction('created', createdRequest.name)
  closeNewRequestModal()
}

const reversedTransactions = computed(() => [...transactions.value])
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
.animate-fade-in-fast {
  animation: fadeInFast 0.15s ease-out forwards;
}
@keyframes fadeInFast {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>