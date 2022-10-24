
<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Body-->

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title v-text=course.name></v-card-title>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="[course]"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editEvent(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteEvent(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
    
  </v-row>
</template>
<script>
import CourseDataService from "../services/CourseDataService";
export default {
  name: "courses-list",
  props: ["id"],
  data() {
    return {
      course: [],
      title: "",
      headers: [
        //add course stuff
        { text: "Name", align: "start", sortable: true, value: "name" },
        { text: "Description", value: "description", sortable: false },
        { text: "Host", value: "dept", sortable: false }, //can have professor, club, chapel, sports, etc (TODO: change dept to host or some other label)
        { text: "Start", value: "start", sortable: false },
        { text: "End", value: "end", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveEvent() {
      console.log("hello");
      console.log(this.id); //use correct id (params.id)? (this.id)? (id)?
      CourseDataService.get(this.id)
        .then((response) => {
          this.course = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    refreshList() {
      this.retrieveEvent();
    },
    
    editEvent(id) {
      this.$router.push({ name: "update", params: { id: id } });
    },
    deleteEvent(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.$router.back();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayCourse(course) {
      return {
        course_number: course.course_number,
        dept: course.dept.length > 30 ? course.dept.substr(0, 30) + "..." : course.dept,
        name: course.name.length > 30 ? course.name.substr(0, 30) + "..." : course.name,
        description: course.description.length > 30 ? course.description.substr(0, 30) + "..." : course.description,
      };
    },
  },
  mounted() {
    this.retrieveEvent();
  }
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>