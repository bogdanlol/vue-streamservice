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
   
    
    <v-row align="center" >
     
      <v-col cols="col-6">
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
       <v-col cols="col">
         <v-btn text @click="showCategories()">
        <v-icon >mdi-filter </v-icon>
        Categories
        </v-btn>
      </v-col>
        <v-col cols="col" class="text-right">
        <v-btn  class="white--text" to="/connectors/add" color="deep-orange darken-1">Add Connector</v-btn>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="v-card--material mt-4 v-card v-sheet theme--deep-orange">
          <div class="v-card__title align-start">
            <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 orange accent-4 " style="max-width: 100%; width: 100%;">
              <div class="pa-10 white--text">
           
                  
                <div class="text-h5 font-weight-light"> Connectors on http://{{worker.name}}:{{worker.port}}/ </div>
                <div class="text-h5 font-weight-light"> 
                  <v-chip-group
                  active-class="primary--text"
                  column
                  >
                  <v-chip
                    v-for="category in selectedCategoriesNames"
                    :key="category"
                  >
                    {{ category }}
                  </v-chip>
                </v-chip-group>
                </div>
              </div></div></div>
                   
  
            <v-progress-linear
            :active="show"
            :indeterminate="show"
            absolute
            color="deep-purple accent-4"
            ></v-progress-linear>

          <v-data-table
             v-model="selected"
            :headers="headers"
            :items="connectors"
            :search="search"
            show-select
            item-key="ID"
            :single-select="false"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >
 

           <template
          v-if="this.selected.length > 1 ? true : false"
          v-slot:footer
          >

          <v-col>
          <v-row>
         
         <v-btn
        class="ma-2"
        color="deep-orange darken-1"
        dark
        @click="startConnectors()"
      >
        Start Connectors
        <v-icon
          color="blue darken-2"
          right
        >
          mdi-play
        </v-icon>
      </v-btn>
        <v-btn
        class="ma-2"
        color="deep-orange darken-1"
        dark
        @click="stopConnectors()"
      >
        Stop Connectors
        <v-icon
          color="red darken-2"
          right
        >
          mdi-stop
        </v-icon>
      </v-btn>
           </v-row>
          </v-col>

      
     
         
      </template>
          <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getColorSpots(item.status)" dark>{{item.status}}</v-chip>
            </template>
             <template v-slot:[`item.type`]="{ item }">
              <v-chip :color="getColorType(item.type)" dark>{{item.type}}</v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status != 'RUNNING'"  v-on="on"  color="blue darken-2" @click="startConnector(item.ID)">mdi-play</v-icon>
                  <v-icon v-else-if="item.status =='RUNNING'" v-on="on"  color="red darken-2" @click="stopConnector(item.name)">mdi-stop</v-icon>
                </template>
                    <span v-if="item.status != 'RUNNING'">Start Connector</span>
                     <span v-else-if="item.status =='RUNNING'">Stop Connector</span>
              </v-tooltip>
              <v-tooltip bottom>
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="green darken-2" @click="editConnector(item.ID)">mdi-pencil</v-icon>
                </template>
                  <span>Edit connector</span>
              </v-tooltip>
              <v-tooltip bottom>
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on"  @click="openCategoryDialog(item.ID)">mdi-filter</v-icon>
                </template>
                  <span>Tags</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" color="red darken-2" @click="deleteConnector(item.ID)">mdi-close</v-icon>
                </template>
                  <span>Delete Connector</span>
              </v-tooltip>
              
               </template>
               
  
   
        


          </v-data-table>
        </div>
        <v-dialog
          v-model="catsDialog"
          @keydown.esc="this.catsDialog = false"
          max-width="800">  
          <v-card>
        <v-card-title >
          Categories
        </v-card-title>

        <v-card-text>
          <v-combobox
          multiple
          v-model="selectedCategories"
          :items="categories"
          :item-text="'name'"
          :item-value="'ID'"
          small-chips
          >
            
          </v-combobox>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="filterConnectors(selectedCategories)"
          >
            Filter
          </v-btn>
        </v-card-actions>
      </v-card>
         
          </v-dialog>

          <v-dialog
          v-model="connectorCatsDialog"
          @keydown.esc="this.connectorCatsDialog = false"
          max-width="800">  
          <v-card>
        <v-card-title >
          Categories
        </v-card-title>

        <v-card-text>
          <v-combobox
          v-model="selectedCategoriesForConnector"
          :items="categories"
          :search-input.sync="newSearch"
          :item-text="'name'"
          :item-value="'ID'"
          small-chips
          persistent-hint
          hide-selected
          >
            <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ newSearch }}</strong>". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
          </v-combobox>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="addCategoriesForConnector(selectedCategoriesForConnector)"
          >
            Save 
          </v-btn>
        </v-card-actions>
      </v-card>
         
          </v-dialog>
      </v-col>
    </v-row>
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

import ConnectorService from "../services/ConnectorService"
import CategoryService from "../services/CategoryService"
export default {
  name: "connectors",
  data() {
    return {
      selectedCategoriesForConnector:"",
      selectedCategories:[],
      selectedCategoriesNames:[],
      catsDialog:false,
      connectorCatsDialog:false,
      show:false,
      search:"",
      selected :[],
      newSearch:"",
      connectors: [],
      searchCBox: null,
      categories:[],
      storeElements:[],
      selectedConnector:"",
      worker:JSON.parse(localStorage.getItem('worker')),
      headers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Connector Class", value: "connector.class", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Value Converter", value: "value.converter", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Key Converter", value: "key.converter", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Topics", value: "topics", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Type", value: "type", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Status", value: "status", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Actions", value: "actions", align: "center",sortable: false, class: 'my-header-style' },

      ],
       snackbar: {
                show: false,
                message: null,
                color: null,
            },
    };
  },
  methods:{
    async addCategoriesForConnector(categ){
 

      if (typeof categ == "string" ||  categ instanceof String){
        await this.postCategory(categ);
        this.putCategoriesForConnector(this.selectedConnector,categ);
        this.connectorCatsDialog = false;  
      } 
      else{
      this.putCategoriesForConnector(this.selectedConnector,categ.name);
      this.connectorCatsDialog = false;  
      }
    },
    putCategoriesForConnector(connector_id,category){
      CategoryService.putCategoriesForConnector(connector_id,category).then(() => {
           this.snackbar = {
                      message: "Category has been saved",
                      color: 'green',
                      show: true
                    };
     
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    },
    openCategoryDialog(id){
      this.selectedConnector = id;
      this.connectorCatsDialog = true;  
  
      ConnectorService.getCategoryOfConnector(id).then((response) => {
          
          let selectedCatId = response.data.data.category_id;
          this.categories.forEach(element => {
              if (selectedCatId == element.ID){
                this.selectedCategoriesForConnector = element;
              }
          });
          
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });

    },
    filterConnectors(categories){
      this.show=true;
      let categoriesID = [];
      this.selectedCategoriesNames = [];
      categories.forEach(element => {
        categoriesID.push(element.ID);
        this.selectedCategoriesNames.push(element.name);
      });
        if (categoriesID.length!=0){
        CategoryService.getConnectorByCategories(categoriesID).then((response) => {
          this.connectors = response.data.data;
          this.show=false;
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
        }else{
          this.retrieveConnectors(this.worker.ID);
        }
        this.catsDialog = false;
    },
    showCategories(){
      this.catsDialog=true;
    },
    isSelected(){
      return this.selected.length !=0 ? true : false;
    },
    getColorSpots(status){
      if (status == 'RUNNING') return 'green darken-2'
      else if (status == 'PAUSED') return 'orange darken-2'
      else if (status == 'FAILED') return 'red darken-2'
      else if (status == 'NOT RUNNING') return 'red darken-2'
      
      
    },
    getColorType(type){
      if (type == 'sink') return 'green darken-2'
      else if (type == 'source') return 'blue darken-2'
  
      
      
    },
    postCategory(name){
  
      return CategoryService.postCategories(name).then(() => {
         this.retrieveCategories();
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    },
    startConnectors(){

      let connectors =[];
      this.show=true;
      this.selected.forEach(element => {
        if (element.status == "RUNNING"){
          return;
        }
        connectors.push(element.ID)
      });
      ConnectorService.startConnectors(this.worker.ID,connectors).then(() => {
        this.retrieveConnectors(this.worker.ID);
         //this.$router.go();
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
    stopConnectors(){
      this.show=true;
      let connectors =[];
      this.selected.forEach(element => connectors.push(element.name));
      ConnectorService.stopConnectors(this.worker.ID,connectors).then(() => {
         this.retrieveConnectors(this.worker.ID);

        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
    startConnector(id){
      this.show=true;
      ConnectorService.startConnector(id,this.worker.ID).then(() => {
        this.connectors.forEach(element => {
          if (element.ID == id){
            element.status = 'RUNNING';
          }
        });
        this.show=false;
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
    editConnector(id){
      this.$router.push({ name: "edit-connector", params: { id: id } });
    },
    deleteConnector(id){
      this.show=true;
      ConnectorService.deleteConnector(id).then(() => {
          this.retrieveConnectors(this.worker.ID);
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    },
    stopConnector(name){
      this.show=true;
      ConnectorService.stopConnector(name,this.worker.ID).then(() => {
          this.connectors.forEach(element => {
          if (element.name == name){
            element.status = 'NOT RUNNING';
          }
        });
        this.show=false;
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    },
    retrieveConnectors(id) {
        this.show=true;
        ConnectorService.getConnectors(id).then((response) => {
          this.connectors = response.data.data;
          this.connectors.forEach(element => {
            if (element.status ==""){
              element.status ="NOT RUNNING";
            }
          });
          this.show=false;
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
      retrieveCategories() {
        return CategoryService.getCategories().then((response) => {
          this.categories = response.data.data;
          
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
      this.retrieveConnectors(this.worker.ID);
    },
    
    async mounted() {
      await this.getWorker();
      await this.retrieveCategories();
      this.retrieveConnectors(this.worker.ID);
    },
    // watch:{
    //   // selectedCategoriesForConnector: function(newSelected,oldSelected){
    //   // var difference = newSelected.filter(x => !oldSelected.includes(x));
    //   // if (difference[0]!=="" && difference[0] !== undefined && difference[0] !==null && !this.categories.includes(difference[0])){
    //   //   this.postCategory(difference[0]);
    //   // }
        
    //   }
    // }

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