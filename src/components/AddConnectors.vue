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
            <v-text-field
              v-model="connectorClass"
              label="Connector Class"
              required
              dense>
              </v-text-field>
          </div>
        </div>

         <div class="row">
           <div class="col">
        <v-select
          v-model="tasksMax"
          label="Maximum Tasks"
          required
          dense>
        </v-select>
          </div>

          <div class="col">
        <v-text-field
          v-model="keyConverter"
          label="Key Converter"
          dense>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-text-field
          v-model="valueConverter"
          label="Value Converter"
          dense>
          </v-text-field>
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
          label="Type"
          dense>
          </v-text-field>
        </div>

        <div class="col">
        <v-text-field
          v-model="status"
          label="Status"
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
        v-on:click.stop.prevent="savePerson">Salvează</v-btn>
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
        conectorClass: "",
        tasksMax:0,
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
   
  
    saveConnector() {
      
      var connector = {
        name : this.name,
        conectorClass : this.conectorClass,
        tasksMax : this.tasksMax,
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