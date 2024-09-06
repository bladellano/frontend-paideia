<template>
  <v-container fluid>
    <!-- Título Geral do Dashboard -->
    <div class="row">
      <div class="col-md-12">
        <h4>Dashboard de Gestão Escolar</h4>
        <p>
          Bem-vindo ao Dashboard de Gestão Escolar, sua central de controle para
          gerenciar todas as operações do sistema escolar de forma eficiente e
          intuitiva. Este painel foi projetado para facilitar o monitoramento e
          a administração dos vários aspectos da instituição, incluindo alunos,
          notas, finanças e geração de documentos.
        </p>
      </div>
    </div>

    <h4>Indicadores</h4>

    <div class="row">
      <div class="col-md-12">
        <h5 class="my-2 text-decoration-underline">
          Matrículas efetivadas por mês
        </h5>
        <!-- Chart experimental -->
        <div class="app--chart" ref="chart">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- Linhas e Colunas para os Cards -->
    <h5 class="my-2 text-decoration-underline">Relatórios</h5>
    <v-row>
      <v-col v-for="(link, index) in links" :key="index" cols="12" md="3">
        <!-- Router-link é usado para navegação -->
        <router-link :to="link.path" class="no-decoration">
          <v-card
            :color="getRandomColor()"
            dark
            class="d-flex flex-column align-center justify-center"
            height="150"
          >
            <v-card-title class="d-flex flex-column align-center text-center">
              <v-icon large class="mb-2">{{ getIcon(link.action) }}</v-icon>
              <span>{{ link.action }}</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    Bar,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Registros por Mês",
            backgroundColor: "#42A5F5",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      links: [
        { action: "Geral", path: { name: "general-report-of-students" } },
        { action: "Diário de classe", path: { name: "diario-de-classe" } },
        {
          action: "Relatório financeiro por turma",
          path: { name: "relatorio-financeiro-por-turma" },
        },
        { action: "Alunos por turma", path: { name: "alunos-por-turma" } },
        {
          action: "Dados completos dos alunos por turma",
          path: { name: "alunos-dados-completo-por-turma" },
        },
        {
          action: "Atestado de conclusão de curso",
          path: { name: "atestado-de-conclusao-de-curso" },
        },
        {
          action: "Declaração de matrícula",
          path: { name: "declaracao-de-matricula" },
        },
        { action: "Boletim do aluno", path: { name: "boletim-do-aluno" } },
        {
          action: "Relatório de repasse",
          path: { name: "relatorio-de-repasse" },
        },
        {
          action: "Relatório de desempenho anual",
          path: { name: "relatorio-de-desempenho-anual" },
        },
        {
          action: "Relatório de inadimplentes",
          path: { name: "inadimplentes" },
        },
      ],
    };
  },
  methods: {
    async fetchRegistrationData() {
      try {
        const response = await api.get(
          "/indicators/number-registrations-per-month"
        );

        const registrations = response.data;

        this.chartData = {
          labels: registrations.map((item) => item.month),
          datasets: [
            {
              label: "Registros por Mês",
              backgroundColor: "#42A5F5",
              data: registrations.map((item) => item.total_registrations),
            },
          ],
        };
      } catch (error) {
        console.error("Erro ao buscar dados de registros:", error);
      }
    },
    getRandomColor() {
      const colors = [
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "cyan",
        "teal",
        "pink",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getIcon(action) {
      const icons = {
        Geral: "mdi-view-dashboard",
        "Diário de classe": "mdi-book-open-page-variant",
        "Relatório financeiro por turma": "mdi-currency-usd",
        "Alunos por turma": "mdi-account-multiple",
        "Dados completos dos alunos por turma": "mdi-account-details",
        "Atestado de conclusão de curso": "mdi-certificate",
        "Declaração de matrícula": "mdi-file-document",
        "Boletim do aluno": "mdi-file-chart",
        "Relatório de repasse": "mdi-clipboard-text",
        "Relatório de desempenho anual": "mdi-chart-line",
        "Relatório de inadimplentes": "mdi-alert-circle",
      };
      return icons[action] || "mdi-file";
    },
  },
  mounted() {
    this.fetchRegistrationData();
  },
};
</script>

<style scoped>
.no-decoration {
  text-decoration: none;
}
.app--chart {
  height: 300px;
  width: 98%;
}
</style>
