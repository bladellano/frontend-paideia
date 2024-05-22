<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Criando <strong>Certificado</strong></h4>

    <div v-if="item && !blobPDF">
      <div class="row">
        <div class="col-md-8">
          <div class="pdfContent">
            <div class="internal">
              <h2>{{ item.name }}</h2>

              <p>
                <strong>{{ showInfoStudent }}</strong>
              </p>

              <p>{{ textDocumentSelected }}</p>

              <p>{{ textWithCode }} {{ code }}</p>

              <p>{{ createdAtText }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="accordion" id="accordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-front"
                  aria-expanded="true"
                  aria-controls="collapse-front"
                >
                  Frente
                </button>
              </h2>
              <div
                id="collapse-front"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordion"
              >
                <div class="accordion-body">
                  <label for="">Matrícula(s):</label>

                  <select
                    name="registration"
                    id="registration"
                    v-model="registration"
                    class="form-control form-control-sm mb-2"
                    @change="verifyExistsCertificate"
                  >
                    <option value="" selected disabled>-- Selecione --</option>
                    <option
                      v-for="(opt, index) in hasRegistration"
                      :key="index"
                      :value="opt.id"
                    >
                      {{ String(opt.id).padStart(6, "0") }} |
                      {{ opt.team.name }}
                    </option>
                  </select>

                  <label for="">Texto de Documentos:</label>
                  <select
                    name=""
                    id=""
                    class="form-control form-control-sm"
                    @change="handlerSelectText"
                  >
                    <option value="" selected disabled>-- Selecione --</option>

                    <option
                      v-for="(opt, index) in textDocuments"
                      :key="index"
                      :value="opt.id"
                    >
                      {{ opt.name }}
                    </option>
                  </select>
                  <hr />

                  <label for="">Linha 1:</label>
                  <textarea
                    cols="30"
                    rows="8"
                    class="form-control form-control-sm mt-2"
                    v-model="textDocumentSelected"
                  ></textarea>
                  <label for="">Linha 2:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm mt-2"
                    v-model="textWithCode"
                  />
                  <label for="">Linha 3:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm mt-2"
                    v-model="createdAtText"
                  />
                  <hr />
                  <label class="text-danger" for="code"
                    >Código Validador:</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-sm mt-2"
                    v-model="code"
                    id="code"
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
                  data-bs-target="#collapse-back"
                  aria-expanded="false"
                  aria-controls="collapse-back"
                >
                  Verso
                </button>
              </h2>
              <div
                id="collapse-back"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordion"
              >
                <div class="accordion-body">
                  <label for="">Linha 1:</label>
                  <textarea
                    cols="30"
                    rows="4"
                    class="form-control form-control-sm mt-2"
                    v-model="textBack"
                  ></textarea>
                  <label for="">Linha 2 (observação):</label>
                  <input
                    type="text"
                    class="form-control form-control-sm mt-2"
                    v-model="obsBack"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-md-12 text-center">
              <button
                v-if="!blobPDF"
                @click="makePDF"
                class="btn btn-success btn-sm text-uppercase"
              >
                Gerar PDF
              </button>
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

    <button
      v-if="blobPDF"
      @click="destroyPDF"
      class="btn btn-sm text-uppercase btn-danger me-2"
    >
      Apagar Certificado
    </button>

    <button
      class="btn btn-sm text-uppercase btn-secondary text-uppercase"
      @click="$router.go(-1)"
    >
      Voltar
    </button>
  </section>
</template>

<script>
import api from "@/services";
import jsPDF from "jspdf";
import LoadingPage from "@/components/LoadingPage.vue";
import { generateHash, displayDateInFull, cpfWithMask, slug } from "@/helpers";
import { font as GreatVibes } from "@/font/GreatVibes-Regular-normal";

export default {
  name: "CertificateRegister",
  props: ["student"],
  components: {
    LoadingPage,
  },
  data() {
    return {
      folder: "certificate",
      textDocuments: [],
      blobPDF: null,
      generateHash,
      displayDateInFull,
      cpfWithMask,
      slug,
      item: null,
      author: "Paideia Educacional",
      code: "",
      typeDocument: "CERTIFICATE",
      teamName: "",
      attachments: [],
      textDocumentSelected: null,
      textWithCode: "Código de validação: ",
      textBack:
        "Certificado Registrado sob nº 03\nNo Livro nº 1 Folha nº 01\nEm 08 de maio de 2023",
      obsBack: "",
      createdAtText: "",
      books: [],
      hasRegistration: [],
      registration: "",
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
    newNameFile() {
      return `${this.registration}_${this.item.cpf}_${this.typeDocument}.pdf`;
    },
    fileFound() {
      const generatedFiles = this.attachments.filter((e) =>
        e.file_name.includes(`${this.registration}_${this.item.cpf}`)
      );
      return generatedFiles.length ? generatedFiles[0].file_name : "";
    },
  },
  methods: {
    getFullYear() {
      return new Date().getFullYear();
    },
    verifyExistsCertificate(ev) {
      this.getItem();
    },
    handlerSelectText(ev) {
      const idText = ev.target.value;
      const text = this.textDocuments.filter((e) => e.id == idText);
      this.textDocumentSelected = text[0].content.replace(
        /\[\[DATA_ANO\]\]/g,
        this.getFullYear()
      );
    },
    async getTextDocuments() {
      await api.get(`/text-documents`).then((res) => {
        this.textDocuments = res.data.data;
      });
    },
    async getItem() {
      await api.get(`/students/${this.student}`).then((res) => {
        this.teamName = res.data[0].teams.length
          ? res.data[0].teams[0].name
          : "";
        this.attachments = res.data[0].documents.filter(
          (e) => e.type == this.typeDocument
        );
        this.item = res.data[0];
        this.books = res.data[0].books;
        this.hasRegistration = res.data[0].registrations;

        if (this.books.length)
          //! @TODO
          this.textBack = `Certificado Registrado sob nº ${this.books[0].registration_number} \nNo Livro nº ${this.books[0].book_number} Folha nº ${this.books[0].page_number}\nEm ${this.books[0].issue_date}`;
      });
    },
    destroyPDF() {
      api
        .get(`/documents/${this.folder}/${this.fileFound}/remove`)
        .then((response) => {
          this.blobPDF = null;
          Toast.fire(response.data.message, "", "success");
        })
        .catch((error) => {
          Toast.fire(error.response.data.message, "", "error");
        });
    },
    makePDF() {
      if (!this.textDocumentSelected || !this.registration)
        return Toast.fire(
          "Erro",
          "Você não selecionou um texto ou a matrícula para gerar o certificado.",
          "error"
        );

      jsPDF.API.events.push([
        "addFonts",
        function () {
          this.addFileToVFS("vibes.ttf", GreatVibes);
          this.addFont("vibes.ttf", "vibes", "normal");
        },
      ]);

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
        this.textDocumentSelected,
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

      this.hasDocument(this.newNameFile);
    },
    async storeDocumentPDF(blob) {
      const formData = new FormData();

      formData.append("pdf", blob);
      formData.append("code", this.code);
      formData.append("type", this.typeDocument);
      //! @TODO formData.append("team", this.teamName);
      formData.append("folder", this.folder);
      formData.append("document_name", this.typeDocument);
      formData.append("registration", this.registration);

      try {
        await api.post(
          `/documents/${this.$route.params.student}/store-document`,
          formData
        );
      } catch (error) {
        Toast.fire('Erro', error.message, "error");
      }
    },
    async hasDocument(filename) {
      this.blobPDF = null;

      var bool = true;

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
      if (this.hasDocument(this.newNameFile)) this.blobPDF = null;
    },
  },
  mounted() {
    this.getItem();
    this.code = this.generateHash("CERT_");
    this.createdAtText = this.createdAt;
    this.getTextDocuments();
  },
};
</script>

<style scoped>
.pdfContent {
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 10vh);
  border: 1px solid #9996;
  display: flex;
  align-items: center;
  padding: 0 60px;
  border: 1px dashed #999;
  max-height: 500px;
  background-color: #eee;
}

.pdfContent .internal {
  text-align: center;
}
</style>
