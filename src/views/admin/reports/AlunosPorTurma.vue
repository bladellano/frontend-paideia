<template>
    <section class="container-fluid my-4">
        <h4 class="my-4">Alunos por <strong>Turma</strong></h4>

        <form @submit.prevent="generateXLSX">

            <div class="row">

                <div class="form-group col-md-6">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="team" class="form-label">Turma</label>
                                <select v-model="team_id" id="selectTeam" class="form-control form-control-sm">
                                    <option value="" selected disabled>-- Selecione --</option>
                                    <option v-for="(team, key) in teams" :key="key" :value="team.id">
                                        {{ team.name | uppercase }}
                                    </option>
                                </select>
                            </div>

                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="team" class="form-label">Linhas Extras</label>
                                <input type="number" v-model="extra_lines" class="form-control form-control-sm" @keyup="filterNonNumeric">
                            </div>
                        </div>
                    </div>

                    <div v-if="!loading" class="form-group text-center my-2">
                        <button type="submit" class="btn btn-success btn-sm mx-2 text-uppercase">
                            Gerar
                        </button>
                        <button type="reset" class="btn btn-secondary btn-sm text-uppercase">
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
import { filterNonNumeric } from "@/helpers";

export default {
    name: "AlunosPorTurma",
    components: {
        LoadingPage,
    },
    data() {
        return {
            team_id: "",
            extra_lines: 1,
            teams: [],
            loading: false,
            filterNonNumeric
        };
    },
    methods: {
        async getTeams() {
            await api.get(`/teams?page=0&perPage=99999&sortBy=name`).then((res) => {
                this.teams = res.data.data;
            });
        },
        async generateXLSX() {

            if (!this.team_id)
                return Toast.fire('Erro', 'Por favor, selecione uma turma.', "error");

            try {

                this.loading = !this.loading;

                const teamName = this.teams.filter((e) => e.id == selectTeam.value);

                await api
                    .get(`/exports/students-per-class?team_id=${this.team_id}&extra_lines=${this.extra_lines}`, {
                        responseType: "blob",
                    })
                    .then((response) => {

                        const blob = new Blob(
                            [response.data],
                            { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," }
                        );

                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `AlunosPorTurma - ` + teamName[0].name.toUpperCase();
                        a.click();

                    });

            } catch (error) {
                Toast.fire('Erro', error.message, "error");
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