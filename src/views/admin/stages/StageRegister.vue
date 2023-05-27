<template>
    <section class="container my-4">
      <h4 class="my-4">Cadastro de <strong>Etapa</strong></h4>
  
      <form @submit.prevent="handlerSubmit">
        <div class="row">
          <div class="form-group col-md-2">
            <label for="stage">Etapa</label>
            <input
              @input="filterNonNumeric"
              type="number"
              class="form-control"
              id="stage"
              v-model="item.stage"
            />
          </div>
          <div class="form-group col-md-10">
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
  import { filterNonNumeric } from "@/helpers";
  
  export default {
    name: "StageRegister",
    data() {
      return {
        filterNonNumeric,
        item: {},
      };
    },
    methods: {
      async handlerSubmit() {
        try {
          const { data } = await api.post(`/stages`, this.item);
          Toast.fire(data.message, "", "success");
          this.$router.push({ name: "stages" });
        } catch (error) {
          Toast.fire(errorsToString(error.response.data.errors), "", "error");
        }
      },
    },
  };
  </script>
      
      <style scoped>
  </style>