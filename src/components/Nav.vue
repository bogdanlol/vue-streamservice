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
      
            <div v-if="hasWorker && loggedIn"> 
            <v-btn
            color="black"
             to="/home"
            class="custom-btn" text>
              Worker: {{worker.name}}:{{worker.port}}
              Status: {{worker.status}}
            </v-btn>
            </div>
            <div v-else-if="!hasWorker"
              color="orange darken-4"
              class="text-h7 white--text pl-4">
              Please select a worker/container in order to start using the service
            </div>
            <v-spacer></v-spacer>
           <v-btn color="black" v-if="!loggedIn" to="/login" text>
            Login
          </v-btn>

          <v-btn color="black" v-if="loggedIn && isAdmin" to="/admin" text>
          Admin Panel 
        </v-btn>
        <v-menu  v-if="loggedIn"  offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" text color="black">
                <v-avatar
                left
                :color="getRandomColor()"
                size="33">
             
                <span class="white--text ">{{Username.slice(0,2)}}</span>
              </v-avatar>
              
              {{Username}}
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item v-for="(item, index) in services" :key="index" router :to="item.link">
                       <v-list-item-action class ="custom-btn" text color="black">
                        
                            <v-list-item-title class> <v-icon left>{{item.icon}}</v-icon>
                              {{ item.title }}
                               
                            </v-list-item-title>
                           
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
          </v-menu>
  


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
      colors:['orange darken-4'],
      Username : "",
      loggedIn: JSON.parse(localStorage.getItem('user') ? true : false),
      hasWorker: JSON.parse(localStorage.getItem('worker') ? true : false),
      worker:JSON.parse(localStorage.getItem('worker')),
      isAdmin: false,
      services: [{
                icon:"mdi-account",
                title: "User Profile",
                link: "/profile"
            },
            {
                icon :"mdi-wrench",
                title: "Settings",
                link: "/settings"
            },
            {
              icon:" mdi-exit-to-app",
                title: "Logout",
                link: "/logout"
            },
            
        
        ]
    }
  },
  methods:{
    getRandomColor(){
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    logOut()
    {
      localStorage.removeItem('user');
    },
    GetUserName()
    {
    
      let data = (JSON.parse(localStorage.getItem('user')).config.data);
      this.Username = JSON.parse(data).username;
      
    },
    GetAdminRights(){
       AuthenticationService.getIsAdmin().then((response) => {
          this.isAdmin = response.data.admin;
        })
        .catch(() => {
          
        });
    },
    

  },
 async mounted(){
  await this.GetUserName();
  await this.GetAdminRights();
 }
  }
</script>
