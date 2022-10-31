import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "calendar-view",
      //component: () => import("./views/List-View")
      component: () => import("./views/Calendar-View")
    },
    {
      path: "/course/:id", //need to store in url. currently can't reload page manually.
      props: true,
      name: "course-view",
      component: () => import("./views/Course-View")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCourse")
    },
    {
      path: "/update/:id",
      props: true,
      name: "update",
      component: () => import("./components/UpdateCourse")
    },
    {
      path: "/delete",
      name: "delete",
      component: () => import("./components/UpdateCourse")
    },
    {
      path: "/office-hours",
      name: "OfficeHours",
      //component: () => import("./views/List-View")
      component: () => import("./views/OfficeHours")
    },
    {
      path: "/admin",
      name: "Admin",
      //component: () => import("./views/List-View")
      component: () => import("./views/Admin-CourseCatalog")
    },
    {
      path: "/auth",
      name: "Auth",
      //component: () => import("./views/List-View")
      component: () => import("./views/Auth-Landing")
    },
    {
      path: "/conflicts",
      name: "Conflicts",
      //component: () => import("./views/List-View")
      component: () => import("./views/Chair-ViewConflicts")
    },
  ]
});