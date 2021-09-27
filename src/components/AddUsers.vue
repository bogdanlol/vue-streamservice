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
    <p class ="benef" align="center" v-if="this.$route.name=='edit-user'">Edit User</p>
    <p class ="benef" align="center" v-else >Add User</p>
    <div v-if="!submitted">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        
 
          <v-text-field
            class="centered-input text--darken-3 mt-3" 
            v-model="name"
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
         

         <v-select 
              class="centered-input text--darken-3 mt-3" 
              :items="admins"
              v-model="admin"
              label="Admin"
              required
              dense>
              </v-select>
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

     

       

      </v-form>

       <v-layout align-center justify-center warp>
        
        <v-btn
        :disabled="!isFormValid"
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange darken-1"
        v-on:click.stop.prevent="saveUser">Save</v-btn>
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

import UserService from '../services/UserService';
import TeamService from '../services/TeamService';
export default {
  name: "add-connector",
  data() {
    return {
        isFormValid: false,
        worker:JSON.parse(localStorage.getItem('worker')),
        id:null,
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
 
  methods:
  {
   
    changeType(){
      this.teams.forEach(element => {
  
        if (element['name'] === this.teams){
          this.team=element['id'];
        }
     
      });
    
    },


    saveUser() {
      if (this.password==this.confirmPassword){

      var user = {
        name : this.name,
        team : this.team,
        password : this.password,
        admin:this.admin

      };
      if (this.$route.name=="edit-user"){
        UserService.putUser(user,this.$route.params.id)
        .then(() => {
          this.$router.push('/admin');
          // console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          
          console.log(e);
        });
      }
      else{
      UserService.postUser(user)
        .then(() => {
          this.$router.push('/admin');
          // console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          
          console.log(e);
        });
      }
      }else{
           this.snackbar = {
                        message: "Passwords don't match",
                        color: 'error',
                        show: true
                    }
      }

    },
    getWorker(){
      this.worker = JSON.parse(localStorage.getItem('worker'));
    },
  },
  async mounted(){
    await this.getWorker();
    if (this.$route.name=="edit-user"){
       UserService.getUser(this.$route.params.id)
        .then((response) => {
        
          this.name=response.data.data.Username;
          this.team=response.data.data.teamid;
          this.password=response.data.data.Password;
          this.confirmPassword= response.data.data.Password;

        })
        .catch((e) => {
          
          console.log(e);
        });
    }
    await TeamService.getTeams().then((response) => {
          response.data.data.forEach(element => {
            this.teams.push({name:element["name"],id:element["ID"]})
          });
        })
        .catch((e) => {
          console.log(e);
        });
      
      }
  
};
</script>

<style scoped>
.centered-input >>> input {
      text-align: center
    }
.submit-form {
  max-width: 1000px;
}
.benef{
  font-weight:1000;
  font-size: x-large;
  padding-bottom: 10px;
}
</style>