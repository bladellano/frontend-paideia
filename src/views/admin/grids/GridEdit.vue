<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Editando <strong>Grade</strong></h4>

    <div v-if="grid">
      <form @submit.prevent="handlerSubmit" @reset="reset">
        <div class="row">
          <div class="form-group col-md-6">
            <label for="name">Nome</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="grid.name"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="obs">Observação</label>
            <input
              type="text"
              class="form-control"
              id="obs"
              v-model="grid.obs"
            />
          </div>
        </div>

        <div class="form-group text-center my-2">
          <button type="submit" class="btn btn-success btn-sm mx-2">
            SALVAR GRADE
          </button>
          <button type="reset" class="btn btn-secondary btn-sm">LIMPAR</button>
        </div>
      </form>

      <form @submit.prevent="handlerSubmitTemplate" @reset="resetTemplate">

        <div v-for="(template, index) in gridTemplate" :key="index">

          <div class="row my-2">
            <div class="col-md-4">
              <!-- Grids -->
              <label for="">Grade</label>
              <select
                v-model="template.grid_id"
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
            <div class="col-md-2">
              <!-- Course -->
              <label for="">Curso</label>
              <select
                v-model="template.course_id"
                name="course_id"
                id="course_id"
                class="form-control"
                @change="filterDisciplines"
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
            <div class="col-md-3">
              <!-- Disciplines -->
              <label for="">Disciplina</label>
              <select
                v-model="template.discipline_id"
                name="discipline_id"
                id="discipline_id"
                class="form-control"
                disabled
                @change="setInheritedWorkload"
              >
                <option disabled value="" selected>-- Selecione --</option>
                <option
                  v-for="(opt, index) in disciplines"
                  :key="index"
                  :value="opt.id"
                >
                  {{ opt.name }} ({{ opt.teaching.name }})
                </option>
              </select>
            </div>
            <div class="col-md-1">
              <!-- Workload -->
              <label for="">CH <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Carga Horária"><font-awesome-icon icon="question"/></a></label>
              <input
                @keyup="filterNonNumeric"   
                placeholder="CH"
                class="form-control"
                type="text"
                v-model="template.workload"
              />
            </div>
            <div class="col-md-1">
              <!-- Stage -->
              <label for="">Etapa</label>
              <select
                v-model="template.stage_id"
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
            <div class="col-md-1 text-center">
              <br/>
              <a class="btn btn-sm btn-danger" @click.prevent="removeField(index)">
                <font-awesome-icon icon="trash" />
              </a>
            </div>
          </div>      
          
        </div>

        <a class="btn btn-sm btn-success mt-2" @click.prevent="addField"><font-awesome-icon icon="add" /></a>

        <div class="form-group text-center my-2">
          <button type="submit" class="btn btn-success btn-sm mx-2">
            SALVAR TEMPLATE
          </button>
          <button type="reset" class="btn btn-secondary btn-sm">RESETAR</button>
        </div>
      
      </form>

      <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">
        VOLTAR
      </button>
    </div>

    <LoadingPage v-else />
  </section>
</template>
  
<script>
import api from "@/services";
import { errorsToString, filterNonNumeric } from "@/helpers";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "GridEdit",
  components: {
    LoadingPage,
  },
  props: ["id"],
  data() {
    return {
      filterNonNumeric,
      grid: null,
      gridTemplate: null,
      disciplines: [],
      grids: [],
      stages: [],
      courses: [],
    };
  },
  methods: {
     async setInheritedWorkload(el){

      const { data } = await api.get(`/disciplines/${el.target.value}`);

      const inputSiblingWorkload = el.target.parentElement.nextElementSibling.querySelector('input');

      const position = this.gridTemplate.length;

      this.gridTemplate[(position - 1)].workload = inputSiblingWorkload.value = data[0].workload;

     },
     async filterDisciplines(el){

      this.getDisciplines();

      const { data } = await api.get(`/courses/${el.target.value}`);

      const filtered = this.disciplines.filter(discipline => discipline.teaching_id == data[0].teaching_id);

      const disciplines = document.querySelectorAll('#discipline_id');
      
      if(filtered.length)
        disciplines.forEach((e) => e.removeAttribute('disabled'));
      else
        disciplines.forEach((e) => e.setAttribute('disabled',true));
      
      this.disciplines = filtered;

    },
    async getGrid() {
      await api.get(`/grids/${this.id}`).then((res) => {
        this.grid = res.data[0];
      });
    },
    async handlerSubmitTemplate(){
         
      const formTemplate = Object.assign({}, this.gridTemplate);

      await api.get(`/grids/remove-template-from-grid/${this.$route.params.id}`);

      try {
        const { data } = await api.post(`/grid-templates`, formTemplate);
        Toast.fire(data.message, "", "success");
        this.$router.push({ name: "grids" });
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
    async handlerSubmit() {

      const form = Object.assign({}, this.grid);

      try {
        const { data } = await api.put(`/grids/${this.$route.params.id}`, form);
        this.$router.push({ name: "grids" });
        Toast.fire(data.message, "", "success");
      } catch (error) {
        Toast.fire(errorsToString(error.response.data.errors), "", "error");
      }
    },
    async getGridTemplate(){
      await api.get(`/grids/get-grid-template/${this.id}`).then((res) => {
         this.gridTemplate = res.data.data;
      });
    },
    reset() {
      this.getGrid();
    },
    resetTemplate() {
      this.getGridTemplate();
    },
    addField() {
      this.gridTemplate.push({
        grid_id: this.grid.id,
        discipline_id: "",
        workload: "",
        stage_id: "",
        course_id: "",
      });
    },
    removeField(index) {
      this.gridTemplate.splice(index, 1);
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
    this.getGrid();
    this.getGridTemplate();
    this.getGrids();
    this.getDisciplines();
    this.getStages();
    this.getCourses();
  },
};
</script>
  
<style scoped>
</style>