<template>
    <div>
      <section class="container-fluid my-4">
        <h4 class="my-4">Relação de todas as <strong>Usuários</strong></h4>
  
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
              <th class="text-center"><a href="#" @click="sort($event, 'id')">#</a></th>
              <th><a href="#" @click="sort($event, 'name')">Nome</a></th>
              <th>Criado</th>
              <th width="98px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.name }}</td>
              <td>{{ item.created_at }}</td>
              <td>
                <ButtonEdit :to="{ name: 'user-edit', params: { id: item.id } }"/>
                <ButtonDelete v-if="item.id != idHideBtnRemove" @delete="handlerDelete(item.id, 'disciplines')"/>
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
    name: "UserList",
    components: {
      Pagination,
      ButtonEdit,
      ButtonDelete
    },
    data() {
      return {
        sortProperty: "name",
        sortDirection: 0,
        search: "",
        pagination: {},
        items: [],
        handlerDelete,
        idHideBtnRemove:null,
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
  
        let uri = `/users?page=${page}` + query;
  
        await api.get(uri).then((res) => {
          this.items = res.data.data;
          this.pagination = res.data;
        });
      },
    },
    async mounted() {
      this.getItens();

      /** Captura o ID do usuário logado para evitar exclusões acidentais. */
      const { data } = await api.post('auth/me');
      this.idHideBtnRemove = data.id;
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