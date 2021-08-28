export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'part-animator/PartAnimator.css',
    'highlight.js/styles/vs2015.css',
    '~/static/global.css',
    '~/static/css/font-awesome.min.css'
  ],
  loading: '~/components/LoadingBar.vue',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/route',
    '~/plugins/typed'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins:[
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  }
}
