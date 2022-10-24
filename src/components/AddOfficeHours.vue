<template>
  <v-card>
    <v-card-title>Add Office Hours</v-card-title>
    
    <v-card-text>
      <v-form>
        <v-text-field 
        ></v-text-field>
        <v-text-field 
                label="Start" 
                v-model="event.level"
        ></v-text-field>
        <v-text-field 
                label="End" 
                v-model="event.hours"
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
  import CourseDataService from "../services/CourseDataService";
  export default {
    name: "add-event",
    data() {
      return {
        event: {
          host: "",
          course_number: "",
          level: "",
          hours: "",
          name: "",
          description: ""
        },
        submitted: false
      };
    },
    methods: {
    /* saveTutorial() {
        var data = {
          dept: this.event.dept,
          course_number: this.event.course_number,
          level: this.event.level,
          hours: this.event.hours,
          name: this.event.name,
          description: this.event.description
        };
        CourseDataService.create(data)
          .then(response => {
            this.event.course_number = response.data.course_number;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      */
      save() {
        var data = {
          host: this.event.host,
          course_number: this.event.course_number,
          level: this.event.level,
          hours: this.event.hours,
          name: this.event.name,
          description: this.event.description
        };
        CourseDataService.create(data)
          .then(response => {
            this.event.course_number = response.data.course_number;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
          this.$router.back();
      },

      clear() {

        this.event.host = "";
        this.event.course_number = "";
        this.event.level = "";
        this.event.hours = "";
        this.event.name = "";
        this.event.description = "";
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