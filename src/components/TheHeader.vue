<template>
  <header id="hero" class="position-relative overflow-hidden pt-5 text-center bg-dark text-white">
    <div class="container">

      <div class="row">
        <div class="col-md-6 text-right">
          <div class="card-left ml-auto">
            <h1 class="title-main">Verifique se seu certificado está validado</h1>
            <p class="text-just">Somente instituições de ensino com reconhecimento nacional emitem
              certificados que são oficialmente reconhecidos e autorizados..</p>
            <h3 class="text-code">Abaixo digite o Código de seu certificado</h3>
          </div>
        </div>
        <div class="col-md-6">
          <img class="students" src="@/assets/woman.png" alt="Alunos">
        </div>
      </div>
    </div>

  </header>
</template>



<style scoped>

#hero {
  background-image: url("@/assets/hero-bg.jpg");
  position: relative;
  height: 410px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#hero::before {
  content: "";
  background: rgba(0, 12, 10, 0.842);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
.students {
  z-index: 999;
  position: relative;
}

.card-left {
  max-width: 450px;
  text-align: left;
  z-index: 999;
  position: relative;
}
.title-main {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
}

.text-just {
  font-size: 1rem;
  font-weight: 300;
}
.text-code {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0bff43;
}
</style>