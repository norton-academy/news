
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AppRefreshingIndicator: typeof import("../../app/components/AppRefreshingIndicator.vue")['default']
  ArticleForm: typeof import("../../app/components/admin/articles/ArticleForm.vue")['default']
  ActionDropdown: typeof import("../../app/components/app/ActionDropdown.vue")['default']
  AlertMessage: typeof import("../../app/components/app/AlertMessage.vue")['default']
  AppBadge: typeof import("../../app/components/app/AppBadge.vue")['default']
  AppButton: typeof import("../../app/components/app/AppButton.vue")['default']
  AppCard: typeof import("../../app/components/app/AppCard.vue")['default']
  AppDropdown: typeof import("../../app/components/app/AppDropdown.vue")['default']
  AppInput: typeof import("../../app/components/app/AppInput.vue")['default']
  AppModal: typeof import("../../app/components/app/AppModal.vue")['default']
  AppSelect: typeof import("../../app/components/app/AppSelect.vue")['default']
  AppTextarea: typeof import("../../app/components/app/AppTextarea.vue")['default']
  ConfirmDialog: typeof import("../../app/components/app/ConfirmDialog.vue")['default']
  DataTable: typeof import("../../app/components/app/DataTable.vue")['default']
  EmptyState: typeof import("../../app/components/app/EmptyState.vue")['default']
  FilterBar: typeof import("../../app/components/app/FilterBar.vue")['default']
  OtpInput: typeof import("../../app/components/app/OtpInput.vue")['default']
  PageHeader: typeof import("../../app/components/app/PageHeader.vue")['default']
  PageLoadingBar: typeof import("../../app/components/app/PageLoadingBar.vue")['default']
  PageSkeleton: typeof import("../../app/components/app/PageSkeleton.vue")['default']
  SectionHeader: typeof import("../../app/components/app/SectionHeader.vue")['default']
  StatsCard: typeof import("../../app/components/app/StatsCard.vue")['default']
  TablePagination: typeof import("../../app/components/app/TablePagination.vue")['default']
  ToastContainer: typeof import("../../app/components/app/ToastContainer.vue")['default']
  AuthButton: typeof import("../../app/components/auth/AuthButton.vue")['default']
  AuthCard: typeof import("../../app/components/auth/AuthCard.vue")['default']
  AuthInput: typeof import("../../app/components/auth/AuthInput.vue")['default']
  AdminShell: typeof import("../../app/components/dashboard/AdminShell.vue")['default']
  AppBreadcrumbs: typeof import("../../app/components/dashboard/AppBreadcrumbs.vue")['default']
  AppHeader: typeof import("../../app/components/dashboard/AppHeader.vue")['default']
  AppShell: typeof import("../../app/components/dashboard/AppShell.vue")['default']
  AppSidebar: typeof import("../../app/components/dashboard/AppSidebar.vue")['default']
  CommandPalette: typeof import("../../app/components/dashboard/CommandPalette.vue")['default']
  NotificationDropdown: typeof import("../../app/components/dashboard/NotificationDropdown.vue")['default']
  UserDropdown: typeof import("../../app/components/dashboard/UserDropdown.vue")['default']
  DeleteMenuModal: typeof import("../../app/components/menus/DeleteMenuModal.vue")['default']
  MenuFormModal: typeof import("../../app/components/menus/MenuFormModal.vue")['default']
  MenuIcon: typeof import("../../app/components/menus/MenuIcon.vue")['default']
  ArticleCard: typeof import("../../app/components/news/ArticleCard.vue")['default']
  ArticleEmptyState: typeof import("../../app/components/news/ArticleEmptyState.vue")['default']
  BreakingNewsBanner: typeof import("../../app/components/news/BreakingNewsBanner.vue")['default']
  FeaturedArticleCard: typeof import("../../app/components/news/FeaturedArticleCard.vue")['default']
  FeaturedArticleHeroCard: typeof import("../../app/components/news/FeaturedArticleHeroCard.vue")['default']
  FeedFilterTabs: typeof import("../../app/components/news/FeedFilterTabs.vue")['default']
  NewArticleCard: typeof import("../../app/components/news/NewArticleCard.vue")['default']
  NewBreakingBanner: typeof import("../../app/components/news/NewBreakingBanner.vue")['default']
  NewEmptyState: typeof import("../../app/components/news/NewEmptyState.vue")['default']
  NewHeroCard: typeof import("../../app/components/news/NewHeroCard.vue")['default']
  NewSidebar: typeof import("../../app/components/news/NewSidebar.vue")['default']
  NewsSidebar: typeof import("../../app/components/news/NewsSidebar.vue")['default']
  ImportPermissionModal: typeof import("../../app/components/permissions/ImportPermissionModal.vue")['default']
  PublicFooter: typeof import("../../app/components/public/PublicFooter.vue")['default']
  PublicHeader: typeof import("../../app/components/public/PublicHeader.vue")['default']
  PublicSearchOverlay: typeof import("../../app/components/public/PublicSearchOverlay.vue")['default']
  AssignRolePermissionsModal: typeof import("../../app/components/roles/AssignRolePermissionsModal.vue")['default']
  CloneRoleModal: typeof import("../../app/components/roles/CloneRoleModal.vue")['default']
  ImportRoleModal: typeof import("../../app/components/roles/ImportRoleModal.vue")['default']
  DashboardPageMotion: typeof import("../../app/components/transition/DashboardPageMotion.vue")['default']
  MotionCard: typeof import("../../app/components/transition/MotionCard.vue")['default']
  Avatar: typeof import("../../app/components/ui/Avatar.vue")['default']
  Button: typeof import("../../app/components/ui/Button.vue")['default']
  Drawer: typeof import("../../app/components/ui/Drawer.vue")['default']
  Dropdown: typeof import("../../app/components/ui/Dropdown.vue")['default']
  DropdownItem: typeof import("../../app/components/ui/DropdownItem.vue")['default']
  IconButton: typeof import("../../app/components/ui/IconButton.vue")['default']
  Logo: typeof import("../../app/components/ui/Logo.vue")['default']
  SearchInput: typeof import("../../app/components/ui/SearchInput.vue")['default']
  Separator: typeof import("../../app/components/ui/Separator.vue")['default']
  Sidebar: typeof import("../../app/components/ui/Sidebar.vue")['default']
  Skeleton: typeof import("../../app/components/ui/Skeleton.vue")['default']
  ThemeToggle: typeof import("../../app/components/ui/ThemeToggle.vue")['default']
  CreateUserModal: typeof import("../../app/components/users/CreateUserModal.vue")['default']
  DeleteUserModal: typeof import("../../app/components/users/DeleteUserModal.vue")['default']
  EditUserModal: typeof import("../../app/components/users/EditUserModal.vue")['default']
  UserStatusBadge: typeof import("../../app/components/users/UserStatusBadge.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAppRefreshingIndicator: LazyComponent<typeof import("../../app/components/AppRefreshingIndicator.vue")['default']>
  LazyArticleForm: LazyComponent<typeof import("../../app/components/admin/articles/ArticleForm.vue")['default']>
  LazyActionDropdown: LazyComponent<typeof import("../../app/components/app/ActionDropdown.vue")['default']>
  LazyAlertMessage: LazyComponent<typeof import("../../app/components/app/AlertMessage.vue")['default']>
  LazyAppBadge: LazyComponent<typeof import("../../app/components/app/AppBadge.vue")['default']>
  LazyAppButton: LazyComponent<typeof import("../../app/components/app/AppButton.vue")['default']>
  LazyAppCard: LazyComponent<typeof import("../../app/components/app/AppCard.vue")['default']>
  LazyAppDropdown: LazyComponent<typeof import("../../app/components/app/AppDropdown.vue")['default']>
  LazyAppInput: LazyComponent<typeof import("../../app/components/app/AppInput.vue")['default']>
  LazyAppModal: LazyComponent<typeof import("../../app/components/app/AppModal.vue")['default']>
  LazyAppSelect: LazyComponent<typeof import("../../app/components/app/AppSelect.vue")['default']>
  LazyAppTextarea: LazyComponent<typeof import("../../app/components/app/AppTextarea.vue")['default']>
  LazyConfirmDialog: LazyComponent<typeof import("../../app/components/app/ConfirmDialog.vue")['default']>
  LazyDataTable: LazyComponent<typeof import("../../app/components/app/DataTable.vue")['default']>
  LazyEmptyState: LazyComponent<typeof import("../../app/components/app/EmptyState.vue")['default']>
  LazyFilterBar: LazyComponent<typeof import("../../app/components/app/FilterBar.vue")['default']>
  LazyOtpInput: LazyComponent<typeof import("../../app/components/app/OtpInput.vue")['default']>
  LazyPageHeader: LazyComponent<typeof import("../../app/components/app/PageHeader.vue")['default']>
  LazyPageLoadingBar: LazyComponent<typeof import("../../app/components/app/PageLoadingBar.vue")['default']>
  LazyPageSkeleton: LazyComponent<typeof import("../../app/components/app/PageSkeleton.vue")['default']>
  LazySectionHeader: LazyComponent<typeof import("../../app/components/app/SectionHeader.vue")['default']>
  LazyStatsCard: LazyComponent<typeof import("../../app/components/app/StatsCard.vue")['default']>
  LazyTablePagination: LazyComponent<typeof import("../../app/components/app/TablePagination.vue")['default']>
  LazyToastContainer: LazyComponent<typeof import("../../app/components/app/ToastContainer.vue")['default']>
  LazyAuthButton: LazyComponent<typeof import("../../app/components/auth/AuthButton.vue")['default']>
  LazyAuthCard: LazyComponent<typeof import("../../app/components/auth/AuthCard.vue")['default']>
  LazyAuthInput: LazyComponent<typeof import("../../app/components/auth/AuthInput.vue")['default']>
  LazyAdminShell: LazyComponent<typeof import("../../app/components/dashboard/AdminShell.vue")['default']>
  LazyAppBreadcrumbs: LazyComponent<typeof import("../../app/components/dashboard/AppBreadcrumbs.vue")['default']>
  LazyAppHeader: LazyComponent<typeof import("../../app/components/dashboard/AppHeader.vue")['default']>
  LazyAppShell: LazyComponent<typeof import("../../app/components/dashboard/AppShell.vue")['default']>
  LazyAppSidebar: LazyComponent<typeof import("../../app/components/dashboard/AppSidebar.vue")['default']>
  LazyCommandPalette: LazyComponent<typeof import("../../app/components/dashboard/CommandPalette.vue")['default']>
  LazyNotificationDropdown: LazyComponent<typeof import("../../app/components/dashboard/NotificationDropdown.vue")['default']>
  LazyUserDropdown: LazyComponent<typeof import("../../app/components/dashboard/UserDropdown.vue")['default']>
  LazyDeleteMenuModal: LazyComponent<typeof import("../../app/components/menus/DeleteMenuModal.vue")['default']>
  LazyMenuFormModal: LazyComponent<typeof import("../../app/components/menus/MenuFormModal.vue")['default']>
  LazyMenuIcon: LazyComponent<typeof import("../../app/components/menus/MenuIcon.vue")['default']>
  LazyArticleCard: LazyComponent<typeof import("../../app/components/news/ArticleCard.vue")['default']>
  LazyArticleEmptyState: LazyComponent<typeof import("../../app/components/news/ArticleEmptyState.vue")['default']>
  LazyBreakingNewsBanner: LazyComponent<typeof import("../../app/components/news/BreakingNewsBanner.vue")['default']>
  LazyFeaturedArticleCard: LazyComponent<typeof import("../../app/components/news/FeaturedArticleCard.vue")['default']>
  LazyFeaturedArticleHeroCard: LazyComponent<typeof import("../../app/components/news/FeaturedArticleHeroCard.vue")['default']>
  LazyFeedFilterTabs: LazyComponent<typeof import("../../app/components/news/FeedFilterTabs.vue")['default']>
  LazyNewArticleCard: LazyComponent<typeof import("../../app/components/news/NewArticleCard.vue")['default']>
  LazyNewBreakingBanner: LazyComponent<typeof import("../../app/components/news/NewBreakingBanner.vue")['default']>
  LazyNewEmptyState: LazyComponent<typeof import("../../app/components/news/NewEmptyState.vue")['default']>
  LazyNewHeroCard: LazyComponent<typeof import("../../app/components/news/NewHeroCard.vue")['default']>
  LazyNewSidebar: LazyComponent<typeof import("../../app/components/news/NewSidebar.vue")['default']>
  LazyNewsSidebar: LazyComponent<typeof import("../../app/components/news/NewsSidebar.vue")['default']>
  LazyImportPermissionModal: LazyComponent<typeof import("../../app/components/permissions/ImportPermissionModal.vue")['default']>
  LazyPublicFooter: LazyComponent<typeof import("../../app/components/public/PublicFooter.vue")['default']>
  LazyPublicHeader: LazyComponent<typeof import("../../app/components/public/PublicHeader.vue")['default']>
  LazyPublicSearchOverlay: LazyComponent<typeof import("../../app/components/public/PublicSearchOverlay.vue")['default']>
  LazyAssignRolePermissionsModal: LazyComponent<typeof import("../../app/components/roles/AssignRolePermissionsModal.vue")['default']>
  LazyCloneRoleModal: LazyComponent<typeof import("../../app/components/roles/CloneRoleModal.vue")['default']>
  LazyImportRoleModal: LazyComponent<typeof import("../../app/components/roles/ImportRoleModal.vue")['default']>
  LazyDashboardPageMotion: LazyComponent<typeof import("../../app/components/transition/DashboardPageMotion.vue")['default']>
  LazyMotionCard: LazyComponent<typeof import("../../app/components/transition/MotionCard.vue")['default']>
  LazyAvatar: LazyComponent<typeof import("../../app/components/ui/Avatar.vue")['default']>
  LazyButton: LazyComponent<typeof import("../../app/components/ui/Button.vue")['default']>
  LazyDrawer: LazyComponent<typeof import("../../app/components/ui/Drawer.vue")['default']>
  LazyDropdown: LazyComponent<typeof import("../../app/components/ui/Dropdown.vue")['default']>
  LazyDropdownItem: LazyComponent<typeof import("../../app/components/ui/DropdownItem.vue")['default']>
  LazyIconButton: LazyComponent<typeof import("../../app/components/ui/IconButton.vue")['default']>
  LazyLogo: LazyComponent<typeof import("../../app/components/ui/Logo.vue")['default']>
  LazySearchInput: LazyComponent<typeof import("../../app/components/ui/SearchInput.vue")['default']>
  LazySeparator: LazyComponent<typeof import("../../app/components/ui/Separator.vue")['default']>
  LazySidebar: LazyComponent<typeof import("../../app/components/ui/Sidebar.vue")['default']>
  LazySkeleton: LazyComponent<typeof import("../../app/components/ui/Skeleton.vue")['default']>
  LazyThemeToggle: LazyComponent<typeof import("../../app/components/ui/ThemeToggle.vue")['default']>
  LazyCreateUserModal: LazyComponent<typeof import("../../app/components/users/CreateUserModal.vue")['default']>
  LazyDeleteUserModal: LazyComponent<typeof import("../../app/components/users/DeleteUserModal.vue")['default']>
  LazyEditUserModal: LazyComponent<typeof import("../../app/components/users/EditUserModal.vue")['default']>
  LazyUserStatusBadge: LazyComponent<typeof import("../../app/components/users/UserStatusBadge.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
