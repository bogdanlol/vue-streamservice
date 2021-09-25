<template>
  <v-app>
    
    <v-app-bar color="white darken-4" app dark dense>
    
      <div>
        <v-btn class="custom-btn"  to="/home" text>
          <img class="mr-3" :src="require('../assets/inglogo.png')" to="/home" height="50"/>
        </v-btn>
      
      </div>

      <v-btn v-if="hasWorker && loggedIn" color="black" class="custom-btn"  to="/connectors" text>
        Connectors
      </v-btn>
      <v-btn  v-if="hasWorker && loggedIn"  color="black" class="custom-btn"  to="/connectors-plugins" text>
        Connector Plugins
      </v-btn>
      <v-spacer></v-spacer>
      
            <div v-if="hasWorker && loggedIn" 
            
            class="text-h7 black--text pl-4">
              Worker: {{worker.name}}:{{worker.port}}
              Status: {{worker.status}}
            </div>
            <div v-else-if="!hasWorker"
              color="orange darken-4"
              class="text-h7 white--text pl-4">
              Please select a worker/container in order to start using the service
            </div>
      
      <v-btn color="black" v-if="loggedIn && isAdmin" to="/admin" text>
        Admin Panel 
      </v-btn>
      <v-btn color="black" v-if="!loggedIn" to="/login" text>
        Login
      </v-btn>
      <v-btn color="black" v-if="loggedIn" @click="logOut" to="/login" text>
        Logout
       <v-icon right>
        mdi-exit-to-app 
      </v-icon>
      </v-btn>

    </v-app-bar>
    
   
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';

export default{
  name: 'Nav',
  data(){
    return {
      loggedIn: JSON.parse(localStorage.getItem('user') ? true : false),
      hasWorker: JSON.parse(localStorage.getItem('worker') ? true : false),
      worker:JSON.parse(localStorage.getItem('worker')),
      isAdmin: false,
    }
  },
  methods:{
    logOut()
    {
      localStorage.removeItem('user');
    },
    GetAdminRights(){
       AuthenticationService.getIsAdmin().then((response) => {
          this.isAdmin = response.data.admin;
        })
        .catch(() => {
          
        });
    }

  },
 async mounted(){
  await this.GetAdminRights();
 }
  }
</script>
