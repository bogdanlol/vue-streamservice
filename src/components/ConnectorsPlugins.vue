<template> 
  <div>
    <v-container fluid>
        <v-btn 
        class="mx-2"
        fab
        dark
        small
        @click="$router.go(-1)">
          <v-icon dark>
          mdi-arrow-left-bold
          </v-icon>
        </v-btn>
    </v-container>
    <v-col cols="12" md="12" class="text-right">
        <v-btn  class="white--text" to="/connectors/add" color="deep-orange darken-1">Add Connector</v-btn>
      </v-col>

    <v-row align="center" >

      <v-col cols="12" md="5">
        <v-text-field
        
          v-model="search"
          label="Search for connector"
          single-line
          hide-details
          clearable
          filled
          rounded
          dense
          
          append-icon="mdi-magnify">
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="12">
        <div class="v-card--material mt-4 v-card v-sheet theme--deep-orange">
          <div class="v-card__title align-start">
            <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 orange accent-4 " style="max-width: 100%; width: 100%;">
              <div class="pa-10 white--text">
                <div class="text-h4 font-weight-light"> Connectors Plugins on http://localhost:8083/ </div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="connectorsPlugins"
            :search="search"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >


          </v-data-table>
        </div>
      </v-col>
    </v-row>
      
  </div>
</template>
<script>

import ConnectorService from "../services/ConnectorService"

export default {
  name: "connectors",
  data() {
    return {
      search:"",
      connectorsPlugins: [],
      headers: [
        { text: "Class", value: "class", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Type", value: "type", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Version", value: "version", align: "center", sortable: true, class: 'my-header-style' },

      ],
    };
  },
  methods:{
    retrieveConnectorsPlugins() {
        ConnectorService.getConnectorClasses().then((response) => {
          this.connectorsPlugins = response.data.data;
          console.log(this.connectors);
        })
        .catch((e) => {
          console.log(e);
        });
      }
    },
    refreshList() {
      this.retrieveConnectorsPlugins();
    },
    async mounted() {
        this.retrieveConnectorsPlugins();
    }

};
</script>

<style>
.list {
  max-width: 1400px;
}
.all {
  margin-top: 50px;
}
.text-xs-right{
  white-space: nowrap;
}
.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
.my-header-style {
color: #020000 !important;
  font-size: 15px !important;
}
</style>