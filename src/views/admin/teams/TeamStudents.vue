<template>
  <section class="container-fluid my-4">
    
    <h4 class="my-4">Lançamento de <b>Notas</b></h4>

    <a 
      class="btn btn-sm btn-outline-primary mb-2"
      @click="$router.push({ name: 'teams' })"
    >
      VOLTAR
    </a>
    
    <div v-if="registrations">

      <h5 class="list-inline-item card-title fs-6">TURMA:</h5>
      <h6 class="list-inline-item card-subtitle mb-2">
        <router-link :to="{ name: 'team-edit', params: { id: this.$route.params.id } }" target="_blank">
          <u>{{ team_name | uppercase }}</u>
        </router-link>
      </h6>
      <br/>
      <h5 class="list-inline-item card-title fs-6">PERÍODO:</h5>
      <h6 class="list-inline-item card-subtitle mb-2 text-muted">{{ start_date }} - {{  end_date  }}</h6>
      <br/>

      <div class="row">
        <div class="col-md-4">

          <div class="list-group">

            <router-link 
              v-for="(discipline, i) in disciplines" 
              :to="{ name: 'disciplines-students', params: { discipline: discipline.id }}" 
              :key="discipline.id"  
              class="list-group-item list-group-item-action">
              {{ ++i }} - {{ discipline.discipline }}
            </router-link>

          </div>

        </div>
        <div class="col-md-8">

          <transition mode="out-in">
            <router-view></router-view>
          </transition> 

        </div>
      </div>

    </div>

    <LoadingPage v-else />

  </section>
</template>

<script>

import api from "@/services";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "TeamStudents",
  components: {
    LoadingPage,
  },
  data() {
    return {
      registrations: [],
      disciplines: [],
      team_name: "",
      start_date: "",
      end_date: "",
    };
  },
  methods: {
    async getDisciplinesByTeam() {
      await api.get(`/teams/${this.$route.params.id}/disciplines`).then((res) => {
        this.disciplines = res.data;
      });
    },
    async getTeamAndRegistrations() {
      await api.get(`teams/${this.$route.params.id}/students`).then((res) => {

        const { registrations, start_date, end_date, name } = res.data;

        this.registrations = registrations;
        this.start_date = start_date;
        this.end_date = end_date;
        this.team_name = name;

      });
    },
  },
  mounted() {
    this.getTeamAndRegistrations();
    this.getDisciplinesByTeam();
  },
};
</script>

<style scoped>
.router-link-active {
  z-index: 2!important;
  color: #fff!important;
  background-color: #212529!important;
  border-color: #212529!important;
}
</style>
