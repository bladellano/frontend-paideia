<template>
  <section class="container-fluid">

    <div class="content">

      <NavigationVuetify :items="items" />

      <transition mode="out-in">
        <router-view></router-view>
      </transition>

    </div>
  </section>
</template>

<script>

import NavigationVuetify from "@/components/NavigationVuetify.vue";
import Menu from "@/mixins/Menu";

export default {
  name: "Admin",
  mixins: [Menu],
  components: {
    NavigationVuetify,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(-20px, 0, 0);
}

.v-leave-to {
  transform: translate3d(20px, 0, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
