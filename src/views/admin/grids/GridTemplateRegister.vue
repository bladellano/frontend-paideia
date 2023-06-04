<template>
  <section class="container my-4">
    <h4 class="my-4">Cadastro de <strong>Grade Template</strong></h4>

    <form @submit.prevent="handlerSubmit">

      <div v-for="(input, index) in item" :key="index">
        <div class="row my-2">
          <div class="col-md-2">
            <!-- Grids -->
            <label for="">Grade</label>
            <select
              @change="setGridIdDefault"
              v-model="input.grid_id"
              name="grid_id"
              id="grid_id"
              class="form-control"
            >
              <option disabled value="" selected>-- Selecione --</option>
              <option
                v-for="(opt, index) in grids"
                :key="index"
                :value="opt.id"
              >
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <!-- Disciplines -->
            <label for="">Disciplina</label>
            <select
              v-model="input.discipline_id"
              name="discipline_id"
              id="discipline_id"
              class="form-control"
            >
              <option disabled value="" selected>-- Selecione --</option>
              <option
                v-for="(opt, index) in disciplines"
                :key="index"
                :value="opt.id"
              >
                {{ opt.name }}
              </option>
            </select>
          </div>
          <div class="col-md-1">
            <!-- Workload -->
            <label for="">CH</label>
            <input
              @keyup="filterNonNumeric"   
              placeholder="CH"
              class="form-control"
              type="text"
              v-model="input.workload"
            />
          </div>
          <div class="col-md-2">
            <!-- Stage -->
            <label for="">Etapa</label>
            <select
              v-model="input.stage_id"
              name="stage_id"
              id="stage_id"
              class="form-control"
            >
              <option disabled value="" selected>-- Selecione --</option>
              <option
                v-for="(opt, index) in stages"
                :key="index"
                :value="opt.id"
              >
                {{ opt.stage }}
              </option>
            </select>
          </div>
          <div class="col-md-2">
            <!-- Course -->
            <label for="">Curso</label>
            <select
              v-model="input.course_id"
              name="course_id"
              id="course_id"
              class="form-control"
            >
              <option disabled value="" selected>-- Selecione --</option>
              <option
                v-for="(opt, index) in courses"
                :key="index"
                :value="opt.id"
              >
                {{ opt.name }}
              </option>
            </select>
          </div>

          <div class="col-md-2">
            <br/>
            <a class="btn btn-sm btn-danger" @click.prevent="removeField(index)">
              <font-awesome-icon icon="trash" />
            </a>
          </div>
        </div>
      </div>

      <a class="btn btn-sm btn-success mt-2" @click.prevent="addField"
        ><font-awesome-icon icon="add" /></a
      >

      <div class="form-group text-center my-2">
        <button type="submit" class="btn btn-success btn-sm mx-2">
          Salvar
        </button>
        <button type="reset" class="btn btn-secondary btn-sm">Limpar</button>
      </div>
    </form>

    <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
      Voltar
    </button>
  </section>
</template>
  
<script>
import api from "@/services";
import { filterNonNumeric, errorsToString } from "@/helpers";

export default {
  name:"GridTemplateRegister",
  data() {
    return {
      filterNonNumeric,
      gridId: null,
      item: [
        {
          grid_id: "",
          discipline_id: "",
          workload: "",
          stage_id: "",
          course_id: "",
        },
      ],
      disciplines: [],
      grids: [],
      stages: [],
      courses: [],
    };
  },
  methods: {
    setGridIdDefault(ev){
      this.gridId = ev.target.value;
    },
    async handlerSubmit() {
      
      const form = Object.assign({}, this.item);

      try {
        const { data } = await api.post(`/grid-templates`, form);
        // eslint-disable-next-line no-undef
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "grids" });
      } catch (error) {
        // eslint-disable-next-line no-undef
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
    addField() {
      this.item.push({
        grid_id: this.gridId || null,
        discipline_id: "",
        workload: "",
        stage_id: "",
        course_id: "",
      });
    },
    removeField(index) {
      if (this.item.length == 1) return;
      this.item.splice(index, 1);
    },
    async getGrids() {
      await api.get(`/grids?page=0&perPage=99999`).then((res) => {
        this.grids = res.data.data;
      });
    },
    async getDisciplines() {
      await api.get(`/disciplines?page=0&perPage=99999`).then((res) => {
        this.disciplines = res.data.data;
      });
    },
    async getStages() {
      await api.get(`/stages?page=0&perPage=99999`).then((res) => {
        this.stages = res.data.data;
      });
    },
    async getCourses() {
      await api.get(`/courses?page=0&perPage=99999`).then((res) => {
        this.courses = res.data.data;
      });
    },
  },
  mounted() {
    this.getGrids();
    this.getDisciplines();
    this.getStages();
    this.getCourses();
  },
};
</script>
  