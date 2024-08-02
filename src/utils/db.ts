import { MongoClient } from 'mongodb';

const connectToDataBase = async () => {
  const client = await MongoClient.connect(`${process.env.REACT_APP_MONGO_URI}?retryWrites=true&w=majority`);
  return client;
};

export default connectToDataBase;
