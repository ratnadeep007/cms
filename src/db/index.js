const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { inputSchema } = require('../schema/inputSchema');
const { formSchema } = require('../schema/formSchema');

// envs
const mongodbURI = process.env.MONGODB_URI;
const db = process.env.DB || 'test_collection';

const client = new MongoClient(mongodbURI);


async function getMongoClient() {
    await client.connect();
    return client.db(db);
}

async function initMongooseConnection() {
    mongoose.connect(mongodbURI);
    mongoose.connection.useDb(db);
    const connection = mongoose.connection;
    connection.once("open", () => console.log("Connected with mongodb"));
}

function getMongooseDB() {
    return mongoose.connection.useDb(db);
}

function registerModels() {
    const dbs = mongoose.connection.useDb(db);
    const input = dbs.model('Input', inputSchema);
    const form = dbs.model('Form', formSchema);
    return {Input: input, Form: form}
}

module.exports = { 
    getMongoClient,
    initMongooseConnection,
    getMongooseDB,
    registerModels
};