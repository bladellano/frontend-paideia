<template>
  <div>
    <div
      ref="recaptcha"
      class="g-recaptcha"
      :data-sitekey="siteKey"
      @recaptcha-callback="onVerify"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Recaptcha",
  props: {
    siteKey: {
      type: String,
      required: true,
    },
  },
  mounted() {

    if (typeof grecaptcha !== "undefined") {
      grecaptcha.render(this.$refs.recaptcha, {
        sitekey: this.siteKey,
        callback: this.onVerify,
      });
    } else {
      console.error("reCAPTCHA API script is not loaded");
    }
  },
  methods: {
    onVerify(response) {
      this.$emit("verified", response);
    },
  },
};
</script>

<style scoped>
.g-recaptcha {
  display: inline-block;
}
</style>
