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
 
    <v-dialog
      v-model="addWorkerDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
      <v-col cols="12" md="12" class="text-right">

        <v-btn
          class="white--text"
          color="deep-orange darken-1"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add worker
        </v-btn>
        </v-col>

      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Worker</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Worker name*"
                  v-model="name"
                  required
                ></v-text-field>
                 </v-col>
                <v-col
                cols="12"
                sm="6"
                md="4"
              >

                <div v-if="teams.length !=0 && isAdmin">
            <v-select 
              class="centered-input text--darken-3 mt-3" 
              :items="teams"
              :item-text="'name'"
              :item-value="'id'"
              v-model="team"
              v-on:change="changeType()"
              label="Team"
              required
              dense>
              </v-select>
          </div>

              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="IP"
                  v-model="ip"       
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Path"
                  v-model="path"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['TEST', 'DEV', 'ACC', 'PRD']"
                  v-model="environment"
                  label="Environment"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['Worker', 'Container']"
                  v-model="type"
                  label="Type"
                  
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
             color="deep-orange darken-1"
             text
            @click="addWorkerDialog = false"
          >
            Close
          </v-btn>
          <v-btn
             color="deep-orange darken-1"
            text
            @click="saveWorker"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row align="center" >

      <v-col cols="12" md="5">
        <v-text-field
        
          v-model="search"
          label="Search for worker"
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
              <div class="pa-8 white--text">
                <div class="text-h4 font-weight-light"> Workers available</div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="workers"
            :search="search"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >
   

      
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" color="blue darken-2" @click="seeWorker(item.ID)">mdi-eye</v-icon>
                </template>
                  <span>See Worker</span>
              </v-tooltip>
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status != 'RUNNING'"  v-on="on"  color="blue darken-2" @click="startKafkaConnect(item.ID)">mdi-play</v-icon>
                  <v-icon v-else-if="item.status =='RUNNING'" v-on="on"  color="red darken-2" @click="stopKafkaConnect(item.name)">mdi-stop</v-icon>
                </template>
                    <span  v-if="item.status != 'RUNNING'">Start Worker</span>
                    <span  v-else-if="item.status =='RUNNING'">Stop Worker</span>
              </v-tooltip>
              <v-tooltip bottom>
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" v-if="workerId !== item.ID" color="green darken-2" @click="selectWorker(item)">mdi-arrow-collapse-right</v-icon>
                  <v-icon v-on="on" v-else-if="workerId === item.ID" color="green darken-2" @click="deselectWorker()">mdi-arrow-collapse-left</v-icon>
                </template>
                  <span v-if="workerId !== item.ID">Select Worker</span>
                  <span v-else-if="workerId=== item.ID">Deselect Worker</span>
              </v-tooltip>
           
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" color="red darken-2" @click="deleteWorker(item.ID)">mdi-close</v-icon>
                </template>
                  <span>Delete Worker</span>
              </v-tooltip>
              
               </template>
            

          </v-data-table>
        </div>
      </v-col>
    </v-row>
      
  </div>
</template>
<script>
import workerService from "../services/WorkerService"
import AuthenticationService from '../services/AuthenticationService';
import TeamService from "../services/TeamService.js"
import WorkerService from '../services/WorkerService';
export default{
  data(){
    return {
      workers:[],
      name:"",
      ip:"",
      path:"/opt/kafka/confluent-6.1.0",
      team:"",
      type :"",
      search:"",
      environment:"",
      teams:[],
      addWorkerDialog:"",
      workerId :0,
      selectedWorker:{},
      isAdmin: false,
      headers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "IP", value: "ip", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Path", value: "path", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Status", value: "status", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Environment", value: "environment", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Type", value: "type", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Actions", value: "actions", align: "center",sortable: false, class: 'my-header-style' },
        ]
  }
  },
  methods:{
    changeType(){
      this.teams.forEach(element => {
  
        if (element['name'] === this.teams){
          this.team=element['id'];
        }
     
      });
    
    },
    seeWorker(id){
      this.$router.push({ name: "worker", params: { id: id } });
    },
    selectWorker(item){
      localStorage.setItem('worker', JSON.stringify(item));
      this.$router.go();

    },
    deselectWorker(){
      localStorage.removeItem('worker');
     this.$router.go();
    },
    startKafkaConnect(id){
      workerService.postStartKafkaConnect(id).then(() => {
          
          
         this.$router.go()
        })
        .catch((e) => {
          console.log(e);
        });
    },
    stopKafkaConnect(id){
      workerService.postStopKafkaConnect(id).then(() => {
         
          this.$router.go();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveWorkers() {
        workerService.getWorkers().then((response) => {
          this.workers = response.data.data;

        })
        .catch((e) => {
          console.log(e);
        });
      },
    getSelectedWorker(){
      this.selectedWorker= JSON.parse(localStorage.getItem('worker'));
      if (this.selectedWorker){
        this.workerId = this.selectedWorker.ID;
      }
      
    },
    retrieveTeams() {
        TeamService.getTeams().then((response) => {
          this.teams = response.data.data;

        })
        .catch((e) => {
          console.log(e);
        });
      },
    refreshList() {
      this.retrieveWorkers();
    },
    saveWorker() {
      var worker = {
        name : this.name,
        ip : this.ip,
        path : this.path,
        team : this.team,
        type : this.type,
        environment : this.environment

      };

        WorkerService.postWorker(worker)
        .then(() => {
          this.addWorkerDialog=false;
          this.retrieveWorkers();
          // console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          
          console.log(e);
        });
      }
      
    
},

 async mounted(){
    AuthenticationService.getIsAdmin().then((response) => {
          this.isAdmin = response.data.admin;
        })
        .catch(() => {
          
        });

     await TeamService.getTeams().then((response) => {
          response.data.data.forEach(element => {
            this.teams.push({name:element["name"],id:element["ID"]})
          });
        })
        .catch((e) => {
          console.log(e);
        });
      
      
  
  this.getSelectedWorker();
 await this.retrieveWorkers();
}
};

</script>

<style scoped>
.container-fluid{
  margin-top: 20px;
}
.send{
  padding: 5%;
}
.grey{
  background-color: #546E7A !important;
}
</style>