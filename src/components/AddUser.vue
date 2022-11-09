<template>
  <v-card>
    <v-card-title>Add User</v-card-title>
    
    <v-card-text>
      <v-form>
        <v-text-field 
                v-model="user.email"
                :rules="[(v) => !!v || 'Email is required']"
                label="Email" 
                required
        ></v-text-field>
        <v-text-field 
                v-model="user.role"
                :rules="[(v) => !!v || 'Role is required']"
                label="Role" 
                required

        ></v-text-field>
        
    </v-form>
    
    </v-card-text>

   
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="gray" @click="save()">Submit</v-btn>
      <v-btn color="gray" @click="clear()">Clear</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  </template>
  <script>
  import CourseDataService from "../services/UserDataService";
  export default {
    name: "add-user",
    data() {
      return {
        user: {
          email: "",
          role: "",
        },
        submitted: false
      };
    },
    methods: {
      save() {
        var data = {
          number: this.user.email,
          capacity: this.user.role,
        };
        CourseDataService.create(data)
          .then(response => {
            this.user.email = response.user.email;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
          this.$router.back();
      },

      clear() {

        this.user.email = "";
        this.user.role = "";
      },

      newUser() {
        this.submitted = false;
        this.user = {};
      }
    }
  };
  </script>
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>