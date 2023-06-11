<template>
  <section class="container my-4">

    <h4 class="my-4">Criando <strong>Certificado</strong></h4>

    <div v-if="item">

    <div class="pdfContent">

      <div class="internal">

        <h2>{{ item.name }}</h2>

        <p>{{ conclusionText }}</p>

        <p>{{ textWithCode }} {{ code }}</p>

      </div>

    </div><!-- ./pdfContent -->

    <hr/>

    <div class="row">
      <div class="col-md-12">
        <label for="">Linha 1:</label>
        <input type="text" class="form-control" v-model="conclusionText">
        <label for="">Linha 2:</label>
        <input type="text" class="form-control mt-2" v-model="textWithCode">
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-6 text-center">
        <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
        Voltar
        </button>
      </div>
      <div class="col-md-6 text-center">
        <button @click="makePDF" class="btn btn-success">Gerar PDF</button>
      </div>
    </div>

    </div>

    <LoadingPage v-else />
   

  </section>
</template>

<script>

import api from "@/services";
import jsPDF from "jspdf";
import backgroundImg from '@/assets/bg-certificate.jpg';
import LoadingPage from "@/components/LoadingPage.vue";
import { generateHash } from "@/helpers";

export default {
  name: "CertificateRegister",
  props: ["student"],
  components: {
    LoadingPage,
  },
  data() {
    return {
      generateHash,
      item: null,
      author: "Paideia Educacional",
      code:'',
      conclusionText: 'Concluiu com êxito o curso de Elaboração de Currículo com carga horária de 50 hora(s) no período de 06/03/2023 até 08/03/2023',
      textWithCode: 'Código do certificado: ',
    };
  },
  methods:{
    async getItem() {
      await api.get(`/students/${this.student}`).then((res) => {
        this.item = res.data[0];
      });
    },
    makePDF(){
     
      const doc = new jsPDF("l", "pt", "a4");

      doc.addImage(backgroundImg, 'JPG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

      doc.setFont('Times');

      doc.setFontSize(32);

      doc.setTextColor(0, 0, 0); 

      doc.text(this.item.name, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2, {align: 'center'});

      doc.setFontSize(20);

      const splitText = doc.splitTextToSize(this.conclusionText, doc.internal.pageSize.getWidth() - 100);

      doc.text(splitText, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2 + 50, {  align: 'center'});

      doc.text(this.textWithCode + this.code, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2 + 120, {  align: 'center'});

      doc.save('certificado.pdf');
    }
  },
  mounted() {
    this.getItem();
    this.code = this.generateHash('CERT_');
  },
};
</script>

<style scoped>
.pdfContent {
  margin: 0 auto;
  width: 100%;
  height:calc(100vh - 10vh);
  border: 1px solid #9996;
  display: flex;
  align-items: center;
  background-image: url('@/assets/bg-certificate.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 0 60px;
}
.pdfContent .internal {
  text-align: center;
}
</style>