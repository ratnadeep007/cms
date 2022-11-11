const { getMongoClient } = require('../db');
const { validateForm } = require('../utils');

async function addForm(req, res) {
    const form = req.body.form;

    if (!form) {
        res.statusCode = 400;
        return res.send({ 'error': 'Form is required' })
    }

    const isFormValid = validateForm(form);
    if (isFormValid.length) {
        res.statusCode = 400;
        return res.send({ 'error': isSchemaValid });
    }

    const client = await getMongoClient();
    const dbCollection = client.collection('forms');

    await dbCollection.insertOne(form);

    res.statusCode = 201;
    return res.send({
        'message': 'Data inserted in form',
        'data': form
    });
}

async function getForm(req, res) {
    const client = await getMongoClient();
    const dbCollection = client.collection('forms');
    const data = await dbCollection.find({}).toArray();
    return res.send({
        'data': data
    });
}

module.exports = {
    addForm,
    getForm
}