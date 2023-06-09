<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img src="@/assets/LogoMakr-1hrvwO.png" alt="VC" id="logo" />
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerHeader"
          aria-controls="navbarTogglerHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerHeader">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link exact-active-class="active" class="nav-link" to="/"
                >Home</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                exact-active-class="active"
                class="nav-link"
                to="/sobre"
                >Sobre</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                exact-active-class="active"
                class="nav-link"
                to="/cursos"
                >Cursos</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                exact-active-class="active"
                class="nav-link"
                to="/faq"
                >FAQ</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                exact-active-class="active"
                class="nav-link"
                to="/como-funciona"
                >Como funciona?</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                exact-active-class="active"
                class="nav-link"
                to="/contato"
                >Contato</router-link
              >
            </li>

            <!-- Admin -->
          </ul>

          <ul class="navbar-nav ml-auto" v-if="!isLogged">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/login"
                >Login</router-link
              >
            </li>
          </ul>

          <div class="dropdown" v-else>
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon icon="user" />
              {{ userName }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
              <li>
                <router-link class="dropdown-item" to="/admin"
                  >Gestão</router-link
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="logout"
                  >Sair</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";

import { EventBus } from "../main";

export default {
  name: "TheHeader",
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
      const token = window.localStorage.getItem("token");

      if (token) {
        const axiosInstance = axios.create({
          baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
          headers: {
            Authorization: `${token}`,
          },
        });

        try {
          const data = await axiosInstance.post("/auth/me");
          this.userName = data.data.name;
          this.isLogged = true;
        } catch (error) {
          this.isLogged = false;
          this.userName = null;
          window.localStorage.setItem("token", null);
        }
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
};
</script>

<style scoped>
#logo {
  width: 60px;
}

.bg-dark {
  background-color: var(--color-background-nav) !important;
}
</style>