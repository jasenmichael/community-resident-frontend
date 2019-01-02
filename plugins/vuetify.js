import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.lightBlue.darken3,
    secondary: colors.green.darken1,
    accent: colors.blue.darken1,
    error: colors.red.accent3,
    warning: colors.orange.lighten1,
    info: colors.blue.base,
    success: colors.lightGreen.accent3
  }
})



// primary: '#121212', // a color that is not in the material colors palette
// accent: colors.grey.darken3,
// secondary: colors.amber.darken3,
// info: colors.teal.lighten1,
// warning: colors.amber.base,
// error: colors.deepOrange.accent4,
// success: colors.green.accent3
