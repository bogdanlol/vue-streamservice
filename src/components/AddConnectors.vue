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
        
      
          <v-text-field
            v-model="name"
            label="Name"
            required
            dense>
            </v-text-field>
          
          <div class ="row">
            <div class ="col-9">
          <div  v-if="connectorclasses.length !=0">
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
          <div  v-else>
             <v-text-field 
        
              v-model="connectorclass"
              label="Connector Class"
              required
              dense>
              </v-text-field>
        </div>
           </div>
            <div class ="col-3">
         <v-btn
        v-show="generate"
        class="white--text"
        elevation="5" 
        color="deep-orange darken-1"
        v-on:click.stop.prevent="GenerateTemplate">Generate Template</v-btn>
            </div>
        </div>

      
           <div >
        <v-text-field
          v-model="tasksMax"
          label="Maximum Tasks"
          required
          dense>
        </v-text-field>
          </div>

          <div>
        <v-combobox
          :items="convertors"
          v-model="keyConverter"
          label="Key Converter"
          dense>
        </v-combobox>
          </div>
 
    
           <div >
        <v-combobox
          :items="convertors"
          v-model="valueConverter"
          label="Value Converter"
          dense>
        </v-combobox>
          </div>
       

     
         <div >
        <v-text-field
          v-model="topics"
          label="Topics"
          required
          dense>
          </v-text-field>
          </div>
          
          <div> 
        <v-text-field
          v-model="file"
          label="File"
          dense>
          </v-text-field>
          </div>

          
            <div > 
            <v-text-field
          v-model="type"
          disabled
          label="Type"
          dense>
          </v-text-field>

        
        </div>

       

      </v-form>
      <div
          v-for="(input, index) in definedFields"
          :key="`definedFields-${index}`"
          class="input wrapper flex items-center"
        >
        <v-card  outlined >
          <v-layout>
        <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="input.field"
            type="text"
            placeholder=" Enter name of a custom property"
          />
          </v-col>
            <v-col
          cols="12"
          sm="6"
        >
           <v-text-field
            v-model="input.value"
            type="text"
            
            placeholder=" Enter the value of the custom property"
          />
        </v-col>
      </v-row>
          </v-layout>
      </v-card>
          <svg

            @click="addField(input, definedFields)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>

          <!--          Remove Svg Icon-->
          <svg
            v-show="definedFields.length > 1"
            @click="removeField(index, definedFields)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
          </div>
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
        definedFields:[{field:"",value:""}],
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
        generate:false,
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
    
    GenerateTemplate(){
      if(this.type=="sink" && this.connectorclass.includes("file")){
         this.name= "local-file-sink-appName-TopicName";
         this.tasksMax= "1";
         this.file="<path_to_Files_folder>/<fileName>";
         this.definedFields['file.pattern']="'.'yyyy-MM-dd-HH-mm";
         this.topics= "topicName";
         this.valueConverter= "io.confluent.connect.avro.IngAvroConverter";
         this.keyConverter="org.apache.kafka.connect.storage.StringConverter";
         this.definedFields=[];
         this.definedFields.push({
           field:"value.converter.value.ing.serde.avro.sharedsecret",
           value:"<sharedKey>",
         });
         
        this.definedFields.push({
           field:"value.converter.schema.registry.url",
           value:"<schema-registry-urls>",
         });
      }else  if(this.type=="sink" && this.connectorclass.includes("jdbc")){
        this.definedFields=[];
        this.definedFields.push({
           field:"config.providers",
           value:"file",
         });
          this.definedFields.push({
           field:"config.providers.file.class",
           value:"org.ing.config.provider.IngFileConfigProvider",
         });
         
        
        this.name= "local-jdbc-sink-appName-TopicName";
        this.tasksMax= "1";
        this.file="<path_to_Files_folder>/<fileName>";
        this.definedFields['file.pattern']="'.'yyyy-MM-dd-HH-mm";
        this.topics= "topicName";
        this.valueConverter= "io.confluent.connect.avro.IngAvroConverter";
        this.keyConverter="org.apache.kafka.connect.storage.StringConverter";
       this.definedFields.push({
           field:"value.converter.value.ing.serde.avro.sharedsecret",
           value:"<sharedKey>",
         });
         
        this.definedFields.push({
           field:"value.converter.schema.registry.url",
           value:"<schema-registry-urls>",
         });
          this.definedFields.push({
           field:"connection.url",
           value:"jdbc:oracle:thin:@<dbServer>:<dbPort>/<dbServiceName>",
         });
         
        this.definedFields.push({
           field:"connection.user",
           value:"<dbUser>",
         });
          this.definedFields.push({
           field:"connection.password",
           value:"{file:<path_to_config_folder>/pass.properties:<dbPassName>}",
         });
         
        this.definedFields.push({
           field:"table.name.format",
           value:"<tableName>",
         });
         this.definedFields.push({
           field:"errors.tolerance",
           value:"all",
         });
         
        this.definedFields.push({
           field:"errors.deadletterqueue.topic.name",
           value:"<appNAme>dlqtopic",
         });
         this.definedFields.push({
           field:"errors.deadletterqueue.topic.replication.factor",
           value:"1",
         });
         
        this.definedFields.push({
           field:"errors.deadletterqueue.context.headers.enable",
           value:"true",
         });
      }
    },
    
   addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
    changeType(){
      this.connectorclasses.forEach(element => {
        if (element['name'] === this.connectorclass){
          this.type=element['type'];
        }
      });
      this.generate=true;
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
        status : this.status,
        customFields : this.definedFields

      };
        ConnectorService.validateConnector(connector,this.worker.ID)
        .then((response) => {
          
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
          
         this.snackbar = {
                      message: e,
                      color: 'error',
                      show: true
                    };
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
        status : this.status,
        customFields : this.definedFields

      };
      if (this.$route.name=="edit-connector"){
        ConnectorService.putConnector(connector,this.$route.params.id)
        .then(() => {
          this.$router.push('/connectors');
          this.submitted = true;
        })
        .catch((e) => {
          
         this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      }
      else{
      ConnectorService.postConnector(connector)
        .then(() => {
          this.$router.push('/connectors');
          this.submitted = true;
        })
        .catch((e) => {
          
            this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
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
       ConnectorService.getConnector(this.$route.params.id)
        .then((response) => {
          this.name=response.data.data.name;
          this.connectorclass=response.data.data["connector.class"];
          this.tasksMax=response.data.data["tasks.max"];
          this.keyConverter=response.data.data["key.converter"];
          this.valueConverter=response.data.data["value.converter"];
          this.topics=response.data.data.topics;
          this.file=response.data.data.file;
          this.type=response.data.data.type;
          this.definedFields = response.data.data.customFields;

        })
        .catch((e) => {
          
            this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    }
    await ConnectorService.getConnectorClasses(this.worker.ID).then((response) => {
          response.data.data.forEach(element => {
            this.connectorclasses.push({name:element["class"],type:element["type"]})
          });
        })
        .catch((e) => {
            this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    await ConnectorService.getConvertors(this.worker.ID).then((response) => {
          this.convertors=response.data.data;
         
        })
        .catch((e) => {
           this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
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
input {
    width: 100%;
}
</style>