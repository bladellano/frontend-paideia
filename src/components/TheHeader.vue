<template>
  <header 
    id="hero" 
    :style="`background-image: url(${cover}); height: ${isHeroCollapsed ? '100px' : '580px'}`" 
    class="overflow-hidden text-white"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-4 my-auto">
          <h3 v-if="!isHeroCollapsed" class="text-code text-md-start">{{ mainService }}</h3>
        </div>
        <div class="col-md-4">
        </div>
        <div class="col-md-4 text-right">
          <img v-if="!isHeroCollapsed" :src="logoSrc" alt="Logo da Escola" class="img-fluid">
          <!-- Botão para alternar o estado do header -->
          <v-btn 
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="toggleHero">
            <v-icon v-if="isHeroCollapsed" aria-hidden="false">
              mdi-menu-down-outline
            </v-icon>
            <v-icon v-else>
              mdi-menu-up-outline
            </v-icon>
          </v-btn>
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
      isHeroCollapsed: false, // Estado que controla se o header está recolhido
    };
  },
  mounted() {
    // Carregar os dados do localStorage
    const { colored_logo, main_service, cover } = JSON.parse(localStorage.getItem('data_client') || '{}');
    const isHeroCollapsed = localStorage.getItem('isHeroCollapsed') === 'true'; // Persistência do estado

    this.logoSrc = colored_logo || this.logoSrc;
    this.mainService = main_service || this.main_service;
    this.cover = cover || this.cover;
    this.isHeroCollapsed = isHeroCollapsed; // Definir o estado de colapsado
  },
  methods: {
    toggleHero() {
      // Alternar o estado do header
      this.isHeroCollapsed = !this.isHeroCollapsed;
      // Salvar o estado no localStorage
      localStorage.setItem('isHeroCollapsed', this.isHeroCollapsed);
    }
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
  transition: height 0.3s ease; /* Transição suave para recolher/expandir */
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
    height: 150px;
  }

  .text-code {
    font-size: 2.2rem;
  }
}
</style>
