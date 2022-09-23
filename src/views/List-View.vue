
<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Search bar-->
    <v-col cols="12" md="8">
      <v-text-field v-model="course_name" label="Enter a Course Name"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchCourseName">
        Search
      </v-btn>
    </v-col>
    <v-col>
      <div>
        <label class="typo__label">select Department</label>
        <multiselect v-model="filter_dept" :options="depts" :searchable="true" :close-on-select="true" placeholder="Pick a Department"></multiselect>
      </div>
    </v-col>
      <v-col cols="12" md="4">
      <v-btn small @click="filterCourse">
        Filter
      </v-btn>
      <v-btn small @click="refreshList">
        clear
      </v-btn>
    </v-col>

    <!--Body-->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Courses</v-card-title>
        <v-data-table
          :headers="headers"
          :items="courses"
          :items-per-page="10">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="chooseCourse(item.id)">mdi-book</v-icon>
            <v-icon small class="mr-2" @click="editCourse(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteCourse(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <!-- <v-card-actions v-if="courses.length > 0">
            <v-btn small color="error" @click.native="removeAllCourses">
              Remove All
            </v-btn>
          </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

import Multiselect from 'vue-multiselect';
import CourseDataService from "../services/CourseDataService";
export default {
  name: "courses-list",
  data() {
    return {
      depts : [],
      filter_dept: '',
      courses: [],
      title: "",
      headers: [
        //add course stuff
        { text: "Department", align: "start", sortable: false, value: "dept" },
        { text: "Course Number", value: "course_number", sortable: true },
        { text: "Name", value: "name", sortable: false },
        { text: "Description", value: "description", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  components: {
    Multiselect
  },
  methods: {
    getDepts(){
      for(let i=0;i<this.courses.length;i++){
        if(!this.depts.find(dept => dept === this.courses[i].dept))
          this.depts.push(this.courses[i].dept)
      }
      console.log(this.depts);
    },
    retrieveCourses() {
      CourseDataService.getAll()
        .then((response) => {
          this.courses = response.data.map(this.getDisplayCourse);
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveCourses();
    },
    chooseCourse(id){
      this.$router.push({ name: "course-view", params: { id: id } });
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
    searchCourseName() {
      CourseDataService.findName(this.course_name)
        .then((response) => {
          this.courses = response.data.map(this.getDisplayCourse);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterCourse(){
      CourseDataService.findDept(this.filter_dept)
      .then((response) => {
        this.courses = response.data.map(this.getDisplayCourse);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    editCourse(id) {
      this.$router.push({ name: "update", params: { id: id } });
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
    getDisplayCourse(course) {
      return {
        id: course.id,
        course_number: course.course_number,
        dept: course.dept.length > 30 ? course.dept.substr(0, 30) + "..." : course.dept,
        name: course.name.length > 30 ? course.name.substr(0, 30) + "..." : course.name,
        description: course.description.length > 30 ? course.description.substr(0, 30) + "..." : course.description,
      };
    },
  },
  mounted() {
    this.retrieveCourses();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.list {
  max-width: 750px;
}
</style>