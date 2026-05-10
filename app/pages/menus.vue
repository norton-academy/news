<script setup lang="ts">
import {
  Eye,
  EyeOff,
  GripVertical,
  PanelTop,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-vue-next";
import type { MenuItem } from "~/composables/useMenu";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "mebu.view",
  title: "Menus",
});

const { getMenus, reorderMenus, toggleMenuActive } = useMenu();
const authStore = useAuthStore();
const menuStore = useMenuStore();
const toast = useToast();

const loading = ref(false);
const errorMessage = ref("");
const menus = ref<MenuItem[]>([]);
const reorderMode = ref(false);
const savingOrder = ref(false);
const draggedIndex = ref<number | null>(null);
const localMenuOrder = ref<MenuItem[]>([]);
const togglingId = ref<number | null>(null);

const formModalOpen = ref(false);
const deleteModalOpen = ref(false);
const selectedMenu = ref<MenuItem | null>(null);

const columns = computed(() => {
  const base = [
    { key: "menu", label: "Menu" },
    { key: "group", label: "Group" },
    { key: "route", label: "Route" },
    { key: "permission", label: "Permission" },
    { key: "status", label: "Status" },
    { key: "sort_order", label: "Order" },
    { key: "actions", label: "Actions", align: "right" as const },
  ];

  if (reorderMode.value) {
    return [
      { key: "drag", label: "" },
      ...base.filter((column) => column.key !== "actions"),
    ];
  }

  return base;
});

const flatMenus = computed(() => {
  const result: MenuItem[] = [];

  menus.value.forEach((menu) => {
    result.push(menu);

    menu.children?.forEach((child) => {
      result.push({
        ...child,
        label: `— ${child.label}`,
      });
    });
  });

  return result;
});

const stats = computed(() => {
  const items = flatMenus.value;

  return {
    total: items.length,
    active: items.filter((item) => item.is_active).length,
    inactive: items.filter((item) => !item.is_active).length,
    system: items.filter((item) => item.is_system).length,
  };
});

const fetchMenus = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getMenus();
    menus.value = response.data.menus || [];
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load menus";
    toast.error("Failed to load menus", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const refreshSidebarMenus = async () => {
  menuStore.clearMenus();
  await menuStore.fetchMenus();
};

const openCreate = () => {
  selectedMenu.value = null;
  formModalOpen.value = true;
};

const openEdit = (menu: MenuItem) => {
  selectedMenu.value = menu;
  formModalOpen.value = true;
};

const openDelete = (menu: MenuItem) => {
  selectedMenu.value = menu;
  deleteModalOpen.value = true;
};

const closeForm = () => {
  selectedMenu.value = null;
  formModalOpen.value = false;
};

const closeDelete = () => {
  selectedMenu.value = null;
  deleteModalOpen.value = false;
};

const handleSaved = async () => {
  await fetchMenus();
  await refreshSidebarMenus();
};

const handleDeleted = async () => {
  await fetchMenus();
  await refreshSidebarMenus();
};

const handleMenuAction = async (menu: MenuItem, action: string) => {
  if (action === "toggle-active") {
    await handleToggleActive(menu);
    return;
  }

  if (action === "edit") {
    openEdit(menu);
    return;
  }

  if (action === "delete") {
    openDelete(menu);
  }
};

const startReorder = () => {
  reorderMode.value = true;
  localMenuOrder.value = [...flatMenus.value];
};

const cancelReorder = () => {
  reorderMode.value = false;
  draggedIndex.value = null;
  localMenuOrder.value = [];
};

const reorderRows = computed(() => {
  return reorderMode.value ? localMenuOrder.value : flatMenus.value;
});

const handleDragStart = (index: number) => {
  draggedIndex.value = index;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (targetIndex: number) => {
  if (draggedIndex.value === null) return;

  const sourceIndex = draggedIndex.value;

  if (sourceIndex === targetIndex) {
    draggedIndex.value = null;
    return;
  }

  const items = [...localMenuOrder.value];
  const [movedItem] = items.splice(sourceIndex, 1);

  items.splice(targetIndex, 0, movedItem);

  localMenuOrder.value = items.map((item, index) => ({
    ...item,
    sort_order: index + 1,
    parent_id: null,
  }));

  draggedIndex.value = null;
};

const saveMenuOrder = async () => {
  savingOrder.value = true;

  try {
    await reorderMenus({
      menus: localMenuOrder.value.map((menu, index) => ({
        id: menu.id,
        sort_order: index + 1,
        parent_id: null,
      })),
    });

    toast.success("Menu order saved", "Sidebar menu order was updated successfully.");

    reorderMode.value = false;

    await fetchMenus();
    await refreshSidebarMenus();
  } catch (error: any) {
    toast.error("Save failed", error.message || "Failed to save menu order");
  } finally {
    savingOrder.value = false;
  }
};

const handleToggleActive = async (menu: MenuItem) => {
  togglingId.value = menu.id;

  try {
    await toggleMenuActive(menu.id);

    toast.success(
      "Menu updated",
      `${menu.label} is now ${menu.is_active ? "inactive" : "active"}.`
    );

    await fetchMenus();
    await refreshSidebarMenus();
  } catch (error: any) {
    toast.error("Update failed", error.message || "Failed to update menu status");
  } finally {
    togglingId.value = null;
  }
};

onMounted(fetchMenus);
</script>

<template>
  <PageSkeleton v-if="loading" />

  <div class="space-y-6">
    <PageHeader
      title="Menus Management"
      subtitle="Manage sidebar navigation items, permissions, icons, and visibility."
    >
      <template #actions>
        <AppButton
          v-if="!reorderMode"
          variant="secondary"
          :loading="loading"
          @click="fetchMenus"
        >
          <RefreshCcw class="mr-2 h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton
          v-if="authStore.hasPermission('menu.update') && !reorderMode"
          variant="secondary"
          @click="startReorder"
        >
          <GripVertical class="mr-2 h-4 w-4" />
          Reorder
        </AppButton>

        <AppButton v-if="reorderMode" variant="secondary" @click="cancelReorder">
          Cancel
        </AppButton>

        <AppButton v-if="reorderMode" :loading="savingOrder" @click="saveMenuOrder">
          <Save class="mr-2 h-4 w-4" />
          Save Order
        </AppButton>

        <AppButton
          v-if="authStore.hasPermission('menu.create') && !reorderMode"
          @click="openCreate"
        >
          <Plus class="mr-2 h-4 w-4" />
          Add Menu
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />
    <AlertMessage
      v-if="reorderMode"
      type="info"
      title="Reorder Mode"
      message="Drag menu rows using the handle icon, then click Save Order."
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Menus"
        :value="stats.total"
        subtitle="All menu items"
        tone="info"
      >
        <template #badge>
          <div
            class="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          >
            <PanelTop class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Active"
        :value="stats.active"
        subtitle="Visible menus"
        tone="success"
      >
        <template #badge>
          <div
            class="rounded-xl bg-green-100 p-2 text-green-700 dark:bg-green-950/50 dark:text-green-300"
          >
            <Eye class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Inactive"
        :value="stats.inactive"
        subtitle="Hidden menus"
        tone="warning"
      >
        <template #badge>
          <div
            class="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
          >
            <EyeOff class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="System"
        :value="stats.system"
        subtitle="Protected system menus"
        tone="default"
      >
        <template #badge>
          <div
            class="rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <ShieldCheck class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>
    </div>

    <DataTable
      :columns="columns"
      :rows="reorderRows"
      :loading="loading"
      empty-title="No menus found"
      empty-message="Create your first menu item to customize the sidebar."
      @row-dragstart="handleDragStart"
      @row-dragover="handleDragOver"
      @row-drop="handleDrop"
    >
      <template #cell-menu="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          >
            <PanelTop class="h-5 w-5" />
          </div>

          <div>
            <div class="flex items-center gap-2">
              <p class="text-sm font-semibold text-ui">
                {{ row.label }}
              </p>

              <AppBadge v-if="row.is_system" variant="warning"> System </AppBadge>
            </div>

            <p class="text-xs text-muted">{{ row.name }} · {{ row.icon || "LayoutDashboard" }}</p>
          </div>
        </div>
      </template>

      <template #cell-route="{ row }">
        <code
          class="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {{ row.route }}
        </code>
      </template>

      <template #cell-permission="{ row }">
        <AppBadge v-if="row.permission" variant="info">
          {{ row.permission }}
        </AppBadge>

        <span v-else class="text-sm text-muted"> Public </span>
      </template>

      <template #cell-status="{ row }">
        <AppBadge :variant="row.is_active ? 'success' : 'warning'">
          {{ row.is_active ? "Active" : "Inactive" }}
        </AppBadge>
      </template>

      <template #cell-actions="{ row }">
        <ActionDropdown
          :items="[
            {
              label: row.is_active ? 'Disable Menu' : 'Enable Menu',
              action: 'toggle-active',
              icon: row.is_active ? EyeOff : Eye,
              variant: row.is_active ? 'warning' : 'success',
              visible: authStore.hasPermission('menu.update'),
              disabled: togglingId === row.id,
            },
            {
              label: 'Edit Menu',
              action: 'edit',
              icon: Pencil,
              visible: authStore.hasPermission('menu.update'),
            },
            {
              label: 'Delete Menu',
              action: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: authStore.hasPermission('menu.delete') && !row.is_system,
            },
            {
              label: 'System Menu',
              action: 'system',
              icon: ShieldCheck,
              disabled: true,
              visible: row.is_system,
            },
          ]"
          @select="handleMenuAction(row, $event)"
        />
      </template>

      <template #cell-group="{ row }">
        <AppBadge variant="default">
          {{ row.group || "Main" }}
        </AppBadge>
      </template>

      <template #cell-drag>
        <div
          class="flex cursor-grab items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <GripVertical class="h-5 w-5" />
        </div>
      </template>
    </DataTable>

    <MenuFormModal
      :open="formModalOpen"
      :menu="selectedMenu"
      :menus="flatMenus"
      @close="closeForm"
      @saved="handleSaved"
    />

    <DeleteMenuModal
      :open="deleteModalOpen"
      :menu="selectedMenu"
      @close="closeDelete"
      @deleted="handleDeleted"
    />
  </div>
</template>
