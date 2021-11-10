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
    <p class ="benef" align="center" v-if="this.$route.name=='edit-team'">Edit Team</p>
    <p class ="benef" align="center" v-else >Add Team</p>
    <div v-if="!submitted">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        
 
          <v-text-field
            class="centered-input text--darken-3 mt-3" 
            v-model="name"
            label="Name"
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
        v-on:click.stop.prevent="saveTeam">Save</v-btn>
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


import TeamService from '../services/TeamService';
export default {
  name: "add-team",
  data() {
    return {
        isFormValid: false,
        worker:JSON.parse(localStorage.getItem('worker')),
        id:null,
        name: "",
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
   

    saveTeam() {


      var team = {
        name : this.name,

      };
      if (this.$route.name=="edit-team"){
        TeamService.putTeam(team,this.$route.params.id)
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
      TeamService.postTeam(team)
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
    if (this.$route.name=="edit-team"){
       TeamService.getTeam(this.$route.params.id)
        .then((response) => {
        
          this.name=response.data.data.name;


        })
        .catch((e) => {
          
         
                    this.snackbar = {
                      message: 'Errors: '+ e,
                      color: 'error',
                      show: true
                    };
        });
    }

      
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