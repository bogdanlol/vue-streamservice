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

<v-row align="center" justify="center" dense>
  <v-col cols="4" sm="4" md="4" lg="4">
    <p class ="benef" align="center" v-if="this.$route.name=='edit-user'">Edit User</p>
    <p class ="benef" align="center" v-else >Add User</p>
    <div v-if="!submitted">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        
 
          <v-text-field

            v-model="name"
            label="Name"
            required
            dense>
            </v-text-field>
          
          <div v-if="teams.length !=0">
            <v-select 
   
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
              v-model="teams"
              label="Team"
              required
              dense>
              </v-text-field>
        </div>
         

         <v-select 
              :items="admins"
              v-model="admin"
              label="Admin"
              required
              dense>
              </v-select>
       

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

</v-col>
</v-row>
</div>
</template>

<script>

import UserService from '../services/UserService';
import TeamService from '../services/TeamService';
export default {
  name: "add-users",
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
      var user = {
        name : this.name,
        team : this.team,
        admin:this.admin
      };
      if (this.$route.name=="edit-user"){
        UserService.putUser(user,this.$route.params.id)
        .then(() => {
          this.$router.push('/admin');
         
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
      UserService.postUser(user)
        .then(() => {
          this.$router.push('/admin');
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
    if (this.$route.name=="edit-user"){
       UserService.getUser(this.$route.params.id)
        .then((response) => {
        
          this.name=response.data.data.Username;
          this.team=response.data.data.teamId;
        })
        .catch((e) => {
          
        this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    }
    await TeamService.getTeams().then((response) => {
          response.data.data.forEach(element => {
            this.teams.push({name:element["name"],id:element["ID"]})
          });
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