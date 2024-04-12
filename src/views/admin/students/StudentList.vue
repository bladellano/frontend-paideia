<template>
  <div>
    <section class="container-fluid my-4">
      <h4 class="my-4">Relação de todos os <strong>Alunos</strong></h4>

      <div class="well mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="Filtrar a lista abaixo"
          v-model="search"
        />
      </div>

      <table class="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th><a href="#" @click="sort($event, 'id')">#</a></th>
            <th><a href="#" @click="sort($event, 'name')">Nome</a></th>
            <th>Nome da mãe</th>
            <th>Criado</th>
            <th width="98px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name | uppercase }}</td>
            <td>{{ item.name_mother | uppercase}}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <ButtonEdit :to="{ name: 'student-edit', params: { id: item.id } }"/>
              <ButtonDelete @delete="handlerDelete(item.id, 'disciplines')"/>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination :source="pagination" @navigate="navigate" />
    </section>
  </div>
</template>

<script>

import api from "@/services";
import Pagination from "@/components/Pagination.vue";
import ButtonHistory from "@/components/ButtonHistory.vue";
import ButtonCertificate from "@/components/ButtonCertificate.vue";
import ButtonEdit from "@/components/ButtonEdit.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";
import { serialize, handlerDelete } from "@/helpers";

export default {
  name: "StudentList",
  components: {
    Pagination,
    ButtonHistory,
    ButtonCertificate,
    ButtonEdit,
    ButtonDelete
  },
  data() {
    return {
      sortProperty: "id",
      sortDirection: 1,
      search: "",
      pagination: {},
      items: [],
      handlerDelete
    };
  },
  methods: {
    sort(ev, property) {
      ev.preventDefault();
      this.sortProperty = property;

      this.sortDirection = this.sortDirection ? 0 : 1;

      this.getItens();
    },
    navigate(page) {
      this.getItens(page);
    },
    async getItens(page = 1) {
      let query = serialize({
        search: this.search,
        sortDesc: this.sortDirection,
        sortBy: this.sortProperty,
      });

      let uri = `/students?page=${page}` + query;

      await api.get(uri).then((res) => {
        const students = res.data.data.map(function (student) {
          student.teams_name = student.teams
            ? student.teams.map((team) => team.name).join(", ") // Pega somente o nome das turmas dos objetos
            : [];
          return student;
        });

        this.items = students;
        this.pagination = res.data;
      });
    },
  },
  mounted() {
    this.getItens();
  },
  watch: {
    async search(ev) {
      this.getItens();
    },
  },
};
</script>
  
  <style scoped>
</style>