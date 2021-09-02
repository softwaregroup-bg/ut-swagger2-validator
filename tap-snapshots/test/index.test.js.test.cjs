/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/index.test.js TAP full document > Request: empty body 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'city'",
        "params": Object {
          "missingProperty": "city",
        },
        "schemaPath": "#/required",
      },
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'zone'",
        "params": Object {
          "missingProperty": "zone",
        },
        "schemaPath": "#/required",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP full document > Request: invalid city 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/city",
        "keyword": "type",
        "message": "must be string",
        "params": Object {
          "type": "string",
        },
        "schemaPath": "#/properties/city/type",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP full document > Request: missing city 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'city'",
        "params": Object {
          "missingProperty": "city",
        },
        "schemaPath": "#/required",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP full document > Request: missing zone 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'zone'",
        "params": Object {
          "missingProperty": "zone",
        },
        "schemaPath": "#/required",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP full document > Request: valid 1`] = `
Array []
`

exports[`test/index.test.js TAP full document > Response: empty body 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'details'",
        "params": Object {
          "missingProperty": "details",
        },
        "schemaPath": "#/required",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP full document > Response: invalid amount 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/details/amount",
        "keyword": "type",
        "message": "must be string",
        "params": Object {
          "type": "string",
        },
        "schemaPath": "#/properties/details/properties/amount/type",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP full document > Response: missing amount 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/details",
        "keyword": "required",
        "message": "must have required property 'amount'",
        "params": Object {
          "missingProperty": "amount",
        },
        "schemaPath": "#/properties/details/required",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP full document > Response: missing time 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/details",
        "keyword": "required",
        "message": "must have required property 'time'",
        "params": Object {
          "missingProperty": "time",
        },
        "schemaPath": "#/properties/details/required",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP full document > Response: valid 1`] = `
Array []
`

exports[`test/index.test.js TAP single method > Request: empty body 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'city'",
        "params": Object {
          "missingProperty": "city",
        },
        "schemaPath": "#/required",
      },
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'zone'",
        "params": Object {
          "missingProperty": "zone",
        },
        "schemaPath": "#/required",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP single method > Request: invalid city 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/city",
        "keyword": "type",
        "message": "must be string",
        "params": Object {
          "type": "string",
        },
        "schemaPath": "#/properties/city/type",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP single method > Request: missing city 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'city'",
        "params": Object {
          "missingProperty": "city",
        },
        "schemaPath": "#/required",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP single method > Request: missing zone 1`] = `
Array [
  body: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'zone'",
        "params": Object {
          "missingProperty": "zone",
        },
        "schemaPath": "#/required",
      },
    ],
    "name": "body",
    "validation": true,
    "where": "body",
  },
]
`

exports[`test/index.test.js TAP single method > Request: valid 1`] = `
Array []
`

exports[`test/index.test.js TAP single method > Response: empty body 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "",
        "keyword": "required",
        "message": "must have required property 'details'",
        "params": Object {
          "missingProperty": "details",
        },
        "schemaPath": "#/required",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP single method > Response: invalid amount 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/details/amount",
        "keyword": "type",
        "message": "must be string",
        "params": Object {
          "type": "string",
        },
        "schemaPath": "#/properties/details/properties/amount/type",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP single method > Response: missing amount 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/details",
        "keyword": "required",
        "message": "must have required property 'amount'",
        "params": Object {
          "missingProperty": "amount",
        },
        "schemaPath": "#/properties/details/required",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP single method > Response: missing time 1`] = `
Array [
  Error: validation failed {
    "ajv": true,
    "errors": Array [
      Object {
        "instancePath": "/details",
        "keyword": "required",
        "message": "must have required property 'time'",
        "params": Object {
          "missingProperty": "time",
        },
        "schemaPath": "#/properties/details/required",
      },
    ],
    "validation": true,
  },
]
`

exports[`test/index.test.js TAP single method > Response: valid 1`] = `
Array []
`
