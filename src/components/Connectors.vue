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
                <div class="text-h5 font-weight-light"> Connectors on http://{{worker.name}}:{{worker.port}}/ </div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="connectors"
            :search="search"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >
   

          <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getColorSpots(item.status)" dark>{{item.status}}</v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status != 'RUNNING'"  v-on="on"  color="blue darken-2" @click="startConnector(item.ID)">mdi-play</v-icon>
                  <v-icon v-else-if="item.status =='RUNNING'" v-on="on"  color="red darken-2" @click="stopConnector(item.name)">mdi-stop</v-icon>
                </template>
                    <span v-if="item.status != 'RUNNING'">Start Connector</span>
                     <span v-else-if="item.status =='RUNNING'">Stop Connector</span>
              </v-tooltip>
              <v-tooltip bottom>
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="green darken-2" @click="editConnector(item.ID)">mdi-pencil</v-icon>
                </template>
                  <span>Edit connector</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" color="red darken-2" @click="deleteConnector(item.ID)">mdi-close</v-icon>
                </template>
                  <span>Delete Connector</span>
              </v-tooltip>
              
               </template>
               
  
   
        


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
      worker:JSON.parse(localStorage.getItem('worker')),
      headers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Connector Class", value: "connector.class", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Tasks Max", value: "tasks.max", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Value Converter", value: "value.converter", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Key Converter", value: "key.converter", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Topics", value: "topics", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Type", value: "type", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Status", value: "status", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Actions", value: "actions", align: "center",sortable: false, class: 'my-header-style' },

      ],
    };
  },
  methods:{
    getColorSpots(status){
      if (status == 'RUNNING') return 'green darken-2'
      else if (status == 'PAUSED') return 'orange darken-2'
      else if (status == 'FAILED') return 'red darken-2'
      else if (status == 'NOT RUNNING') return 'red darken-2'
      
      
    },
    startConnector(id){
      ConnectorService.startConnector(id,this.worker.ID).then(() => {
         this.retrieveConnectors(this.worker.ID);
        })
        .catch((e) => {
          console.log(e);
        });
      },
    editConnector(id){
      this.$router.push({ name: "edit-connector", params: { id: id } });
    },
    deleteConnector(id){
      ConnectorService.deleteConnector(id).then(() => {
          this.retrieveConnectors();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    stopConnector(name){
      ConnectorService.stopConnector(name,this.worker.ID).then(() => {
          this.retrieveConnectors(this.worker.ID);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveConnectors(id) {
        ConnectorService.getConnectors(id).then((response) => {
          this.connectors = response.data.data;
          this.connectors.forEach(element => {
            if (element.status ==""){
              element.status ="NOT RUNNING";
            }
          });
          console.log(this.connectors);
        })
        .catch((e) => {
          console.log(e);
        });
      },
      getWorker(){
      this.worker = JSON.parse(localStorage.getItem('worker'));
    },
    },
    refreshList() {
      this.retrieveConnectors(this.worker.ID);
    },
    
    async mounted() {
      await this.getWorker();
      this.retrieveConnectors(this.worker.ID);
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