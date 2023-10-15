import { turmas } from '../app/utils/turmas';
import { faker } from '@faker-js/faker';
import { materias } from '../app/utils/materias';
import { getCollection } from '../app/db/getCollection';
import { er } from '../app/utils/errorUtils';
import { Collection, Document } from 'mongodb';
require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcrypt');

bcrypt.hash(
  'asd',
  Number(process.env.BCRYPT_SALT),
  async (err: unknown, hashedPassword: any) => {
    const generateNote = (min: number, max: number) => {
      return Number(faker.number.float({ min, max }).toFixed(1));
    };

    const generatedStudents = turmas
      .map((turma, index) => {
        const numberOfStudentsOnThisClass = faker.number.int({
          min: 22,
          max: 30,
        });
        return new Array(numberOfStudentsOnThisClass)
          .fill(undefined)
          .map(() => ({
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
    const generatedProfessors = materias
      .map((materia) => {
        const numberOfProfessors = faker.number.int({ min: 1, max: 2 });
        return new Array(numberOfProfessors).fill(undefined).map(() => ({
          nome: faker.person.fullName(),
          materias: [materia.materia],
          diretor: false,
          login: faker.person.firstName(),
          senha: hashedPassword,
        }));
      })
      .flat();

    const strArr = {
      stu: ['Erro ao gerar os estudantes.', 'Alunos adicionados com sucesso!'],
      pro: [
        'Erro ao gerar os professores.',
        'Professores adicionados com sucesso!',
      ],
      dir: ['Erro ao gerar o diretor.', 'Diretor adicionado com sucesso!'],
    };
    const addStudents = async (
      collection: Collection<Document> | undefined
    ) => {
      const query = await collection?.insertMany(generatedStudents);
      if (!query || !query.acknowledged) er(strArr.stu[0]);
      console.log(strArr.stu[1]);
    };
    const addProfessors = async (
      collection: Collection<Document> | undefined
    ) => {
      const query = await collection?.insertMany(generatedProfessors);
      if (!query || !query.acknowledged) er(strArr.pro[0]);
      console.log(strArr.pro[1]);
    };
    const addDiretor = async (collection: Collection<Document> | undefined) => {
      const query = await collection?.insertOne({
        nome: faker.person.fullName(),
        materias: materias.map(({ materia }) => materia),
        diretor: true,
        login: faker.person.firstName(),
        senha: hashedPassword,
      });
      if (!query || !query.acknowledged) er(strArr.dir[0]);
      console.log(strArr.dir[1]);
    };

    await addStudents(await getCollection('alunos'));
    await addProfessors(await getCollection('professores'));
    await addDiretor(await getCollection('diretor'));
    process.exit(0);
  }
);
