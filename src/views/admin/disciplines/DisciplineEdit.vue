<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Editando <strong>Disciplina</strong></h4>

    <div v-if="item">
      <form @submit.prevent="handlerSubmit" @reset="reset">
        <div class="row">
          <div class="form-group col-md-5">
            <label for="name">Nome</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="item.name"
            />
          </div>

          <div class="form-group col-md-2">
            <label for="amount_of_reviews">Qtd. de avaliações</label>
            <input
              type="number"
              class="form-control"
              id="amount_of_reviews"
              v-model="item.amount_of_reviews"
            />
          </div>

          <div class="form-group col-md-2">
            <label for="teaching_id">Ensino</label>
            <select
              v-model="item.teaching_id"
              name="teaching_id"
              id="teaching_id"
              class="form-control"
            >
              <option disabled value="" selected>-- Selecione --</option>
              <option
                v-for="(opt, index) in teachings"
                :key="index"
                :value="opt.id"
              >
                {{ opt.name }}
              </option>
            </select>
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
            SALVAR
          </button>
          <button type="reset" class="btn btn-secondary btn-sm">LIMPAR</button>
        </div>
      </form>

      <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
        VOLTAR
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
      teachings: [],
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
        teaching_id: form.teaching_id,
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
    async getTeachings() {
      await api.get(`/teachings?page=0&perPage=99999`).then((res) => {
        this.teachings = res.data.data;
      });
    },
  },
  created() {
    this.getItem();
    this.getTeachings();
  },
};
</script>
  
  <style scoped>
</style>