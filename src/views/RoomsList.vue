<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Search bar-->
    <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Enter a Room Name"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchRoomName">
        Search
      </v-btn>
    </v-col>

    <!--Body-->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Rooms</v-card-title>
        <v-data-table
          :headers="headers"
          :items="rooms"
          :items-per-page="10">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="chooseRoom(item.id)">mdi-book</v-icon>
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
  data() {
    return {
      name: '',
      depts : [],
      filter_dept: '',
      rooms: [],
      title: "",
      headers: [
        //add room stuff
        
        { text: "Room Number", value: "number", sortable: true },
        { text: "Cap", align: "start", sortable: false, value: "capacity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {

    retrieveRooms() {
      CourseDataService.getRooms()
        .then((response) => {
          this.rooms = response.data.map(this.getDisplayRoom);
          console.log(response.data);
          // this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveRooms();
    },
    chooseRoom(id){
      this.$router.push({ name: "room-view", params: { id: id } });
    },
    removeAllRooms() {
      CourseDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchRoomName() {
      CourseDataService.findName(this.name)
        .then((response) => {
          this.rooms = response.data.map(this.getDisplayRoom);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterRoom(){
      CourseDataService.findDept(this.filter_dept)
      .then((response) => {
        this.rooms = response.data.map(this.getDisplayRoom);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    editRoom(id) {
      this.$router.push({ name: "updateRoom", params: { id: id } }); 
    },
    deleteRoom(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.refreshList();
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
    this.retrieveRooms();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.list {
  max-width: 750px;
}
</style>