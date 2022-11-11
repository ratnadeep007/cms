const { MongoClient } = require('mongodb');

// envs
const mongodbURI = process.env.MONGODB_URI;
const db = process.env.DB || 'test_collection';

const client = new MongoClient(mongodbURI);


async function getMongoClient() {
    await client.connect();
    return client.db(db);
}

module.exports = { getMongoClient };