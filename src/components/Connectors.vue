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

    <v-row align="center" class="list mx-auto">

      <v-col cols="12" md="5">
        <v-text-field
          v-model="search"
          label="Căutare..."
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
        <div class="v-card--material mt-4 v-card v-sheet theme--light">
          <div class="v-card__title align-start">
            <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded blue-grey darken-1" style="max-width: 100%; width: 100%;">
              <div class="pa-8 white--text">
                <div class="text-h4 font-weight-light"> My Connectors </div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="connectors"
            :search="search"
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
      connectors: [],
      headers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Connector Class", value: "kind", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Tasks MAx", value: "tasks.max", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Value Converter", value: "value.converter", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Key Converter", value: "key.converter", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Topics", value: "topics", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Type", value: "type", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Status", value: "status", align: "center",sortable: false, class: 'my-header-style' },
      ],
    };
  },
  methods:{
    retrieveConnectors() {
        ConnectorService.getConnectors().then((response) => {
          this.connectors = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      }
    },
    refreshList() {
      this.retrieveConnectors();
    },
    async mounted() {
        this.retrieveConnectors();
    }

    // getDisplayAppointment(appointment) {
    //   return {
    //     id: appointment.id,
    //     person: appointment.person.last_name + ' '+ appointment.person.name,
    //     kind: appointment.kind,
    //     status: appointment.status,
    //     office: appointment.office.name,
    //     location: appointment.office.county.name +', '+ appointment.office.city.name,
    //     date: appointment.date,
    //     time: appointment.time,
    //   };
    // },

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
color: #BDBDBD !important;
  font-size: 15px !important;
}
</style>