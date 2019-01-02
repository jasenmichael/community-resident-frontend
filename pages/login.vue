<template>
  <v-app>

    <!-- <div v-if="!token">{{ $nuxt.$router.push('/') }}</div> -->
    <loading />
    <v-container>
      <v-layout
        column
        justify-center
        align-center
        class="text-xs-center">
        <v-flex 
          xs4
          class=""
        >
          <v-container 
            class="text-xs-center"
          >
            <v-card 
              flat
              class="login"
              @keyup.enter="clickLogin"
            >
              <v-card-title primary-title>
                <div>
                  <h4>Login</h4>
                </div>
              </v-card-title>
              <v-card-title color="white">
                <p 
                  v-if="error"
                  class="errormsg">
                  {{ error.toUpperCase() }}
                </p>
                <p v-else>&nbsp;</p>
              </v-card-title>
              <v-form>
                <v-text-field
                  v-model="uuid"
                  prepend-icon="person"
                  name="Username"
                  label="Username/Email"
                />
                <v-text-field
                  v-model="pass"
                  prepend-icon="lock"
                  name="Password"
                  label="Password"
                  type="password"
                />
                <v-card-actions>
                  <v-btn
                    primary
                    large
                    block
                    @click="clickLogin"
                  >
                    Login
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      // loggingIn: false,
      pass: null,
      id:  this.$store.state.id,
      uuid: this.$store.state.uuid,
      token: this.$store.state.token,
      error: null,
    }
  },
  // mounted() {
  beforeCreate() {
    if( this.id != null && this.uuid != null && this.token != null ){
      $nuxt.$router.push('/')
    }
  },
  methods: {
    clickLogin: function () {
        if(this.uuid && this.pass) {
          let body = {
            user: this.uuid,
            pass: this.pass
          }
          this.$axios.$post("https://10.14.72.245/api/resident/login", body)
            .then(res => {
              // console.log(res)
              if(!res.token || res.error){
                this.error = res.error
              }else {
                // set localstorage
                localStorage.setItem('id', res.id)
                localStorage.setItem('token', res.token)
                localStorage.setItem('uuid', this.uuid)

                // update state wth localstorage
                this.$store.commit('login')
                // remove any previous errors
                this.error = null
                this.pass = null
                // this.loggingIn = true
                $nuxt.$router.push('/')
              }

            })
        } else {
            this.error = "user/email &amp; password required"
        }
    },
    enterLogin: function() {
      this.clickLogin()
    }
  }
}
</script>

<style>
.login {
 padding: 3em;
}
.errormsg {
  color: red;
  background-color: white;
}
.loading {
  margin-top: 8rem;
}
</style>
