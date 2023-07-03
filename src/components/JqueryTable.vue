<template>
  <div>

    <h4 class="my-4">Relatório</h4>

    <div v-if="itens">
      <table class="table" id="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Aluno</th>
            <th>Turma</th>
            <th>Poló</th>
            <th>Responsável</th>
            <th>Grade</th>
          </tr>
        </thead>
      </table>
    </div>
    <LoadingPage v-else />
  </div>
</template>

<script>
// import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  components: {
    LoadingPage,
  },
  data: function () {
    return {
      itens: [],
    };
  },
  mounted() {
    $("#datatable").DataTable({
      dom: 'Bfrtip',
        buttons: [
            'csv'
      ],
      language: {
        sZeroRecords: "Nada encontrado, desculpe",
        sLengthMenu: "Mostrar _MENU_ itens por p&aacute;gina",
        sInfo: "Mostrando de _START_ &aacute; _END_ de _MAX_",
        sInfoEmpty: "Nenhum registro encontrado",
        sInfoFiltered: "(filtrado de _MAX_ registros)",
        infoFiltered: "",
        sSearch: "Pesquisar",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
        },
      },
      processing: true,
      serverSide: true,
      ajax: {
        url:
          process.env.VUE_APP_BASE_URL +
          "/api/reports/general-report-of-students",
        type: "GET",
      },
      columns: [
        { data: "student_id" },
        { data: "name" },
        { data: "team" },
        { data: "polo" },
        { data: "responsible" },
        { data: "grid" },
      ],
    });
  },
};
</script>

<style scoped>
</style>