# UT Swagger2 Validator

## Usage

```js
    const swaggerDocument = require('./swagger.json'); // some swagger document
    const swagger2Validator = requrie('ut-swagger2-validator');
    const validators = swagger2Validator(swaggerDocument);
    const operationId = 'namespace.entity.action'; // some operationId corresponding to a given swagger document route
    const validator = validators[operationId];
    if (!validator) {
        // there is no validator matching the given operationId
    }
    // Note: 'pathParameters' might not be provided if 'path' is provided and vice versa
    const requestValidationErrors = await validator.request({query, body, files, headers, pathParameters, path});
    if (requestValidationErrors.length > 0) {
        // there are request validation errors
    }
    const responseValidationErrors = await validator.response({status, body});
    if (responseValidationErrors.length > 0) {
        // there are response validation errors
    }
```