// 帮我88888程序

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Part-Blog-System',
    htmlAttrs: {
      lang: 'cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '我是描述' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://test.glumi.cn/api'
    }
  },
  // extractCSS: process.env.NODE_ENV === 'production',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/global.css',
    'part-animator/PartAnimator.css',
    'highlight.js/styles/xcode.css'
  ],
  loading: '~/components/LoadingBar.vue',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/route',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'hyperdown',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
