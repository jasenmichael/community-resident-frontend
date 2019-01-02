<template>
  <div>
    <!-- <h6>component files/index.vue</h6>
    <h6>nuxt path: {{ $nuxt.$route.path }}</h6>
    <h6>CRUMBS <br> {{ crumbs }}</h6>
    <h6>FILES <br> {{ $nuxt.$route.path.replace(/\//g, "_").replace("_", "").replace(/_+$/, "") }} -- {{ getFiles() }}</h6> -->
    <div v-if="files">
      <crumbsomponent :crumbs="crumbs"/>
      <directorylisting
        v-if="files" 
        :files="computedFiles"
        class="list"
        transition="fade-transition"
      />
      <!-- <pre>{{ files }}</pre> -->
    </div>
    <div v-else>{{ $nuxt.$router.push($nuxt.$route.path) }}</div>
  </div>
</template>

<script>
import crumbsomponent from '~/components/BreadcrumbsComponent.vue'
import directorylisting from '~/components/DirectoryListing.vue'
// import {config} from '~/package.json'

export default {
  layout: 'index',
  components: {
    crumbsomponent,
    directorylisting
  },
  data() {
    return {
      id: this.$store.state.id,
      uuid: this.$store.state.uuid,
      token: this.$store.state.token,
      crumbs: (this.getCrumbs()),
      files: (this.getFiles()),
    }
  },
  computed: {
    // isLoggedIn(){
    //   return this.$store.state.token
    // },
    pathUpdate: function(){
      return $nuxt.$route.path
    },
    computedCrumbs: function(){  
      return this.getCrumbs
    },
    computedFiles: function(){
      let files = this.$store.state.directories[$nuxt.$route.path.replace(/\//g, "_").replace("_", "").replace(/_+$/, "")]
      return files.directories.concat(files.files)
    }
  },
  beforeCreate() {
    if(!this.$store.state.id || !this.$store.state.uuid || !this.$store.state.token){
      $nuxt.$router.push('/login')
    } 
    else {
      this.crumbs = this.getCrumbs
      this.files = this.getFiles
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
    },
    getFiles: function(){
      let files = this.$store.state.directories[$nuxt.$route.path.replace(/\//g, "_").replace("_", "").replace(/_+$/, "")]
      return files.directories.concat(files.files)
    }
  }
}
</script>

<style>
  .list{
    margin-top: -2.5rem;
  }
</style>
