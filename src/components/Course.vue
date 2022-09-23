<template>
    <div v-if="currentCourse" class="edit-form">
      <h4>Course</h4>
      <form>
        <div class="form-group">
          <label for="dept">Department</label>
          <input type="text" class="form-control" id="dept"
            v-model="currentCourse.dept"
          />
        </div>
        <div class="form-group">
          <label for="course_number">Course Number</label>
          <input type="text" class="form-control" id="course_number"
            v-model="currentCourse.course_number"
          />
        </div>
        <div class="form-group">
          <label for="level">Level</label>
          <input type="text" class="form-control" id="level"
            v-model="currentCourse.level"
          />
        </div>
        <div class="form-group">
          <label for="hours">Hours</label>
          <input type="text" class="form-control" id="hours"
            v-model="currentCourse.hours"
          />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name"
            v-model="currentCourse.name"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description"
            v-model="currentTutorial.description"
          />
        </div>
      </form>
      <button class="badge badge-danger mr-2"
        @click="deleteCourse"
      >
        Delete
      </button>
      <button type="submit" class="badge badge-success"
        @click="updateCourse"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
    <div v-else>
      <br />
      <p>Please click on a Course...</p>
    </div>
  </template>
  <script>
  import CourseDataService from "../services/CourseDataService";
  export default {
    name: "courseTest",
    data() {
      return {
        currentCourse: null,
        message: ''
      };
    },
    methods: {
      getCourse(course_number) {
        CourseDataService.get(course_number)
          .then(response => {
            this.currentCourse = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      updateCourse() {
        CourseDataService.update(this.currentCourse.course_number, this.currentCourse)
          .then(response => {
            console.log(response.data);
            this.message = 'The course was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
      deleteCourse() {
        CourseDataService.delete(this.currentCourse.course_number)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "courses" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getCourse(this.$route.params.course_number);
    }
  };
  </script>
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>