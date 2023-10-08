import { getCollection } from './getCollection';

export const getStudentsBy = async (filter: any) => {
  try {
    const studentCollection = await getCollection('alunos');
    return await studentCollection?.find(filter).toArray();
  } catch (error) {
    console.log(error);
  }
};
