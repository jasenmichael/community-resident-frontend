<template>
  <div>
    <!-- <h6>####{{ filteredList }}</h6> -->
    <v-container
      fluid
      grid-list-md>
      <v-container
        fluid
        grid-list-md
        class="pa-0">
        <v-layout
          row
          wrap>
          <!-- SEARCH FIX ME!  -->
          <!-- <v-flex
            d-flex
            xs12
            sm12
            md12
            justify-center>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            />
          </v-flex> -->

        </v-layout>
      </v-container>
    </v-container>

    <div>

      <v-data-table
        v-if="files != undefined"
        v-model="filteredList"
        :headers="headers"
        :items="files"
        :search="search">

        <template
          slot="items"
          slot-scope="props">

          <!-- if pdf - get file name and icon -->
          <a
            v-if="(props.item.substr(props.item.length -4) === '.pdf')"
            :href="`http://10.14.72.245${$nuxt.$route.path}/${props.item}`">
            <td>
              <v-icon>picture_as_pdf</v-icon>
              {{ `&nbsp;${props.item}` || '' }}
            </td>
          </a>

          <!-- if folder - get folder name and icon -->
          <nuxt-link
            v-else
            :to="`${$nuxt.$route.path}/${props.item}`">
            <td>
              <v-icon>folder</v-icon>
              {{ `&nbsp;${props.item}` || '' }}
            </td>
          </nuxt-link>

          <!-- get date -->
          <td
            class="text-xs-right">
            {{ dateFromFileName(props.item) }}
          </td>
        </template>


        <!-- <template
          slot="pageText"
          slot-scope="props">
          Lines {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning">
          Your search for "{{ search }} {{ filterList }}" found no results.
        </v-alert> -->
        
      </v-data-table>
      <div v-else-if="files = undefined">{{ $nuxt.$router.push(`${$nuxt.$route.path}`) }}</div>
    </div>
  </div>
</template>

<script>
const moment = require('moment')

export default {
  components: {},
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // files: this.$props.files,
      showDetails: false,
      text: "list",
      search: "",
      filterList: [],
      icon: "justify",
      headers: [
        {
          text: "File",
          align: "left",
          // sortable: false,
          align: "left",
          value: "file"
        },
        {
          text: "Date",
          align: "right",
          value: "date"
        }
      ]
    };
  },
  computed: {
    filteredList() {
      console.log('PROPS', this.$props.files);
      return this.files.filter(item => {
        let filterList = item.match(new RegExp(this.search, "i"))
        // this.filterList = filterList
        return filterList
      })
    }
  },
  beforeMount() {},
  mounted() {
    console.log("MOUNTED props FILES===>>>", this.files);
  },
  methods: {
    dateFromFileName: (fileName) => {
      // check BEGINING for date ---
      let date = ''
      let begining = fileName.substring(0,10)
      let end = fileName.substr(fileName.length - 11).slice(0, -4)+'-01'
      let end2 = fileName.substr(fileName.length - 14).slice(0, -4)
      if (moment(end, "YYYY-MM-DD", true).isValid()) {
        let dateArr = end.split('-')
        date = dateArr[1]+'/'+dateArr[0]
      }
      if (moment(end2, "MM-DD-YYYY", true).isValid()) {
        console.log('yay')
        let dateArr = end2.split('-')
        date = dateArr[0]+'/'+dateArr[1]+'/'+dateArr[2]
      }
      if (moment(begining, "YYYY-MM-DD", true).isValid()) {
        let dateArr = begining.split('-')
        date = dateArr[1]+'/'+dateArr[2]+'/'+dateArr[0]
      }
      if (moment(begining, "MM-DD-YYYY", true).isValid()) {
        date = begining
      }

      return date
    }
  }
};
</script>

<style scoped>
img {
  margin: 0.2em;
}
</style>