<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Body-->

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title v-text="semester.code"></v-card-title>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="[semester]"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editSemester(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteSemester(item.id)">mdi-delete</v-icon>
          </template>

        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import SemesterDataService from "../services/SemesterDataService";
export default {
  name: "semester-list",
  props: ["id"],
  data() {
    return {
      semester: [],
      title: "",
      headers: [
        { text: "Semester Code", value: "code", sortable: true },
        {
          text: "Start Date",
          align: "start",
          sortable: false,
          value: "startDate",
        },
        { text: "End Date", align: "start", sortable: false, value: "endDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveSemester() {
      console.log("hello");
      console.log(this.id); //use correct id (params.id)? (this.id)? (id)?
      SemesterDataService.get(this.id)
        .then((response) => {
          this.semester = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSemester();
    },

    editSemester(id) {
      this.$router.push({ name: "updateSemester", params: { id: id } });
    },
    deleteSemester(id) {
      SemesterDataService.delete(id)
        .then(() => {
          this.$router.back();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplaySemester(semester) {
      return {
        id: semester.id,
        code: semester.code,
        startDate: semester.startDate,
        endDate: semester.endDate,
      };
    },
  },
  mounted() {
    this.retrieveSemester();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>
