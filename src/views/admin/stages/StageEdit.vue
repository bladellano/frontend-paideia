<template>
    <section class="container-fluid my-4">
      <h4 class="my-4">Editando <strong>Etapa</strong></h4>
  
      <div v-if="item">
        <form @submit.prevent="handlerSubmit" @reset="reset">
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
  import { errorsToString } from "@/helpers";
  import LoadingPage from "@/components/LoadingPage.vue";
  import { filterNonNumeric } from "@/helpers";
  
  export default {
    name: "StageEdit",
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
        await api.get(`/stages/${this.id}`).then((res) => {
          this.item = res.data[0];
        });
      },
      async handlerSubmit() {
        const form = Object.assign({}, this.item);
  
        try {
          const { data } = await api.put(`/stages/${this.$route.params.id}}`, form);
          this.$router.push({ name: "stages" });
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