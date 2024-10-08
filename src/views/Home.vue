<template>
  <main>
    <!-- Primeira seção com formulário de busca -->
    <section class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
      <div class="container">
        <div class="search-board">
          <h3>Digite o código completo</h3>
          <div class="wrap-input">
            <div class="border-input">
            
              <div class="input-group">
              
                <input 
                  type="text" 
                  class="form-control mb-2" 
                  placeholder="Digite o código do seu documento"
                  v-model="historic.code" 
                  name="historic"
                >
                <div v-if="historic.content" class="alert alert-success alert-dismissible fade show mt-3" style="text-align: justify;">
                  Este documento de referência, identificado sob o código <b>{{ historic.code }}</b>, é válido e foi emitido em nome de(a) 
                  <b>{{ historic.content ? historic.content.student.name : '' }}</b>.
                  <button 
                    @click="historic.content = null" 
                    type="button" 
                    class="btn-close" 
                    data-bs-dismiss="alert"
                    aria-label="Close"></button>
                </div>
                <div class="input-group-append">
                  <button class="btn btn-dark" type="button" @click.prevent="hasDocument" :disabled="!historicRecaptchaResponse">
                    <font-awesome-icon class="d-md-none" icon="search" />
                    <span class="d-none d-md-block">Procurar</span>
                  </button>
                </div>
              </div>
              <div class="input-group">
                <recaptcha :site-key="siteKey" @verified="onHistoricVerified"></recaptcha>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Segunda seção com formulário de contato -->
    <section class="text-white" :style="`background-color: ${mainColor};`">
      <div class="container">
      
        <div class="row">
          <div class="col-md-6">
            <img class="handshack" src="@/assets/handshack.png" alt="Handshack">
          </div>
          <div class="col-md-6 contact">
          
            <h2>Ficou alguma dúvida?</h2>
            <p>Entre em contato CONOSCO!</p>
            
            <form class="text-left" @submit.prevent="sendEmail">
              <div class="mb-3">
                <label for="name">Seu nome:</label>
                <input data-test="name" type="text" class="form-control" v-model="email.nome">
              </div>
              <div class="mb-3">
                <label for="email">E-mail:</label>
                <input data-test="email" type="email" class="form-control" v-model="email.e_mail">
              </div>
              <div class="mb-3">
                <label for="doubt">Dúvida:</label>
                <input data-test="doubt" type="text" class="form-control" v-model="email.doubt">
              </div>
              <div class="mb-3">
                <label for="whatsapp">WhatsApp:</label>
                <TheMask data-test="whatsapp" type="text" class="form-control" :mask="['(##) ####-####', '(##) #####-####']" :masked="true" 
                         v-model="email.whatsapp" />
              </div>
              <div class="input-group">
                <recaptcha :site-key="siteKey" @verified="onEmailVerified"></recaptcha>
              </div>
              <div class="mb-3 d-grid">
                <button data-test="submit" v-if="!loading" type="submit" class="btn btn-outline-light" :disabled="!emailRecaptchaResponse">Enviar</button>
                <LoadingPage class="loading" v-else />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>

import api from "@/services";
import LoadingPage from "@/components/LoadingPage.vue";
import Recaptcha from "@/components/Recaptcha.vue";

export default {
  components: {
    LoadingPage,
    Recaptcha
  },
  
  data() {
    return {
      siteKey: "6Le1mbcZAAAAAAnWnOCN7kS6xueKw82MQifMXw76", // Substitua pela sua chave do site
      historicRecaptchaResponse: null,  // Resposta reCAPTCHA do primeiro formulário
      emailRecaptchaResponse: null,     // Resposta reCAPTCHA do segundo formulário
      loading: false,
      email: {
        nome: "",
        e_mail: "",
        doubt: "",
        whatsapp: "",
      },
      mainColor: "#C4C4C4",
      historic: {
        code: "",
        content: null,
      },
    };
  },
  methods: {
    // Verificação do reCAPTCHA para o formulário de busca
    onHistoricVerified(response) {
      this.historicRecaptchaResponse = response;
    },
    // Verificação do reCAPTCHA para o formulário de contato
    onEmailVerified(response) {
      this.emailRecaptchaResponse = response;
    },
    async sendEmail() {
      if (!this.email.nome || !this.email.e_mail || !this.email.whatsapp || !this.email.doubt)
        return Toast.fire('Atenção!', 'Por favor, preencha todos os campos do formulário de contato.', "warning");

      this.loading = true;

      const qr = new URLSearchParams(this.email).toString();

      try {
      
        const { data } = await api.get(`/send-mail?${qr}`);
        Toast.fire("Sucesso!", data.message, "success");
        this.email.nome = this.email.e_mail = this.email.whatsapp = this.email.doubt = null;
        
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }

      this.loading = false;
    },
    async hasDocument() {
    
      if (!this.historic.code.length)
        return Toast.fire('Atenção!', 'Preencha corretamente o campo', "error");

      await api
        .get(`/documents/has-document/${this.historic.code}`)
        .then((res) => {
          this.historic.content = res.data[0];
        })
        .catch((error) => {
          Toast.fire("Atenção!", error.response.data.message, "warning");
          this.historic.content = null;
        });
    },
  },
  mounted() {
    const { main_color } = JSON.parse(localStorage.getItem('data_client') || '{}');
    
    this.mainColor = main_color || this.main_color;
    
  }
};
</script>
  
<style scoped>
.loading {
  background-color: white;
  position: fixed;
  transform: translate(0, -50%);
  top: 50%;
  left: 50%;
  z-index: 999;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #697783;
  box-shadow: 2px 2px 10px #8885;
}

.text-code {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333333;
}

.search-board h3 {
  font-size: 1.8rem;
  font-weight: 700;
}

.search-board h2 {
  font-size: 3rem;
  font-weight: 700;
  color: #697783;
}

.wrap-input {
  border: 1px solid #697783;
  padding: 60px 120px;
  border-radius: 10px;
  width: 80%;
  margin: 40px auto;
}

.border-input {
  padding: 40px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f4f4f4;
}

.contact {
  padding: 4px;
}

.contact h2 {
  font-size: 2rem;
  font-weight: 700;
}

.contact p {
  font-weight: 300;
  font-size: 1.2rem;
  text-align: justify;
}

.handshack {
  margin: -58px -64px -58px 0px;
  width: 340px;
  z-index: 999;
  position: relative;
}

/* Estilos para telas pequenas (MD) - 768px ou menos */
@media (max-width: 768px) {
  .border-input {
    padding: 0;
  }

  .wrap-input {
    padding: 32px 14px;
    width: 98%;
  }

  .handshack {
    display: none;
  }

  .contact {
    padding-top: 20px;
    width: 92%;
    margin: 0 auto;
  }

  .contact h2 {
    font-size: 1.2rem;
  }

  #hero {
    height: 346px;
  }

  .text-code {
    font-size: 2.0rem;
  }

  .students {
    display: none;
  }

  footer {
    padding: 36px 0;
  }

  .input-group {
    justify-content: center;
  }

  .search-board h2 {
    font-size: 2.5rem;
  }

  .search-board h3 {
    margin-top: 20px;
    font-size: 1.4rem;
  }

}
</style>