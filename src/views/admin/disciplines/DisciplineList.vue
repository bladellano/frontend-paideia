<template>
  <div>
    <section class="container my-4">
      <h4 class="my-4">Relação de todos as <strong>Disciplinas</strong></h4>

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

            <th>Quantidade de avaliações</th>
            <th>Carga horária</th>

            <th>Criado</th>
            <th width="150px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>

            <td>{{ item.amount_of_reviews }}</td>
            <td>{{ item.workload }}</td>

            <td>{{ item.created_at }}</td>
            <td>
              <router-link
                :to="{ name: 'discipline-edit', params: { id: item.id } }"
                class="btn btn-sm btn-secondary mx-1"
                >Editar
              </router-link>
              <a
                href="#"
                @click.prevent="handlerDelete(item.id)"
                class="btn btn-sm btn-secondary mx-1"
                >Excluir</a
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
  name: "DisciplineList",
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

      let uri = `/disciplines?page=${page}` + query;

      await api.get(uri).then((res) => {
        this.items = res.data.data;
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
            const { data } = await api.delete(`/disciplines/${id}`);
            Toast.fire(data.message, "", "success");
            this.getItens();
          } catch (error) {
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