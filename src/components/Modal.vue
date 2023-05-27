<template>
  <div class="modal-component" v-if="show">
    <div class="modal-content">
      <h4>{{ message }}</h4>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary mx-1" @click="cancel">
          Cancelar
        </button>
        <button type="button" class="btn btn-success" @click="confirm">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-component {
  font-family: "Nunito Sans", sans-serif;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-component h4 {
  font-weight: 600;
  font-size: 1.2rem;
}
.modal-content {
  background-color: #fff;
  width: 50%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "Deseja confirmar a ação?",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
</style>