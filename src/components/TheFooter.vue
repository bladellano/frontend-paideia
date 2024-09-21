<template>
  <footer
    class="position-relative overflow-hidden p-md-5 text-center bg-dark text-white"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-3 my-auto">
          <h4 class="text-md-start">Consulte nossa instituição:</h4>
        </div>
        <div class="col-md-3 col-12">
          <a
            href="https://sistec.mec.gov.br/consultapublicaunidadeensino/"
            target="_blank"
          >
            <img src="@/assets/logo-sistec.png" alt="LOGO" class="img-fluid" />
          </a>
        </div>
        <div class="col-md-3 col-12">
          <a
            href="https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/inep-data/catalogo-de-escolas"
            target="_blank"
          >
            <img
              src="@/assets/logo-catalogo-de-escolas.png"
              alt="LOGO"
              class="img-fluid"
            />
          </a>
        </div>
        <div class="col-md-3 col-12">
          <a
            href="https://www.abed.org.br/site/pt/associados/consulta_associados_abed/"
            target="_blank"
          >
            <img src="@/assets/logo-abed.png" alt="LOGO" class="img-fluid" />
          </a>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <h4 class="text-md-start">Contato:</h4>
          <ul class="text-md-start">
            <li v-for="(phone, index) in phones">
              {{applyMaskPhone(phone)}} <font-awesome-icon icon="fa-brands fa-whatsapp" />
            </li>
         </ul>
        </div>
        <div class="col-md-4 my-auto">
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn class="ma-5 primary" v-bind="attrs" v-on="on">
                Menu
              </v-btn>
            </template>

            <v-list>
              <v-list-item link>
                <v-list-item-title>
                  <router-link class="text-dark" to="/">Home</router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item v-if="!isLogged" link>
                <v-list-item-title>
                  <router-link class="text-dark" :to="{ name: 'login' }"
                    >Login Administrativo</router-link
                  >
                </v-list-item-title>
              </v-list-item>

              <v-list-item v-if="isLogged" link>
                <v-list-item-title>
                  <router-link class="text-dark" to="/admin/dashboard"
                    >Gestão
                  </router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item link>
                <v-list-item-title>
                  <a class="text-dark" @click.prevent="logout">Sair</a>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <p class="text-secondary small">
            © Copyright {{ schoolName }}. Todos os direitos reservados.
          </p>
          <p class="text-secondary small">
            Desenvolvido por
            <a href="https://cdnssystems.com.br/" target="_blank"
              >CDNS Systems Ltda</a
            >
          </p>
        </div>
        <div class="col-md-4 my-auto text-md-end">
          <img
            :src="logoSrc"
            class="img-fluid logo-paideia"
            alt="Logo Rodapé"
          />
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
      logoSrc: '',
      email: '',
      schoolName: 'CDNS Systems Ltda',
      phones: [],
    };
  },
  methods: {
    applyMaskPhone(phone) {
      phone = phone.replace(/\D/g, '');

      if (phone.length === 11) {
        phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
        phone = phone.replace(/(\d{5})(\d{4})$/, '$1-$2');
      } else if (phone.length === 10) {
        phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
        phone = phone.replace(/(\d{4})(\d{4})$/, '$1-$2');
      } else if (phone.length === 8) {
        telefone = telefone.replace(/(\d{4})(\d{4})$/, '$1-$2');
      }

      return phone;
    },
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

    const dataClient = JSON.parse(localStorage.getItem('data_client') || '{}');

    const { colored_logo, email, school_name, phones } = dataClient;

    this.logoSrc = colored_logo || this.colored_logo;
    this.email = email || this.email;
    this.schoolName = school_name || this.school_name;
    this.phones = phones || this.phones;

  },
  deactivated() {
    console.log("> Header deactivated");
  },
  activated() {
    console.log("> Header activated");
  },
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
  background-color: #fff;
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
