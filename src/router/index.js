import Vue from 'vue'
import VueRouter from 'vue-router'

/** Site */
import Home from '../views/Home.vue'
import PageNotFound from '../views/PageNotFound.vue'

/** Admin */
import Admin from '../views/admin/Admin.vue'
import Login from '../views/Login.vue'

//Course
import CourseList from '../views/admin/courses/CourseList.vue'
import CourseEdit from '../views/admin/courses/CourseEdit.vue'
import CourseRegister from '../views/admin/courses/CourseRegister.vue'

//Teaching
import TeachingList from '../views/admin/teachings/TeachingList.vue'
import TeachingEdit from '../views/admin/teachings/TeachingEdit.vue'
import TeachingRegister from '../views/admin/teachings/TeachingRegister.vue'

//Documents
import DocumentList from '../views/admin/teachings/documents/DocumentList.vue'
import DocumentRegister from '../views/admin/teachings/documents/DocumentRegister.vue'
import DocumentEdit from '../views/admin/teachings/documents/DocumentEdit.vue'

//Polo
import PoloList from '../views/admin/polos/PoloList.vue'
import PoloEdit from '../views/admin/polos/PoloEdit.vue'
import PoloRegister from '../views/admin/polos/PoloRegister.vue'

//Discipline
import DisciplineList from '../views/admin/disciplines/DisciplineList.vue'
import DisciplineEdit from '../views/admin/disciplines/DisciplineEdit.vue'
import DisciplineRegister from '../views/admin/disciplines/DisciplineRegister.vue'

//Stage
import StageList from '../views/admin/stages/StageList.vue'
import StageEdit from '../views/admin/stages/StageEdit.vue'
import StageRegister from '../views/admin/stages/StageRegister.vue'

//Student
import StudentList from '../views/admin/students/StudentList.vue'
import StudentEdit from '../views/admin/students/StudentEdit.vue'
import StudentRegister from '../views/admin/students/StudentRegister.vue'

//Team
import TeamList from '../views/admin/teams/TeamList.vue'
import TeamEdit from '../views/admin/teams/TeamEdit.vue'
import TeamRegister from '../views/admin/teams/TeamRegister.vue'

//User
import UserList from '../views/admin/users/UserList.vue'
import UserEdit from '../views/admin/users/UserEdit.vue'
import UserRegister from '../views/admin/users/UserRegister.vue'

//Grid
import GridList from '../views/admin/grids/GridList.vue'
import GridEdit from '../views/admin/grids/GridEdit.vue'
import GridRegister from '../views/admin/grids/GridRegister.vue'
import GridTemplateRegister from '../views/admin/grids/GridTemplateRegister.vue'

//Reports
import GeneralReportOfStudents from '../views/admin/reports/GeneralReportOfStudents.vue'
import DiarioDeClasse from '../views/admin/reports/DiarioDeClasse.vue'
import AlunosPorTurma from '../views/admin/reports/AlunosPorTurma.vue'
//History
import HistoryRegister from '../views/admin/historys/HistoryRegister.vue'
//Certificate
import CertificateRegister from '../views/admin/certificates/CertificateRegister.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "*",
        component: PageNotFound
    },
    //Site
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: "login",
        component: Login,
    },
    {
        path: '/admin',
        component: Admin,
        meta: {
            login: true
        },
        children: [
            {
                path: 'login',
                name: "login",
                component: Login,
            },
            {
                path: "cursos",
                name: "courses",
                component: CourseList,
            },
            {
                path: "cursos/registrar",
                name: "course-register",
                component: CourseRegister,
            },
            {
                path: "cursos/:id/editar",
                name: "course-edit",
                component: CourseEdit,
                props: true,
            },
            {
                path: "ensinos",
                name: "teachings",
                component: TeachingList,
            },
            {
                path: "ensinos/documentos",
                name: "documents",
                component: DocumentList
            },
            {
                path: "ensinos/:id/editar",
                name: "teaching-edit",
                component: TeachingEdit,
                props: true,
            },
            {
                path: "ensinos/registrar",
                name: "teaching-register",
                component: TeachingRegister,
            },
            // DOCUMENTOS
            {
                path: "ensinos/documentos/registrar",
                name: "document-register",
                component: DocumentRegister
            },
            {
                path: "ensinos/documentos/:id/editar",
                name: "document-edit",
                component: DocumentEdit,
                props: true,
            },
            // FIM
            {
                path: "polos",
                name: "polos",
                component: PoloList
            },
            {
                path: "polos/:id/editar",
                name: "polo-edit",
                component: PoloEdit,
                props: true,
            },
            {
                path: "polos/registrar",
                name: "polo-register",
                component: PoloRegister,
            },
            //Etapas
            {
                path: "etapas",
                name: "stages",
                component: StageList
            },
            {
                path: "etapas/:id/editar",
                name: "stage-edit",
                component: StageEdit,
                props: true,
            },
            {
                path: "etapas/registrar",
                name: "stage-register",
                component: StageRegister,
            },
            //Disciplines
            {
                path: "disciplinas",
                name: "disciplines",
                component: DisciplineList
            },
            {
                path: "disciplinas/:id/editar",
                name: "discipline-edit",
                component: DisciplineEdit,
                props: true,
            },
            {
                path: "disciplinas/registrar",
                name: "discipline-register",
                component: DisciplineRegister,
            },
            //Students
            {
                path: "alunos",
                name: "students",
                component: StudentList
            },
            {
                path: "alunos/:id/editar",
                name: "student-edit",
                component: StudentEdit,
                props: true,
            },
            {
                path: "alunos/registrar",
                name: "student-register",
                component: StudentRegister,
            },
            //Teams
            {
                path: "turmas",
                name: "teams",
                component: TeamList
            },
            {
                path: "turmas/:id/editar",
                name: "team-edit",
                component: TeamEdit,
                props: true,
            },
            {
                path: "turmas/registrar",
                name: "team-register",
                component: TeamRegister,
            },
            //Users
            {
                path: "usuarios",
                name: "users",
                component: UserList
            },
            {
                path: "usuarios/:id/editar",
                name: "user-edit",
                component: UserEdit,
                props: true,
            },
            {
                path: "usuarios/registrar",
                name: "user-register",
                component: UserRegister,
            },
            //Grids
            {
                path: "grades",
                name: "grids",
                component: GridList
            },
            {
                path: "grades/:id/editar",
                name: "grid-edit",
                component: GridEdit,
                props: true,
            },
            {
                path: "grades/registrar",
                name: "grid-register",
                component: GridRegister,
            },
            {
                path: "grades/registrar-template",
                name: "grid-template-register",
                component: GridTemplateRegister,
            },
            //Historys
            {
                path: "historico/:student/registrar",
                name: "history-register",
                component: HistoryRegister,
                props: true,
            },
            //Certificates
            {
                path: "certificado/:student/registrar",
                name: "certificate-register",
                component: CertificateRegister,
                props: true,
            },
            //Reports
            {
                path: "reports/general-report-of-students",
                name: "general-report-of-students",
                component: GeneralReportOfStudents,
            },
            {
                path: "reports/diario-de-classe",
                name: "diario-de-classe",
                component: DiarioDeClasse,
            },
            {
                path: "reports/alunos-por-turma",
                name: "alunos-por-turma",
                component: AlunosPorTurma,
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.login)) {
        if (!window.localStorage.token) {
            next("login");
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router