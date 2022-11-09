<template>
  <v-card>
    <v-card-title>Update Faculty</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          v-model="faculty.name"
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
      <v-btn color="gray" @click="refreshList()">Reset</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import CourseDataService from "../services/FacultyDataService";
export default {
  name: "updateFaculty",
  props: ["id"],
  data() {
    return {
      faculty: {
        name: "",
      },
      submitted: false,
    };
  },
  methods: {
    retrieveFaculty() {
      console.log("hi");
      console.log(this.id);
      CourseDataService.get(this.id)
        .then((response) => {
          console.log(response.data);
          this.faculty = response.data;
          this.holdFaculty = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrievefaculty();
    },
    save() {
      var data = {
        number: this.faculty.name,
      };
      console.log(this.id);
      CourseDataService.update(this.id, data)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
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
    },
  },
  mounted() {
    this.retrieveFaculty();
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
