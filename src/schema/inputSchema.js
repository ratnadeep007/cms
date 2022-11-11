const mongoose = require('mongoose');
const { Schema } = mongoose;

const inputSchema = new Schema({
    'name': { type: String, required: true },
    'type': { type: String, required: true },
    'value': Schema.Types.Mixed,
    'placeholder': String,
    'label': { type: String, required: true },
});

module.exports = {
    inputSchema
};