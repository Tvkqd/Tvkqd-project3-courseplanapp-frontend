
<template>
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8">
        <v-text-field v-model="course_number" label="Enter a Course Number"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn small @click="searchCourseNumber">
          Search
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Courses</v-card-title>
          <v-data-table
            :headers="headers"
            :items="courses"
            :items-per-page="10"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="gray">
                <v-icon small class="ma-2">mdi-pencil</v-icon>
              </v-btn>
              <v-icon small @click="deleteCourse(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <v-card-actions v-if="courses.length > 0">
            <v-btn small color="error" @click="removeAllCourses">
              Remove All
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
  <script>
  import CourseDataService from "../services/CourseDataService";
  export default {
    name: "courses-list",
    data() {
      return {
        courses: [],
        title: "",
        headers: [
          //add course stuff
          { text: "Department", align: "start", sortable: false, value: "dept" },
          { text: "Course Number", value: "course_number", sortable: false },
          { text: "Name", value: "name", sortable: false },
          { text: "Description", value: "description", sortable: false },
        ],
      };
    },
    methods: {
      retrieveCourses() {
        CourseDataService.getAll()
          .then((response) => {
            this.courses = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveCourses();
      },
      removeAllCourses() {
        CourseDataService.deleteAll()
          .then((response) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      searchCourseNumber() {
        CourseDataService.get(this.course_number)
          .then((response) => {
            this.courses = response.data.map(this.getDisplayCourses);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      editCourse(id) {
        this.$router.push({ name: "course-details", params: { id: id } });
      },
      deleteCourse(id) {
        CourseDataService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
    mounted() {
      this.retrieveCourses();
    },
  };
  </script>
  <style>
  .list {
    max-width: 750px;
  }
  </style>