<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Search bar-->
    <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Enter a Semester Name"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchSemesterName">
        Search
      </v-btn>
    </v-col>

    <!--Body-->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Semesters</v-card-title>
        <v-data-table
          :headers="headers"
          :items="semesters"
          :items-per-page="10">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="chooseSemester(item.id)">mdi-book</v-icon>
            <v-icon small class="mr-2" @click="editSemester(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteSemester(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>
<script>


import CourseDataService from "../services/SemesterDataService";
export default {
  name: "semesters-list",
  data() {
    return {
      name: '',
      depts : [],
      filter_dept: '',
      semesters: [],
      title: "",
      headers: [
        //add semester stuff
        
        { text: "Semester Code", value: "code", sortable: true },
        { text: "Start Date", align: "start", sortable: false, value: "startDate" },
        { text: "End Date", align: "start", sortable: false, value: "endDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {

    retrieveSemesters() {
      CourseDataService.getSemesters()
        .then((response) => {
          this.semesters = response.data.map(this.getDisplaySemesters);
          console.log(response.data);
          // this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveSemesters();
    },
    chooseSemester(id){
      this.$router.push({ name: "semester-view", params: { id: id } });
    },
    removeAllSemesters() {
      CourseDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchSemesterName() {
      CourseDataService.findName(this.name)
        .then((response) => {
          this.semesters = response.data.map(this.getDisplaySemesters);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterSemester(){
      CourseDataService.findDept(this.filter_dept)
      .then((response) => {
        this.semesters = response.data.map(this.getDisplaySemesters);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    editSemester(id) {
      this.$router.push({ name: "updateSemester", params: { id: id } }); 
    },
    deleteSemester(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplaySemesters(semester) {
      return {
        id: semester.id,
        code: semester.code,
        startDate: semester.startDate,
        endDate: semester.endDate,
      };
    },
  },
  mounted() {
    this.retrieveSemesters();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.list {
  max-width: 750px;
}
</style>