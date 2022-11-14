<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Change to use COURSE SECTIONS instead of COURSES ======================================================================================-->
    <!-- <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Enter a Course Name"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchCourseName"> Search </v-btn>
    </v-col> -->
    <!-- <v-col>
      <div>
        <label class="typo__label">select Department</label>
        <multiselect
          v-model="filter_dept"
          :options="depts"
          :searchable="true"
          :close-on-select="true"
          placeholder="Pick a Department"
        ></multiselect>
      </div>
    </v-col> -->
    <!-- <v-col cols="12" md="4">
      <v-btn small @click="filterCourse"> Filter </v-btn>
      <v-btn small @click="refreshList"> clear </v-btn>
    </v-col> -->

    <!--Body-->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Course Sections</v-card-title>
        <v-data-table
          :headers="headers"
          :items="megasections"
          :items-per-page="10"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="chooseCourse(item.id)"
              >mdi-book</v-icon
            >
            <v-icon small class="mr-2" @click="editCourse(item.id)"
              >mdi-pencil</v-icon
            >
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
      // { text: "Department", align: "start", sortable: false, value: "dept" },
      { text: "Department", align: "start", sortable: false, value: "dept" },
      { text: "Section Number", value: "sectionNumber", sortable: false },
      { text: "Name", value: "courseName", sortable: false },
      { text: "Faculty", value: "FacultyName", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    focus: "",
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
    name: "",
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
        })
        .catch((e) => {
          console.log(e);
        });
      FacultyDataService.getAll()
        .then((response) => {
          this.faculty = response.data.map(this.getDisplayFaculty);
          console.log(response.data);
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
        })
        .catch((e) => {
          console.log(e);
        });
      RoomDataService.getAll()
        .then((response) => {
          this.rooms = response.data.map(this.getDisplayRooms);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      SectionDataService.getAll()
        .then((response) => {
          this.sections = response.data.map(this.getDisplaySections);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      SectionTimeDataService.getAll()
        .then((response) => {
          this.sectionTimes = response.data.map(this.getDisplaySectionTime);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      SemesterDataService.getAll()
        .then((response) => {
          this.semesters = response.data.map(this.getDisplaySemesters);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUsers);
          console.log(response.data);
          this.startUp();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveAll();
    },
    searchCourseName() {
      CourseDataService.findName(this.name)
        .then((response) => {
          this.courses = response.data.map(this.getDisplayCourse);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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
      this.sectionsJoinAll();
      console.log("megasections: ");
      console.log(this.megasections);
      console.log("hi");
    },
    sectionsJoinAll() {
      this.megasections = [];
      console.log("hello");
      // let b = 0;
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
                        // b++;
                        // this.megasections[b] = this.tempMegaSec;
                        this.tempMegaSec = [];
                        this.megasections.push(this.tempMegaSec);

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
