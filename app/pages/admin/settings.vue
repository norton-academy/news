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
          <div class="hidden md:block flex-1 max-w-md mx-8"></div>
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
      <div class="w-full max-w-5xl mx-auto">
        <!-- Page header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your account, security, and system preferences.</p>
        </div>

        <!-- Tabs -->
        <div class="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-8">
          <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key" :class="['px-4 py-2 text-sm font-medium rounded-t-lg transition-all', activeTab === tab.key ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300']">
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Panels -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
          <!-- General Settings -->
          <div v-if="activeTab === 'general'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label>
                <input type="text" v-model="settings.general.siteName" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site URL</label>
                <input type="url" v-model="settings.general.siteUrl" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Admin Email</label>
                <input type="email" v-model="settings.general.adminEmail" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                <select v-model="settings.general.timezone" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+1 (CET)</option>
                  <option>UTC+8 (Singapore)</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="flex items-center gap-2">
                  <input type="checkbox" v-model="settings.general.maintenanceMode" class="rounded">
                  <span class="text-sm text-gray-700 dark:text-gray-300">Maintenance Mode</span>
                </label>
                <p class="text-xs text-gray-500 mt-1">When enabled, only admins can access the frontend.</p>
              </div>
            </div>
          </div>

          <!-- Profile Settings -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="h-20 w-20 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                JD
              </div>
              <button class="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">Change Avatar</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input type="text" v-model="settings.profile.fullName" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input type="email" v-model="settings.profile.email" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input type="tel" v-model="settings.profile.phone" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <input type="text" v-model="settings.profile.department" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                <textarea rows="3" v-model="settings.profile.bio" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm"></textarea>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">Change Password</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                  <input type="password" v-model="security.currentPassword" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                </div>
                <div></div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                  <input type="password" v-model="security.newPassword" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                  <input type="password" v-model="security.confirmPassword" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                </div>
              </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">Two-Factor Authentication</h3>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Add an extra layer of security to your account.</p>
                  <p class="text-xs text-gray-500 mt-1">Status: {{ settings.security.twoFactorEnabled ? 'Enabled' : 'Disabled' }}</p>
                </div>
                <button @click="settings.security.twoFactorEnabled = !settings.security.twoFactorEnabled" :class="['px-4 py-2 rounded-xl text-sm font-medium', settings.security.twoFactorEnabled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
                  {{ settings.security.twoFactorEnabled ? 'Disable' : 'Enable' }}
                </button>
              </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">Session Management</h3>
              <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm">Logout from all devices</button>
            </div>
          </div>

          <!-- Notifications Settings -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">Email Notifications</p>
                  <p class="text-sm text-gray-500">Receive system updates and alerts via email.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.notifications.email" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">Push Notifications</p>
                  <p class="text-sm text-gray-500">Browser push notifications for important events.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.notifications.push" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">KYC Updates</p>
                  <p class="text-sm text-gray-500">Get notified when KYC status changes.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.notifications.kyc" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">Withdrawal Alerts</p>
                  <p class="text-sm text-gray-500">Notify when a withdrawal is requested or processed.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="settings.notifications.withdrawals" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Integrations Settings -->
          <div v-if="activeTab === 'integrations'" class="space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600">📧</div>
                  <div>
                    <p class="font-medium">SendGrid</p>
                    <p class="text-xs text-gray-500">Email delivery service</p>
                  </div>
                </div>
                <button class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg">Configure</button>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600">💳</div>
                  <div>
                    <p class="font-medium">Stripe</p>
                    <p class="text-xs text-gray-500">Payment processing</p>
                  </div>
                </div>
                <button class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg">Configure</button>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600">🗄️</div>
                  <div>
                    <p class="font-medium">AWS S3</p>
                    <p class="text-xs text-gray-500">File storage</p>
                  </div>
                </div>
                <button class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg">Configure</button>
              </div>
            </div>
          </div>

          <!-- System Settings -->
          <div v-if="activeTab === 'system'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Debug Mode</label>
                <select v-model="settings.system.debugMode" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <option>Disabled</option>
                  <option>Enabled</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Log Retention (days)</label>
                <input type="number" v-model="settings.system.logRetention" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Language</label>
                <select v-model="settings.system.defaultLanguage" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Format</label>
                <select v-model="settings.system.dateFormat" class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">Danger Zone</h3>
              <div class="space-y-3">
                <button class="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">Clear All Cache</button>
                <button class="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">Reset All Settings</button>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button @click="saveSettings" class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl shadow-md hover:shadow-lg transition">Save Changes</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast notification -->
    <div v-if="toast" class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50">
      {{ toast }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

const activeTab = ref('general')
const tabs = [
  { key: 'general', label: 'General' },
  { key: 'profile', label: 'Profile' },
  { key: 'security', label: 'Security' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'system', label: 'System' }
]

// Settings data
const settings = ref({
  general: {
    siteName: 'AdminCore',
    siteUrl: 'https://admincore.example.com',
    adminEmail: 'admin@example.com',
    timezone: 'UTC+0 (GMT)',
    maintenanceMode: false
  },
  profile: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    department: 'IT Administration',
    bio: 'Senior system administrator with 10+ years of experience.'
  },
  security: {
    twoFactorEnabled: false
  },
  notifications: {
    email: true,
    push: false,
    kyc: true,
    withdrawals: true
  },
  system: {
    debugMode: 'Disabled',
    logRetention: 30,
    defaultLanguage: 'English',
    dateFormat: 'MM/DD/YYYY'
  }
})

const security = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const toast = ref('')

const saveSettings = () => {
  // In real app, send to API
  localStorage.setItem('adminSettings', JSON.stringify(settings.value))
  toast.value = 'Settings saved successfully!'
  setTimeout(() => toast.value = '', 3000)
}

// Load saved settings
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('adminSettings')
  if (saved) settings.value = JSON.parse(saved)
}
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>