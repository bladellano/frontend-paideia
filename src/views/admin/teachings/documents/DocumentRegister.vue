<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Cadastro de <strong>Texto para Documentos</strong></h4>

    <form @submit.prevent="handlerSubmit">

      <div class="alert alert-info" role="alert">
       <h6 class="fw-bold">Variáveis que podem interpoladas no texto:</h6>
        <p><strong>[[DATA_ANO]]</strong> : {{ new Date().getFullYear() }}</p>
        <!-- <p class="text-secondary fw-lighter"><strong>[[DATA_MES]]</strong> - {{ new Date().getMonth() }}</p> -->
        <!-- <p class="text-secondary fw-lighter"><strong>[[DATA_DIA]]</strong> - {{ new Date().getDay() }}</p> -->
      </div>

      <div class="row">

        <div class="form-group col-md-12">
          <label for="name">Nome</label>
          <input type="text" class="form-control" id="name" v-model="item.name" />
        </div>

        <div class="form-group col-md-12">
          <label for="content">Conteúdo</label>
          <textarea class="form-control" name="content" id="content" cols="30" rows="4" v-model="item.content"></textarea>
        </div>

        <div class="form-group col-md-12">
          <label for="teaching_id">Ensino</label>
          <select v-model="item.teaching_id" name="teaching_id" id="teaching_id" class="form-control">
            <option disabled value="" selected>-- Selecione --</option>
            <option v-for="(opt, index) in options" :key="index" :value="opt.id">
              {{ opt.name | uppercase }}
            </option>
          </select>
        </div>

      </div>

      <div class="form-group text-center my-2">
        <button type="submit" class="btn btn-success btn-sm text-uppercase mx-2">
          Salvar
        </button>
        <button type="reset" class="btn btn-secondary btn-sm text-uppercase">Limpar</button>
      </div>
    </form>

    <button class="btn btn-sm text-uppercase btn-secondary" @click="$router.go(-1)">
      Voltar
    </button>
  </section>
</template>

<script>
import api from "@/services";

export default {
  name: "DocumentRegister",
  data() {
    return {
      item: {
        name: "",
        content: "",
        teaching_id: "",
      },
      options: [],
    };
  },
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await api.post(`/text-documents`, this.item);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "documents" });
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
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

<style scoped></style>
