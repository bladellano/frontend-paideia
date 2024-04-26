<template>
  <section class="container-fluid">

    <div class="content">

      <div class="mt-4" style="width: 180px;">

        <div href="/" class="d-flex align-items-center pb-1 pt-1 mb-3 text-decoration-none border-bottom">
          <h5>Menu</h5>
        </div>

        <div class="accordion" id="accordion">
          
          <!-- ENSINOS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Ensinos
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/ensinos">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/ensinos/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- DOCUMENTOS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#text-documents" aria-expanded="false" aria-controls="text-documents">
                Documentos
              </button>
            </h2>
            <div id="text-documents" class="accordion-collapse collapse" aria-labelledby="headingTwo"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link 
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/ensinos/documentos">Templates</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- CURSOS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
              data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Cursos
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/cursos">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/cursos/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- DISCIPLINAS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Disciplinas
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/disciplinas">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/disciplinas/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- POLOS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Polos
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/polos">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/polos/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- ETAPAS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Etapas
              </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/etapas">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/etapas/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- GRADES -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseEigth" aria-expanded="false" aria-controls="collapseEigth">
                Grades
              </button>
            </h2>
            <div id="collapseEigth" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/grades">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/grades/registrar">Registrar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/grades/registrar-template">Registrar Template</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- TURMAS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                Turmas
              </button>
            </h2>
            <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/turmas">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/turmas/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- ALUNOS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                Alunos
              </button>
            </h2>
            <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/alunos">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/alunos/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- USUARIOS -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseUsers" aria-expanded="false" aria-controls="collapseUsers">
                Usuários
              </button>
            </h2>
            <div id="collapseUsers" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/usuarios">Listar</router-link>
                  </li>
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/usuarios/registrar">Registrar</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- RELATORIO -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                Relatório
              </button>
            </h2>
            <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/reports/general-report-of-students">Geral</router-link>
                  </li>

                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/reports/diario-de-classe">Diário de Classe</router-link>
                  </li>

                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/reports/lista-simples-por-turma">Lista Simples Por Turma</router-link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      <transition mode="out-in">
        <router-view></router-view>
      </transition>

    </div>

  </section>
</template>
  
<script>

export default {
  name: "Admin",
};
</script>
  
<style scoped>
.accordion-button {
  background-color: var(--color-primary) !important;
  border: none;
  color: #fff !important;
  width: 100%;
}

.accordion-button:hover {
  background-color: var(--color-background-hover-nav) !important;
  color: var(--color-background-nav) !important;
}

.accordion-button::after {
  filter: brightness(100);
}

.accordion-body ul li a {
  width: 100%;
  text-align: left;
}

.content {
  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-gap: 30px;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  .content {
    grid-template-columns: 1fr;
    margin: 00px auto;
  }
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(-20px, 0, 0);
}

.v-leave-to {
  transform: translate3d(20px, 0, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>