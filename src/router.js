import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        alias: "/home",
        name: "home",
        component: () => import("./components/Home")
      },
      {
        path: "/connectors",
        alias: "/connectors",
        name: "connectors",
        component: () => import("./components/Connectors")
      },
    ]
    });