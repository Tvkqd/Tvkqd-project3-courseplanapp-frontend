
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
      };
    },
    methods: {
        filterSectionsByDept(filter_dept = this.filter_dept) {
            this.filtered_courses = this.courses.filter(course => course.dept == filter_dept);
            this.filtered_sections = this.sections.filter(section => section.courseId in this.filtered_courses.id);
            return this.filtered_courses, this.filtered_sections;
        },
      retrieveCourses() {
        CourseDataService.getAll()
          .then(response => {
            this.courses = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
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