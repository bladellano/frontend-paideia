<template>
  <section class="container my-4">
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
            <label for="name">Turma</label>
            <select id="team" class="form-control" @change="getFullGrid">
              <option disabled value="" selected>-- Selecione --</option>
              <option v-for="team in teams" :key="team.id" :value="team.id">
                {{ team.name }}
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

          <div class="form-group col-md-2">
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

          <div class="form-group col-md-2">
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
            <p>DATA DE NASCIMENTO: {{ item.birth_date }}</p>
            <p>CPF: {{ item.cpf }}</p>
            <span class="code" title="Código de segurança para validação do documento. A cada atualização da página esse valor altera.">{{ code }}</span>
          </div>

          <p class="text-center">
            <b>{{ courseName | uppercase }}</b>
          </p>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
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
                  <th style="text-align: center" > C/H TOTAL </th>

                  <!-- eslint-disable-next-line vue/require-v-for-key -->
                  <th style="text-align: center" > ETAPA {{ stage }} </th>

                </template>
              
              </tr>
            </thead>
            <tbody>
              <tr v-for="(discipline, index) in gridTemplate" :key="index">
                <td>{{ index }}</td>

                <template v-for="(stage) in discipline" >

                  <!-- eslint-disable-next-line vue/require-v-for-key -->
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      @input="filterNonNumeric"
                      :value="stage.workload"
                      :disabled="!stage.workload ? true : false"
                    />
                  </td>

                  <!-- eslint-disable-next-line vue/require-v-for-key -->
                  <td>
                    <TheMask
                      type="text"
                      class="form-control"
                      :mask="['#.##', '##.##']"
                      :disabled="!stage.workload ? true : false"
                      :masked="true"
                      placeholder="0.0"
                    />
                  </td>

                </template>

              </tr>
            </tbody>
          </table>

          <div class="historyFooter text-center">
            <p>
              <b> {{ concatenateWithCommaAnd(rangeStage) }} Etapa(s)</b>
            </p>
            <p>CARGA HORÁRIA TOTAL: {{ totalWorkload }} HORAS AULAS</p>
            <p>Observação: A média de aprovação por disciplina é 6,0 (seis)</p>
            <p>
              {{ city }} - {{ uf }}, {{ day }} de {{ month }} de {{ year }}.
            </p>
          </div>
        </div>
        <!-- ./ pdfContent -->
        <div class="form-group text-center my-2">
          <button @click="makePDF" class="btn btn-success">Gerar PDF</button>
        </div>
      </div>

      <div v-else>

        <button v-if="blobPDF" class="btn btn-sm btn-danger my-2" @click="destroyPDF">Apagar Histórico</button>

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
import { filterNonNumeric, generateHash } from "@/helpers";
import StatesMixin from "@/mixins/StatesMixin";
import backgroundImgBack from "@/assets/bg-history.jpg";
import backgroundImgBackLastPage from "@/assets/bg-history-last-page.jpg";

export default {
  mixins: [StatesMixin],
  name: "HistoryRegister",
  props: ["student"],
  components: {
    LoadingPage,
  },
  data() {
    return {
      filterNonNumeric,
      generateHash,
      folder:'history',
      teamId: null,
      blobPDF: null,
      item: null,
      city: "Belém",
      day: new Date().getDate(),
      month: null,
      year: new Date().getFullYear(),
      uf: "PA",
      teams: [],
      gridTemplate: {},
      courseName: "",
      totalStage: 0,
      totalWorkload: 0,
      stagesNumbers: 0,
      author: "Paideia Educacional",
      code:'',
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
    fileName(){
      return `${this.item.cpf}_historico.pdf`;
    }
  },
  methods: {
    async destroyPDF(){
      api.get(`/documents/${this.folder}/${this.fileName}/remove`)
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
      formData.append("type", "HISTORIC");
      formData.append("folder", this.folder);
      formData.append("document_name", "historico");

      try {
        await api.post(`/documents/${this.item.id}/store-document`, formData);
      } catch (error) {
        Toast.fire(error,"", "error");
      }
    },
    makePDF() {
      if (!this.city || !this.uf || !this.day || !this.month || !this.year) {

        Toast.fire("Por favor, preencha todos os campos.", "", "error");

        return window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

      window.html2canvas = html2canvas;

      const doc = new jsPDF("p", "pt", "a4");

      doc.setProperties({
        title: `Histórico Escolar de ${this.item.name}`,
        author: this.author,
        creator: this.author,
      });

      const table = document.querySelector("table");
      const target = document.querySelector(".pdfContent");

      target.classList.add("active");
      table.classList.add("pdfPrint");
      table.classList.remove("table");

      doc.addImage(
        backgroundImgBack,
        "JPG",
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );

      doc.html(target, {
        callback: (pdf) => { 
          pdf.save(this.fileName);

          //Saved storage api
          const blob = pdf.output("blob");
          this.storeDocumentPDF(blob);

          table.classList.remove("pdfPrint");
          table.classList.add("table");
          target.classList.remove("active");
        },
        x: 10,
        y: 10,
      });

      //Segunda página
      doc.addPage();

      doc.addImage(
        backgroundImgBackLastPage,
        "JPG",
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );

      this.$router.push({ name: "students" });
    },
    async getItem() {
      await api.get(`/students/${this.student}`).then((res) => {
        this.item = res.data[0];
        this.teams = this.item.teams;
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

      this.teamId = ev.currentTarget.value;
      const isShowHistoryPDF = await this.hasDocument(this.fileName);
      
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
  max-width: 578px;
  font-family: Courier;
  font-size: 12px;
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
}
.pdfContent.active .historyFooter {
  text-align: center;
}

.pdfPrint th,
.pdfPrint td {
  border: 1px solid #000;
  border-collapse: collapse;
}
.pdfPrint tr {
  border: none;
}
.pdfPrint input {
  border: none;
  background: transparent;
  font-size: 12px;
}
</style>