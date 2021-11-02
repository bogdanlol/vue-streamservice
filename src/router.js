import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
      {
        path: "/login",
        alias: "/login",
        name: "login",
        component: () => import("./components/Login")
      },
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
      {
        path: "/connectors/add",
        alias: "/connectors/add",
        name: "add-connectors",
        component: () => import("./components/AddConnectors")
      },
      {
        path: "/connectors/edit/:id",
        name: "edit-connector",
        component: () => import("./components/AddConnectors")
      },
      {
        path: "/connectors-plugins",
        name: "connector-plugins",
        component: () => import("./components/ConnectorsPlugins")
      },
      {
        path: "/worker/:id",
        name: "worker",
        component: () => import("./components/Worker")
      },
      {
        path: "/admin/",
        name: "admin",
        component: () => import("./components/Admin")
      },
      {
        path: "/team-panel/",
        name: "team-panel",
        component: () => import("./components/Admin")
      },
      {
        path: "/users/add",
        alias: "/users/add",
        name: "add-users",
        component: () => import("./components/AddUsers")
      },
      {
        path: "/teams/add",
        alias: "/teams/add",
        name: "add-team",
        component: () => import("./components/AddTeams")
      },
      {
        path: "/users/edit/:id",
        name: "edit-user",
        component: () => import("./components/AddUsers")
      },
      {
        path: "/teams/edit/:id",
        name: "edit-team",
        component: () => import("./components/AddTeams")
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("./components/UserProfile")
      },
      {
        path: "/stream-factory",
        name: "stream-factory",
        component: () => import("./components/StreamFactory")
      },
    ]
    });