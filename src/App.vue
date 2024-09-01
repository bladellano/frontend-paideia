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

export default {
  name: "App",
  components: {
    VApp,
    TheHeader,
    TheFooter
  },
};
</script>

<style></style>
