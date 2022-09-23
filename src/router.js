import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "list-view",
      component: () => import("./views/List-View")
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
    }
  ]
});