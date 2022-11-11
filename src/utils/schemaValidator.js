/*
    Schema object must be:
    [
        {
            "name": "age", // required
            "type": "number", // required
            "placeholder": "Enter your age",
            "value": 0,
        }
    ]
*/
function validateSchema(schema) {
    let errors = []
    for (const s of schema) {
        if (s.type || s.name) {
            
        } else {
            errors.push('Name and type are compulsory')
        }
    }

    return errors;
}

module.exports = {
    validateSchema
}