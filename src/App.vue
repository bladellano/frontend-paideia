<template>
  <v-app>
    
    <keep-alive>
      <TheHeader />
    </keep-alive>

    <main id="main">
      <router-view />
    </main>

    <TheFooter />
  </v-app>
</template>

<script>
import { VApp } from "vuetify/lib";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import api from "@/services";

export default {
  name: "App",
  components: {
    VApp,
    TheHeader,
    TheFooter
  },
  methods: {
    async getConfigClient() {
      const { data } = await api.get("/data-of-client");
      window.localStorage.data_client = JSON.stringify(data);
    }
  },
  mounted(){
    this.getConfigClient();
  }
};
</script>

<style></style>
