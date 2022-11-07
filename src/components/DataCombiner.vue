
<script>
  import CourseDataService from "../services/CourseDataService";
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
        user: []
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
      this.retrieveCourses();
    }
  };
  </script>