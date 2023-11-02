<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: source.current_page == 1 }">
        <a
          class="page-link"
          href="#"
          @click="navigate($event, source.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        v-for="(page, index) in pages"
        :key="index"
        :class="{ active: source.current_page == page }"
      >
        <a class="page-link" href="#" @click="navigate($event, page)">
          {{ page }}
        </a>
      </li>

      <li
        class="page-item"
        :class="{ disabled: source.current_page == source.last_page }"
      >
        <a
          class="page-link"
          href="#"
          @click="navigate($event, source.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { range } from "lodash";

export default {
  name: "Pagination",
  props: ["source"],
  data() {
    return {
      pages: [],
    };
  },
  methods: {
    navigate(ev, page) {
      ev.preventDefault();
      this.$emit("navigate", page);
    },
  },
  watch: {
    source() {

      const currentPage = this.source.current_page;
      const lastPage = this.source.last_page;

      this.startPage = Math.max(1, currentPage - 5);
      this.endPage = Math.min(lastPage, currentPage + 5);
      
      this.pages = range(this.startPage, this.endPage + 1);

    },
  },
};
</script>

<style scoped>
.page-item.active .page-link {
  background-color: var(--color-primary) !important;
  border-color: var(--color-primary);
  color:#fff;
}
.page-item .page-link {
  color: var(--color-primary);
}
</style>