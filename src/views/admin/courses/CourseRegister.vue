<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Cadastro de <strong>Curso</strong></h4>

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
          <label for="teaching_id">Ensino</label>
          <select
            v-model="item.teaching_id"
            name="teaching_id"
            id="teaching_id"
            class="form-control"
          >
            <option disabled value="" selected>-- Selecione --</option>
            <option
              v-for="(opt, index) in options"
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
  </section>
</template>

<script>
import api from "@/services";

import { errorsToString } from "@/helpers";

export default {
  name: "CourseRegister",
  data() {
    return {
      item: {
        name: "",
        teaching_id: "",
      },
      options: [],
    };
  },
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await api.post(`/courses`, this.item);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "courses" });
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
    async getTeachings() {
      await api.get(`/teachings?page=0&perPage=99999`).then((res) => {
        this.options = res.data.data;
      });
    },
  },
  mounted() {
    this.getTeachings();
  },
};
</script>

<style scoped>
</style>