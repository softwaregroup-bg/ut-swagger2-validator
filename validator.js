const Ajv = require('./ajv');
const ajv = new Ajv({allErrors: true, $data: true, useDefaults: true});

const decorateSchema = originalSchema => {
    const schema = {...originalSchema};

    Object.keys(schema).forEach(key => {
        switch (key) {
            case 'required':
                if (typeof schema.required === 'boolean') {
                    schema['x-required'] = schema.required; // json schema 4 support
                    delete schema.required;
                }
                break;
            case 'properties':
                schema.properties = Object.entries(schema.properties).reduce((all, [key, value]) => {
                    all[key] = decorateSchema(value);
                    return all;
                }, {});
                break;
            case 'items':
            case 'not':
                schema[key] = decorateSchema(schema[key]);
                break;
            case 'oneOf':
            case 'allOf':
            case 'anyOf':
                schema[key] = schema[key].map(decorateSchema);
                break;
            default:
                break;
        }
    });

    if (schema['x-nullable'] === true) {
        return {
            oneOf: [
                schema,
                { type: 'null' }
            ]
        };
    }

    return schema;
};

const getValidationHandler = originalSchema => {
    const schema = decorateSchema(originalSchema);
    schema.$async = true;
    const validate = ajv.compile(schema);
    return async value => {
        const validation = {result: value};
        try {
            await validate(value);
        } catch (e) {
            validation.error = e;
        }
        return validation;
    };
};
const collectionFormats = {
    csv: ',',
    ssv: ' ',
    tsv: '\t',
    pipes: '|'
};

module.exports = {
    empty: () => {
        return getValidationHandler({
            oneOf: [
                {
                    type: 'null'
                },
                {
                    type: 'string',
                    maxLength: 0
                },
                {
                    type: 'object',
                    additionalProperties: false,
                    properties: {}
                }
            ]
        });
    },
    file: schema => {
        return getValidationHandler({
            in: schema.in,
            name: schema.name,
            description: schema.description,
            required: schema.required,
            'x-file': true
        });
    },
    json: schema => {
        return getValidationHandler(schema);
    },
    primitive: schema => {
        const validate = getValidationHandler(schema);
        return value => { // normalize value
            if (typeof value !== 'undefined') {
                switch (schema.type) {
                    case 'number':
                    case 'integer':
                        if (!isNaN(value)) {
                            value = +value;
                        }
                        break;
                    case 'boolean':
                        if (value === 'true') {
                            value = true;
                        } else if (value === 'false') {
                            value = false;
                        }
                        break;
                    case 'array':
                        if (!Array.isArray(value)) {
                            const format = collectionFormats[schema.collectionFormat || 'csv'];
                            value = format ? String(value).split(format) : [value];
                        }
                        switch (schema.items.type) {
                            case 'number':
                            case 'integer':
                                value = value.map(v => isNaN(v) ? v : +v);
                                break;
                            case 'boolean':
                                value = value.map(v => v === 'true' ? true : v === 'false' ? false : v);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            } else if (!schema['x-required']) {
                return { result: value };
            }
            return validate(value);
        };
    }
};
