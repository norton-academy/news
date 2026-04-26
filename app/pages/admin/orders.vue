<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Header (same as KYC) -->
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
              <input type="text" placeholder="Search orders..." v-model="searchQuery" class="w-full bg-gray-50 dark:bg-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm dark:text-white">
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
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Orders Management</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1">Process and track customer orders.</p>
          </div>
          <div class="flex gap-3">
            <button class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all">
              Export CSV
            </button>
            <button @click="openNewOrderModal" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-md text-sm font-medium text-white hover:shadow-lg transition-all">
              + New Order
            </button>
          </div>
        </div>

        <!-- Summary stats cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalOrders }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
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
                <p class="text-sm text-gray-500 dark:text-gray-400">Shipped</p>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ shippedCount }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
                <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ deliveredCount }}</p>
              </div>
              <div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and view toggle -->
        <div class="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div class="flex flex-wrap gap-4">
            <div class="relative min-w-[200px]">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" v-model="searchQuery" placeholder="Search by order ID, customer, or email" class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
            <select v-model="statusFilter" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input type="date" v-model="dateFrom" placeholder="From date" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
            <input type="date" v-model="dateTo" placeholder="To date" class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
            <button @click="resetFilters" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 transition">Reset</button>
          </div>
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

        <!-- Bulk Action Bar (table view only) -->
        <div v-if="viewMode === 'table' && selectedOrdersIds.length > 0" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 flex items-center gap-4 animate-slide-up">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ selectedOrdersIds.length }} selected</span>
          <div class="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div class="relative">
            <button @click="toggleBulkDropdown" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl text-sm font-medium transition shadow-md">
              Bulk Actions
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-if="showBulkDropdown" class="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[140px] z-50 animate-fade-in-fast">
              <button @click="bulkUpdateStatus('processing')" class="w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Process
              </button>
              <button @click="bulkUpdateStatus('shipped')" class="w-full text-left px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Ship
              </button>
              <button @click="bulkUpdateStatus('delivered')" class="w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Deliver
              </button>
              <button @click="bulkUpdateStatus('cancelled')" class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> Cancel
              </button>
            </div>
          </div>
          <button @click="clearSelection" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- ==================== GRID VIEW ==================== -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="order in filteredOrders" :key="order.id" class="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Order #{{ order.id }}</p>
                <h3 class="font-semibold text-gray-800 dark:text-white mt-1">{{ order.customer }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ order.email }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span :class="statusClass(order.status)" class="px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
                  {{ order.status }}
                </span>
                <!-- Dropdown Actions -->
                <div class="relative">
                  <button @click="toggleDropdown(order.id)" class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>
                  <div v-if="activeDropdownId === order.id" class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30 animate-fade-in-fast">
                    <button @click="updateOrderStatus(order.id, 'pending'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Pending
                    </button>
                    <button @click="updateOrderStatus(order.id, 'processing'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Processing
                    </button>
                    <button @click="updateOrderStatus(order.id, 'shipped'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Shipped
                    </button>
                    <button @click="updateOrderStatus(order.id, 'delivered'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Delivered
                    </button>
                    <button @click="updateOrderStatus(order.id, 'cancelled'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ order.total }}</span>
              <span class="text-xs text-gray-500">{{ order.items }} items</span>
            </div>
            <div class="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>{{ order.date }}</span>
            </div>
            <div class="mt-4">
              <button @click="openOrderDetails(order)" class="w-full py-2 text-center text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition shadow-sm">
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- ==================== CARD VIEW (compact) ==================== -->
        <div v-if="viewMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div v-for="order in filteredOrders" :key="order.id" class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-xs text-gray-500">#{{ order.id }}</p>
                <p class="font-medium text-gray-800 dark:text-white">{{ order.customer }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span :class="statusClass(order.status)" class="px-2 py-0.5 text-xs rounded-full">{{ order.status }}</span>
                <div class="relative">
                  <button @click="toggleDropdown(order.id)" class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>
                  <div v-if="activeDropdownId === order.id" class="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30">
                    <button @click="updateOrderStatus(order.id, 'pending'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-yellow-600">Pending</button>
                    <button @click="updateOrderStatus(order.id, 'processing'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-blue-600">Processing</button>
                    <button @click="updateOrderStatus(order.id, 'shipped'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-purple-600">Shipped</button>
                    <button @click="updateOrderStatus(order.id, 'delivered'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-green-600">Delivered</button>
                    <button @click="updateOrderStatus(order.id, 'cancelled'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-xs text-red-600">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-2 flex justify-between">
              <span class="text-lg font-bold">{{ order.total }}</span>
              <span class="text-xs text-gray-500">{{ order.items }} items</span>
            </div>
            <div class="mt-2 text-xs text-gray-500">{{ order.date }}</div>
            <button @click="openOrderDetails(order)" class="mt-3 w-full py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 hover:bg-gray-200 transition">Details</button>
          </div>
        </div>

        <!-- ==================== LIST VIEW ==================== -->
        <div v-if="viewMode === 'list'" class="space-y-3">
          <div v-for="order in filteredOrders" :key="order.id" class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-wrap items-center justify-between gap-3 transition-all hover:shadow-lg">
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 font-bold">
                {{ order.customer.charAt(0) }}
              </div>
              <div>
                <p class="font-medium text-gray-800 dark:text-white">{{ order.customer }}</p>
                <p class="text-xs text-gray-500">Order #{{ order.id }} • {{ order.items }} items</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-lg font-bold">{{ order.total }}</span>
              <span :class="statusClass(order.status)" class="px-2 py-1 text-xs rounded-full">{{ order.status }}</span>
              <button @click="openOrderDetails(order)" class="text-indigo-600 text-sm">Details</button>
              <div class="relative">
                <button @click="toggleDropdown(order.id)" class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
                <div v-if="activeDropdownId === order.id" class="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30">
                  <button @click="updateOrderStatus(order.id, 'pending'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-yellow-600">Pending</button>
                  <button @click="updateOrderStatus(order.id, 'processing'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-blue-600">Processing</button>
                  <button @click="updateOrderStatus(order.id, 'shipped'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-purple-600">Shipped</button>
                  <button @click="updateOrderStatus(order.id, 'delivered'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-green-600">Delivered</button>
                  <button @click="updateOrderStatus(order.id, 'cancelled'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-red-600">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== TABLE VIEW (with bulk selection) ==================== -->
        <div v-if="viewMode === 'table'" class="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md">
          <table class="min-w-full">
            <thead class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="px-4 py-3 text-left">
                <input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <td class="px-4 py-3 whitespace-nowrap">
                <input type="checkbox" v-model="selectedOrdersIds" :value="order.id" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              </td>
              <td class="px-4 py-3 text-sm font-medium">#{{ order.id }}</td>
              <td class="px-4 py-3 text-sm">{{ order.customer }}</td>
              <td class="px-4 py-3 text-sm">{{ order.email }}</td>
              <td class="px-4 py-3 text-sm">{{ order.items }}</td>
              <td class="px-4 py-3 text-sm font-medium">{{ order.total }}</td>
              <td class="px-4 py-3 text-sm">{{ order.date }}</td>
              <td class="px-4 py-3">
                <span :class="statusClass(order.status)" class="px-2 py-1 text-xs rounded-full">{{ order.status }}</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex gap-2 items-center">
                  <button @click="openOrderDetails(order)" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Details</button>
                  <div class="relative">
                    <button @click="toggleDropdown(order.id)" class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                    <div v-if="activeDropdownId === order.id" class="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-30">
                      <button @click="updateOrderStatus(order.id, 'pending'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-yellow-600">Pending</button>
                      <button @click="updateOrderStatus(order.id, 'processing'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-blue-600">Processing</button>
                      <button @click="updateOrderStatus(order.id, 'shipped'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-purple-600">Shipped</button>
                      <button @click="updateOrderStatus(order.id, 'delivered'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-green-600">Delivered</button>
                      <button @click="updateOrderStatus(order.id, 'cancelled'); closeDropdown()" class="w-full text-left px-3 py-1.5 text-sm text-red-600">Cancel</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Transaction Log Section -->
        <div class="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              <h3 class="font-semibold text-gray-800 dark:text-white">Order Activity Log</h3>
            </div>
            <span class="text-xs text-gray-500">{{ transactions.length }} entries</span>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div v-if="transactions.length === 0" class="px-6 py-8 text-center text-gray-400 text-sm">
              No activity yet. Update order statuses to see the log.
            </div>
            <div v-for="tx in reversedTransactions" :key="tx.id" class="px-6 py-3 border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition flex items-center gap-3">
              <div :class="{
                'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300': tx.action === 'delivered',
                'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300': tx.action === 'processing' || tx.action === 'shipped',
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300': tx.action === 'pending',
                'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300': tx.action === 'cancelled',
                'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300': tx.action === 'created'
              }" class="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold">
                <svg v-if="tx.action === 'delivered'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else-if="tx.action === 'processing' || tx.action === 'shipped'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else-if="tx.action === 'pending'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else-if="tx.action === 'cancelled'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
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

        <!-- New Order Modal -->
        <div v-if="showNewOrderModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeNewOrderModal">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Create New Order</h3>
              <button @click="closeNewOrderModal" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form @submit.prevent="submitNewOrder" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Name</label>
                <input type="text" v-model="newOrder.customer" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" v-model="newOrder.email" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Amount</label>
                <input type="text" v-model="newOrder.total" placeholder="$0.00" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Items</label>
                <input type="number" v-model="newOrder.items" min="1" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div class="flex gap-3 pt-2">
                <button type="button" @click="closeNewOrderModal" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Cancel</button>
                <button type="submit" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">Create Order</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Order Details Modal (same as before) -->
        <div v-if="selectedOrder" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeOrderDetails">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-scale-in">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Order Details #{{ selectedOrder.id }}</h3>
              <button @click="closeOrderDetails" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-gray-500">Customer</p>
                  <p class="font-medium">{{ selectedOrder.customer }}</p>
                  <p class="text-sm text-gray-600">{{ selectedOrder.email }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Order Date</p>
                  <p>{{ selectedOrder.date }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Status</p>
                  <select v-model="selectedOrder.status" @change="updateOrderStatus(selectedOrder.id, selectedOrder.status)" class="mt-1 px-2 py-1 border rounded-lg dark:bg-gray-700">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Total</p>
                  <p class="text-2xl font-bold">{{ selectedOrder.total }}</p>
                </div>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-2">Order Items</p>
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <div v-for="item in selectedOrder.itemsList" :key="item.name" class="flex justify-between py-1">
                    <span>{{ item.name }} x {{ item.qty }}</span>
                    <span>{{ item.price }}</span>
                  </div>
                </div>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-2">Shipping Address</p>
                <p class="text-sm">{{ selectedOrder.address }}</p>
              </div>
            </div>
            <div class="mt-6 flex gap-2">
              <button @click="closeOrderDetails" class="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700">Close</button>
              <button v-if="selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled'" @click="updateOrderStatus(selectedOrder.id, 'shipped'); closeOrderDetails()" class="flex-1 py-2 rounded-xl bg-indigo-600 text-white">Mark as Shipped</button>
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
const dateFrom = ref('')
const dateTo = ref('')

// Sample orders data
const orders = ref([
  {
    id: 'ORD-001',
    customer: 'Emily Johnson',
    email: 'emily@example.com',
    total: '$89.99',
    items: 2,
    date: '2025-03-25',
    status: 'pending',
    itemsList: [
      { name: 'Wireless Headphones', qty: 1, price: '$89.99' },
      { name: 'USB-C Cable', qty: 1, price: '$12.99' }
    ],
    address: '123 Main St, New York, NY 10001'
  },
  {
    id: 'ORD-002',
    customer: 'Michael Chen',
    email: 'michael@example.com',
    total: '$199.99',
    items: 1,
    date: '2025-03-24',
    status: 'shipped',
    itemsList: [{ name: 'Smart Watch', qty: 1, price: '$199.99' }],
    address: '456 Oak Ave, Los Angeles, CA 90001'
  },
  {
    id: 'ORD-003',
    customer: 'Sophia Rodriguez',
    email: 'sophia@example.com',
    total: '$129.99',
    items: 1,
    date: '2025-03-23',
    status: 'delivered',
    itemsList: [{ name: 'Mechanical Keyboard', qty: 1, price: '$129.99' }],
    address: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'ORD-004',
    customer: 'James Wilson',
    email: 'james@example.com',
    total: '$49.99',
    items: 1,
    date: '2025-03-22',
    status: 'processing',
    itemsList: [{ name: 'USB-C Hub', qty: 1, price: '$49.99' }],
    address: '321 Elm St, Houston, TX 77001'
  },
  {
    id: 'ORD-005',
    customer: 'Olivia Martinez',
    email: 'olivia@example.com',
    total: '$159.99',
    items: 1,
    date: '2025-03-21',
    status: 'cancelled',
    itemsList: [{ name: 'Noise Cancelling Earbuds', qty: 1, price: '$159.99' }],
    address: '654 Maple Dr, Phoenix, AZ 85001'
  },
  {
    id: 'ORD-006',
    customer: 'William Brown',
    email: 'william@example.com',
    total: '$349.99',
    items: 3,
    date: '2025-03-20',
    status: 'pending',
    itemsList: [
      { name: 'Gaming Mouse', qty: 1, price: '$59.99' },
      { name: 'Mechanical Keyboard', qty: 1, price: '$129.99' },
      { name: 'Mouse Pad', qty: 1, price: '$19.99' }
    ],
    address: '987 Cedar Ln, Seattle, WA 98101'
  }
])

// Transaction Log
const transactions = ref([])
let nextTxId = 1

const addTransaction = (action, orderId, customer, details = '') => {
  const actionMap = {
    pending: { action: 'pending', message: `marked order ${orderId} for ${customer} as pending` },
    processing: { action: 'processing', message: `started processing order ${orderId} for ${customer}` },
    shipped: { action: 'shipped', message: `shipped order ${orderId} for ${customer}` },
    delivered: { action: 'delivered', message: `marked order ${orderId} for ${customer} as delivered` },
    cancelled: { action: 'cancelled', message: `cancelled order ${orderId} for ${customer}` },
    created: { action: 'created', message: `created new order ${orderId} for ${customer}` }
  }
  const entry = actionMap[action] || { action: 'updated', message: `updated order ${orderId} for ${customer}` }
  transactions.value.unshift({
    id: nextTxId++,
    admin: 'John Doe',
    action: entry.action,
    message: entry.message + (details ? ` (${details})` : ''),
    timestamp: new Date().toLocaleString()
  })
}

// Update order status with transaction
const updateOrderStatus = (orderId, newStatus) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order && order.status !== newStatus) {
    const oldStatus = order.status
    order.status = newStatus
    addTransaction(newStatus, orderId, order.customer, `changed from ${oldStatus} to ${newStatus}`)
    // If modal is open, sync status
    if (selectedOrder.value && selectedOrder.value.id === orderId) {
      selectedOrder.value.status = newStatus
    }
  }
}

// Bulk selection (table view)
const selectedOrdersIds = ref([])
const showBulkDropdown = ref(false)

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedOrdersIds.value = filteredOrders.value.map(o => o.id)
  } else {
    selectedOrdersIds.value = []
  }
}

const isAllSelected = computed(() => {
  return filteredOrders.value.length > 0 && selectedOrdersIds.value.length === filteredOrders.value.length
})

const clearSelection = () => {
  selectedOrdersIds.value = []
  showBulkDropdown.value = false
}

const toggleBulkDropdown = () => {
  showBulkDropdown.value = !showBulkDropdown.value
}

const bulkUpdateStatus = (newStatus) => {
  const selectedOrders = orders.value.filter(o => selectedOrdersIds.value.includes(o.id))
  selectedOrders.forEach(order => {
    if (order.status !== newStatus) {
      const oldStatus = order.status
      order.status = newStatus
      addTransaction(newStatus, order.id, order.customer, `bulk: ${oldStatus} → ${newStatus}`)
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
const totalOrders = computed(() => orders.value.length)
const pendingCount = computed(() => orders.value.filter(o => o.status === 'pending').length)
const shippedCount = computed(() => orders.value.filter(o => o.status === 'shipped').length)
const deliveredCount = computed(() => orders.value.filter(o => o.status === 'delivered').length)

const filteredOrders = computed(() => {
  let filtered = orders.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(o => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q))
  }
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(o => o.status === statusFilter.value)
  }
  if (dateFrom.value) {
    filtered = filtered.filter(o => o.date >= dateFrom.value)
  }
  if (dateTo.value) {
    filtered = filtered.filter(o => o.date <= dateTo.value)
  }
  return filtered
})

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  dateFrom.value = ''
  dateTo.value = ''
}

// Status badge classes
const statusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  }
  return classes[status] || classes.pending
}

// Order details modal
const selectedOrder = ref(null)
const openOrderDetails = (order) => { selectedOrder.value = { ...order } }
const closeOrderDetails = () => { selectedOrder.value = null }

// New order modal
const showNewOrderModal = ref(false)
const newOrder = ref({ customer: '', email: '', total: '', items: 1 })

const openNewOrderModal = () => { showNewOrderModal.value = true }
const closeNewOrderModal = () => {
  showNewOrderModal.value = false
  newOrder.value = { customer: '', email: '', total: '', items: 1 }
}

const submitNewOrder = () => {
  const newId = `ORD-${String(orders.value.length + 1).padStart(3, '0')}`
  const newOrderObj = {
    id: newId,
    customer: newOrder.value.customer,
    email: newOrder.value.email,
    total: newOrder.value.total,
    items: newOrder.value.items,
    date: new Date().toISOString().slice(0,10),
    status: 'pending',
    itemsList: [{ name: 'Sample Item', qty: 1, price: newOrder.value.total }],
    address: 'Address not provided'
  }
  orders.value.push(newOrderObj)
  addTransaction('created', newId, newOrder.value.customer)
  closeNewOrderModal()
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