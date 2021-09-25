<template>
  <v-app id="inspire">

    <v-main class="grey lighten-4">
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
            <v-card class="dark-orange" dark min-height="78vh">
              <div>
                &nbsp;
                <h4 class="text-center">Worker Information</h4>
                <v-card-title class="justify-center"><v-icon x-large>mdi-information-outline</v-icon></v-card-title>
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
              color="darken-4"
              dark
            >
              <p align="center" style="font-size:20px;"><br>Streaming Status</p>
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
              color="darken-1"
              dark
            >
           
        
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
              <v-toolbar color="black darken-1" dark><v-icon small>mdi-help-circle-outline</v-icon>&nbsp;
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
              <v-toolbar color="blue-white darken-1" dark><v-icon small>mdi-help-circle-outline</v-icon>&nbsp;
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