<template>
  <v-footer
    dark
    height="auto"
    class="mb-0 pb-0">
    <v-card
      width="100%"
      flat
      tile
      class="indigo lighten-1 white--text text-xs-center">
      <v-card-text class="white--text pt-2 pb-0">
        &copy; Marsalom Inc./Greenbriar School &amp; Community
      </v-card-text>
      <v-card-text class="white--text pb-0">
        1968 to <b>∞</b><small> and beyond</small>
      </v-card-text>
      <v-card-text class="white--text mt-0 mb-0 pt-0 pb-0">
        <v-btn
          small
          flat
          @click="logoutModal = true">
          Logout
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
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
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      logoutModal: false,
    }
  },
  methods: {
    clickLogout() {
      // clear state
      this.$store.commit('logout')
      console.log('logged out, localstorage cleared')
      $nuxt.$router.push('/login')
    },
  }
}
</script>




