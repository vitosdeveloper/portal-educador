export const alunosMockados = [
  {
    nome: 'Leozin Lipe Parklez',
    idade: 22,
    turma: '1-m',
    bimestres: [
      [
        {
          materia: 'Língua Portuguesa',
          //dividir cada bimestre por 3 pra tirar a média total do bimestre
          bimestres: [
            { teste: 10, prova: 10, presenca: 4, tarefas: 4, comportamento: 2 },
            { teste: 8, prova: 6, presenca: 4, tarefas: 3, comportamento: 2 },
            { teste: 7, prova: 7, presenca: 2, tarefas: 4, comportamento: 2 },
          ],
        },
        {
          materia: 'Física',
          bimestres: [
            { teste: 10, prova: 10, presenca: 4, tarefas: 4, comportamento: 2 },
            { teste: 8, prova: 6, presenca: 4, tarefas: 3, comportamento: 2 },
            { teste: 7, prova: 7, presenca: 2, tarefas: 4, comportamento: 2 },
          ],
        },
      ],
    ],
    matriculado: true,
  },
];
