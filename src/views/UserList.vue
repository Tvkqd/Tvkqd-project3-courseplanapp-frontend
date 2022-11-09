<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Search bar-->
    <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Enter a User Name"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchUserName">
        Search
      </v-btn>
    </v-col>

    <!--Body-->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Users</v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="10">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="chooseUser(item.id)">mdi-book</v-icon>
            <v-icon small class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>
<script>


import CourseDataService from "../services/UserDataService";
export default {
  name: "users-list",
  data() {
    return {
      name: '',
      depts : [],
      filter_dept: '',
      users: [],
      title: "",
      headers: [
        //add users stuff
        
        { text: "Email", value: "email", sortable: true },
        { text: "Role", align: "start", sortable: false, value: "role" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {

    retrieveUsers() {
      CourseDataService.getUsers()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUsers);
          console.log(response.data);
          // this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
    },
    chooseUser(id){
      this.$router.push({ name: "user-view", params: { id: id } });
    },
    removeAllUsers() {
      CourseDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchUserName() {
      CourseDataService.findName(this.name)
        .then((response) => {
          this.users = response.data.map(this.getDisplayUsers);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterUsers(){
      CourseDataService.findDept(this.filter_dept)
      .then((response) => {
        this.users = response.data.map(this.getDisplayUsers);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    editUser(id) {
      this.$router.push({ name: "updateUser", params: { id: id } }); 
    },
    deleteUser(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayUsers(user) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.list {
  max-width: 750px;
}
</style>