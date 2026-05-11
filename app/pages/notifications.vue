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

const clearConfirmOpen = ref(false);

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
};

const typeVariant = (type: NotificationType) => {
  const variants = {
    info: "info",
    success: "success",
    warning: "warning",
    error: "danger",
  } as const;

  return variants[type];
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
  try {
    if (!notification.read) {
      await markNotificationAsRead(notification.id);

      notification.read = true;
      notification.read_at = notification.read_at || new Date().toISOString();

      await notificationStore.refreshNotifications();
    }

    if (notification.action_url) {
      await navigateTo(notification.action_url);
    }
  } catch (error: any) {
    toast.error("Action failed", error.message || "Failed to open notification");
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

const openClearConfirm = () => {
  clearConfirmOpen.value = true;
};

const closeClearConfirm = () => {
  if (actionLoading.value) return;

  clearConfirmOpen.value = false;
};

const handleClearAll = async () => {
  actionLoading.value = true;

  try {
    const response = await clearNotifications();

    notifications.value = [];
    pagination.value.total = 0;
    pagination.value.current_page = 1;
    pagination.value.last_page = 1;
    page.value = 1;

    notificationStore.unreadCount = response.data.unread_count || 0;
    await notificationStore.refreshNotifications();

    toast.success("Notifications cleared", "All notifications were removed.");

    closeClearConfirm();
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

onMounted(async () => {
  await fetchNotifications();
});
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Notifications"
      subtitle="View system updates, admin actions, account events, and security messages."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="loading" @click="fetchNotifications">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton
          variant="secondary"
          :loading="actionLoading"
          :disabled="notificationStore.unreadCount === 0"
          @click="handleMarkAllAsRead"
        >
          <Eye class="h-4 w-4" />
          Mark All Read
        </AppButton>

        <AppButton
          variant="danger"
          :loading="actionLoading"
          :disabled="notifications.length === 0"
          @click="openClearConfirm"
        >
          <Trash2 class="h-4 w-4" />
          Clear
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load notifications"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatsCard
        title="Total Notifications"
        :value="stats.total"
        subtitle="All notification history"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <Bell class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Unread"
        :value="stats.unread"
        subtitle="Need your attention"
        tone="warning"
      >
        <template #badge>
          <AppBadge variant="warning" shape="square" size="md">
            <TriangleAlert class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Showing"
        :value="stats.shown"
        subtitle="Current page items"
        tone="success"
      >
        <template #badge>
          <AppBadge variant="success" shape="square" size="md">
            <CheckCircle2 class="h-5 w-5" />
          </AppBadge>
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

    <!-- Loading -->
    <div v-if="loading" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="rounded-3xl border border-border bg-card p-5 shadow-sm"
      >
        <div class="flex gap-4">
          <div class="h-12 w-12 animate-pulse rounded-2xl bg-muted" />

          <div class="flex-1 space-y-3">
            <div class="h-4 w-48 animate-pulse rounded bg-muted" />
            <div class="h-3 w-full animate-pulse rounded bg-muted" />
            <div class="h-3 w-28 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>

    <!-- Notification list -->
    <div v-else-if="notifications.length" class="space-y-3">
      <button
        v-for="notification in notifications"
        :key="notification.id"
        type="button"
        class="w-full rounded-3xl border border-border bg-card p-5 text-left shadow-sm hover:bg-muted/50"
        :class="!notification.read ? 'ring-2 ring-sky-100 dark:ring-sky-950/60' : ''"
        @click="handleOpenNotification(notification)"
      >
        <div class="flex gap-4">
          <AppBadge :variant="typeVariant(notification.type)" shape="square" size="lg">
            <component :is="iconMap[notification.type]" class="h-6 w-6" />
          </AppBadge>

          <div class="min-w-0 flex-1">
            <div
              class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
            >
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-sm font-bold text-card-foreground">
                    {{ notification.title }}
                  </h3>

                  <AppBadge v-if="!notification.read" variant="info"> New </AppBadge>
                </div>

                <p class="mt-1 text-sm leading-6 text-muted-foreground">
                  {{ notification.message }}
                </p>
              </div>

              <span class="shrink-0 text-xs font-medium text-muted-foreground">
                {{ notification.created_at }}
              </span>
            </div>

            <div v-if="notification.action_url" class="mt-4">
              <span class="text-sm font-semibold text-sky-600 dark:text-sky-400">
                Open related page →
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- Empty -->
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

    <ConfirmDialog
      :open="clearConfirmOpen"
      title="Clear Notifications"
      message="Are you sure you want to clear all notifications? This action cannot be undone."
      confirm-label="Clear All"
      variant="danger"
      :loading="actionLoading"
      @close="closeClearConfirm"
      @confirm="handleClearAll"
    />
  </div>
</template>
w
