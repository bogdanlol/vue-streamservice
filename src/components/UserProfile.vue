<template>
    <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="6" sm="6" md="6" lg="6">
            <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                           <v-layout align-center justify-center warp>
                        <v-avatar size="50" color="deep-orange darken-1">
                           <span class="white--text ">{{username.slice(0,2).toUpperCase()}}</span>
                        </v-avatar>
                    
                        {{username.toUpperCase()}}
                        
                    </v-layout>
                    </v-flex>
                    <v-text-field
            class="centered-input text--darken-3 mt-3" 
            v-model="username"
            label="Name"
            required
            dense>
        
            </v-text-field>
                    <div v-if="teams.length !=0">
                      
            <v-select 
              class="centered-input text--darken-3 mt-3" 
              :items="teams"
              :item-text="'name'"
              :item-value="'id'"
              v-model="team"
              v-on:change="changeType()"
              label="Team"
              required
              dense>
              </v-select>
              
          </div>
          <div v-else>
             <v-text-field 
              class="centered-input text--darken-3 mt-3" 
              v-model="teams"
              label="Team"
              required
              dense>
              </v-text-field>
        </div>
        <v-text-field
          class="centered-input text--darken-3 mt-3" 
          v-model="password"
          label="Password"
          type="password"
          required
          dense>
        </v-text-field>
        <v-text-field
          class="centered-input text--darken-3 mt-3" 
          v-model="confirmPassword"
          label="Confirm Password"
          text-align="center"
          type="password"
          required
          dense>
        </v-text-field>
        
                </v-card-text>
                <v-card-actions>
                     <v-layout align-center justify-center warp>
                    <v-btn class="white--text" color="deep-orange darken-1" @click.native="saveUser">
                        <v-icon left dark>mdi-check</v-icon>
                        Save Changes
                    </v-btn>
                      </v-layout>
                </v-card-actions>
            </v-card>
       
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
    </v-container>
</template>

<script>
        import UserService from '../services/UserService';
        import TeamService from '../services/TeamService';
    export default {
        pageTitle: 'my-profile',
     
        data () {
            return {
        isFormValid: false,
        worker:JSON.parse(localStorage.getItem('worker')),
        id:"",
        username: "",
        team:"",
        teams: [],
        admins:[true,false],
        admin:false,
        password:"",
        confirmPassword:"",
        submitted: false,
        errors:[],
         snackbar: {
                show: false,
                message: null,
                color: null,
            },
    };
        },
        methods: {
           
    changeType(){
      this.teams.forEach(element => {
  
        if (element['name'] === this.teams){
          this.team=element['id'];
        }
     
      });
    
    },

    saveUser() {
      if (this.password && this.confirmPassword){
      if (this.password==this.confirmPassword){

      var user = {
        username : this.username,
        team : this.team,
        password : this.password,

      };
    
        UserService.putUser(user,this.id)
        .then(() => {
          this.$router.push('/home');
          // console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          
          console.log(e);
        });
      
      }else{
           this.snackbar = {
                        message: "Passwords don't match",
                        color: 'error',
                        show: true
                    }
      }
      }
      else {
        var userN = {
        username : this.username,
        team : this.team,
      };
       
        UserService.putUser(userN,this.id)
        .then(() => {
          this.$router.push('/home');
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
   
       UserService.getCurrentUser()
        .then((response) => {
          
          this.username=response.data.user.Username;
          this.team=response.data.user.teamId;
          this.id = response.data.user.ID;
        })
        .catch((e) => {
          
          console.log(e);
        });
    
    await TeamService.getTeams().then((response) => {
          response.data.data.forEach(element => {
            this.teams.push({name:element["name"],id:element["ID"]})
          });
        })
        .catch((e) => {
          console.log(e);
        });
      
      
        }
    }
</script>