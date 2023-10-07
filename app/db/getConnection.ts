import { MongoClient } from 'mongodb';

export const getConnection = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI!);
    await client.connect();
    return client;
  } catch (error) {
    console.log(error);
  }
};
