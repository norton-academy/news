<script setup lang="ts">
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Eye,
  Info,
  RefreshCcw,
  Trash2,
  TriangleAlert,
} from "lucide-vue-next";
import type {
  NotificationItem,
  NotificationType,
  NotificationPagination,
} from "~/composables/useNotification";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
  title: "Notifications",
});

const {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
} = useNotification();

const notificationStore = useNotificationStore();
const toast = useToast();

const loading = ref(false);
const actionLoading = ref(false);
const errorMessage = ref("");

const notifications = ref<NotificationItem[]>([]);
const pagination = ref<NotificationPagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
});

const page = ref(1);
const perPage = ref(10);
const readFilter = ref<"all" | "read" | "unread">("all");

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

const stats = computed(() => {
  return {
    total: pagination.value.total,
    unread: notificationStore.unreadCount,
    shown: notifications.value.length,
  };
});

const fetchNotifications = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getNotifications({
      page: page.value,
      per_page: perPage.value,
      read: readFilter.value,
    });

    notifications.value = response.data.notifications || [];
    pagination.value = response.data.pagination || pagination.value;

    notificationStore.unreadCount = response.data.unread_count || 0;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load notifications";
    toast.error("Failed to load notifications", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const handleOpenNotification = async (notification: NotificationItem) => {
  if (!notification.read) {
    await markNotificationAsRead(notification.id);

    notification.read = true;
    await notificationStore.refreshNotifications();
  }

  if (notification.action_url) {
    await navigateTo(notification.action_url);
  }
};

const handleMarkAllAsRead = async () => {
  actionLoading.value = true;

  try {
    const response = await markAllNotificationsAsRead();

    notifications.value = notifications.value.map((item) => ({
      ...item,
      read: true,
      read_at: item.read_at || new Date().toISOString(),
    }));

    notificationStore.unreadCount = response.data.unread_count || 0;
    await notificationStore.refreshNotifications();

    toast.success("Notifications updated", "All notifications were marked as read.");
  } catch (error: any) {
    toast.error("Action failed", error.message || "Failed to mark all as read");
  } finally {
    actionLoading.value = false;
  }
};

const handleClearAll = async () => {
  actionLoading.value = true;

  try {
    const response = await clearNotifications();

    notifications.value = [];
    pagination.value.total = 0;
    notificationStore.unreadCount = response.data.unread_count || 0;
    await notificationStore.refreshNotifications();

    toast.success("Notifications cleared", "All notifications were removed.");
  } catch (error: any) {
    toast.error("Action failed", error.message || "Failed to clear notifications");
  } finally {
    actionLoading.value = false;
  }
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchNotifications();
};

const goNext = async () => {
  if (page.value >= pagination.value.last_page) return;

  page.value++;
  await fetchNotifications();
};

watch(readFilter, async () => {
  page.value = 1;
  await fetchNotifications();
});

onMounted(fetchNotifications);
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Notifications"
      subtitle="View system updates, admin actions, and security messages."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="loading" @click="fetchNotifications">
          <RefreshCcw class="mr-2 h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton
          variant="secondary"
          :loading="actionLoading"
          :disabled="notificationStore.unreadCount === 0"
          @click="handleMarkAllAsRead"
        >
          <Eye class="mr-2 h-4 w-4" />
          Mark All Read
        </AppButton>

        <AppButton
          variant="danger"
          :loading="actionLoading"
          :disabled="notifications.length === 0"
          @click="handleClearAll"
        >
          <Trash2 class="mr-2 h-4 w-4" />
          Clear
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatsCard
        title="Total Notifications"
        :value="stats.total"
        subtitle="All notification history"
        tone="info"
      >
        <template #badge>
          <div
            class="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          >
            <Bell class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Unread"
        :value="stats.unread"
        subtitle="Need your attention"
        tone="warning"
      >
        <template #badge>
          <div
            class="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
          >
            <TriangleAlert class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Showing"
        :value="stats.shown"
        subtitle="Current page items"
        tone="success"
      >
        <template #badge>
          <div
            class="rounded-xl bg-green-100 p-2 text-green-700 dark:bg-green-950/50 dark:text-green-300"
          >
            <CheckCircle2 class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>
    </div>

    <FilterBar
      title="Filters"
      subtitle="Filter notification history by read status."
      columns="2"
    >
      <AppSelect
        v-model="readFilter"
        label="Read Status"
        placeholder="All"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Unread', value: 'unread' },
          { label: 'Read', value: 'read' },
        ]"
      />
    </FilterBar>

    <div v-if="loading" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="ui-card rounded-3xl p-5 shadow-sm"
      >
        <div class="flex gap-4">
          <div
            class="h-12 w-12 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
          />
          <div class="flex-1 space-y-3">
            <div class="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div
              class="h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800/70"
            />
            <div
              class="h-3 w-28 animate-pulse rounded bg-slate-100 dark:bg-slate-800/70"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="notifications.length" class="space-y-3">
      <button
        v-for="notification in notifications"
        :key="notification.id"
        type="button"
        class="w-full ui-card rounded-3xl p-5 text-left shadow-sm transition hover:bg-slate-50"
        :class="!notification.read ? 'ring-2 ring-blue-100 dark:ring-blue-950/50' : ''"
        @click="handleOpenNotification(notification)"
      >
        <div class="flex gap-4">
          <div
            :class="[
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
              toneClass(notification.type),
            ]"
          >
            <component :is="iconMap[notification.type]" class="h-6 w-6" />
          </div>

          <div class="min-w-0 flex-1">
            <div
              class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-bold text-ui">
                    {{ notification.title }}
                  </h3>

                  <AppBadge v-if="!notification.read" variant="info"> New </AppBadge>
                </div>

                <p class="mt-1 text-sm leading-6 text-muted">
                  {{ notification.message }}
                </p>
              </div>

              <span class="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                {{ notification.created_at }}
              </span>
            </div>

            <div v-if="notification.action_url" class="mt-4">
              <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Open related page →
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>

    <EmptyState
      v-else
      title="No notifications found"
      message="There are no notifications for the selected filter."
    >
      <template #icon>
        <Bell class="h-6 w-6" />
      </template>
    </EmptyState>

    <TablePagination
      v-if="pagination.total > 0"
      :current-page="pagination.current_page"
      :last-page="pagination.last_page"
      :total="pagination.total"
      :loading="loading"
      @previous="goPrevious"
      @next="goNext"
    />
  </div>
</template>
