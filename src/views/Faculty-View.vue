<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Body-->

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title v-text=faculty.name></v-card-title>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="[faculty]"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editFaculty(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteFaculty(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
    
  </v-row>
</template>
<script>
import CourseDataService from "../services/FacultyDataService";
export default {
  name: "faculty-list",
  props: ["id"],
  data() {
    return {
      faculty: [],
      title: "",
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveFaculty() {
      console.log("hello");
      console.log(this.id); //use correct id (params.id)? (this.id)? (id)?
      CourseDataService.get(this.id)
        .then((response) => {
          this.faculty = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    refreshList() {
      this.retrieveFaculty();
    },
    
    editFaculty(id) {
      this.$router.push({ name: "updateFaculty", params: { id: id } });
    },
    deleteFaculty(id) {
      CourseDataService.delete(id)
        .then(() => {
          this.$router.back();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayFaculty(faculty) {
      return {
        id: faculty.id,
        name: faculty.name,
        
      };
    },
  },
  mounted() {
    this.retrieveFaculty();
  }
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>
