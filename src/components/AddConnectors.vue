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

<div class="submit-form mt-3 mx-auto">
    <p class ="benef" align="center" v-if="this.$route.name=='edit-connector'">Edit Connector</p>
    <p class ="benef" align="center" v-else >Add Connector</p>
    <div v-if="!submitted">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="name"
            label="Name"
            required
            dense>
            </v-text-field>
          </div>

          <div class="col" v-if="connectorclasses.length !=0">
            <v-select 
              :items="connectorclasses"
              :item-text="'name'"
              :item-value="'name'"
              v-model="connectorclass"
              v-on:change="changeType()"
              label="Connector Class"
              required
              dense>
              </v-select>
          </div>
          <div class="col" v-else>
             <v-text-field 
        
              v-model="connectorclass"
              label="Connector Class"
              required
              dense>
              </v-text-field>
        </div>
         </div>

         <div class="row">
           <div class="col">
        <v-text-field
          v-model="tasksMax"
          label="Maximum Tasks"
          required
          dense>
        </v-text-field>
          </div>

          <div class="col">
        <v-select
          :items="convertors"
          v-model="keyConverter"
          label="Key Converter"
          dense>
          </v-select>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-select
          :items="convertors"
          v-model="valueConverter"
          label="Value Converter"
          dense>
          </v-select>
          </div>
        </div>

        <div class="row">
         <div class="col">
        <v-text-field
          v-model="topics"
          label="Topics"
          required
          dense>
          </v-text-field>
          </div>
          
          <div class="col"> 
        <v-text-field
          v-model="file"
          label="File"
          dense>
          </v-text-field>
          </div>
        </div>

          <div class="row">
            <div class="col"> 
            <v-text-field
          v-model="type"
          disabled
          label="Type"
          dense>
          </v-text-field>
        </div>

        
        </div>

       

      </v-form>

       <v-layout align-center justify-center warp>
        <v-flex xs12 sm6  class="pa-1">

        <v-btn
        :disabled="!isFormValid"
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange darken-1"
        v-on:click.stop.prevent="validateConnector">Validate</v-btn>
        </v-flex>
        <v-btn
        :disabled="!isFormValid"
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange darken-1"
        v-on:click.stop.prevent="saveConnector">Save</v-btn>
       </v-layout>

     

    </div>
 <v-snackbar 
          :timeout="3000"
          bottom
          outlined
          :color="snackbar.color" 
          v-model="snackbar.show">
            {{ snackbar.message }}
        </v-snackbar>
  </div>
</div>
</template>

<script>

import ConnectorService from '../services/ConnectorService';
export default {
  name: "add-connector",
  data() {
    return {
        isFormValid: false,
        worker:JSON.parse(localStorage.getItem('worker')),
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
    getWorker(){
      this.worker = JSON.parse(localStorage.getItem('worker'));
    },
  },
  async mounted(){
    await this.getWorker();
    if (this.$route.name=="edit-connector"){
       ConnectorService.getConnectors(this.$route.params.id)
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
    await ConnectorService.getConnectorClasses(this.worker.ID).then((response) => {
          response.data.data.forEach(element => {
            this.connectorclasses.push({name:element["class"],type:element["type"]})
          });
        })
        .catch((e) => {
          console.log(e);
        });
    await ConnectorService.getConvertors(this.worker.ID).then((response) => {
          this.convertors=response.data.data;
         
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