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
    <p class ="benef" align="center">Add Connector</p>
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

          <div class="col">
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

       <v-layout align-center justify-center>
        <v-btn
        :disabled="!isFormValid"
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange darken-1"
        v-on:click.stop.prevent="saveConnector">Salvează</v-btn>
       </v-layout>

     

    </div>

  </div>
</div>
</template>

<script>

import ConnectorService from '../services/ConnectorService';
export default {
  name: "add-connector",
  data() {
    return {
      // person: {
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
     
      ConnectorService.postConnector(connector)
        .then(() => {
          this.$router.push('/connectors');
          // console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          
          console.log(e);
        });
    },
  },
  async mounted(){
    await ConnectorService.getConnectorClasses().then((response) => {
          response.data.data.forEach(element => {
            this.connectorclasses.push({name:element["class"],type:element["type"]})
          });
        })
        .catch((e) => {
          console.log(e);
        });
    await ConnectorService.getConvertors().then((response) => {
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