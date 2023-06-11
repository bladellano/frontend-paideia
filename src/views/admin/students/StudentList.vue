<template>
  <div>
    <section class="container my-4">
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
            <th>Telefone</th>
            <th>Nome da mãe</th>
            <th>Criado</th>
            <th>Turma</th>
            <th width="228px"></th>
            <th width="98px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.name_mother }}</td>

            <td>{{ item.created_at }}</td>
            <td>{{ item.teams_name }}</td>
            <td>
              <template v-if="item.teams_name">
                
                <router-link
                :to="{ name: 'certificate-register', params: { student: item.id } }"
                class="btn btn-sm btn-primary mx-1"
                ><font-awesome-icon icon="cloud-arrow-down"/> Certificado
                </router-link>

                <router-link
                :to="{ name: 'history-register', params: { student: item.id } }"
                class="btn btn-sm btn-success"
                ><font-awesome-icon icon="cloud-arrow-down"/> Histórico
              </router-link>

              </template>
            </td>
            <td>
              <router-link
                :to="{ name: 'student-edit', params: { id: item.id } }"
                class="btn btn-sm btn-secondary mx-1"
                ><font-awesome-icon icon="edit" />
              </router-link>
              <a
                href="#"
                @click.prevent="handlerDelete(item.id)"
                class="btn btn-sm btn-secondary mx-1"
                ><font-awesome-icon icon="trash" /></a
              >
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
import { serialize } from "@/helpers";

export default {
  name: "StudentList",
  components: {
    Pagination,
  },
  data() {
    return {
      sortProperty: "id",
      sortDirection: 1,
      search: "",
      pagination: {},
      items: [],
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
    handlerDelete(id) {
      this.$swal({
        title: "Deseja confirmar a ação?",
        text: "Você não será capaz de reverter isso!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apague!",
        cancelButtonText: "Não, cancele!",
        buttonsStyling: true,
      }).then(async (isConfirm) => {
        if (isConfirm.value === true) {
          try {
            const { data } = await api.delete(`/students/${id}`);
            // eslint-disable-next-line no-undef
            Toast.fire(data.message, "", "success");
            this.getItens();
          } catch (error) {
            // eslint-disable-next-line no-undef
            Toast.fire(error.message, "", "error");
          }
        }
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