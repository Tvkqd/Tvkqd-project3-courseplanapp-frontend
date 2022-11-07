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
      path: "/office-hours",
      name: "OfficeHours",
      component: () => import("./views/OfficeHours")
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("./views/Admin-CourseCatalog")
    },
    {
      path: "/adminSchedule",
      name: "Schedule",
      component: () => import("./views/Admin-Schedule")
    },
    {
      path: "/auth",
      name: "Auth",
      component: () => import("./views/Auth-Landing")
    },
    {
      path: "/conflicts",
      name: "Conflicts",
      component: () => import("./views/Chair-ViewConflicts")
    },
    {
      path: "/course/:id", //need to store in url. currently can't reload page manually.
      props: true,
      name: "course-view",
      component: () => import("./views/Course-View")
    },
    {
      path: "/addCourse",
      name: "addCourse",
      component: () => import("./components/AddCourse")
    },
    {
      path: "/update/:id",
      props: true,
      name: "updateCourse",
      component: () => import("./components/UpdateCourse")
    },
    {
      path: "/deleteCourse",
      name: "deleteCourse",
      component: () => import("./components/UpdateCourse")
    },
    {
      path: "/rooms",
      name: "Rooms",
      component: () => import("./views/RoomsList")
    },
    {
      path: "/room/:id", 
      props: true,
      name: "room-view",
      component: () => import("./views/Course-View")
    },
    {
      path: "/addCourse",
      name: "addCourse",
      component: () => import("./components/AddCourse")
    },
    {
      path: "/update/:id",
      props: true,
      name: "updateCourse",
      component: () => import("./components/UpdateCourse")
    },
    {
      path: "/deleteCourse",
      name: "deleteCourse",
      component: () => import("./components/UpdateCourse")
    },
    
  ]
});