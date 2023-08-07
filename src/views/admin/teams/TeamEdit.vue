<template>
  <section class="container my-4">
    <h4 class="my-4">Editando <strong>Turma</strong></h4>

    <div v-if="item">
      <form @submit.prevent="handlerSubmit" @reset="reset">
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
import { errorsToString } from "@/helpers";
import LoadingPage from "@/components/LoadingPage.vue";
import { convertDateToDB } from "@/helpers";

export default {
  name: "TeamEdit",
  components: {
    LoadingPage,
  },
  props: ["id"],
  data() {
    return {
      convertDateToDB,
      item: null,
      polos: [],
      grids: [],
    };
  },
  methods: {
    async getItem() {
      await api.get(`/teams/${this.id}`).then((res) => {
        const { name, start_date, end_date, polo_id, grid_id } = res.data[0];
        this.item = {
          name,
          start_date: this.convertDateToDB(start_date),
          end_date: this.convertDateToDB(end_date),
          polo_id,
          grid_id,
        };
      });
    },
    async handlerSubmit() {
      const form = Object.assign({}, this.item);

      try {
        const { data } = await api.put(`/teams/${this.$route.params.id}`, form);
        Toast.fire(data.message, "", "success");
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
    reset() {
      this.getItem();
    },
  },
  mounted() {
    this.getItem();
    this.getGrids();
    this.getPolos();
  },
};
</script>
    
  <style scoped>
</style>