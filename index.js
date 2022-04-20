const swaggerParser = require('@apidevtools/swagger-parser');
const validator = require('./validator');

function methodValidator(swagger, pathName, methodName, basePath) {
    if (!basePath) basePath = swagger.basePath || '';
    const path = swagger.paths[pathName.slice(basePath.length)];
    const method = path[methodName];
    const requestBody = method.requestBody?.content?.['application/json']; // openapi 3
    const params = [requestBody && {schema: requestBody.schema, in: 'body'}]
        .concat(path.parameters)
        .concat(method.parameters)
        .filter(x => x)
        .map(param => {
            const schema = param.schema || (({name, in: ignore, ...schema}) => schema)(param);
            if (['query', 'header', 'path'].indexOf(param.in) !== -1) {
                param.validate = validator.primitive(schema);
            } else if (param.in === 'formData') {
                if (param.type === 'file') param.validate = validator.file(schema);
                else param.validate = validator.primitive(schema);
            } else {
                param.validate = validator.json(schema);
            }
            return param;
        });
    const responses = Object.entries(method.responses).reduce((all, [status, response]) => {
        const schema = response.schema || response.content?.['application/json']?.schema;
        return {
            ...all,
            [status]: {
                validate: schema ? validator.json(schema) : validator.empty()
            }
        };
    }, {});
    const expected = (pathName.match(/[^/]+/g) || []).map(s => s.toString());
    return {
        request: async function validateRequest({
            query = {},
            body = {},
            files = {},
            pathParameters = {},
            headers = {},
            path = ''
        }) {
            const errors = [];
            if (params.length === 0) {
                const { error } = await validator.empty()(body);
                if (error) {
                    error.where = 'body';
                    errors.push(error);
                }
                Object.keys(query).forEach(name => {
                    errors.push({
                        where: 'query',
                        name,
                        actual: query[name],
                        expected: undefined
                    });
                });
            } else {
                let hasBody = false;
                for (let i = 0; i < params.length; i += 1) {
                    let value;
                    const param = params[i];
                    let validate = param.validate;
                    switch (param.in) {
                        case 'header':
                            value = headers[param.name];
                            break;
                        case 'query':
                            value = query[param.name];
                            validate = async value => {
                                const validation = await param.validate(value);
                                // reassign value if casted. E.g. 'true' -> true or '1' -> 1
                                if (validation.result !== value) query[param.name] = validation.result;
                                return validation;
                            };
                            break;
                        case 'path':
                            if (path) {
                                const actual = path.substring(basePath.length).match(/[^/]+/g);
                                value = actual ? actual[expected.indexOf(`{${param.name}}`)] : undefined;
                            } else {
                                value = pathParameters[param.name];
                                validate = async value => {
                                    const validation = await param.validate(value);
                                    // reassign value if casted. E.g. 'true' -> true or '1' -> 1
                                    if (validation.result !== value) pathParameters[param.name] = validation.result;
                                    return validation;
                                };
                            }
                            break;
                        case 'formData':
                            value = param.type === 'file' ? files[param.name] : body[param.name];
                            hasBody = true;
                            break;
                        case 'body':
                            value = body;
                            hasBody = true;
                            break;
                    }
                    const { error } = await validate(value);
                    if (error) {
                        error.where = param.in;
                        error.name = param.name;
                        errors.push(error);
                    }
                }
                if (!hasBody) {
                    const { error } = await validator.empty()(body);
                    error && errors.push(error);
                }
            }
            return errors;
        },
        response: async function validateResponse({status, body}) {
            const { validate } = responses[status] || responses.default;
            const { error } = await validate(body);
            return error ? [error] : [];
        }
    };
}

module.exports = (swaggerDocument, pathName, methodName, basePath) => {
    if (pathName && methodName) return methodValidator(swaggerDocument, pathName, methodName, basePath);
    return (async() => {
        const swagger = await swaggerParser.dereference(swaggerDocument);
        return Object.entries(swagger.paths).reduce(
            (validators, [pathName, path]) => {
                if (!pathName.startsWith('x-')) {
                    Object.entries(path).forEach(([methodName, method]) => {
                        if (methodName !== 'parameters' && !methodName.startsWith('x-')) {
                            let basePath = swagger.swagger && swagger.basePath;
                            if (swagger.openapi) {
                                const docUrl = swagger.servers?.[0]?.url;
                                const schemaUrl = method.servers?.[0]?.url;
                                basePath = schemaUrl
                                    ? schemaUrl.startsWith('/') && schemaUrl
                                    : docUrl?.startsWith('/') && docUrl;
                            }
                            if (!basePath) basePath = '';
                            validators[method.operationId] = methodValidator(
                                swagger,
                                basePath + pathName,
                                methodName,
                                basePath
                            );
                        }
                    });
                }
                return validators;
            },
            {}
        );
    })();
};
