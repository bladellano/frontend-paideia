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
            <select id="team" class="form-control" @change="listGrid">
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
            <span class="code">{{ code }}</span>
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
                <th :colspan="totalStage" style="text-align: center">
                  RESULTADO FINAL
                </th>
              </tr>
              <tr>
                <th
                  style="text-align: center"
                  v-for="(stage, index) in rangeStage"
                  :key="index"
                >
                  C/H TOTAL | ETAPA {{ stage }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(discipline, index) in gridTemplate" :key="index">
                <td>{{ index }}</td>
                <td v-for="(stage, key) in discipline" :key="key">
                  <div class="row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        @input="filterNonNumeric"
                        :value="stage.workload"
                        :disabled="!stage.workload ? true : false"
                      />
                    </div>
                    <div class="col-md-6">
                      <TheMask
                        name="score[]"
                        type="text"
                        placeholder="0,0"
                        value="0,0"
                        class="form-control"
                        :mask="['#,##', '##,##']"
                        :disabled="!stage.workload ? true : false"
                        :masked="true"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="historyFooter text-center">
            <p>
              <b> {{ concatenateWithCommaAnd(rangeStage) }} Etapa(s)</b>
            </p>
            <p>CARTA HORÁRIA TOTAL: {{ totalWorkload }} HORAS AULAS</p>
            <p>Observação: A média de aprovação por disciplina é 6,0 (sete)</p>
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

        <button v-if="blobPDF" class="btn btn-sm btn-danger my-2" @click="removeHistoryFilePDF">Apagar Histórico</button>

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
      let ar = [];
      for (let i = 1; i <= this.totalStage; i++) {
        ar.push(i);
      }
      return ar;
    },
  },
  methods: {
    async removeHistoryFilePDF(){
      const filename = `${this.item.cpf}_historico.pdf`;
      api.get(`/historys/${filename}/remove`)
      .then(response => {
        this.blobPDF = null;
        document.querySelector('select').value = "";
        // eslint-disable-next-line no-undef
        Toast.fire(response.data.message, "", "success");
      })
      .catch((error) => {
        // eslint-disable-next-line no-undef
        Toast.fire(error.response.data.message,"", "error");
      });
    },
    async storeHistoryPDF(blob) {
      const formData = new FormData();
      formData.append("pdf", blob);
      formData.append("code", this.code);
      try {
        await api.post(`/historys/${this.item.id}/store-history-pdf`, formData);
      } catch (error) {
        console.log('> Error', error); 
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
        title: `Histórico Escola de ${this.item.name}`,
        author: this.author,
        creator: this.author,
      });

      const table = document.querySelector("table");
      const target = document.querySelector(".pdfContent");

      target.classList.add("active");
      table.classList.add("pdfPrint");
      table.classList.remove("table");

      doc.html(target, {
        callback: (pdf) => {
          pdf.save(`${this.item.cpf}_historico.pdf`);

          //Saved storage api
          const blob = pdf.output("blob");
          this.storeHistoryPDF(blob);

          table.classList.remove("pdfPrint");
          table.classList.add("table");
          target.classList.remove("active");
        },
        x: 10,
        y: 10,
      });

      this.$router.push({ name: "students" });
    },
    async getItem() {
      await api.get(`/students/${this.student}`).then((res) => {
        this.item = res.data[0];
        this.teams = this.item.teams;
      });
    },
    async hasHistory(filename){

      this.blobPDF = null; 

      let bool = true;
      await api.get(`/historys/storage/${filename}`, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        this.blobPDF = URL.createObjectURL(blob);
      })
      .catch(() => bool = false);
      return bool;
    },
    async listGrid(ev) {

      this.teamId = ev.currentTarget.value;
      const isShowHistoryPDF = await this.hasHistory(`${this.item.cpf}_historico.pdf`);
      
      if(isShowHistoryPDF)
       return;
      else
        await this.getGridTemplate(this.teamId);
    },
    async getGridTemplate(team) {
      await api.get(`/grids/${team}/list-grid`).then((res) => {

        // eslint-disable-next-line no-prototype-builtins
        if (res.data.hasOwnProperty("list")) {

          const { list, course_name, total_stage, total_workload } = res.data;

          this.gridTemplate = list;
          this.courseName = course_name;
          this.totalStage = total_stage;
          this.totalWorkload = total_workload;
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
    this.code = this.generateHash();
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