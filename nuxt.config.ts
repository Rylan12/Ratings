// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt'],
  css: [
    'assets/css/main.css',
    // Needed for the "hidden-sm-and-down" and "hidden-md-and-up" classes
    // https://element-plus.org/en-US/component/layout#utility-classes-for-hiding-elements
    'element-plus/theme-chalk/display.css',
  ],
})
