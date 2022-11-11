const { getMongoClient } = require('../db');

async function addToCollection(req, res) {
    const body = req.body;
    
    // check name of collection is present or not
    const collection = body.collection
    if (!collection) {
        res.statusCode = 400;
        return res.send({ 'error': 'Collection name is required' });
    }

    // check is data is present or not
    const data = body.data;
    if (!data) {
        res.statusCode = 400;
        return res.send({ 'error': 'Data is required' });
    }

    const client = await getMongoClient();
    const dbCollection = client.collection(collection);

    if (Array.isArray(data)) {
        await dbCollection.insertMany(data); 
    } else {
        await dbCollection.insertOne(data);
    }

    res.statusCode = 201;
    return res.send({
        'message': `Data inserted in collection ${collection}`,
        'data': data
    });
}

async function getFromCollection(req, res) {
    const collectionName = req.query.collection;

    // check if collection is present
    if (!collectionName) {
        res.statusCode = 400;
        return res.send({ 'error': 'Collection name is required' });
    }

    const client = await getMongoClient();
    const dbCollection = client.collection(collectionName);
    const data = await dbCollection.find({}).toArray();

    return res.send({
        'collection': collectionName,
        'data': data
    });
}

module.exports = {
    addToCollection,
    getFromCollection
}