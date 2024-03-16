<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Editando <strong>Texto do Documento</strong></h4>

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

          <div class="form-group col-md-12">
            <label for="content">Conteúdo</label>
      
            <textarea 
              class="form-control" 
              name="content" 
              id="content" 
              cols="30" 
              rows="4" 
              v-model="item.content">
            </textarea>

          </div>

          <div class="form-group col-md-12">
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
    </div>

    <LoadingPage v-else />
  </section>
</template>
  
  <script>
import api from "@/services";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "DocumentEdit",
  components: {
    LoadingPage,
  },
  props: ["id"],
  data() {
    return {
      item: null,
      options: [],
    };
  },
  methods: {
    async getItem() {
      await api.get(`/text-documents/${this.id}`).then((res) => {
        this.item = res.data;
      });
    },
    async getTeachings() {
      await api.get(`/teachings?page=0&perPage=99999`).then((res) => {
        this.options = res.data.data;
      });
    },
    async handlerSubmit() {

      const form = Object.assign({}, this.item);

      const body = {
        name: form.name,
        content: form.content,
        teaching_id: form.teaching_id,
      };

      try {
        const { data } = await api.put(`/text-documents/${form.id}`, body);
        Toast.fire(data.message, "", "success");
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }
    },
    reset() {
      this.getItem();
    },
  },
  mounted() {
    this.getItem();
    this.getTeachings();
  },
};
</script>
  
  <style scoped>
</style>