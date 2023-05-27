<template>
  <section class="container my-4">
    <h4 class="my-4">Editando <strong>Disciplina</strong></h4>

    <div v-if="item">
      <form @submit.prevent="handlerSubmit" @reset="reset">
        <div class="row">

          <div class="form-group col-md-6">
            <label for="name">Nome</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="item.name"
            />
          </div>

          <div class="form-group col-md-3">
            <label for="amount_of_reviews">Quantidade de avaliações</label>
            <input
              type="number"
              class="form-control"
              id="amount_of_reviews"
              v-model="item.amount_of_reviews"
            />
          </div>

          <div class="form-group col-md-3">
            <label for="workload">Carga horária (padrão)</label>
            <input 
              type="text"
              class="form-control" 
              @keyup="filterNonNumeric"
              v-model="item.workload"
            />
          </div>

        </div>

        <div class="form-group text-center my-2">
          <button type="submit" class="btn btn-success btn-sm mx-2">
            Salvar
          </button>
          <button type="reset" class="btn btn-secondary btn-sm">Limpar</button>
        </div>
      </form>

      <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
        Voltar
      </button>
    </div>

    <LoadingPage v-else />
  </section>
</template>
  
  <script>
import api from "@/services";
import { errorsToString, filterNonNumeric } from "@/helpers";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "DisciplineEdit",
  components: {
    LoadingPage,
  },
  props: ["id"],
  data() {
    return {
      filterNonNumeric,
      item: null,
    };
  },
  methods: {
    async getItem() {
      await api.get(`/disciplines/${this.id}`).then((res) => {
        this.item = res.data[0];
      });
    },
    async handlerSubmit() {
      const form = Object.assign({}, this.item);

      const request = {
        name: form.name,
        amount_of_reviews: form.amount_of_reviews,
        workload: form.workload,
      };

      try {
        const { data } = await api.put(`/disciplines/${form.id}`, request);
        this.$router.push({ name: "disciplines" });
        Toast.fire(data.message, "", "success");
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
    reset() {
      this.getItem();
    },
  },
  mounted() {
    this.getItem();
  },
};
</script>
  
  <style scoped>
</style>