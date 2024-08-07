<template>

  <div class="card">

    <div v-if="teamGridTemplate" class="card-body">
        
        <h5 class="list-inline-item card-title fs-6">DISCIPLINA:</h5>
        <h6 class="list-inline-item card-subtitle mb-2 text-muted">{{ discipline_name | uppercase }}</h6> 
        
        <form ref="formHistoric" @submit.prevent="saveGrades">
            <table class="table table-hover">

            <thead>
                <tr>
                <th>ALUNO</th>
                <th v-for="stage in teamGridTemplate.stagesNumbers" :key="stage">
                    ETAPA {{ stage }}
                </th>
                </tr>
            </thead>
            <tbody>

              <template v-for="student in students">

                <tr v-for="(discipline, name) in teamGridTemplate.list" :key="`${student.id}_${name}`">

                    <td> 
                      <router-link :to="{ name: 'student-edit', params: { id: student.student.id } }" target="_blank">
                        <u>{{ student.student.name | uppercase }}</u>
                      </router-link> 
                    </td>

                    <td v-for="(stage, index) in discipline" :key="index">

                        <TheMask
                            style="width:60px; margin: 0 auto"
                            type="text"
                            class="form-control form-control-sm"
                            :value="getGradeByInput(student.student.id, stage.stage_id, stage.discipline_id, $route.params.id)"
                            :name="'grade[' + student.student.id + '][' + stage.stage_id + '][' + stage.discipline_id + '][' + $route.params.id + ']'"
                            :mask="['#.#', '##.#']"
                            :masked="true"
                            :placeholder="'0.0'"
                        />

                    </td>
                </tr> 

              </template>

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
      discipline_name: "",
      notes: [],
      teamGridTemplate: null,
      students: [],
    };
  },
  watch: {
    '$route' (to, from) {
        this.getTeamAndRegistrations();
        this.getGridTemplate();
       
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
    getGradeByInput(studentId, stageId, disciplineId, teamId){

        if(!this.notes.length)
            return;

        const gradeFiltered = this.notes.filter(grade => grade.student_id == studentId && grade.stage_id == stageId && grade.discipline_id == disciplineId && grade.team_id == teamId);

        return gradeFiltered.length ? gradeFiltered[0].grade : '0.0';
    },
    async getNotesByStudent() {
      const record = await api.get(`/teams/${this.$route.params.id}/grades`);
      this.notes = record.data;
    },
    async getGridTemplate() {
      /** this.$route.params.id = team_id */
      await api
        .get(`/grids/${this.$route.params.id}/get-full-grid?discipline_id=${this.$route.params.discipline}`)
        .then((res) => {
          this.teamGridTemplate = res.data;
          this.discipline_name = Object.keys(res.data.list)[0];
        });

        Toast.fire({
          position: "bottom-end",
          icon: "info",
          title: "Mensagem",
          text: `Agora você está na disciplina: ${this.discipline_name}`,
          footer: '<strong class="text-primary">Solicitamos especial atenção ao preencher as notas dos alunos na disciplina.</strong>'
        });
    },
    async getTeamAndRegistrations() {
      await api.get(`teams/${this.$route.params.id}/students`).then((res) => {
        const registrations = res.data.registrations.filter((register) => !!register.student);
        this.students = registrations
      });
    },
  },
  mounted() {
    this.getTeamAndRegistrations();
    this.getGridTemplate();
    this.getNotesByStudent();
  } 
};
</script>

<style>

</style>
