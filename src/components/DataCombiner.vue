
<script>
  // import CourseDataService from "../services/CourseDataService";
  export default {
    name: "courses-list",
    data() {
      return {
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
        seamesters: [],
        filtered_seamesters: [],
        users: [],
        filter_dept: '',
        filter_fac_name: '',
        user: [],
        magaSections: [],
        filter_room_name: '',
        tempCourse: [],
        tempSection: [],
        tempMageSec: [],
      };
    },
    methods: {
      filterSectionsByDept() {
        this.filtered_courses = this.courses.filter(course => course.dept == this.filter_dept);
        for(let i =0; i < this.sections.length; i++){
          for(let j = 0; j < this.filtered_courses.length;j++){
            if(this.sections[i].courseId == this.filtered_courses[j].id){
              this.filtered_sections.push(this.sections[i]);
            }
          }
        }
          console.log(this.filtered_faculty);
          console.log(this.filtered_facultySections);
          console.log(this.filtered_sections);
      },
      filterSectionsByFacName() {
        this.filtered_faculty = this.faculty.filter(faculty => faculty.name == this.filter_fac_name);
        this.filtered_facultySections.filter(facSec => facSec.facultyId == this.filtered_faculty.id);
        for(let i =0; i < this.sections.length; i++){
          for(let j = 0; j < this.filtered_facultySections.length;j++){
            if(this.sections[i].courseId == this.filtered_facultySections[j].id){
              this.filtered_sections.push(this.sections[i]);
            }
          }
        }
      },
      filterSectionsUser() {
        this.filter_fac_name = this.faculty.filter(fac => fac.userId == this.user.id).name;
        this.filterSectionsByFacName();
      },
      filterSectionsByRoomName() {
        this.filtered_rooms = this.rooms.filter(room => room.name == this.filter_room_name);
        this.filtered_sectionTimes = this.sectionTimes.filter(sectTimes => sectTimes.roomId == this.filtered_rooms.id);
        for(let i =0; i < this.sections.length; i++){
          for(let j = 0; j < this.filtered_sectionTimes.length;j++){
            if(this.sections[i].id == this.filtered_SectionTimes[j].sectionId){
              this.filtered_sections.push(this.sections[i]);
            }
          }
        }
      },
      startUp(){
        this.filtered_courses = this.courses;
        this.filtered_faculty = this.faculty;
        this.filtered_facultySections = this.facultySections;
        this.filtered_officeHours = this.officeHours;
        this.filtered_rooms = this.rooms;
        this.filtered_seamesters = this.seamesters;
        this.filtered_sectionTimes = this.sectionTimes;
        this.filtered_sections = this.sections;
      },
      sectionsJoinAll() {
        for(let i = 0; i < this.filtered_sections.length;i++){
          this.tempSection = this.filtered_sections[i];
          for(let a =0;a < this.filtered_courses;a++){
            if(this.tempSection.courseId == this.filtered_courses[a].id){
              this.tempCourse = this.filtered_courses[a];
              break;
            }
          }
          for(let j =0;j< this.filtered_sectionTimes.length;j++){
            if(this.filtered_sectionTimes[j].sectionId == this.tempSection.id){
              for(let k=0;k < this.filtered_rooms.length;k++){
                if(this.filtered_sectionTimes[j].roomId == this.filtered_rooms[k].id){
                  for(let l=0;l< this.filtered_facultySections.length;l++){
                    if(this.tempSection.id == this.filtered_facultySections[l].sectionId){
                      for(let m=0;m< this.filtered_faculty.length;m++){
                        if(this.filtered_facultySections[l].facultyId == this.faculty[m].id){
                          this.tempMageSec.courseName = this.tempCourse.name;
                          this.tempMageSec.dept = this.tempCourse.dept;
                          this.tempMageSec.name = this.tempCourse.name;
                          this.tempMageSec.sectionNumber = this.tempSection.number;
                          this.tempMageSec.startTime = this.filtered_sectionTimes[j].startTime;
                          this.tempMageSec.endTime = this.filtered_sectionTimes[j].endTime;
                          this.tempMageSec.dayWeek = this.filtered_sectionTimes[j].dayWeek;
                          this.tempmageSec.roomName = this.filtered_rooms[k]
                          this.tempMageSec.FacultyName = this.filtered_faculty[m].name;
                          this.magaSections.push(this.tempMageSec);
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
      


    //   refreshList() {
    //     this.retrieveCourses();
    //     this.currentCourse = null;
    //     this.currentIndex = -1;
    //   },
    //   setActiveCourse(course, index) {
    //     this.currentCourse = course;
    //     this.currentIndex = index;
    //   },
    //   removeAllCourses() {
    //     CourseDataService.deleteAll()
    //       .then(response => {
    //         console.log(response.data);
    //         this.refreshList();
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   },
      
    //   searchName() {
    //     CourseDataService.findName(this.name)
    //       .then(response => {
    //         this.courses = response.data;
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   }
    },
    mounted() {
      // this.retrieveCourses();
    }
  };
  </script>