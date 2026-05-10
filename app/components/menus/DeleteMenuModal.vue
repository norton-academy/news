<script setup lang="ts">
import { Trash2, X } from "lucide-vue-next";
import type { MenuItem } from "~/composables/useMenu";

const props = defineProps<{
  open: boolean;
  menu: MenuItem | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "deleted"): void;
}>();

const { deleteMenu } = useMenu();
const toast = useToast();

const loading = ref(false);
const generalError = ref("");

const handleClose = () => {
  generalError.value = "";
  emit("close");
};

const handleDelete = async () => {
  if (!props.menu) return;

  if (props.menu.is_system) {
    generalError.value = "System menu cannot be deleted.";
    return;
  }

  loading.value = true;
  generalError.value = "";

  try {
    await deleteMenu(props.menu.id);

    toast.success("Menu deleted", "Menu item was deleted successfully.");
    emit("deleted");
    handleClose();
  } catch (error: any) {
    generalError.value = error.message || "Failed to delete menu";
    toast.error("Delete failed", generalError.value);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AppModal
    :open="open"
    title="Delete Menu"
    subtitle="This action cannot be undone."
    size="sm"
    @close="handleClose"
  >
    <template #icon>
      <Trash2 class="h-5 w-5" />
    </template>

    <div class="space-y-5">
      <AlertMessage v-if="generalError" type="error" :message="generalError" />

      <AlertMessage
        v-if="menu?.is_system"
        type="warning"
        title="System Menu"
        message="This menu is protected and cannot be deleted."
      />

      <AlertMessage v-else type="warning" title="Confirm delete">
        Are you sure you want to delete
        <strong>{{ menu?.label }}</strong
        >?
      </AlertMessage>

      <div
        class="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800"
      >
        <AppButton type="button" variant="secondary" @click="handleClose">
          <X class="mr-2 h-4 w-4" />
          Cancel
        </AppButton>

        <AppButton
          type="button"
          variant="danger"
          :loading="loading"
          :disabled="menu?.is_system"
          @click="handleDelete"
        >
          <Trash2 class="mr-2 h-4 w-4" />
          Delete Menu
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>
