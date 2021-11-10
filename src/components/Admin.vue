<template>

 <div id="app">
   
  <v-app id="inspire">

   <v-navigation-drawer
    v-if="this.$route.name=='admin'"
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

        <v-list-item-content class="px-2">
            <v-btn 
            plain
            color="deep-gray darken-1"     
            small
            v-on:click="showDiv(item.title)">{{ item.title }}</v-btn>
        </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

     <v-container fluid>
    <div  v-if="this.divs.users">
        <div>
   
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

                <div class="text-h4 font-weight-light" v-if="this.$route.name=='admin'"> Registered users </div>
                <div class="text-h4 font-weight-light" v-if="this.$route.name=='team-panel'"> Registered users for team {{teamName}} </div>
                </div></div></div>

          <v-data-table
            :headers="headersUsers"
            :items="users"
            :search="searchUsers"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1"
            >
           <template v-slot:[`item.Username`]="{ item }">
            <v-avatar
                left
                :color="getRandomColor()"
                size="33">
             
                <span class="white--text ">{{ item.Username.slice(0,2).toUpperCase() }}</span>
              </v-avatar>
              
          {{item.Username.toUpperCase()}}
            
            

          </template>


            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="green darken-2" @click="editUser(item.ID)">mdi-pencil</v-icon>
                </template>
                  <span>Edit User</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" color="red darken-2" @click="deleteUser(item.ID)">mdi-close</v-icon>
                </template>
                  <span>Delete User</span>
              </v-tooltip>
              
               </template>
               
  
   
        


          </v-data-table>
        </div>
      </v-col>
    </v-row>
      
  </div>
    </div>
     </v-container>
       <v-container fluid>
    <div  v-if="this.divs.teams">
        <div>
   
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
   

            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
          
              
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="green darken-2" @click="editTeam(item.ID)">mdi-pencil</v-icon>
                </template>
                  <span>Edit team</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" color="red darken-2" @click="deleteTeam(item.ID)">mdi-close</v-icon>
                </template>
                  <span>Delete team</span>
              </v-tooltip>
              
               </template>
               
          </v-data-table>
        </div>
      </v-col>
    </v-row>
      
  </div>
  
</div>
</v-container>
    
  </v-app>

</div>
</template>

<script>
import UserService from "../services/UserService.js"
import TeamService from "../services/TeamService.js"
export default {
  name: "admin",
  data () {
    return {
      teamName:"",
      team:"",
      searchUsers:"",
      searchTeams:"",
      worker:JSON.parse(localStorage.getItem('worker')),
      users:[],
      teams:[],
      colors:['purple darken-4','red darken-4','pink darken-4','indigo darken-4','teal darken-4','orange darken-4','blue-grey darken-4'],
      headersUsers: [
        { text: "Username", align: "center-justified",value: "Username", sortable: true},
        { text: "Team", value: "teamname", align: "center-justified", sortable: true, class: 'my-header-style'},
        { text: "Role", value: "role", align: "center-justified", sortable: true, class: 'my-header-style'},
        
        { text: "Actions", value: "actions", align: "center",sortable: false, class: 'my-header-style' },

      ],
      headersTeams: [
        { text: "Name", value: "name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Actions", value: "actions", align: "center",sortable: false, class: 'my-header-style' },

      ],

      items: [
        { title: 'Users', icon: 'mdi-human' },
        { title: 'Teams', icon: 'mdi-human-queue' },
        { title: 'Stats', icon: 'mdi-chart-bar' },
      ],
      right: null,
     divs : {users:true,teams:false},
      snackbar: {
                show: false,
                message: null,
                color: null,
            },
    }
  },
 
  methods:
  {
    getRandomColor(){
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    showDiv(title){
        for(var i in this.divs) this.divs[i] = false;
       
        this.divs[title.toLowerCase()] = true; 
    
    },
    editUser(id){
      this.$router.push({ name: "edit-user", params: { id: id } });
    },
    deleteUser(id){
      UserService.deleteUser(id).then(() => {
          this.retrieveUsers();
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    },
    editTeam(id){
      this.$router.push({ name: "edit-team", params: { id: id } });
    },
    deleteTeam(id){
      TeamService.deleteTeam(id).then(() => {
          this.retrieveTeams();
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    },
    retrieveUsers() {
       return UserService.getUsers().then((response) => {
          this.users = response.data.data;
          this.users.forEach(element =>{
           
           let obj = this.teams.find(o => o.ID === element.teamId);
            element.teamname = obj.name;
            if (element.Admin == true){
              element.role = "Administrator";
            }
            else{
              element.role = "User";
            }
            
          })
        
        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      
      },
      retrieveTeams() {
      return  TeamService.getTeams().then((response) => {
          this.teams = response.data.data;

        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
      retrieveUsersFromTeam(team) {
        UserService.getUsersByTeam(team).then((response) => {
          this.users = response.data.data;

        })
        .catch((e) => {
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
      },
     

    
  },
 async mounted(){
    if (this.$route.name=="admin"){
      await this.retrieveTeams();
      await this.retrieveUsers();

    }else{
       await  UserService.getCurrentUser()
        .then((response) => {
          this.teamName  = response.data.team.name;
          this.team=response.data.user.teamId;


        })
        .catch((e) => {
          
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
 
    this.retrieveUsersFromTeam(this.team);
    

    }

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