<template>
  <v-card>
    <v-card-title>Update Semester</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          v-model="semester.code"
          :rules="[(v) => !!v || 'Code is required']"
          label="Code"
          required
        ></v-text-field>
        <v-text-field
          v-model="semester.startDate"
          :rules="[(v) => !!v || 'Start Date is required']"
          label="Start Date"
          required
        ></v-text-field>
        <v-text-field
          v-model="semester.endDate"
          :rules="[(v) => !!v || 'End Date is required']"
          label="End Date"
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
import SemesterDataService from "../services/SemesterDataService";
export default {
  name: "updateSemester",
  props: ["id"],
  data() {
    return {
      semester: {
        code: "",
        startDate: "",
        endDate: "",
      },
      submitted: false,
    };
  },
  methods: {
    retrieveSemester() {
      console.log("hi");
      console.log(this.id);
      SemesterDataService.get(this.id)
        .then((response) => {
          console.log(response.data);
          this.semester = response.data;
          this.holdSemester = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveSemester();
    },
    save() {
      var data = {
        code: this.semester.code,
        startDate: this.semester.startDate,
        endDate: this.semester.endDate,
      };
      console.log(this.id);
      SemesterDataService.update(this.id, data)
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
      this.semester.code = "";
      this.semester.startDate = "";
      this.semester.endDate = "";
    },

    newSemester() {
      this.submitted = false;
      this.semester = {};
    },
  },
  mounted() {
    this.retrieveSemester();
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
