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
            <input type="text" name="city" v-model="city" class="form-control"/>
          </div>

          <div class="form-group col-md-2">
            <label for="name">Estado</label>
            <input type="text" name="uf" v-model="uf" class="form-control" />
          </div>

          <div class="form-group col-md-1">
            <label for="name">Dia</label>
            <input type="text" maxlength="2" name="uf" v-model="day" @keyup="filterNonNumeric" class="form-control" />
          </div>

          <div class="form-group col-md-2">
            <label for="name">Mês</label>
            <input type="text" name="uf" v-model="month" class="form-control" />
          </div>

          <div class="form-group col-md-2">
            <label for="name">Ano</label>
            <input type="text" maxlength="4" name="uf" v-model="year" @keyup="filterNonNumeric" class="form-control" />
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
            <p>{{ city }} - {{ uf }}, {{ day }} de {{ month }} de {{ year }}.</p>
          </div>
        </div>
        <!-- ./ pdfContent -->
        <div class="form-group text-center my-2">
          <button @click="makePDF" class="btn btn-success">Gerar PDF</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import api from "@/services";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LoadingPage from "@/components/LoadingPage.vue";
import { filterNonNumeric } from "@/helpers";

export default {
  name: "HistoryRegister",
  props: ["student"],
  components: {
    LoadingPage,
  },
  data() {
    return {
      filterNonNumeric,
      item: null,
      city: null,
      day: null,
      month: null,
      year: '2023',
      uf: 'PA',
      teams: [],
      gridTemplate: {},
      gridName: "",
      courseName: "",
      totalStage: 0,
      totalWorkload: 0,
      author:'Paideia Educacional'
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
          pdf.save(`${this.item.cpf}_historico_escolar.pdf`);
          table.classList.remove("pdfPrint");
          table.classList.add("table");
          target.classList.remove("active");
        },
        x: 10,
        y: 10,
      });
    },
    async getItem() {
      await api.get(`/students/${this.student}`).then((res) => {
        this.item = res.data[0];
        this.teams = this.item.teams;
      });
    },
    async listGrid(ev) {
      await this.getGridTemplate(ev.currentTarget.value);
    },
    async getGridTemplate(team) {
      await api.get(`/teams/${team}/list-grid`).then((res) => {
        if (res.data.hasOwnProperty("list")) {

          const { list, grid_name, course_name, total_stage, total_workload } = res.data;

          this.gridTemplate = list;
          this.gridName = grid_name;
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