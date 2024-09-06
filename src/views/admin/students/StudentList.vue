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

      <v-data-table :headers="headers" :items="items" class="elevation-1" >
        <template v-slot:item.edit="{ item }">
          <ButtonEdit :to="{ name: 'student-edit', params: { id: item.id } }" />
        </template>

        <template v-slot:item.delete="{ item }">
          <ButtonDelete @delete="() => handlerDelete(item.id, 'students')" />
        </template>

        <template v-slot:item.teams="{ item }">
            <span v-html="item.teams"></span> 
        </template>

        <template v-slot:item.has_financial="{ item }">
            <span v-html="item.has_financial"></span> 
        </template>

      </v-data-table>

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
      headers: [
        { text: "#", value: "id" },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "CPF", value: "cpf" },
        { text: "Contato", value: "phone" },
        { text: "Matriculado na(s) turma(s)", value: "teams", sortable: false },
        { text: "Possui financeiro?", value: "has_financial" },
        { text: "Nome da mãe", value: "name_mother" },
        { text: "Criado", value: "created_at" },
        { text: "Editar", value: "edit", sortable: false },
        { text: "Remover", value: "delete", sortable: false },
      ],
      handlerDelete,
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

          student.name = student.name.toUpperCase();
          student.name_mother = student.name_mother.toUpperCase();

          /** Verifica se o aluno ja possui vida financeira */
          student.has_financial = Object.keys(student.registrations).length > 0 && student.registrations.every(registration => {
          const financials = registration.financials;
              
              if (financials === null || financials === undefined) 
                return false;

              if (Array.isArray(financials) && financials.length === 0) 
                return false;

              if (typeof financials === 'object' && !Array.isArray(financials) && Object.keys(financials).length === 0) 
                return false;

              return true;
          }) ? '<span class="text-success">SIM</span>' : '<span class="text-danger">NÃO</span>';
          /** Fim da verificação */

          student.teams = student.registrations
            .map(
              (item) =>
                `<a href="turmas/${item.team.id}/editar" target="_blank" class="text-uppercase text-decoration-underline">${item.team.name}</a><br/>`
            )
            .join("");

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