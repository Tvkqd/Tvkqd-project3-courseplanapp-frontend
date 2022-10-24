<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Search bar-->

    <!--Body-->

    <v-col cols="12" sm="12">
      <v-sheet height="400">
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          color="primary"
          type="week"
          :first-interval="8"
          :interval-minutes="60"
          :interval-count="8"
        ></v-calendar>
      </v-sheet>
      <v-card class="mx-auto" tile>
        <v-card-title>Events</v-card-title>
        <v-data-table :headers="headers" :items="events" :items-per-page="10">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="chooseEvent(item.id)"
              >mdi-book</v-icon
            >
            <v-icon small class="mr-2" @click="editEvent(item.id)"
              >mdi-pencil</v-icon
            >
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
  data() {
    return {
      today: "2019-01-08",
      depts: [],
      filter_dept: "",
      events: [
        {
          
          start: "2019-01-07 09:00",
          end: "2019-01-07 10:00",
        },
        {
          
          start: "2019-01-10",
        },
        {
          name: "Mashed Potatoes",
          start: "2019-01-09 12:30",
          end: "2019-01-09 15:30",
        },
      ],
      title: "",
      headers: [
        //add event stuff
        { text: "Name", align: "start", sortable: true, value: "name" },
        { text: "Start", value: "start", sortable: false },
        { text: "End", value: "end", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    getDepts() {
      for (let i = 0; i < this.events.length; i++) {
        if (!this.depts.find((dept) => dept === this.events[i].dept))
          this.depts.push(this.events[i].dept);
      }
      console.log(this.depts);
    },
    retrieveEvents() {
      CourseDataService.getAll()
        .then((response) => {
          this.events = response.data.map(this.getDisplayEvent);
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveEvents();
    },
    chooseEvent(id) {
      this.$router.push({ name: "event-view", params: { id: id } }); //eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    },
    removeAllEvents() {
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
          this.events = response.data.map(this.getDisplayEvent);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterCourse() {
      CourseDataService.findDept(this.filter_dept)
        .then((response) => {
          this.events = response.data.map(this.getDisplayCourse);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editEvent(id) {
      this.$router.push({ name: "update", params: { id: id } });
    },
    deleteEvent(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayEvent(event) {
      return {
        id: event.id,
        course_number: event.course_number,
        dept:
          event.dept.length > 30
            ? event.dept.substr(0, 30) + "..."
            : event.dept,
        name:
          event.name.length > 30
            ? event.name.substr(0, 30) + "..."
            : event.name,
        description:
          event.description.length > 30
            ? event.description.substr(0, 30) + "..."
            : event.description,
      };
    },
  },
  mounted() {
    this.retrieveEvents();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.list {
  max-width: 750px;
}
</style>
