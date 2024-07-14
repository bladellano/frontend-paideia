<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Relatório de <strong>Repasse</strong></h4>

    <form @submit.prevent="generateFile">
      <div class="row">
        <div class="form-group col-md-6">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="team" class="form-label">Turma</label>
                <select v-model="team_id" class="form-control form-control-sm" id="team">
                  <option value="" selected disabled>-- Selecione --</option>
                  <option :value="team.id" v-for="team in teams" :key="team.id">
                    {{ team.name | uppercase }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label for="team" class="form-label">Período:</label>
              <input
                type="date"
                class="form-control form-control-sm"
                v-model="start_date"
              />
             
            </div>

            <div class="col-md-3">
              <label for="team" class="form-label"> &nbsp;</label>
             
              <input
                type="date"
                class="form-control form-control-sm"
                v-model="end_date"
              />
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
  name: "TransferReport",
  components: {
    LoadingPage,
  },
  data() {
    return {
      team_id: "",
      teams: [],
      loading: false,
      start_date: "",
      end_date: "",
    };
  },
  methods: {
    async getTeams() {
      await api.get(`/teams?page=0&perPage=99999`).then((res) => {
        this.teams = res.data.data;
      });
    },
    async generateFile() {
      if (!this.team_id || !this.start_date || !this.end_date)
        return Toast.fire(
          "Erro",
          "Por favor, selecione todos os campos.",
          "error"
        );

      try {
        this.loading = !this.loading;

        await api

          .get(
            `/exports/transfer-report/${this.team_id}/start_date/${this.start_date}/end_date/${this.end_date}`,
            { responseType: "blob" }
          )
          .then((response) => {
            const blob = new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
            });

            const selectElement = document.querySelector("#team");
            const selectedOptionText = selectElement.options[selectElement.selectedIndex].text;

            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `Relatório de Repasse_` + selectElement.options[selectElement.selectedIndex].text.toUpperCase();
            a.click();
          });
      } catch (error) {
        Toast.fire("Erro", error.message, "error");
      }
      this.loading = !this.loading;
    },
  },
  mounted() {
    this.getTeams();
  },
};
</script>

<style scoped></style>
