<template>
  <v-card>
    <v-card-title>Add Room</v-card-title>
    
    <v-card-text>
      <v-form>
        <v-text-field 
                v-model="room.number"
                :rules="[(v) => !!v || 'Room number is required']"
                label="Number" 
                required
        ></v-text-field>
        <v-text-field 
                v-model="room.capacity"
                :rules="[(v) => !!v || 'Capacity is required']"
                label="Capacity" 
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
  import CourseDataService from "../services/CourseDataService";
  export default {
    name: "add-room",
    data() {
      return {
        room: {
          number: "",
          capacity: "",
        },
        submitted: false
      };
    },
    methods: {
      save() {
        var data = {
          number: this.room.number,
          capacity: this.room.capacity,
        };
        CourseDataService.create(data)
          .then(response => {
            this.room.number = response.data.number;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
          this.$router.back();
      },

      clear() {

        this.room.number = "";
        this.room.capacity = "";
      },

      newRoom() {
        this.submitted = false;
        this.room = {};
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