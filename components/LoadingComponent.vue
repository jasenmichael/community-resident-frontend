<template>
  <div
    v-if="loading"
    class="loading-page">
    <v-layout
      align-center
      justify-center
      column
      fill-height>
      <v-progress-circular
        :size="180"
        :width="20"
        color="purple"
        indeterminate
        class="loading"/>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  mounted(){
    console.log('loading component mounted')
    this.$nuxt.$loading.start
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading {
  margin-top: 8rem;
}
</style>
