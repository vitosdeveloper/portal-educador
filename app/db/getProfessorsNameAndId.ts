import { getCollection } from './getCollection';

export const getProfessorsNameAndId = async () => {
  try {
    const professorCollection = await getCollection('professores');
    const query = await professorCollection
      ?.find({}, { projection: { _id: 1, nome: 1 } })
      .toArray();
    if (!query || (query && !query.length))
      throw new Error('Nenhum professor foi encontrado.');
    const withStringId = query?.map((item) => ({
      ...item,
      _id: String(item._id),
    }));
    return withStringId?.filter(isProfessorWithNameAndId);
  } catch (error) {
    console.log(error);
  }
};

const isProfessorWithNameAndId = (
  item: unknown
): item is IProfessorWithNameAndId => {
  if (item && typeof item === 'object' && '_id' in item && 'nome' in item) {
    return true;
  }
  return false;
};

type IProfessorWithNameAndId = {
  _id: string;
  nome: string;
};
