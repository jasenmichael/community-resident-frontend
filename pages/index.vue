<template>
  <div>
    <!-- <loading v-if="loading"/> -->

    <v-parallax
      height="300"
      dark
      src="/parallax.jpg"
      class="parallax">
      <v-layout
        align-center
        column
        justify-center>
        <h1 class="display-3 font-weight-thin mb-3">Greenbriar School</h1>
        <h4 class="subheading">Community Resident Portal</h4>
        <p class="text-lg-center">
          Information, Forms and Documents
        </p>
      </v-layout>
    </v-parallax>
    

    <homecontentcomponent/>
  </div>

</template>

<script>
import homecontentcomponent from '~/components/HomeContentComponent'

export default {
layout: 'index',
components: {homecontentcomponent},
data() {
    return {
      id: this.$store.state.id,
      uuid: this.$store.state.uuid,
      token: this.$store.state.token,
    }
  },
  computed: {},
  beforeCreate() {
    // this.$nuxt.$loading.start
    if(!this.$store.state.id || !this.$store.state.uuid || !this.$store.state.token){
      $nuxt.$router.push('/login')
    }
  },
  mounted() {}
}  
</script>

<style>
  .parallax {
    height: 100%;
  }
</style>
