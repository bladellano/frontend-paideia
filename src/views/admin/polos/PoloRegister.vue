<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Cadastro de <strong>Polo</strong></h4>

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
            <option v-for="(opt, index) in uf" :key="index" :value="opt.sigla">
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
          SALVAR
        </button>
        <button type="reset" class="btn btn-secondary btn-sm">LIMPAR</button>
      </div>
    </form>
    <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
      VOLTAR
    </button>
  </section>
</template>
  
  <script>
import api from "@/services";
import { errorsToString } from "@/helpers";
import StatesMixin from "@/mixins/StatesMixin";

export default {
  mixins: [StatesMixin],
  name: "PoloRegister",
  data() {
    return {
      item: {
        uf: "",
      }   
    };
  },
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await api.post(`/polos`, this.item);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "polos" });
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
  },
};
</script>
  
  <style scoped>
</style>