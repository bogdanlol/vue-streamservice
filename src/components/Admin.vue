<template>
 <div id="app">
  <v-app id="inspire">
   
    <v-navigation-drawer
    permanent
    app
    expand-on-hover
    >
    <v-list
        dense
        nav
    >
        <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        >
        <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title @click="showDiv(item.title)">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <div  v-if="this.divs.users">
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
        <v-btn  class="white--text" to="/users/add" color="deep-orange darken-1">Add User</v-btn>
      </v-col>

    <v-row align="center" >

      <v-col cols="12" md="5">
        <v-text-field
        
          v-model="searchUsers"
          label="Search for user"
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
                <div class="text-h4 font-weight-light"> Registered users </div>
                </div></div></div>

          <v-data-table
            :headers="headersUsers"
            :items="connectors"
            :search="searchUsers"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >
   

          <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getColorSpots(item.status)" dark>{{item.status}}</v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status != 'RUNNING'"  v-on="on"  color="blue darken-2" @click="startConnector(item.ID)">mdi-play</v-icon>
                  <v-icon v-else-if="item.status =='RUNNING'" v-on="on"  color="red darken-2" @click="stopConnector(item.name)">mdi-stop</v-icon>
                </template>
                    <span>Start Connector</span>
              </v-tooltip>
              <v-tooltip bottom>
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="green darken-2" @click="editConnector(item.ID)">mdi-pencil</v-icon>
                </template>
                  <span>Edit connector</span>
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
      </v-col>
    </v-row>
      
  </div>
    </div>
    <div  v-if="this.divs.teams">
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
        <v-btn  class="white--text" to="/teams/add" color="deep-orange darken-1">Add Teams</v-btn>
      </v-col>

    <v-row align="center" >

      <v-col cols="12" md="5">
        <v-text-field
        
          v-model="searchTeams"
          label="Search for teams"
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
                <div class="text-h4 font-weight-light"> Registered Teams </div>
                </div></div></div>

          <v-data-table
            :headers="headersTeams"
            :items="teams"
            :search="searchTeams"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >
   

          <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getColorSpots(item.status)" dark>{{item.status}}</v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status != 'RUNNING'"  v-on="on"  color="blue darken-2" @click="startConnector(item.ID)">mdi-play</v-icon>
                  <v-icon v-else-if="item.status =='RUNNING'" v-on="on"  color="red darken-2" @click="stopConnector(item.name)">mdi-stop</v-icon>
                </template>
                    <span>Start Connector</span>
              </v-tooltip>
              <v-tooltip bottom>
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="green darken-2" @click="editConnector(item.ID)">mdi-pencil</v-icon>
                </template>
                  <span>Edit connector</span>
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
      </v-col>
    </v-row>
      
  </div>
    </div>

    
  </v-app>
</div>
</template>

<script>


export default {
  name: "admin",
  data () {
    return {
      searchUsers:"",
      searchTeams:"",
      worker:JSON.parse(localStorage.getItem('worker')),
      Users:[],
      Teams:[],
      headersUsers: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},

      ],
      headersTeams: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},

      ],

      items: [
        { title: 'Users', icon: 'mdi-human' },
        { title: 'Teams', icon: 'mdi-human-queue' },
        { title: 'Stats', icon: 'mdi-chart-bar' },
      ],
      right: null,
     divs : {users:true,teams:false}
    }
  },
 
  methods:
  {
    showDiv(title){
        for(var i in this.divs) this.divs[i] = false;
        this.divs[title.toLowerCase()] = true; 
    
    },
    changeType(){
      this.connectorclasses.forEach(element => {
        if (element['name'] === this.connectorclass){
          this.type=element['type'];
        }
      });
    }

  },
  async mounted(){
 
  },
  
      
  
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