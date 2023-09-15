<template>
  <footer class="position-relative overflow-hidden p-md-5 text-center bg-dark text-white">
    Empregamos todos os esforços para transparentemente apresentar todas as evidências do produto, incluindo
    resultados reais, e garantimos que não compartilhamos seu endereço de e-mail ou qualquer informação com
    terceiros. Não praticamos o envio de spam de forma alguma. Caso tenha alguma dúvida, por favor, utilize o link
    de contato para conversar conosco durante o horário comercial, de segunda a sexta, das 09h00 às 18h00. Todas as
    mensagens são lidas e respondidas na ordem em que são recebidas.
    <hr>
    <p class="text-secondary">
    <div>
      <router-link class="nav-link text-danger" to="/">Home</router-link>
    </div>
    <div v-if="!isLogged" class="pb-4">
      <router-link class="nav-link text-danger" to="/admin/login">Login Administrativo</router-link>
    </div>
    <div v-else class="pb-4 dropdown">

      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-bs-toggle="dropdown"
        aria-expanded="false">
        <font-awesome-icon icon="user" />
        {{ userName }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
        <li>
          <router-link class="dropdown-item" to="/admin">Gestão</router-link>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click.prevent="logout">Sair</a>
        </li>
      </ul>

    </div>
    </p>
    <p class="text-secondary">
      © Copyright Paideia Educacional. Todos os direitos reservados.
    </p>
    <p class="text-secondary">
      Desenvolvido por <a href="https://cdnssystems.com.br/" target="_blank">CDNS Systems Ltda</a>
    </p>
  </footer>
</template>

<script>

import axios from "axios";

import { EventBus } from "../main";

export default {
  name: "TheFooter",
  data() {
    return {
      isLogged: false,
      userName: null,
    };
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.isLogged = false;
      this.$router.push({ name: "login" });
    },
    async me() {

      const axiosInstance = axios.create({
        baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      const api = await axiosInstance.post("/auth/me");

      if (!Object.keys(api.data).length) {
        this.isLogged = this.userName = null;
        window.localStorage.removeItem("token");
      } else {
        this.userName = api.data.name;
        this.isLogged = true;
      }
    },
  },
  mounted() {
    this.me();
    EventBus.$on("update-logged-in-status", (bool, name) => {
      this.isLogged = bool;
      this.userName = name;
    });
  },
  deactivated() {
    console.log('> Header deactivated')
  },
  activated() {
    console.log('> Header activated')
  }
};
</script>

<style scoped></style>