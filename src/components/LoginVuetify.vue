<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline text-center"> Login </v-card-title>
          <v-card-subtitle class="text-center">
            Acesse sua conta
          </v-card-subtitle>

          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="login.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
                required
                prepend-icon="mdi-email"
              ></v-text-field>

              <v-text-field
                v-model="login.password"
                :rules="[rules.required]"
                prepend-icon="mdi-lock"
                label="Senha"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="logar">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import api from "@/services";
import axios from "axios";
import { EventBus } from "../main";

export default {
  name: "LoginVuetify",
  data() {
    return {
      valid: false,
      login: {
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
        email: (value) => {
          const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
          return pattern.test(value) || "E-mail deve ser válido.";
        },
      },
    };
  },
  methods: {
    async logar() {
      if (this.$refs.form.validate()) {
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

          window.location.href = "./admin/dashboard";
        } catch (error) {
          console.warning(error);
          Toast.fire(
            "Atenção!",
            "E-mail ou senha não correspondem.",
            "warning"
          );
        }
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  background-color: #1976d2;
  color: white;
  padding: 16px;
}

.v-btn {
  width: 100%;
}
</style>
