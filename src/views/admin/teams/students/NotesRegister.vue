<template>

  <div class="card">

    <div v-if="teamGridTemplate" class="card-body">
        
        <h5 class="list-inline-item card-title fs-6">CURSO:</h5>
        <h6 class="list-inline-item card-subtitle mb-2 text-muted">{{ teamGridTemplate.course_name | uppercase }}</h6>
        <br/>
        <h5 class="list-inline-item card-title fs-6">NOME:</h5>
        <h6 class="list-inline-item card-subtitle mb-2 text-primary">{{ student.name | uppercase }}</h6>
        <br/>
        <h5 class="list-inline-item card-title fs-6">CPF:</h5>
        <h6 class="list-inline-item card-subtitle mb-2 text-muted">{{ student.cpf }}</h6>
        <br/>
        <h5 class="list-inline-item card-title fs-6">GRADE:</h5>
        <h6 class="list-inline-item card-subtitle mb-2 text-muted">{{ teamGridTemplate.grid_name | uppercase }}</h6>

        <form ref="formHistoric" @submit.prevent="saveGrades">
            <table class="table table-hover">

            <thead>
                <tr>
                <th>DISCIPLINA</th>
                    <th v-for="stage in teamGridTemplate.stagesNumbers" :key="stage">
                        ETAPA {{ stage }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(discipline, name) in teamGridTemplate.list" :key="name">
                    <td>{{ name }}</td>
                    <td v-for="(stage, index) in discipline" :key="index">
                        <TheMask
                            style="width:60px; margin: 0 auto"
                            type="text"
                            class="form-control form-control-sm"
                            :value="getGradeByInput(stage.stage_id, stage.discipline_id, $route.params.id)"
                            :name="'grade[' + $route.params.student + '][' + stage.stage_id + '][' + stage.discipline_id + '][' + $route.params.id + ']'"
                            :mask="['#.#', '##.#']"
                            :masked="true"
                            :placeholder="'0.0'"
                        />
                    </td>
                </tr>
            </tbody>
            </table>

            <div class="form-group text-center my-2">
                <button 
                    type="submit" 
                    class="btn btn-success btn-sm" 
                    id="btnSaveGrades"
                >
                SALVAR NOTAS
                </button>
            </div>

        </form>

    </div>

    <LoadingPage v-else />

  </div>
</template>

<script>
import api from "@/services";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "NotesRegister",
  components: {
    LoadingPage,
  },
  data() {
    return {
      student: null,
      notes: [],
      teamGridTemplate: null,
    };
  },
  watch: {
    '$route' (to, from) {
        this.getStudent();
        this.getGridTemplate();
        this.getNotesByStudent();
    }
  },
  methods: {
    async saveGrades() {

        const formData = new FormData(this.$refs.formHistoric);

        try {
            const result = await api.post(`/grades`, formData);

            this.$swal({
                title: "Sucesso!",
                text: result.data.message,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
                }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });

        } catch (error) {
            Toast.fire("Error", error.response.data.message, "error");
        }

    },
    getGradeByInput(stageId, disciplineId, teamId){

        if(!this.notes.length)
            return;

        const gradeFiltered = this.notes.filter((grade) => grade.stage_id == stageId && grade.discipline_id == disciplineId && grade.team_id == teamId);
        return gradeFiltered.length ? gradeFiltered[0].grade : '0.0';
    },
    async getStudent() {
      await api.get(`/students/${this.$route.params.student}`).then((res) => {
        this.student = res.data[0];
      });
    },
    async getNotesByStudent() {
      const record = await api.get(
        `/grades/${this.$route.params.student}/get-grade-by-student?`
      );
      this.notes = record.data;
    },
    async getGridTemplate() {
      /** this.$route.params.id = team_id */
      await api
        .get(`/grids/${this.$route.params.id}/get-full-grid`)
        .then((res) => {
          this.teamGridTemplate = res.data;
        });
    },
  },
  mounted() {
    this.getStudent();
    this.getNotesByStudent();
    this.getGridTemplate();
  } 
};
</script>

<style>

</style>
