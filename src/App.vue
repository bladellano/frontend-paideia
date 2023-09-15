<template>
  <div id="app">

    <keep-alive>
      <TheHeader />
    </keep-alive>

    <main id="main">
      <router-view />
    </main>
    
    <TheFooter />
  </div>
</template>

<script>

import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  }
}
</script>

<style></style>
