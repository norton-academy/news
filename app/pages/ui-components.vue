<script setup lang="ts">
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Download,
  Eye,
  KeyRound,
  Mail,
  Pencil,
  Plus,
  RefreshCcw,
  Settings,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "menu.view",
  title: "UI Components",
});

const toast = useToast();

const demoModalOpen = ref(false);

const inputValue = ref("");
const selectValue = ref("");
const textareaValue = ref("");

const demoColumns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
    align: "right" as const,
  },
];

const demoRows = [
  {
    id: 1,
    name: "Sok Dara",
    email: "dara@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Rithy Phang",
    email: "rithy@example.com",
    role: "Manager",
    status: "pending",
  },
  {
    id: 3,
    name: "Nita Kim",
    email: "nita@example.com",
    role: "User",
    status: "blocked",
  },
];

const handleDemoAction = (action: string) => {
  toast.success("Action clicked", `You clicked ${action}.`);
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      title="UI Components"
      subtitle="Preview reusable components, colors, states, and dashboard UI patterns."
    >
      <template #actions>
        <AppButton
          variant="secondary"
          @click="toast.info('Refresh', 'UI preview refreshed.')"
        >
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton @click="demoModalOpen = true">
          <Plus class="h-4 w-4" />
          Open Modal
        </AppButton>
      </template>
    </PageHeader>

    <!-- Stats Cards -->
    <section class="space-y-4">
      <SectionHeader
        title="Stats Cards"
        subtitle="Dashboard summary cards with modern light and dark mode support."
      />

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="1,240"
          subtitle="All registered accounts"
          tone="info"
        >
          <template #badge>
            <AppBadge variant="info" tone="pastel" shape="square" size="md">
              <template #icon>
                <Users class="h-5 w-5" />
              </template>
            </AppBadge>
          </template>
        </StatsCard>

        <StatsCard
          title="Active Roles"
          value="18"
          subtitle="Access groups"
          tone="success"
        >
          <template #badge>
            <AppBadge variant="success" tone="pastel" shape="square" size="md">
              <template #icon>
                <ShieldCheck class="h-5 w-5" />
              </template>
            </AppBadge>
          </template>
        </StatsCard>

        <StatsCard
          title="Permissions"
          value="96"
          subtitle="Fine-grained controls"
          tone="warning"
        >
          <template #badge>
            <AppBadge variant="warning" tone="pastel" shape="square" size="md">
              <template #icon>
                <KeyRound class="h-5 w-5" />
              </template>
            </AppBadge>
          </template>
        </StatsCard>

        <StatsCard title="Alerts" value="4" subtitle="Need attention" tone="danger">
          <template #badge>
            <AppBadge variant="danger" tone="pastel" shape="square" size="md">
              <template #icon>
                <AlertCircle class="h-5 w-5" />
              </template>
            </AppBadge>
          </template>
        </StatsCard>
      </div>
    </section>

    <!-- Buttons -->
    <section class="motion-fade-up space-y-4">
      <SectionHeader
        title="Buttons"
        subtitle="Primary actions, secondary actions, danger actions, and loading states."
      />

      <div class="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div class="flex flex-wrap gap-3">
          <AppButton>
            <Plus class="h-4 w-4" />
            Primary
          </AppButton>

          <AppButton variant="secondary">
            <Settings class="h-4 w-4" />
            Secondary
          </AppButton>

          <AppButton variant="success">
            <CheckCircle2 class="h-4 w-4" />
            Success
          </AppButton>

          <AppButton variant="danger">
            <Trash2 class="h-4 w-4" />
            Danger
          </AppButton>

          <AppButton variant="ghost"> Ghost </AppButton>

          <AppButton loading> Saving </AppButton>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="motion-fade-up space-y-4">
      <SectionHeader
        title="Badges"
        subtitle="Pastel badges like product tags, user statuses, and role indicators."
      />

      <div class="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div class="flex flex-wrap gap-3">
          <AppBadge variant="success" tone="pastel" size="lg">
            <template #icon>
              <CheckCircle2 class="h-5 w-5" />
            </template>
            New Arrival
          </AppBadge>

          <AppBadge variant="danger" tone="pastel" size="lg">
            <template #icon>
              <AlertCircle class="h-5 w-5" />
            </template>
            Hot Item
          </AppBadge>

          <AppBadge variant="warning" tone="pastel" size="lg"> On Sale </AppBadge>

          <AppBadge variant="info" tone="pastel" size="lg"> Pro Access </AppBadge>

          <AppBadge variant="purple" tone="pastel" size="lg"> In Draft </AppBadge>

          <AppBadge variant="cyan" tone="pastel" size="lg"> Now Open </AppBadge>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <AppBadge variant="success" dot> Active </AppBadge>

          <AppBadge variant="warning" dot> Pending </AppBadge>

          <AppBadge variant="danger" dot> Blocked </AppBadge>

          <AppBadge variant="info" dot> Verified </AppBadge>
        </div>
      </div>
    </section>

    <!-- Forms -->
    <section class="motion-fade-up space-y-4">
      <SectionHeader title="Forms" subtitle="Inputs, selects, and textarea components." />

      <div class="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div class="grid gap-4 md:grid-cols-3">
          <AppInput v-model="inputValue" label="Name" placeholder="Enter name" />

          <AppSelect
            v-model="selectValue"
            label="Role"
            placeholder="Select role"
            :options="[
              { label: 'Admin', value: 'admin' },
              { label: 'Manager', value: 'manager' },
              { label: 'User', value: 'user' },
            ]"
          />

          <AppInput label="Email" placeholder="name@example.com" />
        </div>

        <div class="mt-4">
          <AppTextarea
            v-model="textareaValue"
            label="Description"
            placeholder="Write something..."
          />
        </div>
      </div>
    </section>

    <!-- Alerts -->
    <section class="motion-fade-up space-y-4">
      <SectionHeader
        title="Alerts"
        subtitle="Feedback states for success, errors, warnings, and information."
      />

      <div class="grid gap-4 lg:grid-cols-2">
        <AlertMessage
          type="success"
          title="Success"
          message="Your changes were saved successfully."
        />

        <AlertMessage
          type="error"
          title="Error"
          message="Something went wrong. Please try again."
        />

        <AlertMessage
          type="warning"
          title="Warning"
          message="This action requires attention before continuing."
        />

        <AlertMessage
          type="info"
          title="Information"
          message="This is a helpful message for the user."
        />
      </div>
    </section>

    <!-- Dropdown -->
    <section class="motion-fade-up space-y-4">
      <SectionHeader
        title="Dropdown"
        subtitle="Reusable AppDropdown for table actions and menus."
      />

      <div class="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <AppDropdown
          button-label="Actions"
          width="w-72"
          :items="[
            {
              label: 'View Details',
              value: 'view',
              icon: Eye,
              description: 'Open detail view',
            },
            {
              label: 'Edit Record',
              value: 'edit',
              icon: Pencil,
              description: 'Update this item',
            },
            {
              label: 'Download',
              value: 'download',
              icon: Download,
              variant: 'success',
              description: 'Download report',
            },
            {
              label: 'Delete',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              description: 'Remove this item',
            },
          ]"
          @select="handleDemoAction"
        />
      </div>
    </section>

    <!-- Data Table -->
    <section class="motion-fade-up space-y-4">
      <SectionHeader
        title="Data Table"
        subtitle="Table with slots, badges, dropdown actions, loading state, and empty state."
      />

      <DataTable
        :columns="demoColumns"
        :rows="demoRows"
        empty-title="No demo rows"
        empty-message="There are no records in this demo table."
      >
        <template #cell-name="{ row }">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-sm font-bold text-card-foreground"
            >
              {{ row.name.charAt(0) }}
            </div>

            <div>
              <p class="font-semibold text-card-foreground">
                {{ row.name }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ row.email }}
              </p>
            </div>
          </div>
        </template>

        <template #cell-role="{ row }">
          <AppBadge variant="info" tone="pastel">
            {{ row.role }}
          </AppBadge>
        </template>

        <template #cell-status="{ row }">
          <AppBadge
            :variant="
              row.status === 'active'
                ? 'success'
                : row.status === 'pending'
                ? 'warning'
                : 'danger'
            "
            tone="pastel"
            dot
          >
            {{ row.status }}
          </AppBadge>
        </template>

        <template #cell-actions="{ row }">
          <AppDropdown
            width="w-64"
            :items="[
              {
                label: 'View',
                value: 'view',
                icon: Eye,
              },
              {
                label: 'Edit',
                value: 'edit',
                icon: Pencil,
              },
              {
                label: 'Delete',
                value: 'delete',
                icon: Trash2,
                variant: 'danger',
              },
            ]"
            @select="handleDemoAction(`${$event} ${row.name}`)"
          />
        </template>
      </DataTable>
    </section>

    <!-- Modal -->
    <AppModal
      :open="demoModalOpen"
      title="Demo Modal"
      subtitle="This is a reusable modal component preview."
      size="md"
      @close="demoModalOpen = false"
    >
      <template #icon>
        <Bell class="h-5 w-5" />
      </template>

      <div class="space-y-4">
        <AlertMessage
          type="info"
          title="Modal content"
          message="Use AppModal for create, edit, delete, and confirmation workflows."
        />

        <AppInput label="Demo Input" placeholder="Type something..." />

        <div class="flex justify-end gap-3">
          <AppButton variant="secondary" @click="demoModalOpen = false">
            Cancel
          </AppButton>

          <AppButton @click="demoModalOpen = false"> Save </AppButton>
        </div>
      </div>
    </AppModal>
  </div>
</template>
