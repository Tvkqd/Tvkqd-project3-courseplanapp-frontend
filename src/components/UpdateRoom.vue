<template>
  <v-card>
    <v-card-title>Update Room</v-card-title>

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
      <v-btn color="gray" @click="refreshList()">Reset</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import CourseDataService from "../services/CourseDataService";
export default {
  name: "updateRoom",
  props: ["id"],
  data() {
    return {
      room: {
        number: "",
        capacity: "",
      },
      submitted: false,
    };
  },
  methods: {
    retrieveRoom() {
      console.log("hi");
      console.log(this.id);
      CourseDataService.get(this.id)
        .then((response) => {
          console.log(response.data);
          this.room = response.data;
          this.holdRoom = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveRoom();
    },
    save() {
      var data = {
        number: this.room.number,
        capacity: this.room.capacity,
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
      this.room.number = "";
      this.room.capacity = "";
    },

    newRoom() {
      this.submitted = false;
      this.room = {};
    },
  },
  mounted() {
    this.retrieveRoom();
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
