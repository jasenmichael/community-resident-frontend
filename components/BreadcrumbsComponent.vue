<template>
  <div>
    <!-- <h6>crumbs component</h6> -->
    <v-breadcrumbs
      v-if="crumbs"
      :items="crumbs">
      <v-icon slot="divider">chevron_right</v-icon>
      <template
        slot="item"
        slot-scope="props"
        nuxt>
        <nuxt-link 
          :href="props.item.href"
          :to="props.item.href"
          :class="[props.item.disabled && 'disabled']">{{ props.item.text.toUpperCase().replace(/-/g, ' ') }}
        </nuxt-link>
      </template>
    </v-breadcrumbs>
    <div v-else>{{ $nuxt.$router.push($nuxt.$route.path) }}</div>
  </div>
</template>

<script>
  export default {
    props: {
        crumbs: {
          type: Array, 
          required: true
        }
    },
    beforeCreate() {
      // if((!this.id) || (!this.uuid) || (!this.token)){
      //   $nuxt.$router.push('/login')
      // }
      // if(!this.crumbs){
      //   $nuxt.$router.push($nuxt.$route.path)
      // }
    }
  }
</script>

<style lang="stylus" scoped>
  .disabled
    color: grey
    pointer-events: none
</style>