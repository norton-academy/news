<script setup lang="ts">
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Info,
  Loader2,
  RefreshCcw,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-vue-next";
import type { NotificationItem, NotificationType } from "~/composables/useNotification";

const notificationStore = useNotificationStore();

const open = ref(false);

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
};

const toneClass = (type: NotificationType) => {
  return {
    info: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    success: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    error: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  }[type];
};

const close = () => {
  open.value = false;
};

const toggleDropdown = async () => {
  open.value = !open.value;

  if (open.value) {
    await notificationStore.refreshNotifications();
  }
};

const handleRefresh = async () => {
  await notificationStore.refreshNotifications();
};

const handleNotificationClick = async (notification: NotificationItem) => {
  if (!notification.read) {
    await notificationStore.markAsRead(notification.id);
  }

  if (notification.action_url) {
    await navigateTo(notification.action_url);
    close();
  }
};

onMounted(async () => {
  await notificationStore.fetchNotifications();
});
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      @click="toggleDropdown"
    >
      <Bell class="h-5 w-5" />

      <span
        v-if="notificationStore.unreadCount > 0"
        class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950"
      >
        {{ notificationStore.unreadCount > 99 ? "99+" : notificationStore.unreadCount }}
      </span>
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="absolute right-0 z-50 mt-2 w-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:w-96"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800"
        >
          <div>
            <h3 class="text-sm font-bold text-ui">
              Notifications
            </h3>
            <p class="mt-1 text-xs text-muted">
              {{ notificationStore.unreadCount }} unread notification(s)
            </p>
          </div>

          <div class="flex items-center gap-1">
            <button
              type="button"
              class="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              :disabled="notificationStore.loading"
              @click="handleRefresh"
            >
              <RefreshCcw
                class="h-4 w-4"
                :class="notificationStore.loading ? 'animate-spin' : ''"
              />
            </button>

            <button
              type="button"
              class="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              @click="close"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="notificationStore.loading" class="space-y-3 p-4">
          <div v-for="i in 4" :key="i" class="flex gap-3 rounded-2xl p-3">
            <div
              class="h-10 w-10 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
            <div class="flex-1 space-y-2">
              <div
                class="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800"
              />
              <div
                class="h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800/70"
              />
              <div
                class="h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800/70"
              />
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="notificationStore.error" class="px-5 py-6">
          <AlertMessage
            type="error"
            title="Failed to load notifications"
            :message="notificationStore.error"
          />

          <AppButton class="mt-4 w-full" variant="secondary" @click="handleRefresh">
            <RefreshCcw class="mr-2 h-4 w-4" />
            Try Again
          </AppButton>
        </div>

        <!-- List -->
        <div
          v-else-if="notificationStore.notifications.length"
          class="max-h-[420px] overflow-y-auto p-2"
        >
          <button
            v-for="notification in notificationStore.notifications"
            :key="notification.id"
            type="button"
            class="flex w-full gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
            :class="!notification.read ? 'bg-slate-50 dark:bg-slate-800/50' : ''"
            @click="handleNotificationClick(notification)"
          >
            <div
              :class="[
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
                toneClass(notification.type),
              ]"
            >
              <component :is="iconMap[notification.type]" class="h-5 w-5" />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <p class="text-sm font-bold text-ui">
                  {{ notification.title }}
                </p>

                <span
                  v-if="!notification.read"
                  class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                />
              </div>

              <p class="mt-1 line-clamp-2 text-sm leading-5 text-muted">
                {{ notification.message }}
              </p>

              <div class="mt-2 flex items-center justify-between gap-3">
                <p class="text-xs text-slate-400 dark:text-slate-500">
                  {{ notification.created_at }}
                </p>

                <span
                  v-if="notification.action_url"
                  class="text-xs font-semibold text-blue-600 dark:text-blue-400"
                >
                  Open
                </span>
              </div>
            </div>
          </button>
        </div>

        <!-- Empty -->
        <div v-else class="px-6 py-12 text-center">
          <Bell class="mx-auto h-10 w-10 text-slate-300 dark:text-slate-700" />
          <p class="mt-4 text-sm font-semibold text-ui">
            No notifications
          </p>
          <p class="mt-1 text-sm text-muted">
            You are all caught up.
          </p>
        </div>

        <!-- Footer -->
        <div
          v-if="notificationStore.notifications.length"
          class="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700 disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300"
            :disabled="
              notificationStore.actionLoading || notificationStore.unreadCount === 0
            "
            @click="notificationStore.markAllAsRead()"
          >
            <Loader2
              v-if="notificationStore.actionLoading"
              class="h-3.5 w-3.5 animate-spin"
            />
            Mark all as read
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-1 text-xs font-semibold text-red-600 transition hover:text-red-700 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
            :disabled="notificationStore.actionLoading"
            @click="notificationStore.clearAll()"
          >
            <Trash2 class="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.notification-dropdown-enter-active,
.notification-dropdown-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.notification-dropdown-enter-from,
.notification-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
