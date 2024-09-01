<template>
  <footer class="position-relative overflow-hidden p-md-5 text-center bg-dark text-white">

    <div class="container">

      <div class="row">
        <div class="col-md-3 my-auto">
          <h4 class="text-md-start">Consulte nossa instituição:</h4>
        </div>
        <div class="col-md-3 col-12">
          <a href="https://sistec.mec.gov.br/consultapublicaunidadeensino/" target="_blank">
            <img src="@/assets/logo-sistec.png" alt="LOGO" class="img-fluid">
          </a>
        </div>
        <div class="col-md-3 col-12">
          <a href="https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/inep-data/catalogo-de-escolas"
            target="_blank">
            <img src="@/assets/logo-catalogo-de-escolas.png" alt="LOGO" class="img-fluid">
          </a>
        </div>
        <div class="col-md-3 col-12">
          <a href="https://www.abed.org.br/site/pt/associados/consulta_associados_abed/" target="_blank">
            <img src="@/assets/logo-abed.png" alt="LOGO" class="img-fluid">
          </a>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <h4 class="text-md-start">Contato:</h4>
          <ul class="text-md-start">
            <li>(91) 3722-9891</li>
            <li>(91) 9 8176-9979 <font-awesome-icon icon="fa-brands fa-whatsapp" /></li>
            <li>(91) 9 8208-4651 <font-awesome-icon icon="fa-brands fa-whatsapp" /></li>
            <li><font-awesome-icon icon="envelope" /> contato@paideiaeducacional.com</li>
          </ul>
        </div>
        <div class="col-md-4 my-auto">

          <p class="text-secondary">
          <div>
            <router-link class="nav-link text-white" to="/">Home</router-link>
          </div>
          <div v-if="!isLogged" class="pb-4">
            <router-link class="btn btn-sm btn-outline-light text-white" :to="{ name: 'login' }"><v-icon class="text-white">mdi-account</v-icon> Login Administrativo</router-link>
          </div>

          <div v-else class="pb-4 dropdown">

            <router-link class="btn btn-outline-light text-white btn-sm mt-4" to="/admin"><v-icon class="text-white">mdi-cog</v-icon> Gestão</router-link>
            <br/>
            <a class="btn btn-outline-light text-white btn-sm mt-4" @click.prevent="logout"><v-icon class="text-white">mdi-exit-run</v-icon> Sair</a>

          </div>

          </p>
          <p class="text-secondary small">
            © Copyright Paideia Educacional. Todos os direitos reservados.
          </p>
          <p class="text-secondary small">
            Desenvolvido por <a href="https://cdnssystems.com.br/" target="_blank">CDNS Systems Ltda</a>
          </p>

        </div>
        <div class="col-md-4 my-auto text-md-end">
          <img src="@/assets/logo.png" class="img-fluid logo-paideia" alt="LOGO">
        </div>
      </div>

    </div>

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
      window.location.reload();
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

<style scoped>
.logo-paideia {
  filter: brightness(0) invert(1);
  max-width: 250px;
}

img:not(.logo-paideia) {
  height: 100px;
  object-fit: contain;
  width: 98%;
  padding: 4px;
  background-color: #FFF;
  border-radius: 6px;
  margin: 4px 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  padding: 4px 0;
}
</style>