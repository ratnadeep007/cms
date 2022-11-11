const { registerModels } = require('../db');

async function addForm(req, res) {
    const form = req.body.form;

    if (!form) {
        res.statusCode = 400;
        return res.send({ 'error': 'Form is required' })
    }

    try {
        const models = registerModels();
        const Form = models.Form;
        const newForm = new Form(form);
        await newForm.save();
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

    res.statusCode = 201;
    return res.send({
        'message': 'Form inserted in form',
    });
}

async function getForm(req, res) {
    const models = registerModels();
    const Form = models.Form;
    const data = await Form.find().populate('inputs');
    return res.send({
        'data': data
    });
}

module.exports = {
    addForm,
    getForm
}