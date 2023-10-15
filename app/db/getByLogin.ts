import { er, errors } from '../utils/errorUtils';
import { getCollection } from './getCollection';

export const getByLogin = async (login: string) => {
  try {
    const professorCollection = await getCollection('professores');
    const queryProfessor = await professorCollection?.findOne({ login });
    if (queryProfessor) return queryProfessor;
    const diretorCollection = await getCollection('diretor');
    const queryDiretor = await diretorCollection?.findOne({ login });
    if (queryDiretor) return queryDiretor;
    er(errors.login);
  } catch (error) {
    console.log(error);
  }
};
