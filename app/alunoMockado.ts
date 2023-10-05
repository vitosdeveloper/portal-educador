export const alunosMockados = [
  {
    nome: 'Leozin Lipe Parklez',
    idade: 22,
    turma: '1-m',
    materias: [
      [
        {
          materia: 'Língua Portuguesa',
          //dividir cada bimestre por 3 pra tirar a média total do bimestre
          bimestres: [
            { teste: 10, prova: 10, presenca: 4, tarefas: 4, comportamento: 2 },
            { teste: 8, prova: 6, presenca: 4, tarefas: 3, comportamento: 2 },
            {
              teste: 7,
              prova: 7,
              presenca: 2,
              tarefas: 4,
              comportamento: 2,
            },
            {
              teste: null,
              prova: null,
              presenca: null,
              tarefas: 2,
              comportamento: null,
            },
          ],
        },
        {
          materia: 'Física',
          bimestres: [
            { teste: 10, prova: 10, presenca: 4, tarefas: 4, comportamento: 2 },
            { teste: 8, prova: 6, presenca: 4, tarefas: 3, comportamento: 2 },
            { teste: 7, prova: 7, presenca: 2, tarefas: 4, comportamento: 2 },
            {
              teste: null,
              prova: null,
              presenca: null,
              tarefas: 3,
              comportamento: null,
            },
          ],
        },
      ],
    ],
    matriculado: true,
  },
  {
    nome: 'Iago Orkon Pericles',
    idade: 17,
    turma: '1-m',
    materias: [
      [
        {
          materia: 'Língua Portuguesa',
          //dividir cada bimestre por 3 pra tirar a média total do bimestre
          bimestres: [
            { teste: 8, prova: 6, presenca: 3, tarefas: 3, comportamento: 1 },
            { teste: 10, prova: 6, presenca: 4, tarefas: 3, comportamento: 2 },
            { teste: 5, prova: 7, presenca: 2, tarefas: 4, comportamento: 2 },
            {
              teste: null,
              prova: null,
              presenca: null,
              tarefas: 3,
              comportamento: null,
            },
          ],
        },
        {
          materia: 'Física',
          bimestres: [
            { teste: 10, prova: 10, presenca: 4, tarefas: 4, comportamento: 2 },
            { teste: 8, prova: 6, presenca: 4, tarefas: 3, comportamento: 2 },
            { teste: 7, prova: 7, presenca: 2, tarefas: 4, comportamento: 2 },
            {
              teste: null,
              prova: null,
              presenca: null,
              tarefas: 3,
              comportamento: null,
            },
          ],
        },
      ],
    ],
    matriculado: false,
  },
];
