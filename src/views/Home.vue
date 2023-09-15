<template>
  <main>
    <section class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
      <div class="container">
        <div class="search-board">
          <h3>Digite o código completo de seu</h3>
          <h2>CERTIFICADO</h2>
          <div class="wrap-input">
            <div class="border-input">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Digite o código do certificado"
                  v-model="historic.code"
                  name="historic"
                >

                <div v-if="historic.content" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                  Este documento de referência, identificado sob o código <b>{{ historic.code }}</b>, é válido e foi emitido em <b>{{ (historic.content) ? historic.content.created_at : '' }}</b> em nome de(a) <b>{{ (historic.content) ? historic.content.student.name : '' }}</b>.
                    <button @click="historic.content = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                <div class="input-group-append">
                  <button 
                    class="btn btn-dark" 
                    type="button"
                    @click.prevent="hasDocument"
                  >Procurar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="text-white" style="background-color: #7f9c97;">
      <div class="container">

        <div class="row">
          <div class="col-md-6">
            <img class="handshack" src="@/assets/handshack.png" alt="Handshack">
          </div>
          <div class="col-md-6 contact">
            <h2>Sua escola não é credenciada?</h2>
            <p>Entre em contato com a gente para ser uma escola autorizada!</p>
            <form class="text-left">
              <div class="mb-3">
                <label for="name">Seu nome:</label>
                <input type="text" class="form-control" id="name">
              </div>
              <div class="mb-3">
                <label for="school">Escola:</label>
                <input type="text" class="form-control" id="school">
              </div>
              <div class="mb-3">
                <label for="whatsapp">WhatsApp:</label>
                <input type="text" class="form-control" id="whatsapp">
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-outline-light btn-block">Enviar</button>
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
    async hasDocument() {

      if (!this.historic.code.length)
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
.text-code {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0bff43;
}

.search-board h3 {
  font-size: 1.8rem;
  font-weight: 700;
}

.search-board h2 {
  font-size: 3rem;
  font-weight: 700;
  color: #7f9c97;
}

.wrap-input {
  border: 1px solid #7f9c97;
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

</style>