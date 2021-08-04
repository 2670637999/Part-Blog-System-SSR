// 帮我88888程序

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '陈陈菌博客',
    htmlAttrs: {
      lang: 'cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords',name: 'keywords',content: '陈陈菌博客' },
      { hid: 'description', name: 'description', content: '技术、学习、笔记。1名电脑技术爱好者的个人博客，不定期更新记录一些技术学习相关的笔记和内容。' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://api.glumi.cn/api'
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
    'hyperdown'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
