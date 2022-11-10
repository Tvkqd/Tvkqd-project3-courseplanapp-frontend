<template>
  <v-card>
    <v-card-title>Add Faculty</v-card-title>
    
    <v-card-text>
      <v-form>
        <v-text-field 
                v-model="faculty.name"
                :rules="[(v) => !!v || 'Name is required']"
                label="Name" 
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
  import CourseDataService from "../services/FacultyDataService";
  export default {
    name: "add-faculty",
    data() {
      return {
      faculty: {
        name: "",
      },
        submitted: false
      };
    },
    methods: {
      save() {
        var data = {
          number: this.faculty.name,
        };
        CourseDataService.create(data)
          .then(response => {
            this.faculty.name = response.data.name;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
          this.$router.back();
      },

      clear() {

        this.faculty.name = "";
      },

      newRoom() {
        this.submitted = false;
        this.faculty = {};
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