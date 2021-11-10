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
                   
  
            <v-progress-linear
            :active="show"
            :indeterminate="show"
            absolute
            color="deep-purple accent-4"
            ></v-progress-linear>

          <v-data-table
             v-model="selected"
            :headers="headers"
            :items="connectors"
            :search="search"
            show-select
            item-key="ID"
            :single-select="false"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >
       

        
  

           <template
          v-if="this.selected.length > 1 ? true : false"
          v-slot:footer
          >
         
   

    
          

          <v-col>
          <v-row>
         
         <v-btn
        class="ma-2"
        color="deep-orange darken-1"
        dark
        @click="startConnectors()"
      >
        Start Connectors
        <v-icon
          color="blue darken-2"
          right
        >
          mdi-play
        </v-icon>
      </v-btn>
        <v-btn
        class="ma-2"
        color="deep-orange darken-1"
        dark
        @click="stopConnectors()"
      >
        Stop Connectors
        <v-icon
          color="red darken-2"
          right
        >
          mdi-stop
        </v-icon>
      </v-btn>
           </v-row>
          </v-col>

      
     
         
      </template>
          <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getColorSpots(item.status)" dark>{{item.status}}</v-chip>
            </template>
             <template v-slot:[`item.type`]="{ item }">
              <v-chip :color="getColorType(item.type)" dark>{{item.type}}</v-chip>
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
      show:false,
      selected :[],
      search:"",
      connectors: [],
      worker:JSON.parse(localStorage.getItem('worker')),
      headers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Connector Class", value: "connector.class", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Value Converter", value: "value.converter", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Key Converter", value: "key.converter", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Topics", value: "topics", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Type", value: "type", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Status", value: "status", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Actions", value: "actions", align: "center",sortable: false, class: 'my-header-style' },

      ],
       snackbar: {
                show: false,
                message: null,
                color: null,
            },
    };
  },
  methods:{
    isSelected(){
      return this.selected.length !=0 ? true : false;
    },
    getColorSpots(status){
      if (status == 'RUNNING') return 'green darken-2'
      else if (status == 'PAUSED') return 'orange darken-2'
      else if (status == 'FAILED') return 'red darken-2'
      else if (status == 'NOT RUNNING') return 'red darken-2'
      
      
    },
    getColorType(type){
      if (type == 'sink') return 'green darken-2'
      else if (type == 'source') return 'blue darken-2'
  
      
      
    },

    startConnectors(){

      let connectors =[];
      this.show=true;
      this.selected.forEach(element => {
        if (element.status == "RUNNING"){
          return;
        }
        connectors.push(element.ID)
      });
      ConnectorService.startConnectors(this.worker.ID,connectors).then(() => {
         this.retrieveConnectors(this.worker.ID);
         //this.$router.go();
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
    stopConnectors(){
      this.show=true;
      let connectors =[];
      this.selected.forEach(element => connectors.push(element.name));
      ConnectorService.stopConnectors(this.worker.ID,connectors).then(() => {
         this.retrieveConnectors(this.worker.ID);

        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
    startConnector(id){
      this.show=true;
      ConnectorService.startConnector(id,this.worker.ID).then(() => {
         this.retrieveConnectors(this.worker.ID);
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
    editConnector(id){
      this.$router.push({ name: "edit-connector", params: { id: id } });
    },
    deleteConnector(id){
      this.show=true;
      ConnectorService.deleteConnector(id).then(() => {
          this.retrieveConnectors(this.worker.ID);
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    },
    stopConnector(name){
      this.show=true;
      ConnectorService.stopConnector(name,this.worker.ID).then(() => {
          this.retrieveConnectors(this.worker.ID);
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
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
          this.show=false;
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
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