<template>
  <section class="container my-4">
    <h4 class="my-4">Editando <strong>Polo</strong></h4>

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
            <label for="address">Endereço</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="item.address"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="responsible">Responsável</label>
            <input
              type="text"
              class="form-control"
              id="responsible"
              v-model="item.responsible"
            />
          </div>

          <div class="form-group col-md-4">
            <label for="city">Cidade</label>
            <input
              type="text"
              class="form-control"
              id="city"
              v-model="item.city"
            />
          </div>
          <div class="form-group col-md-2">
            <label for="uf">UF</label>
            <select id="uf" class="form-control" v-model="item.uf">
              <option disabled value="">-- Selecione --</option>
              <option
                v-for="(opt, index) in uf"
                :key="index"
                :value="opt.sigla"
              >
                {{ opt.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="email">E-mail</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="item.email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="phone">Telefone</label>
            <TheMask 
              type="text"
              class="form-control" 
              :mask="['(##)#####-#####']"
              v-model="item.phone"
              :masked="true"
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
import StatesMixin from "@/mixins/StatesMixin";

export default {
  mixins: [StatesMixin],
  name: "PoloEdit",
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
      await api.get(`/polos/${this.id}`).then((res) => {
        this.item = res.data[0];
      });
    },
    async handlerSubmit() {
      const form = Object.assign({}, this.item);

      const request = {
        name: form.name,
        city: form.city,
        uf: form.uf,
        responsible: form.responsible,
        address: form.address,
        email: form.email,
        phone: form.phone,
      };

      try {
        const { data } = await api.put(`/polos/${form.id}`, request);
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