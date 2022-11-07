<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Body-->

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title v-text=room.name></v-card-title>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="[room]"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editRoom(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteRoom(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
    
  </v-row>
</template>
<script>
import CourseDataService from "../services/CourseDataService";
export default {
  name: "rooms-list",
  props: ["id"],
  data() {
    return {
      room: [],
      title: "",
      headers: [
        { text: "Room Number", value: "number", sortable: true },
        { text: "Cap", align: "start", sortable: false, value: "capacity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveRoom() {
      console.log("hello");
      console.log(this.id); //use correct id (params.id)? (this.id)? (id)?
      CourseDataService.get(this.id)
        .then((response) => {
          this.room = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    refreshList() {
      this.retrieveRoom();
    },
    
    editRoom(id) {
      this.$router.push({ name: "updateRoom", params: { id: id } });
    },
    deleteRoom(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.$router.back();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayRoom(room) {
      return {
        id: room.id,
        number: room.number,
        capacity: room.capacity,
      };
    },
  },
  mounted() {
    this.retrieveRoom();
  }
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>
