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
     <v-col
            cols="12"
            text-align="center"
            align="center"
          >
          <v-progress-linear
            :active="show"
            :indeterminate="show"
            absolute
            color="deep-purple accent-4"
            ></v-progress-linear>
            <v-sheet
              
              min-height="50vh"
            >
            <v-card class="transparent"  min-height="50vh">
              <div>
                &nbsp;
                <h4 class="text-center">Stream Factory WIP</h4>
                <v-card-title class="justify-center"><v-icon x-large>mdi-information-outline</v-icon></v-card-title>
                <div class="send">
                <p>In order for our stream factory platform to generate a viable streaming solutions you're going to have to upload a viable config and a mapping sheet</p>
                <br><p>After those things are done, Please be patient </p>
                 <v-col cols="12" md="12" class="text-center">
        
        <v-btn  class="white--text" @click="uploadConfigOpen()" color="deep-orange darken-1">Upload Config</v-btn>
      </v-col>
    <v-col cols="12" md="12" class="text-center">
        
        <v-btn  class="white--text" @click="uploadInputOpen()" color="deep-orange darken-1">Upload Mapping Sheet</v-btn>
      </v-col>
    <v-col cols="12" md="12" class="text-center">
        
        <v-btn  class="white--text" @click="generateSolution()" color="deep-orange darken-1">Generate Streaming Solution</v-btn>
      </v-col>
                </div>
              </div>
            </v-card>
            </v-sheet>
          </v-col>
   
    

          <v-dialog
          persistent
          v-model="uploadConfig"
          scrollable
          @keydown.esc="uploadConfig = false"
          max-width="400">
        <v-card height="150">
        <template>
        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
            <!-- <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label> -->
              <template>
                <v-file-input
                v-model="config"
                accept=".ini"
                label="Upload config(only accepts archives)"
                ></v-file-input>
              </template>
              <div align="center">
                <v-btn class="white--text" color="deep-orange darken-1" v-on:click="handleConfigFileUpload()">Submit</v-btn>
              </div>
            </div>
        </div>
        </template>  
        <v-card-text style="height: 150px; width:180px;"/>      
        </v-card>
        </v-dialog>

         <v-dialog
          persistent
          v-model="uploadInput"
          scrollable
          @keydown.esc="uploadInput= false"
          max-width="400">
        <v-card height="150">
        <template>
        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
            <!-- <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label> -->
              <template>
                <v-file-input
                v-model="input"
                accept=".xls"
                label="Upload input(only accepts xls)"
                ></v-file-input>
              </template>
              <div align="center">
                <v-btn class="white--text" color="deep-orange darken-1" v-on:click="handleInputFileUpload()">Submit</v-btn>
              </div>
            </div>
        </div>
        </template>  
        <v-card-text style="height: 150px; width:180px;"/>      
        </v-card>
        </v-dialog>
        <v-snackbar 
          :timeout="3000"
          bottom
          outlined
          :color="snackbar.color" 
          v-model="snackbar.show">
            {{ snackbar.message }}
        </v-snackbar>
        </div>
    
      

</template>
<script>


import StreamFactoryService from "../services/StreamFactoryService"
export default {
  name: "stream-factory",
  data() {
    return {
      show:false,
      uploadConfig : false,
      uploadInput: false,
      worker:JSON.parse(localStorage.getItem('worker')),
      config:"",
      input:"",
      files: [],
       snackbar: {
                show: false,
                message: null,
                color: null,
            },
      }
  },
  methods:{
    handleConfigFileUpload(){
        this.files.push(this.config);
        this.uploadConfig = false;
    },
    handleInputFileUpload(){
        this.files.push(this.input);
        this.uploadInput = false;
    },
    generateSolution(){
      this.show=true;
        let formData = new FormData();
        formData.append('config', this.config);
        formData.append('input',this.input);
      
       StreamFactoryService.postStreamFactoryService(formData).then((response)=>{
            this.show=false;
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
  
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'sda.tar.gz');
            document.body.appendChild(fileLink);
   
     fileLink.click();
       }).catch((e)=>{
          this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
       });
     
      
    },
    uploadConfigOpen(){
        this.uploadConfig = true;
    },
    uploadInputOpen(){
        this.uploadInput = true;
    },
      getWorker(){
      this.worker = JSON.parse(localStorage.getItem('worker'));
    },
    },

    async mounted() {
       await this.getWorker();
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