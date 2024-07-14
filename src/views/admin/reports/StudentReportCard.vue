<template>
    <section class="container-fluid my-4">
      <h4 class="my-4">Boletim do <strong>Aluno</strong></h4>
  
      <form @submit.prevent="generateFile">
        <div class="row">
          <div class="form-group col-md-6">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="team" class="form-label">Aluno</label>
                  <select
                    @change="teamByStudent"
                    v-model="student_id"
                    class="form-control form-control-sm"
                  >
                    <option value="" selected disabled>-- Selecione --</option>
                    <option
                      :value="student.id"
                      v-for="student in students"
                      :key="student.id"
                    >
                      {{ student.name | uppercase }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="team" class="form-label">Turma</label>
                  <select v-model="team_id" class="form-control form-control-sm">
                    <option value="" selected disabled>-- Selecione --</option>
                    <option
                      :value="registration.team.id"
                      v-for="registration in teamsOfstudent"
                      :key="registration.team.id"
                    >
                      {{ registration.team.name | uppercase }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
  
            <div v-if="!loading" class="form-group text-center my-2">
              <button
                type="submit"
                class="btn btn-success btn-sm mx-2 text-uppercase"
              >
                Gerar
              </button>
              <button
                type="reset"
                class="btn btn-secondary btn-sm text-uppercase"
              >
                Limpar
              </button>
            </div>
  
            <LoadingPage v-else />
          </div>
        </div>
      </form>
  
      <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
        VOLTAR
      </button>
    </section>
  </template>
  
  <script>
  import api from "@/services";
  import LoadingPage from "@/components/LoadingPage.vue";
  
  export default {
    name: "StudentReportCard",
    components: {
      LoadingPage,
    },
    data() {
      return {
        team_id: "",
        student_id: "",
        students: [],
        loading: false,
        teamsOfstudent: [],
      };
    },
    methods: {
      async teamByStudent(event) {
        this.teamsOfstudent = [];
        this.team_id = "";
  
        const studentFiltered = this.students.filter(
          (estudent) => estudent.id == event.target.value
        );
  
        this.teamsOfstudent = studentFiltered[0].registrations ?? [];
      },
      async getStudents() {
        await api.get(`/students?page=0&perPage=99999`).then((res) => {
          this.students = res.data.data;
        });
      },
      async generateFile() {
  
        if (!this.team_id || !this.student_id)
          return Toast.fire("Erro", "Por favor, selecione todos os campos.", "error");
  
        try {
  
          this.loading = !this.loading;
  
          await api
  
            .get(`/exports/student-report-card/${this.student_id}/team/${this.team_id}`,{ responseType: "blob"})
            .then((response) => {

                const blob = new Blob(
                            [response.data],
                            { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," }
                        );

                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `Boletim_` + this.teamsOfstudent[0].student.name.toUpperCase();
                a.click();
  
            });
        } catch (error) {
          Toast.fire("Erro", error.message, "error");
        }
        this.loading = !this.loading;
      },
    },
    mounted() {
      this.getStudents();
    },
  };
  </script>
  
  <style scoped></style>
  