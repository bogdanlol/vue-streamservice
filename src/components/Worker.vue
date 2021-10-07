<template>
  <v-app id="inspire">

    <v-main class="grey lighten-5">
      <v-container>
        <v-row>
          <v-col
          
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="lg"
              min-height="73vh"
            >
            <v-card   min-height="78vh">
              <div>
                <v-toolbar color="orange darken-4">
                <h4 class="text-center">Worker Information <v-icon x-large>mdi-information-outline</v-icon></h4>
                </v-toolbar>
                <v-card-title class="justify-center"></v-card-title>
                <div class="send">
                <div class ="row">
                  <div class="col">Worker name </div>  <div class="col-3">{{name}}</div> 
                </div>
                <div class ="row">
                  <div class="col">Connect path </div>  <div class="col">{{path}}</div> 
                </div>
                <div class ="row">
                  <div class="col">Worker port </div>  <div class="col-3">{{port}}</div> 
                </div>
                <div class ="row">
                  <div class="col">Worker status </div>  <div class="col">{{status}}</div> 
                </div>
                <br><p></p>
                </div>
              </div>
            </v-card>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet
              min-height="73vh"
              rounded="lg"
              
            >
              <v-toolbar color="orange darken-4">
                <v-toolbar-title >Streaming status</v-toolbar-title>
              </v-toolbar>
              <v-data-table
            :headers="headers"
            :items="connectors"
            :hide-default-footer="false"
            :items-per-page="10"
            class="elevation-1"
            />
              
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="lg"
              min-height="73vh"
      
              
            >
            
            <v-form ref="form" v-model="isFormValid" lazy-validation>
        <v-toolbar color="orange darken-4">
                <v-toolbar-title>Editable Information</v-toolbar-title>
              </v-toolbar>
               <v-card-title class="justify-center"></v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="sshKey"
            label="sshKey"
            required
            dense>
            </v-text-field>
         


            <v-select 
              :items="environments"

              v-model="environment"
              v-on:change="changeType()"
              label="Connector Class"
              required
              dense>
              </v-select>
      
     

     
        <v-text-field
          v-model="ip"
          label="Ip"
          required
          dense>
        </v-text-field>
      

         
        
      </v-form>
        
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            <v-card class="mx-auto">
              <v-toolbar color="orange darken-4"><v-icon small>mdi-help-circle-outline</v-icon>&nbsp;
                <v-toolbar-title>Worker Properties</v-toolbar-title>
              </v-toolbar>
                <pre>{{workerproperties}}</pre>
               <p></p>
            </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
       <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            <v-card class="mx-auto">
              <v-toolbar color="orange darken-4" ><v-icon small>mdi-help-circle-outline</v-icon>&nbsp;
                <v-toolbar-title>Error Log</v-toolbar-title>
              </v-toolbar>
                <pre>{{errorLog}}</pre>
               <p></p>
            </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import WorkerService from '../services/WorkerService';
export default {
  name: "worker",
  data() {
    return {
        environments:['TST','DEV','ACC','PRD'],
        environment:"",
        sshKey:"",
        ip:"",
        isFormValid: false,
        id:null,
        name: "",
        path:"",
        port:"",
        status:"",
        errorLog:"",
        workerproperties:"",
        connectors:[],
        submitted: false,
        errors:[],
         headers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Status", value: "status", align: "center",sortable: false, class: 'my-header-style' },

      ],
         snackbar: {
                show: false,
                message: null,
                color: null,
            },
    };
  },
 
  methods:
  {
   
    changeType(){
      this.connectorclasses.forEach(element => {
        if (element['name'] === this.connectorclass){
          this.type=element['type'];
        }
      });
    }
  
  },
  async mounted(){
 
    await WorkerService.getWorker(this.$route.params.id)
        .then((response) => {
  
        this.name=response.data.data.worker.name;
        this.path=response.data.data.worker.path;
        this.port=response.data.data.worker.port;
        this.workerproperties = response.data.data.WorkerProperties;
        this.errorLog = response.data.data.errorLog;
        this.connectors = response.data.data.connectors;
        this.environment =response.data.data.worker.environment;
        this.sshKey = response.data.data.worker.sshKey;
        this.ip = response.data.data.worker.ip;

         if (response.data.data.connectors && response.data.data.connectors.length !=0){
           this.status = "Connectors are running on this worker"
         }else{
           this.status = "Connectors are not running on this worker"
         }
        

        })
        .catch((e) => {
          
          console.log(e);
        });
    }
  
      
  
};
</script>

<style>
.submit-form {
  max-width: 1000px;
}
.benef{
  font-weight:1000;
  font-size: x-large;
  padding-bottom: 10px;
}
</style>