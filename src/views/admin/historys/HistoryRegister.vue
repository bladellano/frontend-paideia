<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Criando <strong>Histórico</strong></h4>

    <div v-if="item">
      <form>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="name">Aluno</label>
            <input
              readonly
              type="text"
              class="form-control"
              id="name"
              v-model="item.name"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-3">
            <label for="name">Turmas</label>
            <select id="team" class="form-control" @change="getFullGrid">
              <option disabled value="" selected>-- Selecione --</option>
              <option v-for="registration in registrations" :key="registration.team.id" :value="registration.team.id" :data-matricula="registration.id">
                {{ registration.team.name | uppercase }}
              </option>
            </select>

          </div>

          <div class="form-group col-md-2">
            <label for="name">Cidade</label>
            <input
              type="text"
              name="city"
              v-model="city"
              class="form-control"
            />
          </div>

          <div class="form-group col-md-1">
            <label for="name">Estado</label>
            <input type="text" name="uf" v-model="uf" class="form-control" />
          </div>

          <div class="form-group col-md-1">
            <label for="name">Dia</label>
            <input
              type="text"
              maxlength="2"
              name="uf"
              v-model="day"
              @keyup="filterNonNumeric"
              class="form-control"
            />
          </div>

          <div class="form-group col-md-2">
            <label for="name">Mês</label>

            <select id="month" class="form-control" v-model="month">
              <option disabled value="" selected>-- Selecione --</option>
              <option v-for="(name, index) in months" :key="index">
                {{ name }}
              </option>
            </select>

          </div>

          <div class="form-group col-md-1">
            <label for="name">Ano</label>
            <input
              type="text"
              maxlength="4"
              name="uf"
              v-model="year"
              @keyup="filterNonNumeric"
              class="form-control"
            />
          </div>

          <div class="form-group col-md-2">
            <label for="name">Média</label>

            <input
              type="text"
              name="media"
              v-model="media"
              class="form-control"
            />
          </div>

        </div>
      </form>

    </div>
    <LoadingPage v-else />
    <!-- Lista grade para ser preenchida -->

    <transition>
      <div v-if="isObjectEmpty">
        <hr />
        <div class="pdfContent">
          <div class="historyHeader">
            <p>NOME: {{ item.name }}</p>
            <p>MÃE: {{ item.name_mother }}</p>
            <p>NATURALIDADE: {{ item.naturalness }}</p>
            <p>DATA &nbsp;DE NASCIMENTO: {{ item.birth_date }}</p>
            <p>CPF: {{ cpfWithMask(item.cpf) }}</p>
            <span class="code" title="Código de segurança para validação do documento. A cada atualização da página esse valor altera.">Código de validação: {{ code }}</span>
          </div>

          <p class="text-center">
            <b>{{ courseName | uppercase }}</b>
          </p> 

          <form ref="formHistoric" @submit.prevent="saveGrades">

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle; width: 35%;"
                  >
                    DISCIPLINA
                  </th>
                  <th :colspan="(totalStage * 2)" style="text-align: center">
                    RESULTADO FINAL
                  </th>
                </tr>

                <tr>

                  <template v-for="(stage) in rangeStage" >

                    <!-- eslint-disable-next-line vue/require-v-for-key -->
                    <th style="text-align: center; white-space: nowrap" > C/H TOTAL </th>

                    <!-- eslint-disable-next-line vue/require-v-for-key -->
                    <th style="text-align: center; white-space: nowrap" > ETAPA {{ stage }} </th>

                  </template>
                
                </tr>

              </thead>

              <tbody>
                <tr v-for="(discipline, index) in gridTemplate" :key="index">
                  <td style="padding-left: 2px;">{{ index }}</td>

                  <template v-for="(stage) in discipline" >
                    <!-- eslint-disable-next-line vue/require-v-for-key -->
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        @input="filterNonNumeric"
                        :value="!stage.workload ? '***' : stage.workload"
                        :disabled="!stage.workload ? true : false"
                      />
                    </td>

                    <!-- eslint-disable-next-line vue/require-v-for-key -->
                    <td>
                      <TheMask
                        type="text"
                        class="form-control"
                        :value="!stage.workload ? '***' : getGradeByInput(stage.stage_id, stage.discipline_id, teamId)"
                        :name="'grade[' + item.id + '][' + stage.stage_id + '][' + stage.discipline_id + '][' + teamId + ']'"
                        :mask="['#.#', '##.#']"
                        :disabled="!stage.workload ? true : false"
                        :masked="true"
                        :placeholder="!stage.workload ? '***' : '0.0'"
                      />
                    </td>

                  </template>

                </tr>
              </tbody>
            </table>

            <div class="form-group text-center my-2">
              <button type="submit" class="btn btn-success btn-sm" id="btnSaveGrades">SALVAR NOTAS NO HISTÓRICO</button>
            </div>
            <button class="btn btn-sm text-uppercase btn-secondary" @click="$router.go(-1)" id="btnBack">
                VOLTAR
              </button>
          </form>

          <div class="historyFooter text-center">
            <p>
              <b> {{ concatenateWithCommaAnd(rangeStage) }} Etapa(s)</b>
            </p>
            <p>CARGA HORÁRIA TOTAL: {{ totalWorkload }} HORAS AULAS</p>
            <p>Observação: A média de aprovação por disciplina é {{ this.media }}</p>
            <p>
              {{ city }} - {{ uf }}, {{ day }} de {{ month }} de {{ year }}.
            </p>
          </div>
        </div>
        <!-- ./ pdfContent -->
        <div class="form-group text-center my-2">
          <button @click="makePDF" class="btn btn-success btn-sm">GERAR DOCUMENTO EM PDF</button>
        </div>
      </div>

      <div v-else>

        <button v-if="blobPDF" class="btn btn-sm btn-danger my-2" @click="destroyPDF">APAGAR HISTÓRICO</button>

        <iframe :src="blobPDF" 
        width="100%" 
        height="680" 
        style="border: none;"
        >
        </iframe>
        
      </div>

    </transition>

  </section>
</template>

<script>
import api from "@/services";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LoadingPage from "@/components/LoadingPage.vue";
import { filterNonNumeric, generateHash, cpfWithMask, slug } from "@/helpers";
import StatesMixin from "@/mixins/StatesMixin";

export default {
  mixins: [StatesMixin],
  name: "HistoryRegister",
  props: ["student"],
  components: {
    LoadingPage,
  },
  data() {
    return {
      grades: [],
      filterNonNumeric,
      generateHash,
      cpfWithMask,
      slug,
      folder:'history',
      teamId: null,
      teamName: "",
      blobPDF: null,
      item: null,
      attachments: [],
      typeDocument:'HISTORIC',
      city: '',
      day: new Date().getDate(),
      month: "",
      year: new Date().getFullYear(),
      media: 0,
      uf: "PA",
      teams: [],
      registrations: [],
      gridTemplate: {},
      courseName: '',
      totalStage: 0,
      totalWorkload: 0,
      stagesNumbers: 0,
      author: '',
      code: '',
      registration: '',
    };
  },
  filters: {
    uppercase(value) {
      if (!value) return "";
      return value.toString().toUpperCase();
    },
  },
  computed: {
    isObjectEmpty() {
      return Object.keys(this.gridTemplate).length != 0;
    },
    rangeStage() {
      return this.stagesNumbers;
    },
    newNameFile() {
      return `${this.registration}_${this.item.cpf}_${this.slug(this.teamName).toUpperCase()}`;
    },
    fileFound(){
      const generatedFiles = this.attachments.filter(e => e.file_name.includes(`${this.item.cpf}_${this.slug(this.teamName).toUpperCase()}`));
      return generatedFiles.length ? generatedFiles[0].file_name : '';
    },
    fileName(){
      const document = this.attachments;

      if(!document.length) 
        return `${this.registration}_${this.item.cpf}_${this.slug(this.teamName).toUpperCase()}_${this.typeDocument}.pdf`

      const partials = document[0].path.split('/');
      const fullNameFile = partials[partials.length - 1];
      return `${fullNameFile}`;
    }
  },
  methods: {
     getGradeByInput(stageId, disciplineId, teamId){

      if(!this.grades.length)
        return;

      const gradeFiltered = this.grades.filter((grade) => grade.stage_id == stageId && grade.discipline_id == disciplineId && grade.team_id == teamId);
      return gradeFiltered.length ? gradeFiltered[0].grade : '0.0';

    },
    async getGradeByStudent(){
      const record = await api.get(`/grades/${this.student}/get-grade-by-student?`, { responseType: 'json' });
      this.grades = record.data;
    },
    async saveGrades() {

      const formData = new FormData(this.$refs.formHistoric);

      try {
        const result = await api.post(`/grades`, formData);
        Toast.fire("Mensagem", result.data.message, "success");
      } catch (error) {
        Toast.fire("Error", error.response.data.message, "error");
      }

    },
    async destroyPDF(){
      api.get(`/documents/${this.folder}/${this.fileFound}/remove`)
      .then(response => {
        this.blobPDF = null;
        document.querySelector('select').value = "";
        Toast.fire(response.data.message, "", "success");
      })
      .catch((error) => {
        Toast.fire(error.response.data.message,"", "error");
      });
    },
    async storeDocumentPDF(blob) {
      const formData = new FormData();

      formData.append("pdf", blob);
      formData.append("code", this.code);
      formData.append("team", this.teamName);
      formData.append("type", this.typeDocument);
      formData.append("folder", this.folder);
      formData.append("document_name", this.typeDocument);
      formData.append("registration", this.registration);

      try {
        await api.post(`/documents/${this.item.id}/store-document`, formData);
      } catch (error) {
        Toast.fire("Erro", error, "error");
      }
    },
    makePDF() {
      if (!this.city || !this.uf || !this.day || !this.month || !this.year) {

        Toast.fire("Erro", "Por favor, preencha todos os campos.", "error");

        return window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

      window.html2canvas = html2canvas;

      const doc = new jsPDF("p", "pt", "a4");

      doc.setProperties({
        title: `Histórico Escolar de ${this.item.name} | ${this.teamName}`,
        author: this.author,
        creator: this.author,
      });

      const table = document.querySelector("table");
      const target = document.querySelector(".pdfContent");

      target.querySelector('#btnSaveGrades').remove();
      target.querySelector('#btnBack').remove();

      target.classList.add("active");
      table.classList.add("pdfPrint");
      table.classList.remove("table");
      table.classList.remove("table-bordered");

      doc.html(target, {
        callback: (pdf) => { 
          pdf.save(this.newNameFile);

          //Saved storage api
          const blob = pdf.output("blob");
          this.storeDocumentPDF(blob);

          table.classList.remove("pdfPrint");
          table.classList.add("table");
          table.classList.add("table-bordered");
          target.classList.remove("active");
        },
        x: 32,
        y: 160,
      });

      this.$router.push({ name: "student-edit", params: { id: this.item.id }});
    },
    async getItem() {
      await api.get(`/students/${this.student}`).then((res) => {
        this.attachments = res.data[0].documents.filter(e => e.type == this.typeDocument)
        this.item = res.data[0];
        this.teams = this.item.teams;
        this.registrations = this.item.registrations;
      });
    },
    async hasDocument(filename){

      this.blobPDF = null; 

      let bool = true;
      await api.get(`/documents/storage/${this.folder}/${filename}`, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        this.blobPDF = URL.createObjectURL(blob);
      })
      .catch(() => bool = false);
      return bool;
    },
    async getFullGrid(ev) {

      this.gridTemplate = {};

      const { target, currentTarget } = ev;

      const selectedIndex = target.options.selectedIndex;

      this.registration = target.options[selectedIndex].dataset.matricula;
      this.teamName = target.options[selectedIndex].text;
      this.teamId = currentTarget.value;

      const isShowHistoryPDF = await this.hasDocument(this.fileFound);
      
      if(isShowHistoryPDF)
       return;
      else
        await this.getGridTemplate(this.teamId);
    },
    async getGridTemplate(team) {
      await api.get(`/grids/${team}/get-full-grid`).then((res) => {

        if (res.data.hasOwnProperty("list")) {

          const { list, course_name, total_stage, total_workload, stagesNumbers } = res.data;

          this.gridTemplate = list;
          this.courseName = course_name;
          this.totalStage = total_stage;
          this.totalWorkload = total_workload;
          this.stagesNumbers = stagesNumbers;
        } else {
          this.gridTemplate = {};
        }
      });
    },
    concatenateWithCommaAnd(arr) {
      if (arr.length === 0) {
        return "";
      } else if (arr.length === 1) {
        return arr[0];
      } else {
        const lastItem = arr[arr.length - 1];
        const otherItems = arr.slice(0, arr.length - 1).join("ª, ");
        return `${otherItems}ª e ${lastItem}ª`;
      }
    },
  },
  mounted() {
    this.getItem();
    this.code = this.generateHash('HIST_');
    this.getGradeByStudent();
    
    const dataClient = JSON.parse(localStorage.getItem('data_client') || '{}');
    const { school_name, average_grade, city } = dataClient;

    this.author = school_name || this.author
    this.media = average_grade || this.media
    this.city = city || this.city
  },
};
</script>

<style scoped>

[readonly] {
  background-color: #eee;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

/** Custom print PDF */
.pdfContent.active {
  max-width: 534px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 8.5px;
}
.pdfContent.active input {
	border: none;
	background: none;
	padding: 0;
	margin: 0;
	outline: none;
  text-align: center;
}

.code{
	position: absolute;
	top: 0;
	right: 0;
}
.historyHeader{
  position: relative;
}
.pdfContent.active .historyHeader {
  border: 1px solid #000;
  padding: 4px;
  margin-bottom: 6px;
  font-size: 10px;
}
.pdfContent.active .historyFooter {
  text-align: center;
}
.pdfPrint thead {
	border-left: 1px solid #000;
	border-top: 1px solid #000;
	border-bottom: 1px solid #000;
}
.pdfPrint thead tr:nth-child(2) th {
  border-top: 1px solid #000;
}
.pdfPrint th,
.pdfPrint td {
  border-right: 1px solid #000;
  border-collapse: collapse; 
}
.pdfPrint tbody tr:nth-child(even) {
  border: 1px solid #000;
}
.pdfPrint tbody tr > td:first-child {
  border-left: 1px solid #000;
}
.pdfPrint input {
  border: none;
  font-size: 0.65rem;
  text-align: center;
  height: 18px;
}

</style>