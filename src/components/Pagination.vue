<template>
  <div class="text-center">
    <v-container class="max-width">
      <v-pagination
        v-model="currentPage"
        :length="source.last_page"
        @input="navigate"
        total-visible="10"
        class="my-4"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    source: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPage: this.source.current_page,
    };
  },
  watch: {
    source: {
      handler(newValue) {
        this.currentPage = newValue.current_page;
      },
      immediate: true,
    },
  },
  methods: {
    navigate(page) {
      this.$emit("navigate", page);
    },
  },
};
</script>

<style scoped>
</style>
