<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Cadastro de <strong>Turma</strong></h4>

    <form @submit.prevent="handlerSubmit">
      <div class="row">
        <div class="form-group col-md-12">
          <label for="name">Nome</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="item.name"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="start_date">Início</label>
          <input
            type="date"
            class="form-control"
            id="start_date"
            v-model="item.start_date"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="end_date">Término</label>
          <input
            type="date"
            class="form-control"
            id="end_date"
            v-model="item.end_date"
          />
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-12">
          <label for="polo_id">Polo</label>
          <select
            v-model="item.polo_id"
            name="polo_id"
            id="polo_id"
            class="form-control"
          >
            <option disabled value="" selected>-- Selecione --</option>
            <option
              v-for="(opt, index) in polos"
              :key="index"
              :value="opt.id"
            >
              {{ opt.name }}
            </option>
          </select>

        </div>
        <div class="form-group col-md-12">
          <label for="grid_id">Grade</label>
          <select
            v-model="item.grid_id"
            name="grid_id"
            id="grid_id"
            class="form-control"
          >
            <option disabled value="" selected>-- Selecione --</option>
            <option
              v-for="(opt, index) in grids"
              :key="index"
              :value="opt.id"
            >
              {{ opt.name }}
            </option>
          </select>
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
  </section>
</template>
  
  <script>
import api from "@/services";
import { errorsToString } from "@/helpers";

export default {
  name: "TeamRegister",
  data() {
    return {
      item: {
        polo_id:'',
        grid_id:'',
      },
      polos:[],
      grids:[],
    };
  },
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await api.post(`/teams`, this.item);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "teams" });
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
    async getPolos() {
      await api.get(`/polos?page=0&perPage=99999`).then((res) => {
        this.polos = res.data.data;
      });
    },
    async getGrids() {
      await api.get(`/grids?page=0&perPage=99999`).then((res) => {
        this.grids = res.data.data;
      });
    },
  },
  mounted() {
    this.getGrids();
    this.getPolos();
  },
};
</script>
  
  <style scoped>
</style>