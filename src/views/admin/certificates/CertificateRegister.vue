<template>
  <section class="container my-4">
    <h4 class="my-4">Criando <strong>Certificado</strong></h4>

    <div v-if="item && !blobPDF">
      <div class="pdfContent">
        <div class="internal">
          <h2>{{ item.name }}</h2>

          <p>
            <strong>{{ showInfoStudent }}</strong>
          </p>

          <p>{{ textSelectedForConclusion }}</p>

          <p>{{ textWithCode }} {{ code }}</p>

          <p>{{ createdAt }}</p>
        </div>
      </div>

      <hr />

      <div class="accordion" id="accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Frente
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordion"
          >
            <div class="accordion-body">
              <label for="">Texto de conclusão de ensino:</label>
              <select
                name=""
                id=""
                class="form-control"
                @change="handlerSelectText"
              >
                <option value="" selected disabled>-- Selecione --</option>
                <option value="FUND">Fundamental</option>
                <option value="MED">Médio</option>
              </select>

              <label for="">Linha 1:</label>
              <textarea
                cols="30"
                rows="4"
                class="form-control mt-2"
                v-model="textSelectedForConclusion"
              ></textarea>
              <label for="">Linha 2:</label>
              <input
                type="text"
                class="form-control mt-2"
                v-model="textWithCode"
              />
              <label for="">Linha 3:</label>
              <input
                type="text"
                class="form-control mt-2"
                v-model="createdAtText"
              />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Verso
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordion"
          >
            <div class="accordion-body">
              <label for="">Linha 1:</label>
              <textarea
                cols="30"
                rows="4"
                class="form-control mt-2"
                v-model="textBack"
              ></textarea>
              <label for="">Linha 2 (observação):</label>
              <input type="text" class="form-control mt-2" v-model="obsBack" />
            </div>
          </div>
        </div>
      </div>
   
    </div>

    <iframe
      v-else
      :src="blobPDF"
      width="100%"
      height="680"
      style="border: none"
    >
    </iframe>

    <div class="row mt-2">
        <div class="col-md-6 text-center">
          <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
            Voltar
          </button>
        </div>
        <div class="col-md-6 text-center">
          <button v-if="!blobPDF" @click="makePDF" class="btn btn-success">Gerar PDF</button>
          <button v-else @click="destroyPDF" class="btn btn-sm btn-danger">Apagar Certificado</button>
        </div>
    </div>

  </section>
</template>

<script>
import api from "@/services";
import jsPDF from "jspdf";
import LoadingPage from "@/components/LoadingPage.vue";
import { generateHash, displayDateInFull, cpfWithMask} from "@/helpers";
import { font as GreatVibes } from '@/font/GreatVibes-Regular-normal'

export default {
  name: "CertificateRegister",
  props: ["student"],
  components: {
    LoadingPage,
  },
  data() {
    return {
      folder:'certificate',
      blobPDF: null,
      generateHash,
      displayDateInFull,
      cpfWithMask,
      item: null,
      author: "Paideia Educacional",
      code: "",
      textSelectedForConclusion: null,
      conclusionTextFundamental:
        "e outorga-lhe o presente Certificado, por ter concluído em abril de "+ new Date().getFullYear() +", o Ensino Fundamental - Educação de Jovens e Adultos 3ª e 4ª etapas, dentro das prerrogativas e os direitos estabelecidos nas Leis de Ensino do País.",
      conclusionTextMedio:
        "e outorga-lhe o presente Certificado, por ter concluído em abril de "+ new Date().getFullYear() +", o Ensino Médio - Educação de Jovens e Adultos 1ª e 2ª etapas, dentro das prerrogativas e os direitos estabelecidos nas Leis de Ensino do País.",
      textWithCode: "Código de validação: ",
      textBack:
        "Certificado Registrado sob nº 03\nNo Livro nº 1 Folha nº 01\nEm 08 de maio de 2023",
      obsBack: "",
      createdAtText: "",
    };
  },
  computed: {
    showInfoStudent() {

      return `${this.item.nationality}, natural de ${
        this.item.naturalness
      }, nascido(a) em ${this.displayDateInFull(
        this.item.birth_date
      )}, CPF ${cpfWithMask(this.item.cpf)},`;
    },
    createdAt() {
      const currentDate = new Date();
      const date = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;
      return `Ananindeua - Pará, ${this.displayDateInFull(date)}`;
    },
    fileName(){
      return `${this.item.cpf}_certificado.pdf`;
    }
  },
  methods: {  
    handlerSelectText(ev) {
      if (ev.target.value == "FUND")
        this.textSelectedForConclusion = this.conclusionTextFundamental;

      if (ev.target.value == "MED")
        this.textSelectedForConclusion = this.conclusionTextMedio;
    },
    async getItem() {
      await api.get(`/students/${this.student}`).then((res) => {
        this.item = res.data[0];
      });
    },
    destroyPDF(){

      api.get(`/documents/${this.folder}/${this.fileName}/remove`)
      .then(response => {
        this.blobPDF = null;
        Toast.fire(response.data.message, "", "success");
      })
      .catch((error) => {
        Toast.fire(error.response.data.message,"", "error");
      });
    },
    makePDF() {

      if(!this.textSelectedForConclusion)
        return Toast.fire('Selecione um texto de conclusão para o Certificado.',"", "error");

      jsPDF.API.events.push(['addFonts', function () {
        this.addFileToVFS('vibes.ttf', GreatVibes);
        this.addFont('vibes.ttf', 'vibes', 'normal');
      }]);

      const doc = new jsPDF("l", "pt", "a4");

      //Primeira página

      doc.setFont("vibes");
      doc.setFontSize(50);

      doc.setTextColor(0, 0, 0);

      doc.text(
        this.item.name,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() / 2 + -68,
        { align: "center" }
      );
   
      doc.setFont("helvetica");

      doc.setFontSize(14);

      const splitTextShowInfo = doc.splitTextToSize(
        this.showInfoStudent,
        doc.internal.pageSize.getWidth() - 100
      );

      doc.text(
        splitTextShowInfo,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() / 2 + -40,
        { align: "center" }
      );

      doc.setFontSize(20);

      const splitText = doc.splitTextToSize(
        this.textSelectedForConclusion,
        doc.internal.pageSize.getWidth() - 80
      );

      doc.text(
        splitText,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() / 2 + 0,
        { align: "center" }
      );

      doc.text(
        this.textWithCode + this.code,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() / 2 + 80,
        { align: "center" }
      );

      doc.text(
        this.createdAtText,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() / 2 + 125,
        { align: "center" }
      );

      //Segunda página
      doc.addPage();

      doc.setFontSize(20);

      doc.text(
        this.textBack,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() / 2 + -130,
        { align: "center" }
      );

      doc.setFontSize(14);

      const splitObsBack = doc.splitTextToSize(
        this.obsBack,
        doc.internal.pageSize.getWidth() - 120
      );

      doc.text(
        splitObsBack,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() / 2 + 210,
        { align: "center" }
      );

      //Fim

      //Saved storage api
      const blob = doc.output("blob");
      this.storeDocumentPDF(blob);

      this.hasDocument(this.fileName)
    },
    async storeDocumentPDF(blob) {
      const formData = new FormData();

      formData.append("pdf", blob);
      formData.append("code", this.code);
      formData.append("type", "CERTIFICATE");
      formData.append("folder", this.folder);
      formData.append("document_name", "certificado");
      try {
        await api.post(`/documents/${this.$route.params.student}/store-document`, formData);
      } catch (error) {
        Toast.fire(error, "", "error");
      }
    },
    async hasDocument(filename) {
      this.blobPDF = null;

      let bool = true;
      await api
        .get(`/documents/storage/${this.folder}/${filename}`, {
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          this.blobPDF = URL.createObjectURL(blob);
        })
        .catch(() => (bool = false));
      return bool;
    },
  },
  watch: {
    item(n, o) {
      if (this.hasDocument(`${n.cpf}_certificado.pdf`)) 
        this.blobPDF = null;
    },
  },
  mounted() {
    this.getItem();
    this.code = this.generateHash("CERT_");
    this.createdAtText = this.createdAt;
  },
};
</script>

<style scoped>
.accordion-button {
  background-color: var(--color-background-nav) !important;
  color: #fff !important;
}
.pdfContent {
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 10vh);
  border: 1px solid #9996;
  display: flex;
  align-items: center;
  background-image: url("@/assets/bg-certificate-front.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 0 60px;
}
.pdfContent .internal {
  text-align: center;
}
</style>