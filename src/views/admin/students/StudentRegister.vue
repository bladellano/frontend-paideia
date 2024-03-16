<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Cadastro de <strong>Estudante</strong></h4>

    <form @submit.prevent="handlerSubmit">
      <div class="row">
        <div class="form-group col-md-4">
          <label for="name">Nome</label>
          <input
            type="text"
            class="form-control"
            v-model="item.name"
          />
        </div>
        <div class="form-group col-md-2">
          <label for="gender">Gênero</label>
          <select name="gender" v-model="item.gender" class="form-control">
            <option disabled selected value="">-- Selecione --</option>
            <option value="F">F</option>
            <option value="M">M</option>
          </select>
       
        </div>
        <div class="form-group col-md-6">
          <label for="email">E-mail</label>
          <input
            type="email"
            class="form-control"
            v-model="item.email"
          />
        </div>
      </div>

      <div class="row">
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
        <div class="form-group col-md-6">
          <label for="cpf">Cpf</label>
          <TheMask 
              type="text"
              class="form-control" 
              :mask="['###.###.###-##']"
              v-model="item.cpf"
            />
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <label for="rg">RG</label>
          <input type="text" class="form-control" id="rg" v-model="item.rg" />
        </div>
        <div class="form-group col-md-6">
          <label for="expedient_body">Orgão expedidor</label>
          <input
            type="text"
            class="form-control"
            v-model="item.expedient_body"
          />
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <label for="nationality">Nacionalidade</label>
          <input
            type="text"
            class="form-control"
            v-model="item.nationality"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="naturalness">Naturalidade</label>
          <input
            type="text"
            class="form-control"
            v-model="item.naturalness"
          />
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <label for="birth_date">Data de nascimento</label>
          <input
            type="date"
            class="form-control"
            v-model="item.birth_date"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="name_mother">Nome da mãe</label>
          <input
            type="text"
            class="form-control"
            v-model="item.name_mother"
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
  name: "StudentRegister",
  data() {
    return {
      item: {
        gender:''
      },
    };
  }, 
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await api.post(`/students`, this.item);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "students" });
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors || {'error':[error.response.data.message]}), "", "error");
      }
    },
  },
};
</script>

<style scoped>
</style>