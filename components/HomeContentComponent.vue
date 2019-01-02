<template>
  <v-container
    grid-list-md
    class="pb-6">
    <v-layout
      v-bind="binding"
      fill-height
      full-height
      class="pb-5">
      <v-flex
        sm12
        md4>
        <v-card
          to="/files/forms"
          dark
          color="indigo lighten-1">
          <v-card-title class="mb-0 pb-0 display-1">Forms</v-card-title>
          <v-card-text class="pt-1 pb-1">More online forms, and printable forms to come, but for now we can now use this form for submitting hours. </v-card-text>
          <!-- <v-flex justify-end>
            <v-btn bottom outline color="white">Outline Button</v-btn>
          </v-flex> -->
        </v-card>
      </v-flex>
      <v-flex
        sm12
        md4>
        <v-card
          to="/files/archive/work-credit-submissions"
          dark
          color="secondary">
          <v-card-title class="mb-0 pb-0 display-1">Submitted Hours Archive</v-card-title>
          <v-card-text class="pt-1 pb-1">The work form outputs a monthly pdf for easy book-keeping.</v-card-text>
          <!-- <v-flex justify-end>
            <v-btn outline color="white">Outline Button</v-btn>
          </v-flex> -->
        </v-card>
      </v-flex>
      <v-flex
        sm12
        md4>
        <v-card
          to="/files/documents"
          fill-height
          dark
          color="accent">
          <v-card-title
            class="mb-0 pb-0 display-1">
            Documents &amp; Files
          </v-card-title>
          <v-card-text class="pt-1 pb-1">Important Greenbriar documents and archives. Take a look around, stay tuned, more files to come.</v-card-text>
          <!-- <v-flex justify-end>
            <v-btn outline color="white">Outline Button</v-btn>
          </v-flex> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      binding () {
        const binding = {}
        if (!this.$vuetify.breakpoint.mdAndUp){
        //   binding.row = true
          binding.column = true
        }
        return binding
      }
    }
  }
</script>

<style lang="stylus" scoped>
@media (min-width: 960px)
  .full-height .flex
    display flex

  .full-height .flex > .card
    flex 1 1 auto
</style>
