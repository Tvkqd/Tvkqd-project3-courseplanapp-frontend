<template>
  <v-app>
    <v-app-bar
      app
      color="blue lighten-5"
      dark
    >
      <div class="d-flex align-center">
        <a href="https://www.oc.edu/">
          <v-img
          alt="OC Logo"
          class="shrink mr-2"
          contain
          src="OC-Logo.png"
          transition="scale-transition"
          width="130"
        />
        </a>
        <v-toolbar-items>
          <v-btn to="/" text color="red darken-4">Course</v-btn>
          <!--<v-btn to="/about" text color="red darken-4">About</v-btn>
          <v-btn to="/hello" text color="red darken-4">Hello</v-btn>-->
          <v-btn to="/add" text color="red darken-4">Add</v-btn>
          <!--<v-btn to="/delete" text color="red darken-4">Delete</v-btn>
          <v-btn to="/update" text color="red darken-4">Update</v-btn>-->
        </v-toolbar-items>
      </div>
    </v-app-bar>

    <v-main>
      <!--Load the views files-->
      <router-view/>
    </v-main>

    <v-footer class="pa-3"
    color="blue lighten-5">
    <v-spacer></v-spacer>
    <div style="color:crimson"> Team1&nbsp; &copy; {{ new Date().getFullYear() }}</div>
    <v-spacer></v-spacer>
  </v-footer>

  </v-app>
</template>

<script>



export default {
  name: 'App',
  data() {
   
},
methods: {
 
}
};
</script>
