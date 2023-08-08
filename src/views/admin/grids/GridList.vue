<template>
  <div>
    <section class="container my-4">
      <h4 class="my-4">Relação de todos os <strong>Grades</strong></h4>

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

            <th>Observação</th>
            <th>Criado</th>
            <th width="98px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.obs }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <router-link
                :to="{ name: 'grid-edit', params: { id: item.id } }"
                class="btn btn-sm btn-secondary mx-1"
                ><font-awesome-icon icon="edit" />
              </router-link>
              <a
                href="#"
                @click.prevent="handlerDelete(item.id, 'grids')"
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
import { serialize, handlerDelete } from "@/helpers";

export default {
  name: "GridList",
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

      let uri = `/grids?page=${page}` + query;

      await api.get(uri).then((res) => {
        this.items = res.data.data;
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