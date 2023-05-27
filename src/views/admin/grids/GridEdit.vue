<template>
  <section class="container my-4">
    <h4 class="my-4">Editando <strong>Grade</strong></h4>

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
          <div class="form-group col-md-6">
            <label for="obs">Observação</label>
            <input
              type="text"
              class="form-control"
              id="obs"
              v-model="item.obs"
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
import { errorsToString } from "@/helpers";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "GridEdit",
  components: {
    LoadingPage,
  },
  props: ["id"],
  data() {
    return {
      item: null,
    };
  },
  methods: {
    async getItem() {
      await api.get(`/grids/${this.id}`).then((res) => {
        this.item = res.data[0];
      });
    },
    async handlerSubmit() {
      const form = Object.assign({}, this.item);

      try {
        const { data } = await api.put(`/grids/${this.$route.params.id}`, form);
        this.$router.push({ name: "grids" });
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