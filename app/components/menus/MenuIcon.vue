<script setup lang="ts">
import {
  Activity,
  BarChart3,
  Bell,
  Component,
  Database,
  FileText,
  Gauge,
  Home,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  PanelTop,
  ScrollText,
  Settings,
  ShieldCheck,
  User,
  UserCog,
  Users,
  Package,
} from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    name?: string | null;
    size?: string;
  }>(),
  {
    name: "LayoutDashboard",
    size: "h-5 w-5",
  }
);

const iconMap: Record<string, any> = {
  Activity,
  BarChart3,
  Bell,
  Component,
  Database,
  FileText,
  Gauge,
  Home,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  PanelTop,
  ScrollText,
  Settings,
  ShieldCheck,
  User,
  UserCog,
  Users,
  Package,
};

const iconComponent = computed(() => {
  if (!props.name) return LayoutDashboard;

  return iconMap[props.name] || LayoutDashboard;
});
</script>

<template>
  <component :is="iconComponent" :class="size" />
</template>
