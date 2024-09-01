<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Editando <strong>Usuário</strong></h4>

    <div v-if="item">
      <form @submit.prevent="handlerSubmit" @reset="reset">
        <div class="row">

          <div class="form-group col-md-12">
            <label for="name">Nome</label>
            <input type="text" class="form-control" id="name" v-model="item.name" />
          </div>

          <div class="form-group col-md-12">
            <label for="email">E-mail/Usuário</label>
            <input type="email" class="form-control" id="email" v-model="item.email" readonly="readonly" />
          </div>

          <div class="form-group col-md-12 mt-2">

            <label for="password">Senha <span class="badge bg-secondary">Você não tem a capacidade de visualizar a senha atual, mas pode criar uma nova senha, se necessário.</span></label>
            <input type="password" class="form-control mt-2" id="password" v-model="item.password" v-bind:disabled="!passwordEnabled" />
          </div>

          <div class="form-group col-md-12 mt-2">
            <input type="checkbox" id="passwordCheckbox" v-model="passwordEnabled" />
            <label for="passwordCheckbox" class="p-1 text-secondary">Eu desejo modificar a senha deste usuário.</label><br>
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
  name: "UserEdit",
  components: {
    LoadingPage,
  },
  props: ["id"],
  data() {
    return {
      passwordEnabled: false,
      item: null,
    };
  },
  methods: {
    async getItem() {
      await api.get(`/users/${this.id}`).then((res) => {
        this.item = res.data[0];
      });
    },
    async handlerSubmit() {
      const form = Object.assign({}, this.item);

      try {
        const { data } = await api.put(`/users/${this.$route.params.id}}`, form);
        this.$router.push({ name: "users" });
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
    
<style scoped></style>