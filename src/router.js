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
      path: "/updateCourse/:id",
      props: true,
      name: "updateCourse",
      component: () => import("./components/UpdateCourse")
    },
    {
      path: "/deleteCourse",
      name: "deleteCourse",
      component: () => import("./components/UpdateCourse") //what????????????????????????????
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
      component: () => import("./views/Room-View")
    },
    {
      path: "/addRoom",
      name: "addRoom",
      component: () => import("./components/AddRoom")
    },
    {
      path: "/updateRoom/:id",
      props: true,
      name: "updateRoom",
      component: () => import("./components/UpdateRoom")
    },
    {
      path: "/faculty",
      name: "Faculty",
      component: () => import("./views/FacultyList")
    },
    {
      path: "/faculty/:id", 
      props: true,
      name: "faculty-view",
      component: () => import("./views/Faculty-View")
    },
    {
      path: "/addFaculty",
      name: "addFaculty",
      component: () => import("./components/AddFaculty")
    },
    {
      path: "/updateFaculty/:id",
      props: true,
      name: "updateFaculty",
      component: () => import("./components/UpdateFaculty")
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("./views/UserList")
    },
    {
      path: "/user/:id", 
      props: true,
      name: "user-view",
      component: () => import("./views/User-View")
    },
    {
      path: "/addUser",
      name: "addUser",
      component: () => import("./components/AddUser")
    },
    {
      path: "/updateUser/:id",
      props: true,
      name: "updateUser",
      component: () => import("./components/UpdateUser")
    },
  ]
});