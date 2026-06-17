// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { 'enabled': true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Noto Sans Khmer': [400, 500, 700],
      Battambang: [400, 700]
    },
    display: 'swap'
  },

  nitro: {
    preset: 'netlify-edge'
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api',
    },
  },

  ssr: false,
  components: [{ path: '~/components', pathPrefix: false }],
})
