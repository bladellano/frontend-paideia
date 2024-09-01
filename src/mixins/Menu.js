
export default {
    data() {
        return {
            items: [
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
                        { action: "Diário de classe", path: { name: 'diario-de-classe' } },
                        { action: "Relatório financeiro por turma", path: { name: 'relatorio-financeiro-por-turma' } },
                        { action: "Alunos por turma", path: { name: 'alunos-por-turma' } },
                        { action: "Dados completos dos alunos por turma", path: { name: 'alunos-dados-completo-por-turma' } },
                        { action: "Atestado de conclusão de curso", path: { name: 'atestado-de-conclusao-de-curso' } },
                        { action: "Declaração de matrícula", path: { name: 'declaracao-de-matricula' } },
                        { action: "Boletim do aluno", path: { name: 'boletim-do-aluno' } },
                        { action: "Relatório de repasse", path: { name: 'relatorio-de-repasse' } },
                        { action: "Relatório de desempenho anual", path: { name: 'relatorio-de-desempenho-anual' } },
                        { action: "Relatório de inadimplentes", path: { name: 'inadimplentes' } },
                    ]
                }
            ]
        }
    }
}