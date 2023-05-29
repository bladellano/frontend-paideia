import Vue from 'vue'
import VueRouter from 'vue-router'

/** Site */
import Home from '../views/Home.vue'
import About from '../views/About.vue'
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

//Grid
import GridList from '../views/admin/grids/GridList.vue'
import GridEdit from '../views/admin/grids/GridEdit.vue'
import GridRegister from '../views/admin/grids/GridRegister.vue'
import GridTemplateRegister from '../views/admin/grids/GridTemplateRegister.vue'

//History
import HistoryRegister from '../views/admin/historys/HistoryRegister.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "*",
        component: PageNotFound
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/sobre',
        name: 'about',
        component: About
    },
    /*  {
         path: '/contato',
         name: 'contact',
         component: Contact
     },
     {
         path: '/faq',
         name: 'faq',
         component: Faq
     },
     {
         path: '/cursos',
         name: 'courses',
         component: Courses
     }, */
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
                component: TeachingList
            },
            {
                path: "ensinos/:id/editar",
                name: "teaching-edit",
                component: TeachingEdit,
                props: true,
            },
            {
                path: "ensinos/registrar",
                name: "ensino-register",
                component: TeachingRegister,
            },
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
            //    {
            //     path: "alunos",
            //     name: "students",
            //     component: StudentList
            // },
            // {
            //     path: "alunos/:id/editar",
            //     name: "student-edit",
            //     component: StudentEdit,
            //     props: true,
            // },
            {
                path: "historico/:student/registrar",
                name: "history-register",
                component: HistoryRegister,
                props: true,
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