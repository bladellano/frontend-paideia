<template>
  <main>
    <section id="hero">
      <div class="container content-hero">
        <div class="row text-light">
          <div class="col-md-6">
            <h2>
              Verifique a autenticidade de certificado ou histórico escolar
              emitidos pela Paideia Educacional
            </h2>
            <p>
              Autentique documentos de forma mais ágil e segura com o Validar,
              aqui você consegue através do código impresso no documento, obter
              detalhes sobre o certificado ou histórico escolar emitidos pela
              instituição.
            </p>
            <br />
            <h5>
              Não permita que usuários fraudulentos atrapalhem sua operação!
            </h5>

            <div class="ancora-arrow">
              <a href="#">
                <img
                  src="@/assets/arrow-down-roxo.svg"
                />
              </a>
            </div>
          </div>
          <div class="col-md-6">
            <form>
              <fieldset>
                <h2>Validador</h2>

                <div class="mb-3">
                  <label for="disabledTextInput" class="form-label"
                    >Certificado</label
                  >
                  <input
                    type="text"
                    name="certificado"
                    class="form-control"
                    placeholder="Digite o código impresso no documento"
                  />
                </div>

                <button type="submit" class="btn btn-primary">Verificar</button>
              </fieldset>
            </form>
            <br />
            <form>
              <fieldset>
                <div class="mb-3">
                  <label for="disabledSelect" class="form-label"
                    >Histórico Escolar</label
                  >
                  <input
                    type="text"
                    name="historico"
                    class="form-control"
                    placeholder="Digite o código impresso no documento"
                  />
                </div>

                <button type="submit" class="btn btn-success">Verificar</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="container my-4">
      <h4 class="my-4">Home</h4>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
        veritatis nihil. Quae libero voluptas ea. Voluptatem repudiandae autem
        excepturi voluptatibus vero dolore aspernatur quis est quos itaque quae
        eius aliquam ipsum fuga velit magnam pariatur, distinctio odio dolorum
        corrupti perferendis! Voluptate et alias, fugiat quidem ad eligendi fuga
        laborum voluptatem voluptatum provident rem consequuntur quis adipisci
        quasi aut earum minus amet expedita maiores saepe labore necessitatibus
        harum perspiciatis. Veniam adipisci necessitatibus, ratione vel est fuga
        dolorum nam eligendi quas quod repudiandae, iste optio quis quasi
        aperiam dolor unde similique perferendis tempora atque saepe impedit
        itaque? Necessitatibus inventore tempore quam facere.
      </p>

      <h4 class="my-4">Home</h4>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
        veritatis nihil. Quae libero voluptas ea. Voluptatem repudiandae autem
        excepturi voluptatibus vero dolore aspernatur quis est quos itaque quae
        eius aliquam ipsum fuga velit magnam pariatur, distinctio odio dolorum
        corrupti perferendis! Voluptate et alias, fugiat quidem ad eligendi fuga
        laborum voluptatem voluptatum provident rem consequuntur quis adipisci
        quasi aut earum minus amet expedita maiores saepe labore necessitatibus
        harum perspiciatis. Veniam adipisci necessitatibus, ratione vel est fuga
        dolorum nam eligendi quas quod repudiandae, iste optio quis quasi
        aperiam dolor unde similique perferendis tempora atque saepe impedit
        itaque? Necessitatibus inventore tempore quam facere.
      </p>

      <h4 class="my-4">Home</h4>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
        veritatis nihil. Quae libero voluptas ea. Voluptatem repudiandae autem
        excepturi voluptatibus vero dolore aspernatur quis est quos itaque quae
        eius aliquam ipsum fuga velit magnam pariatur, distinctio odio dolorum
        corrupti perferendis! Voluptate et alias, fugiat quidem ad eligendi fuga
        laborum voluptatem voluptatum provident rem consequuntur quis adipisci
        quasi aut earum minus amet expedita maiores saepe labore necessitatibus
        harum perspiciatis. Veniam adipisci necessitatibus, ratione vel est fuga
        dolorum nam eligendi quas quod repudiandae, iste optio quis quasi
        aperiam dolor unde similique perferendis tempora atque saepe impedit
        itaque? Necessitatibus inventore tempore quam facere.
      </p>
    </section>
  </main>
</template>
  
<script>
export default {
  name: "Home",
};
</script>
  
<style scoped>
.ancora-arrow a {
  animation: vertical-animate 1.5s infinite alternate;
}
.ancora-arrow img {
  filter: brightness(20%);
  height: 60px;
}
.ancora-arrow {
  margin-top: 25px;
  display: flex;
}

@keyframes vertical-animate {
  0%,
  40% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  70% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
}

h1 {
  font-size: 2rem;
  color: var(--color-text-dark);
  margin-top: 40px;
  text-align: center;
}
h2 {
  letter-spacing: -1px;
  font-weight: 600;
  margin-top: 20px;
}
p {
  line-height: 30px;
}
.content-hero {
  z-index: 1;
  position: relative;
}

#hero {
  background-image: url("@/assets/hero-bg.jpg");
  position: relative;
  height: 400px;
}

#hero::before {
  content: "";
  background: rgba(4, 59, 92, 0.88);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
</style>