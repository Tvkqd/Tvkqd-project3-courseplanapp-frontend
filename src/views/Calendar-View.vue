<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="pickPrograms"
          >
            Programs
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="pickRooms">
            Rooms
          </v-btn>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="pickFaculty"
          >
            Faculty
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="viewConflicts"
          >
            Conflicts
          </v-btn>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="exportAsFile"
          >
            Export
          </v-btn>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :now="today"
          :events="events"
          :event-color="getEventColor"
          type="week"
          :first-interval="8"
          :interval-minutes="60"
          :interval-count="15"

          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <!-- ====================================================================================================================================== -->
                <v-icon small class="mr-2" @click="editCourse(item.id)"
                  >mdi-pencil</v-icon
                >
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>

              number:
              <span v-html="selectedEvent.number"></span><br>
              dept: 
              <span v-html="selectedEvent.dept"></span> <br>
              room: 
              <span v-html="selectedEvent.room"></span> <br>
              faculty: 
              <span v-html="selectedEvent.faculty"></span><br>
              days: 
              <span v-html="selectedEvent.dayWeek"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import CourseDataService from "../services/CourseDataService";
import FacultyDataService from "../services/FacultyDataService";
import FacultySectionDataService from "../services/FacultySectionDataService";
import RoomDataService from "../services/RoomDataService";
import SectionDataService from "../services/SectionDataService";
import SectionTimeDataService from "../services/SectionTimeDataService";
import SemesterDataService from "../services/SemesterDataService";
import UserDataService from "../services/UserDataService";

export default {
  data: () => ({
    title: "",
    headers: [
      //add course stuff
      { text: "Department", align: "start", sortable: false, value: "dept" },
      { text: "Course Number", value: "course_number", sortable: true },
      { text: "Name", value: "name", sortable: false },
      { text: "Description", value: "description", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    today: "2022-11-06",
    focus: "",
    createEvent: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [],

    courses: [],
    filtered_courses: [],
    sections: [],
    filtered_sections: [],
    sectionTimes: [],
    filtered_sectionTimes: [],
    rooms: [],
    filtered_rooms: [],
    specialList: [],
    officeHours: [],
    filtered_officeHours: [],
    faculty: [],
    filtered_faculty: [],
    facultySections: [],
    filtered_facultySections: [],
    semesters: [],
    filtered_semesters: [],
    users: [],
    filter_dept: "",
    filter_fac_name: "",
    user: [],
    megasections: [],
    filter_room_name: "",
    tempCourse: [],
    tempMegaSec: [],
  }),

  async mounted() {
    this.retrieveAll();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    pickPrograms() {
      // show everything that takes place in this program ==================================================================================================
    },
    pickRooms() {
      // show everything that takes place in this room
    },
    pickFaculty() {
      // show everything that this faculty member does
    },
    viewConflicts() {
      this.$router.push({ name: "Conflicts" });
    },
    exportAsFile() {},
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    getDisplayCourse(course) {
      return {
        id: course.id,
        course_number: course.course_number,
        dept:
          course.dept.length > 30
            ? course.dept.substr(0, 30) + "..."
            : course.dept,
        name:
          course.name.length > 30
            ? course.name.substr(0, 30) + "..."
            : course.name,
        description:
          course.description.length > 30
            ? course.description.substr(0, 30) + "..."
            : course.description,
      };
    },
    getDisplayFaculty(faculty) {
      return {
        id: faculty.id,
        name: faculty.name,
      };
    },
    getDisplayFacultySections(facultySection) {
      return {
        id: facultySection.id,
        facultyId: facultySection.facultyId,
        sectionId: facultySection.sectionId,
      };
    },
    getDisplayRooms(room) {
      return {
        id: room.id,
        number: room.number,
        capacity: room.capacity,
      };
    },
    getDisplaySections(section) {
      return {
        id: section.id,
        number: section.number,
        courseId: section.courseId,
        semesterId: section.semesterId,
      };
    },
    getDisplaySectionTime(sectionTime) {
      // =========================================================================================================================
      return {
        id: sectionTime.id,
        startTime: sectionTime.startTime,
        endTime: sectionTime.endTime,
        dayWeek: sectionTime.dayWeek,
        sectionId: sectionTime.sectionId,
        roomId: sectionTime.roomId,
      };
    },
    getDisplaySemesters(semester) {
      return {
        id: semester.id,
        code: semester.code,
        startDate: semester.startDate,
        endDate: semester.endDate,
      };
    },
    getDisplayUsers(user) {
      return {
        id: user.id,
        email: user.email,
      };
    },
    retrieveAll() {
      CourseDataService.getAll()
        .then((response) => {
          this.courses = response.data.map(this.getDisplayCourse);
          console.log(response.data);
          this.startUp();
          this.sectionsJoinAll();
          console.log("megasections: ");
          console.log(this.megasections);
          console.log(this.events);
          console.log("hi");
        })
        .catch((e) => {
          console.log(e);
        });
      FacultyDataService.getAll()
        .then((response) => {
          this.faculty = response.data.map(this.getDisplayFaculty);
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
      FacultySectionDataService.getAll()
        .then((response) => {
          this.facultySections = response.data.map(
            this.getDisplayFacultySections
          );
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
      RoomDataService.getAll()
        .then((response) => {
          this.rooms = response.data.map(this.getDisplayRooms);
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
      SectionDataService.getAll()
        .then((response) => {
          this.sections = response.data.map(this.getDisplaySections);
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
      SectionTimeDataService.getAll()
        .then((response) => {
          this.sectionTimes = response.data.map(this.getDisplaySectionTime);
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
      SemesterDataService.getAll()
        .then((response) => {
          this.semesters = response.data.map(this.getDisplaySemesters);
          console.log(response.data);
          this.getDepts();
        })
        .catch((e) => {
          console.log(e);
        });
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUsers);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveAll();
      console.log(this.megaSections);
    },
    //================================================================================================================
    filterSectionsByDept() {
      this.filtered_courses = this.courses.filter(
        (course) => course.dept == this.filter_dept
      );

      for (let i = 0; i < this.sections.length; i++) {
        for (let j = 0; j < this.filtered_courses.length; j++) {
          if (this.sections[i].courseId == this.filtered_courses[j].id) {
            this.filtered_sections.push(this.sections[i]);
          }
        }
      }
      console.log(this.filtered_faculty);
      console.log(this.filtered_facultySections);
      console.log(this.filtered_sections);
    },
    filterSectionsByFacName() {
      this.filtered_faculty = this.faculty.filter(
        (faculty) => faculty.name == this.filter_fac_name
      );
      this.filtered_facultySections.filter(
        (facSec) => facSec.facultyId == this.filtered_faculty.id
      );
      for (let i = 0; i < this.sections.length; i++) {
        for (let j = 0; j < this.filtered_facultySections.length; j++) {
          if (
            this.sections[i].courseId == this.filtered_facultySections[j].id
          ) {
            this.filtered_sections.push(this.sections[i]);
          }
        }
      }
    },
    filterSectionsUser() {
      this.filter_fac_name = this.faculty.filter(
        (fac) => fac.userId == this.user.id
      ).name;
      this.filterSectionsByFacName();
    },
    filterSectionsByRoomName() {
      this.filtered_rooms = this.rooms.filter(
        (room) => room.name == this.filter_room_name
      );
      this.filtered_sectionTimes = this.sectionTimes.filter(
        (sectTimes) => sectTimes.roomId == this.filtered_rooms.id
      );
      for (let i = 0; i < this.sections.length; i++) {
        for (let j = 0; j < this.filtered_sectionTimes.length; j++) {
          if (this.sections[i].id == this.filtered_SectionTimes[j].sectionId) {
            this.filtered_sections.push(this.sections[i]);
          }
        }
      }
    },
    startUp() {
      this.filtered_courses = this.courses;
      this.filtered_faculty = this.faculty;
      this.filtered_facultySections = this.facultySections;
      this.filtered_officeHours = this.officeHours;
      this.filtered_rooms = this.rooms;
      this.filtered_semesters = this.semesters;
      this.filtered_sectionTimes = this.sectionTimes;
      this.filtered_sections = this.sections;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    sectionsJoinAll() {
      console.log("hello");

      for (let i = 0; i < this.filtered_sections.length; i++) {
        this.tempSection = this.filtered_sections[i];
        for (let a = 0; a < this.filtered_courses.length; a++) {
          if (this.tempSection.courseId == this.filtered_courses[a].id) {
            this.tempCourse = this.filtered_courses[a];
            break;
          }
        }
        for (let j = 0; j < this.filtered_sectionTimes.length; j++) {
          if (this.filtered_sectionTimes[j].sectionId == this.tempSection.id) {
            for (let k = 0; k < this.filtered_rooms.length; k++) {
              if (
                this.filtered_sectionTimes[j].roomId ==
                this.filtered_rooms[k].id
              ) {
                for (let l = 0; l < this.filtered_facultySections.length; l++) {
                  if (
                    this.tempSection.id ==
                    this.filtered_facultySections[l].sectionId
                  ) {
                    for (let m = 0; m < this.filtered_faculty.length; m++) {
                      if (
                        this.filtered_facultySections[l].facultyId ==
                        this.faculty[m].id
                      ) {
                        this.tempMegaSec.courseName = this.tempCourse.name;
                        this.tempMegaSec.dept = this.tempCourse.dept;
                        this.tempMegaSec.sectionNumber =
                          this.tempSection.number;
                        this.tempMegaSec.startTime =
                          this.filtered_sectionTimes[j].startTime;
                        this.tempMegaSec.endTime =
                          this.filtered_sectionTimes[j].endTime;
                        this.tempMegaSec.dayWeek =
                          this.filtered_sectionTimes[j].dayWeek;
                        this.tempMegaSec.roomName = this.filtered_rooms[k];
                        this.tempMegaSec.FacultyName =
                          this.filtered_faculty[m].name;
                        if (
                          this.tempMegaSec.dayWeek.toString().includes("SU", 0)
                        ) {
                          // console.log("eeeeeeeeeeeeeeeeeeeeee");
                          this.createEvent = {
                            name: this.tempCourse.name,
                            color:
                              this.colors[this.rnd(0, this.colors.length - 1)],
                            start: "2022-11-06 " + this.tempMegaSec.startTime,
                            end: "2022-11-06 " + this.tempMegaSec.endTime,
                            timed: true,
                            dept: this.tempMegaSec.dept,
                            number: this.tempMegaSec.sectionNumber,
                            room: this.tempMegaSec.roomName.number,
                            faculty: this.tempMegaSec.FacultyName,
                            dayWeek: this.tempMegaSec.dayWeek,
                          };

                          this.events.push(this.createEvent);
                        }
                        if (
                          this.tempMegaSec.dayWeek.toString().includes("S", 0) &&
                          !this.tempMegaSec.dayWeek.toString().includes("SU", 0)
                        ) {
                          // console.log("eeeeeeeeeeeeeeeeeeeeee");
                          this.createEvent = {
                            name: this.tempCourse.name,
                            color:
                              this.colors[this.rnd(0, this.colors.length - 1)],
                            start: "2022-11-12 " + this.tempMegaSec.startTime,
                            end: "2022-11-12 " + this.tempMegaSec.endTime,
                            timed: true,
                            dept: this.tempMegaSec.dept,
                            number: this.tempMegaSec.sectionNumber,
                            room: this.tempMegaSec.roomName.number,
                            faculty: this.tempMegaSec.FacultyName,
                            dayWeek: this.tempMegaSec.dayWeek,
                          };

                          this.events.push(this.createEvent);
                        }
                        if (
                          this.tempMegaSec.dayWeek.toString().includes("M", 0)
                        ) {
                          // console.log("eeeeeeeeeeeeeeeeeeeeee");
                          this.createEvent = {
                            name: this.tempCourse.name,
                            color:
                              this.colors[this.rnd(0, this.colors.length - 1)],
                            start: "2022-11-07 " + this.tempMegaSec.startTime,
                            end: "2022-11-07 " + this.tempMegaSec.endTime,
                            timed: true,
                            dept: this.tempMegaSec.dept,
                            number: this.tempMegaSec.sectionNumber,
                            room: this.tempMegaSec.roomName.number,
                            faculty: this.tempMegaSec.FacultyName,
                            dayWeek: this.tempMegaSec.dayWeek,
                          };

                          this.events.push(this.createEvent);
                        }
                        if (
                          this.tempMegaSec.dayWeek.toString().includes("W", 0)
                        ) {
                          // console.log("eeeeeeeeeeeeeeeeeeeeee");
                          this.createEvent = {
                            name: this.tempCourse.name,
                            color:
                              this.colors[this.rnd(0, this.colors.length - 1)],
                            start: "2022-11-09 " + this.tempMegaSec.startTime,
                            end: "2022-11-09 " + this.tempMegaSec.endTime,
                            timed: true,
                            dept: this.tempMegaSec.dept,
                            number: this.tempMegaSec.sectionNumber,
                            room: this.tempMegaSec.roomName.number,
                            faculty: this.tempMegaSec.FacultyName,
                            dayWeek: this.tempMegaSec.dayWeek,
                          };

                          this.events.push(this.createEvent);
                        }
                        if (
                          this.tempMegaSec.dayWeek.toString().includes("F", 0)
                        ) {
                          // console.log("eeeeeeeeeeeeeeeeeeeeee");
                          this.createEvent = {
                            name: this.tempCourse.name,
                            color:
                              this.colors[this.rnd(0, this.colors.length - 1)],
                            start: "2022-11-11 " + this.tempMegaSec.startTime,
                            end: "2022-11-11 " + this.tempMegaSec.endTime,
                            timed: true,
                            dept: this.tempMegaSec.dept,
                            number: this.tempMegaSec.sectionNumber,
                            room: this.tempMegaSec.roomName.number,
                            faculty: this.tempMegaSec.FacultyName,
                            dayWeek: this.tempMegaSec.dayWeek,
                          };

                          this.events.push(this.createEvent);
                        }
                        if (
                          this.tempMegaSec.dayWeek.toString().includes("T", 0) 
                          // &&
                          // !this.tempMegaSec.dayWeek.toString().includes("H", 0)
                        ) {
                          // console.log("eeeeeeeeeeeeeeeeeeeeee");
                          this.createEvent = {
                            name: this.tempCourse.name,
                            color:
                              this.colors[this.rnd(0, this.colors.length - 1)],
                            start: "2022-11-8 " + this.tempMegaSec.startTime,
                            end: "2022-11-8 " + this.tempMegaSec.endTime,
                            timed: true,
                            dept: this.tempMegaSec.dept,
                            number: this.tempMegaSec.sectionNumber,
                            room: this.tempMegaSec.roomName.number,
                            faculty: this.tempMegaSec.FacultyName,
                            dayWeek: this.tempMegaSec.dayWeek,
                          };

                          this.events.push(this.createEvent);
                        }
                        if (
                          this.tempMegaSec.dayWeek.toString().includes("TH", 0)
                        ) {
                          // console.log("eeeeeeeeeeeeeeeeeeeeee");
                          this.createEvent = {
                            name: this.tempCourse.name,
                            color:
                              this.colors[this.rnd(0, this.colors.length - 1)],
                            start: "2022-11-10 " + this.tempMegaSec.startTime,
                            end: "2022-11-10 " + this.tempMegaSec.endTime,
                            timed: true,
                            dept: this.tempMegaSec.dept,
                            number: this.tempMegaSec.sectionNumber,
                            room: this.tempMegaSec.roomName.number,
                            faculty: this.tempMegaSec.FacultyName,
                            dayWeek: this.tempMegaSec.dayWeek,
                          };

                          this.events.push(this.createEvent);
                        }

                        this.megasections.push(this.tempMegaSec); // ==============================================================================================================
                        this.tempMegaSec = [];
                        // console.log(this.tempMegaSec);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  },
};
</script>
