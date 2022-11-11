const { registerModels } = require('../db');

async function addInput(req, res) {
    const body = req.body;

    // check if body is list
    const schemas = body.schemas;
    if (!schemas) {
        res.statusCode = 400;
        return res.send({ 'error': 'Schema is required' });
    }

    console.log(schemas);

    // check scheam is list
    if (!Array.isArray(schemas)) {
        res.statusCode = 400;
        return res.send({ 'error': 'Schema must be array of objects' });
    }

    const models = registerModels();
    const Input = models.Input;

    try {
        for (const schema of schemas) {
            const newSchema = new Input(schema);
            const insertedSchema = await newSchema.save();
        }
        res.statusCode = 201;
        return res.send({
            'message': `Schema inserted`
        });
    } catch(e) {
        if (e.name === 'ValidationError') {
            res.statusCode = 400;
        } else {
            res.statusCode = 500;
        }
        console.log(e);
        return res.send({
            'message': 'Insert Error',
            'error': e
        });
    }
}

async function getInput(req, res) {
    const models = registerModels();
    const Input = models.Input;
    const data = await Input.find();
    console.log(data);
    return res.send({
        'data': data
    });
}

module.exports = {
    addInput,
    getInput
}