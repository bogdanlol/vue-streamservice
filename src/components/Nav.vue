<template>
  <v-app>
    <v-app-bar color="orange darken-4" app dark dense>
      <div>
        <v-btn class="custom-btn"  to="/home" text><v-icon>
          mdi-view-dashboard
        </v-icon>
        </v-btn>
      </div>

      <v-btn v-if="hasWorker"  class="custom-btn"  to="/connectors" text>
        Connectors
      </v-btn>
      <v-btn  v-if="hasWorker"  class="custom-btn"  to="/connectors-plugins" text>
        Connector Plugins
      </v-btn>
      <v-spacer></v-spacer>

            <div v-if="hasWorker" 
            color="orange darken-4"
            class="text-h7 white--text pl-4">
              Worker: {{worker.name}}:{{worker.port}}
              Status: {{worker.status}}
            </div>
            <div v-else-if="!hasWorker"
              color="orange darken-4"
              class="text-h7 white--text pl-4">
              Please select a worker/container in order to start using the service
            </div>
            
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
      hasWorker: JSON.parse(localStorage.getItem('worker') ? true : false),
      worker:JSON.parse(localStorage.getItem('worker')),
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