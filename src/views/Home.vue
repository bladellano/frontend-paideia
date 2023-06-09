<template>
  <main>
    <section id="hero">
      <div class="container content-hero">
        <div class="row text-light">
          <div class="col-md-5">
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
                <img src="@/assets/arrow-down-roxo.svg" />
              </a>
            </div>
          </div>
          <div class="col-md-7">
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
                  <!-- {{ historic }} -->
                  <input
                    type="text"
                    name="historic"
                    class="form-control"
                    v-model="historic.code"
                    placeholder="Digite o código impresso no documento"
                    autocomplete="off"
                  />
                  <!-- Exibe detalhes do documento -->
                  <div v-if="historic.content" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    Este documento <b>{{ historic.code }}</b> é valido e foi emitido em <b>{{ (historic.content) ? historic.content.created_at : '' }}</b> para <b>{{ (historic.content) ? historic.content.student.name : '' }}</b>.
                    <button @click="historic.content = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>

                </div>

                <button
                  @click.prevent="hasHistoric"
                  type="submit"
                  class="btn btn-success"
                >
                  Verificar
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="container my-4">
      <div class="row">
       
        <div class="col-md-8">
          <h2 class="title-product">Sunt consequatur ad ut est nulla consectetur reiciendis animi voluptas</h2>
          <p class="text-product">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo non unde, iure velit distinctio sapiente libero corrupti impedit eos earum ex! Nisi nostrum velit eveniet consequuntur suscipit
          </p>

          <ul class="list-product">
            <li> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
            <li> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
            <li> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
          </ul>
          <p class="text-product">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo non unde, iure velit distinctio sapiente libero corrupti impedit eos earum ex! Nisi nostrum velit eveniet consequuntur suscipit
          </p>
          <p class="text-product">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo non unde, iure velit distinctio sapiente libero corrupti impedit eos earum ex! Nisi nostrum velit eveniet consequuntur suscipit
          </p>
        </div>
        <div class="col-md-4">
          <img class="img-fluid" src="@/assets/details-3.png" alt="">
        </div>
      </div>
    
    </section>
  </main>
</template>
  
<script>
import api from "@/services";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      historic: {
        code: "",
        content: null,
      },
    };
  },
  methods: {
    async hasHistoric() {

      if(!this.historic.code.length)
        // eslint-disable-next-line no-undef
        return Toast.fire('Preencha corretamente o campo', "", "error");

      await api
        .get(`/historys/has-historic/${this.historic.code}`)
        .then((res) => {
          this.historic.content = res.data[0];
        })
        .catch((error) => {
          // eslint-disable-next-line no-undef
          Toast.fire(error.response.data.message, "", "error");
          this.historic.content = null;
        });
    },
  },
};
</script>
  
<style scoped>

.title-product{
  color: var(--color-background-nav);
}

.text-product{
  line-height: 35px;
  margin: 20px 0;
}

.list-product{
  list-style: none;
}
.list-product li {
  line-height: 35px;
}
.list-product li::before {
  border-left: 2px solid var(--color-background-hover-nav);
  border-top: 2px solid var(--color-background-hover-nav);
  width: 8px;
  height: 8px;
  content: "";
  transform: rotate(135deg);
  margin-top: 12.8px;
  margin-right: 1.2%;
  float: left;
}

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
  height: 410px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#hero::before {
  content: "";
  background: rgba(4, 59, 92, 0.70);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
</style>