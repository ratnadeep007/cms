const mongodbURI = process.env.MONGODB_URI;
const { MongoClient } = require('mongodb');

const client = new MongoClient(mongodbURI);

const dbName = 'test_collection';

async function main() {
  await client.connect();
  console.log('Connected');
  const db = client.db(dbName);
  const collection = db.collection('users');
  collection.insertOne({
    'name': 'Ratnadeep'
  });
  return 'data written';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit())