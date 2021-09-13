<template>
  <v-app>
    <v-app-bar color="blue-grey darken-4" app dark dense>
      <div>
        <v-btn class="custom-btn"  to="/home" text><v-icon>
          mdi-view-dashboard
        </v-icon>
        </v-btn>
      </div>

      <v-btn class="custom-btn"  to="/connectors" text>
        Connectors
      </v-btn>
      <v-btn class="custom-btn"  to="/connectors-plugins" text>
        Connector Plugins
      </v-btn>

  
  
    </v-app-bar>
    
   
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default{
  name: 'Nav',
  data(){
    return {
    
    }
  }}
</script>

<style scoped>
.custom-btn::before {
    color: transparent
}
.custom-btn:hover {
    color: #FF5722;
}
</style>