<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Body-->

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title v-text=user.email></v-card-title>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="[user]"
        >
          <template v-slot:[`item.actions`]="{ item }">
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
  name: "user-list",
  props: ["id"],
  data() {
    return {
      user: [],
      title: "",
      headers: [
        { text: "Email", value: "email", sortable: true },
        { text: "Role", align: "start", sortable: false, value: "role" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveUsers() {
      console.log("hello");
      console.log(this.id); //use correct id (params.id)? (this.id)? (id)?
      CourseDataService.get(this.id)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    refreshList() {
      this.retrieveUsers();
    },
    
    editUser(id) {
      this.$router.push({ name: "updateUser", params: { id: id } });
    },
    deleteUser(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.$router.back();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayUser(user) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        
      };
    },
  },
  mounted() {
    this.retrieveUser();
  }
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>
