const swaggerParser = require('@apidevtools/swagger-parser');
const { resolve } = require('path');
const tap = require('tap');
const validate = require('..');

const {city, zone, amount, time} = {city: 'city', zone: 'zone', amount: '1.00', time: 'time'};

const requests = [
    [{body: {}}, 'Request: empty body'],
    [{body: {city}}, 'Request: missing zone'],
    [{body: {zone}}, 'Request: missing city'],
    [{body: {city: 1, zone}}, 'Request: invalid city'],
    [{body: {city, zone}}, 'Request: valid']
];
const responses = [
    [{status: 200, body: {}}, 'Response: empty body'],
    [{status: 200, body: {details: {amount}}}, 'Response: missing time'],
    [{status: 200, body: {details: {time}}}, 'Response: missing amount'],
    [{status: 200, body: {details: {time, amount: 1}}}, 'Response: invalid amount'],
    [{status: 200, body: {details: {time, amount}}}, 'Response: valid']
];

tap.test('full document', async assert => {
    const validator = await validate(resolve(__dirname, 'parking.yaml'));
    for (const [params, name] of requests) {
        assert.matchSnapshot(await validator['example.parking.pay'].request(params), name);
    }
    for (const [params, name] of responses) {
        assert.matchSnapshot(await validator['example.parking.pay'].response(params), name);
    }
});

tap.test('single method', async assert => {
    const document = await swaggerParser.dereference(resolve(__dirname, 'parking.yaml'));
    const validator = validate(document, '/parking/pay', 'post');
    for (const [params, name] of requests) {
        assert.matchSnapshot(await validator.request(params), name);
    }
    for (const [params, name] of responses) {
        assert.matchSnapshot(await validator.response(params), name);
    }
});
