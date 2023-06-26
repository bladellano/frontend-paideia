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
          <h2 class="title-product">A importância de ter um aplicativo que valide a autenticidade de documentos </h2>
          <p class="text-product">
            Ter um aplicativo que valide a autenticidade de documentos é de extrema importância nos dias de hoje. Com o avanço da tecnologia e o aumento da facilidade de manipulação de documentos digitais, garantir a autenticidade e integridade desses documentos tornou-se fundamental em diversas áreas, como negócios, governo e até mesmo no cotidiano das pessoas.
          </p>

          <ul class="list-product">
            <li> Verificação de assinaturas digitais: Um aplicativo pode verificar se um documento foi assinado digitalmente usando criptografia assimétrica. Isso garante que o documento não tenha sido alterado desde a assinatura e que o signatário seja autêntico.</li>
            <li> Comparação de dados biométricos: Em alguns casos, documentos podem conter dados biométricos, como impressões digitais ou fotografias. Um aplicativo pode comparar esses dados com registros confiáveis para confirmar a autenticidade do documento.</li>
            <li> Análise de códigos de autenticação: Alguns documentos podem ter códigos de autenticação, como códigos QR ou códigos de barras. Um aplicativo pode ler e verificar esses códigos para garantir a autenticidade do documento.</li>
          </ul>
          <p class="text-product">
            Um aplicativo de validação de documentos oferece uma camada adicional de segurança, permitindo que os usuários verifiquem se um documento é legítimo e não foi falsificado ou adulterado. Isso é especialmente relevante em transações comerciais, contratos legais, documentos de identificação e certificados.
          </p>
          <p class="text-product">
            Em resumo, ter um aplicativo que valide a autenticidade de documentos é essencial para garantir a confiança e a segurança nas transações e interações que envolvem documentos. Ele fornece uma camada adicional de proteção contra falsificações e adulterações, promovendo a confiabilidade dos processos e a proteção dos direitos e interesses das partes envolvidas.
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
        return Toast.fire('Preencha corretamente o campo', "", "error");

      await api
        .get(`/documents/has-document/${this.historic.code}`)
        .then((res) => {
          this.historic.content = res.data[0];
        })
        .catch((error) => {
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
  line-height: 28px;
  font-size: 0.86rem;
  padding-left: 10px;
}
.list-product li::before {
  border-left: 3px solid #2dc0d7;
  border-top: 3px solid #2dc0d7;
  width: 10px;
  height: 10px;
  content: "";
  transform: rotate(135deg);
  margin-top: 8.6px;
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
  background: rgba(127, 156, 151, 0.70);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
</style>