import { er } from '../app/utils/errorUtils';
import { getCollection } from '../app/db/getCollection';
import { turmas } from '../app/utils/turmas';
import { faker } from '@faker-js/faker';
require('dotenv').config({ path: '.env.local' });

const generateNote = (min: number, max: number) => {
  return Number(faker.number.float({ min, max }).toFixed(1));
};

const generatedStudents = turmas
  .map((turma, index) => {
    const numberOfStudentsOnThisClass = faker.number.int({ min: 22, max: 30 });
    return new Array(numberOfStudentsOnThisClass).fill(undefined).map(() => ({
      nome: faker.person.fullName(),
      idade: faker.number.int({ min: 6 + index, max: 8 + index }),
      turma: turma.slug,
      materias: turma.materias.map((materia) => ({
        materia,
        bimestres: [
          ...new Array(3).fill(undefined).map(() => ({
            teste: generateNote(4, 10),
            prova: generateNote(4, 10),
            presenca: generateNote(1, 4),
            tarefas: generateNote(1, 4),
            comportamento: generateNote(1, 2),
          })),
          {
            teste: null,
            prova: null,
            presenca: null,
            tarefas: generateNote(1, 4),
            comportamento: null,
          },
        ],
      })),
      matriculado: true,
    }));
  })
  .flat();

getCollection('alunos')
  .then(async (collection) => {
    const query = await collection?.insertMany(generatedStudents);
    if (!query || !query.acknowledged) er('Erro ao gerar os estudantes.');
    console.log('Alunos adicionados com sucesso!');
  })
  .catch((err) => console.log(err))
  .finally(() => {
    process.exit(0);
  });
