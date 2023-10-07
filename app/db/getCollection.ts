import { getConnection } from './getConnection';

export const getCollection = async (collection: string) => {
  try {
    const client = await getConnection();
    const db = client?.db('portal-educador');
    return db?.collection(collection);
  } catch (error) {
    console.log(error);
  }
};
