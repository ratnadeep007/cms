const { getMongoClient } = require('../db');
const { validateSchema } = require('../utils');

async function addSchema(req, res) {
    const body = req.body;

    // check if body is list
    const schema = body.schema;
    if (!schema) {
        res.statusCode = 400;
        return res.send({ 'error': 'Schema is required' });
    }

    console.log(schema);

    // check scheam is list
    if (!Array.isArray(schema)) {
        res.statusCode = 400;
        return res.send({ 'error': 'Schema must be array of objects' });
    }

    const isSchemaValid = validateSchema(schema);
    if (isSchemaValid.length) {
        // encountered error
        res.statusCode = 400;
        return res.send({ 'error': isSchemaValid });
    }

    const client = await getMongoClient();
    const dbCollection = client.collection('schemas');
    await dbCollection.insertMany(schema);

    res.statusCode = 201;
    return res.send({
        'message': `Schema inserted`,
        'data': schema
    });
}

async function getSchema(req, res) {
    const client = await getMongoClient();
    const dbCollection = client.collection('schemas');
    const data = await dbCollection.find({}).toArray();
    return res.send({
        'data': data
    });
}

module.exports = {
    addSchema,
    getSchema
}