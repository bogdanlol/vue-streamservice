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
                <p></p>
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
            <div class="scroll">
            
            </div>
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
                <v-toolbar-title>Placeholder</v-toolbar-title>
              </v-toolbar>

                <v-expansion-panels
                v-model="panel"
                 multiple>
                  <v-expansion-panel v-for="item in items" :key="item.title">
                    <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-card flat>
                        <v-card-text class="px-4 py-0 grey--text">
                          <div>{{ item.content }}</div>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>        
                </v-expansion-panels>
            </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>

import ConnectorService from '../services/ConnectorService';
import WorkerService from '../services/WorkerService';
export default {
  name: "add-connector",
  data() {
    return {
        isFormValid: false,
        id:null,
        name: "",
        connectorclasses: [],
        convertors:[],
        connectorclass:"",
        tasksMax:1,
        keyConverter:"",
        valueConverter:"",
        topics:"",
        file:"",
        type:"",
        status:"",
        submitted: false,
        errors:[],
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
    },
    validateConnector(){
        var connector = {
        name : this.name,
        connectorClass : this.connectorclass,
        tasksMax : parseInt(this.tasksMax),
        keyConverter : this.keyConverter,
        valueConverter : this.valueConverter,
        topics : this.topics,
        file : this.file,
        type : this.type,
        status : this.status

      };
        ConnectorService.validateConnector(connector)
        .then((response) => {
          // console.log(response.data);
          
         if (response.data.errors){
           this.snackbar = {
                      message: response.data.errors,
                      color: 'error',
                      show: true
                    };
         }else{
           this.snackbar = {
                      message: "No errors found.",
                      color: 'green',
                      show: true
                    };
         }
        })
        .catch((e) => {
          
          console.log(e);
        });
      
    },

    saveConnector() {
      
      var connector = {
        name : this.name,
        connectorClass : this.connectorclass,
        tasksMax : parseInt(this.tasksMax),
        keyConverter : this.keyConverter,
        valueConverter : this.valueConverter,
        topics : this.topics,
        file : this.file,
        type : this.type,
        status : this.status

      };
      if (this.$route.name=="edit-connector"){
        ConnectorService.putConnector(connector,this.$route.params.id)
        .then(() => {
          this.$router.push('/connectors');
          // console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          
          console.log(e);
        });
      }
      else{
      ConnectorService.postConnector(connector)
        .then(() => {
          this.$router.push('/connectors');
          // console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          
          console.log(e);
        });
      }
    },
  },
  async mounted(){
 
    await WorkerService.getWorker(this.$route.params.id)
        .then((response) => {
          console.log(response.data.data[0]);
          this.name=response.data.data[0] .name;
          this.connectorclass=response.data.data[0]["connector.class"];
          this.tasksMax=response.data.data[0]["tasks.max"];
          this.keyConverter=response.data.data[0]["key.converter"];
          this.valueConverter=response.data.data[0]["value.converter"];
          this.topics=response.data.data[0].topics;
          this.file=response.data.data[0].file;
          this.type=response.data.data[0].type;

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