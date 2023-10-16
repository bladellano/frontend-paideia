<template>
  <header id="hero" class="position-relative overflow-hidden pt-5 text-center bg-dark text-white">

    <div class="container">

      <div class="row">
        <div class="col-md-4 my-auto">
          <h3 class="text-code text-md-start">Verifique a autenticidade de seu Documento</h3>
        </div>
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <img src="@/assets/logo.png" alt="Logo Paideia Educacional" class="img-fluid">
        </div>
      </div>
    </div>

  </header>
</template>

<style scoped>
#hero {
  background-image: url("@/assets/hero-bg.jpg");
  position: relative;
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