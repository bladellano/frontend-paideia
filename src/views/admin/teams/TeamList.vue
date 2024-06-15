<template>
    <div>
      <section class="container-fluid my-4">
        <h4 class="my-4">Relação de todas as <strong>Turmas</strong></h4>
  
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
              <th>Início</th>
              <th>Término</th>
              <th>Polo</th>
              <th>Grade</th>
              <th>Criado</th>
              <th width="208px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name | uppercase }}</td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.polo_id ? item.polo.name : '' | uppercase }}</td>
              <td>{{ item.grid_id ? item.grid.name : '' | uppercase }}</td>
              <td>{{ item.created_at }}</td>
              <td>
              <router-link 
                class="btn btn-outline-secondary btn-sm mx-1" 
                :to="{ name: 'team-students', params: { id: item.id }}" 
                >Lançar Notas
              </router-link>
              <ButtonEdit :to="{ name: 'team-edit', params: { id: item.id } }"/>
              <ButtonDelete @delete="handlerDelete(item.id, 'teams')"/>
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
  import ButtonEdit from "@/components/ButtonEdit.vue";
  import ButtonDelete from "@/components/ButtonDelete.vue";
  import { serialize, handlerDelete } from "@/helpers";
  
  export default {
    name: "TeamList",
    components: {
      Pagination,
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
  
        let uri = `/teams?page=${page}` + query;
  
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