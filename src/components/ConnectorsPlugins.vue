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
        
        <v-btn  class="white--text" @click="uploadDialogOpen()" color="deep-orange darken-1">Upload Connector</v-btn>
      </v-col>

    <v-row align="center" >

      <v-col cols="12" md="5">
        <v-text-field
        
          v-model="search"
          label="Search for connector"
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
              <div class="pa-10 white--text">
                <div class="text-h5 font-weight-light"> Connectors Plugins on http://localhost:8083/ </div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="connectorsPlugins"
            :search="search"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >


          </v-data-table>

          <v-dialog
          persistent
          v-model="uploadDialog"
          scrollable
          @keydown.esc="uploadDialog = false"
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
                v-model="files"
                accept=".tar.gz,.zip"
                label="Upload plugin(only accepts archives)"
                ></v-file-input>
              </template>
              <div align="center">
                <v-btn class="white--text" color="deep-orange darken-1" v-on:click="submitFile()">Submit</v-btn>
              </div>
            </div>
        </div>
        </template>  
        <v-card-text style="height: 150px; width:180px;"/>      
        </v-card>
        </v-dialog>

        </div>
      </v-col>
    </v-row>
      
  </div>
</template>
<script>

import ConnectorService from "../services/ConnectorService"

export default {
  name: "connectors",
  data() {
    return {
      uploadDialog : false,
      search:"",
      connectorsPlugins: [],
      worker:JSON.parse(localStorage.getItem('worker')),
      files: [],
      headers: [
        { text: "Class", value: "class", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Type", value: "type", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Version", value: "version", align: "center", sortable: true, class: 'my-header-style' },

      ],
    };
  },
  methods:{
    handleFileUpload(){
        this.file = this.$refs.file.files[0];
    },
    submitFile(){
        let formData = new FormData();
         
        formData.append('file', this.files);
       
        ConnectorService.postConnectorPlugin(formData,this.worker.ID).then(() => {
        this.refreshList();
        }).catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      
    },
    uploadDialogOpen(){
        this.uploadDialog = true;
    },
    retrieveConnectorsPlugins(id) {
        ConnectorService.getConnectorClasses(id).then((response) => {
          this.connectorsPlugins = response.data.data;
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
      getWorker(){
      this.worker = JSON.parse(localStorage.getItem('worker'));
    },
    },
    refreshList() {
      this.retrieveConnectorsPlugins(this.worker.ID);
    },
    async mounted() {
       await this.getWorker();
       this.retrieveConnectorsPlugins(this.worker.ID);
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