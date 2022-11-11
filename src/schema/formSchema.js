const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
    'name': { type: String, required: true },
    'description': String,
    'inputs': { type: Array, ref: 'Input' }
});

module.exports = {
    formSchema
}