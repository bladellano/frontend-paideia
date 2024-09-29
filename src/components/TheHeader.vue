<template>
  <header id="hero" :style="`background-image: url(${cover})`" class="overflow-hidden pt-5 text-center bg-dark text-white">

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
  position: relative;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
}

#hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
}

.text-code {
  font-size: 2.9rem;
  font-weight: 700;
  color: #FFF;
}

img {
  height: 250px;
  filter: brightness(0) invert(1);
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