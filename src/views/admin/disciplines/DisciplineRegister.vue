<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Cadastro de <strong>Disciplina</strong></h4>

    <form @submit.prevent="handlerSubmit">
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
            Salvar
          </button>
          <button type="reset" class="btn btn-secondary btn-sm">Limpar</button>
        </div>
      </form>

    <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
      Voltar
    </button>
  </section>
</template>
  
  <script>
import api from "@/services";
import { errorsToString, filterNonNumeric } from "@/helpers";

export default {
  name: "DisciplineRegister",
  data() {
    return {
      filterNonNumeric,
      item: {
        teaching_id:""
      },
      teachings:[]
      };
  },
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await api.post(`/disciplines`, this.item);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "disciplines" });
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
    async getTeachings() {
      await api.get(`/teachings?page=0&perPage=99999`).then((res) => {
        this.teachings = res.data.data;
      });
    },
  },
  created(){
    this.getTeachings();
  }
};
</script>
  
  <style scoped>
</style>