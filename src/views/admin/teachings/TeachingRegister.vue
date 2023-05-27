<template>
  <section class="container my-4">
    <h4 class="my-4">Cadastro de <strong>Ensino</strong></h4>

    <form @submit.prevent="handlerSubmit">
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
          <label for="description">Descrição</label>
          <input
            type="text"
            class="form-control"
            id="description"
            v-model="item.description"
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
import { errorsToString } from "@/helpers";

export default {
  name: "TeachingRegister",
  data() {
    return {
      item: {},
    };
  },
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await api.post(`/teachings`, this.item);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "teachings" });
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
  },
};
</script>

<style scoped>
</style>