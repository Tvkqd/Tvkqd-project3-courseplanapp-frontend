<template>
  <v-card>
    <v-card-title>Update User</v-card-title>

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
      <v-btn color="gray" @click="refreshList()">Reset</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import CourseDataService from "../services/UserDataService";
export default {
  name: "updateUser",
  props: ["id"],
  data() {
    return {
      user: {
        email: "",
        role: "",
      },
      submitted: false,
    };
  },
  methods: {
    retrieveUser() {
      console.log("hi");
      console.log(this.id);
      CourseDataService.get(this.id)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          this.holdUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUser();
    },
    save() {
      var data = {
        email: this.user.email,
        role: this.user.role,
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
        this.user.email = "";
        this.user.role = "";
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },
  },
  mounted() {
    this.retrieveUser();
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
