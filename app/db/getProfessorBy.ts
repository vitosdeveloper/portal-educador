import { ObjectId } from 'mongodb';
import { er, errors } from '../utils/errorUtils';
import { getCollection } from './getCollection';

export const getProfessorBy = async (query: {
  [key: string]: string | ObjectId;
}) => {
  try {
    const professorCollection = await getCollection('professores');
    const queryProfessor = await professorCollection?.findOne(query);
    if (queryProfessor)
      return { ...queryProfessor, _id: String(queryProfessor._id) };
    const diretorCollection = await getCollection('diretor');
    const queryDiretor = await diretorCollection?.findOne(query);
    if (queryDiretor) return { ...queryDiretor, _id: String(queryDiretor._id) };
    er(errors.login);
  } catch (error) {
    console.log(error);
  }
};
