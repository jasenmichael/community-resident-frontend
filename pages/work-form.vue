<template>
  <h5>yo</h5>
</template>



<script>
import crumbsomponent from '~/components/BreadcrumbsComponent.vue'

export default {
  layout: 'index',
  components: {
    crumbsomponent
  },
  data() {
    return {
      id: this.$store.state.id,
      uuid: this.$store.state.uuid,
      token: this.$store.state.token,
      crumbs: (this.getCrumbs()),
    }
  },
  computed: {},
  beforeCreate() {
    if(!this.$store.state.id || !this.$store.state.uuid || !this.$store.state.token){
      $nuxt.$router.push('/login')
    } 
    else {
      this.crumbs = this.getCrumbs
    }
  },
  methods: {
    getCrumbs: () => {
      let crumbs = []
      let path = $nuxt.$route.path.substr(1).split("/")
          // let prefix = "" + config.baseDIR
          let prefix = ""
          path.forEach((crumb, i) => {
            // console.log('computed crumb--', i)
            crumbs.push({
                text: crumb.toUpperCase(),
                disabled: (i +1 == path.length) ? true : false,
                href: prefix + '/' + crumb
          })
          prefix = prefix + '/' + crumb
          // console.log('PREFIX=>>', prefix)
      })
      return crumbs    
    }
  }
}
</script>