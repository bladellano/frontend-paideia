<template>
  <section class="login mt-4">
    <h1 class="h3 mb-3 font-weight-normal text-center">Login</h1>
    <form>
      <label for="email">E-mail</label>
      <input
        type="text"
        class="form-control"
        name="email"
        id="email"
        v-model="login.email"
      />
      <label for="email">Senha</label>
      <input
        type="password"
        class="form-control"
        name="password"
        id="password"
        v-model="login.password"
      />

      <button class="btn btn-success my-2" @click.prevent="logar">Logar</button>
    </form>
  </section>
</template>
  
<script>
import api from "@/services";
import axios from "axios";

import { EventBus } from "../main";

export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "test@example.com",
        password: "password",
      },
    };
  },
  methods: {
    async logar() {
      const request = this.login;

      try {
        const { data } = await api.post("/auth/login", request);

        window.localStorage.token = `Bearer ${data.access_token}`;

        /** Pega o nome do usuário */
        const axiosInstance = axios.create({
          baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
        const me = await axiosInstance.post("/auth/me");
        const name = me.data.name;
        
        EventBus.$emit("update-logged-in-status", true, name);
        this.$router.push({ name: "courses" });

      } catch (error) {
        Toast.fire(error.response.data.error, "", "error");
      }
    },
  },
};
</script>
  
<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px;
}
h1 {
  font-weight: 600;
  color: var(--color-background-nav);
}
</style>