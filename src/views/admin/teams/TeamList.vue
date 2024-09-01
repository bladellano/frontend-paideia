<template>
  <div>
    <h4 class="my-4">Relação de todas as <strong>Turmas</strong></h4>

    <v-text-field
      v-model="search"
      label="Filtrar a lista abaixo"
      class="mb-4"
      append-icon="mdi-magnify"
    ></v-text-field>

    <v-data-table
      :loading="loading"
      loading-text="Por favor, aguarde o carregamento..."
      :headers="headers"
      :items="items"
      :items-per-page="15"
      :search="search"
      class="elevation-1 mb-4"
      :footer-props="{ itemsPerPageOptions: [15, 25, 35, 55] }"
    >
      <template v-slot:item.count_registrations="{ item }">
        <v-chip :color="getColor(item.registrations.length)" dark>
          {{ item.registrations.length }}
        </v-chip>
      </template>

      <template v-slot:item.launch_notes="{ item }">
        <router-link
          class="btn btn-outline-primary btn-sm"
          :to="{ name: 'team-disciplines', params: { id: item.id } }"
        >
          Lançar Notas
        </router-link>
      </template>

      <template v-slot:item.edit="{ item }">
        <ButtonEdit :to="{ name: 'team-edit', params: { id: item.id } }" />
      </template>

      <template v-slot:item.delete="{ item }">
        <ButtonDelete @delete="() => handlerDelete(item.id, 'teams')" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from "@/services";
import ButtonEdit from "@/components/ButtonEdit.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";
import { serialize, handlerDelete } from "@/helpers";
import { VDataTable, VTextField, VChip } from "vuetify/lib";

export default {
  name: "TeamList",
  components: {
    ButtonEdit,
    ButtonDelete,
    VDataTable,
    VTextField,
    VChip,
  },
  data() {
    return {
      headers: [
        { text: "#", value: "id" },
        { text: "Nome", value: "name" },
        { text: "Matrículados", value: "count_registrations" },
        { text: "Início", value: "start_date" },
        { text: "Término", value: "end_date" },
        { text: "Polo", value: "polo.name" },
        { text: "Grade", value: "grid.name" },
        { text: "Criado", value: "created_at" },
        { text: "Lançar Notas", value: "launch_notes" },
        { text: "Editar", value: "edit" },
        { text: "Remover", value: "delete" },
      ],
      search: "",
      items: [],
      handlerDelete,
      loading: true,
    };
  },
  methods: {
    getColor(count) {
      if (count > 50) return "red";
      else if (count > 25) return "orange";
      else return "green";
    },
    async getTeams(page = 1) {
      let query = serialize({
        search: this.search,
        page: page,
      });

      const uri = `/teams?page=0&perPage=99999` + query;

      await api.get(uri).then((res) => {
        this.items = res.data.data;
      });

      this.loading = false;
    },
  },
  mounted() {
    this.getTeams();
  },
  watch: {
    async search() {
      this.getTeams();
    },
  },
};
</script>

<style scoped></style>
