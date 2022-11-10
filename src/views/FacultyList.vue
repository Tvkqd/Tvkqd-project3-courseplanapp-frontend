<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Search bar-->
    <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Enter a Name"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchFacultyName">
        Search
      </v-btn>
    </v-col>

    <!--Body-->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Faculty</v-card-title>
        <v-data-table
          :headers="headers"
          :items="faculty"
          :items-per-page="10">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="chooseFaculty(item.id)">mdi-book</v-icon>
            <v-icon small class="mr-2" @click="editFaculty(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteFaculty(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>
<script>


import CourseDataService from "../services/FacultyDataService";
export default {
  name: "faculty-list",
  data() {
    return {
      name: '',
      depts : [],
      filter_dept: '',
      faculty: [],
      title: "",
      headers: [
        { text: "Course Number", value: "name", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {

    retrieveFaculty() {
      CourseDataService.getAll()
        .then((response) => {
          this.faculty = response.data.map(this.getDisplayFaculty);
          console.log(response.data);
          // this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveFaculty();
    },
    chooseFaculty(id){
      this.$router.push({ name: "faculty-view", params: { id: id } });
    },
    removeAllFaculty() {
      CourseDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchFacultyName() {
      CourseDataService.findName(this.faculty)
        .then((response) => {
          this.faculty = response.data.map(this.getDisplayFaculty);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterFaculty(){
      CourseDataService.findDept(this.filter_dept)
      .then((response) => {
        this.faculty = response.data.map(this.getDisplayFaculty);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    editFaculty(id) {
      this.$router.push({ name: "updateFaculty", params: { id: id } }); 
    },
    deleteFaculty(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayFaculty(faculty) {
      return {
        id: faculty.id,
        name: faculty.name,
      };
    },
  },
  mounted() {
    this.retrieveFaculty();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.list {
  max-width: 750px;
}
</style>