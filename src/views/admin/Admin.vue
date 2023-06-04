<template>
  <section class="content">
   
          <div class="mt-4" style="width: 150px;">
          <div href="/" class="d-flex align-items-center pb-1 pt-1 mb-3 text-decoration-none border-bottom">
            <h5>Menu</h5>
          </div>

          <ul class="list-unstyled ps-0">

            <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#course-collapse" aria-expanded="false"> Cursos </a>
              <div class="collapse" id="course-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/cursos"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/cursos/registrar"
                      >Registrar</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#teaching-collapse" aria-expanded="false"> Ensinos </a>
              <div class="collapse" id="teaching-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/ensinos"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/ensinos/registrar"
                      >Registrar</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#polo-collapse" aria-expanded="false"> Pólos </a>
              <div class="collapse" id="polo-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/polos"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/polos/registrar"
                      >Registrar</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#discipline-collapse" aria-expanded="false"> Disciplinas </a>
              <div class="collapse" id="discipline-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/disciplinas"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/disciplinas/registrar"
                      >Registrar</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#stage-collapse" aria-expanded="false"> Etapas </a>
              <div class="collapse" id="stage-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/etapas"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/etapas/registrar"
                      >Registrar</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#student-collapse" aria-expanded="false"> Alunos </a>
              <div class="collapse" id="student-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/alunos"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/alunos/registrar"
                      >Registrar</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

             <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#team-collapse" aria-expanded="false"> Turmas </a>
              <div class="collapse" id="team-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/turmas"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/turmas/registrar"
                      >Registrar</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="mb-1">
              <a class="btn btn-success btn-sm" data-bs-toggle="collapse" data-bs-target="#grid-collapse" aria-expanded="false"> Grades </a>
              <div class="collapse" id="grid-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <router-link class="text-decoration-none btn btn-secondary btn-sm mt-2" to="/admin/grades"
                      >Listar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/grades/registrar"
                      >Registrar</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-decoration-none btn btn-secondary btn-sm mt-2"
                      to="/admin/grades/registrar-template"
                      >Registrar Template</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

          </ul>
        </div>

    <transition mode="out-in">
      <router-view></router-view>
    </transition>

  </section>
</template>
  
<script>
export default {
  name: "Admin",
};
</script>
  
<style scoped>
.btn-success{
  background-color: var(--color-background-nav);
  border: none;
  width: 100%;
}
.btn-success:hover{
  background-color: var(--color-background-hover-nav);
  color: var(--color-background-nav);
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