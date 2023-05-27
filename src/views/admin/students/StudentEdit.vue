<template>
  <section class="container my-4">
    <h4 class="my-4">Editando <strong>Aluno</strong></h4>

    <div v-if="item">
      <form @submit.prevent="handlerSubmit" @reset="reset">
        <div class="row">
          <div class="form-group col-md-4">
            <label for="name">Nome</label>
            <input
              type="text"
              class="form-control"
              name="name"
              v-model="item.name"
            />
          </div>
          <div class="form-group col-md-2">
            <label for="gender">Gênero</label>
            <select name="gender" v-model="item.gender" class="form-control">
              <option disabled value="">-- Selecione --</option>
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="email">E-mail</label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              v-model="item.email"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="phone">Telefone</label>

            <TheMask
              type="text"
              name="phone"
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
              name="cpf"
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
              name="rg"
              class="form-control"
              id="expedient_body"
              v-model="item.expedient_body"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="nationality">Nacionalidade</label>
            <input
              type="text"
              name="nationality"
              class="form-control"
              v-model="item.nationality"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="naturalness">Naturalidade</label>
            <input
              type="text"
              name="naturalness"
              class="form-control"
              id="naturalness"
              v-model="item.naturalness"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="birth_date">Data de nascimento</label>
            <input
              type="date"
              name="birth_date"
              class="form-control"
              v-model="item.birth_date"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="name_mother">Nome da mãe</label>
            <input
              type="text"
              name="name_mother"
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
    </div>

    <LoadingPage v-else />
  </section>
</template>
  
  <script>
import api from "@/services";
import { errorsToString, convertDateToDB } from "@/helpers";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "StudentEdit",
  components: {
    LoadingPage,
  },
  props: ["id"],
  data() {
    return {
      convertDateToDB,
      item: {},
    };
  },
  methods: {
    async getItem() {
      await api.get(`/students/${this.id}`).then((res) => {
        const {
          name,
          email,
          phone,
          cpf,
          rg,
          expedient_body,
          nationality,
          naturalness,
          name_mother,
          birth_date,
          gender,
        } = res.data[0];

        this.item = {
          name,
          email,
          phone,
          cpf,
          rg,
          expedient_body,
          nationality,
          naturalness,
          name_mother,
          birth_date:this.convertDateToDB(birth_date),
          gender,
        };
      });
    },
    async handlerSubmit() {
      const form = Object.assign({}, this.item);

      try {
        const { data } = await api.put(`/students/${this.$route.params.id}`, form);
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