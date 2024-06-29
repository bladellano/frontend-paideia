<template>
  <section class="container-fluid">

    <div class="content">

      <div class="mt-4" style="width: 180px;">

        <!-- //* Super menu! -->
        <MenuAccordion>
          <MenuAccordionItem v-for="(menuItem, index) in menuItems" :key="index" :text="menuItem.text">
            <MenuAccordionChild v-for="(child, childIndex) in menuItem.children" :key="childIndex"
              :action="child.action" :path="child.path" />
          </MenuAccordionItem>
        </MenuAccordion>

      </div>

      <transition mode="out-in">
        <router-view></router-view>
      </transition>

    </div>

  </section>
</template>

<script>

import MenuAccordion from '@/components/admin/menu/MenuAccordion.vue';
import MenuAccordionItem from '@/components/admin/menu/MenuAccordionItem.vue';
import MenuAccordionChild from '@/components/admin/menu/MenuAccordionChild.vue';

export default {
  name: "Admin",
  components: { MenuAccordion, MenuAccordionItem, MenuAccordionChild },
  data() {
    return {
      menuItems: [
        {
          text: "Ensinos",
          children: [
            { action: "Listar", path: { name: 'teachings' } },
            { action: "Registrar", path: { name: 'teaching-register' } }
          ]
        },
        {
          text: "Documentos",
          children: [
            { action: "Templates", path: { name: 'documents' } }
          ]
        },
        {
          text: "Cursos",
          children: [
            { action: "Listar", path: { name: 'courses' } },
            { action: "Registrar", path: { name: 'course-register' } }
          ]
        },
        {
          text: "Disciplinas",
          children: [
            { action: "Listar", path: { name: 'disciplines' } },
            { action: "Registrar", path: { name: 'discipline-register' } }
          ]
        },
        {
          text: "Polos",
          children: [
            { action: "Listar", path: { name: 'polos' } },
            { action: "Registrar", path: { name: 'polo-register' } }
          ]
        },
        {
          text: "Etapas",
          children: [
            { action: "Listar", path: { name: 'stages' } },
            { action: "Registrar", path: { name: 'stage-register' } }
          ]
        },
        {
          text: "Grades",
          children: [
            { action: "Listar", path: { name: 'grids' } },
            { action: "Registrar", path: { name: 'grid-register' } },
            { action: "Registrar Template", path: { name: 'grid-template-register' } }
          ]
        },
        {
          text: "Turmas",
          children: [
            { action: "Listar", path: { name: 'teams' } },
            { action: "Registrar", path: { name: 'team-register' } }
          ]
        },
        {
          text: "Alunos",
          children: [
            { action: "Listar", path: { name: 'students' } },
            { action: "Registrar", path: { name: 'student-register' } }
          ]
        },
        {
          text: "Usuários",
          children: [
            { action: "Listar", path: { name: 'users' } },
            { action: "Registrar", path: { name: 'user-register' } }
          ]
        },
        {
          text: "Relatórios",
          children: [
            { action: "Geral", path: { name: 'general-report-of-students' } },
            { action: "Diário de Classe", path: { name: 'diario-de-classe' } },
            { action: "Relatório Financeiro Por Turma", path: { name: 'relatorio-financeiro-por-turma' } },
            { action: "Alunos Por Turma", path: { name: 'alunos-por-turma' } }
          ]
        }
      ]
    }
  }
}

</script>

<style scoped>
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