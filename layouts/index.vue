<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      disable-resize-watcher="disable-resize-watcher"
      disable-route-watcher="disable-route-watcher"
      hide-overlay="hide-overlay"
      stateless="stateless"
      app
      dark
      floating="floating"
      width="340"
      class="primary darken-1 body-2">

      <!-- top nav drawer list -->
      <v-list class="info--text mb-0 pb-0 mt-0 pt-0">

        <!-- user and logout -->
        <v-list
          two-line
          subheader
          class="hidden-md-and-up mb-0 pb-0 mt-0 pt-0">
          
          <v-subheader
            class="teal--text text--accent-1 mb-0 font-weight-bold">
            <v-icon class="pink--text text--lighten-3 mr-1">person</v-icon>
            Welcome {{ user.toUpperCase() }}
          </v-subheader>

          <v-btn
            block
            small
            flat
            @click="logoutModal=true">
            <span class="caption">signout</span>
            <v-icon right>exit_to_app</v-icon>
          </v-btn>

        </v-list>

        <!-- home link -->
        <v-list-tile
          exact
          router
          to="/"
          @click="closeIfSmall">
          <v-list-tile-content>
            <v-list-tile-title class="red--text">
              <v-icon class="green--text text--accent-2 mr-2">home</v-icon>
              Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- documents/resident-archives drawer list group  -->
        <v-list-group
          :value="loaded"
          class="secondary--text text--darken--5 ">
          <v-list-tile slot="activator">
            <v-list-tile-title>
              <v-icon class="cyan--text text--lighten-3 mr-2">attach_file</v-icon>
              Documents
            </v-list-tile-title>
          </v-list-tile>

          <!-- top docs -->
          <!-- gb policies -->
          <v-list-tile href="http://10.14.72.245/files/documents/gb-policies.pdf">
            <!-- <v-list-tile-action>
              <v-icon class="white--text">picture_as_pdf</v-icon>
            </v-list-tile-action> -->
            <v-list-tile-content class="ml-2">
              <v-list-tile-title
                class="purple--text text--lighten-4 ml-5 mr-0"
                v-text="'Greenbriar Policies'" />
            </v-list-tile-content>
            <v-icon
              left
              class="white--text mr-5">picture_as_pdf</v-icon>
          </v-list-tile>

          <!-- resident agreement -->
          <v-list-tile href="http://10.14.72.245/files/documents/gb-resident-agreement.pdf">
            <!-- <v-list-tile-action>
              <v-icon class="white--text">picture_as_pdf</v-icon>
            </v-list-tile-action> -->
            <v-list-tile-content class="ml-2">
              <v-list-tile-title
                class="teal--text text--accent-1 ml-5 mr-0"
                v-text="'Resident Agreement'" />
            </v-list-tile-content>
            <v-icon class="white--text mr-5">picture_as_pdf</v-icon>
          </v-list-tile>
          
          <!-- resident archive list group-->
          <v-list-group
            v-if="directories.files_archive"
            :value="false"
            no-action
            sub-group>
            
            <v-list-tile slot="activator">
              <!-- <v-list-tile-action>
                <v-icon class="orange--text pl-0 ml-0">folder</v-icon>
              </v-list-tile-action> -->
              <v-list-tile-content>
                <v-list-tile-title
                  class="purple--text text--lighten-4"
                  v-text="'Resident Archives'" />
              </v-list-tile-content>
              <v-icon class="orange--text mr-5">folder</v-icon>

              <!-- <v-list-tile-title class="cyan--text text--lighten-4">
                <v-icon class="orange--text mr-2">folder</v-icon>
                Resident Archives
              </v-list-tile-title> -->
            </v-list-tile>

            <v-list-tile
              v-for="(item, i) in directories.files_archive.directories"
              :to="`/${directories.files_archive.path}/${item}`"
              :key="i"
              @click="closeIfSmall">

              <v-list-tile-action>
                <v-icon class="orange--text">folder</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  class="pink--text text--lighten-5"
                  v-text="item.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())" />
              </v-list-tile-content>
            </v-list-tile>
            
          </v-list-group>

        </v-list-group>
      </v-list>
      
      <!-- bottom nav drawer list -->
      <v-list class=" pt-0">
        <!-- online and prinrable forms -->
        <v-list-group
          :value="loaded"
          class="secondary--text text--darken--5">





          <!-- ONLINE WORK FORM -->
          <v-list-tile to="/work-form">
            <!-- <v-list-tile-action>
              <v-icon class="white--text">picture_as_pdf</v-icon>
            </v-list-tile-action> -->
            <v-list-tile-content class="ml-2">
              <v-list-tile-title
                class="teal--text text--accent-1 ml-5 mr-0"
                v-text="'Work Form'" />
            </v-list-tile-content>
            <v-icon class="white--text mr-5">info</v-icon>
          </v-list-tile>



          <v-list-tile slot="activator">
            <v-list-tile-title>
              <v-icon class="purple--text text--lighten-4 mr-2">gesture</v-icon>
              Forms</v-list-tile-title>
          </v-list-tile>

          <v-list-group
            v-if="directories.files_forms"
            :value="false"  
            no-action
            sub-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title
                  class="purple--text text--lighten-4"
                  v-text="'Printable Forms'" />
              </v-list-tile-content>
              <v-icon class="white--text mr-5">print</v-icon>
              <!-- <v-list-tile-title class="mr-1">Printable Forms</v-list-tile-title> -->
            </v-list-tile>

            <v-list-tile
              v-for="(item, i) in directories.files_forms.files"
              :href="(`http://10.14.72.245/${directories.files_forms.path}/${item}`)"
              :key="i">

              <v-list-tile-action>
                <v-icon class="white--text">picture_as_pdf</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title 
                  v-text="item.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())" />
              </v-list-tile-content>
            </v-list-tile>
            
          </v-list-group>

        </v-list-group>

      </v-list>

    </v-navigation-drawer>

    <!-- navbar/toolbar -->
    <v-toolbar
      :clipped-left="clipped"
      fixed
      dark
      class="secondary"
      app
      dense>

      <!-- branding -->
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link
          to="/"
          class="branding">
          GB Resident
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>

      <!-- navbar user and logout -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          depressed
          dark
          color="white"
          class="user m-0 p-0">
          <v-icon class="mr-1">person</v-icon>
          Welcome {{ !user ? 'gbresident' : user }}
        </v-btn>
        <v-btn
          class="secondary"
          flat
          @click="logoutModal = true">
          Logout
          <v-icon class="ml-1">exit_to_app</v-icon>
        </v-btn>

        <!-- logout modal -->
        <v-dialog
          v-model="logoutModal"
          max-width="290">
          <v-card>
            <v-card-title class="headline">Log Out</v-card-title>

            <v-card-text>
              Are you sure you want to log out?
            </v-card-text>

            <v-card-actions>
              <v-spacer/>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="logoutModal = false">
                Cancel
              </v-btn>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="clickLogout()">
                Logout
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <div  
        @click="closeIfSmall">
        <nuxt />
        <footercomponent />
      </div>
    </v-content>

  </v-app>
</template>

<script>
// import {config} from '~/package.json'
import footercomponent from '~/components/FooterComponent'

export default {
  components: {footercomponent},
  data() {
    return {
      user: this.$store.state.uuid,
      token: this.$store.state.token,
      directories: this.$store.state.directories,
      logoutModal: false,
      disableResizeWatcher: true,
      disableRouteWatcher: true,
      hideOverlay: true,
      stateless: true,
      clipped: true,
      drawer: false,
      floating: true,
      fixed: true,
      loaded: false,
    }
  },
  computed: {
    directoriesState: function(){
      // console.log('COMPUTED directoriesState')
      return this.$store.state.directories
    },
    isLoggedIn(){
      if(this.$store.state.token){
        // console.log('isLoggedIn ', this.$store.state.token)
        return true
      }
    },
    filesLoaded(){
      if (Object.keys(this.directories).length !== 0 && this.directories.constructor === Object) {
        return true  
      }
    }
  },
  // beforeCreate() {},
  created(){
    if(!this.user && !this.token){
      $nuxt.$router.push('/login')
    }
  },
  mounted() {
    if(this.user && this.token){
      this.loadFilesData().then(()=>{
          this.directories = this.$store.state.directories
      })
    }
    if (this.$vuetify.breakpoint.mdAndUp) {
      console.log('BREAKPOINT=====  yay')
      this.drawer = true 
    }
  },
  beforeCreate(){
    // console.log('===Before Created')
  },
  methods: {
    closeIfSmall(){
      console.log('BREAKPOINT=====',this.$vuetify.breakpoint)
      if (this.$vuetify.breakpoint.width < 901) {
        console.log('BREAKPOINT=====close me')
        this.drawer = false 
      }

      console.log('clicked drawer')
    },
    clickLogout() {
      // clear state
      this.$store.commit('logout')
      console.log('logged out, localstorage cleared')
      this.error = null
      $nuxt.$router.push('/login')
    },
    async loadFilesData() {
      let rootFilesDir = 'files'

      // get the data for root rootFilesDir
      // console.log('get root dir path - ', rootFilesDir)
      await this.getFilesAndFolders(rootFilesDir)

      // get directories and files in rootFilesDir
      let dirArr = this.$store.state.directories.files.directories
      for (let i = 0; i < dirArr.length; i++) {
          const e = dirArr[i];
          let path = rootFilesDir + "/" + e

          // get directories and files in sub directories
          let dirs = await this.getFilesAndFolders(path)
          // console.log('directories found.. ', dirs.directories)
          let subDirArr = dirs
          for (let i = 0; i < subDirArr.directories.length; i++) {
            const e = subDirArr.directories[i];
            let subPath = subDirArr.path + "/" + e
            // console.log('sub dir path...', subPath)
            let subDirs = await this.getFilesAndFolders(subPath)
            // console.log('sub dirs found', subDirs)
            let subSubDirArr = subDirs
            for (let i = 0; i < subSubDirArr.directories.length; i++) {
              const e = subSubDirArr.directories[i];
              let subSubPath = subSubDirArr.path + "/" + e
              // console.log('sub sub dir path...', subSubPath)
              let subSubDirs = await this.getFilesAndFolders(subSubPath)
              // console.log('sub sub dirs found', subSubDirs)
            }
          }
      }
    this.directories = this.$store.state.directories
    this.loaded = true
    
    },
    async getFilesAndFolders(path){
      // const apiUrl = `https://localhost/new-gb-resident/api`
      // let url = apiUrl + "/" + path
      let url = "/api/" + path
      let filesState = await this.$store.state.directories
      let dirState = filesState[path.replace(/\//g, "_")]

      if (!dirState || Object.keys(dirState).length === 0) {
        // console.log('directory NOT in state - ', path)
        // console.log(`###### fetching "${path}" api - `, url)
        return await this.$axios.$post(url, {token: this.token})
          .then(res => {
            let slashToUnderscore = path.replace(/\//g, "_")
            // this.directories[hyphenPath] = res
            let payload = {[slashToUnderscore]: res}
            this.$store.commit('loadFiles', payload)
            this.directories[slashToUnderscore] = res
            // console.log("%%%%%%%%%%", this.directories)
            return res
          })
      } else {
        // console.log('directory in state - ', path)
        this.directories[path.replace(/\//g, "_")] = await dirState
        // console.log("%%%%%%%%%%", this.directories)
        return await dirState
      }

    },
  }
}
</script>

<style>
.branding{
  color: white;
  text-decoration: none;

}
.user{
  color: white;
}
.logoutbtn{
  max-height: 28px;
  padding-top: 8px;
  margin-top: 10px;
}

.v-list {
  font-size: .8em;
}
</style>
