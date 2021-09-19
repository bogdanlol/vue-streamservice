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
        <v-btn  class="white--text" to="/worker/add" color="deep-orange darken-1">Add Worker</v-btn>
      </v-col>

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

export default{
  data(){
    return {
      workers:[],
      search:"",
      workerId :0,
      selectedWorker:{},
      headers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "IP", value: "ip", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Path", value: "path", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Status", value: "status", align: "center", sortable: true, class: 'my-header-style' },
        
        { text: "Actions", value: "actions", align: "center",sortable: false, class: 'my-header-style' },
        ]
  }
  },
  methods:{
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
    refreshList() {
      this.retrieveWorkers();
    },
},

 async mounted(){
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