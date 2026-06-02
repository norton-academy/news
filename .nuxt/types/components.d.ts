
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
  ImportPermissionModal: typeof import("../../app/components/permissions/ImportPermissionModal.vue")['default']
  BreakingTicker: typeof import("../../app/components/public/BreakingTicker.vue")['default']
  EmptyState: typeof import("../../app/components/public/EmptyState.vue")['default']
  FeaturedHeroGrid: typeof import("../../app/components/public/FeaturedHeroGrid.vue")['default']
  Navbar: typeof import("../../app/components/public/Navbar.vue")['default']
  NewsSidebar: typeof import("../../app/components/public/NewsSidebar.vue")['default']
  PublicCategoryPage: typeof import("../../app/components/public/PublicCategoryPage.vue")['default']
  SiteFooter: typeof import("../../app/components/public/SiteFooter.vue")['default']
  SiteHeader: typeof import("../../app/components/public/SiteHeader.vue")['default']
  AiSummaryBox: typeof import("../../app/components/public/article/AiSummaryBox.vue")['default']
  ArticleAdvertisementCard: typeof import("../../app/components/public/article/ArticleAdvertisementCard.vue")['default']
  ArticleHeader: typeof import("../../app/components/public/article/ArticleHeader.vue")['default']
  ArticleSidebar: typeof import("../../app/components/public/article/ArticleSidebar.vue")['default']
  MoreFromSourceCard: typeof import("../../app/components/public/article/MoreFromSourceCard.vue")['default']
  PopularArticlesCard: typeof import("../../app/components/public/article/PopularArticlesCard.vue")['default']
  RelatedArticles: typeof import("../../app/components/public/article/RelatedArticles.vue")['default']
  ShareBar: typeof import("../../app/components/public/article/ShareBar.vue")['default']
  TelegramJoinCard: typeof import("../../app/components/public/article/TelegramJoinCard.vue")['default']
  AdvertisementCard: typeof import("../../app/components/public/home/AdvertisementCard.vue")['default']
  CategoryNewsSection: typeof import("../../app/components/public/home/CategoryNewsSection.vue")['default']
  FeaturedNewsGrid: typeof import("../../app/components/public/home/FeaturedNewsGrid.vue")['default']
  HeroNewsSection: typeof import("../../app/components/public/home/HeroNewsSection.vue")['default']
  HomeSidebar: typeof import("../../app/components/public/home/HomeSidebar.vue")['default']
  HomeSkeleton: typeof import("../../app/components/public/home/HomeSkeleton.vue")['default']
  LatestNewsList: typeof import("../../app/components/public/home/LatestNewsList.vue")['default']
  ProvinceFilter: typeof import("../../app/components/public/home/ProvinceFilter.vue")['default']
  SourceToggleCard: typeof import("../../app/components/public/home/SourceToggleCard.vue")['default']
  TopAdvertisement: typeof import("../../app/components/public/home/TopAdvertisement.vue")['default']
  TrendingCard: typeof import("../../app/components/public/home/TrendingCard.vue")['default']
  WeatherCard: typeof import("../../app/components/public/home/WeatherCard.vue")['default']
  ArticleListPage: typeof import("../../app/components/public/listing/ArticleListPage.vue")['default']
  AssignRolePermissionsModal: typeof import("../../app/components/roles/AssignRolePermissionsModal.vue")['default']
  CloneRoleModal: typeof import("../../app/components/roles/CloneRoleModal.vue")['default']
  ImportRoleModal: typeof import("../../app/components/roles/ImportRoleModal.vue")['default']
  DashboardPageMotion: typeof import("../../app/components/transition/DashboardPageMotion.vue")['default']
  MotionCard: typeof import("../../app/components/transition/MotionCard.vue")['default']
  ActionDropdown: typeof import("../../app/components/ui/ActionDropdown.vue")['default']
  AlertMessage: typeof import("../../app/components/ui/AlertMessage.vue")['default']
  AppBadge: typeof import("../../app/components/ui/AppBadge.vue")['default']
  AppButton: typeof import("../../app/components/ui/AppButton.vue")['default']
  AppCard: typeof import("../../app/components/ui/AppCard.vue")['default']
  AppDropdown: typeof import("../../app/components/ui/AppDropdown.vue")['default']
  AppInput: typeof import("../../app/components/ui/AppInput.vue")['default']
  AppModal: typeof import("../../app/components/ui/AppModal.vue")['default']
  AppSelect: typeof import("../../app/components/ui/AppSelect.vue")['default']
  AppTextarea: typeof import("../../app/components/ui/AppTextarea.vue")['default']
  ConfirmDialog: typeof import("../../app/components/ui/ConfirmDialog.vue")['default']
  DataTable: typeof import("../../app/components/ui/DataTable.vue")['default']
  FilterBar: typeof import("../../app/components/ui/FilterBar.vue")['default']
  OtpInput: typeof import("../../app/components/ui/OtpInput.vue")['default']
  PageHeader: typeof import("../../app/components/ui/PageHeader.vue")['default']
  PageLoadingBar: typeof import("../../app/components/ui/PageLoadingBar.vue")['default']
  PageSkeleton: typeof import("../../app/components/ui/PageSkeleton.vue")['default']
  SectionHeader: typeof import("../../app/components/ui/SectionHeader.vue")['default']
  StatsCard: typeof import("../../app/components/ui/StatsCard.vue")['default']
  TablePagination: typeof import("../../app/components/ui/TablePagination.vue")['default']
  ThemeToggle: typeof import("../../app/components/ui/ThemeToggle.vue")['default']
  ToastContainer: typeof import("../../app/components/ui/ToastContainer.vue")['default']
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
  LazyImportPermissionModal: LazyComponent<typeof import("../../app/components/permissions/ImportPermissionModal.vue")['default']>
  LazyBreakingTicker: LazyComponent<typeof import("../../app/components/public/BreakingTicker.vue")['default']>
  LazyEmptyState: LazyComponent<typeof import("../../app/components/public/EmptyState.vue")['default']>
  LazyFeaturedHeroGrid: LazyComponent<typeof import("../../app/components/public/FeaturedHeroGrid.vue")['default']>
  LazyNavbar: LazyComponent<typeof import("../../app/components/public/Navbar.vue")['default']>
  LazyNewsSidebar: LazyComponent<typeof import("../../app/components/public/NewsSidebar.vue")['default']>
  LazyPublicCategoryPage: LazyComponent<typeof import("../../app/components/public/PublicCategoryPage.vue")['default']>
  LazySiteFooter: LazyComponent<typeof import("../../app/components/public/SiteFooter.vue")['default']>
  LazySiteHeader: LazyComponent<typeof import("../../app/components/public/SiteHeader.vue")['default']>
  LazyAiSummaryBox: LazyComponent<typeof import("../../app/components/public/article/AiSummaryBox.vue")['default']>
  LazyArticleAdvertisementCard: LazyComponent<typeof import("../../app/components/public/article/ArticleAdvertisementCard.vue")['default']>
  LazyArticleHeader: LazyComponent<typeof import("../../app/components/public/article/ArticleHeader.vue")['default']>
  LazyArticleSidebar: LazyComponent<typeof import("../../app/components/public/article/ArticleSidebar.vue")['default']>
  LazyMoreFromSourceCard: LazyComponent<typeof import("../../app/components/public/article/MoreFromSourceCard.vue")['default']>
  LazyPopularArticlesCard: LazyComponent<typeof import("../../app/components/public/article/PopularArticlesCard.vue")['default']>
  LazyRelatedArticles: LazyComponent<typeof import("../../app/components/public/article/RelatedArticles.vue")['default']>
  LazyShareBar: LazyComponent<typeof import("../../app/components/public/article/ShareBar.vue")['default']>
  LazyTelegramJoinCard: LazyComponent<typeof import("../../app/components/public/article/TelegramJoinCard.vue")['default']>
  LazyAdvertisementCard: LazyComponent<typeof import("../../app/components/public/home/AdvertisementCard.vue")['default']>
  LazyCategoryNewsSection: LazyComponent<typeof import("../../app/components/public/home/CategoryNewsSection.vue")['default']>
  LazyFeaturedNewsGrid: LazyComponent<typeof import("../../app/components/public/home/FeaturedNewsGrid.vue")['default']>
  LazyHeroNewsSection: LazyComponent<typeof import("../../app/components/public/home/HeroNewsSection.vue")['default']>
  LazyHomeSidebar: LazyComponent<typeof import("../../app/components/public/home/HomeSidebar.vue")['default']>
  LazyHomeSkeleton: LazyComponent<typeof import("../../app/components/public/home/HomeSkeleton.vue")['default']>
  LazyLatestNewsList: LazyComponent<typeof import("../../app/components/public/home/LatestNewsList.vue")['default']>
  LazyProvinceFilter: LazyComponent<typeof import("../../app/components/public/home/ProvinceFilter.vue")['default']>
  LazySourceToggleCard: LazyComponent<typeof import("../../app/components/public/home/SourceToggleCard.vue")['default']>
  LazyTopAdvertisement: LazyComponent<typeof import("../../app/components/public/home/TopAdvertisement.vue")['default']>
  LazyTrendingCard: LazyComponent<typeof import("../../app/components/public/home/TrendingCard.vue")['default']>
  LazyWeatherCard: LazyComponent<typeof import("../../app/components/public/home/WeatherCard.vue")['default']>
  LazyArticleListPage: LazyComponent<typeof import("../../app/components/public/listing/ArticleListPage.vue")['default']>
  LazyAssignRolePermissionsModal: LazyComponent<typeof import("../../app/components/roles/AssignRolePermissionsModal.vue")['default']>
  LazyCloneRoleModal: LazyComponent<typeof import("../../app/components/roles/CloneRoleModal.vue")['default']>
  LazyImportRoleModal: LazyComponent<typeof import("../../app/components/roles/ImportRoleModal.vue")['default']>
  LazyDashboardPageMotion: LazyComponent<typeof import("../../app/components/transition/DashboardPageMotion.vue")['default']>
  LazyMotionCard: LazyComponent<typeof import("../../app/components/transition/MotionCard.vue")['default']>
  LazyActionDropdown: LazyComponent<typeof import("../../app/components/ui/ActionDropdown.vue")['default']>
  LazyAlertMessage: LazyComponent<typeof import("../../app/components/ui/AlertMessage.vue")['default']>
  LazyAppBadge: LazyComponent<typeof import("../../app/components/ui/AppBadge.vue")['default']>
  LazyAppButton: LazyComponent<typeof import("../../app/components/ui/AppButton.vue")['default']>
  LazyAppCard: LazyComponent<typeof import("../../app/components/ui/AppCard.vue")['default']>
  LazyAppDropdown: LazyComponent<typeof import("../../app/components/ui/AppDropdown.vue")['default']>
  LazyAppInput: LazyComponent<typeof import("../../app/components/ui/AppInput.vue")['default']>
  LazyAppModal: LazyComponent<typeof import("../../app/components/ui/AppModal.vue")['default']>
  LazyAppSelect: LazyComponent<typeof import("../../app/components/ui/AppSelect.vue")['default']>
  LazyAppTextarea: LazyComponent<typeof import("../../app/components/ui/AppTextarea.vue")['default']>
  LazyConfirmDialog: LazyComponent<typeof import("../../app/components/ui/ConfirmDialog.vue")['default']>
  LazyDataTable: LazyComponent<typeof import("../../app/components/ui/DataTable.vue")['default']>
  LazyFilterBar: LazyComponent<typeof import("../../app/components/ui/FilterBar.vue")['default']>
  LazyOtpInput: LazyComponent<typeof import("../../app/components/ui/OtpInput.vue")['default']>
  LazyPageHeader: LazyComponent<typeof import("../../app/components/ui/PageHeader.vue")['default']>
  LazyPageLoadingBar: LazyComponent<typeof import("../../app/components/ui/PageLoadingBar.vue")['default']>
  LazyPageSkeleton: LazyComponent<typeof import("../../app/components/ui/PageSkeleton.vue")['default']>
  LazySectionHeader: LazyComponent<typeof import("../../app/components/ui/SectionHeader.vue")['default']>
  LazyStatsCard: LazyComponent<typeof import("../../app/components/ui/StatsCard.vue")['default']>
  LazyTablePagination: LazyComponent<typeof import("../../app/components/ui/TablePagination.vue")['default']>
  LazyThemeToggle: LazyComponent<typeof import("../../app/components/ui/ThemeToggle.vue")['default']>
  LazyToastContainer: LazyComponent<typeof import("../../app/components/ui/ToastContainer.vue")['default']>
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
