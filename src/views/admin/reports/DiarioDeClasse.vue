<template>
    <section class="container-fluid my-4">
        <h4 class="my-4">Diário de <strong>Classe</strong></h4>

        <form @submit.prevent="generateClassDiary">

            <div class="row">

                <div class="form-group col-md-6">

                    <div class="mb-3">
                        <label for="team" class="form-label">Turma</label>
                        <select v-model="team_id" id="selectTeam" class="form-control form-control-sm">
                            <option value="" selected disabled>-- Selecione --</option>
                            <option v-for="(team, key) in teams" :key="key" :value="team.id">
                                {{ team.name | uppercase }}
                            </option>
                        </select>
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

export default {
    name: "DiarioDeClasse",
    components: {
        LoadingPage,
    },
    data() {
        return {
            team_id: "",
            teams: [],
            loading: false,
        };
    },
    methods: {
        async getTeams() {
            await api.get(`/teams?page=0&perPage=99999`).then((res) => {
                this.teams = res.data.data;
            });
        },
        async generateClassDiary() {

            if (!this.team_id)
                return Toast.fire('Erro', 'Por favor, selecione uma turma.', "error");

            try {

                this.loading = !this.loading;

                const teamName = this.teams.filter((e) => e.id == selectTeam.value);

                await api
                    .get(`/exports/class-diary?team_id=${this.team_id}`, {
                        responseType: "blob",
                    })
                    .then((response) => {

                        const blob = new Blob(
                            [response.data],
                            { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," }
                        );

                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `DiarioDeClasse - ` + teamName[0].name.toUpperCase();
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