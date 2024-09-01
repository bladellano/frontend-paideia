<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Editando <strong>Curso</strong></h4>

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
            <label for="workload">Ensino</label>
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

export default {
  name: "CourseEdit",
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
      await api.get(`/courses/${this.id}`).then((res) => {
        this.item = res.data[0];
      });
    },
    async getTeachings() {
      await api.get(`/teachings?page=0&perPage=99999`).then((res) => {
        this.options = res.data.data;
      });
    },
    async handlerSubmit() {
      const form = Object.assign({}, this.item);

      const request = {
        name: form.name,
        teaching_id: form.teaching_id,
      };

      try {
        const { data } = await api.put(`/courses/${form.id}`, request);
        Toast.fire(data.message, "", "success");

      } catch (error) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          Toast.fire(errorsToString(error.response.data.errors), "", "error");
        }
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