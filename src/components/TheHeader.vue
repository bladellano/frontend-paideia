<template>
  <header id="hero" :style="`background-image: url(${cover})`" class="position-relative overflow-hidden pt-5 text-center bg-dark text-white">

    <div class="container">

      <div class="row">
        <div class="col-md-4 my-auto">
          <h3 class="text-code text-md-start">{{ mainService }}</h3>
        </div>
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <img :src="logoSrc" alt="Logo da Escola" class="img-fluid">
        </div>
      </div>
    </div>

  </header>
</template>

<script>
export default {
  data() {
    return {
      logoSrc: '',
      cover: '',
      mainService: 'Verifique a autenticidade de seu Documento',
    };
  },
  mounted() {

    const { colored_logo, main_service, cover } = JSON.parse(localStorage.getItem('data_client') || '{}');

    this.logoSrc = colored_logo || this.logoSrc;
    this.mainService = main_service || this.main_service;
    this.cover = cover || this.cover;

  }
};
</script>

<style scoped>
#hero {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.text-code {
  font-size: 2.9rem;
  font-weight: 700;
  color: #FFF;
}

img {
  filter: brightness(2);
}

@media (max-width: 768px) {
  img {
    width: 200px;
  }

  .text-code {
    font-size: 1.6rem;
  }
}
</style>