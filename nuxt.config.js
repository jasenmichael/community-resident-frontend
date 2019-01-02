const pkg = require('./package')
const {getRoutes} = require('./generate-routes/index.js')

module.exports = {
  mode: 'spa',

  router: {
    // base: '/new-gb-resident/'
    base: `/${pkg.config.baseDIR}/`
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: "GB Resident",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Greenbriar Community Resident Portal" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  loading: {
    color: 'primary',
    height: '8px'
  },
  // loading: '~/components/LoadingComponent.vue',
  css: [
    '~/assets/style/app.styl'
  ],
  plugins: [
    '@/plugins/vuetify',
    // { src: '~/plugins/vuex-persist', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/proxy',
    ['nuxt-material-design-icons'],
    'nuxt-robots-module',
  ],
  'nuxt-robots-module': [
    {
      UserAgent: '*',
      Disallow: '/',
    },
  ],
  axios: {
    // baseURL: 'https://10.14.72.245/new-gb-resident/',
    baseURL: `${pkg.config.devAPI}/${pkg.config.baseDIR}`,
    https: true,
    credentials: false,
  },
  generate: {
    routes: getRoutes
  },
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}