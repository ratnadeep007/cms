const { addToCollection, getFromCollection } = require('./collectionHandlers');
const { addSchema, getSchema } = require('./schemaHandler');
const { addForm, getForm } = require('./formHandler');


module.exports = {
    addToCollection,
    getFromCollection,
    addSchema,
    getSchema,
    addForm,
    getForm
}